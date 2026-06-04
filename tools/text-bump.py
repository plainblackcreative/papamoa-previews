#!/usr/bin/env python3
"""
Conservative readability bump for the genuinely-tiny text (Jay: "some is tiny").
Single-pass regex with a per-match callback so a 10px->11px is NOT then re-bumped
by the 11px->12px rule (sequential literal replaces would double-bump). Only the
smallest sizes move, by ~1px, to keep card/chip/footer layouts intact. 12px / .75rem
and larger are left alone. Same file scope as the colour sweep (excl docs/archive).
"""
import os, re

BUMP = {
    '9px': '11px', '9.5px': '11px', '10px': '11px', '10.5px': '11.5px',
    '11px': '12px', '11.5px': '12px',
    '.68rem': '.74rem', '.7rem': '.76rem', '.72rem': '.78rem',
}
PAT = re.compile(r'font-size:\s*((?:[0-9]*\.)?[0-9]+(?:px|rem))\b')

def bump_text(t):
    n = [0]
    def repl(m):
        val = m.group(1)
        if val in BUMP:
            n[0] += 1
            return 'font-size:' + BUMP[val]
        return m.group(0)
    return PAT.sub(repl, t), n[0]

def main():
    root = os.path.abspath(os.path.dirname(__file__) + '/..')
    total_files = total = 0
    changed = []
    for dp, dn, fn in os.walk(root):
        rel = os.path.relpath(dp, root)
        if rel.startswith('.git') or rel.startswith('archive') or rel.startswith('docs'):
            continue
        for f in fn:
            if not (f.endswith('.html') or f == 'nav.js' or f.endswith('.css')):
                continue
            p = os.path.join(dp, f)
            if os.path.relpath(p, root) == 'assets/colour-pilot.html':
                continue
            with open(p, 'r', encoding='utf-8') as fh:
                t = fh.read()
            nt, c = bump_text(t)
            if c:
                with open(p, 'w', encoding='utf-8') as fh:
                    fh.write(nt)
                total_files += 1; total += c
                changed.append((os.path.relpath(p, root), c))
    changed.sort(key=lambda x: -x[1])
    print(f"Files changed: {total_files}   Total bumps: {total}")
    for rp, c in changed[:10]:
        print(f"  {c:5d}  {rp}")

if __name__ == '__main__':
    main()
