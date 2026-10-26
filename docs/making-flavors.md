# Making flavors

How this repo is laid out, and the rules the site build checks. Every change here goes live when the
site is rebuilt and deployed.

## Layout

```sh
apps/
  coolify.toml                  # one file per app
  coolify.svg                   # optional: the app's logo (SVG, no scripts)
flavors/
  coolify/                      # the app's slug (the name of its file in apps/)
    frosted-glass/              # the flavor's slug
      flavor.toml               # the text for the site, and the changelog
      versions/
        1.0.0.user.js           # one full, installable userscript per version
        1.1.0.user.js
      screenshots/
        dashboard.png           # any name: lowercase words joined by "-" (.webp, .png, .jpg or .svg)
        settings.png
```

Slugs are lowercase words joined by `-`. An app cannot use a slug that is a page of the site:
`about`, `apps`, `flavors`, `guide`, `license`, `logos`, `notices`, `shots`, `search`, `404`.

## apps/&lt;app&gt;.toml

```toml
name = "Coolify"
tagline = "The self-hosted PaaS dashboard"
url = "https://coolify.io"
brand = "#8c52ff"               # the app's colour: its name on the site, and its tile's glow
```

Put the app's logo next to it as `apps/<app>.svg` (optional). Without one, the site shows the app's first
letter.

## flavors/&lt;app&gt;/&lt;flavor&gt;/flavor.toml

```toml
name = "Frosted Glass"
summary = "Translucent panels over a slow rose glow."
about = ["First paragraph.", "Second paragraph."]
tags = ["dark", "glass", "rose"]
screenshots = [                 # in page order; the first one is the cover (16:9 looks best)
  { file = "dashboard.png", caption = "The dashboard" },
  { file = "settings.png", caption = "Settings" },
]

[changelog."1.1.0"]
date = "2026-10-24"
tested = "v4.0.0-beta.432"      # the app version you tested it with
type = "changed"                # added | changed | fixed | removed
text = "Softer glass on dialogs."   # one line: one change per version

[changelog."1.0.0"]
date = "2026-10-20"
tested = "v4.0.0-beta.430"
type = "added"
text = "First release."
```

## A version file

A normal userscript. The header must have `@version` equal to the file name and at least one `@match`:

```js
// ==UserScript==
// @name         Coolify — Frosted Glass
// @namespace    https://flavors.shadowarcanist.com
// @version      1.1.0
// @description  Translucent panels over a slow rose glow.
// @author       ShadowArcanist
// @license      MIT
// @match        https://app.coolify.io/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

GM_addStyle(`/* … */`);
```

No `@updateURL`, `@downloadURL` or `@installURL`: flavors never update by themselves. People install a new
version from the site when they want it.

## Make a new version

1. Copy the newest file in `versions/` to the next version, for example `1.1.0.user.js` to
   `1.2.0.user.js`, and change `@version` in its header.
2. Make your changes in the new file.
3. Add its `[changelog."1.2.0"]` entry to `flavor.toml`.
4. Rebuild and deploy the site.

Use plain `x.y.z` version numbers. Never change or delete a released version file: people may have that
exact version installed, and the site keeps every version installable.

## Rules

The site build checks these and stops with a list of every problem:

- Every app folder in `flavors/` has its `apps/<app>.toml`, and every `apps/<app>.svg` has its `.toml`.
- Every flavor has a `flavor.toml` with `name`, `summary`, `about` and at least one screenshot.
- Every listed screenshot exists and has a caption, and every image in `screenshots/` is listed.
- Every file in `versions/` is named `x.y.z.user.js` and has a changelog entry; every entry has a file.
- Every header has `@version` equal to its file name, at least one `@match`, and no update URLs.
- Every changelog entry has a `date` (not in the future), `tested`, a `type` and a one-line `text`.
