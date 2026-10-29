import type { ImageMetadata } from 'astro';
import manifest from './art-manifest.json';

// Every design from the client's Drive folder. Artwork is picked up from
// src/assets/art/ (written by `npm run art`). A design whose file is not
// there yet stays in this list but is skipped on the site, so adding the
// file later is all it takes to publish it.

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/art/*.png', { eager: true });
const art = (slug: string) => files[`../assets/art/${slug}.png`]?.default;

export type Pace = 'out-there' | 'close-to-home' | 'signature';

export interface Moment {
  slug: string;
  no: string; // print number from the supplied file name
  name: string; // design name used in the collection
  pace: Pace;
  time?: string; // when this moment happens in "a day, on purpose"
  phrase: string; // completes "I had a nice day ..."
  line: string; // one-liner for the day timeline and shop
  alt: string;
  tone?: { bg: string; fg: string }; // section colour at this time of day
  image?: ImageMetadata;
  complete: boolean;
}

const raw: Omit<Moment, 'image' | 'complete'>[] = [
  {
    slug: '03-motorcycle',
    no: '03',
    name: 'The Ride',
    pace: 'out-there',
    time: '3:30 PM',
    phrase: 'on the open road.',
    line: 'No destination. That was the whole plan.',
    alt: 'HANDY, the peace-sign hand mascot, flashing a peace sign while cruising on a black motorcycle.',
    tone: { bg: '#F2BC6B', fg: '#0D1B3D' },
  },
  {
    slug: '11-jogging',
    no: '11',
    name: 'First Mile',
    pace: 'close-to-home',
    time: '6:40 AM',
    phrase: 'before the coffee was done.',
    line: 'Three easy miles around the block while the street is still asleep.',
    alt: 'HANDY jogging in a blue tee, khaki shorts and running shoes.',
    tone: { bg: '#F6EFE1', fg: '#0D1B3D' },
  },
  {
    slug: '01-tree-cutting',
    no: '01',
    name: 'The Clearing',
    pace: 'out-there',
    time: '8:15 AM',
    phrase: 'out back with the chainsaw.',
    line: 'Saturday chores, a fresh stack of firewood, and sawdust on everything.',
    alt: 'HANDY cutting a tree.',
    tone: { bg: '#F5EAD3', fg: '#0D1B3D' },
  },
  {
    slug: '04-golf',
    no: '04',
    name: 'The Back Nine',
    pace: 'out-there',
    time: '10:20 AM',
    phrase: 'on the back nine.',
    line: 'Nine holes with friends. Nobody is keeping score, except Dave.',
    alt: 'HANDY in a blue polo finishing a golf swing beside a bag of clubs, with the flag and a pond behind him.',
    tone: { bg: '#F4E4C4', fg: '#0D1B3D' },
  },
  {
    slug: '05-sports-car',
    no: '05',
    name: 'The Long Way Home',
    pace: 'out-there',
    time: '1:05 PM',
    phrase: 'taking the long way home.',
    line: 'Top down, good song on, and every reason to miss the exit.',
    alt: 'HANDY waving a peace sign from the driver’s seat of a bright blue convertible sports car.',
    tone: { bg: '#F4D597', fg: '#0D1B3D' },
  },
  {
    slug: '12-baking-cookies',
    no: '12',
    name: 'Second Batch',
    pace: 'close-to-home',
    time: '5:45 PM',
    phrase: 'baking cookies with the kids.',
    line: 'Flour on the counter, kids on the step stool, and the first one gone before it cooled.',
    alt: 'HANDY baking cookies.',
    tone: { bg: '#EC9A5A', fg: '#0D1B3D' },
  },
  {
    slug: '07-rodeo',
    no: '07',
    name: 'Eight Seconds',
    pace: 'out-there',
    time: '7:30 PM',
    phrase: 'at the rodeo.',
    line: 'Dusty boots, a loud crowd, and eight seconds that felt like a minute.',
    alt: 'HANDY at the rodeo.',
    tone: { bg: '#2A3566', fg: '#F6EFE1' },
  },
  {
    slug: '09-bronze-singing-bowls',
    no: '09',
    name: 'Low Note',
    pace: 'close-to-home',
    time: '9:40 PM',
    phrase: 'with the lights down low.',
    line: 'Lights low, one long note, and nowhere else to be.',
    alt: 'HANDY sitting cross-legged on a woven mat, playing a circle of bronze singing bowls.',
    tone: { bg: '#0D1B3D', fg: '#F6EFE1' },
  },
  {
    slug: '02-peace-sign',
    no: '02',
    name: 'The Original',
    pace: 'signature',
    phrase: 'and I’d do it again.',
    line: 'HANDY, the hand behind the peace sign. Goes with everything.',
    alt: 'HANDY, a cartoon peace-sign hand with a big smile, standing in brown shoes and giving a second peace sign.',
  },
  {
    slug: '10-podcast',
    no: '10',
    name: 'On Air',
    pace: 'signature',
    phrase: 'talking it over on the podcast.',
    line: 'For listeners, guests, and anyone who tells a good story.',
    alt: 'HANDY at the podcast microphone.',
  },
  {
    slug: '08-ron-and-handy',
    no: '08',
    name: 'Ron and HANDY',
    pace: 'signature',
    phrase: 'with Ron.',
    line: 'The founder and his sidekick.',
    alt: 'Ron LaBeau with HANDY.',
  },
];

const notes = manifest as Record<string, { complete: boolean }>;

export const moments: Moment[] = raw
  .map((m) => ({ ...m, image: art(m.slug), complete: notes[m.slug]?.complete ?? true }))
  .filter((m): m is Moment & { image: ImageMetadata } => Boolean(m.image));

// Moments placed on the clock, in time order.
const minutes = (t: string) => {
  const [, h, mm, ap] = t.match(/(\d+):(\d+) (AM|PM)/)!;
  return ((+h % 12) + (ap === 'PM' ? 12 : 0)) * 60 + +mm;
};
export const day = moments.filter((m) => m.time).sort((a, b) => minutes(a.time!) - minutes(b.time!));
export const dayMinutes = minutes;

export const collection = moments.filter((m) => m.slug !== '08-ron-and-handy');

export const paceLabel: Record<Pace, string> = {
  'out-there': 'Out there',
  'close-to-home': 'Close to home',
  signature: 'Signature',
};

export const logo = art('podcast-logo')!;
export const bySlug = (slug: string) => moments.find((m) => m.slug === slug);
