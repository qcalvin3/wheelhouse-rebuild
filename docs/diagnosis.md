# Diagnosis of the original site

[Back to README](../README.md)

**How I tested:** Chrome DevTools device toolbar at 360 × 640 (a typical phone screen size, since the brief says customers search and compare shops on their phones), the keyboard only (Tab and Enter), the DevTools colour picker for contrast, the Network tab on Slow 4G, and reading `index.html` and `styles.css` line by line. Screenshots are in [`evidence/`](evidence/). Line numbers refer to the original files in [commit e0c6f94](https://github.com/qcalvin3/wheelhouse-rebuild/tree/e0c6f94), before the rebuild.

**Ranking:** findings are ordered by how much they cost Kwame new customers, based on the brief: customers are in a hurry, on their phones, comparing two or three shops, and choosing the one that looks reliable. Findings 1 to 8 are broken: they stop customers reading, tapping, finding or trusting something. Finding 9 is dated: the page works, but looks old and inconsistent, which still weakens trust.

### Findings

| # | Symptom | Root cause | Evidence | Who is affected | Why it matters to the business |
|---|---|---|---|---|---|
| 1 | On a phone the whole page appears shrunk; text is tiny and links are too small to tap | No viewport meta tag, so phones render the page at about 980px and scale it down. Behind that, fixed pixel widths (`960px` ×4, plus 280px, 380px and 360px boxes) stop the layout adapting | No `<meta name="viewport">` in `<head>`; `width: 960px` on `#topnav`, `#headerbanner`, `#pagewrap`, `#pagefooter`; `01-fit.png` | Every phone visitor, which per the brief is nearly every customer | Customers comparing shops on their phone see a hard-to-use page and choose the competitor |
| 2 | An urgent customer must scroll past five sections to find the phone number and hours, and then cannot tap to call | The page follows a generic order (services, FAQ, about, booking, contact) rather than what customers need first. Phone and WhatsApp are plain text, not `tel:` or WhatsApp links | "Find Us & Get In Touch" is second to last in the HTML; `<b>Phone:</b> 0322 000 000<br>`; `01-fit.png`, `02-contact.png` | Every customer who needs a repair today | "They need it fixed today." Every extra step at the moment of contact loses jobs to the competitor |
| 3 | Nothing near the top shows the shop is reliable, and there are no photos at all | The real proof (Kwame repairs every bike personally, open since 2019, same-day repairs, price agreed first) is buried in the About section and inside FAQ answers. The only trust message is an unsupported slogan | Proof sits in "About Wheelhouse" and `.faq-body`; 0 `<img>` elements; `01-fit.png` | Every visitor comparing shops | This is Kwame's exact complaint: "I do good work here. The site does not say that." |
| 4 | When a customer presses Submit in the booking form, nothing happens: no request is sent and no confirmation appears. And even if it did send, the form never asks for a phone number, so Kwame could not reply. | The booking form has no phone field. Both forms use `<input type="button">`, so nothing is submitted. No `<label>`s; every field is `type="text"`, including email and phone | `index.html` lines 127 to 131 and 164 to 172; 0 `<label>` elements | Anyone who tries to book or message | A customer who thinks they booked but did not is a lost job, and an unhappy one |
| 5 | Text is hard to read, and the prices people compare are faint | Small fixed sizes (11px to 13px), mostly set inline. Each price uses a different decorative colour; 5 of 6 fail contrast | Orange price `#f39c12` on `#fafafa` is 2.1:1 (needs 4.5:1); inline `font-size: 12px`; `05-contrast.png` | Phone users outdoors; people with weaker eyesight | Customers cannot easily read the prices they came to compare |
| 6 | None of the menu links work, and "Pricing" leads nowhere | Every link is `href="#"` and sections have no `id`s to link to. There is no pricing section | `<a href="#"><b>SERVICES</b></a>` and four more | Anyone using the menu, the main shortcut on a phone | A menu that does nothing looks unprofessional, the opposite of "knows what it is doing" |
| 7 | Screen reader and keyboard users cannot jump to sections or open the FAQs, and the page outline is confusing | Built from `<div>`s with no `header`, `nav`, `main` or `footer`. Headings chosen for size (an `h3` before the `h2`s). FAQ questions are `<div>`s, so they cannot be focused. No `:focus` styles. `<b>` and `<br>` used for styling | 0 landmarks; heading order h1, h3, h2; 42 `<br>`, 17 `<b>`, 0 lists; 0 `:focus` rules | Screen reader and keyboard users; search engines | An accessible page works for every customer, and a page search engines understand is easier to find |
| 8 | Search results show no description of the shop | No `lang` on `<html>`, no meta description, charset after the title | `index.html` lines 2 to 5 | People finding the shop on Google; screen reader users | Customers find Wheelhouse by searching; a clear description helps it stand out |
| 9 | The page looks patchy and old | No visual system: 18 colour values, 6 font sizes, 21 inline styles. Float-based 960px layout, all-caps nav, copyright 2023 | Six different service card colours; `float: left`; `&copy; 2023`; `09-services.png` | Every visitor | "The current site looks dated, and Kwame thinks that is costing him business." Inconsistency reads as carelessness |

**Tested and not a problem:** page speed. The page is about 10KB with no images or web fonts, so it loads quickly even on Slow 4G. In the rebuild, any photos will be compressed and given `width` and `height` so this stays true.

### The underlying causes

The nine findings come down to five root causes. Fixing these, not each symptom one by one, is the plan for the rebuild:

1. **Built for desktop only.** No viewport tag and fixed pixel widths (findings 1, 5).
2. **Ordered by template, not by customer need.** Contact and trust content buried at the bottom (findings 2, 3).
3. **HTML used for looks, not meaning.** Divs, `<b>`, `<br>` and inline styles instead of semantic elements and shared CSS (findings 5, 7, 9).
4. **Left unfinished.** Placeholder links, buttons that do not submit, and a booking form with no phone field (findings 4, 6).
5. **No visual system.** Colours, sizes and spacing chosen one at a time (findings 5, 9).
