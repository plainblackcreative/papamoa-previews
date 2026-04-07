/**
 * Papamoa.info — Shared Nav
 * Injects the correct nav variant based on data-nav attribute on <body>.
 *
 * Usage:
 *   <body data-nav="default">          — Full nav (homepage, community, info pages)
 *   <body data-nav="category" data-breadcrumb="Food & Drink|/papamoa-previews/categories/food-drink/food-and-drink.html,Mumbai Masala">
 *                                      — Logo + breadcrumb + List Your Business CTA
 *   <body data-nav="sales" data-cta-label="Get started →" data-cta-href="#contact">
 *                                      — Logo + ← Directory + Get started CTA
 *
 * Breadcrumb format (data-breadcrumb):
 *   Comma-separated segments. Each segment is either:
 *     "Label|/path"   — linked crumb
 *     "Label"         — current page (no link, shown as active)
 *   Home is always prepended automatically.
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
    ':root{--pnf-navy:#0D2B3E;--pnf-accent:#3AABDE;--pnf-dune:#C4985A;--pnf-white:#FFFFFF;--pnf-muted:rgba(255,255,255,0.45);--pnf-font:\'Figtree\',sans-serif;--pnf-display:\'Playfair Display\',serif;}',
    '.pnf-nav{background:var(--pnf-navy);height:56px;padding:0 28px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:200;box-shadow:0 2px 12px rgba(0,0,0,0.25);gap:16px;width:100%;box-sizing:border-box;}',
    '.pnf-logo{font-family:var(--pnf-display);font-weight:700;font-size:15px;color:var(--pnf-white);text-decoration:none;flex-shrink:0;}',
    '.pnf-logo span{color:var(--pnf-accent);}',
    // Default nav links
    '.pnf-links{display:flex;align-items:center;gap:2px;flex:1;overflow-x:auto;scrollbar-width:none;}',
    '.pnf-links::-webkit-scrollbar{display:none;}',
    '.pnf-link{font-family:var(--pnf-font);font-size:13px;font-weight:500;color:var(--pnf-muted);text-decoration:none;padding:6px 12px;white-space:nowrap;transition:color 0.15s;border-bottom:2px solid transparent;}',
    '.pnf-link:hover{color:var(--pnf-white);}',
    '.pnf-link.active{color:var(--pnf-white);border-bottom-color:var(--pnf-accent);}',
    // CTA button
    '.pnf-cta{font-family:var(--pnf-font);font-size:13px;font-weight:700;background:var(--pnf-accent);color:var(--pnf-white);padding:8px 18px;border-radius:100px;text-decoration:none;white-space:nowrap;flex-shrink:0;transition:background 0.2s;}',
    '.pnf-cta:hover{background:#2d95c4;}',
    // Facebook icon
    '.pnf-fb{display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:6px;background:rgba(255,255,255,0.08);color:var(--pnf-muted);text-decoration:none;font-size:13px;font-weight:700;flex-shrink:0;transition:background 0.15s,color 0.15s;}',
    '.pnf-fb:hover{background:#1877F2;color:var(--pnf-white);}',
    // Hamburger
    '.pnf-hamburger{display:none;flex-direction:column;justify-content:center;gap:5px;width:36px;height:36px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:7px;cursor:pointer;padding:0 9px;flex-shrink:0;}',
    '.pnf-hamburger span{display:block;height:2px;background:rgba(255,255,255,0.75);border-radius:2px;transition:all 0.25s;}',
    '.pnf-hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}',
    '.pnf-hamburger.open span:nth-child(2){opacity:0;transform:scaleX(0);}',
    '.pnf-hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}',
    '.pnf-hamburger.open{opacity:0;pointer-events:none;}',
    // Breadcrumb (category/listing nav)
    '.pnf-breadcrumb{display:flex;align-items:center;gap:0;flex:1;overflow:hidden;font-size:12.5px;color:rgba(255,255,255,0.45);white-space:nowrap;min-width:0;}',
    '.pnf-breadcrumb a{color:rgba(255,255,255,0.5);text-decoration:none;transition:color 0.15s;flex-shrink:0;}',
    '.pnf-breadcrumb a:hover{color:var(--pnf-white);}',
    '.pnf-breadcrumb-sep{margin:0 6px;opacity:0.3;flex-shrink:0;}',
    '.pnf-breadcrumb-current{color:rgba(255,255,255,0.85);font-weight:600;overflow:hidden;text-overflow:ellipsis;min-width:0;}',
    // Back link (sales nav)
    '.pnf-back{font-family:var(--pnf-font);font-size:13px;font-weight:500;color:rgba(255,255,255,0.55);text-decoration:none;display:flex;align-items:center;gap:6px;transition:color 0.15s;position:absolute;left:50%;transform:translateX(-50%);}',
    '.pnf-back:hover{color:var(--pnf-white);}',
    '.pnf-nav-sales{position:relative;}', // needed for absolute-centred back link
    // Drawer
    '.pnf-drawer-overlay{display:block;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:190;opacity:0;pointer-events:none;transition:opacity 0.25s;}',
    '.pnf-drawer-overlay.open{opacity:1;pointer-events:all;}',
    '.pnf-drawer{position:fixed;top:0;left:0;bottom:0;width:min(300px,85vw);background:var(--pnf-navy);z-index:201;transform:translateX(-100%);transition:transform 0.28s cubic-bezier(0.4,0,0.2,1);display:flex;flex-direction:column;box-shadow:4px 0 24px rgba(0,0,0,0.35);overflow:hidden;}',
    '.pnf-drawer.open{transform:translateX(0);}',
    '.pnf-drawer-head{display:flex;align-items:center;justify-content:space-between;padding:0 18px;height:56px;border-bottom:1px solid rgba(255,255,255,0.08);flex-shrink:0;}',
    '.pnf-drawer-logo{font-family:var(--pnf-display);font-weight:700;font-size:15px;color:var(--pnf-white);text-decoration:none;}',
    '.pnf-drawer-logo span{color:var(--pnf-accent);}',
    '.pnf-drawer-close{background:rgba(255,255,255,0.08);border:none;color:rgba(255,255,255,0.6);width:30px;height:30px;border-radius:50%;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;flex-shrink:0;}',
    '.pnf-drawer-nav{flex:1;overflow-y:auto;padding:10px 0;}',
    '.pnf-drawer-nav a{display:flex;align-items:center;gap:12px;padding:13px 20px;font-family:var(--pnf-font);font-size:15px;font-weight:500;color:rgba(255,255,255,0.65);text-decoration:none;border-left:3px solid transparent;transition:all 0.15s;}',
    '.pnf-drawer-nav a:hover,.pnf-drawer-nav a.active{color:var(--pnf-white);background:rgba(255,255,255,0.05);border-left-color:var(--pnf-accent);}',
    '.pnf-drawer-nav a .dn-icon{font-size:17px;width:22px;text-align:center;flex-shrink:0;}',
    '.pnf-drawer-foot{padding:16px 18px;border-top:1px solid rgba(255,255,255,0.08);display:flex;flex-direction:column;gap:10px;flex-shrink:0;}',
    '.pnf-drawer-cta{display:block;text-align:center;background:var(--pnf-accent);color:var(--pnf-white);font-family:var(--pnf-font);font-size:14px;font-weight:700;padding:11px;border-radius:8px;text-decoration:none;}',
    '.pnf-drawer-fb{display:flex;align-items:center;justify-content:center;gap:8px;font-family:var(--pnf-font);font-size:13px;font-weight:600;color:rgba(255,255,255,0.45);text-decoration:none;}',
    '.pnf-drawer-fb:hover{color:var(--pnf-white);}',
    '.pnf-drawer-link-sm{font-size:12px;color:rgba(255,255,255,0.4);text-decoration:none;text-align:center;padding:4px 0;font-family:var(--pnf-font);}',
    '.pnf-drawer-link-sm:hover{color:rgba(255,255,255,0.7);}',
    // Mobile breakpoint
    '@media(max-width:640px){',
    '.pnf-links{display:none;}',
    '.pnf-fb{display:none;}',
    '.pnf-cta{display:none;}',
    '.pnf-nav{padding:0 16px;}',
    '.pnf-hamburger{display:flex;}',
    '}'
  ].join('');
  document.head.appendChild(style);

  // ── HELPERS ─────────────────────────────────────────────────────────────
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
    var a = el('a', { href: href || BASE + '/homepage.html', 'class': 'pnf-logo' });
    a.innerHTML = 'Papamoa<span>.info</span>';
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
    var l = el('a', { href: BASE + '/homepage.html', 'class': 'pnf-drawer-logo' });
    l.innerHTML = 'Papamoa<span>.info</span>';
    var close = el('button', { 'class': 'pnf-drawer-close', 'aria-label': 'Close menu', html: '&#10005;' });
    close.addEventListener('click', pnfDrawerClose);
    head.appendChild(l);
    head.appendChild(close);
    return head;
  }

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

  // ── NAV: DEFAULT ────────────────────────────────────────────────────────
  function buildDefault() {
    var currentPath = window.location.pathname;
    var nav = el('nav', { 'class': 'pnf-nav' });

    // Logo
    nav.appendChild(logo());

    // Links
    var links = el('div', { 'class': 'pnf-links' });
    var navLinks = [
      { label: 'Home',      href: BASE + '/homepage.html' },
      { label: 'Info',      href: BASE + '/community/essential-info.html' },
      { label: 'Community', href: BASE + '/community/community.html' },
      { label: 'Stay',      href: BASE + '/categories/accommodation/accommodation.html' },
      { label: 'Do',        href: BASE + '/categories/activities/entertainment.html' },
      { label: 'Eat',       href: BASE + '/categories/food-drink/food-and-drink.html' },
      { label: 'Services',  href: BASE + '/categories/services/services.html' },
      { label: 'Shop',      href: BASE + '/categories/shops/shopping.html' }
    ];
    navLinks.forEach(function(item) {
      var isActive = currentPath === item.href || currentPath.indexOf(item.href) === 0;
      var a = el('a', { href: item.href, 'class': 'pnf-link' + (isActive ? ' active' : ''), text: item.label });
      links.appendChild(a);
    });
    nav.appendChild(links);

    // Facebook
    var fb = el('a', { href: 'https://www.facebook.com/papamoa.info/', target: '_blank', rel: 'noopener', 'class': 'pnf-fb', title: 'Papamoa.info on Facebook', html: 'f' });
    nav.appendChild(fb);

    // CTA
    nav.appendChild(el('a', { href: BASE + '/sales/list-with-us.html', 'class': 'pnf-cta', text: 'List Your Business' }));

    // Hamburger
    nav.appendChild(hamburger());

    // Overlay + Drawer (default — full)
    var overlay = el('div', { 'class': 'pnf-drawer-overlay', id: 'pnf-drawer-overlay' });
    overlay.addEventListener('click', pnfDrawerClose);

    var drawer = el('div', { 'class': 'pnf-drawer', id: 'pnf-drawer' });
    drawer.appendChild(drawerHead());

    var dnav = el('nav', { 'class': 'pnf-drawer-nav' });
    var drawerLinks = [
      { label: 'Home',      href: BASE + '/homepage.html',                                       icon: '&#127968;' },
      { label: 'Info',      href: BASE + '/community/essential-info.html',                       icon: '&#128205;' },
      { label: 'Community', href: BASE + '/community/community.html',                            icon: '&#129309;' },
      { label: 'Stay',      href: BASE + '/categories/accommodation/accommodation.html',          icon: '&#127968;' },
      { label: 'Do',        href: BASE + '/categories/activities/entertainment.html',             icon: '&#127918;' },
      { label: 'Eat',       href: BASE + '/categories/food-drink/food-and-drink.html',            icon: '&#127829;' },
      { label: 'Services',  href: BASE + '/categories/services/services.html',                   icon: '&#128295;' },
      { label: 'Shop',      href: BASE + '/categories/shops/shopping.html',                      icon: '&#128717;' }
    ];
    drawerLinks.forEach(function(item) {
      var isActive = currentPath === item.href;
      var a = el('a', { href: item.href, 'class': isActive ? 'active' : '' });
      a.innerHTML = '<span class="dn-icon">' + item.icon + '</span>' + item.label;
      dnav.appendChild(a);
    });
    drawer.appendChild(dnav);

    var foot = el('div', { 'class': 'pnf-drawer-foot' });
    foot.appendChild(el('a', { href: BASE + '/sales/list-with-us.html', 'class': 'pnf-drawer-cta', text: 'List Your Business' }));
    var fbLink = el('a', { href: 'https://www.facebook.com/papamoa.info/', target: '_blank', rel: 'noopener', 'class': 'pnf-drawer-fb' });
    fbLink.innerHTML = '<span style="font-weight:800;font-size:15px;">f</span> Follow on Facebook';
    foot.appendChild(fbLink);
    drawer.appendChild(foot);

    return [nav, overlay, drawer];
  }

  // ── NAV: CATEGORY / LISTING ─────────────────────────────────────────────
  function buildCategory() {
    var nav = el('nav', { 'class': 'pnf-nav' });

    // Logo
    nav.appendChild(logo());

    // Breadcrumb
    var bc = el('div', { 'class': 'pnf-breadcrumb' });
    var rawCrumbs = body.getAttribute('data-breadcrumb') || '';

    // Always start with Home
    var homeA = el('a', { href: BASE + '/homepage.html', text: 'Home' });
    bc.appendChild(homeA);

    if (rawCrumbs) {
      rawCrumbs.split(',').forEach(function(segment) {
        var sep = el('span', { 'class': 'pnf-breadcrumb-sep', html: '/' });
        bc.appendChild(sep);
        var parts = segment.split('|');
        if (parts.length === 2) {
          // Linked crumb
          bc.appendChild(el('a', { href: parts[1].trim(), text: parts[0].trim() }));
        } else {
          // Current page (last crumb, no link)
          bc.appendChild(el('span', { 'class': 'pnf-breadcrumb-current', text: parts[0].trim() }));
        }
      });
    }
    nav.appendChild(bc);

    // CTA
    nav.appendChild(el('a', { href: BASE + '/sales/list-with-us.html', 'class': 'pnf-cta', text: 'List Your Business' }));

    // Hamburger
    nav.appendChild(hamburger());

    // Overlay + Drawer (full default drawer)
    var overlay = el('div', { 'class': 'pnf-drawer-overlay', id: 'pnf-drawer-overlay' });
    overlay.addEventListener('click', pnfDrawerClose);

    var drawer = el('div', { 'class': 'pnf-drawer', id: 'pnf-drawer' });
    drawer.appendChild(drawerHead());

    var dnav = el('nav', { 'class': 'pnf-drawer-nav' });
    var drawerLinks = [
      { label: 'Home',      href: BASE + '/homepage.html',                                       icon: '&#127968;' },
      { label: 'Info',      href: BASE + '/community/essential-info.html',                       icon: '&#128205;' },
      { label: 'Community', href: BASE + '/community/community.html',                            icon: '&#129309;' },
      { label: 'Stay',      href: BASE + '/categories/accommodation/accommodation.html',          icon: '&#127968;' },
      { label: 'Do',        href: BASE + '/categories/activities/entertainment.html',             icon: '&#127918;' },
      { label: 'Eat',       href: BASE + '/categories/food-drink/food-and-drink.html',            icon: '&#127829;' },
      { label: 'Services',  href: BASE + '/categories/services/services.html',                   icon: '&#128295;' },
      { label: 'Shop',      href: BASE + '/categories/shops/shopping.html',                      icon: '&#128717;' }
    ];
    drawerLinks.forEach(function(item) {
      var a = el('a', { href: item.href });
      a.innerHTML = '<span class="dn-icon">' + item.icon + '</span>' + item.label;
      dnav.appendChild(a);
    });
    drawer.appendChild(dnav);

    var foot = el('div', { 'class': 'pnf-drawer-foot' });
    foot.appendChild(el('a', { href: BASE + '/sales/list-with-us.html', 'class': 'pnf-drawer-cta', text: 'List Your Business' }));
    drawer.appendChild(foot);

    return [nav, overlay, drawer];
  }

  // ── NAV: SALES ──────────────────────────────────────────────────────────
  function buildSales() {
    var nav = el('nav', { 'class': 'pnf-nav pnf-nav-sales' });

    // Logo
    nav.appendChild(logo());

    // Back link (centred via absolute positioning in CSS)
    nav.appendChild(el('a', { href: BASE + '/homepage.html', 'class': 'pnf-back', html: '&larr; Directory' }));

    // CTA
    var ctaHref = body.getAttribute('data-cta-href') || '#contact';
    var ctaLabel = body.getAttribute('data-cta-label') || 'Get started \u2192';
    nav.appendChild(el('a', { href: ctaHref, 'class': 'pnf-cta', text: ctaLabel }));

    // Hamburger
    nav.appendChild(hamburger());

    // Overlay + Drawer (sales — simplified)
    var overlay = el('div', { 'class': 'pnf-drawer-overlay', id: 'pnf-drawer-overlay' });
    overlay.addEventListener('click', pnfDrawerClose);

    var drawer = el('div', { 'class': 'pnf-drawer', id: 'pnf-drawer' });
    drawer.appendChild(drawerHead());

    var dnav = el('nav', { 'class': 'pnf-drawer-nav' });
    var salesLinks = [
      { label: 'List Your Business', href: BASE + '/sales/list-with-us.html',   icon: '&#11088;' },
      { label: 'Menu Add-On',        href: BASE + '/sales/menu-addon.html',      icon: '&#128203;' },
      { label: 'Spotlight Ad Spots', href: BASE + '/sales/spotlight-ads.html',   icon: '&#128161;' }
    ];
    salesLinks.forEach(function(item) {
      var a = el('a', { href: item.href });
      a.innerHTML = '<span class="dn-icon">' + item.icon + '</span>' + item.label;
      dnav.appendChild(a);
    });
    drawer.appendChild(dnav);

    var foot = el('div', { 'class': 'pnf-drawer-foot' });
    foot.appendChild(el('a', { href: ctaHref, 'class': 'pnf-drawer-cta', text: ctaLabel }));
    // Contact + Legal as small links
    var contactBtn = document.createElement('button');
    contactBtn.className = 'pnf-drawer-link-sm';
    contactBtn.style.cssText = 'background:none;border:none;cursor:pointer;width:100%;';
    contactBtn.textContent = 'Contact Us';
    contactBtn.addEventListener('click', function() {
      pnfDrawerClose();
      if (typeof pnfOpenContact === 'function') pnfOpenContact();
    });
    foot.appendChild(contactBtn);
    foot.appendChild(el('a', { href: BASE + '/legal.html', 'class': 'pnf-drawer-link-sm', text: 'Privacy & Terms' }));
    drawer.appendChild(foot);

    return [nav, overlay, drawer];
  }

  // ── INJECT ───────────────────────────────────────────────────────────────
  var placeholder = document.getElementById('pnf-nav-placeholder');
  var insertBefore = placeholder || document.body.firstChild;

  var elements;
  if (navType === 'category') {
    elements = buildCategory();
  } else if (navType === 'sales') {
    elements = buildSales();
  } else {
    elements = buildDefault();
  }

  elements.forEach(function(el) {
    if (placeholder) {
      placeholder.parentNode.insertBefore(el, placeholder);
    } else {
      document.body.insertBefore(el, document.body.firstChild);
    }
  });

  if (placeholder) placeholder.parentNode.removeChild(placeholder);

})();
