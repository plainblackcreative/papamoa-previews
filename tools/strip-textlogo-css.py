#!/usr/bin/env python3
"""
Strip the vestigial text-logo CSS. nav.js renders the logo as <img class="pnf-logo-img">,
so per-page `.pnf-logo{font-family...}` text styling and `.pnf-logo span{...}` are dead
(the <a class="pnf-logo"> has no text/span). Remove just those two rule patterns.
Brace-bounded ([^{}]*) so a match can never run past a single rule body. Dry-run by
default; --apply to write.
"""
import os, re, sys

# .pnf-logo { ...font-family... }   (the text-logo rule; requires font-family so nav.js's
# flex `.pnf-logo` rule -- which lives in nav.js, not the page -- is never a concern)
R_LOGO = re.compile(r'\s*\.pnf-logo\s*\{[^{}]*font-family[^{}]*\}')
R_SPAN = re.compile(r'\s*\.pnf-logo\s+span\s*\{[^{}]*\}')

def strip(t):
    t, a = R_LOGO.subn('', t)
    t, b = R_SPAN.subn('', t)
    return t, a + b

def main():
    root = os.path.abspath(os.path.dirname(__file__)+'/..')
    apply = '--apply' in sys.argv
    files = tot = 0; sample = []
    for dp, dn, fn in os.walk(root):
        rel = os.path.relpath(dp, root)
        if rel.startswith(('.git','archive','docs')): continue
        for f in fn:
            if not f.endswith('.html'): continue
            if f == 'nav-footer-snippet.html': continue   # the reference snippet keeps its sample
            p = os.path.join(dp, f)
            t = open(p, encoding='utf-8').read()
            nt, c = strip(t)
            if c:
                files += 1; tot += c
                if len(sample) < 5: sample.append((os.path.relpath(p, root), c))
                if apply: open(p,'w',encoding='utf-8').write(nt)
    print(f"{'APPLIED' if apply else 'DRY-RUN'}: {files} files, {tot} rule-removals")
    for s,c in sample: print(f"  {c}  {s}")

if __name__ == '__main__':
    main()
