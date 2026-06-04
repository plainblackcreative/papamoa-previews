#!/usr/bin/env python3
"""
Uniform-palette sweep (Jay: "every single page the same colour palette").
Recolour DECORATIVE warm tones (orange/brown/gold/tan/yellow) to the logo blue
family, lightness-preserving. KEEP semantic (red errors / amber warnings),
tier (Gold #B8840A / Bronze), and social brand colours. RED hues are kept by
rule. Excludes 404.html (playful) + sales-funnel.html (stale demo window chrome).
Prints the hex mapping for review; pass --apply to write.
"""
import os, re, sys, colorsys

# Explicit keepers (would otherwise be caught by the warm-hue rule)
KEEP = {
  # Gold / Bronze tier signals
  '#B8840A','#FBF3E2','#9A7060','#F5EDE8','#F5EDD8',
  # Silver tier
  '#5A7A8A','#EDF3F6',
  # Semantic amber / warning
  '#F59E0B','#D97706','#B45309','#92400E','#FCD34D','#FEF3C7','#FBBF24',
  '#F9A825','#8A5A00','#FFF8E6','#F57F17',
  # Semantic red / error (most also caught by the red-hue rule)
  '#E8344A','#DC2626','#D32F2F','#B71C1C','#8B2020','#C62828','#F87171',
  '#FCA5A5','#C03030','#7F0000',
  # Social brand
  '#1877F2','#DD2A7B','#F58529','#8134AF','#E1306C','#F77737','#E4405F',
  # window-dot chrome
  '#FF5F57','#FEBC2E','#28C840',
}
EXCLUDE_BASENAMES = {'404.html', 'sales-funnel.html'}

def hls(h):
    r,g,b = int(h[1:3],16)/255, int(h[3:5],16)/255, int(h[5:7],16)/255
    a,l,s = colorsys.rgb_to_hls(r,g,b)
    return a*360, s, l

def target(L):
    if L < 0.12: return '#0D2840'   # darkest navy
    if L < 0.28: return '#145079'   # navy fill
    if L < 0.45: return '#0F86B9'   # ocean
    if L < 0.62: return '#00B0F8'   # blue accent
    if L < 0.78: return '#6FC5EF'   # light blue
    return '#EAF4FA'                # cool tint (replaces beige/tan bg)

def is_warm_decorative(h):
    """Off-palette decorative colour -> convert. Keep: neutral greys, the green
    and blue/teal logo bands, SATURATED semantic reds, and the explicit list."""
    if h.upper() in KEEP: return False
    H,S,L = hls(h)
    if S < 0.12: return False                  # neutral grey -> leave
    if 70 <= H <= 165: return False            # green / lime family -> keep
    if 175 <= H <= 225: return False           # blue / teal / cyan family -> keep
    if (H >= 345 or H <= 15) and S >= 0.55:    # saturated red = error -> keep
        return False
    return True                                # warm, dusty-rose, mauve, purple, magenta -> convert

def build_map(root):
    seen = set()
    pat = re.compile(r'#[0-9A-Fa-f]{6}\b')
    for dp,dn,fn in os.walk(root):
        rel = os.path.relpath(dp, root)
        if rel.startswith(('.git','archive','docs')): continue
        for f in fn:
            if not (f.endswith('.html') or f=='nav.js' or f.endswith('.css')): continue
            if f in EXCLUDE_BASENAMES: continue
            try: t = open(os.path.join(dp,f),encoding='utf-8').read()
            except: continue
            for m in pat.findall(t):
                seen.add('#'+m[1:].upper())
    return {h: target(hls(h)[2]) for h in seen if is_warm_decorative(h)}

def main():
    root = os.path.abspath(os.path.dirname(__file__)+'/..')
    apply = '--apply' in sys.argv
    cmap = build_map(root)
    print(f"warm decorative hexes -> blue: {len(cmap)}")
    for h in sorted(cmap, key=lambda x: cmap[x]):
        print(f"  {h} -> {cmap[h]}")
    if not apply:
        print("\n(dry run -- pass --apply to write)"); return
    # apply: case-insensitive, boundary-guarded literal swaps
    pats = [(re.compile(re.escape(h)+r'(?![0-9A-Fa-f])', re.I), new) for h,new in cmap.items()]
    files=tot=0
    for dp,dn,fn in os.walk(root):
        rel = os.path.relpath(dp, root)
        if rel.startswith(('.git','archive','docs')): continue
        for f in fn:
            if not (f.endswith('.html') or f=='nav.js' or f.endswith('.css')): continue
            if f in EXCLUDE_BASENAMES: continue
            p=os.path.join(dp,f)
            t=open(p,encoding='utf-8').read(); n=0
            for pat,new in pats:
                t,c = pat.subn(new,t); n+=c
            if n:
                open(p,'w',encoding='utf-8').write(t); files+=1; tot+=n
    print(f"\nApplied: {files} files, {tot} swaps")

if __name__=='__main__':
    main()
