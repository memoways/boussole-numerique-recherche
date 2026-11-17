import sys
def lum(h):
    h=h.lstrip('#'); r,g,b=[int(h[i:i+2],16)/255 for i in (0,2,4)]
    f=lambda c: c/12.92 if c<=0.03928 else ((c+0.055)/1.055)**2.4
    return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)
def cr(a,b):
    la,lb=lum(a),lum(b); 
    if la<lb: la,lb=lb,la
    return (la+0.05)/(lb+0.05)
ink='#171a2f'; w='#ffffff'
tones={'whale-skin':'#515792','royal-curtsy':'#262845','dark-knight':'#171a2f','autumn':'#e27227','pizazz':'#e58441','skyline':'#989ab8','desert-field':'#efcfb7','coast-cream':'#f7e7db','vert positive':'#447b66','ocre attention':'#d8b544','orange AA #B8531A':'#B8531A','cyan #3a7fc1':'#3a7fc1','vert #3aab8a':'#3aab8a','lime #7ab648':'#7ab648','white':'#ffffff'}
for n,h in tones.items():
    print(f"{n:20s} {h}  ink:{cr(ink,h):5.2f}  white:{cr(w,h):5.2f}")
for extra in sys.argv[1:]:
    print(extra, f"ink:{cr(ink,extra):5.2f} white:{cr(w,extra):5.2f}")
