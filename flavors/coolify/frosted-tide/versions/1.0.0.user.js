// ==UserScript==
// @name         Frosted Tide
// @namespace    https://flavors.shadowarcanist.com
// @version      1.0.0
// @author       ShadowArcanist
// @description  Floating islands of frosted glass (sidebar, top bar, content, each settings section and modals, with even gaps) over a wallpaper, and an ocean-blue brand colour
// @match        https://coolify.shadowarcanist.com/*
// @license      MIT
// @run-at       document-start
// @inject-into  page
// @grant        none
// ==/UserScript==

(() => {
  'use strict';

  // ── Settings ───────────────────────────────────────────────────────────
  const WALLPAPER = 'https://images.unsplash.com/photo-1689267305146-155a1459752c'; // '' = plain backdrop
  const WALLPAPER_DIM_DARK = 0.58;  // black veil over the wallpaper in dark mode (0 = clear, 1 = solid)
  const WALLPAPER_DIM_LIGHT = 0.6;  // white veil in light mode
  const WALLPAPER_BLUR = 16;        // frosted wallpaper, in px (0 = sharp)
  const GLASS = true;               // islands as frosted glass over the wallpaper (false = solid islands)
  const ISLAND_GAP = 8;             // px between the islands and the window edges
  const ISLAND_RADIUS = 12;         // px
  // Solid colours (no wallpaper, or GLASS off) and the page under the islands.
  const ISLAND = '#141414';
  const BACKDROP = '#0c0c0c';
  const LIGHT_ISLAND = '#ffffff';
  const LIGHT_BACKDROP = '#fafafa';
  // Brand (Coolify's purple → tide ocean blue): the accent, a light tint (dark mode text), a deep shade (light mode text).
  const BRAND = '#2271b3';
  const BRAND_HOVER = `color-mix(in oklab, ${BRAND} 88%, white)`; // hover / lit shade (Coolify's own formula: brand + 12% white)
  const BRAND_LIGHT = '#8fc8f0';
  const BRAND_DEEP = '#185e96';
  const BRAND_PALE = '#c4e3f8';     // the palest tint (Coolify's #b9adff)
  const BRAND_WASH = '#eef7fd';     // light tint background (--color-coollabs-50)
  const SIDEBAR_DARK = '#0a0d10';   // dark sidebar colour (Coolify's purple-black #120e1a)
  const NAV_TEXT = '#cfd5db';       // dark sidebar text and muted text (Coolify's purple-tinted greys)
  const NAV_MUTED = '#878f97';
  // ───────────────────────────────────────────────────────────────────────

  const KEY = 'coolify-frosted-tide';
  const html = document.documentElement;
  // Coolify's custom theme and its own "floating" navigation style keep their look.
  const SHELL = 'html:not([data-theme="custom"]):not([data-nav-style="floating"])';
  const GLASS_ON = GLASS && !!WALLPAPER;
  const GAP = `${ISLAND_GAP}px`;
  const RADIUS = `${ISLAND_RADIUS}px`;
  // Coolify's cards (link cards, table cards, stat boxes, empty states): all get the one card surface (--ux-card).
  const SEC_CARD = '[class*="dark:bg-surface"]'; // cards in a section (Compose resources…)
  const CARD = ':is(:is(article.group, a.group).rounded-xl, [class~="rounded-xl"]:is([class~="dark:bg-white/[0.05]"], [class~="dark:bg-white/[0.025]"]))';

  /** The wallpaper under its veil (black in dark mode, white in light mode). */
  const wallpaperLayer = dark => {
    const veil = dark ? `rgb(0 0 0 / ${WALLPAPER_DIM_DARK})` : `rgb(255 255 255 / ${WALLPAPER_DIM_LIGHT})`;
    return `linear-gradient(${veil}, ${veil}), url("${WALLPAPER}") center / cover no-repeat`;
  };
  // The wallpaper layers reach this far past the window, so the blur has no faded edges.
  const EDGE = WALLPAPER ? WALLPAPER_BLUR * 2 : 0;
  const FROST = WALLPAPER && WALLPAPER_BLUR ? `filter: blur(${WALLPAPER_BLUR}px) saturate(1.2);` : '';

  // ── Shell islands: the top bar's breadcrumb row, the sidebar and the content (desktop) ──
  // PERF: the islands on section pages (sections, lone blocks, the page header, lone controls, an in-page rail) have
  // only the fixed wallpaper behind them, which is frosted already (WALLPAPER_BLUR): plain glass, no backdrop-filter,
  // like the content island on the other pages. A backdrop filter runs again on every repaint inside the island (a
  // graph's hover line and tooltip: 31 ms frames with a 30px blur, 12 ms with a saturate only, 6 ms with none).
  // The top bar, the sidebar and modals (page content behind them) keep the blur.
  const ISLANDS_CSS = `
    @media (min-width: 1024px) {
      ${SHELL} { --ux-island: ${LIGHT_ISLAND}; --ux-backdrop: ${LIGHT_BACKDROP}; --ux-gap: ${GAP}; --ux-radius: ${RADIUS}; }
      ${SHELL}.dark { --ux-island: ${ISLAND}; --ux-backdrop: ${BACKDROP}; }
      ${SHELL} main.app-main { background: var(--ux-island); }
      /* The page under the islands: the backdrop colour, and the wallpaper (frosted) on a fixed layer over it. */
      ${SHELL} { background: var(--ux-backdrop); }
      ${SHELL} body { background: ${WALLPAPER ? 'transparent' : 'var(--ux-backdrop)'}; }
      ${WALLPAPER ? `
      ${SHELL} body::before {
        content: ''; position: fixed; inset: -${EDGE}px; z-index: -1; pointer-events: none;
        background: ${wallpaperLayer(true)}; ${FROST}
      }
      ${SHELL}:not(.dark) body::before { background: ${wallpaperLayer(false)}; }` : ''}
      ${GLASS_ON ? `
      /* Frosted glass: the islands are see-through, blurred on a layer behind their content (not on the island
         itself, so Coolify's fixed menus inside keep their place). */
      ${SHELL} { --ux-glass: rgb(255 255 255 / 0.56); --ux-blur: blur(30px) saturate(1.35); --ux-film: light-dark(rgb(255 255 255 / 0.5), rgb(255 255 255 / 0.04));
        /* ONE card surface for every card on the glass (link cards, table cards, stat boxes, empty states, section cards):
           a well, so text reads clearly (a white film washes it out on dark glass). */
        --ux-card: light-dark(rgb(255 255 255 / 0.72), rgb(0 0 0 / 0.2)); }
      ${SHELL}.dark { --ux-glass: rgb(14 14 14 / 0.5); }
      ${SHELL}, ${SHELL}.dark { --ux-island-glass: var(--ux-glass); } /* resolved here, inherited as a value */
      ${SHELL} main.app-main { background: var(--ux-glass); }
      /* Coolify mixes its see-through surfaces (cards, inputs, buttons) with --color-app to make them solid in the
         content; with no base colour they stay see-through on the glass, as they are in the sections. */
      ${SHELL}.dark main.app-main { --color-app: transparent; }
      @layer theme {
        /* Cards (projects, servers, table cards, stat boxes, empty states; Coolify: white / white 5%): the one card surface. */
        ${SHELL} main.app-main ${CARD} { background-color: var(--ux-card) !important; }
        /* Tile grids (dashboard traffic): Coolify draws the dividers with the card colour in 1px gaps; here the card is the
           card surface and each tile draws its own divider. */
        ${SHELL} main.app-main [class~="rounded-xl"][class~="gap-px"][class~="dark:bg-white/[0.07]"] { background-color: var(--ux-card) !important; }
        ${SHELL} main.app-main [class~="rounded-xl"][class~="gap-px"][class~="dark:bg-white/[0.07]"] > * {
          background-color: transparent !important;
          box-shadow: 1px 0 0 light-dark(rgb(0 0 0 / 0.08), rgb(255 255 255 / 0.07)), 0 1px 0 light-dark(rgb(0 0 0 / 0.08), rgb(255 255 255 / 0.07));
        }
        ${SHELL} main.app-main [class~="rounded-xl"][class~="gap-px"][class~="dark:bg-white/[0.07]"] > :hover { background-color: light-dark(rgb(255 255 255 / 0.4), rgb(255 255 255 / 0.03)) !important; }
        ${SHELL} main.app-main [class~="rounded-xl"][class~="dark:bg-white/[0.05]"] > [class~="border-b"]:first-child {
          background: light-dark(rgb(0 0 0 / 0.025), rgb(255 255 255 / 0.035)) !important;
        }
      }
      ${SHELL} main.app-main-full { background: transparent; }
      ${SHELL} :is(.app-sidebar, .app-topbar > div.flex-1) { background: transparent !important; isolation: isolate; }
      ${SHELL} :is(.app-sidebar, .app-topbar > div.flex-1)::before {
        content: ''; position: absolute; inset: 0; z-index: -1; border-radius: inherit; pointer-events: none;
        background: var(--ux-glass); backdrop-filter: var(--ux-blur); -webkit-backdrop-filter: var(--ux-blur);
      }
      ${SHELL} .app-topbar > div.flex-1 { position: relative; }
      ${SHELL} .app-sidebar nav.sidebar-nav { background: transparent !important; }` : ''}
      /* (!important: Coolify's dark top bar colour, html.dark … .app-topbar, has the same weight and comes later) */
      ${SHELL} .app-topbar { background: transparent !important; backdrop-filter: none !important; }
      ${SHELL} .app-topbar > .app-topbar-brand { border-right-width: 0; border-bottom-width: 0; padding-top: var(--ux-gap); background: transparent; }
      /* When the page scrolls (html.is-scrolled), Coolify paints the logo area with the sidebar colour and puts a line and
         a shadow under the top bar; the islands keep their look. */
      ${SHELL}.is-scrolled .app-topbar > .app-topbar-brand { background-color: transparent !important; }
      ${SHELL}.is-scrolled .app-topbar > div:not(.app-topbar-brand) { border-bottom-color: transparent !important; box-shadow: none !important; }
      ${SHELL} .app-topbar > .app-topbar-brand.px-4 { padding-left: calc(1.375rem + var(--ux-gap)); }
      ${SHELL} .app-topbar > .app-topbar-brand.px-0 { padding-left: var(--ux-gap); }
      ${SHELL} .app-topbar > div.flex-1 {
        height: calc(100% - var(--ux-gap)); margin: var(--ux-gap) var(--ux-gap) 0;
        border-bottom-width: 0; border-radius: var(--ux-radius); background: var(--ux-island);
      }
      ${SHELL} .app-sidebar {
        top: var(--ux-gap); bottom: var(--ux-gap); left: var(--ux-gap);
        width: calc(var(--sidebar-w, 14rem) - var(--ux-gap)); padding-top: calc(3rem - var(--ux-gap));
        border-radius: var(--ux-radius); background: var(--ux-island);
      }
      ${SHELL} .app-sidebar nav { background: transparent; border-right-width: 0; }
      /* The frame around the content island: the wallpaper (or backdrop) with a rounded hole, so content that
         scrolls under the top bar and the gaps is covered. The hole follows the window and the sidebar (script). */
      ${SHELL} main.app-main::before {
        content: ''; position: fixed; inset: -${EDGE}px; z-index: 30; pointer-events: none;
        background: ${WALLPAPER ? wallpaperLayer(true) : 'var(--ux-backdrop)'};
        background-color: var(--ux-backdrop); ${FROST}
        clip-path: var(--glass-hole, inset(0 0 100% 0)); /* no hole known yet: no frame (never cover the page) */
      }
      ${SHELL}:not(.dark) main.app-main::before {
        background: ${WALLPAPER ? wallpaperLayer(false) : 'var(--ux-backdrop)'};
        background-color: var(--ux-backdrop);
      }
    }
  `;

  // ── Glass surfaces: Coolify paints inputs, rows, cards, badges, wells and lines with SOLID greys (its surface variables,
  // and in light mode white / neutral-50 / neutral-100 utilities); on glass they show as grey or black blocks. In the
  // islands they become films of the same strength (white on dark, black or white on light). Dropdown menus, tooltips and
  // dialogs float over the page: they keep Coolify's solid colours (taken from <html>, where nothing is changed).
  // (Coolify's modal panel is a section with .application-settings-form, moved to <body>: an island too, see MODAL_CSS.)
  const ISLAND_SCOPE = ':is(main.app-main, .app-sidebar, .app-topbar, .application-settings-form.application-settings-section)';
  const FLOATING = ':where(.listbox-panel, [role="menu"], [role="listbox"], [role="dialog"], [role="tooltip"], .info-helper-popup, .command-palette)';
  const SURFACE_VARS = ['--coollabs-recessed', '--coollabs-base', '--coollabs-elevated', '--coollabs-fill', '--coollabs-line', '--coollabs-hairline',
    '--color-surface', '--color-raised', '--color-selected', '--color-card', '--color-panel', '--color-base', '--color-log',
    '--color-coolgray-100', '--color-coolgray-200', '--color-coolgray-300', '--color-coolgray-400', '--color-coolgray-500',
    '--color-neutral-50', '--color-neutral-100', '--color-neutral-200'];
  const SURFACES_CSS = !GLASS_ON ? '' : `
    @media (min-width: 1024px) {
      /* Coolify's solid values, kept on <html> for what floats over the page. */
      ${SHELL} { ${SURFACE_VARS.map(v => `--glass-solid${v.slice(1)}: var(${v});`).join(' ')} }
      ${SHELL}.dark ${ISLAND_SCOPE} {
        --coollabs-recessed: rgb(255 255 255 / 0.035); --coollabs-base: rgb(255 255 255 / 0.045); --coollabs-elevated: rgb(255 255 255 / 0.04);
        --coollabs-fill: rgb(255 255 255 / 0.08); --coollabs-line: rgb(255 255 255 / 0.1); --coollabs-hairline: rgb(255 255 255 / 0.1);
        --color-surface: rgb(255 255 255 / 0.04); --color-raised: rgb(255 255 255 / 0.05); --color-selected: rgb(255 255 255 / 0.08);
        --color-card: rgb(255 255 255 / 0.04); --color-panel: rgb(255 255 255 / 0.04); --color-base: rgb(255 255 255 / 0.03); --color-log: rgb(0 0 0 / 0.32);
        --color-coolgray-100: rgb(255 255 255 / 0.04); --color-coolgray-200: rgb(255 255 255 / 0.05); --color-coolgray-300: rgb(255 255 255 / 0.065);
        --color-coolgray-400: rgb(255 255 255 / 0.08); --color-coolgray-500: rgb(255 255 255 / 0.1);
      }
      ${SHELL}:not(.dark) ${ISLAND_SCOPE} {
        --coollabs-recessed: rgb(0 0 0 / 0.035); --coollabs-base: rgb(255 255 255 / 0.5); --coollabs-elevated: rgb(255 255 255 / 0.45);
        --coollabs-fill: rgb(0 0 0 / 0.07); --coollabs-line: rgb(0 0 0 / 0.1); --coollabs-hairline: rgb(0 0 0 / 0.1);
        --color-surface: rgb(255 255 255 / 0.45); --color-raised: rgb(255 255 255 / 0.5); --color-selected: rgb(0 0 0 / 0.06);
        --color-card: rgb(255 255 255 / 0.5); --color-panel: rgb(255 255 255 / 0.45); --color-base: rgb(255 255 255 / 0.4); --color-log: rgb(255 255 255 / 0.55);
        --color-coolgray-100: rgb(0 0 0 / 0.03); --color-coolgray-200: rgb(0 0 0 / 0.045); --color-coolgray-300: rgb(0 0 0 / 0.06);
        --color-coolgray-400: rgb(0 0 0 / 0.08); --color-coolgray-500: rgb(0 0 0 / 0.1);
        /* Tailwind's palest neutrals (bands, tiles, hovers and borders in light mode). */
        --color-neutral-50: rgb(0 0 0 / 0.02); --color-neutral-100: rgb(0 0 0 / 0.045); --color-neutral-200: rgb(0 0 0 / 0.09);
      }
      ${SHELL} ${ISLAND_SCOPE} ${FLOATING} { ${SURFACE_VARS.map(v => `${v}: var(--glass-solid${v.slice(1)});`).join(' ')} }
      /* Light mode: white surfaces (bg-white, buttons, the view toggle) as a white film. */
      @layer theme {
        ${SHELL}:not(.dark) ${ISLAND_SCOPE} :is([class~="bg-white"], [class~="bg-white!"]):not(${FLOATING}, ${FLOATING} *, ${CARD}, ${SEC_CARD}) {
          background-color: rgb(255 255 255 / 0.55) !important;
        }
      }
      ${SHELL}:not(.dark) ${ISLAND_SCOPE} :is(.button:not(.button-highlighted):not(.button-error):not([isHighlighted]), .view-toggle):not(${FLOATING} *) {
        background-color: rgb(255 255 255 / 0.6);
      }
      /* Light mode: Coolify's white wells (empty states, section wells) and the log toolbar pieces. */
      ${SHELL}:not(.dark) ${ISLAND_SCOPE} :is(.application-settings-section, .application-settings-section-body, .empty-state) { --well-bg: rgb(255 255 255 / 0.5); }
      ${SHELL}:not(.dark) ${ISLAND_SCOPE} .runtime-log-lines-group { background: rgb(255 255 255 / 0.55); }
      ${SHELL}:not(.dark) ${ISLAND_SCOPE} .runtime-log-columns { background: rgb(0 0 0 / 0.035); }
    }
  `;

  // ── Section islands: on pages with settings sections, each section is its own island (no content island) ──
  // Only their surface changes: Coolify's card and inset well become one glass island with a header band.
  const SEC = 'html:root main .application-settings-section:not(.application-settings-form):not(.application-settings-section *)';
  const SEC_HEADER = `${SEC} > :is(header, .application-settings-section-header)`;
  // Set by the script (markSections), not html:has(…): a :has() on <html> makes Chrome restyle the whole page on each
  // live update (about 20 ms each on the dashboard).
  const SEC_PAGE = `${SHELL}.${KEY}-sections`;
  const SEC_PAD = '1.5rem';
  // Blocks that stand alone between the sections (tables and cards outside a section: the environment variables
  // table, a service's domain cards, plain section bodies): islands too, with exactly the sections' glass.
  // A body that holds other bodies (a list of domain cards…) is only a wrapper: its cards are the islands.
  const BODY_ISLAND = '.application-settings-section-body:not(:has(.application-settings-section-body))';
  const LONE = `${SEC_PAGE} main :is(${BODY_ISLAND}, .data-table):not(.application-settings-section *):not(:is(${BODY_ISLAND}, .data-table) *)`;
  const SEC_ANY = '.application-settings-section:not(.application-settings-form)';
  // Inputs, dropdown triggers, buttons and view toggles outside any island (not highlighted / brand buttons).
  const LONE_CONTROL = `${SEC_PAGE} main :is(input:not([type="checkbox"], [type="radio"], [type="hidden"]), textarea, .listbox-trigger, .view-toggle, .button:not(.button-highlighted, .button-error, [isHighlighted]))`
    + ':not(:is(.application-settings-section, .application-settings-section-body, .data-table, [class~="rounded-xl"], .view-toggle, .listbox-panel, [role="menu"], [role="listbox"], [role="dialog"]) *)';
  const LONE_WRAP = `${SEC_PAGE} main .application-settings-section-body:has(.application-settings-section-body):not(.application-settings-section *)`;
  const SECTION_ISLANDS_CSS = `
    @media (min-width: 1024px) {
      /* No content island: the wallpaper shows between the sections (Coolify's own spacing kept). */
      ${SEC_PAGE} main.app-main { background: transparent; }
      /* The islands line up with the top bar island: the island gap under the top bar and at the sides (Coolify: 28px
         and 40px), no centered width. */
      ${SEC_PAGE} main.app-main { padding-top: calc(3rem + var(--ux-gap)); padding-inline: var(--ux-gap); }
      ${SEC_PAGE} main.app-main > div { max-width: none; }
      ${SEC} {
        position: relative; padding: 1rem ${SEC_PAD} ${SEC_PAD}; border: 0; border-radius: var(--ux-radius);
        background: ${GLASS_ON ? 'transparent' : 'var(--ux-island)'}; box-shadow: none;
      }
      ${GLASS_ON ? `
      /* Frosted glass on a layer behind the section's content. The section in use comes to the front, so its
         dropdowns open over the next section. */
      ${SEC} { isolation: isolate; }
      ${SEC}:is(:focus-within, :hover) { z-index: 2; }
      ${SEC}::before {
        content: ''; position: absolute; inset: 0; z-index: -1; border-radius: inherit; pointer-events: none;
        background: var(--ux-glass);
      }
      /* Lone blocks: the same island glass (Coolify: its well colour, which is a thin film here); same radius, no frame. */
      ${LONE} {
        position: relative; isolation: isolate; border-color: transparent !important; border-radius: var(--ux-radius) !important;
        background: transparent !important; box-shadow: none !important;
      }
      ${LONE}:is(:focus-within, :hover) { z-index: 2; }
      ${SEC_PAGE} main :is(input, textarea) { --glass-control-film: var(--coollabs-recessed); }
      ${SEC_PAGE} main :is(.listbox-trigger, .view-toggle, .button) { --glass-control-film: light-dark(rgb(255 255 255 / 0.35), rgb(255 255 255 / 0.05)); }
      ${LONE_WRAP} {
        border-color: transparent !important; background: transparent !important; box-shadow: none !important;
        padding-inline: 0 !important; border-inline-width: 0 !important; /* its cards line up with the other islands */
      }
      ${LONE}::before {
        content: ''; position: absolute; inset: 0; z-index: -1; border-radius: inherit; pointer-events: none;
        background: var(--ux-glass);
      }
      /* Cards in a section (Compose resources…): a light film on the glass, not a solid surface. */
      ${SEC} ${SEC_CARD} { background: var(--ux-card); }
      ${SEC} ${SEC_CARD}:hover { background: light-dark(rgb(255 255 255 / 0.85), rgb(0 0 0 / 0.12)); }` : ''}
      /* Header: the island's top band, closed by a faint divider (its contents unchanged). */
      ${SEC_HEADER} {
        min-height: 0; margin: 0 -${SEC_PAD} 1rem; padding: 0 ${SEC_PAD} 0.75rem;
        border-bottom: 1px solid light-dark(rgb(0 0 0 / 0.06), rgb(255 255 255 / 0.06)); border-radius: 0; background: none;
      }
      /* Body: no inset well. Flush bodies (tables, lists) run to the island's sides and bottom. */
      ${SEC} > .application-settings-section-body { padding: 0; border: 0; border-radius: 0; background: none; box-shadow: none; }
      ${SEC} > .application-settings-section-body.is-flush {
        margin: 0 -${SEC_PAD} -${SEC_PAD}; border-radius: 0 0 var(--ux-radius) var(--ux-radius); overflow: hidden;
      }
      /* A settings rail in the page (not in the main sidebar): glass in its own place. */
      ${SEC_PAGE} main .application-settings-navigation:not(.in-main-nav) {
        border-radius: var(--ux-radius); background: ${GLASS_ON ? 'var(--ux-glass)' : 'var(--ux-island)'};
      }
    }
  `;

  // ── Modals: Coolify's modal panel (a settings section moved to <body>) is an island like the sections: the island
  // glass, the header as a band, no inset well, the footer as a band. Its controls get the island films (ISLAND_SCOPE).
  const MODAL = `${SHELL} .application-settings-form.application-settings-section`;
  const MODAL_CSS = `
    @media (min-width: 1024px) {
      ${MODAL} {
        padding: 1rem ${SEC_PAD} ${SEC_PAD}; border-radius: var(--ux-radius);
        background: ${GLASS_ON ? 'transparent' : 'var(--ux-island)'}; ${GLASS_ON ? 'isolation: isolate;' : ''}
      }
      ${GLASS_ON ? `
      ${MODAL}::before {
        content: ''; position: absolute; inset: 0; z-index: -1; border-radius: inherit; pointer-events: none;
        background: var(--ux-glass); backdrop-filter: var(--ux-blur); -webkit-backdrop-filter: var(--ux-blur);
      }` : ''}
      ${MODAL} > header {
        margin: 0 -${SEC_PAD} 1rem; padding: 0 ${SEC_PAD} 0.75rem;
        border-bottom: 1px solid light-dark(rgb(0 0 0 / 0.06), rgb(255 255 255 / 0.06)); border-radius: 0; background: none;
      }
      /* (A little padding: the body scrolls, so the focus rings of the fields at its sides are not cut.) */
      ${MODAL} > .application-settings-section-body {
        margin: -0.25rem; padding: 0.25rem; border: 0; border-radius: 0; background: none; box-shadow: none;
      }
      ${MODAL} > footer {
        margin: 1rem -${SEC_PAD} -${SEC_PAD}; padding: 0.75rem ${SEC_PAD};
        border-top: 1px solid light-dark(rgb(0 0 0 / 0.06), rgb(255 255 255 / 0.06));
      }
    }
  `;

  // Island rows: the blocks that hold islands side by side or one under the other (Coolify spaces them with gap-6 /
  // gap-8 / mt-8: 24–32px). Here the island gap, as between the sidebar, the top bar and the content.
  // The page header (title, text, filters; a block with a visible h1 in such a row) is an island too, and the controls
  // standing alone on the wallpaper between the islands (search fields, Filter / Sort, view switches) get the island
  // glass under their own film.
  // PERF: only :has() with ">" (direct children) here. A :has() over all descendants, or an :nth-child() path written by
  // the script, made Chrome restyle the page at each live update (measured 10–20 ms each, 40× the page's own cost).
  const ISLAND_BLOCK = `:is(${SEC_ANY}, .application-settings-section-body, .data-table)`;
  const ROW = `:is(div, section, form):has(> ${ISLAND_BLOCK}, > * > ${ISLAND_BLOCK})`
    + `:not(${ISLAND_BLOCK}, .application-settings-section *, .application-settings-section-body *, .data-table *)`;
  // Coolify hides some titles on desktop (resource names are in the top bar; mobile headers).
  const OFF = ':is([class~="hidden"], [class~="lg:hidden"], [class~="xl:hidden"], .sr-only)';
  const HEAD_SEL = `main :is(div, header):not(${OFF}, ${ISLAND_BLOCK}):has(> h1:not(${OFF}), > :not(${OFF}) > h1:not(${OFF})):has(~ ${ISLAND_BLOCK}, ~ * > ${ISLAND_BLOCK})`;
  // (Every :has() is on the element that gets the style: as an ancestor in a selector, "ROW > *", it was slow again.)
  const ROWS_CSS = `
    @media (min-width: 1024px) {
      ${SEC_PAGE} main ${ROW} { row-gap: var(--ux-gap); column-gap: var(--ux-gap); margin-block: 0; }
      /* A row with spacing by margins (space-y-*): a column, so the gap applies. */
      ${SEC_PAGE} main ${ROW}:not([class~="flex"], [class~="grid"], [class*=":flex"], [class*=":grid"]) { display: flex; flex-direction: column; }
      /* Coolify's margins on the islands and the header (mt-4, mb-5…) would add to the gap. */
      ${SEC_PAGE} main :is(${SEC}, ${LONE}) { margin-block: 0; }
      ${SEC_PAGE} ${HEAD_SEL} { margin-block: 0; }
    }
  `;
  const headCss = head => `
    @media (min-width: 1024px) {
      ${head ? `
      ${SEC_PAGE} ${head} {
        position: relative; padding: 1.25rem ${SEC_PAD}; border-radius: var(--ux-radius);
        background: ${GLASS_ON ? 'transparent' : 'var(--ux-island)'};
      }` : ''}
      ${GLASS_ON && head ? `
      /* Its controls are in an island: no glass of their own (the lone-control rule reads --ux-glass; the
         header's own glass reads the copies kept on <html>). */
      ${SEC_PAGE} ${head} { isolation: isolate; --ux-glass: transparent; }
      ${SEC_PAGE} ${head}:is(:focus-within, :hover) { z-index: 2; }
      ${SEC_PAGE} ${head}::before {
        content: ''; position: absolute; inset: 0; z-index: -1; border-radius: inherit; pointer-events: none;
        background: var(--ux-island-glass);
      }` : ''}
      ${GLASS_ON ? `
      @layer theme {
        ${LONE_CONTROL} {
          background-color: var(--ux-glass) !important;
          background-image: linear-gradient(var(--glass-control-film), var(--glass-control-film)) !important;
        }
      }` : ''}
    }
  `;

  // ── Brand: Coolify's colour variables, then its rules whose purple is a fixed value (generated) ──
  const BRAND_CSS = `
    html:root:not([data-theme="custom"]) {
      --color-coollabs-50: ${BRAND_WASH};
      --color-coollabs: ${BRAND}; --color-coollabs-100: ${BRAND_HOVER}; --color-coollabs-200: ${BRAND_DEEP}; --color-coollabs-300: color-mix(in srgb, ${BRAND_DEEP} 75%, black);
      --color-brand: ${BRAND}; --color-brand-hover: ${BRAND_HOVER}; --color-brand-press: ${BRAND_DEEP}; --color-brand-depth: color-mix(in srgb, ${BRAND_DEEP} 70%, black);
      --color-brand-light: ${BRAND_LIGHT}; --color-brand-ring: ${BRAND_LIGHT}; --color-accent: ${BRAND};
    }
    html.dark:root:not([data-theme="custom"]) { --color-sidebar: ${SIDEBAR_DARK}; --color-accent: ${BRAND}; }
    /* Sidebar: the active item in the brand colour (Coolify: a grey film). In the theme layer: Coolify's own item
       rules are layered !important, which beat unlayered ones. With 3D items Coolify's brand icon box stays. */
    @layer theme {
      html:root:not([data-theme="custom"]) :is(.app-sidebar, .mobile-sidebar-sheet) :is(.menu-item-active, .menu-subitem-active) {
        background-color: color-mix(in srgb, ${BRAND} 16%, transparent) !important;
        box-shadow: inset 0 0 0 1px color-mix(in srgb, ${BRAND} 24%, transparent) !important;
        color: light-dark(${BRAND_DEEP}, ${BRAND_LIGHT}) !important;
      }
      html:root:not([data-theme="custom"]) :is(.app-sidebar, .mobile-sidebar-sheet) :is(.menu-item-active, .menu-subitem-active) .menu-item-label,
      html:root[data-nav-items="flat"]:not([data-theme="custom"]) :is(.app-sidebar, .mobile-sidebar-sheet) :is(.menu-item-active, .menu-subitem-active) :is(.menu-item-icon, svg) {
        color: inherit !important;
      }
    }
  `;
  // <brand-fixed> (generated by tools/build-brand.mjs from Coolify's compiled CSS; do not edit by hand; after a
  // regenerate, replace its literals #ffb3b0 #0e0c0c #d6cfce #8f8786 with BRAND_PALE SIDEBAR_DARK NAV_TEXT NAV_MUTED)
  const BRAND_FIXED_CSS = `
html:root .\\!fullscreen {
  --scrollbar-thumb: ${BRAND_HOVER} !important;
}
html:root .\\!fullscreen:where(.dark, .dark *, [data-sidebar-scheme="dark"] :is(.app-sidebar, .app-topbar-brand, .mobile-sidebar-sheet [role="dialog"]), [data-sidebar-scheme="dark"] :is(.app-sidebar, .app-topbar-brand, .mobile-sidebar-sheet [role="dialog"]) *):not(:where([data-sidebar-scheme="light"] :is(.app-sidebar, .app-topbar-brand, .mobile-sidebar-sheet [role="dialog"]), [data-sidebar-scheme="light"] :is(.app-sidebar, .app-topbar-brand, .mobile-sidebar-sheet [role="dialog"]) *)) {
  --scrollbar-thumb: ${BRAND_HOVER} !important;
}
html:root .fullscreen {
  --scrollbar-thumb: ${BRAND_HOVER};
}
html:root .fullscreen:where(.dark, .dark *, [data-sidebar-scheme="dark"] :is(.app-sidebar, .app-topbar-brand, .mobile-sidebar-sheet [role="dialog"]), [data-sidebar-scheme="dark"] :is(.app-sidebar, .app-topbar-brand, .mobile-sidebar-sheet [role="dialog"]) *):not(:where([data-sidebar-scheme="light"] :is(.app-sidebar, .app-topbar-brand, .mobile-sidebar-sheet [role="dialog"]), [data-sidebar-scheme="light"] :is(.app-sidebar, .app-topbar-brand, .mobile-sidebar-sheet [role="dialog"]) *)) {
  --scrollbar-thumb: ${BRAND_HOVER};
}
html:root .scrollbar {
  --scrollbar-thumb: ${BRAND_HOVER};
}
html:root .scrollbar:where(.dark, .dark *, [data-sidebar-scheme="dark"] :is(.app-sidebar, .app-topbar-brand, .mobile-sidebar-sheet [role="dialog"]), [data-sidebar-scheme="dark"] :is(.app-sidebar, .app-topbar-brand, .mobile-sidebar-sheet [role="dialog"]) *):not(:where([data-sidebar-scheme="light"] :is(.app-sidebar, .app-topbar-brand, .mobile-sidebar-sheet [role="dialog"]), [data-sidebar-scheme="light"] :is(.app-sidebar, .app-topbar-brand, .mobile-sidebar-sheet [role="dialog"]) *)) {
  --scrollbar-thumb: ${BRAND_HOVER};
}
html:root .\\[box-shadow\\:inset_4px_0_0_\\#6b16ed\\,inset_0_0_0_2px_\\#e5e5e5\\] {
  box-shadow: inset 4px 0 0 ${BRAND},inset 0 0 0 2px #e5e5e5;
}
html:root body {
  --scrollbar-thumb: ${BRAND_HOVER};
}
html:root body:where(.dark, .dark *, [data-sidebar-scheme="dark"] :is(.app-sidebar, .app-topbar-brand, .mobile-sidebar-sheet [role="dialog"]), [data-sidebar-scheme="dark"] :is(.app-sidebar, .app-topbar-brand, .mobile-sidebar-sheet [role="dialog"]) *):not(:where([data-sidebar-scheme="light"] :is(.app-sidebar, .app-topbar-brand, .mobile-sidebar-sheet [role="dialog"]), [data-sidebar-scheme="light"] :is(.app-sidebar, .app-topbar-brand, .mobile-sidebar-sheet [role="dialog"]) *)) {
  --scrollbar-thumb: ${BRAND_HOVER};
}
html:root .dark {
  --color-sidebar: ${SIDEBAR_DARK};
}
html:root[data-theme="custom"] {
  --theme-base-color: ${BRAND};
}
html:root .resource-heading-tabs-control:focus-visible .resource-heading-tabs-control-icon {
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-coollabs, ${BRAND}) 45%, transparent), 0 0 0 1px rgba(0, 0, 0, 0.08);
}
html:root.dark:not([data-theme="custom"]) .app-sidebar nav.sidebar-nav,
html:root.dark:not([data-theme="custom"]) .mobile-sidebar-sheet [role="dialog"] {
  background-image: linear-gradient(180deg, color-mix(in srgb, ${BRAND} 9%, transparent), transparent 520px);
  border-right-color: color-mix(in srgb, ${BRAND_LIGHT} 10%, transparent);
  --color-nav-text: ${NAV_TEXT};
  --color-nav-muted: ${NAV_MUTED};
}
html:root.dark:not([data-theme="custom"]) .app-topbar-brand {
  background-image: linear-gradient(color-mix(in srgb, ${BRAND} 9%, transparent), color-mix(in srgb, ${BRAND} 9%, transparent));
  border-right-color: color-mix(in srgb, ${BRAND_LIGHT} 10%, transparent);
}
html:root.dark:not([data-theme="custom"]) :is(.app-sidebar, .mobile-sidebar-sheet) .menu-search {
  background-color: color-mix(in srgb, ${BRAND_LIGHT} 6%, transparent) !important;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, ${BRAND_LIGHT} 10%, transparent) !important;
}
html:root.dark:not([data-theme="custom"]) :is(.app-sidebar, .mobile-sidebar-sheet) .menu-search:hover {
  background-color: color-mix(in srgb, ${BRAND_LIGHT} 10%, transparent) !important;
}
html:root.dark:not([data-theme="custom"]) :is(.app-sidebar, .mobile-sidebar-sheet) .menu-search kbd {
  border-color: color-mix(in srgb, ${BRAND_LIGHT} 18%, transparent) !important;
}
html:root.dark:not([data-theme="custom"]) :is(.app-sidebar, .mobile-sidebar-sheet) .sidebar-nav :is([class~="dark:border-white/[0.06]"], [class~="dark:border-white/[0.07]"], [class~="dark:border-white/[0.08]"]) {
  border-color: color-mix(in srgb, ${BRAND_LIGHT} 10%, transparent) !important;
}
html:root.dark:not([data-theme="custom"]):where(:not([data-nav-items="flat"])) :is(.app-sidebar, .mobile-sidebar-sheet) :is(.menu-item, .menu-subitem):not(.sidebar-toggle):not(.menu-search):not(.nav-admin):not(.menu-item-active):not(.menu-subitem-active) .menu-item-icon,
html:root.dark:not([data-theme="custom"]):where(:not([data-nav-items="flat"])) .app-sidebar nav.sidebar-collapsed .menu-search.menu-item .menu-item-icon {
  border-color: color-mix(in srgb, ${BRAND_LIGHT} 13%, transparent);
  background: color-mix(in srgb, ${BRAND} 7%, transparent);
  color: ${BRAND_PALE};
}
html:root.dark:not([data-theme="custom"]) :is(.app-sidebar, .mobile-sidebar-sheet) nav:not(.sidebar-collapsed) .nav-section {
  color: color-mix(in srgb, ${BRAND_LIGHT} 55%, transparent);
}
html:root.dark:not([data-theme="custom"]) .listbox-panel.top-user-menu-panel-sidebar {
  border-color: color-mix(in srgb, ${BRAND_LIGHT} 22%, transparent);
}
html:root.dark:not([data-theme="custom"]) .listbox-panel.top-user-menu-panel-sidebar {
  background: color-mix(in oklab, ${BRAND} 10%, var(--coollabs-elevated));
}
html:root.dark:not([data-theme="custom"]) .top-user-menu-panel-sidebar .listbox-option:hover {
  background: color-mix(in srgb, ${BRAND_LIGHT} 10%, transparent);
}
`;
  // </brand-fixed>

  // ── The frame's hole: the content island's rounded rect, as an even-odd clip path ──
  function updateHole() {
    const sidebar = document.querySelector('.app-sidebar');
    const right = sidebar?.getBoundingClientRect().right;
    let collapsed = false;
    try { collapsed = localStorage.getItem('sidebarCollapsed') === 'true'; } catch { /* blocked */ }
    const gap = ISLAND_GAP;
    const r = ISLAND_RADIUS;
    const left = (right > 0 ? right : collapsed ? 64 : 224) + gap;
    const w = Math.max(0, innerWidth - left - gap);
    const h = Math.max(0, innerHeight - 48 - 2 * gap);
    const e = EDGE; // the frame layer reaches past the window: the path is in its coordinates
    const x = left + e;
    const y = 48 + gap + e;
    const css = `:root { --glass-hole: path(evenodd, "M0 0H${innerWidth + 2 * e}V${innerHeight + 2 * e}H0Z M${x + r} ${y}H${x + w - r}A${r} ${r} 0 0 1 ${x + w} ${y + r}V${y + h - r}A${r} ${r} 0 0 1 ${x + w - r} ${y + h}H${x + r}A${r} ${r} 0 0 1 ${x} ${y + h - r}V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}Z"); }`;
    // Its own <style> (Livewire navigation resets <html> attributes, so not an inline style there).
    let el = document.getElementById(`${KEY}-hole`);
    if (!el) {
      el = document.createElement('style');
      el.id = `${KEY}-hole`;
      (document.head || html).append(el);
    }
    if (el.textContent !== css) el.textContent = css;
  }
  let holeObserver = null;
  function watchSidebar() {
    const sidebar = document.querySelector('.app-sidebar');
    if (!sidebar || holeObserver?.target === sidebar) return;
    holeObserver?.disconnect();
    holeObserver = new ResizeObserver(updateHole);
    holeObserver.target = sidebar;
    holeObserver.observe(sidebar);
    updateHole();
  }

  // ── Mounting (first load and Livewire navigation, which can replace <head> and <body>) ──
  function addStyle() {
    if (document.getElementById(`${KEY}-style`)) return;
    const style = document.createElement('style');
    style.id = `${KEY}-style`;
    style.textContent = BRAND_CSS + BRAND_FIXED_CSS + ISLANDS_CSS + SURFACES_CSS + SECTION_ISLANDS_CSS + ROWS_CSS + headCss(HEAD_SEL) + MODAL_CSS;
    (document.head || html).append(style);
  }
  function markSections() {
    html.classList.toggle(`${KEY}-sections`, !!document.querySelector(`main ${SEC_ANY}`));
  }
  /** The page header: the block with a visible h1 (not in a section) whose parent holds a section; as a path from main. */
  function setUp() {
    addStyle();
    markSections();
    updateHole();
    watchSidebar();
  }
  addStyle();
  updateHole();
  addEventListener('resize', updateHole);
  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; setUp(); });
  }).observe(html, { childList: true, subtree: true });
  document.addEventListener('livewire:navigated', setUp);
  document.addEventListener('DOMContentLoaded', setUp);
  if (document.readyState !== 'loading') setUp();
})();
