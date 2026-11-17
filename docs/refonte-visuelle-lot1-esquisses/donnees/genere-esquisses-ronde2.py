import math, os
import pathlib
OUT=str(pathlib.Path(__file__).resolve().parent.parent / "ronde2")
INK="#171a2f"; CREAM="#f7e7db"
SPEC=["#c2185b","#e27227","#d8b544","#7ab648","#3aab8a","#3a7fc1","#515792","#7a3fa0"]

def rose(size, ticks=True, letters=True, stroke=2, col=INK):
    c=size/2; R=size*0.34; out=[f'<svg width="{size}" height="{size}" viewBox="0 0 {size} {size}" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">']
    # bezel ticks (one ring of graduations, no filled rings)
    if ticks:
        rt=size*0.43
        for d in range(0,360,5):
            a=math.radians(d); l=size*(0.035 if d%15==0 else 0.018)
            x1=c+math.sin(a)*rt; y1=c-math.cos(a)*rt; x2=c+math.sin(a)*(rt+l); y2=c-math.cos(a)*(rt+l)
            out.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{col}" stroke-width="{stroke if d%15==0 else 1}"/>')
    # 8 rays, spectrum (rhombus: tip, two shoulders, centre)
    for k in range(8):
        a=math.radians(k*45); L=R if k%2==0 else R*0.66; w=size*0.05 if k%2==0 else size*0.036
        dx,dy=math.sin(a),-math.cos(a); px,py=-dy,dx
        tip=(c+dx*L,c+dy*L); sh=0.3*L
        p1=(c+dx*sh+px*w,c+dy*sh+py*w); p2=(c+dx*sh-px*w,c+dy*sh-py*w)
        out.append(f'<polygon points="{tip[0]:.1f},{tip[1]:.1f} {p1[0]:.1f},{p1[1]:.1f} {c:.1f},{c:.1f} {p2[0]:.1f},{p2[1]:.1f}" fill="{SPEC[k]}" stroke="{INK}" stroke-width="{stroke}" stroke-linejoin="miter"/>')
    out.append(f'<circle cx="{c}" cy="{c}" r="{size*0.018}" fill="{INK}"/>')
    if letters:
        for t,(dx,dy) in {"N":(0,-1),"E":(1,0),"S":(0,1),"O":(-1,0)}.items():
            out.append(f'<text x="{c+dx*size*0.485:.1f}" y="{c+dy*size*0.485+size*0.02:.1f}" text-anchor="middle" font-family="Helvetica Neue,Arial,sans-serif" font-weight="800" font-size="{size*0.06:.0f}" fill="{col}">{t}</text>')
    out.append('</svg>'); return "".join(out)

HEAD='<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=1440"><title>{t}</title><style>:root{{--ink:#171a2f;--cream:#f7e7db;--sand:#efcfb7;--whale:#515792;--royal:#262845;--autumn:#e27227;--ocre:#d8b544;--green:#3aab8a;--cyan:#3a7fc1;--lime:#7ab648}}*{{box-sizing:border-box;margin:0;hyphens:none;-webkit-hyphens:none;overflow-wrap:normal;word-break:keep-all}}body{{width:1440px;height:900px;overflow:hidden;background:var(--cream);color:var(--ink);font-family:"Helvetica Neue",Helvetica,Arial,sans-serif}}h1,h2{{white-space:nowrap}}{css}</style></head><body>{body}</body></html>'

# ---------- 1. ASSIGNED: carte et légende ----------
css1="""
nav{display:flex;align-items:center;justify-content:space-between;height:52px;padding:0 48px;background:var(--ink);color:#fff;font-weight:700;font-size:15px}
nav span{margin-left:28px;font-weight:600}nav .cta{background:var(--autumn);color:var(--ink);padding:11px 18px;border-radius:2px;font-weight:800;margin:0}
.band{position:relative;height:252px;border-bottom:4px solid var(--ink);padding:18px 48px 0;overflow:hidden}
.k{font-size:13px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
h1{font-size:176px;line-height:.86;font-weight:900;letter-spacing:-.05em;margin-top:8px}
.sub{font-size:32px;font-weight:900;letter-spacing:-.01em;white-space:nowrap;margin-top:6px}
.band svg{position:absolute;right:40px;top:14px}
.cols{display:grid;grid-template-columns:470px 1fr;height:calc(900px - 52px - 252px - 4px)}
.l{padding:26px 40px 22px 48px;display:flex;flex-direction:column;border-right:4px solid var(--ink)}
.lead{font-size:22px;line-height:1.3;font-weight:600}
.in{margin-top:auto;border:3px solid var(--ink)}.in a{display:flex;justify-content:space-between;padding:17px 18px;font-size:19px;font-weight:800;line-height:1.15}
.in a:first-child{background:var(--ink);color:#fff}.in a+a{border-top:3px solid var(--ink)}
.sup{font-size:13px;font-weight:600;margin-top:12px}
.r{padding:16px 40px 14px 32px;display:flex;flex-direction:column;gap:10px}
.leg{display:grid;grid-template-columns:repeat(5,1fr);border:3px solid var(--ink)}
.leg div{padding:9px 10px 10px;border-left:3px solid var(--ink);font-size:13px;line-height:1.25;font-weight:600}.leg div:first-child{border-left:0}
.leg b{display:flex;align-items:center;gap:8px;font-size:15px;font-weight:900;margin-bottom:3px}.leg i{display:inline-block;width:18px;height:18px;border:2px solid var(--ink)}
.sym{display:flex;gap:26px;font-size:13px;font-weight:700;align-items:center}
"""
body1=f"""<nav><div>Boussole<span>Projet</span><span>Expérience</span><span>Partenaires</span><span>Calendrier</span></div><span class="cta">Participer au projet</span></nav>
<div class="band"><div class="k">Carte du numérique culturel · outil en co-conception, en préparation</div><h1>Boussole</h1><div class="sub">numérique culture</div>{rose(226)}</div>
<div class="cols"><section class="l"><p class="lead">Situer vos pratiques numériques, voir ce qui compte et choisir une prochaine étape. Sans note.</p>
<div class="in"><a>Je suis artiste ou actif·ve dans la culture <span>→</span></a><a>Je représente un partenaire culturel <span>→</span></a></div>
<p class="sup">Avec le soutien de la Ville de Genève.</p></section>
<section class="r">
<svg viewBox="0 0 880 400" height="372" fill="none">
<rect x="0" y="0" width="300" height="190" fill="#515792" stroke="#171a2f" stroke-width="3"/><text x="18" y="34" fill="#fff" font-size="16" font-weight="800" font-family="Helvetica Neue,Arial">01</text><text x="18" y="170" fill="#fff" font-size="38" font-weight="900" letter-spacing="-1" font-family="Helvetica Neue,Arial">Outils</text>
<rect x="310" y="0" width="290" height="190" fill="#e27227" stroke="#171a2f" stroke-width="3"/><text x="328" y="34" fill="#171a2f" font-size="16" font-weight="800" font-family="Helvetica Neue,Arial">02</text><text x="328" y="170" fill="#171a2f" font-size="38" font-weight="900" letter-spacing="-1" font-family="Helvetica Neue,Arial">Compétences</text>
<rect x="610" y="0" width="270" height="190" fill="#3aab8a" stroke="#171a2f" stroke-width="3"/><text x="628" y="34" fill="#171a2f" font-size="16" font-weight="800" font-family="Helvetica Neue,Arial">03</text><text x="628" y="170" fill="#171a2f" font-size="38" font-weight="900" letter-spacing="-1" font-family="Helvetica Neue,Arial">Données</text>
<rect x="0" y="200" width="380" height="200" fill="#3a7fc1" stroke="#171a2f" stroke-width="3"/><text x="18" y="234" fill="#fff" font-size="16" font-weight="800" font-family="Helvetica Neue,Arial">04</text><text x="18" y="378" fill="#fff" font-size="38" font-weight="900" letter-spacing="-1" font-family="Helvetica Neue,Arial">Diffusion</text>
<rect x="390" y="200" width="490" height="200" fill="#7ab648" stroke="#171a2f" stroke-width="3"/><text x="408" y="234" fill="#171a2f" font-size="16" font-weight="800" font-family="Helvetica Neue,Arial">05</text><text x="408" y="378" fill="#171a2f" font-size="38" font-weight="900" letter-spacing="-1" font-family="Helvetica Neue,Arial">Collaboration</text>
<path d="M130 300 V195 H585 V62" stroke="#171a2f" stroke-width="5" stroke-dasharray="14 9" stroke-linejoin="miter"/>
<circle cx="130" cy="300" r="13" fill="#f7e7db" stroke="#171a2f" stroke-width="4"/><circle cx="130" cy="300" r="4" fill="#171a2f"/>
<rect x="150" y="288" width="128" height="26" fill="#f7e7db" stroke="#171a2f" stroke-width="2"/><text x="158" y="306" fill="#171a2f" font-size="14" font-weight="800" font-family="Helvetica Neue,Arial">Vous êtes ici</text>
<path d="M585 62 V22 L543 38 L585 54" fill="#171a2f" stroke="#171a2f" stroke-width="3" stroke-linejoin="miter"/>
<rect x="435" y="68" width="150" height="26" fill="#f7e7db" stroke="#171a2f" stroke-width="2"/><text x="443" y="86" fill="#171a2f" font-size="14" font-weight="800" font-family="Helvetica Neue,Arial">Prochaine étape</text>
</svg>
<div class="sym"><span>Exemple illustratif, sans données réelles.</span><span>● Vous êtes ici</span><span>⚑ Prochaine étape</span><span>- - Cap proposé</span></div>
<div class="leg"><div><b><i style="background:#515792"></i>01</b>Des outils plus cohérents avec les besoins et les usages.</div><div><b><i style="background:#e27227"></i>02</b>Des savoir-faire partagés, sans jugement ni classement.</div><div><b><i style="background:#3aab8a"></i>03</b>Des données plus lisibles et mieux maîtrisées.</div><div><b><i style="background:#3a7fc1"></i>04</b>Des canaux choisis pour les publics et les projets.</div><div><b><i style="background:#7ab648"></i>05</b>Des méthodes de travail qui soutiennent les personnes.</div></div>
</section></div>"""
open(f"{OUT}/01-carte-et-legende.html","w").write(HEAD.format(t="Carte — esquisse",css=css1,body=body1))

# ---------- 2. PICK: poteau de randonnée ----------
def plate(y,color,txt,fg,dirn,w=520,x=0,h=78,fs=36,sub=""):
    # arrow plate, tip left or right
    tip=34
    if dirn=="R": pts=f"{x},{y} {x+w-tip},{y} {x+w},{y+h/2} {x+w-tip},{y+h} {x},{y+h}"; tx=x+22
    else: pts=f"{x+tip},{y} {x+w},{y} {x+w},{y+h} {x+tip},{y+h} {x},{y+h/2}"; tx=x+tip+20
    s=f'<polygon points="{pts}" fill="{color}" stroke="{INK}" stroke-width="3"/>'
    s+=f'<text x="{tx}" y="{y+h/2+fs*0.34}" fill="{fg}" font-size="{fs}" font-weight="900" letter-spacing="-1" font-family="Helvetica Neue,Arial">{txt}</text>'
    if sub: s+=f'<text x="{tx}" y="{y+h-8}" fill="{fg}" font-size="13" font-weight="700" font-family="Helvetica Neue,Arial"></text>'
    return s
plates=[(30,"#515792","01 Outils","#fff","R",410,90),(120,"#e27227","02 Compétences","#171a2f","L",430,20),(210,"#3aab8a","03 Données","#171a2f","R",410,90),(300,"#3a7fc1","04 Diffusion","#fff","L",430,20),(390,"#7ab648","05 Collaboration","#171a2f","R",410,90)]
pl="".join(plate(y,c,t,f,d,w=w,x=x) for y,c,t,f,d,w,x in plates)
css2="""
nav{display:flex;align-items:center;justify-content:space-between;height:52px;padding:0 48px;font-weight:700;font-size:15px;border-bottom:4px solid var(--ink)}
nav span{margin-left:28px;font-weight:600}nav .cta{background:var(--autumn);color:var(--ink);padding:11px 18px;border-radius:2px;font-weight:800;margin:0}
.main{display:grid;grid-template-columns:1fr 600px;height:calc(900px - 52px - 4px)}
.l{padding:36px 48px 30px;display:flex;flex-direction:column;border-right:4px solid var(--ink)}
.k{font-size:13px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
h1{font-size:196px;line-height:.86;font-weight:900;letter-spacing:-.05em;margin-top:14px}
.sub{font-size:44px;font-weight:900;letter-spacing:-.02em;margin-top:6px;white-space:nowrap}
.lead{font-size:24px;line-height:1.3;font-weight:600;max-width:760px;margin-top:28px}
.in{margin-top:auto;display:grid;grid-template-columns:1fr 1fr;border:3px solid var(--ink)}.in a{padding:20px 20px;font-size:20px;font-weight:800;line-height:1.15}
.in a:first-child{background:var(--ink);color:#fff}.in a+a{border-left:3px solid var(--ink)}
.sup{font-size:13px;font-weight:600;margin-top:12px}
.r{position:relative;background:#fff;overflow:hidden}
.post{position:absolute;left:290px;top:60px;width:34px;height:540px;background:var(--ink)}
.gr{position:absolute;left:0;right:0;top:600px;height:4px;background:var(--ink)}
.r svg{position:absolute;left:30px;top:90px}
.note{position:absolute;left:30px;top:640px;font-size:16px;font-weight:700;width:520px;line-height:1.35}
"""
body2=f"""<nav><div>Boussole<span>Projet</span><span>Expérience</span><span>Partenaires</span><span>Calendrier</span></div><span class="cta">Participer au projet</span></nav>
<div class="main"><section class="l"><div class="k">Outil en co-conception · en préparation</div><h1>Boussole</h1><div class="sub">numérique culture</div>
<p class="lead">Situer vos pratiques numériques, voir ce qui compte et choisir une prochaine étape. Sans note.</p>
<div class="in"><a>Je suis artiste ou actif·ve dans la culture →</a><a>Je représente un partenaire culturel →</a></div><p class="sup">Avec le soutien de la Ville de Genève.</p></section>
<section class="r"><div class="post"></div><div class="gr"></div><svg width="540" height="480" viewBox="0 0 540 480" fill="none">{pl}</svg><div class="note">Les cinq dimensions à discuter. Chaque flèche indique une direction, pas un niveau.</div></section></div>"""
open(f"{OUT}/02-poteau-randonnee.html","w").write(HEAD.format(t="Poteau — esquisse",css=css2,body=body2))

# ---------- 3. CHALLENGER: le disque doublé ----------
css3="""
body{background:var(--royal);color:#fff}
nav{display:flex;align-items:center;justify-content:space-between;height:52px;padding:0 48px;font-weight:700;font-size:15px;border-bottom:3px solid #fff}
nav span{margin-left:28px;font-weight:600}nav .cta{background:var(--autumn);color:var(--ink);padding:11px 18px;border-radius:2px;font-weight:800;margin:0}
.main{display:grid;grid-template-columns:760px 1fr;height:calc(900px - 52px - 3px)}
.l{padding:40px 48px 30px;display:flex;flex-direction:column}
.k{font-size:13px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
h1{font-size:170px;line-height:.86;font-weight:900;letter-spacing:-.05em;margin-top:14px}
.sub{font-size:40px;font-weight:900;letter-spacing:-.02em;margin-top:6px;white-space:nowrap}
.lead{font-size:23px;line-height:1.3;font-weight:600;margin-top:26px;max-width:520px}
.sup{font-size:13px;font-weight:600;margin-top:auto}
.r{position:relative}
.top{position:absolute;left:40px;top:100px;width:560px;height:280px;background:var(--autumn);border-radius:280px 280px 0 0;color:var(--ink);padding:150px 90px 0;font-size:26px;font-weight:900;line-height:1.12;text-align:center}
.top small,.bot small{display:block;font-size:15px;font-weight:700;margin-top:8px}
.hor{position:absolute;left:0;right:0;top:380px;height:4px;background:#fff}
.bot{position:absolute;left:40px;top:384px;width:560px;height:280px;background:var(--whale);border-radius:0 0 280px 280px;color:#fff;padding:34px 90px 0;font-size:26px;font-weight:900;line-height:1.12;text-align:center}
.tk{position:absolute;left:-30px;top:32px}
.cap{position:absolute;left:40px;top:760px;width:600px;font-size:14px;font-weight:700;line-height:1.35}
"""
body3=f"""<nav><div>Boussole<span>Projet</span><span>Expérience</span><span>Partenaires</span><span>Calendrier</span></div><span class="cta">Participer au projet</span></nav>
<div class="main"><section class="l"><div class="k">Outil en co-conception · en préparation</div><h1>Boussole</h1><div class="sub">numérique culture</div>
<p class="lead">Une même démarche vue de deux côtés : celui des artistes, celui des partenaires qui les accompagnent.</p><p class="sup">Avec le soutien de la Ville de Genève.</p></section>
<section class="r"><div class="tk">{rose(700,ticks=True,letters=True,col="#fff").split('<polygon')[0]}</svg></div>
<div class="top">Je suis artiste ou actif·ve dans la culture →<small>Parcours artiste</small></div><div class="hor"></div><div class="bot">Je représente un partenaire culturel →<small>Parcours partenaire culturel</small></div>
<div class="cap">Le disque se complète : chaque choix apparaît des deux côtés de la ligne d’horizon, de haut en bas.</div></section></div>"""
open(f"{OUT}/03-disque-double.html","w").write(HEAD.format(t="Disque — esquisse",css=css3,body=body3))
print("ok")
