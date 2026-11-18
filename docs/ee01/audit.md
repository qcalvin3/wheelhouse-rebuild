# Audit of the rebuilt page

[Back to README](../README.md)

**How I checked:** the W3C Markup Validation Service and a stricter HTML checker (`html-validate`), Lighthouse on mobile and desktop, an automated accessibility check (axe-core) at 360px and 1280px, the W3C Easy Checks by hand (page title, headings, image text, contrast, keyboard focus, 200% zoom, form labels), every colour pair measured for contrast, and a search of the CSS for values that bypass the visual system.

### Results

| Area | Check | Result |
|---|---|---|
| Semantic HTML | Validation | W3C Markup Validation Service: no errors or warnings. `html-validate`: no errors after the phone number fix below |
| Semantic HTML | Landmarks | `header`, `nav`, `main`, `footer`, plus a labelled `section` for each block |
| Semantic HTML | Heading outline | One `h1`, an `h2` for each section, `h3` for each service. No skipped levels |
| Semantic HTML | Buttons and links | Links go somewhere (sections, `tel:`, WhatsApp, the one-tap messages, maps, email); the form uses a real submit `button`; the menu and questions use `<details>`. No JavaScript is needed for any of it |
| Accessibility | Automated check (axe-core) | 0 violations at 360px and 1280px |
| Overall | Lighthouse (mobile and desktop) | Performance 100, Accessibility 100, Best Practices 100, SEO 100 |
| Accessibility | Page title | "Wheelhouse Bike Repair \| Adum, Kumasi": says what and where |
| Accessibility | Image text | The one image has the alt text "Placeholder for a photo of Kwame repairing a bike in the workshop", so a screen reader never presents it as a real photo |
| Accessibility | Contrast | Every text pair passes 4.5:1, lowest 4.9:1 (the tick marks); body text 15.8:1; orange links, prices and buttons 5.3:1 to 5.7:1 |
| Accessibility | Keyboard | Tab order follows the page: skip link, logo, menu, call, both contact buttons, each question, each contact link, each one-tap message, the form. A visible blue focus ring on every stop (see [`evidence/11-focus-ring.png`](evidence/11-focus-ring.png)) |
| Accessibility | Zoom and text resize | At 200% text size, nothing is cut off and there is no sideways scrolling |
| Accessibility | Form labels | The message box has a visible `<label>` |
| Accessibility | Form feedback | The message box is `required`. If someone presses Send with it empty, the browser stops it and shows (and reads out) "Please fill out this field". If it is filled in, WhatsApp opens with the message ready. If they do not use WhatsApp, a line under the form gives the phone number as a tap-to-call link |
| Accessibility | Link names | Every contact link is text, not an icon: "Call 0322 000 000", "WhatsApp us", "Get directions on Google Maps", and each one-tap message says the problem |
| Visual consistency | Values from the system | 0 inline styles, 0 colours outside the variables, every font size from the type scale |

### What I fixed, in priority order

1. **Phone numbers could split across two lines** on narrow phones (flagged 7 times by `html-validate`, a stricter checker than the W3C validator). Fixed with non-breaking spaces. A number broken in half is easy to misread at the exact moment someone is about to call, so this was a quick win with high value.
2. **One font size (18px) and one padding value sat outside the visual system.** Added `--font-size-lead` and used the spacing variable, so every size now comes from the system.
3. **The browser tab had no icon**, which also showed as an error in Lighthouse. Added a simple "W" icon in the brand orange, so Wheelhouse is easy to spot when a customer has two or three shops open in tabs.

### What I deliberately left, and why

| Left | Why it is not fixed here | Next step |
|---|---|---|
| Real photo of Kwame | High value for trust, but I cannot supply a real photo, and a stock photo of a stranger would be dishonest | Kwame provides a photo; replace the placeholder, keeping `width` and `height` |
| Real phone, WhatsApp and email | The numbers in the brief's starter site are placeholders | Confirm Kwame's real details before going live |
| Exact map pin or landmark | The site only knows "Shop 4, Adum Commercial Area", so the link searches that area | Ask Kwame for a nearby landmark or his exact Google Maps location |
| Menu stays a "Menu" button on desktop | `<details>` works without JavaScript and suits phones, where most customers are. Showing the links in a row on desktop is low value for this brief | Show the links inline on wide screens in a later JavaScript or CSS pass |
| A live "Open now / Closed" status | It would answer "can I bring it in now?" instantly, but it needs JavaScript, which this course covers in the next module | Add it in the Applied JavaScript module |
| `js/script.js` is not used | This lab needs no JavaScript. The file is kept as the starter's placeholder for the Applied JavaScript module, so it is not linked from the page | Use it in that module |
| Some fixed pixel values remain | Borders (1px to 3px), the focus ring, icon sizes and maximum widths. These are fine details and layout limits, not text or spacing, so they sit outside the spacing scale on purpose | None needed |

**Overall:** the five root causes from the diagnosis are fixed at the source: the page is built for phones first, ordered by what customers need, written in semantic HTML, finished (every link and button works), and styled from one visual system. What remains needs real information from Kwame rather than more code.
