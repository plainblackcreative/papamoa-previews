#!/usr/bin/env python3
"""
Logo colour re-anchor sweep (Project_Master colour guide, locked 2026-06-05).
LITERAL boundary-anchored hex swaps only -- no greedy regex (the 8902241 breakage
came from `[^;]*;`). Swaps nav.js + every page :root + inline hexes to the SAME
values so the nav.js-vs-page cascade order can't cause inconsistency.

Scope: all .html outside docs/ + archive/, plus nav.js + assets/css/*.css.
Defers: gold/tier (#B8840A/#C8962A/#FBF3E2/#A07020), browns, purple -- the EAT/Shop
hero rework (§4.4) needs imagery + design judgement, handled as a separate tranche.
"""
import os, re, sys

# old -> new (uppercase). Case-insensitive match, not followed by another hex digit.
HEX = {
    '#359FE8': '#00B0F8',  # blue accent
    '#243B59': '#145079',  # navy fill (nav/footer/headings)
    '#1B6B7D': '#0F86B9',  # ocean
    '#0F4352': '#0A4A66',  # ocean-deep (gradient base)
    '#1A5F70': '#17779B',  # ocean-mid
    '#F7F3ED': '#F2FAFE',  # sand -> cool bg
    '#F5EFE0': '#F2FAFE',  # sand-alt
    '#EDE7DB': '#E8F2F8',  # sand-dark -> cool divider
    '#89BE43': '#6CB71E',  # green (leaf fill compromise)
    '#6DB03A': '#5CA519',  # green hover (darker)
    '#1E6B3C': '#4F9E00',  # dark green
    '#7DC143': '#8FDB4D',  # lime / green-pulse
    '#C4985A': '#62C000',  # dune -> logo green
    '#D4C4A0': '#62C000',  # dune variant
    '#0A1825': '#06283A',  # navy hero base
    '#0F2030': '#0C3A52',  # navy hero mid
    '#102025': '#0A3040',  # navy hero stop
    '#102C3A': '#0C3A52',  # navy hero variant
    '#2D95C4': '#0096DC',  # mid-blue / cta hover
}
# rgba forms (accent tint + navy overlay) -- both lower/normal spacing variants
RGBA = {
    'rgba(53,159,232,': 'rgba(0,176,248,',   # accent tint
    'rgba(36,59,89,':   'rgba(20,80,121,',   # navy overlay/scrim
}

def sweep_text(t):
    n = 0
    for old, new in HEX.items():
        pat = re.compile(re.escape(old) + r'(?![0-9A-Fa-f])', re.IGNORECASE)
        t, c = pat.subn(new, t); n += c
    for old, new in RGBA.items():
        c = t.count(old); t = t.replace(old, new); n += c
    return t, n

def main():
    root = os.path.abspath(os.path.dirname(__file__) + '/..')
    targets = []
    for dp, dn, fn in os.walk(root):
        rel = os.path.relpath(dp, root)
        if rel.startswith('.git') or rel.startswith('archive') or rel.startswith('docs'):
            continue
        for f in fn:
            p = os.path.join(dp, f)
            relp = os.path.relpath(p, root)
            if relp == 'assets/colour-pilot.html':   # disposable pilot
                continue
            if f.endswith('.html') or f == 'nav.js' or (f.endswith('.css')):
                targets.append(p)
    total_files, total_repl = 0, 0
    changed = []
    for p in targets:
        with open(p, 'r', encoding='utf-8') as fh:
            t = fh.read()
        nt, n = sweep_text(t)
        if n > 0:
            with open(p, 'w', encoding='utf-8') as fh:
                fh.write(nt)
            total_files += 1; total_repl += n
            changed.append((os.path.relpath(p, root), n))
    changed.sort(key=lambda x: -x[1])
    print(f"Files changed: {total_files}   Total replacements: {total_repl}")
    print("Top 15 by count:")
    for rp, n in changed[:15]:
        print(f"  {n:5d}  {rp}")

if __name__ == '__main__':
    main()
