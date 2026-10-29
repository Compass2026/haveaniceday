// Prepares the supplied illustration files for the web.
//
// Reads every PNG in assets/source/ (the untouched files from the client's
// Drive folder), checks PNG integrity, trims the transparent print margin,
// scales to a web-friendly master size and writes the result to
// src/assets/art/<slug>.png. Astro then generates responsive WebP sizes.
//
// It also writes src/data/art-manifest.json so the site knows which designs
// are available. Drop a missing file into assets/source/ and re-run
// `npm run art` and it appears on the site automatically.

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import sharp from 'sharp';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const srcDir = path.join(root, 'assets/source');
const outDir = path.join(root, 'src/assets/art');
const manifestPath = path.join(root, 'src/data/art-manifest.json');
const MAX_EDGE = 1600;

fs.mkdirSync(outDir, { recursive: true });

const slugFor = (file) => {
  if (/logo/i.test(file)) return 'podcast-logo';
  return file
    .replace(/\.png$/i, '')
    .replace(/^REVISED-/i, '')
    .replace(/_print$/i, '')
    .toLowerCase()
    .replace(/[_\s]+/g, '-');
};

// Walk the PNG chunk list and report whether the file ends with IEND.
function pngIntegrity(buf) {
  let i = 8;
  let last = null;
  while (i + 8 <= buf.length) {
    const len = buf.readUInt32BE(i);
    const type = buf.toString('latin1', i + 4, i + 8);
    if (i + 12 + len > buf.length) return { complete: false, lastChunk: `${type} (cut short)` };
    last = type;
    i += 12 + len;
  }
  return { complete: last === 'IEND', lastChunk: last };
}

// For a truncated, non-interlaced 8-bit PNG: how many full scanlines can
// actually be inflated from the IDAT data that is present. Decoders fill
// the rest with repeated or garbage rows, so we crop to this count.
function decodableRows(buf, width, channels) {
  let i = 8;
  const parts = [];
  while (i + 8 <= buf.length) {
    const len = buf.readUInt32BE(i);
    const type = buf.toString('latin1', i + 4, i + 8);
    if (type === 'IDAT') parts.push(buf.subarray(i + 8, Math.min(buf.length, i + 8 + len)));
    i += 12 + len;
  }
  const inflated = zlib.inflateSync(Buffer.concat(parts), { finishFlush: zlib.constants.Z_SYNC_FLUSH });
  return Math.floor(inflated.length / (width * channels + 1)) - 1;
}

const files = fs.readdirSync(srcDir).filter((f) => f.toLowerCase().endsWith('.png')).sort();
const manifest = {};

for (const file of files) {
  const input = path.join(srcDir, file);
  const buf = fs.readFileSync(input);
  const integrity = pngIntegrity(buf);
  const meta = await sharp(buf, { failOn: 'none' }).metadata();
  const slug = slugFor(file);

  // Trim the transparent margin, then add a small even pad so outlines
  // and motion lines never touch the image edge.
  let pipeline = sharp(buf, { failOn: 'none' });
  let rows = meta.height;
  if (!integrity.complete) {
    rows = decodableRows(buf, meta.width, meta.channels);
    pipeline = sharp(await pipeline.extract({ left: 0, top: 0, width: meta.width, height: rows }).png().toBuffer());
  }
  const trimmed = await pipeline
    .trim({ threshold: 4 })
    .png()
    .toBuffer({ resolveWithObject: true });
  const pad = Math.round(Math.max(trimmed.info.width, trimmed.info.height) * 0.015);

  const out = path.join(outDir, `${slug}.png`);
  const result = await sharp(trimmed.data)
    .extend({ top: pad, bottom: integrity.complete ? pad : 0, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: false })
    .toFile(out);

  manifest[slug] = {
    source: file,
    sourceSize: [meta.width, meta.height],
    dpi: meta.density ?? null,
    webMaster: [result.width, result.height],
    complete: integrity.complete,
    note: integrity.complete
      ? null
      : `PNG data ends early (${integrity.lastChunk}). Only ${rows} of ${meta.height} rows decode, so the bottom of the artwork is missing in the supplied file.`,
  };
  console.log(`${integrity.complete ? 'ok  ' : 'WARN'} ${file} -> ${slug}.png ${result.width}x${result.height}`);
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\nWrote ${Object.keys(manifest).length} entries to src/data/art-manifest.json`);
