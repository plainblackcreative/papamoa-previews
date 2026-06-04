/* ──────────────────────────────────────────────────────────────────────
   bronze-cards.js — surfaces approved (live) free Bronze listings as plain
   directory cards on category pages (Project_Master §8.2 step 5).

   Static-site friendly: reads the live listings from the Bronze Sheet via the
   public, cached Worker route /bronze-public, and renders them client-side
   into a slot. No tier label is shown (§8 - Bronze is a plain directory card).

   USAGE - on a page that should show its category's free listings, add:
     <div id="bronze-listings-slot" data-bronze-cat="services"></div>
     <script src="/papamoa-previews/assets/bronze-cards.js"></script>
   Optional: data-bronze-subcat="plumber" to filter to a subcategory.
   If there are no live listings (or the Worker isn't deployed yet), the slot
   renders nothing — safe no-op.
   ────────────────────────────────────────────────────────────────────── */
(function () {
  var WORKER = 'https://papamoa-claude-proxy.jkbrownnz.workers.dev';
  var BASE = '/papamoa-previews';

  function init() {
    var slot = document.getElementById('bronze-listings-slot');
    if (!slot) return;
    var cat = slot.getAttribute('data-bronze-cat') || '';
    var subcat = slot.getAttribute('data-bronze-subcat') || '';
    if (!cat && !subcat) return;

    var qs = [];
    if (cat) qs.push('cat=' + encodeURIComponent(cat));
    if (subcat) qs.push('subcat=' + encodeURIComponent(subcat));

    fetch(WORKER + '/bronze-public?' + qs.join('&'))
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data || !data.ok || !data.items || !data.items.length) return; // no-op when empty
        injectStyle();
        render(slot, data.items);
      })
      .catch(function () { /* worker not deployed / offline — silent no-op */ });
  }

  function esc(s) { var d = document.createElement('div'); d.textContent = (s == null ? '' : s); return d.innerHTML; }
  function normUrl(u) { u = String(u || '').trim(); if (!u) return ''; return /^https?:\/\//i.test(u) ? u : 'https://' + u; }

  function render(slot, items) {
    var cards = items.map(function (it) {
      var web = normUrl(it.website);
      var actions = '';
      actions += '<a class="pnf-bz-card-link" href="' + BASE + '/listings/' + esc(it.slug) + '.html">View listing &rarr;</a>';
      if (it.phone) actions += '<a class="pnf-bz-card-sec" href="tel:' + esc(String(it.phone).replace(/[^0-9+]/g, '')) + '">' + esc(it.phone) + '</a>';
      if (web) actions += '<a class="pnf-bz-card-sec" href="' + esc(web) + '" target="_blank" rel="noopener">Website</a>';
      return '<div class="pnf-bz-card">'
        + '<a class="pnf-bz-name" href="' + BASE + '/listings/' + esc(it.slug) + '.html">' + esc(it.name) + '</a>'
        + (it.subcategory ? '<div class="pnf-bz-sub">' + esc(it.subcategory) + '</div>' : '')
        + (it.address ? '<div class="pnf-bz-addr">' + esc(it.address) + '</div>' : '')
        + '<div class="pnf-bz-actions">' + actions + '</div>'
        + '</div>';
    }).join('');

    slot.innerHTML =
      '<div class="pnf-bz-band"><div class="pnf-bz-inner">'
      + '<div class="pnf-bz-head">'
      + '<h2 class="pnf-bz-title">More Pāpāmoa businesses</h2>'
      + '<p class="pnf-bz-note">Free community listings added by local businesses.</p>'
      + '</div>'
      + '<div class="pnf-bz-grid">' + cards + '</div>'
      + '<a class="pnf-bz-add" href="' + BASE + '/sales/create-bronze-listing.html">Add your business - free &rarr;</a>'
      + '</div></div>';
  }

  function injectStyle() {
    if (document.getElementById('pnf-bz-style')) return;
    var css =
      '.pnf-bz-band{background:#EDE7DB;border-top:1px solid #D8E4E8;}' +
      '.pnf-bz-inner{max-width:1100px;margin:0 auto;padding:44px 24px;}' +
      '.pnf-bz-head{margin-bottom:20px;}' +
      ".pnf-bz-title{font-family:'Playfair Display',serif;font-size:clamp(1.4rem,3vw,1.9rem);font-weight:700;color:#243B59;margin:0 0 4px;}" +
      '.pnf-bz-note{font-size:14px;color:#5A6E78;margin:0;}' +
      '.pnf-bz-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px;margin-bottom:22px;}' +
      '.pnf-bz-card{background:#fff;border:1px solid #D8E4E8;border-radius:12px;padding:18px 20px;display:flex;flex-direction:column;gap:4px;}' +
      ".pnf-bz-name{font-family:'Playfair Display',serif;font-size:1.05rem;font-weight:700;color:#243B59;text-decoration:none;line-height:1.25;}" +
      '.pnf-bz-name:hover{color:#1B6B7D;}' +
      '.pnf-bz-sub{font-size:12px;font-weight:600;color:#1B6B7D;text-transform:uppercase;letter-spacing:0.04em;}' +
      '.pnf-bz-addr{font-size:13px;color:#5A6E78;line-height:1.5;margin-top:2px;}' +
      '.pnf-bz-actions{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;margin-top:10px;}' +
      '.pnf-bz-card-link{font-size:13px;font-weight:700;color:#1B6B7D;text-decoration:none;}' +
      '.pnf-bz-card-link:hover{text-decoration:underline;}' +
      '.pnf-bz-card-sec{font-size:12.5px;color:#5A6E78;text-decoration:none;}' +
      '.pnf-bz-card-sec:hover{color:#1B6B7D;}' +
      '.pnf-bz-add{display:inline-block;font-size:13.5px;font-weight:700;color:#fff;background:#1B6B7D;padding:11px 22px;border-radius:8px;text-decoration:none;}' +
      '.pnf-bz-add:hover{background:#0F4352;}';
    var st = document.createElement('style');
    st.id = 'pnf-bz-style';
    st.textContent = css;
    document.head.appendChild(st);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
