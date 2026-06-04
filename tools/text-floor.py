#!/usr/bin/env python3
"""
Enforce a minimum readable font-size site-wide (Jay: "minimum text size the same
as this chat"). Floor = 15px. Any font-size below the floor (px or rem, assuming
16px root) is raised to it; px stays px, rem stays rem. Single-pass regex so
nothing is processed twice. Same scope as the colour sweep (excl docs/archive).
"""
import os, re

FLOOR_PX = 15.0
FLOOR_REM = FLOOR_PX / 16.0  # 0.9375
PAT = re.compile(r'font-size:\s*((?:[0-9]*\.)?[0-9]+)(px|rem)\b')

def floor_text(t):
    n = [0]
    def repl(m):
        val = float(m.group(1)); unit = m.group(2)
        px = val if unit == 'px' else val * 16.0
        if px < FLOOR_PX - 0.01:
            n[0] += 1
            return 'font-size:15px' if unit == 'px' else 'font-size:0.94rem'
        return m.group(0)
    return PAT.sub(repl, t), n[0]

def main():
    root = os.path.abspath(os.path.dirname(__file__) + '/..')
    files = total = 0; changed = []
    for dp, dn, fn in os.walk(root):
        rel = os.path.relpath(dp, root)
        if rel.startswith('.git') or rel.startswith('archive') or rel.startswith('docs'):
            continue
        for f in fn:
            if not (f.endswith('.html') or f == 'nav.js' or f.endswith('.css')):
                continue
            p = os.path.join(dp, f)
            with open(p, encoding='utf-8') as fh:
                t = fh.read()
            nt, c = floor_text(t)
            if c:
                with open(p, 'w', encoding='utf-8') as fh:
                    fh.write(nt)
                files += 1; total += c; changed.append((os.path.relpath(p, root), c))
    changed.sort(key=lambda x: -x[1])
    print(f"Floor=15px  Files changed: {files}  Total raised: {total}")
    for rp, c in changed[:8]:
        print(f"  {c:5d}  {rp}")

if __name__ == '__main__':
    main()
