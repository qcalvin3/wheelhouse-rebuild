# Wheelhouse Bike Repair: page rebuild

A rebuilt one-page website for Wheelhouse Bike Repair, Kwame's bike repair workshop in Adum, Kumasi. It's built mobile-first in plain HTML, CSS and a little JavaScript, and checked against WCAG 2.2 level AA.

**Live site:** https://qcalvin3.github.io/wheelhouse-rebuild/

> **Not ready for real customers yet.** The photos are placeholders: their licences aren't confirmed, and the hero is AI-generated. The phone numbers and email are the brief's placeholders too. All of these need replacing with Kwame's own before the site is used for his business.

**How to run it:** open the live site, or run it locally (below).

## Run it locally

You need [Node.js](https://nodejs.org/) 22 or newer.

```
npm install    # installs the tools and switches on the pre-commit hook
npm run dev    # starts a local server; open the address it prints
```

> **Don't open `index.html` by double-clicking it.** The script is loaded as a module, and browsers block modules from `file://`, so the menu and the SMS button won't work. Use `npm run dev`, or `npm run preview` after a build.

| Command                | What it does                                                         |
| ---------------------- | -------------------------------------------------------------------- |
| `npm run build`        | Builds the final site into `dist/`                                   |
| `npm run preview`      | Serves the built site so you can check it before release             |
| `npm run lint`         | Checks the JavaScript for likely bugs (ESLint)                       |
| `npm run format`       | Formats every file to the shared style (Prettier)                    |
| `npm run format:check` | Reports formatting problems without changing anything (CI runs this) |

Every commit runs ESLint and Prettier on the files you staged. Every pull request into `develop` or `main` runs the same checks plus a build on GitHub Actions. Both branches are protected: changes need a pull request, one approval and a passing check.

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
package.json        scripts, tool versions and lint-staged (what the pre-commit hook checks)
vite.config.js      Vite settings (base: './' keeps built links relative)
eslint.config.js    ESLint rules
.prettierrc.json    Prettier style rules (.prettierignore lists what it skips)
.gitattributes      keeps LF line endings on every machine
.husky/pre-commit   runs lint-staged before every commit
.github/workflows/  CI: format, lint and build on every push and pull request
```

## Notes

- **Icons:** [Tabler Icons](https://tabler.io/icons) (MIT licence).
- **Original site, before the rebuild:** [commit e0c6f94](https://github.com/qcalvin3/wheelhouse-rebuild/tree/e0c6f94)
