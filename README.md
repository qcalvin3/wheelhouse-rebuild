# Wheelhouse Bike Repair: Page Rebuild

**Live page:** https://qcalvin3.github.io/wheelhouse-rebuild/
**Original site (before):** [commit e0c6f94](https://github.com/qcalvin3/wheelhouse-rebuild/tree/e0c6f94)
**Full write-ups:** [diagnosis](docs/diagnosis.md) · [audit](docs/audit.md) · [screenshots](docs/evidence/)

**How to run it:** open the live page, or download the repo and open `index.html` in any browser. There is nothing to install or build.

## 1. Understanding the brief

| Question | Answer | From the brief |
|---|---|---|
| Who comes, on what device? | People near Adum, Kumasi, whose bike just broke down (a flat, a broken chain, or a bike not serviced in years). They are on their phone, often out and about. | "they search on their phone for a nearby workshop" |
| What did they come to do? | Get the bike fixed today: check the shop can fix it, decide if they trust it over the other shops, then call, message or go there. | "They need it fixed today… pick the one that looks like it knows what it is doing." |
| What gets in their way today? | The old site does not fit a phone, the text is small and pale, the phone number and hours are at the bottom, and the proof that Kwame is reliable is buried. | "his site does not give them enough confidence that he is reliable or professional" |
| What does the owner need? | More new customers choosing Wheelhouse and getting in touch, with a site that feels trustworthy, not trendy. | "a competitor down the road has been growing" · "not… trendy for its own sake" |

## 2. Sketch and structure

![Mobile page structure sketch, numbered blocks 1 to 11](docs/sketch.png)

The numbers on the sketch match the rows below. Customers are in a hurry and comparing shops, so the first phone screen (above the dashed line) answers three questions in order: **can they fix my problem nearby, can I reach them now, and can I trust them?**

| # | Block | Why it is here |
|---|---|---|
| 1 | Header with Menu and Call | Calling is the quickest way to reach Kwame, so Call stays at the top. The menu jumps straight to prices or directions. |
| 2 | What and where | Straight away they see the shop is in Adum, fixes their problem, and does most repairs the same day. |
| 3 | Opening hours, Call and WhatsApp | The next step is reaching him. One tap calls or opens WhatsApp. |
| 4 | Why riders trust Wheelhouse | Real facts from the old site: Kwame repairs every bike, open since 2019, price agreed first. Answers "I do good work here. The site does not say that." |
| 5 | Services and prices | People compare shops on what they fix and what it costs. |
| 6 | How it works | Bring it in, Kwame calls with a price, you approve, collect. No surprise bill. |
| 7 to 9 | Questions, About Kwame, Find the workshop | Detail for people still deciding, plus directions to the shop. |
| 10 | Short form (backup) | For people who prefer typing. |
| 11 | Footer | Contact details again for anyone who scrolls to the end. |

I left out a big photo banner at the top because on a phone it would push the Call button and trust points off the first screen.

**What the first screen looks like now (360 × 640):** header, headline, opening hours, Call and WhatsApp buttons, and the start of the trust section all fit without scrolling. Screenshot: [`10-after-first-screen.png`](docs/evidence/10-after-first-screen.png).

**Changed during the build** (marked in orange on the sketch): block 10 became one-tap WhatsApp messages plus one message box, because WhatsApp already gives Kwame the customer's number so he can always reply. The photo in block 4 is a labelled placeholder until Kwame sends a real one. A stock photo of a stranger would be lying about who he is.

## 3. Diagnosis of the original site

Tested at 360 × 640 in DevTools, with the keyboard only, the colour picker for contrast, Slow 4G, and by reading the old code. **[Full findings table with evidence and line numbers](docs/diagnosis.md).**

| # | What customers ran into | Root cause | What it costs Kwame |
|---|---|---|---|
| 1 | Whole page shrunk and tiny on a phone | No viewport meta tag, and fixed widths like `960px` | People comparing shops on a phone pick the competitor |
| 2 | Phone number buried after five sections, and not tappable | Page ordered like a template; numbers were plain text, not `tel:` links | Lost jobs at the moment they want to call |
| 3 | Nothing near the top shows the shop is reliable, no photos | Proof hidden in the About and FAQ sections | Exactly his complaint: the site does not show his good work |
| 4 | Pressing Submit on the booking form does nothing, and it never asks for a phone number | `<input type="button">`, no phone field, no labels | A customer who thinks they booked but did not |
| 5 | Small text, faint prices | 11 to 13px sizes; 5 of 6 price colours fail contrast (as low as 2.1:1) | People cannot read the prices they came to compare |
| 6 | Menu links do nothing | Every link was `href="#"` | Looks broken and unprofessional |
| 7 | Hard for keyboard and screen reader users | Only `<div>`s, wrong heading order, no focus styles | Some customers cannot use it at all |
| 8 | No description in search results | No `lang`, no meta description | Harder to stand out on Google |
| 9 | Looks patchy and old | 18 colours, 6 font sizes, 21 inline styles | Looks careless, so less trust |

Findings 1 to 8 are broken. Finding 9 is dated. Page speed was fine (about 10KB).

**The five underlying causes:** built for desktop only · ordered by template, not customer need · HTML used for looks, not meaning · left unfinished · no visual system.

## 4. Visual system

Everything comes from CSS variables at the top of `css/styles.css`.

| Part | Value | Why |
|---|---|---|
| Colours | Safety orange `#b93a0b` (`--color-primary`), charcoal `#1c1c1c` text on `#f7f6f3`, blue `#1f4e8c` focus ring | I chose workshop colours so the site looks like a real bike repair shop. Bright orange is kept for buttons, links, prices and small markers, so the Call button is easy to spot. |
| Type | System font. Body 16px (`--font-size-base`), intro and prices 18px, h3 19px, h2 23px, h1 28 to 40px with `clamp()`. Scale ratio 1.2 | Readable on a phone with no download. The headline never pushes Call off the first screen. |
| Spacing | `--space-1` to `--space-6`: 4, 8, 16, 24, 32, 48px | Small gaps inside groups, big gaps between sections. |
| Tap targets | `--tap-target`: 44px minimum | Easy to tap with one thumb. |
| Breakpoints | Mobile first. `48rem` (768px): two-column trust and services, more padding. `64rem` (1024px): three-column services | Built for the phone, then spreads out on bigger screens. |

## 5. Additional improvement: one-tap WhatsApp messages

**The problem:** someone standing next to a broken bike, typing with one hand, is slow, and vague messages make Kwame ask questions back.

**What I built:** five buttons for common problems (flat tyre, chain, brakes, gears, full service). Each one opens WhatsApp with the message already written, like "Hi Kwame, I have a flat tyre. Can I bring my bike in today?". The customer just presses send. Anything else goes in the message box below.

**Why it matters to Kwame:** WhatsApp was already on his old site, just as plain text at the bottom. Now it is two taps. He gets clear messages and always has the customer's number to reply.

**How it works:** plain HTML links (`https://wa.me/233244000001?text=...`), so there is no JavaScript to fail. Each button is a real text link, at least 44px tall, and reachable by keyboard.

**If WhatsApp is not there:** a line under the form says "No WhatsApp? Call us on 0322 000 000", as a tap-to-call link. If someone presses Send with an empty box, the browser stops it and says "Please fill out this field".

## 6. Audit of the rebuilt page

**[Full audit with every check](docs/audit.md).** Key results:

- **W3C validator:** no errors or warnings. **Lighthouse:** 100 for Performance, Accessibility, Best Practices and SEO on mobile and desktop. **axe:** 0 problems.
- **Keyboard:** Tab goes skip link, logo, Menu, Call, Call and WhatsApp buttons, questions, contact links, one-tap messages, form. A blue focus ring on every stop ([screenshot](docs/evidence/11-focus-ring.png)).
- **Contrast:** every text pair passes 4.5:1. **200% zoom:** nothing cut off, no sideways scroll.
- **Image:** alt text is "Placeholder for a photo of Kwame repairing a bike in the workshop", so it is never read out as a real photo.
- **Visual system:** no inline styles and no colours outside the variables.

**What I fixed after auditing:** phone numbers could split across two lines (fixed with non-breaking spaces), two sizes were outside the system (now variables), and there was no tab icon (added).

**What I left, and why:** a real photo of Kwame, his real phone numbers, and an exact map pin all need information from him. A live "Open now" sign needs JavaScript, which comes in the next module. `js/script.js` is the starter's placeholder for that module, so this page does not use it.
