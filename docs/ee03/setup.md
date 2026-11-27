# EE03 Setup: Wheelhouse Bike Repair

How Calvin Quashie and Emmanuel Ephrim set up a shared repository, build pipeline, and automated quality checks for Kwame's Wheelhouse Bike Repair site, and why each decision matters for two developers working in one codebase.

---

## 1. Base-Site Decision: Which Version We Built On and Why

Before configuring any tooling in EE03, we compared both post-EE02 repositories (`qcalvin3/wheelhouse-rebuild` and `emma-ephrim/wheelhouse-bike-repair`) and chose **Calvin's codebase** as our shared starting point. Rather than treating the choice socially, we evaluated which codebase would be cheaper and safer for two developers to maintain as Kwame adds new repair services, updated parts pricing, and customer repair guides.

| Criterion                            | Calvin's Site (`wheelhouse-rebuild`)                                                                                       | Emmanuel's Site (`wheelhouse-bike-repair`)                                                             |
| :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| **1. Static-host behaviour**         | Worked out of the box on static hosting using client-side SMS and WhatsApp quick-message handlers                          | Booking form initially returned HTTP `405` on static hosts before being reworked                       |
| **2. EE02 audit debt baseline**      | 4 WCAG 2.2 AA findings in Emmanuel's audit (all resolved cleanly in EE02)                                                  | 7 findings in Calvin's audit, requiring broader markup and CSS touch-ups                               |
| **3. CSS & folder organisation**     | Separate `css/`, `js/`, `images/`, and `docs/` folders, concise root `README.md`, and centralised `:root` colour variables | Separate asset and `docs/ee02/` folders, longer root `README.md`, and less centralised theme tokens    |
| **4. Commit history & porting cost** | Easy to drop Emmanuel's self-contained features into `js/script.js` and `index.html`                                       | Would require rebuilding Calvin's CSS token system and WhatsApp/SMS booking flow across multiple files |

### Why these trade-offs decided it

- **Clean baseline for tracing regressions:** Starting from a static-ready booking flow meant any bug introduced during EE03 tooling changes could be traced directly to our new configuration rather than pre-existing form issues. Even after Emmanuel resolved the `405` form error on his copy, Calvin's client-side SMS/WhatsApp flow already matched Kwame's real workshop workflow with less moving code.
- **Lower structural debt:** Although `4 vs 7` came from two different human auditors (making it a directional indicator rather than an exact score), Calvin's markup needed smaller surgical fixes in EE02, leaving cleaner HTML and CSS to inherit for EE04 to EE06.
- **Cheaper direction to combine ideas:** Emmanuel's strongest addition, a live shop open/closed status badge, is a small, modular enhancement that can be added cleanly on a future feature branch. Going the other way would have meant retrofitting `:root` design variables and rewriting working booking scripts, which risks reintroducing solved accessibility bugs.

---

## 2. Why Version Control & How the Project Is Structured

### Why version control matters here

A plain folder of files works when one person edits it, and breaks down as soon as a second developer joins. Git gives our shared Wheelhouse codebase three protections a shared folder cannot:

1. **Complete history and recovery:** Every change records _what_ changed, _who_ changed it, _when_, and _why_, giving us a clean way to roll back if a price or layout update breaks the live site.
2. **Parallel work without overwriting:** Branches let both of us work on separate tasks at the same time without overwriting each other's files, then reconcile overlapping changes deliberately through pull requests.
3. **Traceability:** Months from now, a third developer can inspect `git log` or `git blame` on any line of CSS, JS, or config and read the commit message and pull request that introduced it.

### Repository structure

```text
wheelhouse-rebuild/
├── .github/
│   ├── pull_request_template.md   # Standardises PR descriptions before review
│   └── workflows/
│       └── ci.yml                 # Runs format, lint, and build checks on GitHub Actions
├── .husky/
│   └── pre-commit                 # Runs lint-staged automatically before every local commit
├── css/
│   └── styles.css                 # Stylesheet organised around :root custom properties
├── docs/
│   ├── ee01/                      # Preserved EE01 deliverables (excluded from Prettier)
│   ├── ee02/                      # Preserved EE02 audit artefacts (excluded from Prettier)
│   └── ee03/
│       └── setup.md               # EE03 shared setup and tooling explanation
├── images/                        # Optimised shop and repair imagery
├── js/
│   └── script.js                  # Mobile navigation and SMS/WhatsApp booking interactions
├── .gitattributes                 # Enforces consistent LF line endings across Windows and Linux
├── .gitignore                     # Keeps generated dependencies and build artefacts out of Git
├── .prettierignore                # Stops Prettier reformatting dist/, node_modules/, docs/ee01, docs/ee02, and lockfiles
├── .prettierrc.json               # Shared formatting rules across editors and OSes
├── eslint.config.js               # ESLint flat config
├── index.html                     # Entry HTML loading js/script.js with type="module"
├── package.json                   # Project scripts, devDependencies, and lint-staged config
├── package-lock.json              # Pins exact dependency versions across machines and CI
├── README.md                      # Two-command quick start and documentation index
└── vite.config.js                 # Configures Vite with relative asset paths (base: './')
```

### Tracked source vs. ignored generated output (`.gitignore`)

We added `node_modules/`, `dist/`, log files, and OS clutter (`.DS_Store`, `Thumbs.db`) to `.gitignore` **before** installing packages or running builds:

- **Committed (`index.html`, `css/`, `js/`, `images/`, `package.json`, `package-lock.json`, config files):** Hand-written source code and dependency definitions that cannot be regenerated automatically if deleted.
- **Ignored (`node_modules/` and `dist/`):** Safe to delete at any time and regenerate via `npm install` (`npm ci`) and `npm run build`. Committing `node_modules/` or `dist/` bloats repository history and creates massive, unreadable merge conflicts in compiled bundles that neither developer wrote by hand.

---

## 3. Conventions & Semantic Versioning

### Branching strategy

We follow AmaliTech's simplified feature-branch workflow rather than pushing straight to `main` (which risks breaking Kwame's live site) or adopting full Gitflow `release/*` branches (which add unnecessary process for a two-person team):

- **`main`:** Always deployable, production-ready code powering the live site.
- **`develop`:** Set as the default integration branch on GitHub so fresh clones and new pull requests target `develop` automatically rather than hitting `main` by mistake.
- **Short-lived task branches (`feature/<name>`, `bugfix/<name>`, `hotfix/<name>`):** Lowercase, hyphenated names that state where the branch merges and how urgent it is, deleted once merged.

### The workflow loop, merge vs. rebase, and conflict resolution

On every change we follow the seven-step loop: switch to `develop` and pull, create a single-purpose branch, make atomic commits, bring `develop` into our branch before merging, resolve any conflicts while keeping both sides' work intact, push, and open a pull request.

We follow the **Golden Rule of Rebasing**:

- While commits are strictly local and unshared, rebasing keeps history linear.
- Once a branch is pushed and opened as a pull request that our pair may have pulled, we **never** `git rebase` or `git push --force`. Whenever parallel branches collide on shared setup files (`package.json`, `package-lock.json`, `.gitignore`, and `docs/ee03/setup.md`), we resolve the conflict using `git merge`, reconcile our tooling configurations and workflow improvements so neither partner's work is discarded, regenerate `package-lock.json` cleanly via `npm install`, and verify all checks pass.

### Commits, pull requests, and code reviews

- **Conventional Commits (`<type>(<scope>): <subject>`):** Every commit is small, atomic, written in the imperative mood (`chore(lint): add eslint flat config with prettier integration`), and machine-readable. Without this convention, scanning fifty `"updates"` or `"fixed stuff"` commits tells a teammate nothing when debugging a regression.
- **Pull requests:** Every PR description answers four questions (_what changed_, _why it is needed_, _how it was tested_, and _whether anything breaks_) because a diff shows _how_ code changed, never how the author tested it.
- **Reviews (`blocking` vs. `optional`):** We pull and run our pair's branch locally before approving, and label every comment using Conventional Comments (`issue`, `suggestion`, `nitpick`, `question`, `praise`) with an explicit `(blocking)` or `(optional)` call based on real-world consequence rather than personal preference.

### Semantic Versioning (`MAJOR.MINOR.PATCH`) and the lockfile

Dependencies in `package.json` follow Semantic Versioning (`MAJOR.MINOR.PATCH`):

- **`MAJOR`:** Incompatible API or behaviour changes that can break existing configs (for example, ESLint v9 replacing `.eslintrc` with `eslint.config.js`).
- **`MINOR`:** Backwards-compatible new features.
- **`PATCH`:** Backwards-compatible bug fixes.

Because `npm` writes caret ranges (`^`) in `package.json` by default (allowing automatic `MINOR` and `PATCH` updates), two developers running `npm install` two weeks apart could end up with different sub-dependency versions without a lockfile. Committing **`package-lock.json`**, installing Prettier with `--save-exact`, and running **`npm ci`** in GitHub Actions guarantees both laptops and CI execute the exact same dependency versions.

---

## 4. What Each Piece of Configuration Does (and What Breaks Without It)

### `package.json` and `npm` scripts

- **What it does:** Declares all tooling under `devDependencies` (`"type": "module"` enabled for ES module configs) and exposes one shared set of commands: `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`, `npm run lint:fix`, `npm run format`, and `npm run format:check`.
- **What goes wrong without it:** Every subsequent tool (Vite, ESLint, Prettier, Husky, and GitHub Actions) hangs off `package.json`. Without shared scripts, a new developer needs verbal instructions to run checks, and local runs drift from CI runs.

### Vite (`vite.config.js` and `<script type="module">` in `index.html`)

- **What it does:** Provides a fast local HTTP dev server (`npm run dev`), bundles and minifies HTML, CSS, ES module JS, and images into `dist/` (`npm run build`), serves the production bundle locally (`npm run preview`), and sets `base: './'` in `vite.config.js` so built asset links remain relative on subpath hosts like GitHub Pages. Loading `js/script.js` with `type="module"` tells Vite to include it in the module graph.
- **What goes wrong without it:** Without `type="module"`, Vite skips bundling `script.js` and the mobile menu and SMS button silently stop working in production. Without `base: './'`, root-relative `/assets/...` paths break when deployed under `/<repo-name>/` on GitHub Pages.

### Line endings (`.gitattributes`)

- **What it does:** Enforces consistent `LF` line endings across all text files (`* text=auto eol=lf`) in both the Git index and local working trees, regardless of whether a developer works on Windows, WSL, macOS, or Linux, while leaving binary image files untouched.
- **What goes wrong without it:** Windows editors and Git setups often write `CRLF` (`\r\n`) while Linux and GitHub Actions (`ubuntu-latest`) expect `LF` (`\n`). Without `.gitattributes`, cross-platform edits create noisy whole-file diffs, cause `prettier --check` to fail with carriage-return errors, and can break `.husky/pre-commit` shell scripts with hidden `\r` characters.

### Prettier (`.prettierrc.json` and `.prettierignore`)

- **What it does:** Enforces one consistent visual style (`"semi": true`, `"singleQuote": false`, `"tabWidth": 2`, `"trailingComma": "es5"`, `"endOfLine": "lf"`) across HTML, CSS, JS, Markdown, JSON, and YAML while ignoring `dist/`, `node_modules/`, `docs/ee01`, `docs/ee02`, and `package-lock.json`.
- **What goes wrong without it:** Different VS Code settings swap single and double quotes or re-indent whole files on save, polluting pull request diffs with hundreds of whitespace changes, creating avoidable merge conflicts, and wasting review time on punctuation instead of behaviour. `"trailingComma": "es5"` also keeps multi-line object/array additions to a one-line diff instead of two.

### ESLint (`eslint.config.js` and `eslint-config-prettier`)

- **What it does:** Checks JavaScript for probable bugs using ESLint's flat config: globally ignores `dist/` and `node_modules/`, starts from `@eslint/js` recommended rules, scopes `globals.browser` (`window`, `document`) to site scripts and `globals.node` to `*.config.js` files, enforces strict equality (`eqeqeq`), `const`/`let` (`no-var`, `prefer-const`), and unused-variable errors (`no-unused-vars`) while flagging `console.log` as `"warn"`, and places `eslint-config-prettier` **last** in the config array.
- **What goes wrong without it:** Prettier will happily format broken code, such as a mistyped variable name, dead code, or a loose `==` coercion bug, without warning. Conversely, without `globals.browser`, ESLint flags every `document.querySelector` call as undefined; without global `ignores: ["dist/**"]`, ESLint fails trying to lint minified build output; and without `eslint-config-prettier` at the end, ESLint and Prettier fight over stylistic rules.

### Husky and `lint-staged` (`.husky/pre-commit`)

- **What it does:** Commits hook scripts inside `.husky/` (wired automatically on `npm install` via `"prepare": "husky"`). Whenever either developer runs `git commit`, `.husky/pre-commit` executes `npx lint-staged`, running `eslint --fix` and `prettier --write` **only on staged files** and blocking the commit (exit code `1`) if a lint error remains.
- **What goes wrong without it:** Quality checks that rely on human memory get forgotten under deadline pressure. Equally important, running ESLint and Prettier across the entire codebase on every commit slows commits down as the repo grows, tempting developers to bypass hooks. Running `lint-staged` keeps commits under a couple of seconds so hooks stay enabled.

### GitHub Actions CI (`.github/workflows/ci.yml`)

- **What it does:** Boots a clean `ubuntu-latest` virtual machine with Node 22 on pushes and pull requests targeting `develop` and `main`, installs exact locked dependencies via `npm ci`, and runs `npm run format:check`, `npm run lint`, and `npm run build`, reporting a visible green or red status check directly on the pull request.
- **What goes wrong without it:** Local pre-commit hooks can be skipped with `git commit --no-verify` or fail silently if someone edits a file before running `npm install`. CI runs on a neutral machine that cannot be bypassed, proving that formatting, linting, and the production build all pass before any human spends time reviewing or merging the pull request.

---

## 5. Workflow Improvements

### 1. Pull Request Template (`.github/pull_request_template.md`) (Implemented by Emmanuel)

- **Problem it solves:** Even when teammates agree on PR standards, opening a pull request at the end of a long coding session into a blank text box makes it easy to forget testing notes or breaking-change warnings, leaving the reviewer to guess how to verify the branch.
- **What it does & who it protects:** Pre-populates every new GitHub pull request with headings for _What this does_, _Why this is needed_, _How it was tested_, _Breaking changes_, and a pre-submission self-review checklist. It protects the **reviewer** from incomplete context and protects **future maintainers in EE04 to EE06** by leaving consistent rationale on every merged PR.

### 2. Branch Protection on `main` and `develop` (Implemented by Calvin)

- **Problem it solves:** Our conventions say every change goes through a pull request with a review and passing checks, but nothing enforced that. One `git push origin develop` from the wrong branch, or one click on **Merge** while CI is red or still running, would put unreviewed or broken code on `develop` or on Kwame's live site (`main`), and the other developer would only find out when something broke. That is exactly what Kwame asked to avoid: "nobody knew the other person had already changed the same thing."
- **What it does:** A GitHub ruleset ("Protect main and develop") with an empty bypass list, so it applies to the repository owner too:
  - changes must come through a pull request with 1 approval;
  - approvals are dismissed when new commits are pushed, so an approval always covers the code the reviewer actually saw;
  - the `quality` CI job must pass, and the branch must be up to date with its target, before merging;
  - force pushes and deleting the branch are blocked.
- **Who it protects:** Both developers, from accidental pushes and from merging each other's unchecked changes. Kwame and his customers, because nothing reaches the live site without a second pair of eyes and a passing build.
- **Evidence:** A test push of an empty commit straight to `develop` was rejected with `GH013: Repository rule violations found for refs/heads/develop` ("Changes must be made through a pull request", "Required status check "quality" is expected"); the test commit only existed locally and was discarded. PR #3 showed "All checks have passed" but "Merging is blocked" until a review was given. The rules also shaped this lab: "up to date" made #3 merge `develop` in before it could merge, which is where our conflict was resolved, and "dismiss stale approvals" meant the resolved version had to be reviewed again.
- **Why keep it permanently:** It costs one approval per change and turns the team's conventions from a promise into something GitHub enforces. As more work lands on the site in EE04 to EE06, the chance of an accidental push only grows, while the protection costs nothing extra. Because it is a repository setting, not a file, it never shows up in a diff, so it is written down here for the next developer.
