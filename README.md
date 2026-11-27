# Wheelhouse Bike Repair: page rebuild

A rebuilt one-page website for Wheelhouse Bike Repair, Kwame's bike repair workshop in Adum, Kumasi. It's built mobile-first in plain HTML, CSS and a little JavaScript, and checked against WCAG 2.2 level AA.

**Live site:** https://qcalvin3.github.io/wheelhouse-rebuild/

> **Not ready for real customers yet.** The photos are placeholders: their licences aren't confirmed, and the hero is AI-generated. The phone numbers and email are the brief's placeholders too. All of these need replacing with Kwame's own before the site is used for his business.

**How to run it:** open the live site, or download the repo and open `index.html` in any browser. There is nothing to install or build.

## Lab write-ups

| Lab      | What it covers                                                            | Documents                                                                                             |
| -------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **EE01** | Diagnosing the original site and rebuilding it                            | [Write-up](docs/ee01/write-up.md) · [Diagnosis](docs/ee01/diagnosis.md) · [Audit](docs/ee01/audit.md) |
| **EE02** | Accessibility: auditing my pair's site, then fixing mine from their audit | [Write-up](docs/ee02/write-up.md) · [My audit of Emmanuel's site](docs/ee02/audit-of-emma-ephrim.md)  |

## What's in the repo

```
index.html          the page
css/styles.css      all styles; colours, spacing and sizes are variables at the top
js/script.js        menu behaviour and the SMS button (the page works without it)
images/             compressed WebP photos
docs/ee01/          EE01 write-up, diagnosis, audit and screenshots
docs/ee02/          EE02 write-up, audit of Emmanuel's site and screenshots
```

## Notes

- **Icons:** [Tabler Icons](https://tabler.io/icons) (MIT licence).
- **Original site, before the rebuild:** [commit e0c6f94](https://github.com/qcalvin3/wheelhouse-rebuild/tree/e0c6f94)
