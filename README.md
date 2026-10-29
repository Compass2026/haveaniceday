# Had A Nice Day

Website for **Had A Nice Day**, the lifestyle apparel and podcast brand founded by Ron LaBeau. *Wear the moment.*

A Compass Marketing client project. Static site built with [Astro](https://astro.build), no client-side framework, ready for Vercel.

## Pages

| Route      | What it does                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------ |
| `/`        | Brand story: moment-picker hero, Ron's note, a day timeline, podcast feature, collection, card maker |
| `/shop`    | The collection on a clothing rack, filters, and a try-on preview (tee or crewneck, four colors)  |
| `/podcast` | The Had A Nice Day Podcast Show with Ron LaBeau, topics, episode alerts, and a "be a guest" form  |
| `/404`     | Not-found page                                                                                   |

Deep links such as `/shop#03-motorcycle` open that design's preview.

## Commands

```sh
npm install
npm run dev         # local dev server at http://localhost:4321
npm run build       # static site in dist/
npm run preview     # serve dist/
npm run art         # re-process artwork in assets/source/ (see below)
npm run check:copy  # brand voice guard: fails on em dashes
```

## Artwork

`assets/source/` holds the files exactly as supplied in the client's Drive folder. They are never edited.

`npm run art` checks each PNG's integrity, trims the transparent print margin, scales a web master into `src/assets/art/` and writes `src/data/art-manifest.json`. Astro then generates responsive WebP sizes at build time.

**Adding a design:** copy the PNG into `assets/source/` using its Drive file name (for example `12_Baking_cookies_print.png`), run `npm run art`, then `npm run build`. Every design is already described in `src/data/moments.ts` (name, time of day, copy), so it shows up in the hero, the day timeline, the shop and the card maker with no other changes.

Five supplied files aren't in the repo yet (see `docs/creative-and-assets.md`): `01_Tree_cutting`, `07_Rodeo`, `08_Ron_and_HANDY`, `10_Podcast`, `12_Baking_cookies`.

## Configuration to finish before launch

All in `src/data/site.ts` unless noted:

- `forms.dropList`, `forms.story`, `forms.guest`: endpoints for the email list and story/guest forms (Klaviyo, Formspree, HubSpot or a serverless function). Until set, forms validate and then say plainly that they are in preview mode.
- `listen`: podcast platform links. Until set, the podcast page says links go live with episode one.
- `store`: storefront link for when the first drop goes on sale.
- `url` and `astro.config.mjs` `site`: production domain (currently a placeholder, `hadaniceday.com`).

## Structure

```
assets/source/        original client artwork (untouched)
scripts/              prepare-art.mjs, check-copy.mjs
src/data/             moments.ts (all designs + copy), site.ts (settings), art-manifest.json
src/components/       page sections and shared pieces
src/pages/            index, shop, podcast, 404
src/styles/global.css design tokens and shared styles
docs/                 creative direction, reference review, asset audit
```
