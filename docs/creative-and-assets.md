# Had A Nice Day: creative direction, references and asset audit

## Direction: "A day worth wearing"

The site runs like a day. It starts on warm paper in the morning, turns golden through the afternoon, and ends in night navy, where the podcast lives. That gives the bright and dark rhythm a reason to exist, and it lets an early run, a round of golf and a quiet evening with singing bowls sit side by side as equals.

- **Signature interaction, hero:** "I had a nice day ___" completed by a moment picker. Each moment swaps the HANDY sticker, and the sun behind it moves to that moment's time of day (a moon after dark). It auto-advances, with pause and play, only while on screen, and stays still for reduced-motion users.
- **Signature interaction, day timeline:** as you scroll from 6:40 AM to 9:40 PM, the section's color follows the sky and a sticky sun dial tracks the hour. On phones the dial becomes a slim sticky time bar.
- **Community hook:** a card maker. Visitors finish the sentence, pick a sticker, and save or share an airmail postcard, or send it to the show.
- **Storefront:** designs hang on a clothing rack as tees. The try-on preview switches between tee and crewneck and four colors, and every design can be deep-linked.
- **Scrapbook details, used sparingly:** masking tape on Ron's letter, hang tags carrying the real print numbers from the file names (No. 03, No. 11...), a rubber stamp, airmail stripes, and a hand-drawn underline.

**Type:** Bricolage Grotesque (display, tight and confident), Instrument Serif italic (the "moment" words and Ron's letter), and Figtree (body).

**Color, drawn from the artwork:** paper `#f6efe1`, kraft `#ece0c7`, badge navy `#0d1b3d`, polo blue `#1a6be6` (with `#1456c2` for small text), podcast orange `#f2780f` (with `#b04e09` for small text on paper), and sun `#f6b63e`.

**Logo use:** the supplied logo reads "Had A Nice Day Podcast Show with Ron LaBeau", so it appears unedited and only in podcast contexts. Site navigation uses a typographic wordmark, "Had A Nice Day.", whose orange full stop finishes the sentence.

**Voice:** warm, specific and lightly playful, with no em dashes. `npm run check:copy` enforces the dash rule. Ron's introduction is quoted verbatim.

## Reference review

All three references loaded and were reviewed at 1440px desktop and 390px mobile, using Playwright screenshots of full pages. Neither Vercel site had access limitations.

| Site | What works | What we took (reinterpreted) |
| --- | --- | --- |
| magnoliahomeinspect.com | One signature interaction rooted in the service (a thermal "move to scan" lens on the hero photo). A sticky index that tracks scroll through seven inspection systems. A sticky Call / Book bar on mobile. Warm ivory with an editorial serif. | A signature interaction born from the subject: the sun that follows the moment. A scroll-tracking indicator, reinterpreted as the sun dial. A phone action bar (Shop / Podcast) that appears after the hero and steps aside at the footer. |
| dm-landscaping-and-services.vercel.app | Headline wordplay built on the brand name ("Trees go down in the DMs"). A phone chat mock that demonstrates the CTA. Strong dark and light rhythm. Numbered process. | The headline is the brand's own sentence, "I had a nice day ___". The card maker demonstrates the community idea instead of describing it. The tilted marquee tape was deliberately not reused. |
| h2-dirt-wrk.vercel.app | An owner-forward story ("the man behind the machines"). A tabbed equipment explorer. Motifs taken from the trade (hazard tape). Disciplined uppercase labels. | Ron's voice up front, in his own words. Motifs from this subject's world (hang tags, hangers, airmail stripes, postage stamp) instead of generic icons. The try-on preview plays the role of the explorer. |

Layouts, stat tiles, review carousels and marquee strips were not copied.

## Asset audit

Supplied folder: 12 PNGs. Seven were downloaded and inspected byte by byte; five could not be retrieved in this session.

| File | Size | Status | Notes |
| --- | --- | --- | --- |
| HAND Logo.png | 1254×1254, RGBA | OK | Transparent corners. Podcast-specific artwork, used unedited. Fine on the web up to about 600px wide. Too small for large print. |
| REVISED-03_Motorcycle_print.png | 1122×1402, RGBA | OK, **low resolution** | The revised file is the one used. At 300 dpi it prints only about 3.7×4.7 in, against 12×15 in for the other prints. Ask for a full-size export of the revised art before production. |
| 02_Peace_sign_print.png | 3600×4500, 300 dpi | OK | Transparent background, 150px margin. |
| 04_Golf_print.png | 3600×4500, 300 dpi | OK | |
| 05_Sports_car_print.png | 3600×4500, 300 dpi | OK, **trademark flag** | The car is a recognizable Corvette C8 with the crossed-flags badge on the nose. Recommend removing the badge before selling it on merchandise. |
| 09_Bronze_singing_bowls_print.png | 3600×4500, 300 dpi | **File is incomplete** | The PNG data ends early: only 3,272 of 4,500 rows decode, so the bottom of the bowls and mat is cut off. The byte count matches Drive's reported size, so the file is truncated in Drive itself. On the site it sits flush on a ledge line so the cut reads as intentional. Ask for a re-export. |
| 11_Jogging_print.png | 3600×4500, 300 dpi | OK | |
| 01_Tree_cutting_print.png | 7.8 MB | Not retrieved | The Drive connector returns at most about 7 MB per file. |
| 07_Rodeo_print.png | 14.2 MB | Not retrieved | Over the connector's 10 MB limit. |
| 08_Ron_and_HANDY_print.png | 8.9 MB | Not retrieved | Connector size limit. |
| 10_Podcast_print.png | 7.6 MB | Not retrieved | Connector size limit. |
| 12_Baking_cookies_print.png | 7.5 MB | Not retrieved | Connector size limit. |

General notes:

- Every print file uses alpha 253 to 254 (about 99% opaque) across the artwork instead of 255. It is invisible on screen, but mention it to the print shop: some DTG workflows treat partial alpha differently.
- The mascot's name, **HANDY**, comes from the file name `08_Ron_and_HANDY_print.png`. Please confirm the spelling and capitalization.
- These are illustrations, not a merchandise catalog. The shop shows garment previews and a "first drop in the works" status, with no prices, sizes or stock claims.
- The five missing designs are already written into `src/data/moments.ts` with names, times and copy. Drop the files into `assets/source/`, run `npm run art`, and they appear across the site. Baking cookies takes 5:45 PM in the day timeline and becomes the "Close to home" image on the podcast page.
