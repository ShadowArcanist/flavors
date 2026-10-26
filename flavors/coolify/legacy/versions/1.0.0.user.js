// ==UserScript==
// @name         Legacy Coolify (v4.0 look)
// @namespace    https://flavors.shadowarcanist.com
// @version      1.0.0
// @author       ShadowArcanist
// @description  The new Coolify (v4.5+) with the layout, look and feel of v4.0: the v4.0 sidebar (wordmark, search, team select, v4.0 menu and icons), no top bar, the in-page heading with breadcrumbs and Configuration / Deployments / Logs / Terminal tabs, the in-page sub-menu, v4.0 greys, buttons, inputs and sections. Run it alon.
// @license      MIT
// @match        https://coolify.shadowarcanist.com/*
// @run-at       document-start
// @inject-into  page
// @grant        none
// ==/UserScript==

// The v4.0 values come from Coolify's own source at tag v4.0.1 (resources/css/app.css, utilities.css,
// layouts/app.blade.php, components/navbar.blade.php). To use it on another instance, change @match.

(() => {
  'use strict';

  const KEY = 'coolify-legacy';
  const html = document.documentElement;

  // v4.0 palette (app.css @theme at v4.0.1).
  const V4 = {
    base: '#101010', g100: '#181818', g200: '#202020', g300: '#242424', g400: '#282828', g500: '#323232',
    purple: '#6b16ed', purple100: '#7317ff', purple200: '#5a12c7', purple50: '#f5f0ff',
    yellow: '#fcd452', success: '#22c55e', error: '#dc2626',
  };

  // Everything sits in Coolify's first layer ("theme") with !important: for !important the first layer
  // wins over the later layers (Tailwind's ! utilities, the utilities blocks) and over unlayered rules.
  const CSS = `@layer theme {
    /* ── Tokens: the new UI's variables, set to v4.0 values ── */
    html.dark:root {
      color-scheme: dark !important;
      --L-page: ${V4.base}; --L-side: ${V4.base}; --L-sideline: ${V4.g200}; --L-surface: ${V4.g100}; --L-float: ${V4.g200};
      --L-line: ${V4.g300}; --L-divider: ${V4.g200}; --L-ring: ${V4.g300}; --L-hover: ${V4.g100}; --L-btn-hover: ${V4.g200};
      --L-active: ${V4.g200}; --L-active-text: ${V4.yellow}; --L-accent: ${V4.yellow};
      --L-text: #a1a1a1; --L-strong: #ffffff; --L-faint: #737373; --L-track: ${V4.g200};
      --color-app: ${V4.base} !important; --color-panel: ${V4.base} !important; --color-base: ${V4.base} !important;
      --color-surface: ${V4.g100} !important; --color-raised: ${V4.g100} !important; --color-card: ${V4.g100} !important;
      --color-selected: ${V4.g200} !important; --color-sidebar: ${V4.base} !important;
      --coollabs-canvas: ${V4.base} !important; --coollabs-elevated: ${V4.g100} !important; --coollabs-base: ${V4.g100} !important;
      --coollabs-recessed: ${V4.g100} !important; --coollabs-fill: ${V4.g200} !important;
      --coollabs-line: ${V4.g300} !important; --coollabs-hairline: ${V4.g200} !important; --coollabs-divider: ${V4.g200} !important;
      --color-fg: #ffffff !important; --color-fg-dim: #a1a1a1 !important; --color-fg-faint: #737373 !important;
      --color-hairline: ${V4.g200} !important;
      --color-nav-text: #a1a1a1 !important; --color-nav-muted: #737373 !important; --color-nav-active: ${V4.yellow} !important;
      --color-warning: ${V4.yellow} !important;
      --card-bg: transparent !important; --card-underlay: transparent !important; --card-border: transparent !important;
      --well-bg: transparent !important; --well-border: transparent !important; --well-shadow: none !important;
    }
    html:root:not(.dark) {
      color-scheme: light !important;
      --L-page: #f9fafb; --L-side: #ffffff; --L-sideline: #d4d4d4; --L-surface: #ffffff; --L-float: #ffffff;
      --L-line: #e5e5e5; --L-divider: #d4d4d4; --L-ring: #e5e5e5; --L-hover: #d4d4d4; --L-btn-hover: #f5f5f5;
      --L-active: #e5e5e5; --L-active-text: #000000; --L-accent: ${V4.purple};
      --L-text: #000000; --L-strong: #000000; --L-faint: #737373; --L-track: #e5e5e5;
      --color-app: #f9fafb !important; --color-panel: #ffffff !important; --color-surface: #ffffff !important;
      --color-raised: #ffffff !important; --color-card: #ffffff !important; --color-selected: #e5e5e5 !important;
      --coollabs-canvas: #f9fafb !important; --coollabs-elevated: #ffffff !important; --coollabs-base: #ffffff !important;
      --coollabs-recessed: #ffffff !important; --coollabs-fill: #f5f5f5 !important;
      --coollabs-line: #e5e5e5 !important; --coollabs-hairline: #e5e5e5 !important; --coollabs-divider: #e5e5e5 !important;
      --color-nav-text: #404040 !important; --color-nav-muted: #737373 !important; --color-nav-active: #000000 !important;
      --card-bg: transparent !important; --card-underlay: transparent !important; --card-border: transparent !important;
      --well-bg: transparent !important; --well-border: transparent !important; --well-shadow: none !important;
    }
    html:root {
      --color-coollabs: ${V4.purple} !important; --color-coollabs-100: ${V4.purple100} !important;
      --color-coollabs-200: ${V4.purple200} !important; --color-coollabs-300: #4a0fa3 !important; --color-coollabs-50: ${V4.purple50} !important;
      --color-brand: ${V4.purple} !important; --color-brand-hover: ${V4.purple100} !important; --color-brand-press: ${V4.purple200} !important;
      --color-brand-light: #a391ff !important; --color-accent: ${V4.purple} !important;
      --color-coolgray-100: ${V4.g100} !important; --color-coolgray-200: ${V4.g200} !important; --color-coolgray-300: ${V4.g300} !important;
      --color-coolgray-400: ${V4.g400} !important; --color-coolgray-500: ${V4.g500} !important;
      --button-depth-color: transparent !important;
      --lg-select: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a3a3a3' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9'/%3E%3C/svg%3E");
      --lg-info: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'/%3E%3C/svg%3E");
      --lg-i-clock: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'/%3E%3C/svg%3E");
      --lg-i-text: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h10.5'/%3E%3C/svg%3E");
      --lg-i-paint: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42'/%3E%3C/svg%3E");
      --lg-i-bug: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082'/%3E%3C/svg%3E");
      --lg-i-copy: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75'/%3E%3C/svg%3E");
      --lg-i-download: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3'/%3E%3C/svg%3E");
      --lg-i-downloadall: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 9 12 13.5m0 0L7.5 9m4.5 4.5V3M7.5 3h9'/%3E%3C/svg%3E");
      --lg-i-funnel: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z'/%3E%3C/svg%3E");
      --lg-chevron: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9 5l7 7-7 7'/%3E%3C/svg%3E");
      scrollbar-color: ${V4.purple100} var(--L-track) !important; scrollbar-width: thin !important;
    }

    /* ── Page and type: 14px text, bold headings (h1 30px, h2 20px, h3 18px, h4 16px) ── */
    html:root, html:root body { background: var(--L-page) !important; background-image: none !important; }
    html:root body { color: var(--L-text) !important; font-size: 14px !important; }
    html:root main.app-main { background: var(--L-page) !important; }
    html:root main h1 { font-size: 30px !important; line-height: 36px !important; font-weight: 700 !important; color: var(--L-strong) !important; letter-spacing: 0 !important; }
    html:root main h2 { font-weight: 700 !important; color: var(--L-strong) !important; }
    html:root main h3, html:root main h4 { font-weight: 700 !important; color: var(--L-strong) !important; }
    html:root main a:not(.button):hover { color: var(--L-strong) !important; }
    html:root :is(button, a):focus-visible { outline: 2px solid var(--L-accent) !important; outline-offset: 2px !important; box-shadow: none !important; }

    /* ── v4.0 layout (lg and up): no top bar, the script's own sidebar (#lg-side), full-width page ── */
    @media (min-width: 1024px) {
      html:root .app-sidebar { display: none !important; }
      html:root .app-shell { --sidebar-w: 14rem !important; }
      /* Coolify's top bar stays rendered (its deployments indicator polls only while it has a box) but takes no space:
         only the indicator (bottom left, as v4.0) and the "changes pending" warning (bottom right) show from it. */
      html:root header.app-topbar {
        display: flex !important; position: fixed !important; inset: 0 auto auto 0 !important; width: 0 !important; height: 0 !important; overflow: visible !important;
        background: none !important; border: 0 !important; box-shadow: none !important; backdrop-filter: none !important; pointer-events: none !important;
      }
      /* Pages without the crumb row: only Coolify's known bar items are hidden. The bar row sits bottom right with the
         "changes pending" warning, so an item that a Coolify update adds still shows there (and can be clicked). */
      html:root:not(:has(.lg-crumbs)):not(:has(main.app-main-full)) header.app-topbar > div.flex-1 > :is(div.relative:has(> [data-page-context]), [data-page-context], #server-topbar-context, [data-server-timing-hud-slot], #page-toolbar-slot, #resource-action-hud-slot),
      html:root:has(#lg-list):not(:has(.lg-crumbs)) header.app-topbar > div.flex-1 > :is(div.relative:has(> [data-page-context]), [data-page-context], #server-topbar-context, [data-server-timing-hud-slot], #page-toolbar-slot, #resource-action-hud-slot) { display: none !important; }
      html:root:not(:has(.lg-crumbs)):not(:has(main.app-main-full)) header.app-topbar > div.flex-1,
      html:root:has(#lg-list):not(:has(.lg-crumbs)) header.app-topbar > div.flex-1 { position: fixed !important; right: 20px !important; bottom: 20px !important; height: auto !important; z-index: 60 !important; pointer-events: auto !important; }
      html:root:not(:has(.lg-crumbs)):not(:has(main.app-main-full)) header.app-topbar > div.flex-1 > #configuration-warning-hud-slot,
      html:root:has(#lg-list):not(:has(.lg-crumbs)) header.app-topbar > div.flex-1 > #configuration-warning-hud-slot { position: relative !important; right: auto !important; bottom: auto !important; }
      html:root header.app-topbar [wire\\:poll\\.3000ms\\.visible] { position: fixed !important; left: calc(14rem + 16px) !important; bottom: 16px !important; top: auto !important; z-index: 60 !important; pointer-events: auto !important; }
      html:root header.app-topbar [wire\\:poll\\.3000ms\\.visible] > button {
        height: auto !important; padding: 8px 16px !important; gap: 8px !important; border-radius: 8px !important; font-size: 14px !important; font-weight: 500 !important;
        background: light-dark(#fff, ${V4.g100}) !important; border: 1px solid light-dark(transparent, ${V4.g200}) !important; color: light-dark(#1f2937, #e5e5e5) !important;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) !important;
      }
      html:root header.app-topbar [wire\\:poll\\.3000ms\\.visible] > button > span { display: none !important; }
      html:root header.app-topbar [wire\\:poll\\.3000ms\\.visible] > button::after { content: attr(title); }
      html:root header.app-topbar [wire\\:poll\\.3000ms\\.visible] > button svg { color: light-dark(${V4.purple}, ${V4.yellow}) !important; }
      html:root header.app-topbar [wire\\:poll\\.3000ms\\.visible] > .surface-popover {
        top: auto !important; bottom: 100% !important; left: 0 !important; right: auto !important; margin: 0 0 8px !important; width: 20rem !important; border-radius: 8px !important;
        background: light-dark(#fff, ${V4.g100}) !important; box-shadow: 0 0 0 1px light-dark(#e5e5e5, ${V4.g200}), 0 20px 25px -5px rgb(0 0 0 / 0.1) !important;
      }
      html:root header.app-topbar [wire\\:poll\\.3000ms\\.visible] > .surface-popover a { background: light-dark(#f5f5f5, ${V4.g200}) !important; border: 0 !important; }
      html:root header.app-topbar [wire\\:poll\\.3000ms\\.visible] > .surface-popover a:hover { box-shadow: 0 0 0 2px var(--L-accent) !important; }
      html:root header.app-topbar #configuration-warning-hud-slot [role="dialog"] {
        position: absolute !important; top: auto !important; bottom: 100% !important; left: auto !important; right: 0 !important; margin: 0 0 8px !important; transform: none !important;
      }
      html:root header.app-topbar #configuration-warning-hud-slot { position: fixed !important; right: 20px !important; bottom: 20px !important; z-index: 60 !important; pointer-events: auto !important; }
      html:root main.app-main { margin-left: 14rem !important; padding: 24px 32px !important; }
      html:root main.app-main.app-main-full { padding: 0 !important; }
      /* Pages with a fixed second bar (Sources, Destinations, S3): the bar goes back into the page. */
      html:root .app-tabbar { position: static !important; inset: auto !important; height: auto !important; margin: 0 0 16px !important; padding: 0 !important; background: none !important; border: 0 !important; box-shadow: none !important; backdrop-filter: none !important; }

      /* The top bar's breadcrumb row is kept, as the v4.0 in-page breadcrumbs (resource pages) or the canvas row. */
      html:root:has(.lg-crumbs) header.app-topbar {
        display: flex !important; pointer-events: auto !important; position: absolute !important; top: var(--lg-c-top, 84px) !important; left: var(--lg-c-left, calc(14rem + 32px)) !important;
        width: var(--lg-c-w, calc(100% - 14rem - 64px)) !important; right: auto !important; height: 36px !important; z-index: 30 !important;
        background: none !important; border: 0 !important; box-shadow: none !important; backdrop-filter: none !important;
      }
      html:root:has(main.app-main-full):not(:has(#lg-list)) header.app-topbar {
        display: flex !important; pointer-events: auto !important; top: 0 !important; right: 0 !important; width: auto !important; height: 3rem !important; left: 14rem !important; background: none !important; border: 0 !important; box-shadow: none !important; backdrop-filter: none !important;
      }
      html:root header.app-topbar > .app-topbar-brand { display: none !important; }
      html:root:has(#lg-head.lg-section) main h1:not(#lg-head > h1) { font-size: 20px !important; line-height: 28px !important; }
      html:root header.app-topbar > div.flex-1 { padding: 0 !important; border: 0 !important; background: none !important; gap: 8px !important; }
      /* 1024–1279px: Coolify shows its small-screen heading (name + its own action button) and hides the action HUD; the
         v4.0 heading needs the actions in the tab row at every width. */
      html:root:has(#lg-head.lg-resource) header.app-topbar #resource-action-hud-slot,
      html:root:has(#lg-head.lg-resource) header.app-topbar #resource-action-hud-slot > div[class~="xl:flex"] { display: flex !important; }
      html:root:has(#lg-head.lg-resource) main nav > div > div[class~="xl:hidden"],
      html:root:has(#lg-head.lg-resource) main nav > div > div[class~="lg:hidden"] { display: none !important; }
      html:root:has(.lg-crumbs) header.app-topbar #resource-action-hud-slot { position: absolute !important; right: 0 !important; top: var(--lg-a-top, 44px) !important; height: 40px !important; margin: 0 !important; }

      /* Breadcrumbs as v4.0: no team (it is in the sidebar), yellow chevrons, plain names, status dot + bold label. */
      html:root header.app-topbar :is([data-page-context], [data-testid="server-topbar-context"]) { gap: 0 !important; font-size: 14px !important; }
      html:root header.app-topbar [data-page-context] > div.shrink-0:first-child, html:root header.app-topbar [data-page-context] > div.shrink-0:first-child + span { display: none !important; }
      html:root header.app-topbar :is([data-page-context], [data-testid="server-topbar-context"]) > span.shrink-0 {
        font-size: 0 !important; width: 12px !important; height: 12px !important; padding: 0 !important; margin: 0 4px !important; flex: none !important;
        background: ${V4.yellow} !important; -webkit-mask: var(--lg-chevron) center / contain no-repeat !important; mask: var(--lg-chevron) center / contain no-repeat !important;
      }
      html:root header.app-topbar :is(button[title^="Switch"], button[aria-label="Switch server"]) { height: auto !important; padding: 0 !important; opacity: 1 !important; background: none !important; gap: 0 !important; }
      html:root header.app-topbar :is(button[title^="Switch"], button[aria-label="Switch server"]) > span { font-weight: 400 !important; color: var(--L-text) !important; }
      html:root header.app-topbar :is(button[title^="Switch"], button[aria-label="Switch server"]):hover > span { color: ${V4.yellow} !important; }
      html:root header.app-topbar :is(button[title^="Switch"], button[aria-label="Switch server"]) > svg { display: none !important; }
      html:root header.app-topbar [data-page-context] > span.flex { padding: 0 !important; opacity: 1 !important; font-weight: 400 !important; color: var(--L-text) !important; }
      html:root header.app-topbar [data-page-context] > div > div.flex { gap: 8px !important; }
      html:root header.app-topbar [data-testid="server-topbar-context"] > span.relative { padding: 0 !important; gap: 8px !important; }
      html:root header.app-topbar :is(span, a, button).rounded-full.h-6:has(> span.relative):has(.bg-neutral-400) { color: ${V4.error} !important; }
      html:root header.app-topbar .rounded-full.h-6 > span.relative > span.bg-neutral-400 { background: ${V4.error} !important; }

      /* Resource sub-menu in the page, as v4.0: a text-only column on the left, the form on the right. */
      html:root main :has(> aside.application-settings-navigation) { display: grid !important; grid-template-columns: minmax(12rem, max-content) minmax(0, 1fr) !important; gap: 2rem !important; }
      html:root main :has(> aside.application-settings-navigation) > aside.application-settings-navigation ~ * { grid-column: 2 !important; }
      html:root main aside.application-settings-navigation {
        display: block !important; position: static !important; inset: auto !important; width: auto !important; height: auto !important; overflow: visible !important;
        padding: 0 !important; margin: 0 !important; background: none !important; border: 0 !important; box-shadow: none !important; grid-column: 1 !important; align-self: start !important;
      }
      html:root main aside.application-settings-navigation > nav { display: flex !important; flex-direction: column !important; align-items: stretch !important; gap: 8px !important; padding: 0 !important; border: 0 !important; }
      html:root main aside.application-settings-navigation :is(.nav-children, div.my-2.border-t, .menu-item-icon, svg.menu-item-icon) { display: none !important; }
      html:root main aside.application-settings-navigation .menu-item {
        height: auto !important; padding: 4px 8px !important; gap: 8px !important; border-radius: 4px !important; font-size: 14px !important; font-weight: 400 !important;
        color: var(--L-text) !important; background: none !important; box-shadow: none !important; transform: none !important;
      }
      html:root main aside.application-settings-navigation .menu-item:hover { background: light-dark(#d4d4d4, ${V4.g100}) !important; color: var(--L-strong) !important; }
      html:root main aside.application-settings-navigation .menu-item.menu-item-active { background: var(--L-active) !important; color: var(--L-active-text) !important; }
      /* Tab items (Deployments, Logs, Terminal, Proxy, …) leave the sub-menu: rules written per page by placeCrumbs(). */
    }
    @media (max-width: 1023.98px) { #lg-side, #lg-head { display: none !important; } }
    html:root:has(#lg-list) main.app-main > div > :not(#lg-list) { display: none !important; }
    /* Environment variables: the v4.0 cards (#lg-envs) replace the table; the rows stay (they are the Livewire components). */
    html:root:has(#lg-envs) main .data-table:has(.env-table-item) { display: none !important; }
    html:root:has(#lg-list) main.app-main.app-main-full { overflow-y: auto !important; }
    html:root:has(#lg-list) main.app-main > div { height: auto !important; }
    @media (min-width: 1024px) {
      html:root:has(#lg-list) main.app-main.app-main-full { padding: 24px 32px !important; }
    }

    /* Mobile menu (below lg, Coolify's own drawer): v4.0 colours, one flat list. */
    html:root .mobile-sidebar-sheet [role="dialog"] { background: var(--L-side) !important; background-image: none !important; }
    html:root .mobile-sidebar-sheet .nav-section { display: none !important; }
    html:root .mobile-sidebar-sheet :is(.menu-item, .menu-subitem) {
      padding: 4px 8px !important; gap: 12px !important; border-radius: 4px !important; font-size: 14px !important; font-weight: 400 !important;
      color: var(--color-nav-text) !important; background: transparent !important; box-shadow: none !important; transform: none !important;
    }
    html:root .mobile-sidebar-sheet :is(.menu-item-active, .menu-subitem-active) { background: var(--L-active) !important; color: var(--L-active-text) !important; }
    html:root .mobile-sidebar-sheet .menu-item-icon { background: transparent !important; box-shadow: none !important; border: 0 !important; color: inherit !important; }

    /* ── Buttons: 32px, 2px border, 4px radius, no depth or press; primary = purple tint ── */
    html:root :is(.button, .split-action-main, .split-action-caret) {
      height: 32px !important; padding: 0 8px !important; font-size: 14px !important; font-weight: 500 !important; text-transform: none !important;
      border: 2px solid var(--L-line) !important; border-radius: 4px !important; background: var(--L-surface) !important; background-image: none !important;
      color: var(--L-strong) !important; box-shadow: none !important; transform: none !important; transition: background-color .15s, color .15s, border-color .15s !important;
    }
    html:root :is(.button, .split-action-main, .split-action-caret):not(:disabled):hover { background: var(--L-btn-hover) !important; }
    html:root :is(.button, .split-action-main, .split-action-caret) svg { color: inherit !important; opacity: 1 !important; }
    html.dark:root :is(.button.button-highlighted, .button[isHighlighted]):not(:disabled) {
      background: rgb(107 22 237 / 0.2) !important; border-color: ${V4.purple100} !important; color: #ffffff !important;
    }
    html.dark:root :is(.button.button-highlighted, .button[isHighlighted]):not(:disabled):hover { background: ${V4.purple100} !important; }
    html:root:not(.dark) :is(.button.button-highlighted, .button[isHighlighted]):not(:disabled) {
      background: ${V4.purple50} !important; border-color: ${V4.purple} !important; color: ${V4.purple200} !important;
    }
    html:root:not(.dark) :is(.button.button-highlighted, .button[isHighlighted]):not(:disabled):hover { background: ${V4.purple} !important; color: #ffffff !important; }
    html.dark:root :is(.button.button-error, .button[isError]):not(:disabled) { background: rgb(127 29 29 / 0.3) !important; border-color: #991b1b !important; color: #fca5a5 !important; }
    html.dark:root :is(.button.button-error, .button[isError]):not(:disabled):hover { background: #991b1b !important; color: #ffffff !important; }
    html:root:not(.dark) :is(.button.button-error, .button[isError]):not(:disabled) { background: #fef2f2 !important; border-color: #fca5a5 !important; color: #991b1b !important; }
    html:root:not(.dark) :is(.button.button-error, .button[isError]):not(:disabled):hover { background: #fca5a5 !important; color: #ffffff !important; }
    html:root .button:disabled { background: transparent !important; border-color: transparent !important; color: light-dark(#d4d4d4, #525252) !important; }
    html:root :is(.icon-button, .app-tab) { transform: none !important; box-shadow: none !important; }


    /* Resource actions: v4.0 shows every action as its own button (Redeploy, Restart, Stop, …); v4.5 hides them behind a
       dropdown caret. The dropdown's own buttons are shown in a row, so Coolify still does the work. */
    html:root .split-action { display: inline-flex !important; flex-wrap: wrap !important; align-items: center !important; gap: 8px !important; width: auto !important; }
    html:root .split-action > .split-action-caret { display: none !important; }
    html:root .split-action > .listbox-panel[role="menu"] {
      display: flex !important; position: static !important; inset: auto !important; flex-direction: row !important; flex-wrap: wrap !important; align-items: center !important; gap: 8px !important;
      width: auto !important; min-width: 0 !important; max-width: none !important; max-height: none !important; overflow: visible !important;
      padding: 0 !important; margin: 0 !important; border: 0 !important; background: none !important; box-shadow: none !important; opacity: 1 !important; transform: none !important;
    }
    html:root .split-action .listbox-panel[role="menu"] .listbox-option {
      display: inline-flex !important; align-items: center !important; justify-content: center !important; gap: 8px !important; width: auto !important;
      height: 32px !important; min-height: 0 !important; padding: 0 8px !important; white-space: nowrap !important;
      font-size: 14px !important; font-weight: 500 !important; color: var(--L-strong) !important;
      border: 2px solid var(--L-line) !important; border-radius: 4px !important; background: var(--L-surface) !important; box-shadow: none !important;
    }
    html:root .split-action .listbox-panel[role="menu"] .listbox-option:hover { background: var(--L-btn-hover) !important; }
    html:root .split-action .listbox-panel[role="menu"] .listbox-option svg { opacity: 1 !important; }
    html:root .split-action-main { border-radius: 4px !important; }

    /* Breadcrumb status (Coolify's status summary button): v4.0 dot + bold label, no pill, no chevron. */
    html:root :is(span, a, button).rounded-full.h-6:has(> span[class~="size-1.5"]) {
      height: auto !important; padding: 0 !important; border: 0 !important; background: none !important; gap: 8px !important;
      font-size: 12px !important; font-weight: 700 !important; color: #a3a3a3 !important; box-shadow: none !important;
    }
    html:root .rounded-full.h-6 > span[class~="size-1.5"] { width: 12px !important; height: 12px !important; border: 1px solid light-dark(#e5e5e5, #000) !important; }
    html:root .rounded-full.h-6:has(> span[class~="size-1.5"]) > span:last-child:has(> svg) { display: none !important; }
    html:root :is(span, a, button).rounded-full.h-6:has(> span.bg-success) { color: ${V4.success} !important; }
    html:root .rounded-full.h-6 > span.bg-success { background: ${V4.success} !important; }
    html:root :is(span, a, button).rounded-full.h-6:has(> span.bg-warning) { color: light-dark(#000, ${V4.yellow}) !important; }
    html:root .rounded-full.h-6 > span.bg-warning { background: ${V4.yellow} !important; }
    html:root :is(span, a, button).rounded-full.h-6:has(> span.bg-error) { color: ${V4.error} !important; }
    html:root .rounded-full.h-6 > span.bg-error { background: ${V4.error} !important; }
    /* Action icons as v4.0: 20px; Redeploy/Deploy orange, Restart yellow (dark mode), Stop red. */
    html:root .split-action :is(.split-action-main, .listbox-option) svg { width: 20px !important; height: 20px !important; opacity: 1 !important; }
    html.dark:root .split-action :is([wire\\:click^="deploy"], [wire\\:click^="force_deploy"], [\\@click*="forceDeployEvent"]) svg { color: #fb923c !important; }
    html.dark:root .split-action :is([\\@click*="restart-trigger"], [\\@click*="pullAndRestartEvent"], [\\@click*="startEvent"]) svg { color: ${V4.yellow} !important; }
    html:root .split-action [\\@click*="stop-trigger"] svg { color: ${V4.error} !important; }

    /* Hand-made v4.5 tables (registries, members, invitations, patches, tags, …): a framed card with an 11px grey header
       row and 12px grid rows. v4.0: no frame, header uppercase / bold / white 14px, rows 14px with 16px padding, first
       cell bold, thin dividers, grey hover. */
    html:root main div[class~="rounded-xl"][class~="shadow-sm"][class~="bg-white"]:is([class~="overflow-hidden"], [class~="overflow-x-auto"]):not(.logs-viewer) {
      border: 0 !important; border-radius: 0 !important; background: none !important; box-shadow: none !important;
    }
    html:root main div[class~="rounded-xl"][class~="shadow-sm"][class~="bg-white"] > div[class~="bg-neutral-50"][class~="border-b"]:first-child:not([class~="text-[11px]"]) {
      padding: 0 0 8px !important; background: none !important; border: 0 !important;
    }
    html:root main div[class~="rounded-xl"][class~="shadow-sm"][class~="bg-white"] > div[class~="bg-neutral-50"]:first-child:not([class~="text-[11px]"]) > :is(a, span, h2, h3)[class~="text-[13px]"] {
      font-size: 18px !important; line-height: 28px !important; font-weight: 700 !important; color: var(--L-strong) !important;
    }
    html:root main div[class~="rounded-xl"][class~="shadow-sm"][class~="bg-white"] > div[class~="bg-neutral-50"]:first-child:not([class~="text-[11px]"]) > svg:first-child { display: none !important; }
    html:root main div[class~="text-[11px]"][class~="font-medium"][class~="border-b"]:is([class~="text-neutral-500"], [class~="text-neutral-400"]) {
      padding: 14px 12px 14px 24px !important; background: none !important; text-transform: uppercase !important; letter-spacing: 0 !important;
      font-size: 14px !important; font-weight: 700 !important; color: var(--L-strong) !important; border-color: light-dark(#d4d4d4, ${V4.g200}) !important;
    }
    html:root main div[class~="text-[11px]"][class~="font-medium"][class~="border-b"] > * { font-size: inherit !important; font-weight: inherit !important; color: inherit !important; }
    html:root main :is(div, a, button)[class~="grid"][class~="items-center"][class~="px-4"]:is([class~="min-h-11"], [class~="min-h-14"]) {
      padding: 16px 12px 16px 24px !important; font-size: 14px !important; color: light-dark(#000, #a3a3a3) !important; background: none !important;
    }
    html:root main :is(div, a, button)[class~="grid"][class~="items-center"][class~="px-4"]:is([class~="min-h-11"], [class~="min-h-14"]):hover { background: light-dark(#f5f5f5, ${V4.g300}) !important; }
    html:root main :is(div, a, button)[class~="grid"][class~="items-center"][class~="px-4"]:is([class~="min-h-11"], [class~="min-h-14"]) > :first-child { font-weight: 700 !important; }
    html:root main :is(div, a, button)[class~="grid"][class~="items-center"][class~="px-4"]:is([class~="min-h-11"], [class~="min-h-14"]) :is([class~="text-[12px]"], [class~="text-[13px]"], [class~="text-xs"]):not(.rounded-full) { font-size: 14px !important; }
    html:root main div[class~="rounded-xl"][class~="shadow-sm"][class~="bg-white"] [class~="border-b"]:not([class~="text-[11px]"]) { border-color: light-dark(#d4d4d4, ${V4.g200}) !important; }
    html:root main div[class~="rounded-xl"][class~="shadow-sm"][class~="bg-white"] > div[class~="px-4"][class~="py-3"]:last-child { padding: 12px 24px !important; }
    /* Icon tiles in front of titles (server overview, lists, rows): v4.0 had none. */
    html:root main :is(div, span)[class~="justify-center"][class~="shrink-0"]:is([class~="rounded-lg"], [class~="rounded-xl"]):is([class~="size-8"], [class~="size-9"], [class~="size-10"]):is([class~="bg-neutral-50"], [class~="bg-neutral-100"]):not([data-ec-root] *) {
      display: none !important;
    }
    /* Server breadcrumb: space between the server name and its status. */
    html:root header.app-topbar [data-testid="server-topbar-context"] .rounded-full.h-6 { margin-left: 8px !important; }

    /* ── Logs: the v4.0 log box (get-logs + deployment log). One toolbar row: "Lines:" on the left, then search and a row of
       16px icon buttons (Refresh, Stream, Copy, Download, Download all, Timestamps, Text view, Colors, Debug, level filters,
       Follow, Fullscreen); an active option is yellow. v4.5 hides most of them in "View" / "Export" menus: the menus'
       own buttons are shown inline (Coolify still runs them), the menu triggers are hidden. ── */
    html:root .runtime-log-shell { margin: 16px 0 !important; border: 1px solid light-dark(#e5e5e5, ${V4.g200}) !important; border-radius: 0 !important; background: none !important; box-shadow: none !important; }
    html:root .runtime-log-trigger { display: flex !important; align-items: center !important; gap: 8px !important; padding: 16px !important; border: 0 !important; border-radius: 0 !important; background: none !important; }
    html:root .runtime-log-trigger:hover { background: light-dark(#f9fafb, ${V4.g200}) !important; }
    html:root .runtime-log-trigger h4 { font-size: 16px !important; font-weight: 700 !important; color: var(--L-strong) !important; }
    html:root :is(.runtime-log-panel, .logs-viewer) {
      border: 1px solid light-dark(#e5e5e5, ${V4.g300}) !important; border-radius: 4px !important; box-shadow: none !important;
      background: light-dark(#fff, ${V4.g100}) !important; color: light-dark(#000, #fff) !important;
    }
    html:root .logs-viewer { border-style: dotted !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) { padding: 8px 16px !important; min-height: 0 !important; background: none !important; border: 0 !important; border-bottom: 1px solid light-dark(#e5e5e5, ${V4.g300}) !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls { display: flex !important; flex-wrap: wrap !important; align-items: center !important; gap: 4px !important; width: 100% !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls :is(.logs-viewer-primary, .logs-viewer-actions, .logs-viewer-end, .runtime-log-menus, .runtime-log-menus > div, .runtime-log-menu, .runtime-log-menu > div) {
      display: contents !important; visibility: visible !important;
    }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .runtime-log-menus > div > [x-ref="trigger"], html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls :is(.runtime-log-menu-label, .runtime-log-menu > div > p), html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .runtime-log-menu [wire\\:loading\\.flex] { display: none !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .runtime-log-menu .listbox-option:is([x-on\\:click^="toggleLogFilter"]) { display: none !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .runtime-log-menu > div:has(> [x-on\\:click^="downloadLogs"]) > [x-on\\:click*="downloadAllLogs"] { display: none !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .runtime-log-menu > div > p.runtime-log-menu-label:has(+ [x-on\\:click^="toggleLogFilter"]) {
      display: inline-flex !important; order: 29 !important; align-items: center !important; justify-content: center !important; flex: none !important;
      width: 24px !important; height: 24px !important; padding: 4px !important; margin: 0 !important; border: 0 !important; background: none !important;
      font-size: 0 !important; line-height: 0 !important; cursor: pointer !important; color: light-dark(#6b7280, #9ca3af) !important;
    }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .runtime-log-menu > div > p.runtime-log-menu-label:has(+ [x-on\\:click^="toggleLogFilter"]):hover { color: light-dark(#374151, #e5e7eb) !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .runtime-log-menu > div:has(> [x-on\\:click^="toggleLogFilter"][aria-checked="false"]) > p.runtime-log-menu-label:has(+ [x-on\\:click^="toggleLogFilter"]) { color: light-dark(#ca8a04, ${V4.yellow}) !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .runtime-log-menu > div > p.runtime-log-menu-label:has(+ [x-on\\:click^="toggleLogFilter"])::before {
      content: ''; flex: none; width: 16px; height: 16px; background: currentColor; -webkit-mask: var(--lg-i-funnel) center / contain no-repeat; mask: var(--lg-i-funnel) center / contain no-repeat;
    }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .runtime-log-columns, html:root .runtime-log-columns { display: none !important; }
    /* Order as v4.0 */
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .logs-viewer-meta { order: 0 !important; display: flex !important; flex: none !important; align-items: center !important; gap: 8px !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .logs-viewer-primary > span.shrink-0 { order: 1 !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .logs-viewer-deployment-actions { order: 2 !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .logs-viewer-search { order: 10 !important; margin-left: auto !important; width: 192px !important; flex: none !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls [title="Refresh Logs"] { order: 20 !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls :is([title="Stream Logs"], [title="Stop Streaming"]) { order: 21 !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls [x-on\\:click*="copyLogs"] { order: 22 !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls [x-on\\:click^="downloadLogs"] { order: 23 !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls [x-on\\:click*="downloadAllLogs"] { order: 24 !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls :is([wire\\:click="toggleTimestamps"], [x-on\\:click^="showTimestamps"]) { order: 25 !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls [x-on\\:click="toggleTextView"] { order: 26 !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls [x-on\\:click="toggleColorLogs"] { order: 27 !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls [wire\\:click="toggleDebug"] { order: 28 !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls [x-on\\:click^="toggleLogFilter"] { order: 29 !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls [title="Follow Logs"] { order: 32 !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls :is([title="Fullscreen"], [title="Minimize"]) { order: 33 !important; }
    /* Icon buttons: p-1, 16px, gray; hover darker / lighter; active yellow (v4.0 "!text-warning"). */
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .runtime-log-menu .listbox-option { display: inline-flex !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls :is(.runtime-log-icon-button, .logs-viewer-btn, .runtime-log-menu .listbox-option) {
      align-items: center !important; justify-content: center !important; flex: none !important;
      width: 24px !important; height: 24px !important; min-height: 0 !important; padding: 4px !important; margin: 0 !important; gap: 0 !important;
      border: 0 !important; border-radius: 0 !important; background: none !important; box-shadow: none !important;
      color: light-dark(#6b7280, #9ca3af) !important; font-size: 0 !important; line-height: 0 !important;
    }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls :is(.runtime-log-icon-button, .logs-viewer-btn, .runtime-log-menu .listbox-option):hover { color: light-dark(#374151, #e5e7eb) !important; background: none !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls :is(.runtime-log-icon-button, .logs-viewer-btn) svg { width: 16px !important; height: 16px !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls :is(.runtime-log-icon-button-active, .logs-viewer-btn-active, .runtime-log-menu .listbox-option[aria-checked="true"]:not([x-on\\:click^="toggleLogFilter"])) { color: light-dark(#ca8a04, ${V4.yellow}) !important; background: none !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls :is(.runtime-log-icon-button, .logs-viewer-btn):disabled { opacity: 0.5 !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .runtime-log-menu .listbox-option > * { display: none !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .runtime-log-menu .listbox-option:not([x-on\\:click^="toggleLogFilter"])::before {
      content: ''; width: 16px; height: 16px; background: currentColor; -webkit-mask: var(--lg-i-icon) center / contain no-repeat; mask: var(--lg-i-icon) center / contain no-repeat;
    }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls :is([wire\\:click="toggleTimestamps"], [x-on\\:click^="showTimestamps"]) { --lg-i-icon: var(--lg-i-clock); }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls [x-on\\:click="toggleTextView"] { --lg-i-icon: var(--lg-i-text); }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls [x-on\\:click="toggleColorLogs"] { --lg-i-icon: var(--lg-i-paint); }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls [wire\\:click="toggleDebug"] { --lg-i-icon: var(--lg-i-bug); }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls [x-on\\:click*="copyLogs"] { --lg-i-icon: var(--lg-i-copy); }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls [x-on\\:click^="downloadLogs"] { --lg-i-icon: var(--lg-i-download); }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls [x-on\\:click*="downloadAllLogs"] { --lg-i-icon: var(--lg-i-downloadall); }
    /* "Lines:" inside the field (v4.0), the v4.5 "All" button as small text after it. */
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .logs-viewer-lines { position: relative !important; display: flex !important; align-items: center !important; gap: 4px !important; padding: 0 !important; border: 0 !important; background: none !important; box-shadow: none !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .logs-viewer-lines-label { position: absolute !important; left: 8px !important; top: 50% !important; transform: translateY(-50%) !important; z-index: 1 !important; font-size: 12px !important; color: #9ca3af !important; pointer-events: none !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .logs-viewer-lines-label > span:first-child::after { content: ':'; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .logs-viewer-lines-input { flex: none !important; width: 128px !important; min-width: 128px !important; max-width: none !important; text-align: left !important; height: 32px !important; padding: 0 8px 0 52px !important; font-size: 14px !important; background-color: light-dark(#fff, ${V4.g300}) !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .runtime-log-lines-all { height: 32px !important; padding: 0 8px !important; border: 0 !important; border-radius: 4px !important; background: none !important; font-size: 12px !important; color: light-dark(#6b7280, #9ca3af) !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .runtime-log-lines-all:hover { color: light-dark(#374151, #e5e7eb) !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .runtime-log-lines-all-active { color: light-dark(#ca8a04, ${V4.yellow}) !important; }
    /* Search: v4.0 input-sm, 192px, icon left. */
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .logs-viewer-search input {
      height: 32px !important; padding: 0 32px !important; font-size: 14px !important; border: 0 !important; border-radius: 4px !important;
      background: light-dark(#fff, ${V4.g300}) !important; color: var(--L-strong) !important;
      box-shadow: inset 4px 0 0 transparent, inset 0 0 0 2px light-dark(#e5e5e5, ${V4.g400}) !important;
    }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .logs-viewer-search input:focus { box-shadow: inset 4px 0 0 var(--L-accent), inset 0 0 0 2px light-dark(#e5e5e5, ${V4.g400}) !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .logs-viewer-search kbd { display: none !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .logs-viewer-search > svg { width: 16px !important; height: 16px !important; left: 8px !important; color: #9ca3af !important; }
    /* Deployment status as v4.0: "Deployment is <status in yellow>". */
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .logs-viewer-primary > span.shrink-0 { font-size: 14px !important; font-weight: 400 !important; color: light-dark(#000, ${V4.yellow}) !important; gap: 4px !important; }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .logs-viewer-primary > span.shrink-0::before { content: 'Deployment is'; color: light-dark(#000, #fff); }
    html:root :is(.runtime-log-toolbar, .logs-viewer-toolbar) .logs-viewer-toolbar-controls .logs-viewer-primary > span.shrink-0 > span:first-child { display: none !important; }
    /* Log lines */
    html:root :is(.runtime-log-viewport, .logs-viewer-viewport) { padding: 8px 16px !important; background: none !important; }
    html:root .logs-viewer-line { color: light-dark(#000, #fff) !important; }
    html:root .logs-viewer-timestamp { color: #6b7280 !important; }

    /* ── Domains (application, preview, service): a v4.0 box per domain instead of a table row. Line 1: the domain
       (bold link), its DNS status, and plain text buttons Check DNS / Settings / Remove; line 2: the details as
       "Label: value". Service group headers are bold titles; "Add domain" is a plain v4.0 button. ── */
    html:root main .data-table-header.service-domains-overview-grid { display: none !important; }
    html:root main .data-table:has(> .env-table-item > .service-domains-overview-grid) { display: flex !important; flex-direction: column !important; gap: 8px !important; }
    html:root main .env-table-item:has(> .service-domains-overview-grid) { border: 0 !important; }
    html:root main .data-table-row.service-domains-overview-grid {
      display: flex !important; flex-wrap: wrap !important; align-items: center !important; gap: 8px 24px !important;
      padding: 16px !important; border: 1px solid light-dark(#e5e5e5, ${V4.g300}) !important; border-radius: 0 !important;
      background: light-dark(#fff, ${V4.base}) !important; font-size: 14px !important; color: var(--L-text) !important;
    }
    html:root main .data-table-row.service-domains-overview-grid:hover { background: light-dark(#fff, ${V4.base}) !important; }
    html:root main .data-table-row.service-domains-overview-grid.domains-row-suggested { border-style: dashed !important; box-shadow: none !important; background: light-dark(#fff, ${V4.base}) !important; }
    /* Table badges ("Required", "Used by Compose", "Suggested", …): v4.0 showed such notes as bold colored text, no pill. */
    html:root .table-badge { height: auto !important; padding: 0 !important; border: 0 !important; border-radius: 0 !important; background: none !important;
      font-size: 12px !important; font-weight: 700 !important; color: #737373 !important; }
    html:root .table-badge.table-badge-danger { color: ${V4.error} !important; }
    html:root .table-badge.table-badge-warning { color: light-dark(#a16207, ${V4.yellow}) !important; }
    html:root .table-badge.table-badge-success { color: ${V4.success} !important; }
    html:root main .data-table-row.service-domains-overview-grid::after { content: ''; order: 4; flex-basis: 100%; height: 0; }
    html:root main .data-table-row.service-domains-overview-grid > :first-child { order: 1; flex: 1 1 0% !important; min-width: 0 !important; font-weight: 400 !important; }
    html:root main .data-table-row.service-domains-overview-grid > :first-child :is(a, span[title]) { overflow: hidden !important; text-overflow: ellipsis !important; white-space: nowrap !important; }
    html:root main .data-table-row.service-domains-overview-grid > :first-child span.relative[class~="size-4"] { display: none !important; }
    html:root main .data-table-row.service-domains-overview-grid > :first-child a { font-size: 14px !important; font-weight: 700 !important; color: var(--L-strong) !important; text-decoration: none !important; }
    html:root main .data-table-row.service-domains-overview-grid > :first-child a:hover { text-decoration: underline !important; }
    html:root main .data-table-row.service-domains-overview-grid > .service-domain-dns { order: 2; }
    html:root main .data-table-row.service-domains-overview-grid > .service-domain-actions { order: 3; gap: 8px !important; }
    html:root main .data-table-row.service-domains-overview-grid > .service-domain-detail { order: 5; display: inline-flex !important; justify-content: flex-start !important; gap: 4px !important; font-size: 14px !important; color: var(--L-text) !important; }
    html:root main .data-table-row.service-domains-overview-grid > .service-domain-detail .service-domain-detail-label { display: inline !important; font-weight: 700 !important; color: light-dark(#000, #fff) !important; }
    html:root main .data-table-row.service-domains-overview-grid > .service-domain-detail .service-domain-detail-label::after { content: ':'; }
    html:root main .data-table-row.service-domains-overview-grid > .service-domain-detail svg { width: 16px !important; height: 16px !important; }
    html:root main .data-table-row.service-domains-overview-grid > .service-domain-mobile-summary { display: none !important; }
    html:root main .data-table-row.service-domains-overview-grid .service-domain-actions .icon-button {
      width: auto !important; height: 32px !important; padding: 0 8px !important; gap: 0 !important; border: 2px solid var(--L-line) !important; border-radius: 4px !important;
      background: var(--L-surface) !important; color: var(--L-strong) !important; font-size: 0 !important; box-shadow: none !important;
    }
    html:root main .data-table-row.service-domains-overview-grid .service-domain-actions .icon-button:hover { background: var(--L-btn-hover) !important; }
    html:root main .data-table-row.service-domains-overview-grid .service-domain-actions .icon-button > svg { display: none !important; }
    html:root main .data-table-row.service-domains-overview-grid .service-domain-actions .icon-button::before { font-size: 14px; font-weight: 500; line-height: 20px; }
    html:root main .data-table-row.service-domains-overview-grid .service-domain-actions .icon-button:is([title="Check DNS"], [aria-label="Check DNS"])::before { content: 'Check DNS'; }
    html:root main .data-table-row.service-domains-overview-grid .service-domain-actions .icon-button:is([title="Domain settings"], [aria-label^="Settings for"])::before { content: 'Settings'; }
    html:root main .data-table-row.service-domains-overview-grid .service-domain-actions .icon-button:is([title="Remove domain"], [aria-label="Remove domain"])::before { content: 'Remove'; }
    html.dark:root main .data-table-row.service-domains-overview-grid .service-domain-actions .icon-button:is([title="Remove domain"], [aria-label="Remove domain"]) { background: rgb(127 29 29 / 0.3) !important; border-color: #991b1b !important; color: #fca5a5 !important; }
    html:root:not(.dark) main .data-table-row.service-domains-overview-grid .service-domain-actions .icon-button:is([title="Remove domain"], [aria-label="Remove domain"]) { background: #fef2f2 !important; border-color: #fca5a5 !important; color: #991b1b !important; }
    html:root main .data-table-row.service-domains-overview-grid .service-domain-actions .button { height: 32px !important; padding: 0 8px !important; font-size: 14px !important; }
    /* Group headers (Compose service / service app / preview): bold titles, no band. */
    html:root main :is(section[id^="service-domain-group-"], section[id^="application-compose-domain-group-"]) > div:first-child,
    html:root main .domains-overview-container div[class~="bg-neutral-50"][class~="px-4"][class~="py-3"][class~="border-b"] {
      padding: 16px 0 8px !important; background: none !important; border: 0 !important; border-radius: 0 !important;
    }
    html:root main :is(section[id^="service-domain-group-"], section[id^="application-compose-domain-group-"]) > div:first-child > span:first-child,
    html:root main .domains-overview-container div[class~="bg-neutral-50"][class~="px-4"][class~="py-3"][class~="border-b"] { font-size: 16px !important; font-weight: 700 !important; color: var(--L-strong) !important; }
    html:root main :is(section[id^="service-domain-group-"], section[id^="application-compose-domain-group-"]) { border: 0 !important; }
    /* "Add domain": a plain v4.0 button (v4.0 "+ Add"), not the purple primary. */
    html:root main :is(#domains-section, #service-domains-section, .domains-overview-container) > header .button.button-highlighted:not(:disabled),
    html:root main :is(#domains-section, #service-domains-section) > header .button.button-highlighted:not(:disabled) {
      background: var(--L-surface) !important; border-color: var(--L-line) !important; color: var(--L-strong) !important;
    }
    /* Note: Coolify's icon tooltip (components/icon-tooltip) removes title="" from every .icon-button and keeps the text in
       aria-label / data-icon-tooltip, so the icon-button labels above match aria-label too. */

    /* ── Canvas (Coolify's Svelte canvas: Dashboard / Projects / Servers): v4.0 look. Cards = v4.0 coolboxes (4px, #181818,
       #282828 border, no shadow, 2px accent ring on hover), no icon tile, bold title, bold grey subtitle and domain, v4.0
       status; server / project frames = plain 4px boxes with bold titles; environment groups = dashed 4px boxes; no dot grid. ── */
    html:root [data-ec-root] [data-ec-viewport] { background-image: none !important; background-color: var(--L-page) !important; }
    html:root [data-ec-root] [data-ec-card] { border-radius: 4px !important; box-shadow: none !important; background: light-dark(#fff, ${V4.g100}) !important; border-color: light-dark(#e5e5e5, ${V4.g400}) !important; }
    html:root [data-ec-root] [data-ec-card]:hover { box-shadow: 0 0 0 2px var(--L-accent) !important; }
    html:root [data-ec-root] [data-ec-card][class~="border-coollabs"] { border-color: var(--L-accent) !important; box-shadow: 0 0 0 2px var(--L-accent) !important; }
    html:root [data-ec-root] [data-ec-card][class~="border-dashed"] { background: none !important; border-color: light-dark(#d4d4d4, ${V4.g400}) !important; }
    html:root [data-ec-root] [data-ec-card] div[class~="size-8"][class~="rounded-lg"] { display: none !important; }
    html:root [data-ec-root] [data-ec-card] div[class~="text-[13px]"][class~="font-semibold"] { font-size: 14px !important; line-height: 20px !important; font-weight: 700 !important; color: var(--L-strong) !important; }
    html:root [data-ec-root] [data-ec-card] div[class~="text-[11px]"][class~="text-neutral-500"], html:root [data-ec-root] [data-ec-card] a[class~="text-[11px]"] { font-size: 12px !important; font-weight: 700 !important; color: #737373 !important; }
    html:root [data-ec-root] [data-ec-card] a[class~="text-[11px]"]:hover { color: var(--L-strong) !important; }
    html:root [data-ec-root] [data-ec-card] span[class~="inline-flex"][class~="text-[11px]"][class~="font-medium"] { font-size: 12px !important; font-weight: 700 !important; gap: 6px !important; }
    html:root [data-ec-root] [data-ec-card] span.relative.flex:has(> span.rounded-full) { width: 10px !important; height: 10px !important; }
    html:root [data-ec-root] [data-ec-card] span.relative.flex > span.rounded-full { border: 1px solid light-dark(#e5e5e5, #000) !important; }
    /* Pills on cards and in "Recent deployments" (Deploying, In progress, Success, +N servers): v4.0 bold text, no pill. */
    html:root [data-ec-root] :is([data-ec-card], [data-ec-deployments]) :is(span, a)[class~="rounded-full"][class~="border"] {
      border: 0 !important; background: none !important; padding: 0 !important; height: auto !important; font-size: 12px !important; line-height: 20px !important; font-weight: 700 !important; gap: 6px !important; color: var(--L-strong) !important;
    }
    html:root [data-ec-root] [data-ec-deployments] a[class~="rounded-full"][class~="border"]:hover { text-decoration: underline !important; }
    html:root [data-ec-root] [data-ec-deployments] span.relative.flex:has(> span.rounded-full) { width: 10px !important; height: 10px !important; }
    html:root [data-ec-root] [data-ec-deployments] span.relative.flex > span.rounded-full { border: 1px solid light-dark(#e5e5e5, #000) !important; }
    html:root [data-ec-root] [data-ec-card] ul { border-color: light-dark(#e5e5e5, ${V4.g300}) !important; }
    html:root [data-ec-root] [data-ec-card] ul li { font-size: 12px !important; }
    /* Server / project frames */
    html:root [data-ec-root] div.absolute[class~="rounded-2xl"]:has(> [data-ec-zone-header]) {
      border-radius: 4px !important; background: none !important; border: 1px solid light-dark(#d4d4d4, ${V4.g300}) !important;
    }
    html:root [data-ec-root] [data-ec-zone-header] a[class~="font-semibold"] { font-size: 16px !important; font-weight: 700 !important; color: var(--L-strong) !important; }
    html:root [data-ec-root] [data-ec-zone-header] > div > svg:first-child { display: none !important; }
    html:root [data-ec-root] [data-ec-zone-header] span[class~="rounded-full"][class~="border"] { border: 0 !important; background: none !important; padding: 0 !important; font-size: 12px !important; font-weight: 700 !important; }
    /* Environment groups */
    html:root [data-ec-root] div.absolute[class~="rounded-xl"][class~="border-dashed"]:has(> [data-ec-group-header]) { border-radius: 4px !important; border-color: light-dark(#d4d4d4, ${V4.g400}) !important; }
    html:root [data-ec-root] [data-ec-group-header] { font-size: 14px !important; font-weight: 700 !important; color: var(--L-strong) !important; }
    html:root [data-ec-root] [data-ec-group-header] > svg { display: none !important; }
    /* Side panel, deployments, centered empty state */
    html:root [data-ec-root] [data-ec-panel] { border-radius: 4px !important; background: light-dark(#fff, ${V4.g100}) !important; border-color: light-dark(#e5e5e5, ${V4.g300}) !important; box-shadow: 0 1px 3px rgb(0 0 0 / 0.2) !important; }
    html:root [data-ec-root] [data-ec-panel] > div:first-child > div[class~="size-8"] { display: none !important; }
    html:root [data-ec-root] [data-ec-panel] h2 { font-size: 16px !important; font-weight: 700 !important; }
    html:root [data-ec-root] [data-ec-deployments] { border-radius: 4px !important; background: light-dark(#fff, ${V4.g100}) !important; border-color: light-dark(#e5e5e5, ${V4.g200}) !important; }
    html:root [data-ec-root] div[class~="pointer-events-auto"][class~="rounded-xl"][class~="max-w-sm"] { border-radius: 4px !important; background: light-dark(#fff, ${V4.g100}) !important; }
    /* Compose resources: the view switch wrapper was left as an empty box. */
    html:root #compose-resources-section > header .view-toggle { display: none !important; }

    /* ── Inputs: 2px inset ring, 4px radius; focus = 4px left bar (yellow dark, purple light) ── */
    html:root :is(.input, .select, .listbox-trigger, .chip-input) {
      border: 0 !important; border-radius: 4px !important; background-color: var(--L-surface) !important; color: var(--L-strong) !important;
      box-shadow: inset 4px 0 0 transparent, inset 0 0 0 2px var(--L-ring) !important; outline: none !important;
    }
    html:root :is(.input, .select, .listbox-trigger, .chip-input):is(:focus, :focus-visible, :focus-within, [aria-expanded="true"]) {
      box-shadow: inset 4px 0 0 var(--L-accent), inset 0 0 0 2px var(--L-ring) !important;
    }
    html:root :is(.input, .select):is(:disabled, [readonly]) { background-color: light-dark(#e5e5e5, rgb(24 24 24 / 0.4)) !important; color: #737373 !important; box-shadow: none !important; }
    html:root :is(.input, textarea)::placeholder { color: light-dark(#d4d4d4, #404040) !important; }

    /* ── Dropdowns: square panels, purple hover in dark ── */
    html:root .listbox-panel { border-radius: 0 !important; background: var(--L-float) !important; border: 1px solid light-dark(#d4d4d4, ${V4.g300}) !important; box-shadow: 0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1) !important; padding: 4px !important; }
    html:root .listbox-option { border-radius: 0 !important; font-size: 12px !important; }
    html.dark:root .listbox-option:not(.listbox-option-disabled):hover { background: ${V4.purple} !important; color: #ffffff !important; }
    html:root:not(.dark) .listbox-option:not(.listbox-option-disabled):hover { background: #f5f5f5 !important; }

    /* ── Sections: plain (no card, no well): a bold 20px title over the fields ── */
    html:root main .application-settings-section:not(.application-settings-form) {
      background: none !important; border: 0 !important; border-radius: 0 !important; padding: 0 !important; box-shadow: none !important;
    }
    html:root main .application-settings-section > :is(header, .application-settings-section-header) { padding: 0 0 12px !important; background: none !important; border: 0 !important; }
    html:root main .application-settings-section > :is(header, .application-settings-section-header) :is(h2, h3) { font-size: 20px !important; line-height: 28px !important; font-weight: 700 !important; color: var(--L-strong) !important; }
    html:root main .application-settings-section > :is(header, .application-settings-section-header) h3 .info-helper { color: inherit !important; }
    html:root .application-settings-section > .application-settings-section-body { background: none !important; border: 0 !important; box-shadow: none !important; padding: 0 !important; border-radius: 0 !important; }
    html:root .application-settings-section > .application-settings-section-body.is-flush { border: 0 !important; border-radius: 0 !important; overflow: visible !important; }
    /* Modals (Coolify gives them the section classes): v4.0 panel — page colour, 1px border, 4px corners, 24px title,
       round close button at the top right, 24px padding. */
    html:root .fixed.inset-0 > .absolute.inset-0:has(+ * .application-settings-form.application-settings-section:not(main *)) { background: rgb(0 0 0 / 0.2) !important; backdrop-filter: blur(4px) !important; }
    html:root .application-settings-form.application-settings-section:not(main *) {
      background: light-dark(#fff, ${V4.base}) !important; background-image: none !important; border: 1px solid light-dark(#e5e5e5, ${V4.g300}) !important;
      border-radius: 4px !important; padding: 0 !important; box-shadow: 0 1px 2px rgb(0 0 0 / 0.1) !important;
    }
    html:root .application-settings-form.application-settings-section:not(main *) > header { position: relative !important; padding: 24px 64px 24px 24px !important; margin: 0 !important; background: none !important; border: 0 !important; }
    html:root .application-settings-form.application-settings-section:not(main *) > header :is(h2, h3) { font-size: 24px !important; line-height: 32px !important; font-weight: 700 !important; color: var(--L-strong) !important; }
    html:root .application-settings-form.application-settings-section:not(main *) > header p { font-size: 14px !important; color: var(--L-text) !important; }
    html:root .application-settings-form.application-settings-section:not(main *) > header > button:last-child {
      position: absolute !important; top: 20px !important; right: 20px !important; width: 32px !important; height: 32px !important; border-radius: 9999px !important;
      color: var(--L-strong) !important; background: none !important;
    }
    html:root .application-settings-form.application-settings-section:not(main *) > header > button:last-child:hover { background: light-dark(#f5f5f5, ${V4.g300}) !important; }
    html:root .application-settings-form.application-settings-section:not(main *) > .application-settings-section-body { padding: 0 24px 24px !important; margin: 0 !important; background: none !important; border: 0 !important; box-shadow: none !important; border-radius: 0 !important; }
    html:root .application-settings-form.application-settings-section:not(main *) > footer { padding: 12px 24px !important; border-top: 1px solid light-dark(#e5e5e5, ${V4.g300}) !important; background: none !important; }
    /* Compose resources (service page): the v4.0 "Services" list — one box per container, dashed status line on the
       left, "Name (image)", description, status text, and Backups / Domains / Settings / Restart on the right. */
    html:root #compose-resources-section > .application-settings-section-body.is-flush { border: 0 !important; border-radius: 0 !important; overflow: visible !important; }
    html:root #compose-resources-section > header span.shrink-0:has(> button[x-on\\:click^="setViewMode"]) { display: none !important; }
    html:root #compose-resources-section > .application-settings-section-body > div { display: grid !important; grid-template-columns: minmax(0, 1fr) !important; gap: 8px !important; padding: 16px 0 0 !important; overflow: visible !important; }
    html:root #compose-resources-section [x-show="viewMode === 'grid'"] {
      flex-direction: row !important; align-items: stretch !important; gap: 8px !important; min-height: 64px !important; padding: 8px !important; overflow: visible !important;
      border: 0 !important; border-left: 1px dashed ${V4.error} !important; border-radius: 0 !important; background: var(--L-surface) !important; box-shadow: none !important;
    }
    html:root #compose-resources-section [x-show="viewMode === 'grid'"]:has(.bg-emerald-500) { border-left-color: ${V4.success} !important; }
    html:root #compose-resources-section [x-show="viewMode === 'grid'"]:has(.bg-warning) { border-left-color: ${V4.yellow} !important; }
    html:root #compose-resources-section [x-show="viewMode === 'grid'"] > div:first-child { padding: 0 !important; gap: 0 !important; align-items: stretch !important; }
    html:root #compose-resources-section [x-show="viewMode === 'grid'"] > div:first-child > div:first-child { display: none !important; }
    html:root #compose-resources-section [x-show="viewMode === 'grid'"] > div:first-child > div.min-w-0 { display: flex !important; flex-direction: column !important; }
    html:root #compose-resources-section [x-show="viewMode === 'grid'"] .justify-between { display: contents !important; }
    html:root #compose-resources-section [x-show="viewMode === 'grid'"] .justify-between > div.min-w-0 { order: 1; display: block !important; padding-bottom: 8px; }
    html:root #compose-resources-section [x-show="viewMode === 'grid'"] .justify-between > div.min-w-0 > div { display: inline !important; margin: 0 !important; font: 400 14px/20px var(--font-sans) !important; color: inherit !important; }
    html:root #compose-resources-section [x-show="viewMode === 'grid'"] .justify-between > div.min-w-0 > div + div { margin-left: 4px !important; font-size: 12px !important; }
    html:root #compose-resources-section [x-show="viewMode === 'grid'"] .justify-between > div.min-w-0 > div + div::before { content: '('; }
    html:root #compose-resources-section [x-show="viewMode === 'grid'"] .justify-between > div.min-w-0 > div + div::after { content: ')'; }
    html:root #compose-resources-section [x-show="viewMode === 'grid'"] > div:first-child > div.min-w-0 > :is(p, div.mt-2) { order: 2; margin: 0 !important; font-size: 12px !important; line-height: 16px !important; color: inherit !important; }
    html:root #compose-resources-section [x-show="viewMode === 'grid'"] .justify-between > :not(div.min-w-0) { order: 3; }
    html:root #compose-resources-section [x-show="viewMode === 'grid'"] :is(span, a, button).rounded-full.h-6 { height: auto !important; padding: 0 !important; border: 0 !important; background: none !important; gap: 0 !important;
      font-size: 12px !important; font-weight: 400 !important; color: inherit !important; }
    html:root #compose-resources-section [x-show="viewMode === 'grid'"] .justify-between > .rounded-full.h-6 { padding-top: 8px !important; }
    html:root #compose-resources-section [x-show="viewMode === 'grid'"] .rounded-full.h-6 > span.relative { display: none !important; }
    html:root #compose-resources-section [x-show="viewMode === 'grid'"] div.mt-2 > .rounded-full.h-6 { color: ${V4.error} !important; }
    html:root #compose-resources-section [x-show="viewMode === 'grid'"] > div:last-child { align-items: center !important; gap: 0 !important; padding: 0 16px !important; border: 0 !important; background: none !important; }
    html:root #compose-resources-section [x-show="viewMode === 'grid'"] > div:last-child .icon-button { width: auto !important; height: auto !important; margin: 0 16px !important; padding: 0 !important; border: 0 !important; background: none !important;
      box-shadow: none !important; font-size: 12px !important; font-weight: 700 !important; line-height: 16px !important; color: inherit !important; }
    html:root #compose-resources-section [x-show="viewMode === 'grid'"] > div:last-child .icon-button:hover { text-decoration: underline !important; }
    html:root #compose-resources-section [x-show="viewMode === 'grid'"] > div:last-child .icon-button > svg { display: none !important; }
    html:root #compose-resources-section [x-show="viewMode === 'grid'"] > div:last-child .icon-button:is([title="Service backups"], [aria-label="Service backups"])::before { content: 'Backups'; }
    html:root #compose-resources-section [x-show="viewMode === 'grid'"] > div:last-child .icon-button:is([title="Manage domains"], [aria-label="Manage domains"])::before { content: 'Domains'; }
    html:root #compose-resources-section [x-show="viewMode === 'grid'"] > div:last-child .icon-button:is([title="Resource settings"], [aria-label="Resource settings"])::before { content: 'Settings'; }

    /* ── v4.0 global pieces ── */
    /* Section pages: Coolify's own small-screen title would repeat the v4.0 heading. */
    html:root:has(#lg-head.lg-section) main :is(.settings-mobile-header, header.mb-6[class~="xl:hidden"]) { display: none !important; }
    /* Page title rows: the "+ Add"-style button sits right after the title. */
    html:root main :is(div.mb-5.flex, header.mb-5):has(> h1) { justify-content: flex-start !important; gap: 8px !important; }
    /* Info "i": 16px, purple (light) / yellow (dark); popup grey, square, 12px. Required "*": bold accent. */
    html:root button.info-helper[class~="size-3.5"] { width: 16px !important; height: 16px !important; color: var(--L-accent) !important; opacity: 1 !important; }
    html:root button.info-helper[class~="size-3.5"] > svg { width: 16px !important; height: 16px !important; color: inherit !important; }
    html:root .info-helper-popup { border: 0 !important; border-radius: 4px !important; box-shadow: none !important; max-width: 24rem !important;
      background: light-dark(#e5e5e5, ${V4.g400}) !important; color: light-dark(#404040, #d4d4d4) !important; }
    html:root .info-helper-popup > div { padding: 16px !important; font-size: 12px !important; line-height: 16px !important; }
    html:root .text-helper { font-weight: 700 !important; color: var(--L-accent) !important; }
    /* Labels: 14px medium, 4px above the field. */
    html:root :is(main, .application-settings-form) label { font-size: 14px !important; font-weight: 500 !important; color: inherit !important; }
    html:root :is(main, .application-settings-form) div[class~="mb-1.5"][class~="h-4"]:has(> label) { height: auto !important; margin-bottom: 4px !important; gap: 4px !important; }
    /* A changed field keeps the v4.0 4px left bar (Coolify adds the class; its form CSS removed the shadow). */
    html:root :is(.input, .select, textarea)[class*="inset_4px_0_0_"] { box-shadow: inset 4px 0 0 var(--L-accent), inset 0 0 0 2px var(--L-ring) !important; }
    /* Checkbox: the native 16px box (forms plugin), checked #282828, 14px text; Coolify's drawn box hidden. */
    html:root .form-control input.peer[type="checkbox"] {
      position: static !important; opacity: 1 !important; width: 16px !important; height: 16px !important; margin: 0 !important; flex: none !important; cursor: pointer !important;
      border: 1px solid light-dark(#6b7280, #404040) !important; border-radius: 4px !important; background-color: light-dark(#fff, ${V4.g100}) !important; color: ${V4.g400} !important;
    }
    html:root .form-control input.peer[type="checkbox"]:checked { background-color: ${V4.g400} !important; border-color: transparent !important; }
    html:root .form-control input.peer[type="checkbox"] ~ * { display: none !important; }
    html:root .form-control span[class~="size-[18px]"] { width: 16px !important; height: 16px !important; }
    html:root .form-control.group { min-height: 0 !important; padding: 4px 8px 4px 0 !important; border-radius: 0 !important; background: none !important; }
    html:root .form-control.group:hover { background: light-dark(transparent, ${V4.g100}) !important; }
    html:root .form-control.group label > span:first-child { font-size: 14px !important; color: inherit !important; }
    /* Status: v4.0 12px dot + bold colored label (no pill). */
    html:root :is(span, a, button).rounded-full.h-6:has(> span.relative) {
      height: auto !important; padding: 0 !important; border: 0 !important; background: none !important; gap: 8px !important;
      font-size: 12px !important; font-weight: 700 !important; color: #a3a3a3 !important;
    }
    html:root .rounded-full.h-6 > span.relative, html:root .rounded-full.h-6 > span.relative > span { width: 12px !important; height: 12px !important; border-radius: 9999px !important; animation: none !important; }
    html:root .rounded-full.h-6 > span.relative > span { border: 1px solid light-dark(#e5e5e5, #000) !important; }
    html:root .rounded-full.h-6 > span.relative > span.absolute { display: none !important; }
    html:root :is(span, a, button).rounded-full.h-6:has(> span.relative):has(.bg-emerald-500) { color: ${V4.success} !important; }
    html:root .rounded-full.h-6 > span.relative > span.bg-emerald-500 { background: ${V4.success} !important; }
    html:root :is(span, a, button).rounded-full.h-6:has(> span.relative):has(.bg-red-500) { color: ${V4.error} !important; }
    html:root .rounded-full.h-6 > span.relative > span.bg-red-500 { background: ${V4.error} !important; }
    html:root :is(span, a, button).rounded-full.h-6:has(> span.relative):has(.bg-warning) { color: light-dark(#000, ${V4.yellow}) !important; }
    html:root .rounded-full.h-6 > span.relative > span.bg-warning { background: ${V4.yellow} !important; }
    /* Spinners yellow in dark (purple in light); page-load bar yellow, as v4.0. */
    html.dark:root :is(.animate-spin, .loading-indicator) { color: ${V4.yellow} !important; }
    html:root:not(.dark) .loading-indicator { color: ${V4.purple} !important; }
    html:root #nprogress .bar { background: #ffff00 !important; }
    html:root #nprogress .peg { box-shadow: 0 0 10px #ffff00, 0 0 5px #ffff00 !important; }
    html:root div[role="status"]:has(> svg.loading-indicator) { font-size: 14px !important; color: inherit !important; }
    html:root div[role="status"] > svg.loading-indicator { order: 2; margin: 0 4px 0 12px !important; }
    /* Toasts: top center, 20rem, flat card, plain colored icon, regular title. */
    html:root ul.z-9999 { max-width: 20rem !important; gap: 15px !important; }
    html:root ul.z-9999.bottom-4 { top: 24px !important; bottom: auto !important; left: 50% !important; right: auto !important; transform: translateX(-50%) !important; flex-direction: column !important; }
    html:root li.toast-card { padding: 16px 72px 16px 16px !important; border-radius: 4px !important; background: light-dark(#fff, ${V4.g100}) !important;
      border: 1px solid light-dark(transparent, ${V4.g200}) !important; box-shadow: 0 5px 15px -3px rgb(0 0 0 / 0.08) !important; }
    html:root .toast-icon { width: auto !important; height: auto !important; background: none !important; border: 0 !important; box-shadow: none !important; }
    html:root .toast-icon svg { width: 18px !important; height: 18px !important; }
    html:root .toast-icon[class*="emerald"] { color: #22c55e !important; } html:root .toast-icon[class*="coollabs"] { color: #3b82f6 !important; }
    html:root .toast-icon[class*="amber"] { color: #fb923c !important; } html:root .toast-icon[class*="red"] { color: #ef4444 !important; }
    html:root li.toast-card p.font-semibold { font-weight: 400 !important; color: light-dark(#000, #e5e5e5) !important; }
    html:root li.toast-card > button { border-radius: 9999px !important; }
    /* Callouts: 16px padding, 20px icon, bold 16px title, 14px text; info is blue (v4.0). */
    html:root [class^="relative rounded-lg border px-3 py-2.5"] { padding: 16px !important; border-radius: 8px !important; }
    html:root [class^="relative rounded-lg border px-3 py-2.5"] > div > svg { width: 20px !important; height: 20px !important; margin-top: 0 !important; }
    html:root [class^="relative rounded-lg border px-3 py-2.5"] > div > div > div:first-child { font-size: 16px !important; font-weight: 700 !important; }
    html:root [class^="relative rounded-lg border px-3 py-2.5"] > div > div > div:nth-child(2) { font-size: 14px !important; margin-top: 8px !important; }
    html.dark:root [class~="bg-coollabs/[0.055]"] { background: rgb(30 58 138 / 0.3) !important; border-color: #1e40af !important; }
    html.dark:root [class~="bg-coollabs/[0.055]"] :is(svg, div > div:first-child) { color: #93c5fd !important; }
    html:root:not(.dark) [class~="bg-coollabs/[0.055]"] { background: #eff6ff !important; border-color: #93c5fd !important; }
    html:root:not(.dark) [class~="bg-coollabs/[0.055]"] :is(svg, div > div:first-child) { color: #1e40af !important; }
    html.dark:root [class~="bg-warning/[0.07]"] { background: rgb(113 63 18 / 0.3) !important; border-color: #854d0e !important; }
    /* Empty states: plain text, no frame or icon tile. */
    html:root .empty-state { border: 0 !important; padding: 0 !important; background: none !important; box-shadow: none !important; }
    html:root .empty-state-well { min-height: 0 !important; padding: 0 !important; border: 0 !important; background: none !important; box-shadow: none !important; align-items: flex-start !important; text-align: left !important; }
    html:root .empty-state-well > div:first-child:has(> svg) { display: none !important; }
    html:root .empty-state-title { font-size: 14px !important; font-weight: 700 !important; color: light-dark(#000, ${V4.yellow}) !important; }
    html:root .empty-state-description { max-width: none !important; font-size: 14px !important; color: inherit !important; }
    /* "Unsaved changes" bar (v4.5 only): flat v4.0 panel. */
    html:root div[class*="[&.is-dirty]:pointer-events-auto"] { border-radius: 4px !important; padding: 8px 8px 8px 16px !important; background: light-dark(#fff, ${V4.g100}) !important;
      border: 2px solid light-dark(#e5e5e5, ${V4.g300}) !important; box-shadow: 0 1px 3px rgb(0 0 0 / 0.2) !important; }
    html:root div[class*="[&.is-dirty]:pointer-events-auto"] kbd { display: none !important; }
    /* Confirmation windows: v4.0 width, Back/Confirm spread, larger action list. */
    html:root body > div.fixed > div > .application-settings-section:has([x-show="step === 1"]) { max-width: 48rem !important; }
    html:root :is([x-show="step === 1"], [x-show="step === 2"], [x-show^="step === 3"]) > .border-t { border-top: 0 !important; padding-top: 0 !important; }
    html:root :is([x-show="step === 2"], [x-show^="step === 3"]) > .border-t { justify-content: space-between !important; }
    html:root [x-show="step === 2"] li { font-size: 14px !important; color: #ef4444 !important; }
    html:root [x-show="step === 2"] :is(p, label, div, h4)[class~="text-[12px]"] { font-size: 14px !important; }
    html:root [x-show="step === 2"] h4[class~="text-[12px]"] { font-size: 18px !important; margin-bottom: 8px !important; }
    /* Search window (⌘K): input box and results box apart, yellow focus bar, uppercase groups, square rows. */
    html:root .command-palette { background: none !important; box-shadow: none !important; overflow: visible !important; gap: 8px !important; border: 0 !important; }
    html:root .command-palette-header { min-height: 56px !important; border-radius: 8px !important; background: light-dark(#fff, ${V4.g100}) !important;
      box-shadow: 0 0 0 1px light-dark(#d4d4d4, ${V4.g300}), 0 20px 25px -5px rgb(0 0 0 / 0.1) !important; border: 0 !important; }
    html:root .command-palette-header:focus-within { box-shadow: inset 4px 0 0 var(--L-accent), 0 0 0 1px light-dark(#d4d4d4, ${V4.g300}) !important; }
    html:root .command-palette-input { font-size: 16px !important; }
    html:root .command-palette-body { border-radius: 8px !important; background: light-dark(#fff, ${V4.g100}) !important; box-shadow: 0 0 0 1px light-dark(#d4d4d4, ${V4.g300}) !important; border: 0 !important; }
    html:root .command-palette-group-label { text-transform: uppercase !important; font-size: 12px !important; font-weight: 600 !important; letter-spacing: 0.05em !important; }
    html:root .command-palette-item { border-radius: 0 !important; }
    html:root .command-palette-item:hover { background: light-dark(#f5f5f5, ${V4.g200}) !important; }
    html:root .command-palette-item:focus { background: light-dark(#fefce8, rgb(113 63 18 / 0.2)) !important; }
    /* List pages (Sources, Destinations, S3 Storages, Tags, Shared Variables): v4.0 boxes, 2 per row. */
    html:root main .grid:has(> :is(a, article).group.rounded-xl[class~="min-h-28"]) { grid-template-columns: minmax(0, 1fr) !important; gap: 16px !important; }
    @media (min-width: 1024px) { html:root main .grid:has(> :is(a, article).group.rounded-xl[class~="min-h-28"]) { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }
    html:root main :is(a, article).group.rounded-xl[class~="min-h-28"] { min-height: 64px !important; padding: 8px 24px !important; justify-content: center !important; }
    html:root main :is(a, article).group.rounded-xl[class~="min-h-28"] :is(.resource-glyph, .mt-auto) { display: none !important; }
    html:root main :is(a, article).group.rounded-xl[class~="min-h-28"] h2 { font-size: 14px !important; line-height: 20px !important; font-weight: 700 !important; color: var(--L-strong) !important; }
    html:root main :is(a, article).group.rounded-xl[class~="min-h-28"] p { font-size: 12px !important; font-weight: 700 !important; color: #737373 !important; }
    /* v4.0 colors: success / warning / error as in v4.0 (v4.5 darkens them in light mode); purple-light accents → yellow. */
    html:root:not(.dark) { --color-success: #22c55e !important; --color-warning: ${V4.yellow} !important; --color-error: ${V4.error} !important; }
    html.dark:root { --color-error: ${V4.error} !important; }
    html.dark:root [class~="dark:text-brand-light"] { color: ${V4.yellow} !important; }
    /* Env var cards: a field with an error gets a red left bar. */
    html:root #lg-envs :is(.lg-env-row > div:has(> .lg-err), label.lg-field:has(> .lg-err)) .input { box-shadow: inset 4px 0 0 #ef4444, inset 0 0 0 2px var(--L-ring) !important; }
    /* Titles with help text: v4.0 shows the title plus an info icon (purple light, yellow dark), not an underline. */
    html:root .application-settings-section > header :is(h2, h3) span.underline { text-decoration: none !important; }
    html:root .application-settings-section > header :is(h2, h3) button.info-helper:not([class~="size-3.5"]) { display: inline-flex !important; align-items: center !important; gap: 8px !important; }
    html:root .application-settings-section > header :is(h2, h3) button.info-helper:not([class~="size-3.5"])::after {
      content: ''; flex: none; width: 16px; height: 16px; background: var(--L-accent);
      -webkit-mask: var(--lg-info) center / contain no-repeat; mask: var(--lg-info) center / contain no-repeat;
    }

    /* ── Cards in lists (projects, resources, servers): v4.0 coolbox, 2px ring on hover ── */
    html:root .app-main :is(article.group, a.group).rounded-xl, html:root :is(.box, .coolbox) {
      background: var(--L-surface) !important; background-image: none !important; border: 1px solid light-dark(#e5e5e5, ${V4.g400}) !important;
      border-radius: 4px !important; box-shadow: none !important; transform: none !important;
    }
    html:root .app-main :is(article.group, a.group).rounded-xl:hover, html:root .coolbox:hover { box-shadow: 0 0 0 2px var(--L-accent) !important; }

    /* ── Tables ── */
    /* Tables as v4.0 (app.css at v4.0.1): header always uppercase, bold, white (dark) / black (light), 14px; rows 16px
       high padding, first cell bold, thin dividers, hover #242424; no frame around the table. */
    html:root .data-table-header {
      height: auto !important; min-height: 0 !important; padding: 14px 12px 14px 24px !important; border-radius: 0 !important; background: none !important;
      text-transform: uppercase !important; letter-spacing: 0 !important; font-size: 14px !important; font-weight: 700 !important; color: var(--L-strong) !important;
      border-bottom: 1px solid light-dark(#d4d4d4, ${V4.g200}) !important;
    }
    html:root .data-table-header > * { text-transform: uppercase !important; font-size: inherit !important; font-weight: inherit !important; color: inherit !important; }
    html:root .data-table-row { padding: 16px 12px 16px 24px !important; min-height: 0 !important; font-size: 14px !important; color: light-dark(#000, #a3a3a3) !important;
      border: 0 !important; border-top: 1px solid light-dark(#d4d4d4, ${V4.g200}) !important; border-radius: 0 !important; background: none !important; }
    html:root .data-table-row > :first-child { font-weight: 700 !important; }
    html:root .data-table { border: 0 !important; border-radius: 0 !important; box-shadow: none !important; background: none !important; }
    html:root main table { min-width: 100% !important; border-collapse: collapse !important; }
    html:root main thead { text-transform: uppercase !important; }
    html:root main tr th { padding: 14px 12px !important; text-align: left !important; font-size: 14px !important; font-weight: 700 !important; color: var(--L-strong) !important; background: none !important; }
    html:root main tr th:first-child, html:root main tr td:first-child { padding-left: 24px !important; }
    html:root main tr td { padding: 16px 12px !important; white-space: nowrap !important; font-size: 14px !important; color: light-dark(#000, #a3a3a3) !important; }
    html:root main tr td:first-child { font-weight: 700 !important; }
    html:root main :is(thead, tbody) tr { border-top: 1px solid light-dark(#d4d4d4, ${V4.g200}) !important; }
    html:root main tbody tr:hover { background: light-dark(#f5f5f5, ${V4.g300}) !important; }
    html:root .data-table-row:hover { background: light-dark(#f5f5f5, ${V4.g300}) !important; }

    /* ── Tabs: plain text, the active one white (dark) ── */
    html:root .app-tab { background: none !important; box-shadow: none !important; border-radius: 0 !important; color: light-dark(#404040, #a1a1a1) !important; }
    html:root .app-tab:hover { color: var(--L-strong) !important; }
    html:root .app-tab-active { background: none !important; box-shadow: none !important; color: light-dark(#000000, #ffffff) !important; }
    html:root .app-tabbar [class~="rounded-[10px]"] { background: none !important; }
    /* View switch (Canvas / List): grey, no purple. */
    html:root .view-toggle { background: var(--L-surface) !important; border: 2px solid var(--L-line) !important; border-radius: 4px !important; box-shadow: none !important; }
    html:root .view-toggle :is(a, button) { border-radius: 2px !important; color: var(--L-text) !important; box-shadow: none !important; background: none !important; }
    html:root .view-toggle :is(a, button) svg { color: inherit !important; }
    html:root .view-toggle :is(a, button):not(.is-selected):hover { background: var(--L-btn-hover) !important; color: var(--L-strong) !important; }
    html:root .view-toggle > .is-selected { background: var(--L-active) !important; color: var(--L-strong) !important; }
    html:root .view-toggle .bg-coollabs { background: var(--L-active) !important; color: var(--L-strong) !important; }

    /* ── Toasts, popovers, settings rail ── */
    html:root :is(.toast-card, .surface-popover) { border-radius: 4px !important; background: var(--L-surface) !important; border: 1px solid light-dark(#e5e5e5, ${V4.g200}) !important; }
    html:root .toast-icon { box-shadow: none !important; transform: none !important; }
  }`;

  // ── The v4.0 sidebar and page heading: the script's own elements (Coolify's DOM is never changed) ──
  // Copied from v4.0.1 components/navbar.blade.php (classes as plain CSS below).
  const SIDE_CSS = `
    #lg-side { position: fixed; inset: 0 auto 0 0; z-index: 50; width: 14rem; display: flex; flex-direction: column; box-sizing: border-box;
      padding: 0 8px; overflow-y: auto; overflow-x: hidden; background: light-dark(#fff, ${V4.base}); border-right: 1px solid light-dark(#d4d4d4, ${V4.g200});
      font: 14px/20px var(--font-sans, 'Geist Sans', Inter, sans-serif); color: light-dark(#000, #a3a3a3); -webkit-font-smoothing: antialiased;
      scrollbar-width: thin; scrollbar-color: ${V4.purple100} light-dark(#e5e5e5, ${V4.g200}); }
    #lg-side * { box-sizing: border-box; }
    #lg-side a { color: inherit; text-decoration: none; }
    #lg-side .lg-top { display: flex; align-items: flex-start; padding: 24px 0 16px 8px; }
    #lg-side .lg-brand { display: flex; flex-direction: column; flex: 1; min-width: 0; }
    #lg-side .lg-word { font-size: 24px; line-height: 32px; font-weight: 700; letter-spacing: -0.025em; color: light-dark(#000, #fff); }
    #lg-side .lg-word:hover { opacity: .8; }
    #lg-side .lg-ver { font-size: 12px; line-height: 16px; opacity: .9; }
    #lg-side .lg-ver:hover { opacity: 1; color: light-dark(#000, #fff); }
    #lg-side .lg-search { display: flex; align-items: center; gap: 6px; padding: 6px 10px; border: 1px solid light-dark(#d4d4d4, ${V4.g200}); border-radius: 6px;
      background: light-dark(#f5f5f5, ${V4.g100}); color: inherit; cursor: pointer; font: inherit; }
    #lg-side .lg-search:hover { background: light-dark(#e5e5e5, ${V4.g200}); }
    #lg-side .lg-search svg { width: 16px; height: 16px; color: light-dark(#737373, #a3a3a3); }
    #lg-side .lg-search kbd { padding: 2px 4px; font: 600 12px/16px var(--font-sans, sans-serif); color: light-dark(#737373, #a3a3a3); background: light-dark(#e5e5e5, ${V4.g200}); border-radius: 4px; }
    #lg-side .lg-prefs { position: relative; }
    #lg-side .lg-prefs > button { padding: 8px; border: 0; background: none; color: light-dark(#000, #a3a3a3); cursor: pointer; display: flex; }
    #lg-side .lg-prefs > button:hover { color: light-dark(#000, #fff); }
    #lg-side .lg-prefs > button svg { width: 20px; height: 20px; }
    #lg-side .lg-menu { position: fixed; z-index: 60; width: 12rem; padding: 4px; border-radius: 4px; box-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);
      background: light-dark(#fff, ${V4.g200}); border: 1px solid light-dark(#d4d4d4, ${V4.g300}); }
    #lg-side .lg-menu[hidden] { display: none; }
    #lg-side .lg-menu-title { padding: 4px 8px; font-size: 12px; font-weight: 700; color: light-dark(#737373, #a3a3a3); }
    #lg-side .lg-menu button, #lg-side .lg-menu a { display: flex; align-items: center; gap: 8px; width: 100%; padding: 4px 16px 4px 8px; border: 0; background: none;
      font: 12px/16px var(--font-sans, sans-serif); color: light-dark(#000, #fff); text-align: left; cursor: pointer; }
    #lg-side .lg-menu button:hover, #lg-side .lg-menu a:hover { background: light-dark(#f5f5f5, ${V4.purple}); }
    #lg-side .lg-menu button[aria-checked="true"]::after { content: '✓'; margin-left: auto; }
    #lg-side .lg-menu hr { margin: 4px 0; border: 0; border-top: 1px solid light-dark(#e5e5e5, ${V4.g300}); }
    #lg-side .lg-team { padding: 8px 8px 28px; }
    #lg-side .lg-team[hidden] { display: none; }
    #lg-side .lg-team select { width: 100%; padding: 6px 32px 6px 12px; border: 0; border-radius: 4px; font: 14px/20px var(--font-sans, sans-serif); cursor: pointer;
      color: light-dark(#000, #fff); background: light-dark(#fff, ${V4.g100}) var(--lg-select) right 8px center / 16px no-repeat; appearance: none;
      box-shadow: inset 4px 0 0 transparent, inset 0 0 0 2px light-dark(#e5e5e5, ${V4.g300}); outline: none; }
    #lg-side .lg-team select:focus { box-shadow: inset 4px 0 0 light-dark(${V4.purple}, ${V4.yellow}), inset 0 0 0 2px light-dark(#e5e5e5, ${V4.g300}); }
    #lg-side ul { list-style: none; margin: 0; padding: 0; }
    #lg-side .lg-list { display: flex; flex-direction: column; flex: 1; }
    #lg-side .lg-list > li { display: flex; flex-direction: column; gap: 2px; flex: 1; }
    #lg-side .lg-fill { flex: 1; }
    #lg-side .lg-item { display: flex; align-items: center; gap: 10px; width: 100%; min-width: 0; height: 30px; padding: 0 8px; border: 0; border-radius: 4px; background: none;
      font: 14px/20px var(--font-sans, sans-serif); color: inherit; text-align: left; cursor: pointer; white-space: nowrap; }
    #lg-side .lg-item:hover { background: light-dark(#d4d4d4, ${V4.g100}); color: light-dark(#000, #fff); }
    #lg-side .lg-item.lg-active { background: light-dark(#e5e5e5, ${V4.g200}); color: light-dark(#000, ${V4.yellow}); }
    #lg-side .lg-item > svg { flex: none; width: 18px; height: 18px; stroke-width: 1.5; }
    #lg-side .lg-item > svg * { stroke-width: inherit; }
    #lg-side .lg-extra { display: contents; }
    #lg-side .lg-item > span { min-width: 0; flex: 1; overflow: hidden; text-overflow: ellipsis; }
    #lg-side .lg-item > svg.lg-pink { color: #ec4899; }
    #lg-side .lg-logout { margin-bottom: 24px; }
    #lg-side [hidden] { display: none; }


    #lg-logmenu { position: fixed; z-index: 1000; width: max-content; padding: 4px 0; border-radius: 6px; font: 14px/20px var(--font-sans, sans-serif);
      background: light-dark(#fff, ${V4.g200}); box-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 0 0 1px light-dark(#e5e5e5, ${V4.g300}); color: light-dark(#374151, #e5e7eb); }
    #lg-logmenu[hidden] { display: none; }
    #lg-logmenu label, #lg-logmenu button { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 16px; border: 0; background: none; font: inherit; color: inherit; text-align: left; cursor: pointer; user-select: none; }
    #lg-logmenu button { padding: 8px 16px; }
    #lg-logmenu :is(label, button):hover { background: light-dark(#f3f4f6, ${V4.g300}); }
    #lg-logmenu input { appearance: none; width: 16px; height: 16px; margin: 0; border-radius: 4px; border: 1px solid light-dark(#d1d5db, #4b5563); background: light-dark(#fff, ${V4.g300}) center / 12px no-repeat; cursor: pointer; }
    #lg-logmenu input:checked { border-color: transparent; background-color: ${V4.yellow};
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='black' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3E%3C/svg%3E"); }
    #lg-logmenu .lg-lvl { width: 10px; height: 10px; border-radius: 9999px; }

    #lg-head { margin: 0 0 24px; }
    #lg-head > h1 { margin: 0; }
    #lg-head .lg-crumbs { height: 36px; margin: 8px 0 16px; }
    #lg-head .lg-navbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 40px; padding-bottom: 8px;
      border-bottom: 2px solid light-dark(#e5e5e5, ${V4.g200}); color: light-dark(#404040, #a3a3a3); }
    #lg-head .lg-tabs { display: flex; align-items: center; gap: 24px; min-height: 40px; white-space: nowrap; overflow-x: auto; }
    #lg-head .lg-tabs a { color: inherit; text-decoration: none; }
    #lg-head .lg-tabs a:hover { color: light-dark(#000, #fff); }
    #lg-head .lg-tabs a.lg-active { color: light-dark(#000, #fff); }
    #lg-head .lg-actions { min-height: 40px; }
    #lg-head > h1 + .lg-navbar { margin-top: 16px; }

    #lg-list h1 { margin: 0; }
    #lg-list .lg-title-row { display: flex; align-items: center; gap: 8px; }
    #lg-list .lg-canvas svg { width: 16px; height: 16px; }
    #lg-list .lg-subtitle { padding: 8px 0 36px; }
    #lg-list .lg-section { margin: 0 0 48px; }
    #lg-list .lg-section.lg-first { margin-top: -8px; }
    #lg-list .lg-section-head { display: flex; align-items: center; gap: 8px; padding-bottom: 8px; }
    #lg-list .lg-section-head h3 { margin: 0; font-size: 18px; line-height: 28px; }
    #lg-list .lg-plus { display: flex; align-items: center; justify-content: center; width: 16px; height: 16px; padding: 0; border: 0; border-radius: 4px;
      background: none; color: light-dark(#000, #fff); cursor: pointer; }
    #lg-list .lg-plus:hover { background: light-dark(${V4.g400}, ${V4.g300}); }
    #lg-list .lg-plus svg { width: 12px; height: 12px; }
    #lg-list .lg-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 16px; }
    @media (min-width: 1280px) { #lg-list .lg-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    #lg-list .lg-box { position: relative; display: flex; gap: 8px; min-height: 64px; padding: 8px; box-sizing: border-box; border-radius: 4px; cursor: pointer;
      border: 1px solid light-dark(#e5e5e5, ${V4.g400}); background: light-dark(#fff, ${V4.g100}); color: inherit; text-decoration: none; transition: box-shadow .15s; }
    #lg-list .lg-box:hover { box-shadow: 0 0 0 2px light-dark(${V4.purple}, ${V4.yellow}); }
    #lg-list .lg-box.lg-bad { border-color: #ef4444; }
    #lg-list .lg-cover { position: absolute; inset: 0; }
    #lg-list .lg-box-body { display: flex; flex: 1; min-width: 0; margin: 0 24px; }
    #lg-list .lg-box-text { display: flex; flex-direction: column; justify-content: center; flex: 1; min-width: 0; }
    #lg-list .lg-box-title { font-weight: 700; color: light-dark(#000, #fff); }
    #lg-list .lg-box-desc { font-size: 12px; line-height: 16px; font-weight: 700; color: #737373; }
    #lg-list .lg-box:hover .lg-box-desc { color: light-dark(#000, #fff); }
    #lg-list .lg-box-error { font-size: 12px; line-height: 16px; color: ${V4.error}; }
    #lg-list .lg-box-error.lg-warning { color: light-dark(#a16207, ${V4.yellow}); }
    #lg-list .lg-box-links { position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; gap: 16px; font-size: 12px; font-weight: 700; }
    #lg-list .lg-box-links a { color: inherit; text-decoration: none; }
    #lg-list .lg-box-links a:hover { text-decoration: underline; }
    #lg-list .lg-empty { display: flex; flex-direction: column; gap: 4px; }
    #lg-list .lg-empty > div:last-child { display: flex; align-items: center; gap: 4px; }
    #lg-list .lg-empty-title { font-weight: 700; color: light-dark(#000, ${V4.yellow}); }
    #lg-list .lg-empty-note { color: #737373; }
    #lg-envs { display: flex; flex-direction: column; gap: 16px; margin-top: 8px; }
    #lg-envs .lg-env-group h3 { margin: 0; font-size: 18px; line-height: 28px; }
    #lg-envs .lg-env { display: flex; flex-direction: column; gap: 16px; padding: 16px; box-sizing: border-box;
      background: light-dark(#fff, ${V4.base}); border: 1px solid light-dark(#e5e5e5, ${V4.g300}); }
    #lg-envs .lg-env.lg-required { border-color: ${V4.error}; }
    #lg-envs .lg-env-row { display: flex; flex-direction: column; gap: 8px; }
    @media (min-width: 1024px) { #lg-envs .lg-env-row { flex-direction: row; } }
    #lg-envs .lg-env-row > * { flex: 1; min-width: 0; }
    #lg-envs label.lg-field { display: flex; flex-direction: column; gap: 4px; font-size: 14px; font-weight: 500; }
    #lg-envs .input { width: 100%; box-sizing: border-box; padding: 6px 12px; font: 14px/20px var(--font-sans, sans-serif); }
    #lg-envs textarea.input { min-height: 80px; resize: vertical; }
    #lg-envs .lg-pass { position: relative; }
    #lg-envs .lg-pass .input { padding-right: 40px; }
    #lg-envs .lg-eye { position: absolute; inset: 0 0 0 auto; width: 36px; border: 0; background: none; color: #737373; cursor: pointer; display: flex; align-items: center; justify-content: center; }
    #lg-envs .lg-eye:hover { color: light-dark(#000, #fff); }
    #lg-envs .lg-eye svg { width: 18px; height: 18px; }
    #lg-envs .lg-checks { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; }
    #lg-envs .lg-check { display: flex; align-items: center; gap: 16px; padding: 4px 8px 4px 0; font-size: 14px; cursor: pointer; }
    #lg-envs .lg-check:hover { background: light-dark(transparent, ${V4.g100}); }
    #lg-envs .lg-check input { appearance: none; width: 16px; height: 16px; margin: 0; flex: none; cursor: pointer; border-radius: 4px;
      border: 1px solid light-dark(#6b7280, #404040); background: light-dark(#fff, ${V4.g100}) center / 12px no-repeat; }
    #lg-envs .lg-check input:checked { border-color: transparent; background-color: ${V4.g400};
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3E%3C/svg%3E"); }
    #lg-envs .lg-check input:focus-visible { outline: 2px solid var(--L-accent); outline-offset: 2px; }
    #lg-envs .lg-env-actions { display: flex; justify-content: flex-end; gap: 8px; }
    #lg-envs .lg-env-key-row { display: flex; align-items: center; gap: 8px; }
    #lg-envs .lg-env-key-row svg { width: 24px; height: 24px; flex: none; }
    #lg-envs .lg-note { font-size: 12px; color: #737373; }
    #lg-envs .lg-err { margin-top: 4px; font-size: 12px; line-height: 16px; font-weight: 400; color: #ef4444; }

    #lg-head .lg-subtitle { padding: 8px 0 36px; }
    #lg-head .lg-subtitle + .lg-navbar { margin-top: 0; }
    #lg-list .lg-crumbs-list { height: 36px; margin: 8px 0 24px; }
    #lg-list .lg-search { width: 100%; box-sizing: border-box; padding: 6px 12px; font: 14px/20px var(--font-sans, sans-serif); }
    #lg-list .lg-group { margin: 0; padding-top: 16px; font-size: 20px; line-height: 28px; }
    #lg-list .lg-grid.lg-grid-3 { padding-top: 16px; }
    @media (min-width: 1024px) { #lg-list .lg-grid.lg-grid-3, #lg-list .lg-grid.lg-grid-env { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (min-width: 1280px) { #lg-list .lg-grid.lg-grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
    #lg-list .lg-grid.lg-grid-env { gap: 8px; }
    #lg-list .lg-res-box { height: 96px; padding: 8px 0; }
    #lg-list .lg-res-body { display: flex; flex-direction: column; width: 100%; min-width: 0; }
    #lg-list .lg-res-body > * { padding: 0 16px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    #lg-list .lg-res-title { padding-bottom: 8px; padding-right: 28px; }
    #lg-list .lg-res-server { padding-top: 4px; }
    #lg-list .lg-res-error { font-size: 12px; line-height: 16px; font-weight: 700; color: ${V4.error}; }
    #lg-list .lg-dot { position: absolute; top: 4px; right: 4px; width: 10px; height: 10px; border-radius: 9999px; border: 1px solid light-dark(#e5e5e5, #000); }
    #lg-list .lg-dot.lg-success { background: ${V4.success}; } #lg-list .lg-dot.lg-error { background: ${V4.error}; } #lg-list .lg-dot.lg-warning { background: ${V4.yellow}; }
    #lg-list .lg-tags { display: flex; flex-wrap: wrap; gap: 4px; min-height: 24px; padding-top: 4px; }
    #lg-list .lg-tag { padding: 4px 8px; font-size: 12px; line-height: 16px; font-weight: 700; color: #737373; text-decoration: none; background: light-dark(#f5f5f5, ${V4.g100}); }
    #lg-list .lg-tag:hover { background: light-dark(#e5e5e5, ${V4.g300}); color: light-dark(#000, #fff); }
    #lg-list .lg-add-tag { display: flex; align-items: center; padding: 0 8px; font-size: 12px; color: light-dark(#737373, rgb(115 115 115 / 0.2)); text-decoration: none; }
    #lg-list .lg-res:hover .lg-add-tag { color: light-dark(#404040, #fff); }
    #lg-list .lg-add-tag:hover { background: light-dark(#e5e5e5, ${V4.g300}); }
    #lg-list .lg-add-first { align-items: center; justify-content: center; font-weight: 700; color: light-dark(#000, #fff); }

    /* Section sub-pages (Settings > Configuration: General / Advanced / Updates; OAuth providers): the v4.0 settings
       sidebar, a text column on the left of the page (as the resource sub-menu). */
    html:root main.app-main > div:has(> #lg-subside) { display: grid !important; grid-template-columns: minmax(12rem, max-content) minmax(0, 1fr) !important; column-gap: 2rem !important; align-items: start !important; }
    html:root main.app-main > div:has(> #lg-subside) > * { grid-column: 2 !important; min-width: 0; }
    html:root main.app-main > div:has(> #lg-subside) > #lg-head { grid-column: 1 / -1 !important; }
    html:root main.app-main > div:has(> #lg-subside) > #lg-subside { grid-column: 1 !important; grid-row: 2 / span 20 !important; }
    #lg-subside { display: flex; flex-direction: column; gap: 8px; }
    #lg-subside :is(a, button) { display: block; padding: 4px 8px; border: 0; border-radius: 4px; background: none; text-align: left; text-decoration: none; cursor: pointer;
      font: 14px/20px var(--font-sans, sans-serif); color: var(--L-text); }
    #lg-subside :is(a, button):hover { background: light-dark(#d4d4d4, ${V4.g100}); color: var(--L-strong); }
    #lg-subside :is(a, button).lg-active { background: var(--L-active); color: var(--L-active-text); }
    #lg-head.lg-detail .lg-crumbs { margin-bottom: 0; }
  `;

  const svg = (body, box = '0 0 24 24', attrs = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"') =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${box}" ${attrs} aria-hidden="true">${body}</svg>`;
  const thin = body => svg(body, '0 0 24 24', 'fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"');
  const ICON = {
    dashboard: svg('<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>'),
    projects: thin('<path d="M12 4l-8 4l8 4l8 -4l-8 -4"/><path d="M4 12l8 4l8 -4"/><path d="M4 16l8 4l8 -4"/>'),
    servers: thin('<path d="M3 4m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z"/><path d="M15 20h-9a3 3 0 0 1 -3 -3v-2a3 3 0 0 1 3 -3h12"/><path d="M7 8v.01"/><path d="M7 16v.01"/><path d="M20 15l-2 3h3l-2 3"/>'),
    sources: svg('<path fill="currentColor" d="m6.793 1.207l.353.354l-.353-.354ZM1.207 6.793l-.353-.354l.353.354Zm0 1.414l.354-.353l-.354.353Zm5.586 5.586l-.354.353l.354-.353Zm1.414 0l-.353-.354l.353.354Zm5.586-5.586l.353.354l-.353-.354Zm0-1.414l-.354.353l.354-.353ZM8.207 1.207l.354-.353l-.354.353ZM6.44.854L.854 6.439l.707.707l5.585-5.585L6.44.854ZM.854 8.56l5.585 5.585l.707-.707l-5.585-5.585l-.707.707Zm7.707 5.585l5.585-5.585l-.707-.707l-5.585 5.585l.707.707Zm5.585-7.707L8.561.854l-.707.707l5.585 5.585l.707-.707Zm0 2.122a1.5 1.5 0 0 0 0-2.122l-.707.707a.5.5 0 0 1 0 .708l.707.707ZM6.44 14.146a1.5 1.5 0 0 0 2.122 0l-.707-.707a.5.5 0 0 1-.708 0l-.707.707ZM.854 6.44a1.5 1.5 0 0 0 0 2.122l.707-.707a.5.5 0 0 1 0-.708L.854 6.44Zm6.292-4.878a.5.5 0 0 1 .708 0L8.56.854a1.5 1.5 0 0 0-2.122 0l.707.707Zm-2 1.293l1 1l.708-.708l-1-1l-.708.708ZM7.5 5a.5.5 0 0 1-.5-.5H6A1.5 1.5 0 0 0 7.5 6V5Zm.5-.5a.5.5 0 0 1-.5.5v1A1.5 1.5 0 0 0 9 4.5H8ZM7.5 4a.5.5 0 0 1 .5.5h1A1.5 1.5 0 0 0 7.5 3v1Zm0-1A1.5 1.5 0 0 0 6 4.5h1a.5.5 0 0 1 .5-.5V3Zm.646 2.854l1.5 1.5l.707-.708l-1.5-1.5l-.707.708ZM10.5 8a.5.5 0 0 1-.5-.5H9A1.5 1.5 0 0 0 10.5 9V8Zm.5-.5a.5.5 0 0 1-.5.5v1A1.5 1.5 0 0 0 12 7.5h-1Zm-.5-.5a.5.5 0 0 1 .5.5h1A1.5 1.5 0 0 0 10.5 6v1Zm0-1A1.5 1.5 0 0 0 9 7.5h1a.5.5 0 0 1 .5-.5V6ZM7 5.5v4h1v-4H7Zm.5 5.5a.5.5 0 0 1-.5-.5H6A1.5 1.5 0 0 0 7.5 12v-1Zm.5-.5a.5.5 0 0 1-.5.5v1A1.5 1.5 0 0 0 9 10.5H8Zm-.5-.5a.5.5 0 0 1 .5.5h1A1.5 1.5 0 0 0 7.5 9v1Zm0-1A1.5 1.5 0 0 0 6 10.5h1a.5.5 0 0 1 .5-.5V9Z"/>', '0 0 15 15', ''),
    destinations: svg('<path d="M9 4L3 8v12l6-3l6 3l6-4V4l-6 3l-6-3zm-2 8.001V12m4 .001V12m3-2l2 2m2 2l-2-2m0 0l2-2m-2 2l-2 2"/>'),
    storages: svg('<path d="M4 6a8 3 0 1 0 16 0A8 3 0 1 0 4 6"/><path d="M4 6v6a8 3 0 0 0 16 0V6"/><path d="M4 12v6a8 3 0 0 0 16 0v-6"/>'),
    variables: svg('<path d="M5 4C2.5 9 2.5 14 5 20M19 4c2.5 5 2.5 10 0 16M9 9h1c1 0 1 1 2.016 3.527C13 15 13 16 14 16h1"/><path d="M8 16c1.5 0 3-2 4-3.5S14.5 9 16 9"/>'),
    notifications: svg('<path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3H4a4 4 0 0 0 2-3v-3a7 7 0 0 1 4-6M9 17v1a3 3 0 0 0 6 0v-1"/>'),
    keys: svg('<path d="m16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1-4.069 0l-.301-.301l-6.558 6.558a2 2 0 0 1-1.239.578L5.172 21H4a1 1 0 0 1-.993-.883L3 20v-1.172a2 2 0 0 1 .467-1.284l.119-.13L4 17h2v-2h2v-2l2.144-2.144l-.301-.301a2.877 2.877 0 0 1 0-4.069l2.643-2.643a2.877 2.877 0 0 1 4.069 0zM15 9h.01"/>'),
    tags: svg('<path d="M3 8v4.172a2 2 0 0 0 .586 1.414l5.71 5.71a2.41 2.41 0 0 0 3.408 0l3.592-3.592a2.41 2.41 0 0 0 0-3.408l-5.71-5.71A2 2 0 0 0 9.172 6H5a2 2 0 0 0-2 2"/><path d="m18 19l1.592-1.592a4.82 4.82 0 0 0 0-6.816L15 6m-8 4h-.01"/>'),
    terminal: thin('<path d="M5 7l5 5l-5 5"/><path d="M12 19l7 0"/>'),
    profile: thin('<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/><path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"/>'),
    teams: thin('<path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1"/><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/><path d="M17 10h2a2 2 0 0 1 2 2v1"/><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/><path d="M3 13v-1a2 2 0 0 1 2 -2h2"/>'),
    subscription: svg('<path d="M3 8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm0 2h18M7 15h.01M11 15h2"/>'),
    settings: thin('<path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"/><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"/>'),
    monitoring: thin('<path d="M4 19l16 0"/><path d="M4 15l4 -6l4 2l4 -5l4 4"/>'),
    registries: thin('<path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5"/><path d="M12 12l8 -4.5"/><path d="M12 12l0 9"/><path d="M12 12l-8 -4.5"/>'),
    upgrade: thin('<path d="M9 12h-3.586a1 1 0 0 1 -.707 -1.707l6.586 -6.586a1 1 0 0 1 1.414 0l6.586 6.586a1 1 0 0 1 -.707 1.707h-3.586v3h-6v-3z"/><path d="M9 21h6"/><path d="M9 18h6"/>'),
    sponsor: svg('<path d="M19.5 12.572L12 20l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572"/><path d="M12 6L8.707 9.293a1 1 0 0 0 0 1.414l.543.543c.69.69 1.81.69 2.5 0l1-1a3.182 3.182 0 0 1 4.5 0l2.25 2.25m-7 3l2 2M15 13l2 2"/>'),
    feedback: svg('<path fill="currentColor" d="M140 180a12 12 0 1 1-12-12a12 12 0 0 1 12 12M128 72c-22.06 0-40 16.15-40 36v4a8 8 0 0 0 16 0v-4c0-11 10.77-20 24-20s24 9 24 20s-10.77 20-24 20a8 8 0 0 0-8 8v8a8 8 0 0 0 16 0v-.72c18.24-3.35 32-17.9 32-35.28c0-19.85-17.94-36-40-36m104 56A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88"/>', '0 0 256 256', ''),
    logout: svg('<path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2a9.985 9.985 0 0 1 8 4h-2.71a8 8 0 1 0 .001 12h2.71A9.985 9.985 0 0 1 12 22m7-6v-3h-8v-2h8V8l5 4z"/>', '0 0 24 24', ''),
    search: svg('<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>'),
    sliders: svg('<path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>'),
  };

  // v4.0 menu order, plus the pages v4.0 did not have (Monitoring, Registries). `when` = the item shows only if
  // Coolify's own menu has it (permissions, cloud).
  const ITEMS = [
    { label: 'Dashboard', href: '/', icon: 'dashboard', on: p => p === '/' || p.startsWith('/dashboard') },
    { label: 'Projects', href: '/projects', icon: 'projects', on: p => /^\/(project\/|projects\/?$)/.test(p) },
    { label: 'Monitoring', href: '/analytics', icon: 'monitoring', on: p => /^\/(analytics|metrics)$/.test(p), when: '[title="Monitoring"]' },
    { label: 'Servers', href: '/servers', icon: 'servers', on: p => /^\/(server\/|servers\/?$)/.test(p) },
    { label: 'Sources', href: '/sources', icon: 'sources', on: p => p.startsWith('/source') },
    { label: 'Destinations', href: '/destinations', icon: 'destinations', on: p => p.startsWith('/destination') },
    { label: 'Registries', href: '/registries', icon: 'registries', on: p => p.startsWith('/registries'), when: '[title="Registries"]' },
    { label: 'S3 Storages', href: '/storages', icon: 'storages', on: p => p.startsWith('/storages') },
    { label: 'Shared Variables', href: '/shared-variables', icon: 'variables', on: p => p.startsWith('/shared-variables') },
    { label: 'Notifications', href: '/notifications/email', icon: 'notifications', on: p => p.startsWith('/notifications') },
    { label: 'Keys & Tokens', href: '/security/private-key', icon: 'keys', on: p => p.startsWith('/security') },
    { label: 'Tags', href: '/tags', icon: 'tags', on: p => p.startsWith('/tags') },
    { label: 'Terminal', href: '/terminal', icon: 'terminal', on: p => p.startsWith('/terminal'), when: '[title="Terminal"]', plain: true },
    { label: 'Profile', href: '/profile', icon: 'profile', on: p => p.startsWith('/profile') },
    { label: 'Teams', href: '/team', icon: 'teams', on: p => p.startsWith('/team') },
    { label: 'Subscription', href: '/subscription', icon: 'subscription', on: p => p.startsWith('/subscription'), when: '[title="Subscription"]' },
    { label: 'Settings', href: '/settings', icon: 'settings', on: p => p.startsWith('/settings'), when: '[title="Settings"]' },
  ];

  const pink = icon => icon.replace('<svg ', '<svg class="lg-pink" ');
  function buildSide() {
    const nav = document.createElement('nav');
    nav.id = 'lg-side';
    nav.setAttribute('aria-label', 'Main');
    nav.innerHTML = `
      <div class="lg-top">
        <div class="lg-brand"><a class="lg-word" href="/" data-lg-nav>Coolify</a><a class="lg-ver" target="_blank" rel="noopener"></a></div>
        <button type="button" class="lg-search" title="Search (Press / or ⌘K)">${ICON.search}<kbd>/</kbd></button>
        <div class="lg-prefs"><button type="button" title="Preferences">${ICON.sliders}</button>
          <div class="lg-menu" role="menu" hidden>
            <div class="lg-menu-title">Appearance</div>
            <button type="button" role="menuitemradio" data-lg-theme="dark">Dark</button>
            <button type="button" role="menuitemradio" data-lg-theme="light">Light</button>
            <button type="button" role="menuitemradio" data-lg-theme="system">System</button>
            <hr><div class="lg-menu-title">Width</div>
            <button type="button" role="menuitemradio" data-lg-width="centered">Center</button>
            <button type="button" role="menuitemradio" data-lg-width="full">Full</button>
            <hr><a href="/profile/appearance" data-lg-nav>More appearance settings</a>
          </div>
        </div>
      </div>
      <div class="lg-team" hidden><select aria-label="Switch team"></select></div>
      <ul class="lg-list" role="list"><li>
        ${ITEMS.map((item, i) => `<a class="lg-item" data-i="${i}" title="${item.label}" href="${item.href}" ${item.plain ? '' : 'data-lg-nav'}>${ICON[item.icon]}<span>${item.label.replace('&', '&amp;')}</span></a>`).join('')}
        <div class="lg-extra"></div>
        <div class="lg-fill"></div>
        <button type="button" class="lg-item lg-upgrade" hidden>${pink(ICON.upgrade)}<span>Upgrade</span></button>
        <a class="lg-item" title="Sponsor us" href="https://coolify.io/sponsorships" target="_blank" rel="noopener">${pink(ICON.sponsor)}<span>Sponsor us</span></a>
        <button type="button" class="lg-item lg-feedback" title="Send us feedback or get help!">${ICON.feedback}<span>Feedback</span></button>
        <button type="button" class="lg-item lg-logout" title="Logout">${ICON.logout}<span>Logout</span></button>
      </li></ul>`;

    nav.addEventListener('click', event => {
      const link = event.target.closest('a[data-lg-nav]');
      if (link && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && window.Livewire?.navigate) {
        event.preventDefault();
        closeMenu();
        window.Livewire.navigate(link.href);
        return;
      }
      if (event.target.closest('.lg-search')) window.dispatchEvent(new CustomEvent('open-global-search'));
      if (event.target.closest('.lg-prefs > button')) toggleMenu();
      const theme = event.target.closest('[data-lg-theme]')?.dataset.lgTheme;
      if (theme) { localStorage.setItem('theme', theme); window.applyStoredTheme?.(); closeMenu(); }
      const width = event.target.closest('[data-lg-width]')?.dataset.lgWidth;
      if (width) { localStorage.setItem('pageWidth', width); window.dispatchEvent(new CustomEvent('page-width-changed', { detail: width })); closeMenu(); }
      if (event.target.closest('.lg-upgrade')) coolifyUpgradeButton()?.click();
      if (event.target.closest('.lg-feedback')) feedbackTrigger()?.click();
      if (event.target.closest('.lg-logout')) logout();
    });
    nav.querySelector('select').addEventListener('change', event => {
      teamButtons().find(b => teamId(b) === event.target.value)?.click();
    });
    document.addEventListener('click', event => { if (!event.target.closest?.('.lg-prefs')) closeMenu(); }, true);
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
    return nav;
  }

  const menu = () => document.querySelector('#lg-side .lg-menu');
  function toggleMenu() {
    const panel = menu();
    if (!panel.hidden) return closeMenu();
    const rect = document.querySelector('#lg-side .lg-prefs > button').getBoundingClientRect();
    panel.style.top = `${rect.bottom + 4}px`;
    panel.style.left = `${Math.max(8, rect.right - 192)}px`;
    const theme = localStorage.getItem('theme') || 'dark';
    const width = localStorage.getItem('pageWidth') || 'centered';
    panel.querySelectorAll('[data-lg-theme]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.lgTheme === theme)));
    panel.querySelectorAll('[data-lg-width]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.lgWidth === width)));
    panel.hidden = false;
  }
  function closeMenu() { const panel = menu(); if (panel) panel.hidden = true; }

  // Coolify's own controls stay in the page (hidden): the sidebar uses them, so all logic stays Coolify's.
  const teamButtons = () => [...document.querySelectorAll('header.app-topbar button[wire\\:click^="switch_to("]')];
  const teamId = button => button.getAttribute('wire:click').match(/\d+/)?.[0] || '';
  const teamName = button => (button.querySelector('span.truncate') || button).textContent.trim();
  const coolifyUpgradeButton = () => [...document.querySelectorAll('[title="New version available"] button')].find(b => b.style.display !== 'none');
  const feedbackTrigger = () => [...document.querySelectorAll('.sidebar-footer .top-user-menu-panel .listbox-option, .top-user-menu-panel .listbox-option')]
    .find(el => el.textContent.trim() === 'Feedback');
  function logout() {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/logout';
    form.innerHTML = `<input type="hidden" name="_token">`;
    form.firstChild.value = document.querySelector('meta[name="csrf-token"]')?.content || '';
    document.body.append(form);
    form.submit();
  }

  function updateSide(nav) {
    const path = location.pathname.replace(/\/+$/, '') || '/';
    const hasMenu = !!document.querySelector('.sidebar-nav'); // error pages have no Coolify menu: keep the last state
    nav.querySelectorAll('.lg-item[data-i]').forEach(el => {
      const item = ITEMS[el.dataset.i];
      el.classList.toggle('lg-active', item.on(path));
      if (item.when && hasMenu) el.hidden = !document.querySelector(`.sidebar-nav ${item.when}`);
    });
    // Pages the list above does not know (a Coolify update added them): Coolify's own links, after the list.
    if (hasMenu) {
      const extra = [...document.querySelectorAll('.sidebar-nav a.menu-item[href]')].map(a => ({ a, url: new URL(a.href, location.href) }))
        .map(({ a, url }) => ({ a, url, path: url.pathname.replace(/\/+$/, '') || '/' }))
        .filter(({ url, path }) => url.origin === location.origin && !ITEMS.some(item => item.on(path) || item.href === path));
      const box = nav.querySelector('.lg-extra');
      const sign = extra.map(e => e.url.href).join('|');
      if (box.dataset.sign !== sign) {
        box.dataset.sign = sign;
        box.innerHTML = extra.map(({ a, url, path }) => {
          const label = a.getAttribute('title') || text(a);
          const spa = [...a.attributes].some(attr => attr.name.startsWith('wire:navigate'));
          return `<a class="lg-item" title="${esc(label)}" href="${esc(url.href)}" data-path="${esc(path)}" ${spa ? 'data-lg-nav' : ''}>${a.querySelector('svg')?.outerHTML || ''}<span>${esc(label)}</span></a>`;
        }).join('');
      }
      box.querySelectorAll('.lg-item').forEach(el => el.classList.toggle('lg-active', el.dataset.path === path));
    }
    const version = [...document.querySelectorAll('.app-topbar-brand a, .app-topbar-brand span, [data-mobile-sidebar-brand] a, [data-mobile-sidebar-brand] span')]
      .find(el => /^v\d/.test(el.textContent.trim()));
    const ver = nav.querySelector('.lg-ver');
    if (version && ver.textContent !== version.textContent.trim()) {
      ver.textContent = version.textContent.trim();
      ver.href = version.getAttribute('href') || `https://github.com/coollabsio/coolify/releases/tag/${ver.textContent}`;
    }
    const teams = teamButtons();
    const current = teams.find(b => b.classList.contains('font-medium'));
    const sign = teams.map(b => teamId(b) + teamName(b) + (b === current ? '*' : '')).join('|');
    const box = nav.querySelector('.lg-team');
    if (box.dataset.sign !== sign) {
      box.dataset.sign = sign;
      box.hidden = !teams.length;
      const select = box.querySelector('select');
      select.innerHTML = `<option value="" disabled>Switch team</option>` + teams.map(b => {
        const option = document.createElement('option');
        option.value = teamId(b);
        option.textContent = teamName(b);
        if (b === current) option.setAttribute('selected', '');
        return option.outerHTML;
      }).join('');
    }
    nav.querySelector('.lg-upgrade').hidden = !document.querySelector('[title="New version available"]');
  }

  // The v4.0 page heading, prepended to the page. Three kinds:
  // - resource / server: h1 (tab name), breadcrumbs, tab row (Configuration / Deployments / Logs / Terminal) + actions;
  // - section (Team, Notifications, Keys & Tokens, Shared Variables, Settings, Monitoring): h1 + its pages as tabs
  //   (v4.5 keeps these in sidebar submenus; v4.0 had them as tabs in the page);
  // - detail page with its own menu (one S3 storage, source or destination): h1 + breadcrumbs.
  const TABS = [['/deployment', 'Deployments'], ['/backups', 'Backups'], ['/logs', 'Logs'], ['/terminal', 'Terminal']];
  const text = el => (el.querySelector('.menu-item-label') || el).textContent.trim();
  function resourceTabs() {
    const strip = document.querySelectorAll('main .resource-heading-tabs a.app-tab'); // server pages
    if (strip.length) {
      const tabs = [...strip].map(a => ({ label: a.textContent.trim(), href: a.href, active: a.classList.contains('app-tab-active') }));
      if (!tabs.some(t => t.active)) tabs[0].active = true; // pages no tab claims (Images, GitHub Runners, …) are Configuration pages
      return tabs;
    }
    if (!document.querySelector('header.app-topbar button[title="Switch environment"]')) return null;
    const links = [...document.querySelectorAll('main aside.in-main-nav a.menu-item[href]')];
    if (!links.length) return null;
    const tabs = [{ label: 'Configuration', href: links[0].href }];
    for (const [end, label] of TABS) {
      const link = links.find(a => new URL(a.href).pathname.endsWith(end));
      if (link) tabs.push({ label, href: link.href, plain: end === '/terminal' });
    }
    const path = location.pathname.replace(/\/+$/, '');
    const hit = tabs.slice(1).find(t => path === new URL(t.href).pathname || path.startsWith(new URL(t.href).pathname + '/'));
    (hit || tabs[0]).active = true;
    return tabs;
  }
  // v4.0 subtitles under the section titles.
  const SECTION_SUBTITLE = {
    Team: 'Team wide configurations.', Notifications: 'Get notified about your infrastructure.', 'Keys & Tokens': 'Security related settings.',
    'Shared Variables': 'Set Team / Project / Environment / Server wide variables.', Settings: 'Instance wide settings for Coolify.',
  };
  // v4.0 Settings: tabs Configuration | Backup | Transactional Email | OAuth; Configuration has General / Advanced / Updates.
  function settingsTabs(tabs) {
    const by = label => tabs.find(t => t.label === label);
    const config = ['General', 'Advanced', 'Updates'].map(by).filter(Boolean);
    const grouped = [
      config.length && { label: 'Configuration', href: config[0].href, active: config.some(t => t.active) },
      by('Backup'), by('Email') && { ...by('Email'), label: 'Transactional Email' }, by('Authentication') && { ...by('Authentication'), label: 'OAuth' },
      ...tabs.filter(t => !['General', 'Advanced', 'Updates', 'Backup', 'Email', 'Authentication'].includes(t.label)), // added by a Coolify update
    ].filter(Boolean);
    return { tabs: grouped, pages: config.some(t => t.active) ? config.map(t => ({ label: t.label, href: t.href, active: t.active })) : null };
  }
  function pageModel() {
    const tabs = resourceTabs();
    if (tabs) return { kind: 'resource', title: tabs.find(t => t.active).label, crumbs: true, tabs };
    const menu = document.querySelector('li[data-active-submenu]');
    const section = menu?.dataset.activeSubmenu;
    if (section && section !== 'Integrations') { // Integrations pages are sidebar items (Sources, Destinations, …)
      const sub = [...document.querySelectorAll('#main-nav-active-children a.menu-item')]; // e.g. the OAuth providers
      let tabs = [...menu.querySelectorAll('a.menu-item[href]')].filter(a => !a.closest('#main-nav-active-children'))
        .map(a => ({ label: text(a), href: a.href, active: a.classList.contains('menu-item-active') }));
      let pages = null;
      if (section === 'Settings') ({ tabs, pages } = settingsTabs(tabs));
      return {
        kind: 'section', title: section, subtitle: SECTION_SUBTITLE[section] || '', tabs,
        sub: sub.length ? sub.map((a, i) => ({ label: text(a), active: a.classList.contains('menu-item-active'), proxy: i })) : pages,
      };
    }
    const context = document.querySelector('header.app-topbar [data-page-context]');
    if (document.querySelector('main aside.in-main-nav') && context?.querySelector('button[title="Switch resource"]')) {
      return { kind: 'detail', title: context.dataset.pageContext || text(context.querySelector('button[title="Switch resource"]')), crumbs: true };
    }
    return null;
  }

  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  function updateHead() {
    const model = pageModel();
    const host = document.querySelector('main.app-main:not(.app-main-full) > div');
    let head = document.getElementById('lg-head');
    if (!model || !host) { head?.remove(); return {}; }
    if (!head || head.parentElement !== host) {
      head?.remove();
      head = document.createElement('div');
      head.id = 'lg-head';
      head.addEventListener('click', headClick);
      host.prepend(head);
    }
    const sign = JSON.stringify(model);
    if (head.dataset.sign !== sign) {
      head.dataset.sign = sign;
      head.className = `lg-${model.kind}`;
      const tab = t => `<a href="${esc(t.href)}" class="${t.active ? 'lg-active' : ''}" ${t.plain ? '' : 'data-lg-nav'}>${esc(t.label)}</a>`;
      head.innerHTML = `<h1>${esc(model.title)}</h1>` + (model.subtitle ? `<div class="lg-subtitle">${esc(model.subtitle)}</div>` : '')
        + (model.crumbs ? '<div class="lg-crumbs"></div>' : '')
        + (model.tabs ? `<div class="lg-navbar"><nav class="lg-tabs" aria-label="${esc(model.title)}">${model.tabs.map(tab).join('')}</nav>${model.kind === 'resource' ? '<div class="lg-actions"></div>' : ''}</div>` : '');
    }
    let side = document.getElementById('lg-subside');
    if (!model.sub?.length) side?.remove();
    else {
      if (!side || side.previousElementSibling !== head) {
        side?.remove();
        side = document.createElement('nav');
        side.id = 'lg-subside';
        side.addEventListener('click', headClick);
        head.after(side);
      }
      const html = model.sub.map(s => s.href
        ? `<a href="${esc(s.href)}" data-lg-nav class="${s.active ? 'lg-active' : ''}">${esc(s.label)}</a>`
        : `<button type="button" data-lg-sub="${s.proxy}" class="${s.active ? 'lg-active' : ''}">${esc(s.label)}</button>`).join('');
      if (side.dataset.html !== html) { side.dataset.html = html; side.innerHTML = html; }
    }
    return { head, model };
  }
  function headClick(event) {
    const link = event.target.closest('a[data-lg-nav]');
    if (link && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && window.Livewire?.navigate) {
      event.preventDefault();
      window.Livewire.navigate(link.href);
    }
    const proxy = event.target.closest('[data-lg-sub]');
    if (proxy) { // the page's own sub-item (kept hidden in Coolify's sidebar) does the work
      document.querySelectorAll('#main-nav-active-children a.menu-item')[proxy.dataset.lgSub]?.click();
      queue();
    }
  }

  // ── v4.0 list pages: Dashboard (all projects + all servers), Projects, Servers ──
  // The script draws the v4.0 lists (copied from v4.0.1 livewire/dashboard, project/index, server/index); Coolify's own
  // list stays in the page, hidden, so its "New project" modal still does the work. Data: the JSON that Coolify puts in
  // the Projects page (projectsIndex() script) and the Servers page (x-data); the dashboard fetches those two pages.
  const LIST_PAGES = { '/': 'dashboard', '/projects': 'projects', '/servers': 'servers' }; // their canvases stay Coolify's canvas
  // + the environment page (v4.0 "Resources") and the project page (v4.0 "Environments")
  function listKind(path) {
    if (LIST_PAGES[path]) return LIST_PAGES[path];
    if (/^\/project\/[^/]+\/environment\/[^/]+$/.test(path)) return 'environment';
    if (/^\/project\/[^/]+$/.test(path)) return 'project';
    return null;
  }
  // Laravel's @js(): JSON.parse('<the JSON text as a JS string body>'), or [] / {} as they are.
  function jsData(source, key) {
    const m = source.match(new RegExp(`\\b${key}:\\s*(?:JSON\\.parse\\('((?:[^'\\\\]|\\\\.)*)'\\)|(\\[\\]))`));
    if (!m) return null;
    try { return m[2] ? [] : JSON.parse(JSON.parse(`"${m[1]}"`)); } catch { return null; }
  }
  const JS_PARSE = /\.\.\.JSON\.parse\('((?:[^'\\]|\\.)*)'\)/g;
  function pageData(doc, key) {
    if (key === 'resources') { // resourceIndex(): resources: [...@js($applicationsJs), ...@js($postgresqlsJs), …]
      const script = [...doc.querySelectorAll('script')].find(el => el.textContent.includes('function resourceIndex'));
      if (!script) return null;
      try { return [...script.textContent.matchAll(JS_PARSE)].flatMap(m => JSON.parse(JSON.parse(`"${m[1]}"`))); } catch { return null; }
    }
    const sources = key === 'servers' ? [...doc.querySelectorAll('[x-data*="servers:"]')].map(el => el.getAttribute('x-data'))
      : [...doc.querySelectorAll('script')].map(el => el.textContent);
    for (const source of sources) { const data = jsData(source, key); if (data) return data; }
    return null;
  }
  const csrf = () => document.querySelector('meta[name="csrf-token"]')?.content || '';
  async function fetchData(key) {
    try {
      const res = await fetch(`/${key}`, { credentials: 'same-origin' });
      if (res.ok && new URL(res.url).pathname === `/${key}`) {
        const data = pageData(new DOMParser().parseFromString(await res.text(), 'text/html'), key);
        if (data) return data;
      }
    } catch { /* the canvas API below */ }
    try { // the page opened its canvas instead (Coolify remembers the view): names and state from the canvas API
      const res = await fetch(`/canvas/api/${key}/canvas`, { credentials: 'same-origin', headers: { Accept: 'application/json', 'X-CSRF-TOKEN': csrf() } });
      const zones = (await res.json()).zones || [];
      return zones.filter(z => z.link).map(z => ({
        name: z.name, href: z.link, description: '',
        ...(key === 'servers' ? { statusType: z.is_reachable && z.is_usable ? 'success' : 'error', status: !z.is_reachable ? 'Not reachable' : 'Not usable by Coolify' } : {}),
      }));
    } catch { return null; }
  }

  const listCache = {};
  let listVisit = 0;
  let loadedVisit = -1;
  const LIST_KEY = { projects: 'projects', servers: 'servers', environment: 'resources', project: 'environments' };
  function listData(kind) {
    if (kind === 'environment') return { resources: pageData(document, 'resources') };
    if (kind === 'project') return { environments: pageData(document, 'environments') };
    if (kind === 'projects') return { projects: pageData(document, 'projects') };
    if (kind === 'servers') return { servers: pageData(document, 'servers') };
    if (loadedVisit !== listVisit) { // once per visit of the dashboard; cached data shows at once
      loadedVisit = listVisit;
      Promise.all([fetchData('projects'), fetchData('servers')]).then(([projects, servers]) => {
        listCache.projects = projects; // null: not readable now, Coolify's own dashboard shows
        listCache.servers = servers;
        listCache.done = true;
        queue();
      });
    }
    return { projects: listCache.projects, servers: listCache.servers, loading: !listCache.done };
  }

  const PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>';
  function projectBox(p) {
    return `<div class="lg-box"><a class="lg-cover" href="${esc(p.href)}" data-lg-nav aria-label="${esc(p.name)}"></a><div class="lg-box-body">
      <div class="lg-box-text"><div class="lg-box-title">${esc(p.name)}</div><div class="lg-box-desc">${esc(p.description || '')}</div></div>
      <div class="lg-box-links">${p.addResourceHref ? `<a href="${esc(p.addResourceHref)}" data-lg-nav>+ Add Resource</a>` : ''}${p.settingsHref ? `<a href="${esc(p.settingsHref)}" data-lg-nav>Settings</a>` : ''}</div></div></div>`;
  }
  function serverBox(s) {
    const bad = s.statusType && s.statusType !== 'success';
    return `<a class="lg-box${s.statusType === 'error' ? ' lg-bad' : ''}" href="${esc(s.href)}" data-lg-nav><div class="lg-box-body"><div class="lg-box-text">
      <div class="lg-box-title">${esc(s.name)}</div><div class="lg-box-desc">${esc(s.description || '')}</div>
      ${bad ? `<div class="lg-box-error lg-${esc(s.statusType)}">${esc(s.status || '')}</div>` : ''}</div></div></a>`;
  }
  function grid(items, box, empty, loading) {
    if (!items) return loading ? '<div class="lg-empty-note">Loading…</div>' : '<div class="lg-empty-note">Could not load the list.</div>';
    return items.length ? `<div class="lg-grid">${items.map(box).join('')}</div>` : empty;
  }
  // v4.0 environment page: resource cards (status dot, description, domain, server, tags + "Add tag").
  const DOT = { running: 'success', exited: 'error', starting: 'warning', restarting: 'warning', degraded: 'warning' };
  function resourceCard(r) {
    const dot = DOT[String(r.status || '').split(/[:(]/)[0].trim()];
    return `<div class="lg-res"><a class="lg-box lg-res-box" href="${esc(r.hrefLink)}" data-lg-nav>
      ${dot ? `<span class="lg-dot lg-${dot}" title="${esc(String(r.status).split(':')[0])}"></span>` : ''}
      <div class="lg-res-body"><div class="lg-box-title lg-res-title">${esc(r.name)}</div>
      ${r.description ? `<div class="lg-box-desc">${esc(r.description)}</div>` : ''}${r.fqdn ? `<div class="lg-box-desc">${esc(r.fqdn)}</div>` : ''}
      <div class="lg-box-desc lg-res-server">Server: <span>${esc(r.destination?.server?.name || 'Unknown')}</span></div>
      ${r.server_status === false ? '<div class="lg-res-error">Server is unreachable or misconfigured</div>' : ''}</div></a>
      <div class="lg-tags">${(r.tags || []).map(t => `<a class="lg-tag" href="/tags/${encodeURIComponent(t.name)}" data-lg-nav>${esc(t.name)}</a>`).join('')}<a class="lg-add-tag" href="${esc(r.hrefLink)}/tags" data-lg-nav>Add tag</a></div></div>`;
  }
  let envSearch = '';
  function resourceGroups(resources) {
    const q = envSearch.trim().toLowerCase();
    const hit = r => !q || [r.name, r.fqdn, r.description].some(v => String(v || '').toLowerCase().includes(q));
    const byName = (a, b) => String(a.name).localeCompare(String(b.name), undefined, { numeric: true, sensitivity: 'base' });
    return [['Applications', 'application'], ['Databases', 'database'], ['Services', 'service']].map(([title, type]) => {
      const items = resources.filter(r => r.type === type && hit(r)).sort(byName);
      return items.length ? `<h2 class="lg-group">${title}</h2><div class="lg-grid lg-grid-3">${items.map(resourceCard).join('')}</div>` : '';
    }).join('');
  }
  const ownLink = text => [...document.querySelectorAll('main.app-main a')].find(a => !a.closest('#lg-list') && a.textContent.trim() === text);
  const ownTitle = () => [...document.querySelectorAll('main.app-main h1')].find(h => !h.closest('#lg-list'))?.textContent.trim() || '';

  // Coolify's canvas for these pages (it remembers the choice; its canvas page has a "List view" link back).
  const CANVAS_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><path d="M10 6.5h4.5a2 2 0 0 1 2 2V14M7 10v4.5a2 2 0 0 0 2 2h5"/></svg>';
  const canvasButton = href => `<a class="button lg-canvas" href="${href}" data-lg-nav title="Show this page as a canvas">${CANVAS_ICON}Canvas view</a>`;
  function listHTML(kind, data) {
    if (kind === 'environment') {
      const env = location.pathname.replace(/\/+$/, '');
      const add = ownLink('New resource')?.getAttribute('href') || `${env}/new`;
      return `<div class="lg-title-row"><h1>Resources</h1><a class="button" href="${esc(add)}" data-lg-nav>+ New</a><a class="button" href="${esc(env)}/clone" data-lg-nav>Clone</a></div>
        <div class="lg-crumbs lg-crumbs-list"></div>
        ${data.resources?.length ? `<input class="input lg-search" type="search" placeholder="Search for name, fqdn..." value="${esc(envSearch)}">
        <div class="lg-groups">${resourceGroups(data.resources)}</div>` : `<a class="lg-box lg-add-first" href="${esc(add)}" data-lg-nav>+ Add Resource</a>`}`;
    }
    if (kind === 'project') {
      return `<div class="lg-title-row"><h1>Environments</h1><button type="button" class="button" data-lg-add="environment">+ Add</button></div>
        <div class="lg-subtitle">${esc(ownTitle())}.</div>
        ${data.environments?.length ? `<div class="lg-grid lg-grid-env">${data.environments.map(e => projectBox({ ...e, addResourceHref: null })).join('')}</div>` : '<p>No environments found.</p>'}`;
    }
    const noProjects = '<div class="lg-empty"><div class="lg-empty-title">No projects found.</div><div><button type="button" class="button" data-lg-add="project">Add</button> your first project.</div></div>';
    const noServers = '<div class="lg-empty"><div class="lg-empty-title">No servers found.</div><div><a class="button" href="/servers/new" data-lg-nav>Add</a> your first server.</div></div>';
    if (kind === 'projects') {
      return `<div class="lg-title-row"><h1>Projects</h1><button type="button" class="button" data-lg-add="project">+ Add</button>${canvasButton('/projects/canvas')}</div><div class="lg-subtitle">All your projects are here.</div>`
        + grid(data.projects, projectBox, noProjects);
    }
    if (kind === 'servers') {
      return `<div class="lg-title-row"><h1>Servers</h1><a class="button" href="/servers/new" data-lg-nav>+ Add</a>${canvasButton('/servers/canvas')}</div><div class="lg-subtitle">All your servers are here.</div>`
        + grid(data.servers, serverBox, noServers);
    }
    return `<div class="lg-title-row"><h1>Dashboard</h1>${canvasButton('/dashboard/canvas')}</div><div class="lg-subtitle">Your self-hosted infrastructure.</div>
      <section class="lg-section lg-first"><div class="lg-section-head"><h3>Projects</h3><button type="button" class="lg-plus" data-lg-add="project" title="New project">${PLUS}</button></div>${grid(data.projects, projectBox, noProjects, data.loading)}</section>
      <section class="lg-section"><div class="lg-section-head"><h3>Servers</h3><a class="lg-plus" href="/servers/new" data-lg-nav title="New server">${PLUS}</a></div>${grid(data.servers, serverBox, noServers, data.loading)}</section>`;
  }

  function updateList() {
    const kind = listKind(location.pathname.replace(/(.)\/+$/, '$1'));
    const host = document.querySelector('main.app-main > div');
    let list = document.getElementById('lg-list');
    // Data that cannot be read (a Coolify update changed the page): Coolify's own page shows instead.
    const unread = kind === 'dashboard' ? listCache.done && (!listCache.projects || !listCache.servers) : !pageData(document, LIST_KEY[kind]);
    if (!kind || !host || unread) { list?.remove(); return; }
    if (!list || list.parentElement !== host) {
      list?.remove();
      list = document.createElement('div');
      list.id = 'lg-list';
      host.prepend(list);
    }
    const data = listData(kind);
    // The search box keeps its focus: when only the search changed, only the groups below it are drawn again.
    const html = listHTML(kind, { ...data, resources: data.resources && [...data.resources] });
    const frame = html.replace(/<div class="lg-groups">[\s\S]*$/, '').replace(/ value="[^"]*"/, '');
    if (list.dataset.frame !== frame) { list.dataset.frame = frame; list.innerHTML = html; }
    else if (kind === 'environment' && data.resources) {
      const groups = list.querySelector('.lg-groups');
      const next = resourceGroups(data.resources);
      if (groups && groups.dataset.html !== next) { groups.dataset.html = next; groups.innerHTML = next; }
    }
  }
  // "New project" / "New environment": Coolify's own button (hidden with its list) opens Coolify's modal.
  function addVia(label) {
    const own = [...document.querySelectorAll('main.app-main button')].find(b => !b.closest('#lg-list') && (b.title === label || b.textContent.trim() === label));
    own?.click();
    return !!own;
  }
  function addProject() {
    const own = addVia('New project');
    if (own) return;
    if (window.Livewire?.navigate) window.Livewire.navigate('/projects?view=grid');
    else location.href = '/projects?view=grid';
  }
  document.addEventListener('input', event => {
    if (!event.target.matches?.('#lg-list .lg-search')) return;
    envSearch = event.target.value;
    queue();
  });
  document.addEventListener('click', event => {
    if (!event.target.closest?.('#lg-list')) return;
    if (event.target.closest('[data-lg-add="project"]')) { addProject(); return; }
    if (event.target.closest('[data-lg-add="environment"]')) { addVia('New environment'); return; }
    const link = event.target.closest('a[data-lg-nav]');
    if (link && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && window.Livewire?.navigate) {
      event.preventDefault();
      window.Livewire.navigate(link.href);
    }
  });


  // ── Environment variables: v4.0 cards (one card per variable: name, value, comment, checkboxes, Update / Lock / Delete) ──
  // v4.5 shows a table and edits in a modal that loads the value on demand. Each row is a Livewire component; the card
  // drives that component (loadValues, $set + submit, lock) and opens Coolify's own delete confirmation.
  const envState = new Map();
  const EYE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
  const LOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6z"/><path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0-2 0m-3-5V7a4 4 0 1 1 8 0v4"/></svg>';
  const wireOf = id => { try { return window.Livewire?.find(id) || null; } catch { return null; } };
  const editModal = row => row.querySelector('template[x-teleport]')?._x_teleport || null;
  function envFlags(w) {
    if (w.is_redis_credential) return [];
    const magic = w.isMagicVariable;
    if (w.type === 'service') return magic ? [] : [['is_multiline', 'Is Multiline?'], ['is_literal', 'Is Literal?']];
    if (w.isSharedVariable) return magic ? [] : [['is_multiline', 'Is Multiline?']];
    return [['is_buildtime', 'Available at Buildtime'], ['is_runtime', 'Available at Runtime'],
      ...(magic ? [] : [['is_multiline', 'Is Multiline?'], ...(w.is_multiline ? [] : [['is_literal', 'Is Literal?']])])];
  }
  // The names the cards use (EnvironmentVariable\Show). If a Coolify update renames one, the cards are not made and
  // Coolify's own table shows, so a variable can never be saved through a wrong name.
  let envWarned = false;
  const ENV_PROPS = ['key', 'value', 'comment', 'valuesLoaded', 'isLocked', 'isValueHidden', 'isMagicVariable', 'is_multiline'];
  function envContract(row, w) {
    if (!w || !row.querySelector('[data-env-settings-trigger][wire\\:click="loadValues"]')) return false;
    const modal = editModal(row) || row.querySelector('template[x-teleport]')?.content;
    if (!modal?.querySelector('form[wire\\:submit="submit"]')) return false;
    try { const snap = w.__instance().snapshot; return !!snap.memo && ENV_PROPS.every(name => name in snap.data); } catch { return false; }
  }
  const errLine = list => list?.length ? `<div class="lg-err">${esc(String(list[0]))}</div>` : '';
  function envCard(row, w, canUpdate, errors = {}) {
    const locked = w.isLocked, hidden = w.isValueHidden, magic = w.isMagicVariable;
    const editable = canUpdate && !locked && !hidden && !magic && !w.isDisabled;
    const loaded = w.valuesLoaded;
    const value = locked ? 'Hidden after locking' : hidden ? 'Hidden (only admins can view)' : loaded ? (w.value ?? '') : '';
    const valueField = w.is_multiline && loaded && !locked && !hidden
      ? `<textarea class="input lg-env-value" ${editable ? '' : 'disabled'}>${esc(value)}</textarea>`
      : `<div class="lg-pass"><input class="input lg-env-value" type="${locked || hidden ? 'text' : 'password'}" value="${esc(value)}" placeholder="${loaded || locked || hidden ? '' : 'Loading value…'}" ${editable && loaded ? '' : 'disabled'}>${editable ? `<button type="button" class="lg-eye" title="Show / hide">${EYE}</button>` : ''}</div>`;
    const flags = canUpdate && !locked ? envFlags(w) : [];
    return `<div class="lg-env${w.is_really_required ? ' lg-required' : ''}" data-wire="${esc(row.getAttribute('wire:id'))}">
      <div class="lg-env-row"><div><div class="lg-env-key-row"><input class="input lg-env-key" value="${esc(w.key || '')}" ${editable && !w.is_redis_credential ? '' : 'disabled'}>${locked ? LOCK : ''}</div>${errLine(errors.key)}</div>${locked ? '' : `<div>${valueField}${errLine(errors.value)}</div>`}</div>
      ${locked ? '' : `<label class="lg-field">Comment<input class="input lg-env-comment" value="${esc(w.comment || '')}" maxlength="256" ${canUpdate && !magic ? '' : 'disabled'}>${errLine(errors.comment)}</label>`}
      ${flags.length ? `<div class="lg-checks">${flags.map(([id, label]) => `<label class="lg-check"><span>${label}</span><input type="checkbox" data-flag="${id}" ${w[id] ? 'checked' : ''}></label>`).join('')}</div>` : ''}
      ${magic ? '<div class="lg-note">This env cannot be edited manually, it is handled by Coolify.</div>' : ''}
      ${canUpdate && !magic ? `<div class="lg-env-actions">${locked ? '' : '<button type="button" class="button" data-env="update">Update</button><button type="button" class="button" data-env="lock">Lock</button>'}<button type="button" class="button button-error" data-env="delete">Delete</button></div>` : ''}
    </div>`;
  }
  function hardcodedCard(row, w) {
    const key = w?.key || row.querySelector('[data-env-name-trigger]')?.textContent.trim() || '';
    const note = [...row.querySelectorAll('.table-badge')].map(b => b.textContent.trim()).join(' · ');
    return `<div class="lg-env" data-wire="${esc(row.getAttribute('wire:id') || key)}"><div class="lg-env-row"><input class="input" value="${esc(key)}" disabled>${w && 'value' in w ? `<input class="input" value="${esc(w.value ?? '')}" disabled>` : ''}</div>${note ? `<div class="lg-note">${esc(note)}</div>` : ''}</div>`;
  }
  function updateEnvs() {
    const table = document.querySelector('main .data-table:has(.env-table-item[wire\\:id])');
    let box = document.getElementById('lg-envs');
    if (!table || !window.Livewire?.find) { box?.remove(); return; }
    const managedRows = [...table.querySelectorAll('.env-table-item[wire\\:id]')].filter(row => row.querySelector('[data-env-settings-trigger]'));
    if (!managedRows.every(row => envContract(row, wireOf(row.getAttribute('wire:id'))))) {
      if (!envWarned) { envWarned = true; console.warn('[coolify-legacy] env cards off: the variable component changed; Coolify\'s table shows.'); }
      box?.remove();
      return;
    }
    const after = table.closest('#environment-table-section') || table;
    if (!box || box.previousElementSibling !== after) {
      box?.remove();
      box = document.createElement('div');
      box.id = 'lg-envs';
      box.addEventListener('input', event => { const card = event.target.closest('.lg-env'); if (card) (envState.get(card.dataset.wire) || {}).dirty = true; });
      box.addEventListener('change', envChange);
      box.addEventListener('click', envClick);
      after.after(box);
    }
    // Groups in table order: "Production" / "Preview deployments" headers (only when previews exist), then rows.
    const groups = [];
    for (const el of table.querySelectorAll('.env-table-item[wire\\:id], div.border-b[class~="bg-neutral-50"]')) {
      if (!el.classList.contains('env-table-item')) { groups.push({ title: /preview/i.test(el.textContent) ? 'Preview Deployments' : 'Production', rows: [] }); continue; }
      if (!groups.length) groups.push({ title: 'Production', rows: [] });
      groups.at(-1).rows.push(el);
    }
    const wanted = groups.map(g => `<div class="lg-env-group" data-title="${g.title}"><h3>${g.title} Environment Variables</h3><div>Environment (secrets) variables for ${g.title === 'Production' ? 'Production' : 'Preview Deployments'}.</div></div>`
      + g.rows.map(r => `<!--${r.getAttribute('wire:id')}-->`).join('')).join('');
    if (box.dataset.layout !== wanted) { box.dataset.layout = wanted; box.innerHTML = groups.map(g => `<div class="lg-env-group"><h3>${g.title} Environment Variables</h3><div>Environment (secrets) variables for ${g.title === 'Production' ? 'Production' : 'Preview Deployments'}.</div></div>`
      + g.rows.map(r => `<div data-slot="${esc(r.getAttribute('wire:id'))}"></div>`).join('')).join(''); }
    for (const row of groups.flatMap(g => g.rows)) {
      const id = row.getAttribute('wire:id');
      const slot = box.querySelector(`[data-slot="${window.CSS.escape(id)}"]`);
      if (!slot) continue;
      const w = wireOf(id);
      const state = envState.get(id) || envState.set(id, {}).get(id);
      const managed = !!row.querySelector('[data-env-settings-trigger]');
      if (!managed) { const html = hardcodedCard(row, w); if (slot.dataset.html !== html) { slot.dataset.html = html; slot.innerHTML = html; } continue; }
      if (!w) continue;
      const canUpdate = !!editModal(row)?.querySelector('[data-environment-variable-update-actions] button, [data-environment-variable-delete-action] button');
      if (canUpdate && !w.valuesLoaded && !w.isLocked && !w.isValueHidden && !state.loading) {
        state.loading = true;
        Promise.resolve(w.$call('loadValues')).catch(() => {}).finally(() => { state.loading = false; queue(); });
      }
      if (state.dirty && slot.firstElementChild) continue; // keep what the user is typing
      const html = envCard(row, w, canUpdate, state.errors);
      if (slot.dataset.html !== html) { slot.dataset.html = html; slot.innerHTML = html; }
    }
  }
  // Validation errors: Coolify shows them only inside its (hidden) edit window. Livewire keeps them in the component's
  // snapshot (memo.errors), reachable through $wire.__instance(); the card shows them under the fields, as v4.0 did.
  const ENV_KEY = /^[A-Za-z_][A-Za-z0-9_.]*$/; // Coolify's ValidationPatterns::ENVIRONMENT_VARIABLE_KEY_PATTERN
  const KEY_MESSAGE = 'The key must start with a letter or underscore and may only contain letters, numbers, underscores, and dots.';
  function wireErrors(w) {
    try { return w.__instance?.()?.snapshot?.memo?.errors || {}; } catch { return {}; }
  }
  function showErrors(card, state, errors) {
    state.errors = errors;
    for (const [field, cls] of [['key', '.lg-env-key'], ['value', '.lg-env-value'], ['comment', '.lg-env-comment']]) {
      const input = card.querySelector(cls);
      if (!input) continue;
      const holder = field === 'comment' ? input.parentElement : input.closest('.lg-env-row > div');
      holder.querySelector(':scope > .lg-err')?.remove();
      if (errors[field]?.length) holder.insertAdjacentHTML('beforeend', errLine(errors[field]));
    }
    card.classList.toggle('lg-invalid', Object.keys(errors).length > 0);
  }
  async function saveCard(card, w, state) {
    await w.$call('submit');
    const errors = wireErrors(w);
    showErrors(card, state, errors);
    if (!Object.keys(errors).length) state.dirty = false;
  }
  const cardWire = el => { const card = el.closest('.lg-env'); return card ? [card, wireOf(card.dataset.wire), envState.get(card.dataset.wire) || {}] : []; };
  async function envChange(event) {
    const flag = event.target.dataset?.flag;
    if (!flag) return;
    const [, w] = cardWire(event.target);
    if (!w) return;
    const [card, , state] = cardWire(event.target);
    await w.$set(flag, event.target.checked, false); // v4.0: checkboxes save at once
    await saveCard(card, w, state);
    queue();
  }
  async function envClick(event) {
    const eye = event.target.closest('.lg-eye');
    if (eye) { const input = eye.previousElementSibling; input.type = input.type === 'password' ? 'text' : 'password'; return; }
    const action = event.target.closest('[data-env]')?.dataset.env;
    if (!action) return;
    const [card, w, state] = cardWire(event.target);
    if (!w) return;
    if (action === 'update') {
      const key = card.querySelector('.lg-env-key'), value = card.querySelector('.lg-env-value'), comment = card.querySelector('.lg-env-comment');
      if (key && !key.disabled && !ENV_KEY.test(key.value.trim())) { showErrors(card, state, { key: [KEY_MESSAGE] }); return; }
      if (key && !key.disabled) await w.$set('key', key.value, false);
      if (value && !value.disabled) await w.$set('value', value.value, false);
      if (comment && !comment.disabled) await w.$set('comment', comment.value, false);
      await saveCard(card, w, state);
    } else if (action === 'lock') {
      await w.$call('lock');
    } else if (action === 'delete') { // Coolify's own "type the name" confirmation; else its edit window (Delete is there)
      const row = document.querySelector(`[wire\\:id="${window.CSS.escape(card.dataset.wire)}"]`);
      const trigger = editModal(row)?.querySelector('[data-environment-variable-delete-action] button');
      (trigger || row?.querySelector('[data-env-settings-trigger]'))?.click();
    }
    queue();
  }


  // Log toolbar dropdowns as v4.0: "Filter Log Levels" (funnel → checkboxes) and "Download Logs" (displayed / all).
  // The rows click Coolify's own (hidden) level and download buttons, so Coolify's code still does the work.
  let logMenu = null;
  let proxying = false;
  function openLogMenu(anchor, rows) {
    if (!logMenu) {
      logMenu = document.createElement('div');
      logMenu.id = 'lg-logmenu';
      logMenu.setAttribute('role', 'menu');
      const run = row => {
        const target = logMenu._rows[row.dataset.i]?.button;
        if (!target) return;
        proxying = true;
        try { target.click(); } finally { proxying = false; }
      };
      // Checkbox rows: "change" fires once (a label click also clicks its checkbox); button rows: "click".
      logMenu.addEventListener('change', event => { const row = event.target.closest('label[data-i]'); if (row) { run(row); setTimeout(syncLogMenu, 0); } });
      logMenu.addEventListener('click', event => { const row = event.target.closest('button[data-i]'); if (row) { run(row); logMenu.hidden = true; } });
    }
    if (logMenu.parentNode !== html) html.append(logMenu);
    logMenu._rows = rows;
    logMenu.innerHTML = rows.map((r, i) => r.check
      ? `<label data-i="${i}"><input type="checkbox" tabindex="-1">${r.dot ? `<span class="lg-lvl ${esc(r.dot)}"></span>` : ''}${esc(r.label)}</label>`
      : `<button type="button" data-i="${i}">${esc(r.label)}</button>`).join('');
    syncLogMenu();
    logMenu.hidden = false;
    const a = anchor.getBoundingClientRect();
    logMenu.style.top = `${a.bottom + 8}px`;
    logMenu.style.left = `${Math.max(8, a.right - logMenu.offsetWidth)}px`;
  }
  function syncLogMenu() {
    if (!logMenu) return;
    logMenu.querySelectorAll('label[data-i]').forEach(l => { l.querySelector('input').checked = logMenu._rows[l.dataset.i].button.getAttribute('aria-checked') === 'true'; });
  }
  const levelName = b => (b.querySelector('.flex-1') || b).textContent.trim().replace(/^./, c => c.toUpperCase());
  document.addEventListener('click', event => {
    if (proxying) return;
    if (logMenu && !logMenu.hidden && !event.target.closest?.('#lg-logmenu')) logMenu.hidden = true;
    let funnel = event.target.closest?.('.logs-viewer-toolbar .runtime-log-menu > div > p.runtime-log-menu-label');
    if (funnel && !funnel.nextElementSibling?.matches('[x-on\\:click^="toggleLogFilter"]')) funnel = null;
    const levels = funnel ? [...funnel.parentElement.querySelectorAll(':scope > [x-on\\:click^="toggleLogFilter"]')] : [];
    if (funnel && levels.length) {
      event.preventDefault();
      event.stopImmediatePropagation();
      openLogMenu(funnel, levels.map(b => ({ button: b, check: true, label: levelName(b), dot: b.querySelector('span[class*="bg-"]')?.className.match(/bg-\S+/)?.[0] })));
      return;
    }
    const download = event.target.closest?.('.logs-viewer-toolbar .runtime-log-menu [x-on\\:click^="downloadLogs"]');
    const all = download?.parentElement.querySelector(':scope > [x-on\\:click*="downloadAllLogs"]');
    if (download && all) { // v4.0: Download opens "Download displayed logs" / "Download all logs"
      event.preventDefault();
      event.stopImmediatePropagation();
      openLogMenu(download, [{ button: download, label: 'Download displayed logs' }, { button: all, label: 'Download all logs' }]);
    }
  }, true);
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && logMenu) logMenu.hidden = true; });
  addEventListener('scroll', () => { if (logMenu) logMenu.hidden = true; }, true);

  // Log toolbar: the menu buttons now show as icons; give each a hover title (Livewire may drop it on a re-render: set again).
  function logTitles() {
    for (const el of document.querySelectorAll('.logs-viewer-toolbar .runtime-log-menu > div > p.runtime-log-menu-label:not([title])')) {
      if (el.nextElementSibling?.matches('[x-on\\:click^="toggleLogFilter"]')) el.title = 'Filter Log Levels';
    }
    for (const el of document.querySelectorAll('.runtime-log-menu .listbox-option:not([title])')) {
      const label = el.textContent.replace(/✓/g, '').replace(/\s+/g, ' ').trim();
      if (label) el.title = label;
    }
  }

  // The top bar (absolutely placed) sits on the crumbs slot; its action HUD on the right of the tab row.
  // Tab items leave the sub-menu; on a tab page the sub-menu shows only that tab's sub-items (Proxy: Configuration,
  // Dynamic Configurations, Logs), or is hidden when the tab has none (Logs, Terminal) — as in v4.0.
  function placeCrumbs(head, model) {
    let css = '';
    const header = document.querySelector('header.app-topbar');
    const slotEl = document.querySelector('#lg-head .lg-crumbs, #lg-list .lg-crumbs');
    if (slotEl && header && innerWidth >= 1024) {
      const base = (header.offsetParent || document.body).getBoundingClientRect();
      const slot = slotEl.getBoundingClientRect();
      const actions = (document.querySelector('#lg-head .lg-actions') || slotEl).getBoundingClientRect();
      css = `:root { --lg-c-top: ${Math.round(slot.top - base.top)}px; --lg-c-left: ${Math.round(slot.left - base.left)}px; --lg-c-w: ${Math.round(slot.width)}px; --lg-a-top: ${Math.round(actions.top - slot.top)}px; }`;
      const A = 'html:root main aside.in-main-nav.application-settings-navigation';
      const G = 'html:root main :has(> aside.in-main-nav)';
      const tabs = model?.kind === 'resource' ? model.tabs : [{ active: true }];
      const rules = tabs.slice(1).map(t => {
        const end = JSON.stringify(new URL(t.href).pathname);
        return `${A} > nav > a.menu-item[href$=${end}], ${A} > nav > div:not(.col-span-full):has(> a.menu-item[href$=${end}]) { display: none !important; }`;
      });
      if (!tabs[0].active) {
        rules.push(document.querySelector('main aside.in-main-nav > nav > div.col-span-full')
          ? `${A} > nav > :not(div.col-span-full) { display: none !important; }
             ${A} > nav > div.col-span-full { display: flex !important; flex-direction: column !important; gap: 8px !important; padding: 0 !important; border: 0 !important; }`
          : `${A} { display: none !important; }
             ${G} { grid-template-columns: minmax(0, 1fr) !important; }
             ${G} > aside.in-main-nav ~ * { grid-column: 1 / -1 !important; }`);
      }
      css += `@layer theme { @media (min-width: 1024px) { ${rules.join('\n')} } }`;
    }
    ownStyle(`${KEY}-place`, css);
  }

  // One <style> per id. Livewire's back button restores a saved copy of an earlier page, <head> styles included, so an
  // old copy (with that page's rules, e.g. "hide the sub-menu") can come back next to ours: remove every extra copy.
  function ownStyle(id, text) {
    const all = document.querySelectorAll(`style#${id}`);
    for (let i = 1; i < all.length; i++) all[i].remove();
    let style = all[0];
    if (!style) {
      style = document.createElement('style');
      style.id = id;
      (document.head || html).append(style);
    }
    if (style.textContent !== text) style.textContent = text;
  }
  const addStyle = () => ownStyle(`${KEY}-style`, CSS + SIDE_CSS);

  // v4.0 had no 3D nav tiles, no button depth and no floating panels: Coolify's own "flat" and "default"
  // modes turn those off. Set on the page only (the saved choice in localStorage stays as it is), and again
  // whenever Coolify re-applies its theme (every Livewire navigation).
  function flatten() {
    if (html.dataset.navItems !== 'flat') html.dataset.navItems = 'flat';
    if (html.dataset.navStyle !== 'default') html.dataset.navStyle = 'default';
  }

  // The sidebar lives on <html> (after <body>): Livewire's navigation swaps <body>, not this element.
  let side = null;
  function setUp() {
    addStyle();
    if (!document.body) return;
    if (!side) side = buildSide();
    if (side.parentNode !== html) html.append(side);
    // Each part on its own: an unknown page shape must not stop the others.
    const run = (name, fn) => { try { return fn(); } catch (error) { console.warn(`[coolify-legacy] ${name}:`, error); return undefined; } };
    run('sidebar', () => updateSide(side));
    const { head, model } = run('heading', updateHead) || {};
    run('breadcrumbs', () => placeCrumbs(head, model));
    run('lists', updateList);
    run('envs', updateEnvs);
    run('log titles', logTitles);
  }

  // v4.0 listed a service's containers as boxes: Coolify's card view of "Compose resources" (its own setting).
  try { localStorage.setItem('service-compose-resources-view', 'grid'); } catch { /* storage blocked */ }

  // A project's or environment's canvas opens its list (v4.0 had no canvas). Dashboard / Projects / Servers keep Coolify's
  // canvas as an option ("Canvas view" button on their v4.0 lists).
  function leaveCanvas() {
    const m = location.pathname.match(/^(\/project\/[^/]+(?:\/environment\/[^/]+)?)\/canvas\/?$/);
    if (!m) return;
    const query = new URLSearchParams(location.search);
    query.set('view', 'grid');
    location.replace(`${m[1]}?${query}`);
  }
  leaveCanvas();
  // v4.0 opened pages full width; Coolify's list pages open as cards (closest to v4.0 boxes). Only when not chosen yet.
  try {
    if (!localStorage.getItem('pageWidth')) localStorage.setItem('pageWidth', 'full');
    for (const key of ['coolify-sources-view', 'coolify-destinations-view', 'coolify-s3-storages-view']) if (!localStorage.getItem(key)) localStorage.setItem(key, 'grid');
  } catch { /* storage blocked */ }

  // Livewire's page change resets <html> to the server copy (no "dark" class) and Coolify puts the theme back only on
  // livewire:navigated, which waits for the new page's scripts (the Profile page loads one): the page showed light
  // for a moment. Put the saved theme back at once (the observer runs before the next paint). Coolify saves the
  // theme before it applies it, so the saved value is always the right one.
  function keepTheme() {
    let theme;
    try { theme = localStorage.getItem('theme') === 'purple' ? 'custom' : (localStorage.getItem('theme') || 'dark'); } catch { return; }
    if (theme === 'custom') {
      if (html.dataset.theme !== 'custom') window.applyStoredTheme?.();
      return;
    }
    const dark = theme === 'dark' || (theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
    if (html.classList.contains('dark') !== dark) html.classList.toggle('dark', dark);
    const name = dark ? 'dark' : 'light';
    if (html.dataset.theme !== name) html.dataset.theme = name;
  }

  addStyle();
  flatten();
  keepTheme();
  new MutationObserver(() => { flatten(); keepTheme(); })
    .observe(html, { attributes: true, attributeFilter: ['class', 'data-theme', 'data-nav-items', 'data-nav-style'] });
  let queued = false;
  const queue = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; setUp(); });
  };
  new MutationObserver(queue).observe(html, { childList: true, subtree: true });
  addEventListener('resize', queue);
  document.addEventListener('DOMContentLoaded', setUp);
  document.addEventListener('livewire:navigated', () => { listVisit++; envSearch = ''; leaveCanvas(); flatten(); setUp(); });
})();
