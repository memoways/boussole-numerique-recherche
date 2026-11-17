#!/usr/bin/env python3
"""Generate the three lot 1 bis homepage sketches (story A, "Le panneau au départ").

Each sketch tells the whole home story, top to bottom:
departure (signpost + compass) -> on the path (one question) -> paths revealed
-> arrival (north, radar without rings, stakes) -> new signpost (next steps) -> entries.

Shared grammar (docs/refonte-visuelle-lot1bis/HISTOIRES_2026-11-17.md):
five paths = five hues = five bearings (36, 108, 180, 252, 324 degrees, north left free).
North is red-magenta, the one hue no path owns, and appears only at arrival.

Usage: python3 -I docs/refonte-visuelle-lot1bis/genere-esquisses.py <out_dir>
"""
import math
import pathlib
import sys

OUT = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else ".impeccable/mocks/decision")
OUT.mkdir(parents=True, exist_ok=True)

INK = "#171a2f"
INK2 = "#262845"
WHALE = "#515792"
NORTH = "#c2185b"  # white 5.87 : the person's own hue, used only at arrival
FONT = '"Helvetica Neue", Helvetica, Arial, sans-serif'  # provisional stand-in, lot 2 self-hosts a free grotesk

# id, name, bearing, hue, text colour on hue (measured AA)
PATHS = [
    ("outils", "Outils & workflows", 36, "#e27227", INK),        # ink 5.44
    ("donnees", "Données & archivage", 108, "#d8b544", INK),     # ink 8.66
    ("partage", "Partage & collaboration", 180, "#447b66", "#fff"),  # white 4.92
    ("publics", "Publics & communication", 252, "#2f6aa8", "#fff"),  # white 5.60
    ("competences", "Compétences & IA", 324, "#7a3fa0", "#fff"),  # white 6.89
]
P = {p[0]: p for p in PATHS}

# Claire's illustrative journey (client/src/data/demo-parcours.json)
LEVELS = ["Exploration", "Improvisation", "Organisé", "Orchestré"]
CLAIRE = {"outils": 3, "donnees": 2, "partage": 2, "competences": 1, "publics": 2}
STAKES = [  # (bearing between two paths, label, quote)
    (144, "Une même information à plusieurs endroits", "«\u00a0elles ne disent pas toutes la même chose\u00a0»"),
    (216, "Des validations dispersées dans les mails", "«\u00a0reconstituer qui a validé quoi\u00a0»"),
]
NORTH_QUOTE = "«\u00a0Qu’il y ait un seul endroit où le film existe vraiment.\u00a0»"
STEPS = [
    ("2 semaines", "Une fiche de référence par film", "Désigner un seul document pour la durée, le format, les crédits et le synopsis, et y renvoyer au lieu de recopier."),
    ("1 mois", "Le dossier de financement en une page", "Écrire les étapes, les pièces et qui valide : de quoi accueillir quelqu’un, ou donner du contexte à une IA."),
    ("3–6 mois", "Une base film d’où tout part", "Fiche, contrats, médias validés et suivi des validations, d’où partent les dossiers, la presse et le site."),
]
QUESTION = "Pour ton travail de tous les jours, qu’est-ce que tu ouvres le plus souvent ?"
ANSWERS = ["Gmail / Outlook", "WhatsApp", "Word", "Excel / Sheets", "Google Drive", "Dropbox", "WeTransfer", "Autre"]
CHOSEN = {"Gmail / Outlook", "Word", "Excel / Sheets", "Google Drive"}


def pt(cx, cy, r, deg):
    a = math.radians(deg)
    return cx + r * math.sin(a), cy - r * math.cos(a)


def arrow_svg(deg, size=28, color=INK, stroke=3.2):
    """A drawn bearing arrow (pictogram), rotated to the path's bearing."""
    c = size / 2
    return (f'<svg class="bearing" width="{size}" height="{size}" viewBox="0 0 {size} {size}" aria-hidden="true">'
            f'<g transform="rotate({deg} {c} {c})" fill="none" stroke="{color}" stroke-width="{stroke}" stroke-linecap="square">'
            f'<line x1="{c}" y1="{size*0.84}" x2="{c}" y2="{size*0.2}"/>'
            f'<polyline points="{c-size*0.27},{size*0.44} {c},{size*0.17} {c+size*0.27},{size*0.44}" stroke-linejoin="miter"/></g></svg>')


# ---------------------------------------------------------------- compasses
def compass_dial(size, active=None, north=False, style="gare", label=True):
    """Single graduation ring, no concentric circles. Cap arrow in the active path's hue.
    style 'gare': platform-clock discipline (bars). style 'plaque': baseplate compass ring (thin ticks)."""
    s = size
    cx = cy = s / 2
    R = s / 2 - 4
    out = [f'<svg class="dial" viewBox="0 0 {s} {s}" width="{s}" height="{s}" role="img" '
           f'aria-label="Boussole : {"cap sur " + P[active][1] if active else "cap"}{", nord posé" if north else ", nord à formuler à l’arrivée"}">']
    out.append(f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="#fff" stroke="{INK}" stroke-width="{3 if style=="gare" else 2}"/>')
    for d in range(0, 360, 5):
        if d in (35, 40, 105, 110, 175, 180, 185, 250, 255, 320, 325, 0, 5, 355):
            continue
        long = d % 45 == 0
        if style == "gare":
            r1, r2, w = (R - 6, R - (26 if long else 14), 4.5 if long else 2)
        else:
            r1, r2, w = (R - 5, R - (16 if long else 9), 1.6 if long else 1)
        x1, y1 = pt(cx, cy, r1, d)
        x2, y2 = pt(cx, cy, r2, d)
        out.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{INK}" stroke-width="{w}"/>')
    for pid, name, deg, hue, _ in PATHS:
        x1, y1 = pt(cx, cy, R - 6, deg)
        x2, y2 = pt(cx, cy, R - (40 if style == "gare" else 30), deg)
        on = pid == active
        out.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{hue}" '
                   f'stroke-width="{10 if style=="gare" else 8}" stroke-linecap="butt" opacity="{1 if on or not active else 1}"/>')
    # north index: hollow until posed
    tx, ty = cx, cy - R + 8
    tri = f'{tx-9},{ty+18} {tx+9},{ty+18} {tx},{ty}'
    out.append(f'<polygon points="{tri}" fill="{NORTH if north else "#fff"}" stroke="{NORTH if north else INK}" stroke-width="2.5" stroke-linejoin="miter"/>')
    if active:
        hue = P[active][3]
        deg = P[active][2]
        x2, y2 = pt(cx, cy, R - 50, deg)
        xb, yb = pt(cx, cy, 22, deg + 180)
        out.append(f'<line x1="{xb:.1f}" y1="{yb:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{INK}" stroke-width="{7 if style=="gare" else 5}"/>')
        out.append(f'<circle cx="{x2:.1f}" cy="{y2:.1f}" r="{s*0.055:.1f}" fill="{hue}" stroke="{INK}" stroke-width="2"/>')
    if north:
        x2, y2 = pt(cx, cy, R - 34, 0)
        out.append(f'<polygon points="{cx-8},{cy} {cx+8},{cy} {x2:.1f},{y2:.1f}" fill="{NORTH}"/>')
        out.append(f'<polygon points="{cx-8},{cy} {cx+8},{cy} {cx},{cy+R*0.5:.1f}" fill="{INK}"/>')
    out.append(f'<circle cx="{cx}" cy="{cy}" r="7" fill="{INK}"/>')
    out.append('</svg>')
    return "".join(out)


# ---------------------------------------------------------------- radar (no rings)
def radar(size, accent_frame=INK, label_bg="#fff"):
    s = size
    cx, cy = s / 2 + 150, s / 2 + 40
    R = s * 0.33
    out = [f'<svg class="radar" viewBox="0 0 {s+300} {s+80}" role="img" aria-label="Carte illustrative du parcours fictif de Claire : '
           + "; ".join(f"{P[k][1]} : {LEVELS[v-1]}" for k, v in CLAIRE.items()) + '">']
    # north axis (empty until posed) then needle
    xn, yn = pt(cx, cy, R + 34, 0)
    out.append(f'<line x1="{cx}" y1="{cy}" x2="{xn:.1f}" y2="{yn:.1f}" stroke="{NORTH}" stroke-width="3"/>')
    out.append(f'<polygon points="{cx-9},{yn+16:.1f} {cx+9},{yn+16:.1f} {cx},{yn-2:.1f}" fill="{NORTH}"/>')
    out.append(f'<text x="{cx+16}" y="{yn+12:.1f}" font-size="20" font-weight="700" fill="{INK}" class="lbl">Nord : ce qui compte pour Claire</text>')
    # paths as axes with four bornes each
    for pid, name, deg, hue, _ in PATHS:
        x2, y2 = pt(cx, cy, R, deg)
        out.append(f'<line x1="{cx}" y1="{cy}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{hue}" stroke-width="5"/>')
        for i in range(1, 5):
            bx, by = pt(cx, cy, R * i / 4, deg)
            px, py = pt(0, 0, 8, deg + 90)
            out.append(f'<line x1="{bx-px:.1f}" y1="{by-py:.1f}" x2="{bx+px:.1f}" y2="{by+py:.1f}" stroke="{INK}" stroke-width="2"/>')
    # shape
    pts = [pt(cx, cy, R * CLAIRE[p[0]] / 4, p[2]) for p in PATHS]
    out.append('<polygon points="' + " ".join(f"{x:.1f},{y:.1f}" for x, y in pts) + f'" fill="{INK}" fill-opacity=".07" stroke="{INK}" stroke-width="2.5" stroke-linejoin="round"/>')
    for (x, y), p in zip(pts, PATHS):
        out.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="7" fill="{p[3]}" stroke="{INK}" stroke-width="2"/>')
    # labels at the end of each path
    for pid, name, deg, hue, _ in PATHS:
        lx, ly = pt(cx, cy, R + 22, deg)
        anchor = "start" if 10 < deg < 170 else ("end" if 190 < deg < 350 else "middle")
        dy = 22 if deg == 180 else 5
        lvl = LEVELS[CLAIRE[pid] - 1]
        out.append(f'<text class="lbl" x="{lx:.1f}" y="{ly+dy:.1f}" text-anchor="{anchor}" font-size="20" font-weight="700" fill="{INK}">{name}</text>')
        out.append(f'<text class="lbl" x="{lx:.1f}" y="{ly+dy+24:.1f}" text-anchor="{anchor}" font-size="19" fill="{INK}">{lvl}</text>')
    # stakes between paths
    for deg, label, quote in STAKES:
        x, y = pt(cx, cy, R * 0.78, deg)
        out.append(f'<rect x="{x-7:.1f}" y="{y-7:.1f}" width="14" height="14" transform="rotate(45 {x:.1f} {y:.1f})" fill="{INK}"/>')
        short = label.split(" ")[1:3] if False else label
        anchor = "start" if deg < 180 else "end"
        dx = 14 if deg < 180 else -14
        words = label.split(" ")
        l1, l2 = " ".join(words[:3]), " ".join(words[3:])
        out.append(f'<text x="{x+dx:.1f}" y="{y+4:.1f}" text-anchor="{anchor}" font-size="17" fill="{INK}" class="lbl">{l1}</text>')
        if l2:
            out.append(f'<text x="{x+dx:.1f}" y="{y+20:.1f}" text-anchor="{anchor}" font-size="17" fill="{INK}" class="lbl">{l2}</text>')
    out.append('</svg>')
    legend = "".join(f'<li><i style="background:{p[3]}"></i><b>{p[1]}</b><span>{LEVELS[CLAIRE[p[0]]-1]}</span></li>' for p in PATHS)
    return "".join(out) + f'<ul class="legend" aria-hidden="true">{legend}<li><i style="background:{NORTH}"></i><b>Nord</b><span>ce qui compte pour Claire</span></li></ul>'


def esc(t):
    return t.replace("&", "&amp;")


BASE_CSS = f"""
*{{box-sizing:border-box;margin:0;padding:0}}
html{{-webkit-text-size-adjust:100%}}
body{{font-family:{FONT};color:{INK};background:#fff;font-size:18px;line-height:1.5;-webkit-font-smoothing:antialiased}}
::selection{{background:{INK};color:#fff}}
a{{color:inherit}}
a:focus-visible,button:focus-visible{{outline:3px solid {WHALE};outline-offset:3px}}
.wrap{{max-width:1440px;margin:0 auto;padding-left:64px!important;padding-right:64px!important}}
.title{{font-weight:700;letter-spacing:-.045em;line-height:.86;white-space:nowrap;hyphens:none;word-break:keep-all}}
.title b{{display:block;font-size:min(17.5vw,168px)}}
.title span{{display:block;font-size:min(7.6vw,52px);letter-spacing:-.02em;line-height:1.05;font-weight:500;margin-top:.28em}}
.hook{{font-size:clamp(22px,2.3vw,32px);line-height:1.18;font-weight:700;letter-spacing:-.015em;max-width:24ch}}
.lede{{font-size:clamp(17px,1.35vw,19px);max-width:46ch}}
.honest{{font-size:15px;max-width:52ch}}
.cta{{display:inline-flex;align-items:center;gap:14px;min-height:60px;padding:0 26px;font-weight:700;font-size:20px;text-decoration:none;border-radius:2px}}
.cta svg{{flex:none}}
.h2{{font-size:clamp(30px,3.6vw,52px);line-height:1.02;letter-spacing:-.03em;font-weight:700;max-width:18ch}}
.q{{font-size:clamp(26px,3vw,42px);line-height:1.12;letter-spacing:-.02em;font-weight:700;max-width:22ch}}
.note{{font-size:14px}}
.chips{{display:flex;flex-wrap:wrap;gap:8px;margin-top:22px}}
.chip{{min-height:44px;display:inline-flex;align-items:center;padding:0 14px;border:2px solid {INK};font-weight:600;font-size:16px;border-radius:2px}}
.radar{{width:100%;height:auto;max-width:700px;font-family:{FONT}}}
.dial{{display:block;width:100%;height:auto}}
.menu-m{{display:none}}
.legend{{list-style:none;display:none;margin-top:16px;font-size:16px}}
.legend li{{display:grid;grid-template-columns:18px 1fr auto;gap:10px;align-items:center;padding:8px 0;border-top:1px solid {INK}}}
.legend i{{width:14px;height:14px}} .legend span{{text-align:right}}
@media (max-width:820px){{.wrap{{padding-left:16px!important;padding-right:16px!important}} .radar .lbl{{display:none}} .menu-m{{display:inline-flex!important}} .legend{{display:block}} .radar{{max-width:420px;margin:0 auto;display:block}}}}
"""


def nav(theme):
    fg = "#fff" if theme == "dark" else INK
    bg = INK2 if theme == "dark" else "#fff"
    border = "none" if theme == "dark" else f"2px solid {INK}"
    return f"""<header style="background:{bg};color:{fg};border-bottom:{border}">
<div class="wrap" style="display:flex;justify-content:space-between;align-items:center;min-height:56px;gap:16px">
<a href="/" style="text-decoration:none;font-weight:700;font-size:16px;white-space:nowrap">Boussole numérique culture</a>
<nav aria-label="Navigation principale" class="mainnav" style="display:flex;gap:28px;font-size:16px;font-weight:600">
<a href="/projet" style="text-decoration:none">Le projet</a><a href="/experience" style="text-decoration:none">L’expérience</a>
<a href="/participer" style="text-decoration:none">Participer</a><a href="/nouvelles" style="text-decoration:none">Nouvelles</a></nav>
<a href="#menu" class="menu-m" style="font-weight:700;font-size:16px;min-height:44px;align-items:center;text-decoration:underline;text-underline-offset:4px">Menu</a>
</div></header>"""


def arrow_right(color, w=22):
    return (f'<svg width="{w}" height="{w}" viewBox="0 0 22 22" aria-hidden="true"><g fill="none" stroke="{color}" stroke-width="3" stroke-linecap="square">'
            f'<line x1="2" y1="11" x2="18" y2="11"/><polyline points="11,4 18,11 11,18"/></g></svg>')


def entries(style_block):
    return style_block


# ======================================================================
# A. GARE : platform signage system (assigned)
# ======================================================================
def page_gare():
    def panel(p, state, right=""):
        pid, name, deg, hue, txt = p
        on = state == "on"
        fill = hue if on else "#fff"
        color = txt if on else INK
        sq = INK if on else hue
        arr = arrow_svg(deg, 26, "#fff" if on else txt)
        label = name if state in ("on", "done") else "Chemin à découvrir"
        return f"""<li class="sign {state}"><span class="in" style="background:{fill};color:{color}"><span class="sq" style="background:{sq}">{arr}</span>
<span class="nm">{label}</span><span class="rt">{right}</span></span></li>"""

    mast_panels = "".join(
        panel(p, "on" if p[0] == "outils" else "hidden", "par ici" if p[0] == "outils" else "") for p in PATHS)
    reveal_panels = "".join(panel(p, s, r) for p, s, r in [
        (P["outils"], "done", "parcouru"), (P["donnees"], "on", "en cours"),
        (P["partage"], "hidden", ""), (P["publics"], "hidden", ""), (P["competences"], "hidden", "")])
    board = "".join(f"""<li><span class="hz">{h}</span><span class="ds"><b>{t}</b><span>{d}</span></span>
<span class="tip" aria-hidden="true">{arrow_svg(0, 26, NORTH, 3.4)}</span></li>""" for h, t, d in STEPS)
    css = BASE_CSS + f"""
.station{{background:{INK2};color:#fff}}
.station .wrap{{display:grid;grid-template-columns:minmax(0,1fr) 250px;gap:48px;align-items:center;padding-top:22px;padding-bottom:22px}}
.nameboard{{box-shadow:inset 0 0 0 3px #fff;padding:30px 40px 34px}}
.station .dial{{width:250px}}
.hero{{display:grid;grid-template-columns:minmax(0,1fr) 470px;gap:56px;padding:44px 0 64px;align-items:start}}
.hero .copy{{display:flex;flex-direction:column;gap:24px;padding-left:43px}}
.post{{position:relative}}
.post::before{{content:"";position:absolute;left:23px;top:-44px;bottom:-64px;width:14px;background:{INK}}}
.signs{{list-style:none;display:flex;flex-direction:column;gap:8px;position:relative}}
.sign{{background:{INK};clip-path:polygon(0 0,calc(100% - 28px) 0,100% 50%,calc(100% - 28px) 100%,0 100%)}}
.sign .in{{display:grid;grid-template-columns:60px 1fr auto;align-items:center;min-height:60px;margin:2px;padding-right:38px;
clip-path:polygon(0 0,calc(100% - 27px) 0,100% 50%,calc(100% - 27px) 100%,0 100%)}}
.sign .sq{{width:60px;height:60px;display:grid;place-items:center}}
.mobile-only{{display:none}}
.sign .nm{{font-weight:700;font-size:19px;padding:0 14px;letter-spacing:-.01em}}
.sign .rt{{font-size:15px;font-weight:600}}
.clock{{position:relative;margin:26px 0 0 -2px;width:300px}}
.clock figcaption{{margin-top:14px;font-size:15px;max-width:30ch}}
.band{{background:{INK2};color:#fff}}
.path{{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:56px;padding:72px 0;align-items:center}}
.path figure .dial{{max-width:340px}} .path .chip{{border-color:#fff;color:#fff}} .path .chip.on{{background:#fff;color:{INK}}}
.reveal{{display:grid;grid-template-columns:420px minmax(0,1fr);gap:72px;padding:88px 0;align-items:start}}
.arrive{{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:56px;padding:88px 0;border-top:2px solid {INK}}}
.stakes{{list-style:none;margin-top:28px;display:grid;gap:18px}}
.stakes li{{display:grid;grid-template-columns:22px 1fr;gap:12px;font-size:17px}}
.stakes i{{width:13px;height:13px;background:{INK};transform:rotate(45deg);margin-top:6px}}
.board{{background:{INK2};color:#fff;padding:0}}
.board ol{{list-style:none}}
.board li{{display:grid;grid-template-columns:200px minmax(0,1fr) 60px;gap:24px;align-items:center;padding:24px 0;border-top:1px solid rgba(255,255,255,.28)}}
.board .hz{{font-size:clamp(26px,2.6vw,38px);font-weight:700;letter-spacing:-.02em;white-space:nowrap}}
.board .ds b{{display:block;font-size:22px}} .board .ds span{{display:block;color:#d9dae6;font-size:16px;max-width:60ch}}
.board .tip{{justify-self:end;background:#fff;width:44px;height:44px;display:grid;place-items:center}}
.entries{{display:grid;grid-template-columns:1fr 1fr;gap:0;border-top:2px solid {INK}}}
.entries a{{display:block;padding:40px 40px 40px 0;text-decoration:none}}
.entries a+a{{border-left:2px solid {INK};padding-left:40px}}
.entries b{{display:block;font-size:26px;letter-spacing:-.02em;margin-bottom:8px}}
footer{{border-top:2px solid {INK};padding:28px 0 40px;font-size:15px}}
@media (max-width:1100px){{.hero{{grid-template-columns:minmax(0,1fr) 380px;gap:36px}}}}
@media (max-width:820px){{
.mainnav{{display:none!important}}
.station .wrap{{grid-template-columns:1fr;padding-top:14px;padding-bottom:14px}} .station .dial{{display:none}}
.nameboard{{padding:18px 16px 20px}} .station .title b{{font-size:min(16vw,168px)}}
.hero .copy{{padding-left:0}}
.mobile-only{{display:block}}
.hero,.path,.reveal,.arrive{{grid-template-columns:1fr;gap:32px;padding:32px 0 48px}}
.post::before{{top:0;bottom:0}}
.path figure{{max-width:220px}}
.board li{{grid-template-columns:1fr 44px;gap:8px 16px}} .board .ds{{grid-column:1/-1;grid-row:2}}
.entries{{grid-template-columns:1fr}} .entries a+a{{border-left:none;border-top:2px solid {INK};padding-left:0}}
.sign .nm{{font-size:17px}}
}}
"""
    html = f"""<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Esquisse A — Signalétique de quai</title><style>{css}</style></head><body>
{nav("dark")}
<main>
<section class="station" aria-labelledby="t">
 <div class="wrap">
  <div class="nameboard"><h1 id="t" class="title"><b>Boussole</b><span>numérique culture</span></h1></div>
  {compass_dial(250, "outils", False, "gare")}
 </div>
</section>
<section class="wrap hero" aria-label="Le départ">
 <div class="copy">
  <p class="hook">Cinq chemins. Tous comptent. On les parcourt ensemble, en conversation.</p>
  <p class="lede">Pour les artistes et les structures qui les accompagnent : on répond à des questions, chemin après chemin, et l’on repart avec sa carte et ses prochaines étapes.</p>
  <p><a class="cta" href="/experience/demo" style="background:#b8531a;color:#fff">Prendre la boussole {arrow_right("#fff")}</a></p>
  <p class="honest"><b>La Boussole n’existe pas encore.</b> La démonstration suit le parcours d’une personne fictive ; l’outil se construit avec le secteur.</p>
 </div>
 <div class="post">
  <ul class="signs" aria-label="Les cinq chemins">{mast_panels}</ul>
  <p class="note" style="margin:16px 0 0 50px;max-width:34ch"><b>Cap : Outils & workflows.</b> La boussole indique le chemin en cours ; le nord reste vide jusqu’à l’arrivée.</p>
  <figure class="mobile-only" style="width:200px;margin:24px 0 0 50px">{compass_dial(200, "outils", False, "gare")}</figure>
 </div>
</section>

<section class="band" aria-labelledby="chemin">
 <div class="wrap path">
  <div>
   <h2 id="chemin" class="q">{QUESTION}</h2>
   <div class="chips" aria-label="Réponses possibles">{"".join(f'<span class="chip{" on" if a in CHOSEN else ""}">{a}</span>' for a in ANSWERS)}</div>
   <p class="note" style="margin-top:22px;color:#d9dae6">Une question à la fois, et des relances. Exemple tiré du parcours de Claire, productrice : une personne fictive.</p>
  </div>
  <figure>{compass_dial(340, "outils", False, "gare")}</figure>
 </div>
</section>

<section class="wrap reveal" aria-labelledby="rev">
 <div class="post" style="padding-top:0"><ul class="signs" aria-label="État des chemins">{reveal_panels}</ul></div>
 <div>
  <h2 id="rev" class="h2">Chaque chemin se nomme quand on s’y engage.</h2>
  <p class="lede" style="margin-top:22px">L’ordre est le vôtre. Un chemin parcouru reste au poteau, en filet ; celui que l’on suit prend sa couleur ; les autres attendent. Aucun ne compte plus qu’un autre.</p>
 </div>
</section>

<section class="wrap arrive" aria-labelledby="arr">
 <div>
  <h2 id="arr" class="h2">À l’arrivée, votre nord, puis votre carte.</h2>
  <p class="lede" style="margin-top:22px">Dernière question : au mieux, ça ressemblerait à quoi ? La réponse devient le nord. La carte montre où l’on en est sur chaque chemin, sans note, et les enjeux qui se nouent entre deux chemins.</p>
  <p class="q" style="margin-top:28px;font-size:clamp(22px,2vw,28px);color:{NORTH}">{NORTH_QUOTE}</p>
  <ul class="stakes">{"".join(f"<li><i></i><span><b>{l}</b> {q}</span></li>" for _, l, q in STAKES)}</ul>
  <p class="note" style="margin-top:24px">Exemple illustratif : parcours fictif de Claire. Des repères nommés, jamais de chiffre.</p>
 </div>
 <div>{radar(620)}</div>
</section>

<section class="board" aria-labelledby="dep">
 <div class="wrap" style="padding-top:72px;padding-bottom:72px">
  <h2 id="dep" class="h2" style="color:#fff;margin-bottom:32px">Vos prochains départs, cap au nord.</h2>
  <ol>{board}</ol>
 </div>
</section>

<section class="wrap" aria-label="Contribuer">
 <div class="entries">
  <a href="/?public=artiste"><b>Je suis artiste ou actif·ve dans la culture</b>Votre expérience aidera à définir des conseils utiles.</a>
  <a href="/?public=partenaire"><b>Je représente un partenaire culturel</b>Faire remonter les situations vécues par les artistes.</a>
 </div>
</section>
</main>
<footer><div class="wrap">Avec le soutien de la Ville de Genève · Un projet Memoways</div></footer>
</body></html>"""
    return html


# ======================================================================
# B. BALISAGE : trail-marked signs and baseplate compass (pick)
# ======================================================================
def triad(hue, w=36, h=14, vertical=False):
    if vertical:
        return (f'<span class="triad v" aria-hidden="true"><i style="background:#fff"></i><i style="background:{hue}"></i>'
                f'<i style="background:#fff"></i></span>')
    return (f'<span class="triad" aria-hidden="true"><i style="background:#fff"></i><i style="background:{hue}"></i>'
            f'<i style="background:#fff"></i></span>')


def baseplate(width, active, north=False):
    """Baseplate compass: a rectangular plate, direction-of-travel arrow, one graduated ring."""
    w = width
    h = int(w * 1.42)
    dial = int(w * 0.78)
    arr = P[active][3] if active else INK
    return f"""<div class="plate" style="width:{w}px">
<svg viewBox="0 0 {w} {h}" width="{w}" height="{h}" aria-hidden="true" style="display:block;width:100%;height:auto">
<rect x="1.5" y="1.5" width="{w-3}" height="{h-3}" fill="#fff" stroke="{INK}" stroke-width="3"/>
<g fill="{arr}"><rect x="{w/2-6}" y="22" width="12" height="{h*0.2:.0f}"/><polygon points="{w/2-20},{36} {w/2+20},{36} {w/2},{10}"/></g>
</svg>
<div class="plate-dial" style="width:{dial}px;left:{(w-dial)/2:.0f}px;top:{h*0.36:.0f}px">{compass_dial(dial, active, north, "plaque")}</div>
</div>"""


def page_balisage():
    def sign(p, state, right=""):
        pid, name, deg, hue, txt = p
        label = name if state in ("on", "done") else "Chemin à découvrir"
        on = state == "on"
        return f"""<li class="sign {state}"><span class="in" style="background:{hue if on else '#fff'};color:{txt if on else INK}">
<span class="nm">{label}</span><span class="rt">{right}</span>
<span class="tip" aria-hidden="true" style="--h:{hue}"></span></span></li>"""

    post_signs = "".join(sign(p, "on" if p[0] == "outils" else "hidden", "par ici" if p[0] == "outils" else "") for p in PATHS)
    reveal_signs = "".join(sign(p, s, r) for p, s, r in [
        (P["outils"], "done", "parcouru"), (P["donnees"], "on", "en cours"),
        (P["partage"], "hidden", ""), (P["publics"], "hidden", ""), (P["competences"], "hidden", "")])
    new_signs = "".join(f"""<li class="sign north"><span class="in"><span class="hz">{h}</span><span class="nm"><b>{t}</b><span>{d}</span></span>
<span class="tip" aria-hidden="true" style="--h:{NORTH}"></span></span></li>""" for h, t, d in STEPS)
    css = BASE_CSS + f"""
.hero{{display:grid;grid-template-columns:minmax(0,1fr) 440px;gap:48px;padding:56px 0 0;align-items:start}}
.hero .copy{{display:flex;flex-direction:column;gap:26px;padding-bottom:64px}}
.trail{{position:relative}}
.trail::before{{content:"";position:absolute;left:46px;top:-56px;bottom:0;width:12px;background:{INK}}}
.signs{{list-style:none;display:flex;flex-direction:column;gap:10px;position:relative;padding:0 0 0 0}}
.sign{{position:relative;background:{INK};clip-path:polygon(0 0,calc(100% - 34px) 0,100% 50%,calc(100% - 34px) 100%,0 100%)}}
.sign .in{{display:grid;grid-template-columns:1fr auto 104px;align-items:stretch;min-height:64px;margin:3px;
clip-path:polygon(0 0,calc(100% - 32px) 0,100% 50%,calc(100% - 32px) 100%,0 100%)}}
.sign .nm{{font-weight:700;font-size:19px;padding:0 0 0 20px;letter-spacing:-.01em;align-self:center}}
.sign .rt{{font-size:15px;font-weight:600;padding-right:16px;align-self:center}}
.sign .tip{{border-left:3px solid {INK};background:linear-gradient(90deg,#fff 0 30%,var(--h) 30% 64%,#fff 64%)}}
.sign.hidden .nm{{font-weight:600}}
.sign.north .in{{grid-template-columns:200px 1fr 104px;min-height:96px;background:#fff}}
.sign.north .hz{{font-size:clamp(22px,2.2vw,30px);font-weight:700;letter-spacing:-.02em;padding-left:20px;white-space:nowrap}}
.sign.north .nm b{{display:block;font-size:21px}} .sign.north .nm span{{display:block;font-weight:400;font-size:16px;max-width:58ch;padding:2px 24px 10px 0}}
.plate{{position:relative;margin:30px 0 0 120px}}
.plate-dial{{position:absolute}}
.marks{{display:flex;gap:6px;align-items:center}}
.triad{{display:inline-grid;grid-template-columns:1fr 1fr 1fr;width:54px;height:20px;box-shadow:inset 0 0 0 2px {INK}}}
.triad i{{display:block}}
.stage{{display:grid;grid-template-columns:120px minmax(0,1fr) 360px;gap:40px;padding:80px 0;align-items:start;border-top:2px solid {INK}}}
.stage .mark{{position:relative;height:100%;min-height:120px}}
.stage .mark::before{{content:"";position:absolute;left:46px;top:-80px;bottom:-80px;width:12px;background:{INK}}}
.stage .mark .blaze{{position:absolute;left:28px;top:0;width:48px;height:90px;display:grid;grid-template-rows:1fr 1fr 1fr;box-shadow:inset 0 0 0 3px {INK}}}
.stage .mark .blaze i{{display:block}}
.stakes{{list-style:none;margin-top:28px;display:grid;gap:18px}}
.stakes li{{display:grid;grid-template-columns:22px 1fr;gap:12px;font-size:17px}}
.stakes i{{width:13px;height:13px;background:{INK};transform:rotate(45deg);margin-top:6px}}
.entries{{display:grid;grid-template-columns:1fr 1fr;border-top:2px solid {INK}}}
.entries a{{display:block;padding:40px 40px 40px 0;text-decoration:none}}
.entries a+a{{border-left:2px solid {INK};padding-left:40px}}
.entries b{{display:block;font-size:26px;letter-spacing:-.02em;margin-bottom:8px}}
footer{{border-top:2px solid {INK};padding:28px 0 40px;font-size:15px}}
@media (max-width:1100px){{.hero{{grid-template-columns:minmax(0,1fr) 380px}} .stage{{grid-template-columns:90px minmax(0,1fr)}} .stage>figure,.stage>.side{{grid-column:2}}}}
@media (max-width:820px){{
.mainnav{{display:none!important}}
.hero{{grid-template-columns:1fr;gap:28px;padding-top:36px}} .hero .copy{{padding-bottom:0}}
.trail::before{{left:30px;top:0}}
.plate{{margin:24px 0 40px 80px;width:200px!important}}
.stage{{grid-template-columns:1fr;gap:28px;padding:48px 0}} .stage>*{{grid-column:auto!important}} .stage .mark{{display:none}} .stage>figure,.stage>.side{{grid-column:auto}}
.sign.north .in{{grid-template-columns:1fr 64px}} .sign.north .hz{{grid-column:1;padding-top:12px}} .sign.north .nm{{grid-column:1;padding-left:20px}} .sign.north .tip{{grid-row:1/3;grid-column:2}} .sign .in{{grid-template-columns:1fr auto 76px}}
.entries{{grid-template-columns:1fr}} .entries a+a{{border-left:none;border-top:2px solid {INK};padding-left:0}}
}}
"""
    def blaze(hue):
        return f'<span class="blaze" aria-hidden="true"><i style="background:#fff"></i><i style="background:{hue}"></i><i style="background:#fff"></i></span>'

    html = f"""<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Esquisse B — Balisage</title><style>{css}</style></head><body>
{nav("light")}
<main>
<section class="wrap hero" aria-labelledby="t">
 <div class="copy">
  <h1 id="t" class="title"><b>Boussole</b><span>numérique culture</span></h1>
  <p class="hook">Cinq chemins. Tous comptent. On les parcourt ensemble, en conversation.</p>
  <p class="lede">Pour les artistes et les structures qui les accompagnent : on répond à des questions, chemin après chemin, et l’on repart avec sa carte et ses prochaines étapes.</p>
  <p><a class="cta" href="/experience/demo" style="background:{INK};color:#fff">Prendre la boussole {arrow_right("#fff")}</a></p>
  <p class="honest"><b>La Boussole n’existe pas encore.</b> La démonstration suit le parcours d’une personne fictive ; l’outil se construit avec le secteur.</p>
 </div>
 <div class="trail">
  <ul class="signs" aria-label="Les cinq chemins">{post_signs}</ul>
  {baseplate(240, "outils")}
 </div>
</section>

<section class="wrap stage" aria-labelledby="chemin">
 <div class="mark">{blaze(P["outils"][3])}</div>
 <div>
  <h2 id="chemin" class="q">{QUESTION}</h2>
  <div class="chips" aria-label="Réponses possibles">{"".join(f'<span class="chip" style="{"background:"+INK+";color:#fff" if a in CHOSEN else ""}">{a}</span>' for a in ANSWERS)}</div>
  <p class="note" style="margin-top:22px">Une question à la fois, et des relances. Exemple tiré du parcours de Claire, productrice : une personne fictive.</p>
 </div>
 <figure class="side">{baseplate(220, "outils")}<figcaption class="note" style="margin-top:12px;max-width:28ch"><b>Cap : Outils & workflows.</b> Le nord reste vide : il se pose à l’arrivée.</figcaption></figure>
</section>

<section class="wrap stage" aria-labelledby="rev">
 <div class="mark">{blaze(P["donnees"][3])}</div>
 <div>
  <h2 id="rev" class="h2">Chaque chemin se nomme quand on s’y engage.</h2>
  <p class="lede" style="margin-top:22px">L’ordre est le vôtre. Un chemin parcouru garde son balisage ; celui que l’on suit prend sa couleur ; les autres attendent. Aucun ne compte plus qu’un autre.</p>
 </div>
 <div class="side"><ul class="signs" aria-label="État des chemins">{reveal_signs}</ul></div>
</section>

<section class="wrap stage" aria-labelledby="arr">
 <div class="mark">{blaze(NORTH)}</div>
 <div>
  <h2 id="arr" class="h2">À l’arrivée, votre nord, puis votre carte.</h2>
  <p class="lede" style="margin-top:22px">Dernière question : au mieux, ça ressemblerait à quoi ? La réponse devient le nord. La carte montre où l’on en est sur chaque chemin, sans note, et les enjeux qui se nouent entre deux chemins.</p>
  <p class="q" style="margin-top:28px;font-size:clamp(22px,2vw,28px);color:{NORTH}">{NORTH_QUOTE}</p>
  <ul class="stakes">{"".join(f"<li><i></i><span><b>{l}</b> {q}</span></li>" for _, l, q in STAKES)}</ul>
  <p class="note" style="margin-top:24px">Exemple illustratif : parcours fictif de Claire. Des repères nommés, jamais de chiffre.</p>
 </div>
 <figure class="side" style="grid-column:2/4;max-width:640px">{radar(620)}</figure>
</section>

<section class="wrap stage" aria-labelledby="dep">
 <div class="mark">{blaze(NORTH)}</div>
 <div style="grid-column:2/4">
  <h2 id="dep" class="h2" style="margin-bottom:32px">Un nouveau poteau, cap au nord.</h2>
  <ul class="signs" style="max-width:980px">{new_signs}</ul>
 </div>
</section>

<section class="wrap" aria-label="Contribuer">
 <div class="entries">
  <a href="/?public=artiste"><b>Je suis artiste ou actif·ve dans la culture</b>Votre expérience aidera à définir des conseils utiles.</a>
  <a href="/?public=partenaire"><b>Je représente un partenaire culturel</b>Faire remonter les situations vécues par les artistes.</a>
 </div>
</section>
</main>
<footer><div class="wrap">Avec le soutien de la Ville de Genève · Un projet Memoways</div></footer>
</body></html>"""
    return html


# ======================================================================
# C. PLANS COULISSANTS : sliding planes (challenger, Rietveld grammar)
# ======================================================================
def page_plans():
    def plane(p, state, right=""):
        pid, name, deg, hue, txt = p
        if state == "hidden":
            return f'<li class="pl hidden"><span class="edge" style="background:{hue}"></span><span class="nm">Chemin à découvrir</span></li>'
        if state == "done":
            return (f'<li class="pl done"><span class="edge" style="background:{hue}"></span>'
                    f'<span class="nm">{name}</span><span class="rt">{right}</span></li>')
        return (f'<li class="pl on" style="background:{hue};color:{txt}"><span class="edge" style="background:{hue}"></span>'
                f'<span class="nm">{name}</span><span class="rt">{right}</span></li>')

    hero_planes = "".join(plane(p, "on" if p[0] == "outils" else "hidden", "par ici" if p[0] == "outils" else "") for p in PATHS)
    reveal_planes = "".join(plane(p, s, r) for p, s, r in [
        (P["outils"], "done", "parcouru"), (P["donnees"], "on", "en cours"),
        (P["partage"], "hidden", ""), (P["publics"], "hidden", ""), (P["competences"], "hidden", "")])
    css = BASE_CSS + f"""
body{{background:#fff}}
.frame{{border:6px solid {INK};border-top:none}}
.hero{{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);min-height:760px}}
.hero .copy{{padding:56px 48px 56px 64px;display:flex;flex-direction:column;gap:26px;border-right:6px solid {INK}}}
.hero .side{{display:grid;grid-template-rows:auto 1fr}}
.planes{{list-style:none;display:flex;flex-direction:column;border-bottom:6px solid {INK}}}
.pl{{position:relative;display:grid;grid-template-columns:22px 1fr auto;align-items:center;min-height:68px;border-top:6px solid {INK};background:#eeeff4}}
.pl:first-child{{border-top:none}}
.pl .edge{{height:100%;width:22px}}
.pl .nm{{font-weight:700;font-size:19px;padding:0 20px}}
.pl .rt{{font-size:15px;font-weight:600;padding-right:22px}}
.pl.hidden .nm{{font-weight:600}}
.pl.done{{background:#fff}}
.pl.on .edge{{box-shadow:inset -6px 0 0 {INK}}}
.dialbox{{display:grid;grid-template-columns:1fr;align-items:end}}
.dialbox .d{{padding:28px 32px 8px;display:grid;place-items:center}} .dialbox .dial{{width:250px}}
.dialbox .cap{{padding:4px 32px 28px;font-size:15px;max-width:44ch}}
.cta{{background:{INK};color:#fff}}
.row{{display:grid;border-top:6px solid {INK}}}
.r2{{grid-template-columns:minmax(0,1.25fr) minmax(0,1fr)}}
.r2>*+*{{border-left:6px solid {INK}}}
.cell{{padding:64px}}
.yellow{{background:{P["donnees"][3]}}}
.stakes{{list-style:none;margin-top:28px;display:grid;gap:18px}}
.stakes li{{display:grid;grid-template-columns:22px 1fr;gap:12px;font-size:17px}}
.stakes i{{width:13px;height:13px;background:{INK};transform:rotate(45deg);margin-top:6px}}
.steps{{list-style:none;display:grid;grid-template-columns:repeat(3,minmax(0,1fr))}}
.steps li{{padding:36px 32px 40px;border-left:6px solid {INK};position:relative}}
.steps li:first-child{{border-left:none}}
.steps .hz{{display:block;font-size:clamp(28px,2.8vw,40px);font-weight:700;letter-spacing:-.02em;white-space:nowrap}}
.steps b{{display:block;font-size:21px;margin-top:14px}}
.steps .nedge{{position:absolute;left:0;right:0;top:0;height:14px;background:{NORTH}}}
.entries{{display:grid;grid-template-columns:1fr 1fr}}
.entries a{{display:block;padding:40px 64px;text-decoration:none}}
.entries a+a{{border-left:6px solid {INK}}}
.entries b{{display:block;font-size:26px;letter-spacing:-.02em;margin-bottom:8px}}
footer{{padding:28px 0 40px;font-size:15px}}
.hero .title b{{font-size:min(10.2vw,148px)}}
@media (max-width:1100px){{.hero .title b{{font-size:min(10.2vw,150px)}}}}
@media (max-width:820px){{
.mainnav{{display:none!important}}
.frame{{border-left-width:0;border-right-width:0}}
.hero,.r2{{grid-template-columns:1fr}} .hero .copy{{border-right:none;padding:36px 16px 40px;border-bottom:6px solid {INK}}}
.hero .title b{{font-size:min(17.5vw,168px)}}
.r2>*+*{{border-left:none;border-top:6px solid {INK}}}
.cell{{padding:40px 16px}}
.dialbox{{grid-template-columns:1fr}} .dialbox .d{{border-right:none;border-bottom:6px solid {INK};padding:24px}}
.steps{{grid-template-columns:1fr}} .steps li{{border-left:none;border-top:6px solid {INK}}} .steps li:first-child{{border-top:none}}
.entries{{grid-template-columns:1fr}} .entries a{{padding:32px 16px}} .entries a+a{{border-left:none;border-top:6px solid {INK}}}
}}
"""
    html = f"""<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Esquisse C — Plans coulissants</title><style>{css}</style></head><body>
{nav("light").replace("border-bottom:2px solid", "border-bottom:6px solid")}
<main class="frame">
<section class="hero" aria-labelledby="t">
 <div class="copy">
  <h1 id="t" class="title"><b>Boussole</b><span>numérique culture</span></h1>
  <p class="hook">Cinq chemins. Tous comptent. On les parcourt ensemble, en conversation.</p>
  <p class="lede">Pour les artistes et les structures qui les accompagnent : on répond à des questions, chemin après chemin, et l’on repart avec sa carte et ses prochaines étapes.</p>
  <p><a class="cta" href="/experience/demo">Prendre la boussole {arrow_right("#fff")}</a></p>
  <p class="honest"><b>La Boussole n’existe pas encore.</b> La démonstration suit le parcours d’une personne fictive ; l’outil se construit avec le secteur.</p>
 </div>
 <div class="side">
  <ul class="planes" aria-label="Les cinq chemins">{hero_planes}</ul>
  <div class="dialbox"><div class="d" style="max-width:none">{compass_dial(280, "outils", False, "plaque")}</div>
   <p class="cap"><b>Cap : Outils & workflows.</b> Le nord reste vide : il se pose à l’arrivée.</p></div>
 </div>
</section>

<section class="row r2" aria-labelledby="chemin">
 <div class="cell">
  <h2 id="chemin" class="q">{QUESTION}</h2>
  <div class="chips">{"".join(f'<span class="chip" style="{"background:"+INK+";color:#fff" if a in CHOSEN else ""}">{a}</span>' for a in ANSWERS)}</div>
  <p class="note" style="margin-top:22px">Une question à la fois, et des relances. Exemple tiré du parcours de Claire, productrice : une personne fictive.</p>
 </div>
 <div><ul class="planes" style="border-bottom:none">{reveal_planes}</ul>
  <p class="cell" style="padding-top:28px;padding-bottom:40px"><b style="font-size:22px;display:block;letter-spacing:-.01em">Chaque chemin se nomme quand on s’y engage.</b>L’ordre est le vôtre. Le plan suivi glisse et prend sa couleur ; un chemin parcouru reste ouvert, en blanc ; les autres attendent, leur seule tranche visible.</p></div>
</section>

<section class="row r2" aria-labelledby="arr">
 <div class="cell">
  <h2 id="arr" class="h2">À l’arrivée, votre nord, puis votre carte.</h2>
  <p class="lede" style="margin-top:22px">Dernière question : au mieux, ça ressemblerait à quoi ? La réponse devient le nord. La carte montre où l’on en est sur chaque chemin, sans note, et les enjeux qui se nouent entre deux chemins.</p>
  <p class="q" style="margin-top:28px;font-size:clamp(22px,2vw,28px);color:{NORTH}">{NORTH_QUOTE}</p>
  <ul class="stakes">{"".join(f"<li><i></i><span><b>{l}</b> {q}</span></li>" for _, l, q in STAKES)}</ul>
  <p class="note" style="margin-top:24px">Exemple illustratif : parcours fictif de Claire. Des repères nommés, jamais de chiffre.</p>
 </div>
 <div class="cell" style="display:grid;align-items:center">{radar(620)}</div>
</section>

<section class="row" aria-labelledby="dep">
 <div class="cell" style="padding-bottom:40px"><h2 id="dep" class="h2">Vos trois prochaines étapes, cap au nord.</h2></div>
 <ol class="steps" style="border-top:6px solid {INK}">{"".join(f'<li><span class="nedge" aria-hidden="true"></span><span class="hz">{h}</span><b>{t}</b><span>{d}</span></li>' for h, t, d in STEPS)}</ol>
</section>

<section class="row" aria-label="Contribuer"><div class="entries">
  <a href="/?public=artiste"><b>Je suis artiste ou actif·ve dans la culture</b>Votre expérience aidera à définir des conseils utiles.</a>
  <a href="/?public=partenaire"><b>Je représente un partenaire culturel</b>Faire remonter les situations vécues par les artistes.</a>
</div></section>
</main>
<footer><div class="wrap">Avec le soutien de la Ville de Genève · Un projet Memoways</div></footer>
</body></html>"""
    return html


for name, fn in (("a-signaletique-quai", page_gare), ("b-balisage", page_balisage), ("c-plans-coulissants", page_plans)):
    (OUT / f"{name}.html").write_text(fn(), encoding="utf-8")
    print(OUT / f"{name}.html")
