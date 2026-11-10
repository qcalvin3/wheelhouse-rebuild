# Wheelhouse Bike Repair: Page Rebuild

## 1. Understanding the brief

| Question                                   | Answer                                                                                                                                                                                                           | From the brief                                                                                                                                           |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Who comes to the page, and on what device? | People near Adum, Kumasi, whose bike has just broken down (a flat, a broken chain, or a bike not serviced in years). They are on their phone, often out and about.                                               | "they search on their phone for a nearby workshop"                                                                                                       |
| What did they come to do?                  | Get the bike fixed today: check the shop can fix their problem, decide if they trust it more than the other shops they are comparing, then call, message or go there.                                            | "They need it fixed today. They look at two or three shops on their phone and pick the one that looks like it knows what it is doing."                   |
| What gets in their way today?              | The current site does not fit a phone screen, the text is small and pale, the phone number and hours are at the very bottom, and the facts that show Kwame is reliable are buried in the FAQ and About sections. | "he suspects his site does not give them enough confidence that he is reliable or professional"                                                          |
| What does the owner need to happen?        | More new customers choosing Wheelhouse over the competitor and getting in touch, with a site that feels trustworthy rather than trendy.                                                                          | "New-customer numbers have been flat while a competitor down the road has been growing." · "He does not want the site to feel trendy for its own sake." |

## 2. Sketch and structure

![Page structure sketch, mobile and desktop](docs/sketch.png)

Kwame's customers arrive on a phone, in a hurry, comparing two or three shops, and they pick the one that "looks like it knows what it is doing". So the first phone screen (blocks 1 to 4, above the dashed line) answers three questions in order: **can this shop fix my problem nearby, can I reach them right now, and can I trust them?** Everything below the line is detail for people who are still deciding.

| #  | Block                           | Why it is here                                                                                                                                                                           | From the brief                                     |
| -- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| 1  | Header with Menu and Call       | Calling is the quickest way for a customer to reach Kwame, so the Call button is always at the top. The menu lets them jump straight to what they need, like prices or directions, without scrolling the whole page on a small screen. I kept the header small so the important information still fits on the first screen.                                                   | "They need it fixed today"                         |
| 2  | What and where                  | As soon as customers open the site, they can see where the shop is, whether it fixes their problem, and that most repairs are done the same day.                                        | "a flat, a broken chain… a nearby workshop"       |
| 3  | Open today + Call and WhatsApp  | Now they know the shop can fix their problem, the next step is reaching it. Today's hours answer "can they fix it today?"                                                                            | "They need it fixed today"                         |
| 4  | Why riders trust Wheelhouse | Real facts from the old site (Kwame repairs every bike personally, open since 2019, price agreed before work) plus a real photo of Kwame. This is what wins the side-by-side comparison. | "I do good work here. The site does not say that." |
| 5  | Services and from prices        | People compare shops on what they fix and roughly what it costs. Real prices from the old site.                                                                                          | "compare a few shops side by side on their phones" |
| 6  | How it works                    | Bring it in, Kwame calls with a price, you approve, collect. Removes the fear of a surprise bill.                                                                                        | "confidence that he is reliable or professional"   |
| 7  | Questions                       | Remaining doubts (repair times, walk-ins, bike types) for people still deciding.                                                                                                         | "confidence that he is reliable"                   |
| 8  | About Kwame                     | Makes the shop feel personal and real. Detail, so it sits lower.                                                                                                                         | "I do good work here"                              |
| 9  | Find the workshop               | Full address, hours, directions and a map or landmark. Adum is busy, so a landmark helps people find the shop.                                                                           | "a nearby workshop"                                |
| 10 | Short form (backup)             | For people who prefer to message. One form replaces the two old forms that asked similar things. On a phone, calling is faster, so it is not the main action.                            | "search on their phone"                            |
| 11 | Footer                          | Contact details repeated for anyone who scrolls to the end.                                                                                                                              |                                                    |

**What I deliberately left out:** a large photo banner at the top. On a phone it would push the contact buttons and trust points off the first screen, and Kwame wants the site to build trust rather than look trendy.

## 3. Diagnosis of the original site

**How I tested:** Chrome DevTools device toolbar at 360 × 640 (a typical phone), the keyboard only (Tab and Enter), the DevTools colour picker for contrast, the Network tab on Slow 4G, and reading `index.html` and `styles.css` line by line. Screenshots are in `docs/evidence/`.

**Ranking:** findings are ordered by how much they cost Kwame new customers, based on the brief: customers are in a hurry, on their phones, comparing two or three shops, and choosing the one that looks reliable. Findings 1 to 8 are broken: they stop customers reading, tapping, finding or trusting something. Finding 9 is dated: the page works, but looks old and inconsistent, which still weakens trust.

### Findings

| # | Symptom | Root cause | Evidence | Who is affected | Why it matters to the business |
|---|---|---|---|---|---|
| 1 | On a phone the whole page appears shrunk; text is tiny and links are too small to tap | No viewport meta tag, so phones render the page at about 980px and scale it down. Behind that, fixed pixel widths (`960px` ×4, plus 280px, 380px and 360px boxes) stop the layout adapting | No `<meta name="viewport">` in `<head>`; `width: 960px` on `#topnav`, `#headerbanner`, `#pagewrap`, `#pagefooter`; `01-fit.png` | Every phone visitor, which per the brief is nearly every customer | Customers comparing shops on their phone see a hard-to-use page and choose the competitor |
| 2 | An urgent customer must scroll past five sections to find the phone number and hours, and then cannot tap to call | The page follows a generic order (services, FAQ, about, booking, contact) rather than what customers need first. Phone and WhatsApp are plain text, not `tel:` or WhatsApp links | "Find Us & Get In Touch" is second to last in the HTML; `<b>Phone:</b> 0322 000 000<br>`; `01-fit.png`, `02-contact.png` | Every customer who needs a repair today | "They need it fixed today." Every extra step at the moment of contact loses jobs to the competitor |
| 3 | Nothing near the top shows the shop is reliable, and there are no photos at all | The real proof (Kwame repairs every bike personally, open since 2019, same-day repairs, price agreed first) is buried in the About section and inside FAQ answers. The only trust message is an unsupported slogan | Proof sits in "About Wheelhouse" and `.faq-body`; 0 `<img>` elements; `01-fit.png` | Every visitor comparing shops | This is Kwame's exact complaint: "I do good work here. The site does not say that." |
| 4 | A customer can submit a booking that Kwame can never reply to, and gets no confirmation | The booking form has no phone field. Both forms use `<input type="button">`, so nothing is submitted. No `<label>`s; every field is `type="text"`, including email and phone | `index.html` lines 127 to 131 and 164 to 172; 0 `<label>` elements | Anyone who tries to book or message | A customer who thinks they booked but did not is a lost job, and an unhappy one |
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

## 4. Visual system

All colours, sizes and spacing come from CSS custom properties at the top of `css/styles.css`. No one-off values.

| Choice | Value | Why, for Wheelhouse |
|---|---|---|
| Primary colour | `#1f4e8c` deep blue | Reads as dependable and professional. White text on it is 8.3:1, easy to read outdoors. Replaces the old site's six different card colours with one |
| Accent | `#b45309` burnt amber | For links and highlights only. 4.7:1 on the background |
| Text | `#1b2430` on `#f5f7fa` | 14.6:1 contrast, readable in sunlight |
| Font | System font | No download, so the page stays fast on mobile data. Clean, not trendy |
| Body size | 16px | Readable without zooming (the old site used 11px to 13px) |
| Type scale | 1.2 ratio; headline 28px to 40px with `clamp()` | Headings clearly different, but the headline never pushes the Call button off the first phone screen |
| Spacing | 4 / 8 / 16 / 24 / 32 / 48 | Tight inside groups, loose between sections, so it is clear what belongs together |
| Tap targets | At least 44px tall | Call and WhatsApp are easy to tap with one thumb |
