/**
 * Papamoa.info - Shared Nav + Mobile Drawer (LOCKED)
 *
 * Single source of truth for the site nav, mobile drawer, and footer styling.
 * The markup + CSS here are the LOCKED versions captured from homepage.html
 * (2026-06-03). Do not fork per-page nav/drawer markup again - change it here.
 *
 * Usage (every public page):
 *   <body data-nav="default">
 *   <div id="pnf-nav-placeholder"></div>
 *   ...page content (including the inline <footer class="pnf-footer">)...
 *   <script src="/papamoa-previews/nav.js"></script>
 *
 * Nav variant: flat tabs on every page (Carwyn req #3 - main page tabs always
 *   visible). The active tab is computed from the URL. The category/sales
 *   builders below are retained for optional future use but are NOT deployed;
 *   default (flat) is the locked site-wide nav.
 *
 * Footer: nav.js injects the footer CSS (.pnf-footer*) so the shell + styling
 *   are single-source. The footer MARKUP stays inline per page so each page can
 *   keep its contextual columns (e.g. category subcategory links). The contact
 *   modal (.pnf-overlay/.pnf-modal/.pnf-cf) is NOT owned here - it stays inline.
 *
 * Base path:
 *   Set PNF_BASE in a <script> before nav.js to override the path prefix.
 *   Defaults to '/papamoa-previews' for GitHub Pages preview.
 *   Set to '' at custom domain launch.
 */

(function () {
  var BASE = (typeof PNF_BASE !== 'undefined') ? PNF_BASE : '/papamoa-previews';
  var body = document.body;
  var navType = body.getAttribute('data-nav') || 'default';

  // ── SHARED CSS (injected once) ──────────────────────────────────────────
  var style = document.createElement('style');
  style.textContent = [
    ':root{--pnf-navy:#243B59;--pnf-accent:#359FE8;--pnf-dune:#C4985A;--pnf-white:#FFFFFF;--pnf-muted:rgba(255,255,255,0.45);--pnf-font:\'Figtree\',sans-serif;--pnf-display:\'Playfair Display\',serif;}',
    // Inline icon (replaces decorative emoji) — sizes to text, inherits colour
    '.pnf-i{display:inline-block;width:1em;height:1em;vertical-align:-0.125em;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0;}',
    // Menu feature deferred to Phase 2 — hide all menu UI (View-menu button, JS-rendered upsell, lightbox)
    '#menu-btn-slot,.btn-menu,.btn-upsell,.btn-menu-upsell,.menu-lightbox{display:none !important;}',
    'a[href*="menu-addon"]{display:none !important;}',
    // ── NAV (locked: 64px) ──
    '.pnf-nav{background:var(--pnf-navy);height:64px;padding:0 28px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:200;box-shadow:0 2px 12px rgba(0,0,0,0.25);gap:18px;width:100%;box-sizing:border-box;}',
    '.pnf-logo{display:flex;align-items:center;text-decoration:none;flex-shrink:0;line-height:0;}',
    '.pnf-logo-img{height:44px;width:auto;max-width:300px;display:block;}',
    '@media (max-width:520px){.pnf-logo-img{height:36px;max-width:230px;}}',
    // Default nav links
    '.pnf-links{display:flex;align-items:center;gap:4px;flex:1;overflow-x:auto;scrollbar-width:none;}',
    '.pnf-links::-webkit-scrollbar{display:none;}',
    '.pnf-link{font-family:var(--pnf-font);font-size:14.5px;font-weight:600;color:rgba(255,255,255,0.78);text-decoration:none;padding:9px 14px;white-space:nowrap;transition:color 0.15s,background 0.15s;border-bottom:2px solid transparent;border-radius:6px 6px 0 0;}',
    '.pnf-link:hover{color:var(--pnf-white);background:rgba(255,255,255,0.06);}',
    '.pnf-link.active{color:var(--pnf-white);border-bottom-color:var(--pnf-accent);background:rgba(53,159,232,0.08);}',
    // CTA button
    '.pnf-cta{font-family:var(--pnf-font);font-size:13px;font-weight:700;background:var(--pnf-accent);color:var(--pnf-white);padding:8px 18px;border-radius:100px;text-decoration:none;white-space:nowrap;flex-shrink:0;transition:background 0.2s;}',
    '.pnf-cta:hover{background:#2d95c4;}',
    // Facebook icon
    '.pnf-fb{display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:6px;background:rgba(255,255,255,0.08);color:var(--pnf-muted);text-decoration:none;font-size:13px;font-weight:700;flex-shrink:0;transition:background 0.15s,color 0.15s;}',
    '.pnf-fb:hover{background:#1877F2;color:var(--pnf-white);}',
    // Instagram icon
    '.pnf-ig{display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:6px;background:rgba(255,255,255,0.08);color:var(--pnf-muted);text-decoration:none;flex-shrink:0;transition:background 0.15s,color 0.15s;}',
    '.pnf-ig svg{width:16px;height:16px;}',
    '.pnf-ig:hover{background:linear-gradient(45deg,#F58529,#DD2A7B,#8134AF);color:var(--pnf-white);}',
    // Hamburger
    '.pnf-hamburger{display:none;flex-direction:column;justify-content:center;gap:5px;width:36px;height:36px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:7px;cursor:pointer;padding:0 9px;flex-shrink:0;}',
    '.pnf-hamburger span{display:block;height:2px;background:rgba(255,255,255,0.75);border-radius:2px;transition:all 0.25s;}',
    '.pnf-hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}',
    '.pnf-hamburger.open span:nth-child(2){opacity:0;transform:scaleX(0);}',
    '.pnf-hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}',
    '.pnf-hamburger.open{opacity:0;pointer-events:none;}',
    // Breadcrumb strip (slim wayfinding bar under the flat nav - listings)
    '.pnf-bcstrip{display:flex;align-items:center;flex-wrap:wrap;background:#fff;border-bottom:1px solid #E8E2D8;padding:10px 28px;font-family:var(--pnf-font);font-size:12.5px;color:#6A7A85;}',
    '.pnf-bcstrip a{color:#6A7A85;text-decoration:none;transition:color 0.15s;}',
    '.pnf-bcstrip a:hover{color:var(--pnf-accent);}',
    '.pnf-bcstrip .pnf-bcsep{margin:0 8px;color:#C2CCD2;}',
    '.pnf-bcstrip .pnf-bccurrent{color:var(--pnf-navy);font-weight:600;}',
    '@media (max-width:520px){.pnf-bcstrip{padding:9px 16px;font-size:12px;}}',
    // Breadcrumb (category/listing nav - retained, not deployed)
    '.pnf-breadcrumb{display:flex;align-items:center;gap:0;flex:1;overflow:hidden;font-size:12.5px;color:rgba(255,255,255,0.45);white-space:nowrap;min-width:0;}',
    '.pnf-breadcrumb a{color:rgba(255,255,255,0.5);text-decoration:none;transition:color 0.15s;flex-shrink:0;}',
    '.pnf-breadcrumb a:hover{color:var(--pnf-white);}',
    '.pnf-breadcrumb-sep{margin:0 6px;opacity:0.3;flex-shrink:0;}',
    '.pnf-breadcrumb-current{color:rgba(255,255,255,0.85);font-weight:600;overflow:hidden;text-overflow:ellipsis;min-width:0;}',
    // Back link (sales nav - retained, not deployed)
    '.pnf-back{font-family:var(--pnf-font);font-size:13px;font-weight:500;color:rgba(255,255,255,0.55);text-decoration:none;display:flex;align-items:center;gap:6px;transition:color 0.15s;position:absolute;left:50%;transform:translateX(-50%);}',
    '.pnf-back:hover{color:var(--pnf-white);}',
    '.pnf-nav-sales{position:relative;}',
    // Drawer
    '.pnf-drawer-overlay{display:block;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:190;opacity:0;pointer-events:none;transition:opacity 0.25s;}',
    '.pnf-drawer-overlay.open{opacity:1;pointer-events:all;}',
    '.pnf-drawer{position:fixed;top:0;left:0;bottom:0;width:min(300px,85vw);background:var(--pnf-navy);z-index:201;transform:translateX(-100%);transition:transform 0.28s cubic-bezier(0.4,0,0.2,1);display:flex;flex-direction:column;box-shadow:4px 0 24px rgba(0,0,0,0.35);overflow:hidden;}',
    '.pnf-drawer.open{transform:translateX(0);}',
    '.pnf-drawer-head{display:flex;align-items:center;justify-content:space-between;padding:0 18px;height:56px;border-bottom:1px solid rgba(255,255,255,0.08);flex-shrink:0;}',
    '.pnf-drawer-logo{display:flex;align-items:center;text-decoration:none;line-height:0;}',
    '.pnf-drawer-logo-img{height:34px;width:auto;max-width:220px;display:block;}',
    '.pnf-drawer-close{background:rgba(255,255,255,0.08);border:none;color:rgba(255,255,255,0.6);width:30px;height:30px;border-radius:50%;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;flex-shrink:0;}',
    '.pnf-drawer-nav{flex:1;overflow-y:auto;padding:10px 0;}',
    '.pnf-drawer-nav a{display:flex;align-items:center;gap:12px;padding:13px 20px;font-family:var(--pnf-font);font-size:15px;font-weight:500;color:rgba(255,255,255,0.65);text-decoration:none;border-left:3px solid transparent;transition:all 0.15s;}',
    '.pnf-drawer-nav a:hover,.pnf-drawer-nav a.active{color:var(--pnf-white);background:rgba(255,255,255,0.05);border-left-color:var(--pnf-accent);}',
    '.pnf-drawer-foot{padding:16px 18px;border-top:1px solid rgba(255,255,255,0.08);display:flex;flex-direction:column;gap:10px;flex-shrink:0;}',
    '.pnf-drawer-cta{display:block;text-align:center;background:var(--pnf-accent);color:var(--pnf-white);font-family:var(--pnf-font);font-size:14px;font-weight:700;padding:11px;border-radius:8px;text-decoration:none;}',
    '.pnf-drawer-fb{display:flex;align-items:center;justify-content:center;gap:8px;font-family:var(--pnf-font);font-size:13px;font-weight:600;color:rgba(255,255,255,0.45);text-decoration:none;}',
    '.pnf-drawer-fb:hover{color:var(--pnf-white);}',
    '.pnf-drawer-fb svg{width:14px;height:14px;}',
    '.pnf-drawer-link-sm{font-size:12px;color:rgba(255,255,255,0.4);text-decoration:none;text-align:center;padding:4px 0;font-family:var(--pnf-font);}',
    '.pnf-drawer-link-sm:hover{color:rgba(255,255,255,0.7);}',
    // Mobile breakpoint
    '@media(max-width:640px){',
    '.pnf-links{display:none;}',
    '.pnf-fb{display:none;}',
    '.pnf-ig{display:none;}',
    '.pnf-cta{display:none;}',
    '.pnf-nav{padding:0 16px;}',
    '.pnf-hamburger{display:flex;}',
    '}',
    // ── FOOTER (locked shell styling; markup stays inline per page) ──
    '.pnf-footer{background:var(--pnf-navy);padding:48px 28px 24px;overflow:hidden;}',
    '.pnf-footer-inner{max-width:1200px;margin:0 auto;}',
    '.pnf-footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:36px;margin-bottom:36px;}',
    '.pnf-footer-brand-col{grid-column:1;}',
    '@media (max-width:900px){.pnf-footer-grid{grid-template-columns:1fr 1fr;gap:24px 28px;}.pnf-footer-brand-col{grid-column:1 / -1;display:grid;grid-template-columns:1fr 1fr;gap:0 28px;align-items:start;}.pnf-footer-brand-col .pnf-footer-tagline{max-width:none;}}',
    '@media (max-width:480px){.pnf-footer-grid{grid-template-columns:1fr 1fr;gap:20px 20px;}.pnf-footer-brand-col{grid-column:1 / -1;display:block;margin-bottom:4px;}.pnf-footer-brand-col .pnf-footer-tagline{display:none;}}',
    '.pnf-footer-brand{margin-bottom:12px;line-height:0;}',
    '.pnf-footer-brand-img{height:54px;width:auto;max-width:320px;display:block;}',
    '.pnf-footer-brand span{color:var(--pnf-accent);}',
    '.pnf-footer-tagline{font-size:12.5px;color:rgba(255,255,255,0.38);line-height:1.7;margin-bottom:18px;max-width:280px;}',
    '.pnf-footer-social{display:flex;gap:8px;margin-bottom:16px;}',
    '.pnf-social-btn{display:flex;align-items:center;gap:7px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);border-radius:7px;padding:7px 12px;font-size:12px;font-weight:600;color:rgba(255,255,255,0.6);text-decoration:none;transition:all 0.15s;}',
    '.pnf-social-btn:hover{background:#1877F2;border-color:#1877F2;color:var(--pnf-white);}',
    '.pnf-social-btn.is-ig:hover{background:linear-gradient(45deg,#F58529,#DD2A7B,#8134AF);border-color:#DD2A7B;}',
    '.pnf-social-btn .fb-icon{font-size:14px;font-weight:800;}',
    '.pnf-social-btn svg{width:14px;height:14px;}',
    '.pnf-contact-link{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:600;color:var(--pnf-accent);cursor:pointer;background:none;border:none;padding:0;margin:0;font-family:var(--pnf-font);line-height:1.5;appearance:none;}',
    '.pnf-contact-link:hover{color:var(--pnf-white);}',
    '.pnf-footer-col h4{font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:12px;}',
    '.pnf-footer-col h4+h4{margin-top:20px;}',
    '.pnf-footer-links{list-style:none;display:flex;flex-direction:column;gap:7px;}',
    '.pnf-footer-links a{font-size:13px;color:rgba(255,255,255,0.5);text-decoration:none;transition:color 0.15s;}',
    '.pnf-footer-links a:hover{color:var(--pnf-white);}',
    '.pnf-footer-links button{font-size:13px;color:rgba(255,255,255,0.5);background:none;border:none;padding:0;cursor:pointer;font-family:var(--pnf-font);transition:color 0.15s;text-align:left;}',
    '.pnf-footer-links button:hover{color:var(--pnf-white);}',
    '.pnf-footer-bottom{border-top:1px solid rgba(255,255,255,0.08);padding-top:20px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;font-size:12px;color:rgba(255,255,255,0.25);}',
    '.pnf-footer-bottom a{color:rgba(255,255,255,0.35);text-decoration:none;}',
    '.pnf-footer-bottom a:hover{color:var(--pnf-white);}',
    '.pnf-footer-trust{margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.08);display:flex;flex-direction:column;gap:6px;list-style:none;}',
    '.pnf-footer-trust li{font-size:11.5px;color:rgba(255,255,255,0.55);display:flex;align-items:center;gap:8px;line-height:1.5;}',
    '.pnf-footer-trust li::before{content:\'\';width:5px;height:5px;border-radius:50%;background:#89BE43;flex-shrink:0;}',
    '.pnf-footer-popular{margin-top:32px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.08);}',
    '.pnf-footer-popular h4{font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:12px;}',
    '.pnf-footer-popular-list{font-size:12.5px;line-height:2;color:rgba(255,255,255,0.4);}',
    '.pnf-footer-popular-list a{color:rgba(255,255,255,0.6);text-decoration:none;transition:color 0.15s;}',
    '.pnf-footer-popular-list a:hover{color:var(--pnf-white);text-decoration:underline;}',
    '.pnf-footer-popular-list .sep{margin:0 8px;color:rgba(255,255,255,0.18);}',
    // ── CONTACT MODAL (footer "Get in touch") ──
    '.pnf-overlay{position:fixed;inset:0;background:rgba(36,59,89,0.7);backdrop-filter:blur(4px);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;pointer-events:none;transition:opacity 0.2s;}',
    '.pnf-overlay.open{opacity:1;pointer-events:all;}',
    '.pnf-modal{background:#fff;border-radius:16px;width:100%;max-width:520px;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,0.3);transform:translateY(16px);transition:transform 0.25s;}',
    '.pnf-overlay.open .pnf-modal{transform:translateY(0);}',
    '.pnf-modal-head{background:#243B59;padding:22px 28px 18px;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;}',
    '.pnf-modal-head h2{font-family:var(--pnf-display);font-size:1.2rem;font-weight:700;color:#fff;margin-bottom:3px;}',
    '.pnf-modal-head p{font-size:12.5px;color:rgba(255,255,255,0.5);}',
    '.pnf-modal-close{background:rgba(255,255,255,0.1);border:none;color:rgba(255,255,255,0.6);width:32px;height:32px;border-radius:50%;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.15s;line-height:1;}',
    '.pnf-modal-close:hover{background:rgba(255,255,255,0.2);color:#fff;}',
    '.pnf-modal-body{padding:24px 28px 28px;}',
    '.pnf-cf{display:flex;flex-direction:column;gap:14px;}',
    '.pnf-cf-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}',
    '@media (max-width:420px){.pnf-cf-row{grid-template-columns:1fr;}}',
    '.pnf-cf label{font-size:11px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:#5A6E78;margin-bottom:5px;display:block;}',
    '.pnf-cf input,.pnf-cf select,.pnf-cf textarea{width:100%;padding:11px 14px;border:1.5px solid #D8E4E8;border-radius:7px;font-family:var(--pnf-font);font-size:14px;color:#1A2832;background:#F7F3ED;outline:none;transition:border-color 0.2s;}',
    '.pnf-cf input:focus,.pnf-cf select:focus,.pnf-cf textarea:focus{border-color:#1B6B7D;background:#fff;}',
    '.pnf-cf textarea{resize:vertical;min-height:80px;line-height:1.55;}',
    '.pnf-cf-submit{width:100%;background:#1B6B7D;color:#fff;border:none;padding:13px;border-radius:8px;font-family:var(--pnf-font);font-size:15px;font-weight:700;cursor:pointer;transition:background 0.2s;margin-top:2px;}',
    '.pnf-cf-submit:hover{background:#0F4352;}',
    '.pnf-cf-submit:disabled{opacity:0.6;cursor:not-allowed;}',
    '.pnf-cf-fine{font-size:11.5px;color:#5A6E78;text-align:center;margin-top:6px;}',
    '.pnf-cf-success{display:none;text-align:center;padding:16px 0 8px;}',
    '.pnf-cf-success .pnf-tick{font-size:40px;margin-bottom:10px;}',
    '.pnf-cf-success h3{font-size:18px;font-weight:700;color:#1E6B3C;margin-bottom:6px;}',
    '.pnf-cf-success p{font-size:13.5px;color:#5A6E78;line-height:1.6;}',
    // ── MORE [SUBCAT] SECTION (Bronze tier + free-listing CTA) ──
    '.pnf-more-section{padding:0 24px 44px;}',
    '.pnf-more-inner{max-width:1200px;margin:0 auto;}',
    '.pnf-more-section .section{margin-bottom:36px;}',
    '.pnf-more-section .section-title{font-family:\'Playfair Display\',serif;font-size:1.15rem;font-weight:700;color:var(--navy,#243B59);margin-bottom:16px;padding-bottom:10px;border-bottom:2px solid var(--border,#DDE5EE);}',
    '.ghost-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px;margin-bottom:16px;}',
    '.ghost-card{background:#fff;border:1px solid var(--border,#DDE5EE);border-radius:9px;padding:14px 16px;display:flex;flex-direction:column;}',
    '.ghost-card.gc-empty{display:block;border-style:dashed;border-color:rgba(53,159,232,.3);background:rgba(53,159,232,.03);text-align:center;padding:20px 16px;}',
    '.gc-name{font-family:\'Playfair Display\',serif;font-size:.95rem;font-weight:700;color:var(--navy,#243B59);margin-bottom:3px;line-height:1.2;}',
    '.gc-sub{font-size:.7rem;color:var(--muted,#607080);margin-bottom:8px;display:flex;align-items:center;gap:4px;}',
    '.gc-desc{font-size:.78rem;color:var(--muted,#607080);line-height:1.55;margin-bottom:10px;}',
    '.gc-cta{font-size:.72rem;font-weight:700;color:var(--blue,#359FE8);}',
    '.gc-cta:hover{text-decoration:underline;}',
    // ── BRONZE-AS-CARD enrichment (Project_Master §8.2 locked 2026-06-04) ──
    // Bronze listings render fully inline in the sub-cat .ghost-grid (no separate page).
    // The 'More info' button opens the pnf-bz-modal lightbox with the full record.
    '.pnf-bz-live{border-color:rgba(53,159,232,.35);background:linear-gradient(135deg,#fff,#F8FCFF);}',
    '.pnf-bz-meta{display:flex;flex-direction:column;gap:5px;font-size:.74rem;color:var(--text,#1A2832);line-height:1.4;margin-bottom:10px;}',
    '.pnf-bz-meta a{color:var(--ocean,#1B6B7D);text-decoration:none;display:inline-flex;align-items:center;gap:5px;}',
    '.pnf-bz-meta a:hover{text-decoration:underline;}',
    '.pnf-bz-meta .pnf-i{width:0.85em;height:0.85em;flex-shrink:0;}',
    '.pnf-bz-more{margin-top:auto;background:rgba(53,159,232,.08);border:1px solid rgba(53,159,232,.25);color:var(--blue,#359FE8);font-family:\'Figtree\',sans-serif;font-size:.72rem;font-weight:700;padding:6px 12px;border-radius:5px;cursor:pointer;align-self:flex-start;transition:background .15s;}',
    '.pnf-bz-more:hover{background:rgba(53,159,232,.16);}',
    // Lightbox (uses the same overlay/modal shell as the contact modal)
    '.pnf-bz-modal h2{font-family:var(--pnf-display);font-size:1.3rem;font-weight:700;color:#fff;margin-bottom:5px;line-height:1.2;}',
    '.pnf-bz-modal .pnf-bz-modal-eyebrow{font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:7px;}',
    '.pnf-bz-modal .pnf-bz-modal-sub{font-size:12.5px;color:rgba(255,255,255,.55);margin-top:4px;}',
    '.pnf-bz-modal-body{padding:24px 28px 26px;}',
    '.pnf-bz-blurb{font-size:14px;color:var(--text,#1A2832);line-height:1.7;margin-bottom:18px;}',
    '.pnf-bz-contact{border-top:1px solid var(--border,#DDE5EE);padding-top:16px;display:flex;flex-direction:column;gap:10px;}',
    '.pnf-bz-ci{display:flex;gap:11px;align-items:flex-start;font-size:13.5px;color:var(--text,#1A2832);line-height:1.5;}',
    '.pnf-bz-ci .pnf-i{color:var(--ocean,#1B6B7D);width:1.05em;height:1.05em;flex-shrink:0;margin-top:1px;}',
    '.pnf-bz-ci a{color:var(--ocean,#1B6B7D);text-decoration:none;font-weight:600;}',
    '.pnf-bz-ci a:hover{text-decoration:underline;}',
    '.pnf-bz-foot{margin-top:18px;padding-top:14px;border-top:1px solid var(--border,#DDE5EE);font-size:12px;color:var(--muted,#607080);line-height:1.55;font-style:italic;}',
    '.pnf-bz-foot a{color:var(--ocean,#1B6B7D);font-weight:600;text-decoration:none;}',
    '.pnf-bz-foot a:hover{text-decoration:underline;}',
    '.pnf-more-cta{background:var(--navy,#243B59);border-radius:12px;padding:24px 28px;display:flex;align-items:center;gap:20px;flex-wrap:wrap;}',
    '.pnf-more-cta-body{flex:1;}',
    '.pnf-more-cta-body h3{font-family:\'Playfair Display\',serif;font-size:1.05rem;color:#fff;margin-bottom:4px;}',
    '.pnf-more-cta-body p{font-size:.82rem;color:rgba(255,255,255,.5);line-height:1.55;}',
    '.pnf-more-cta-btn{background:#89BE43;color:#243B59;font-size:.8rem;font-weight:800;padding:10px 22px;border-radius:7px;text-decoration:none;white-space:nowrap;transition:background .2s;flex-shrink:0;}',
    '.pnf-more-cta-btn:hover{background:#6DB03A;}'
  ].join('');
  document.head.appendChild(style);

  // ── HELPERS ─────────────────────────────────────────────────────────────
  var IG_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>';

  function el(tag, attrs, inner) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function(k) {
      if (k === 'html') e.innerHTML = attrs[k];
      else if (k === 'text') e.textContent = attrs[k];
      else e.setAttribute(k, attrs[k]);
    });
    if (inner) inner.forEach(function(c) { if (c) e.appendChild(c); });
    return e;
  }
  function logo(href) {
    var a = el('a', { href: href || BASE + '/homepage.html', 'class': 'pnf-logo', 'aria-label': 'Papamoa.info home' });
    a.innerHTML = '<img src="' + BASE + '/assets/papamoa-info-asset-pack/logo/papamoa-info-logo-transparent-400w.png" alt="Papamoa.info - Our Local Directory Online" class="pnf-logo-img">';
    return a;
  }
  function hamburger() {
    var btn = el('button', { 'class': 'pnf-hamburger', id: 'pnf-hamburger', 'aria-label': 'Open menu' });
    btn.innerHTML = '<span></span><span></span><span></span>';
    btn.addEventListener('click', pnfDrawerOpen);
    return btn;
  }
  function drawerHead() {
    var head = el('div', { 'class': 'pnf-drawer-head' });
    var l = el('a', { href: BASE + '/homepage.html', 'class': 'pnf-drawer-logo', 'aria-label': 'Papamoa.info home' });
    l.innerHTML = '<img src="' + BASE + '/assets/papamoa-info-asset-pack/logo/papamoa-info-logo-transparent-400w.png" alt="Papamoa.info" class="pnf-drawer-logo-img">';
    var close = el('button', { 'class': 'pnf-drawer-close', 'aria-label': 'Close menu', html: '<svg class="pnf-i" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6 18 18M18 6 6 18"/></svg>' });
    close.addEventListener('click', pnfDrawerClose);
    head.appendChild(l);
    head.appendChild(close);
    return head;
  }
  // Locked drawer (flat link list, no icons) + FB/IG follow links
  function defaultDrawer(currentPath) {
    var overlay = el('div', { 'class': 'pnf-drawer-overlay', id: 'pnf-drawer-overlay' });
    overlay.addEventListener('click', pnfDrawerClose);

    var drawer = el('div', { 'class': 'pnf-drawer', id: 'pnf-drawer' });
    drawer.appendChild(drawerHead());

    var dnav = el('nav', { 'class': 'pnf-drawer-nav' });
    var cur = normPath(currentPath);
    NAV_LINKS.forEach(function(item) {
      var isActive = isActiveItem(item.href, cur);
      dnav.appendChild(el('a', { href: item.href, 'class': isActive ? 'active' : '', text: item.label }));
    });
    drawer.appendChild(dnav);

    var foot = el('div', { 'class': 'pnf-drawer-foot' });
    foot.appendChild(el('a', { href: BASE + '/sales/list-with-us.html', 'class': 'pnf-drawer-cta', text: 'List Your Business' }));
    var fbLink = el('a', { href: 'https://www.facebook.com/papamoa.info/', target: '_blank', rel: 'noopener', 'class': 'pnf-drawer-fb' });
    fbLink.innerHTML = '<span style="font-weight:800;font-size:15px;">f</span> Follow on Facebook';
    foot.appendChild(fbLink);
    var igLink = el('a', { href: 'https://www.instagram.com/papamoa.info/', target: '_blank', rel: 'noopener', 'class': 'pnf-drawer-fb' });
    igLink.innerHTML = IG_SVG + ' Follow on Instagram';
    foot.appendChild(igLink);
    drawer.appendChild(foot);

    return [overlay, drawer];
  }

  // Active-tab detection (robust to .html stripping by dev servers + subcategory pages)
  function normPath(p) {
    return p.replace(/\/index\.html$/, '/').replace(/\.html$/, '').replace(/\/+$/, '') || '/';
  }
  function isActiveItem(href, cur) {
    var h = normPath(href);
    var catMatch = href.match(/\/categories\/[^/]+/);
    if (catMatch) {
      var prefix = normPath(BASE + catMatch[0]);
      return cur === prefix || cur.indexOf(prefix + '/') === 0;
    }
    return cur === h;
  }

  // Slim breadcrumb strip under the flat nav, built from body[data-breadcrumb].
  // Format: comma-separated segments, each "Label|/path" (linked) or "Label" (current).
  // Home is prepended automatically. Returns null when no data-breadcrumb is set.
  function breadcrumbStrip() {
    var raw = body.getAttribute('data-breadcrumb');
    if (!raw) return null;
    var strip = el('nav', { 'class': 'pnf-bcstrip', 'aria-label': 'Breadcrumb' });
    strip.appendChild(el('a', { href: BASE + '/homepage.html', text: 'Home' }));
    raw.split(',').forEach(function(segment) {
      strip.appendChild(el('span', { 'class': 'pnf-bcsep', html: '/' }));
      var parts = segment.split('|');
      if (parts.length === 2) strip.appendChild(el('a', { href: parts[1].trim(), text: parts[0].trim() }));
      else strip.appendChild(el('span', { 'class': 'pnf-bccurrent', text: parts[0].trim() }));
    });
    return strip;
  }

  // Locked nav link set (flat tabs)
  var NAV_LINKS = [
    { label: 'Home',      href: BASE + '/homepage.html' },
    { label: 'Info',      href: BASE + '/community/essential-info.html' },
    { label: 'Community', href: BASE + '/community/community.html' },
    { label: 'Stay',      href: BASE + '/categories/accommodation/accommodation.html' },
    { label: 'Do',        href: BASE + '/categories/activities/entertainment.html' },
    { label: 'Eat',       href: BASE + '/categories/food-drink/food-and-drink.html' },
    { label: 'Services',  href: BASE + '/categories/services/services.html' },
    { label: 'Shop',      href: BASE + '/categories/shops/shopping.html' }
  ];

  // ── DRAWER OPEN / CLOSE ─────────────────────────────────────────────────
  function pnfDrawerOpen() {
    var d = document.getElementById('pnf-drawer');
    var o = document.getElementById('pnf-drawer-overlay');
    var h = document.getElementById('pnf-hamburger');
    if (d) d.classList.add('open');
    if (o) o.classList.add('open');
    if (h) h.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function pnfDrawerClose() {
    var d = document.getElementById('pnf-drawer');
    var o = document.getElementById('pnf-drawer-overlay');
    var h = document.getElementById('pnf-hamburger');
    if (d) d.classList.remove('open');
    if (o) o.classList.remove('open');
    if (h) h.classList.remove('open');
    document.body.style.overflow = '';
  }
  // Expose for any inline onclick="pnfDrawerOpen()" left in legacy markup
  window.pnfDrawerOpen = pnfDrawerOpen;
  window.pnfDrawerClose = pnfDrawerClose;
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') pnfDrawerClose(); });
  // Swipe to close
  (function() {
    var startX = 0, startY = 0;
    document.addEventListener('touchstart', function(e) {
      var d = document.getElementById('pnf-drawer');
      if (!d || !d.classList.contains('open')) return;
      startX = e.touches[0].clientX; startY = e.touches[0].clientY;
    }, { passive: true });
    document.addEventListener('touchend', function(e) {
      var d = document.getElementById('pnf-drawer');
      if (!d || !d.classList.contains('open')) return;
      var dx = e.changedTouches[0].clientX - startX;
      var dy = Math.abs(e.changedTouches[0].clientY - startY);
      if (dx < -60 && dy < 60) pnfDrawerClose();
    }, { passive: true });
  })();

  // ── NAV: DEFAULT (locked flat nav, deployed site-wide) ──────────────────
  function buildDefault() {
    var currentPath = window.location.pathname;
    var nav = el('nav', { 'class': 'pnf-nav' });

    // Logo
    nav.appendChild(logo());

    // Links
    var links = el('div', { 'class': 'pnf-links' });
    var cur = normPath(currentPath);
    NAV_LINKS.forEach(function(item) {
      var isActive = isActiveItem(item.href, cur);
      links.appendChild(el('a', { href: item.href, 'class': 'pnf-link' + (isActive ? ' active' : ''), text: item.label }));
    });
    nav.appendChild(links);

    // Facebook
    nav.appendChild(el('a', { href: 'https://www.facebook.com/papamoa.info/', target: '_blank', rel: 'noopener', 'class': 'pnf-fb', title: 'Papamoa.info on Facebook', html: 'f' }));

    // Instagram
    nav.appendChild(el('a', { href: 'https://www.instagram.com/papamoa.info/', target: '_blank', rel: 'noopener', 'class': 'pnf-ig', title: 'Papamoa.info on Instagram', html: IG_SVG }));

    // CTA
    nav.appendChild(el('a', { href: BASE + '/sales/list-with-us.html', 'class': 'pnf-cta', text: 'List Your Business' }));

    // Hamburger
    nav.appendChild(hamburger());

    return [nav, breadcrumbStrip()].filter(Boolean).concat(defaultDrawer(currentPath));
  }

  // ── NAV: CATEGORY / LISTING (retained, not deployed) ────────────────────
  function buildCategory() {
    var nav = el('nav', { 'class': 'pnf-nav' });
    nav.appendChild(logo());

    var bc = el('div', { 'class': 'pnf-breadcrumb' });
    var rawCrumbs = body.getAttribute('data-breadcrumb') || '';
    bc.appendChild(el('a', { href: BASE + '/homepage.html', text: 'Home' }));
    if (rawCrumbs) {
      rawCrumbs.split(',').forEach(function(segment) {
        bc.appendChild(el('span', { 'class': 'pnf-breadcrumb-sep', html: '/' }));
        var parts = segment.split('|');
        if (parts.length === 2) bc.appendChild(el('a', { href: parts[1].trim(), text: parts[0].trim() }));
        else bc.appendChild(el('span', { 'class': 'pnf-breadcrumb-current', text: parts[0].trim() }));
      });
    }
    nav.appendChild(bc);
    nav.appendChild(el('a', { href: BASE + '/sales/list-with-us.html', 'class': 'pnf-cta', text: 'List Your Business' }));
    nav.appendChild(hamburger());
    return [nav].concat(defaultDrawer(window.location.pathname));
  }

  // ── NAV: SALES (retained, not deployed) ─────────────────────────────────
  function buildSales() {
    var nav = el('nav', { 'class': 'pnf-nav pnf-nav-sales' });
    nav.appendChild(logo());
    nav.appendChild(el('a', { href: BASE + '/homepage.html', 'class': 'pnf-back', html: '&larr; Directory' }));
    var ctaHref = body.getAttribute('data-cta-href') || '#contact';
    var ctaLabel = body.getAttribute('data-cta-label') || 'Get started →';
    nav.appendChild(el('a', { href: ctaHref, 'class': 'pnf-cta', text: ctaLabel }));
    nav.appendChild(hamburger());
    return [nav].concat(defaultDrawer(window.location.pathname));
  }

  // ── CONTACT MODAL (footer "Get in touch") ──────────────────────────────
  // Injected only where a page doesn't already have it inline, so the footer's
  // pnfOpenContact() works everywhere. Guarded so inline-modal pages are untouched.
  function pnfEnsureContactModal() {
    if (document.getElementById('pnf-contact-overlay')) return;
    var html =
      '<div class="pnf-overlay" id="pnf-contact-overlay" onclick="pnfOverlayClick(event)">' +
        '<div class="pnf-modal" role="dialog" aria-label="Contact Papamoa.info">' +
          '<div class="pnf-modal-head">' +
            '<div><h2>Get in touch</h2><p>We&rsquo;ll get back to you within one business day.</p></div>' +
            '<button class="pnf-modal-close" onclick="pnfCloseContact()" aria-label="Close">&times;</button>' +
          '</div>' +
          '<div class="pnf-modal-body">' +
            '<form class="pnf-cf" id="pnf-contact-form" onsubmit="pnfSubmitContact(event)">' +
              '<input type="hidden" name="form_name" value="contact-lightbox">' +
              '<input type="hidden" name="redirect" value="false">' +
              '<input type="text" name="botcheck" style="display:none" tabindex="-1" autocomplete="off">' +
              '<div class="pnf-cf-row">' +
                '<div><label>Your name *</label><input type="text" name="name" placeholder="Sarah" required></div>' +
                '<div><label>Email *</label><input type="email" name="email" placeholder="you@email.com" required></div>' +
              '</div>' +
              '<div><label>Enquiry type *</label>' +
                '<select name="enquiry_type" required id="pnf-enquiry-type">' +
                  '<option value="" disabled selected>Select a topic</option>' +
                  '<option value="General enquiry">General enquiry</option>' +
                  '<option value="Listing enquiry">Listing enquiry - I want to get listed</option>' +
                  '<option value="Spotlight Ad Spot">Spotlight Ad Spot - I want the top-of-sub-category slot</option>' +
                  '<option value="Listing support">Listing support - update or change my listing</option>' +
                  '<option value="Media enquiry">Media enquiry</option>' +
                  '<option value="News &amp; community notice">News &amp; community notice</option>' +
                  '<option value="Report an error">Report an error on the site</option>' +
                '</select>' +
              '</div>' +
              '<div><label>Message *</label><textarea name="message" placeholder="How can we help?" required></textarea></div>' +
              '<button type="submit" class="pnf-cf-submit" id="pnf-cf-btn">Send message &rarr;</button>' +
              '<p class="pnf-cf-fine">No spam &middot; We reply within one business day</p>' +
            '</form>' +
            '<div class="pnf-cf-success" id="pnf-cf-success">' +
              '<div class="pnf-tick">&#10003;</div>' +
              '<h3>Message received</h3>' +
              '<p>We&rsquo;ll be in touch within one business day.</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    document.body.appendChild(wrap.firstChild);

    if (typeof window.pnfOpenContact !== 'function') window.pnfOpenContact = function (type, ctx) {
      if (type) { var sel = document.getElementById('pnf-enquiry-type'); if (sel) { for (var i = 0; i < sel.options.length; i++) { if (sel.options[i].value === type) { sel.selectedIndex = i; break; } } } }
      // Pre-fill the message field when a Spotlight sub-cat context is passed.
      if (ctx && ctx.name) {
        var msg = document.querySelector('#pnf-contact-form textarea[name="message"]');
        if (msg && !msg.value) {
          var url = ctx.path ? ('https://papamoa.info/' + ctx.path.replace(/^\//, '')) : '';
          msg.value = "Hi - I'd like to enquire about the " + ctx.name + " Spotlight Ad Spot" + (url ? ' (' + url + ')' : '') + ". Please send details on availability, duration options and pricing.";
        }
      }
      document.getElementById('pnf-contact-overlay').classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    if (typeof window.pnfCloseContact !== 'function') window.pnfCloseContact = function () {
      document.getElementById('pnf-contact-overlay').classList.remove('open');
      document.body.style.overflow = '';
    };
    if (typeof window.pnfOverlayClick !== 'function') window.pnfOverlayClick = function (e) {
      if (e.target === document.getElementById('pnf-contact-overlay')) window.pnfCloseContact();
    };
    if (typeof window.pnfSubmitContact !== 'function') window.pnfSubmitContact = function (e) {
      e.preventDefault();
      var btn = document.getElementById('pnf-cf-btn');
      btn.textContent = 'Sending…'; btn.disabled = true;
      fetch('https://pb-forms.jkbrownnz.workers.dev/submit?client=papamoa', { method: 'POST', body: new FormData(document.getElementById('pnf-contact-form')) })
        .then(function (res) { return res.json(); })
        .then(function (json) {
          if (json.ok) { document.getElementById('pnf-contact-form').style.display = 'none'; document.getElementById('pnf-cf-success').style.display = 'block'; }
          else { btn.textContent = 'Try again'; btn.disabled = false; }
        })
        .catch(function () { btn.textContent = 'Try again'; btn.disabled = false; });
    };
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && typeof window.pnfCloseContact === 'function') window.pnfCloseContact(); });
  }

  // ── INJECT ───────────────────────────────────────────────────────────────
  var placeholder = document.getElementById('pnf-nav-placeholder');

  var elements;
  if (navType === 'category') elements = buildCategory();
  else if (navType === 'sales') elements = buildSales();
  else elements = buildDefault();

  elements.forEach(function(node) {
    if (placeholder) placeholder.parentNode.insertBefore(node, placeholder);
    else document.body.insertBefore(node, document.body.firstChild);
  });

  if (placeholder) placeholder.parentNode.removeChild(placeholder);

  pnfEnsureContactModal();

})();


/* ── Bronze free listings into the subcategory "More [subcat]" section ──
   Bronze-as-card model locked 2026-06-04 (Project_Master §8.2). On a sub-cat page
   that has a .ghost-grid, fetches /bronze-public for that sub-cat and renders the
   live free listings as full info-cards (name + address + phone + website + blurb
   + "More info" button that opens the pnf-bz-modal lightbox). No /listings/<slug>.html
   pages exist for Bronze under this model. Placeholder ghosts left in place. */
(function () {
  var WORKER = 'https://papamoa-claude-proxy.jkbrownnz.workers.dev';
  var m = location.pathname.match(/\/categories\/([a-z0-9-]+)\/([a-z0-9-]+)(?:\.html)?$/);
  if (!m) return;
  var LANDINGS = { 'accommodation':1, 'food-and-drink':1, 'services':1, 'shopping':1, 'entertainment':1 };
  if (LANDINGS[m[2]]) return;
  var subcatPath = m[1] + '/' + m[2];
  var BZ = []; // module-scope cache so the lightbox can look up by index

  function esc(s) { var x = document.createElement('div'); x.textContent = (s == null ? '' : s); return x.innerHTML; }
  function normUrl(u) { u = String(u || '').trim(); if (!u) return ''; return /^https?:\/\//i.test(u) ? u : 'https://' + u; }
  function displayUrl(u) { return u.replace(/^https?:\/\//, '').replace(/\/$/, ''); }

  var ICONS = {
    pin:   '<svg class="pnf-i" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    phone: '<svg class="pnf-i" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    web:   '<svg class="pnf-i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>'
  };

  function go() {
    var grid = document.querySelector('.ghost-grid');
    if (!grid) return;
    fetch(WORKER + '/bronze-public?subcat=' + encodeURIComponent(subcatPath))
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d && d.ok && d.items && d.items.length) {
          BZ = d.items;
          inject(grid, BZ);
          ensureModal();
        }
      })
      .catch(function () {});
  }

  function inject(grid, items) {
    var html = items.map(function (it, idx) {
      var phone = String(it.phone || '').trim();
      var website = normUrl(it.website);
      var rows = [];
      if (phone)   rows.push('<a href="tel:' + esc(phone.replace(/[^0-9+]/g, '')) + '">' + ICONS.phone + ' ' + esc(phone) + '</a>');
      if (website) rows.push('<a href="' + esc(website) + '" target="_blank" rel="noopener">' + ICONS.web + ' ' + esc(displayUrl(website)) + '</a>');
      return '<div class="ghost-card pnf-bz-live">'
        + '<div class="gc-name">' + esc(it.name) + '</div>'
        + '<div class="gc-sub">' + ICONS.pin + esc(it.address || 'Pāpāmoa') + '</div>'
        + (it.blurb ? '<p class="gc-desc">' + esc(it.blurb) + '</p>' : '')
        + (rows.length ? '<div class="pnf-bz-meta">' + rows.join('') + '</div>' : '')
        + '<button type="button" class="pnf-bz-more" onclick="pnfBzOpen(' + idx + ')">More info &rarr;</button>'
        + '</div>';
    }).join('');
    grid.insertAdjacentHTML('afterbegin', html);
  }

  // ── Lightbox -------------------------------------------------------------
  function ensureModal() {
    if (document.getElementById('pnf-bz-overlay')) return;
    var wrap = document.createElement('div');
    wrap.innerHTML =
      '<div class="pnf-overlay" id="pnf-bz-overlay" onclick="pnfBzOverlayClick(event)">' +
        '<div class="pnf-modal pnf-bz-modal" role="dialog" aria-label="Listing details">' +
          '<div class="pnf-modal-head">' +
            '<div>' +
              '<div class="pnf-bz-modal-eyebrow" id="pnf-bz-eyebrow">Free listing &middot; Pāpāmoa</div>' +
              '<h2 id="pnf-bz-name"></h2>' +
              '<p class="pnf-bz-modal-sub" id="pnf-bz-sub"></p>' +
            '</div>' +
            '<button class="pnf-modal-close" onclick="pnfBzClose()" aria-label="Close">&times;</button>' +
          '</div>' +
          '<div class="pnf-bz-modal-body">' +
            '<p class="pnf-bz-blurb" id="pnf-bz-blurb"></p>' +
            '<div class="pnf-bz-contact" id="pnf-bz-contact"></div>' +
            '<p class="pnf-bz-foot">This is a free Bronze listing on Papamoa.info. Business owners: want photos, a logo, an editorial write-up and your own dedicated page? <a href="/papamoa-previews/sales/list-with-us.html">See Silver &amp; Gold &rarr;</a></p>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(wrap.firstChild);

    window.pnfBzOpen = function (idx) {
      var it = BZ[idx]; if (!it) return;
      document.getElementById('pnf-bz-name').textContent = it.name || '';
      var subParts = [];
      if (it.subcategory) subParts.push(it.subcategory);
      if (it.address) subParts.push(it.address);
      document.getElementById('pnf-bz-sub').textContent = subParts.join(' · ');
      document.getElementById('pnf-bz-blurb').textContent = it.blurb || '';
      var phone = String(it.phone || '').trim();
      var website = normUrl(it.website);
      var rows = [];
      if (phone)       rows.push('<div class="pnf-bz-ci">' + ICONS.phone + '<span><a href="tel:' + esc(phone.replace(/[^0-9+]/g, '')) + '">' + esc(phone) + '</a></span></div>');
      if (website)     rows.push('<div class="pnf-bz-ci">' + ICONS.web   + '<span><a href="' + esc(website) + '" target="_blank" rel="noopener">' + esc(displayUrl(website)) + '</a></span></div>');
      if (it.address)  rows.push('<div class="pnf-bz-ci">' + ICONS.pin   + '<span><a href="https://maps.google.com/?q=' + encodeURIComponent(it.address + ', Papamoa, New Zealand') + '" target="_blank" rel="noopener">' + esc(it.address) + '</a></span></div>');
      document.getElementById('pnf-bz-contact').innerHTML = rows.join('');
      document.getElementById('pnf-bz-overlay').classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    window.pnfBzClose = function () {
      var ov = document.getElementById('pnf-bz-overlay'); if (ov) ov.classList.remove('open');
      document.body.style.overflow = '';
    };
    window.pnfBzOverlayClick = function (e) {
      if (e.target === document.getElementById('pnf-bz-overlay')) window.pnfBzClose();
    };
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.getElementById('pnf-bz-overlay').classList.contains('open')) window.pnfBzClose();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();
