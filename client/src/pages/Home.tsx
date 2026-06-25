import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight, Eye, Compass, Shield, Globe, Code2,
  Heart, Lock, Server, Users, ChevronDown, ChevronUp, ExternalLink,
  ChevronLeft, ChevronRight, Lightbulb, Zap, BookOpen
} from "lucide-react";
import { Link } from "wouter";

/**
 * Home — Boussole Numérique Culture
 * Design: Memoways — bleu #515792, orange #E27227, orange clair #E58441
 * 9 blocs selon le PRD : Hero, Promesse, Pourquoi, Ce que l'outil fera,
 * 5 dimensions, Méthode, Recherche & inspirations, Garanties, Portail compagnon
 */

// ─── Données ──────────────────────────────────────────────────────────────────

const DIMENSIONS = [
  {
    id: 1,
    titre: "Outils & manières de travailler",
    icon: "🛠️",
    couleur: "#515792",
    exemple: "Quels logiciels utilisez-vous au quotidien ? Comment collaborez-vous à distance ? Vos outils sont-ils adaptés à votre taille et à vos pratiques ?",
  },
  {
    id: 2,
    titre: "Compétences & culture numérique",
    icon: "🎓",
    couleur: "#E27227",
    exemple: "Comment l'équipe se forme-t-elle ? Qui sait faire quoi ? Y a-t-il des angles morts dans les compétences collectives ?",
  },
  {
    id: 3,
    titre: "Données, archivage & documentation",
    icon: "🗄️",
    couleur: "#3aab8a",
    exemple: "Où sont stockées vos données ? Qui y a accès ? Avez-vous une politique d'archivage ou de sauvegarde ?",
  },
  {
    id: 4,
    titre: "Médiation, publics & communication",
    icon: "📡",
    couleur: "#9b59b6",
    exemple: "Comment touchez-vous vos publics en ligne ? Quels outils de communication utilisez-vous ? Comment mesurez-vous l'impact de vos actions numériques ?",
  },
  {
    id: 5,
    titre: "Partage, circulation & cohérence",
    icon: "🔗",
    couleur: "#E58441",
    exemple: "Vos pratiques numériques sont-elles cohérentes entre les équipes ? Partagez-vous des ressources avec d'autres structures ? Comment documentez-vous vos apprentissages ?",
  },
];

const GARANTIES = [
  { icon: Heart, titre: "Gratuité", texte: "L'outil est et restera gratuit pour toutes les structures culturelles.", couleur: "#E27227" },
  { icon: Shield, titre: "Neutralité", texte: "Aucune recommandation commerciale. Aucun partenariat avec des prestataires.", couleur: "#515792" },
  { icon: Lock, titre: "Données protégées", texte: "Vos réponses sont anonymisées. Aucune donnée personnelle n'est revendue.", couleur: "#3aab8a" },
  { icon: Code2, titre: "Open source", texte: "Le code source est ouvert et consultable. La méthode est documentée.", couleur: "#9b59b6" },
  { icon: Server, titre: "Hébergement souverain", texte: "Hébergé en Suisse, chez Infomaniak. Vos données restent en Europe.", couleur: "#E58441" },
  { icon: Globe, titre: "Non-commercialité", texte: "Aucune logique de captation, de conversion ou de monétisation des usages.", couleur: "#515792" },
];

const ETAPES_OUTIL = [
  { num: "01", titre: "Choisir son profil", desc: "Individuel ou structure. L'expérience s'adapte à votre situation.", icon: Users },
  { num: "02", titre: "Répondre au questionnaire", desc: "Un dialogue guidé, bienveillant, sans jargon technique.", icon: Compass },
  { num: "03", titre: "Recevoir un panorama visuel", desc: "Une carte claire de vos pratiques numériques, en cinq dimensions.", icon: Eye },
  { num: "04", titre: "Explorer des pistes d'action", desc: "Des ressources et suggestions adaptées à votre contexte réel.", icon: ArrowRight },
];

// ─── Radar interactif (partagé avec /experience) ────────────────────────────

const DIMS_RADAR = [
  {
    label: "Outils",
    emoji: "🛠️",
    couleur: "#515792",
    resume: "Logiciels, applications et plateformes utilisés au quotidien.",
    desc: "La Boussole évalue si vos outils sont vraiment adaptés à vos usages réels — pas à ce qu'on vous a vendu. Quels logiciels utilisez-vous ? Sont-ils cohérents entre eux ? Payez-vous pour des fonctionnalités que vous n'utilisez jamais ?",
    liens: [
      { texte: "L'expérience Boussole", href: "/experience" },
      { texte: "Dimensions évaluées", href: "/projet#proposition" },
    ],
  },
  {
    label: "Compétences",
    emoji: "🎓",
    couleur: "#E27227",
    resume: "Savoir-faire numériques de l'équipe et culture du changement.",
    desc: "La Boussole ne juge pas le niveau — elle aide à repérer les écarts entre les besoins du terrain et les compétences disponibles. Qui sait faire quoi ? Où sont les angles morts collectifs ? Comment l'équipe se forme-t-elle ?",
    liens: [
      { texte: "Recherche & contexte", href: "/recherche" },
      { texte: "Méthode co-conçue", href: "/methode" },
    ],
  },
  {
    label: "Données",
    emoji: "🗄️",
    couleur: "#3aab8a",
    resume: "Collecte, stockage et usage des données (publics, projets, finances).",
    desc: "Une dimension souvent sous-estimée, pourtant centrale pour piloter une structure culturelle. Où sont stockées vos données ? Qui y a accès ? Avez-vous une politique de sauvegarde et d'archivage ?",
    liens: [
      { texte: "Gouvernance & neutralité", href: "/gouvernance" },
      { texte: "Principes fondateurs", href: "/projet#principes" },
    ],
  },
  {
    label: "Diffusion",
    emoji: "📡",
    couleur: "#9b59b6",
    resume: "Présence numérique, communication et relation aux publics.",
    desc: "Site web, réseaux sociaux, newsletters, billetterie en ligne — cette dimension évalue la cohérence et l'efficacité de vos canaux. Vos outils de communication sont-ils adaptés à vos publics ? Mesurez-vous leur impact ?",
    liens: [
      { texte: "Références inspirantes", href: "/references" },
      { texte: "Partenaires & terrain", href: "/partenaires" },
    ],
  },
  {
    label: "Collaboration",
    emoji: "🔗",
    couleur: "#E58441",
    resume: "Pratiques de travail en équipe, partage et cohérence interne.",
    desc: "Partage de fichiers, gestion de projets, communication interne — là où beaucoup de structures perdent le plus d'énergie au quotidien. Vos pratiques numériques sont-elles cohérentes entre les équipes ? Partagez-vous des ressources avec d'autres structures ?",
    liens: [
      { texte: "Méthode & co-conception", href: "/methode" },
      { texte: "Calendrier du projet", href: "/timeline" },
    ],
  },
];

// ─── Questions type pour la démo Boussole ──────────────────────────────────

const QUESTIONS_DEMO = [
  {
    dimIndex: 0, // Outils
    question: "On utilise 4 outils différents pour partager des fichiers. Est-ce normal ?",
    pistes: [
      "Cartographier les outils réellement utilisés par chacun",
      "Identifier les doublons et les frictions du quotidien",
      "Choisir un outil central adapté à la taille de l'équipe",
    ],
    note: "La Boussole révèle souvent 3 à 5 outils redondants dans les petites structures.",
  },
  {
    dimIndex: 1, // Compétences
    question: "Seule une personne sait gérer notre site web. Que faire si elle part ?",
    pistes: [
      "Documenter les accès et les procédures clés",
      "Former au moins deux personnes aux tâches critiques",
      "Évaluer les compétences numériques collectives sans jugement",
    ],
    note: "La dépendance à une seule personne est l'un des risques les plus fréquents identifiés.",
  },
  {
    dimIndex: 2, // Données
    question: "Nos contacts publics sont éparpillés entre Excel, Gmail et des carnets papier.",
    pistes: [
      "Centraliser les données dans un outil unique et partagé",
      "Définir qui est responsable de la mise à jour",
      "Vérifier la conformité RGPD des données collectées",
    ],
    note: "Les données éparpillées sont la première source de perte d'énergie dans les équipes culturelles.",
  },
  {
    dimIndex: 3, // Diffusion
    question: "On publie sur 5 réseaux sociaux mais on ne sait pas si ça sert à quelque chose.",
    pistes: [
      "Choisir 2 canaux prioritaires selon votre public réel",
      "Mettre en place des indicateurs simples de suivi",
      "Aligner la communication numérique avec la stratégie de la structure",
    ],
    note: "Moins de canaux, mieux gérés : c'est souvent plus efficace que la présence partout.",
  },
  {
    dimIndex: 4, // Collaboration
    question: "Chaque équipe a ses propres dossiers. Personne ne sait où est la dernière version.",
    pistes: [
      "Définir une arborescence commune et la documenter",
      "Adopter une convention de nommage simple et partagée",
      "Choisir un espace de travail collaboratif adapté à l'équipe",
    ],
    note: "La gestion documentaire est le chantier numérique le plus universel dans le secteur culturel.",
  },
];

// ─── Composant Boussole démo interactive ────────────────────────────────────

function BoussoleDemoInteractive() {
  const [qIndex, setQIndex] = useState(0);
  const [needleAngle, setNeedleAngle] = useState(0);
  const [animating, setAnimating] = useState(false);
  const rafRef = useRef<number | null>(null);
  const currentAngleRef = useRef(0);

  const q = QUESTIONS_DEMO[qIndex];
  const dim = DIMS_RADAR[q.dimIndex];

  // Angles cibles des 5 icônes autour de la boussole (en degrés, sens horaire depuis le haut)
  const ICON_ANGLES = [270, 342, 54, 126, 198]; // Outils haut-gauche, Compétences haut-droite, etc.
  const targetAngle = ICON_ANGLES[q.dimIndex];

  const animateTo = (target: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setAnimating(true);
    const start = currentAngleRef.current;
    // Calculer le chemin le plus court
    let delta = ((target - start) % 360 + 540) % 360 - 180;
    const startTime = performance.now();
    const duration = 900;

    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const ease = t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
      const angle = start + delta * ease;
      currentAngleRef.current = angle;
      setNeedleAngle(angle);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        currentAngleRef.current = target;
        setNeedleAngle(target);
        setAnimating(false);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    animateTo(targetAngle);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [qIndex]);

  const goTo = (idx: number) => {
    if (animating) return;
    setQIndex(idx);
  };
  const prev = () => goTo((qIndex - 1 + QUESTIONS_DEMO.length) % QUESTIONS_DEMO.length);
  const next = () => goTo((qIndex + 1) % QUESTIONS_DEMO.length);

  // Positions des 5 icônes sur un cercle de rayon R autour du centre
  const CX = 160, CY = 160, R_ICONS = 120;
  const iconPositions = DIMS_RADAR.map((_, i) => {
    const a = (ICON_ANGLES[i] - 90) * Math.PI / 180;
    return { x: CX + R_ICONS * Math.cos(a), y: CY + R_ICONS * Math.sin(a) };
  });

  // Aiguille de boussole — pointe vers l'angle cible
  const needleRad = (needleAngle - 90) * Math.PI / 180;
  const NEEDLE_LEN = 72;
  const nx = CX + NEEDLE_LEN * Math.cos(needleRad);
  const ny = CY + NEEDLE_LEN * Math.sin(needleRad);
  const tailX = CX - (NEEDLE_LEN * 0.4) * Math.cos(needleRad);
  const tailY = CY - (NEEDLE_LEN * 0.4) * Math.sin(needleRad);

  return (
    <div className="w-full">
      {/* Capsule question */}
      <div className="rounded-2xl border-2 p-5 mb-8 relative" style={{ borderColor: dim.couleur, backgroundColor: dim.couleur + '0d' }}>
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0 mt-0.5">{dim.emoji}</span>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: dim.couleur }}>
              Question {qIndex + 1}/5 — {dim.label}
            </p>
            <p className="text-gray-800 font-semibold text-base leading-snug">"{q.question}"</p>
          </div>
        </div>
        {/* Navigation flèches */}
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={prev}
            disabled={animating}
            className="w-8 h-8 rounded-full flex items-center justify-center border transition-all disabled:opacity-40"
            style={{ borderColor: dim.couleur, color: dim.couleur }}
            aria-label="Question précédente"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-1.5">
            {QUESTIONS_DEMO.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                disabled={animating}
                className="w-2 h-2 rounded-full transition-all disabled:opacity-40"
                style={{ backgroundColor: i === qIndex ? dim.couleur : '#d1d5db' }}
                aria-label={`Question ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            disabled={animating}
            className="w-8 h-8 rounded-full flex items-center justify-center border transition-all disabled:opacity-40"
            style={{ borderColor: dim.couleur, color: dim.couleur }}
            aria-label="Question suivante"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Boussole + pistes */}
      <div className="flex flex-col lg:flex-row items-center gap-8">

        {/* SVG Boussole */}
        <div className="flex-shrink-0 flex justify-center">
          <svg viewBox="0 0 320 320" className="w-64 h-64 sm:w-72 sm:h-72">
            {/* Cercle de fond */}
            <circle cx={CX} cy={CY} r="130" fill="#f8f9fc" stroke="#e5e7eb" strokeWidth="1" />
            <circle cx={CX} cy={CY} r="90" fill="none" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4 4" />
            <circle cx={CX} cy={CY} r="50" fill="none" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4 4" />

            {/* Lignes cardinales */}
            {[0, 45, 90, 135].map(a => {
              const r = a * Math.PI / 180;
              return <line key={a} x1={(CX + 130*Math.cos(r)).toFixed(1)} y1={(CY + 130*Math.sin(r)).toFixed(1)}
                x2={(CX - 130*Math.cos(r)).toFixed(1)} y2={(CY - 130*Math.sin(r)).toFixed(1)}
                stroke="#e5e7eb" strokeWidth="0.5" />;
            })}

            {/* Icônes des 5 dimensions */}
            {DIMS_RADAR.map((d, i) => {
              const pos = iconPositions[i];
              const isActive = i === q.dimIndex;
              return (
                <g key={i} style={{ cursor: 'pointer' }} onClick={() => {
                  if (!animating) {
                    const newIdx = QUESTIONS_DEMO.findIndex(qq => qq.dimIndex === i);
                    if (newIdx >= 0) goTo(newIdx);
                  }
                }}>
                  <circle
                    cx={pos.x.toFixed(1)} cy={pos.y.toFixed(1)} r={isActive ? 22 : 18}
                    fill={isActive ? d.couleur : 'white'}
                    stroke={d.couleur}
                    strokeWidth={isActive ? 0 : 1.5}
                    style={{ filter: isActive ? `drop-shadow(0 2px 8px ${d.couleur}66)` : 'drop-shadow(0 1px 3px rgba(0,0,0,0.10))', transition: 'all 0.4s' }}
                  />
                  <text x={pos.x.toFixed(1)} y={pos.y.toFixed(1)} textAnchor="middle" dominantBaseline="middle" fontSize={isActive ? 16 : 14}>
                    {d.emoji}
                  </text>
                </g>
              );
            })}

            {/* Aiguille de boussole */}
            {/* Pointe (couleur active) */}
            <line
              x1={CX.toFixed(1)} y1={CY.toFixed(1)}
              x2={nx.toFixed(2)} y2={ny.toFixed(2)}
              stroke={dim.couleur} strokeWidth="4" strokeLinecap="round"
              style={{ transition: 'none' }}
            />
            {/* Queue (gris) */}
            <line
              x1={CX.toFixed(1)} y1={CY.toFixed(1)}
              x2={tailX.toFixed(2)} y2={tailY.toFixed(2)}
              stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round"
            />
            {/* Pointe flèche */}
            <circle cx={nx.toFixed(2)} cy={ny.toFixed(2)} r="5" fill={dim.couleur} />
            {/* Centre */}
            <circle cx={CX} cy={CY} r="10" fill="white" stroke={dim.couleur} strokeWidth="2" />
            <circle cx={CX} cy={CY} r="4" fill={dim.couleur} />
          </svg>
        </div>

        {/* Pistes de réponse */}
        <div className="flex-1 w-full">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: dim.couleur }}>
            La Boussole oriente vers
          </p>
          <h3 className="text-lg font-bold text-gray-900 mb-4">{dim.label}</h3>
          <div className="space-y-3 mb-5">
            {q.pistes.map((piste, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ backgroundColor: dim.couleur + '0d' }}>
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-white" style={{ backgroundColor: dim.couleur }}>{i + 1}</span>
                <p className="text-sm text-gray-700 leading-relaxed">{piste}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 italic border-l-2 pl-3 mb-5" style={{ borderColor: dim.couleur + '60' }}>
            {q.note}
          </p>
          <Button variant="outline" size="sm" className="text-xs font-semibold" style={{ borderColor: dim.couleur, color: dim.couleur }} asChild>
            <Link href="/experience">Voir l'expérience complète <ArrowRight className="ml-1 h-3 w-3" /></Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Composant principal ───────────────────────────────────────────────────────

// ─── Composant Radar + Accordion (Les cinq dimensions) ─────────────────────────────

const RADAR_A = [0.72, 0.50, 0.83, 0.45, 0.68];
const RADAR_B = [0.40, 0.78, 0.55, 0.82, 0.35];

function RadarAccordion() {
  const [activeDim, setActiveDim] = useState<number | null>(null);
  const [vals, setVals] = useState(RADAR_A);
  const rafRef = useRef<number | null>(null);
  const phaseRef = useRef(0);
  const progressRef = useRef(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const MORPH_DURATION = 4000;
    const tick = (ts: number) => {
      const dt = ts - (lastTimeRef.current || ts);
      lastTimeRef.current = ts;
      progressRef.current = Math.min(progressRef.current + dt / MORPH_DURATION, 1);
      const ease = (1 - Math.cos(progressRef.current * Math.PI)) / 2;
      const from = phaseRef.current === 0 ? RADAR_A : RADAR_B;
      const to   = phaseRef.current === 0 ? RADAR_B : RADAR_A;
      setVals(from.map((f, i) => f + (to[i] - f) * ease));
      if (progressRef.current >= 1) { progressRef.current = 0; phaseRef.current ^= 1; }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const CX = 150, CY = 150, R_GRID = 100;
  const radarPoints = vals.map((v, i) => {
    const a = (i * 72 - 90) * Math.PI / 180;
    return { x: CX + R_GRID * v * Math.cos(a), y: CY + R_GRID * v * Math.sin(a) };
  });
  const radarPath = radarPoints.map((p: {x:number,y:number}, i: number) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ') + ' Z';

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 w-full">
      {/* SVG Radar animé */}
      <div className="flex-shrink-0">
        <svg viewBox="0 0 300 300" className="w-64 h-64 sm:w-72 sm:h-72" style={{ overflow: 'visible' }}>
          {[1, 0.75, 0.5, 0.25].map((scale, si) => {
            const pts = [0,1,2,3,4].map((i: number) => { const a = (i*72-90)*Math.PI/180; return `${(CX+R_GRID*scale*Math.cos(a)).toFixed(1)},${(CY+R_GRID*scale*Math.sin(a)).toFixed(1)}`; }).join(' ');
            return <polygon key={si} points={pts} fill="none" stroke="#e5e7eb" strokeWidth="1" />;
          })}
          {[0,1,2,3,4].map((i: number) => { const a=(i*72-90)*Math.PI/180; return <line key={i} x1={CX} y1={CY} x2={(CX+R_GRID*Math.cos(a)).toFixed(1)} y2={(CY+R_GRID*Math.sin(a)).toFixed(1)} stroke="#e5e7eb" strokeWidth="1" />; })}
          <path d={radarPath} fill="#515792" fillOpacity="0.18" stroke="#515792" strokeWidth="2" strokeLinejoin="round" />
          {radarPoints.map((p: {x:number,y:number}, i: number) => (
            <g key={i} style={{ cursor: 'pointer' }} onClick={() => setActiveDim(activeDim === i ? null : i)}>
              <circle cx={p.x.toFixed(2)} cy={p.y.toFixed(2)} r="14" fill="transparent" />
              {activeDim === i && <circle cx={p.x.toFixed(2)} cy={p.y.toFixed(2)} r="9" fill={DIMS_RADAR[i].couleur} fillOpacity="0.2" stroke={DIMS_RADAR[i].couleur} strokeWidth="1" />}
              <circle cx={p.x.toFixed(2)} cy={p.y.toFixed(2)} r={activeDim === i ? 6 : 4.5} fill={DIMS_RADAR[i].couleur} stroke="white" strokeWidth="1.5" />
            </g>
          ))}
          {/* Labels des dimensions sur les pointes */}
          {DIMS_RADAR.map((dim, i) => {
            const a = (i * 72 - 90) * Math.PI / 180;
            const lx = CX + (R_GRID + 22) * Math.cos(a);
            const ly = CY + (R_GRID + 22) * Math.sin(a);
            return (
              <text key={i} x={lx.toFixed(1)} y={ly.toFixed(1)} textAnchor="middle" dominantBaseline="middle" fontSize="18" style={{ cursor: 'pointer' }}
                onClick={() => setActiveDim(activeDim === i ? null : i)}>
                {dim.emoji}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Accordion inline */}
      <div className="flex-1 w-full">
        <div className="space-y-2 mb-5">
          {DIMS_RADAR.map((dim, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden transition-all duration-200"
              style={{ border: `1.5px solid ${activeDim === i ? dim.couleur : '#e5e7eb'}` }}
            >
              <button
                onClick={() => setActiveDim(activeDim === i ? null : i)}
                className="w-full flex items-start gap-3 px-4 py-3 text-left transition-colors duration-200"
                style={{ backgroundColor: activeDim === i ? dim.couleur + '10' : '#f8f9fc' }}
              >
                <span className="text-lg flex-shrink-0 mt-0.5">{dim.emoji}</span>
                <span className="flex-1 min-w-0">
                  <span className="font-semibold text-sm block" style={{ color: activeDim === i ? dim.couleur : '#374151' }}>{dim.label}</span>
                  <span className="text-xs text-gray-500 leading-snug">{dim.resume}</span>
                </span>
                <ChevronDown
                  className="h-4 w-4 flex-shrink-0 mt-1 transition-transform duration-200"
                  style={{ color: activeDim === i ? dim.couleur : '#9ca3af', transform: activeDim === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: activeDim === i ? '220px' : '0px', opacity: activeDim === i ? 1 : 0 }}
              >
                <div
                  className="px-4 py-3 space-y-3"
                  style={{ borderTop: `1px solid ${dim.couleur}20`, backgroundColor: dim.couleur + '06' }}
                >
                  <p className="text-sm text-gray-600 leading-relaxed">{dim.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {dim.liens.map((lien: {texte: string, href: string}, li: number) => (
                      <Link
                        key={li}
                        href={lien.href}
                        className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full transition-colors duration-150 hover:opacity-80"
                        style={{ backgroundColor: dim.couleur + '15', color: dim.couleur, border: `1px solid ${dim.couleur}30` }}
                      >
                        {lien.texte} <ArrowRight className="h-3 w-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm" className="text-xs" style={{ borderColor: '#515792', color: '#515792' }} asChild>
          <Link href="/experience">Voir l'expérience complète <ArrowRight className="ml-1 h-3 w-3" /></Link>
        </Button>
      </div>
    </div>
  );
}

export default function Home() {
  const [dimensionOuverte, setDimensionOuverte] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="pt-20 sm:pt-24 pb-20 sm:pb-28 px-4" style={{ background: 'linear-gradient(160deg, #f4f5fb 0%, #fdf6f0 50%, #f4f5fb 100%)' }}>
        <div className="max-w-4xl mx-auto text-center">

          {/* Titre gradient fluide — inspiré du screenshot */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] mb-8 tracking-tight">
            <span style={{
              background: 'linear-gradient(90deg, #515792 0%, #3a7fc1 20%, #3aab8a 40%, #7ab648 58%, #E27227 78%, #E58441 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'block',
            }}>
              Boussole Numérique
            </span>
            <span style={{
              background: 'linear-gradient(90deg, #7ab648 0%, #b5c93a 25%, #E27227 55%, #E58441 80%, #d94f1e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'block',
            }}>
              Culture Genevoise
            </span>
          </h1>

          {/* Sous-titre */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Un outil gratuit pour aider les actrices et acteurs culturels à{' '}
            <strong style={{ color: '#515792' }}>comprendre leurs pratiques numériques</strong>,
            {' '}repérer les frictions du quotidien et choisir des pistes d'amélioration réalistes.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {[
              { label: 'Gratuit', color: '#515792' },
              { label: 'Open source', color: '#3aab8a' },
              { label: 'Hébergé en Suisse', color: '#7ab648' },
              { label: 'Co-construit avec le terrain', color: '#E27227' },
              { label: 'Secteur culturel', color: '#E58441' },
            ].map(({ label, color }) => (
              <Badge key={label} variant="outline" className="text-xs sm:text-sm px-3 py-1 bg-white font-medium" style={{ borderColor: color + '60', color }}>
                {label}
              </Badge>
            ))}
          </div>

          {/* CTAs principaux */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-5">
            <Button size="lg" className="font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-shadow" style={{ backgroundColor: '#515792' }} asChild>
              <Link href="/projet">
                Découvrir le projet <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="font-semibold text-sm sm:text-base border-2" style={{ borderColor: '#3aab8a', color: '#3aab8a' }} asChild>
              <Link href="/experience">Voir l'expérience</Link>
            </Button>
            <Button size="lg" variant="outline" className="font-semibold text-sm sm:text-base border-2" style={{ borderColor: '#E27227', color: '#E27227' }} asChild>
              <Link href="/recherche">Explorer la recherche</Link>
            </Button>
          </div>

          {/* CTA secondaire */}
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 text-sm" asChild>
            <Link href="/partenaires">Suivre l'avancement →</Link>
          </Button>

          {/* Ligne décorative */}
          <div className="mt-14 flex items-center justify-center gap-3">
            <div className="h-px w-16" style={{ backgroundImage: 'linear-gradient(to right, transparent, #51579260)' }}></div>
            <Compass className="h-4 w-4 opacity-30" style={{ color: '#515792' }} />
            <div className="h-px w-16" style={{ backgroundImage: 'linear-gradient(to left, transparent, #51579260)' }}></div>
          </div>
        </div>
      </section>

      {/* ── PROMESSE EN 3 GESTES ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E27227' }}>La promesse</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">En trois gestes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Eye, titre: "Observer", texte: "Faire une photo claire de ses pratiques numériques.", detail: "Un questionnaire structuré en 5 dimensions, sans jargon technique.", couleur: "#515792", bg: "#f0f1f8" },
              { icon: Lightbulb, titre: "Comprendre", texte: "Identifier les points de friction, les habitudes utiles et les angles morts.", detail: "Une carte visuelle de vos pratiques, lisible en un coup d'oeil.", couleur: "#E27227", bg: "#fdf3ec" },
              { icon: Zap, titre: "Agir", texte: "Choisir quelques pistes réalistes, adaptées à sa situation.", detail: "Des ressources et suggestions concrètes, calibrées à votre contexte.", couleur: "#3aab8a", bg: "#f0faf6" },
            ].map(({ icon: Icon, titre, texte, detail, couleur, bg }) => (
              <div
                key={titre}
                className="group rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-default relative overflow-hidden"
                style={{ backgroundColor: bg }}
              >
                {/* Fond coloré au hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                  style={{ background: `linear-gradient(135deg, ${couleur}08 0%, ${couleur}15 100%)` }}
                />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg" style={{ backgroundColor: couleur }}>
                    <Icon className="h-8 w-8 text-white transition-transform duration-300 group-hover:rotate-12" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 transition-colors duration-200" style={{ color: couleur }}>{titre}</h3>
                  <p className="text-gray-600 leading-relaxed transition-all duration-300 group-hover:opacity-0 group-hover:h-0 group-hover:mb-0 group-hover:overflow-hidden">{texte}</p>
                  <p className="text-gray-700 leading-relaxed text-sm font-medium absolute left-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ color: couleur }}>{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POURQUOI UNE BOUSSOLE ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#515792' }}>Pourquoi une Boussole ?</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">De la confusion vers une carte lisible</h2>
            <p className="text-gray-600 leading-relaxed max-w-2xl">Le numérique est déjà partout dans les pratiques culturelles. Mais les problèmes sont souvent ordinaires : fichiers éparpillés, versions multiples, contacts perdus, outils inadaptés. On ne peut pas améliorer ce qu'on ne voit pas. La Boussole rend visibles ces pratiques — sans jugement, sans jargon.</p>
          </div>
          <BoussoleDemoInteractive />
        </div>
      </section>

      {/* ── CE QUE L'OUTIL FERA ──────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E27227' }}>L'expérience</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Ce que l'outil fera</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Un parcours en quatre étapes, conçu pour être rapide, accessible et utile — quel que soit votre niveau numérique.</p>
          </div>

          {/* Desktop: horizontal / Mobile: vertical */}
          <div className="hidden md:flex items-start gap-0">
            {ETAPES_OUTIL.map(({ num, titre, desc, icon: Icon }, i) => (
              <div key={num}
                className="flex-1 flex flex-col items-center text-center px-4 group cursor-default"
              >
                <div className="relative flex items-center w-full mb-6">
                  <div className="flex-1 h-0.5 transition-colors duration-300" style={{ backgroundColor: i === 0 ? 'transparent' : '#e5e7eb', visibility: i === 0 ? 'hidden' : 'visible' }}></div>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                    style={{ backgroundColor: '#515792' }}>
                    <span className="text-lg">{num}</span>
                  </div>
                  <div className="flex-1 h-0.5" style={{ backgroundColor: i === ETAPES_OUTIL.length - 1 ? 'transparent' : '#e5e7eb', visibility: i === ETAPES_OUTIL.length - 1 ? 'hidden' : 'visible' }}></div>
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: '#E2722715' }}>
                  <Icon className="h-5 w-5 transition-colors duration-300" style={{ color: '#E27227' }} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-[#515792]">{titre}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Mobile: vertical */}
          <div className="md:hidden space-y-4">
            {ETAPES_OUTIL.map(({ num, titre, desc, icon: Icon }) => (
              <div key={num} className="flex gap-4 items-start p-4 rounded-xl" style={{ backgroundColor: '#f8f9fc' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0" style={{ backgroundColor: '#515792' }}>
                  {num}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="h-4 w-4" style={{ color: '#E27227' }} />
                    <h3 className="font-bold text-gray-900">{titre}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button className="font-semibold" style={{ backgroundColor: '#515792' }} asChild>
              <Link href="/experience">Voir l'expérience complète <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── LES CINQ DIMENSIONS ────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#515792' }}>Structure de l'évaluation</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Les cinq dimensions</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">La Boussole explore cinq grandes dimensions des pratiques numériques. Cliquez sur chacune pour voir un exemple concret.</p>
          </div>

          <RadarAccordion />
        </div>
      </section>

      {/* ── MÉTHODE CONSTRUITE AVEC LE TERRAIN ───────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#E27227' }}>Co-conception</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Une méthode construite avec le terrain</h2>
              <p className="text-gray-600 leading-relaxed mb-6">La Boussole ne sera pas conçue dans un bureau, puis livrée aux structures culturelles. Elle sera construite avec elles, étape par étape, en intégrant leurs retours à chaque phase.</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  { label: 'Cadrage', color: '#515792' },
                  { label: 'Maquettes', color: '#3aab8a' },
                  { label: 'Tests', color: '#7ab648' },
                  { label: 'Ajustements', color: '#E27227' },
                  { label: 'Mise à disposition', color: '#E58441' },
                  { label: "Retours d'usage", color: '#9b59b6' },
                  { label: 'Documentation', color: '#515792' },
                ].map(({ label, color }, i) => (
                  <span key={label}
                    className="text-xs px-3 py-1.5 rounded-full font-medium text-white transition-all duration-200 hover:scale-105 hover:shadow-sm cursor-default"
                    style={{ backgroundColor: color, animationDelay: `${i * 80}ms` }}
                  >
                    {label}
                  </span>
                ))}
              </div>
              <Button variant="outline" className="font-semibold" style={{ borderColor: '#515792', color: '#515792' }} asChild>
                <Link href="/methode">Voir la méthode <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="rounded-2xl p-8" style={{ backgroundColor: '#f0f1f8' }}>
              <blockquote className="text-gray-700 italic leading-relaxed text-lg">
                "La co-conception n'est pas un supplément de communication. C'est une manière de réduire le risque de produire un outil trop technique, trop général ou trop éloigné des pratiques réelles."
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#515792' }}>
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">Memoways Research</p>
                  <p className="text-xs text-gray-500">Principe fondateur du projet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RECHERCHE & INSPIRATIONS ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#515792' }}>Fondements</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Recherche & inspirations</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">La Boussole repose sur une base documentaire solide : études internationales, benchmarks d'outils existants, et analyses du contexte genevois.</p>
          </div>
          {/* Chiffres clés sourcés */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { val: "55%", label: "peinent à identifier leurs besoins IA", source: "Compétence Culture Québec, nov. 2025", url: "https://competenceculture.ca/wp-content/uploads/sites/2/2025/11/ia-etude-21-novembre-2025_competence_culture.pdf" },
              { val: ">3M", label: "tests Nos Gestes Climat", source: "beta.gouv.fr, mai 2026", url: "https://beta.gouv.fr/startups/nosgestesclimat.html" },
              { val: "70%", label: "des transformations numériques échouent", source: "BCG 2020 · McKinsey 2022", url: "https://www.bcg.com/publications/2020/increasing-odds-of-success-in-digital-transformation" },
              { val: "2 800", label: "structures ICC en Ville de Genève", source: "DCTN Empreintes Créatives 2023", url: "https://www.geneve.ch/sites/default/files/2023-06/DCTN-etude-les-empreintes-creatives-2023-geneve.pdf" },
            ].map(({ val, label, source, url }) => (
              <div key={val} className="rounded-xl bg-white border border-gray-100 p-4 text-center">
                <div className="text-2xl font-extrabold mb-1" style={{ color: '#515792' }}>{val}</div>
                <div className="text-xs text-gray-600 mb-2 leading-tight">{label}</div>
                <a href={url} target="_blank" rel="noopener noreferrer"
                  className="text-xs flex items-center justify-center gap-0.5 hover:underline"
                  style={{ color: '#E27227' }}
                >
                  <ExternalLink className="h-2.5 w-2.5" />{source}
                </a>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                href: "/recherche",
                icon: BookOpen,
                titre: "État de l'art",
                texte: "104 sources, 6 études majeures (UNESCO, Québec, DCTN Genève, WEF, BCG, Europe), 15 insights clés sur la transformation numérique culturelle.",
                couleur: "#515792",
                bg: "#f0f1f8",
              },
              {
                href: "/references",
                icon: Lightbulb,
                titre: "5 références analysées",
                texte: "Nos Gestes Climat, DeepLearning.AI Skill Builder, AICred, Diag-numerique.fr, Observatoire genevois — avec tableau comparatif détaillé.",
                couleur: "#E27227",
                bg: "#fdf3ec",
              },
              {
                href: "/ressources",
                icon: ExternalLink,
                titre: "Sources & documents",
                texte: "Accès direct aux sources originales : PDFs officiels, rapports institutionnels, études citées dans la recherche.",
                couleur: "#3aab8a",
                bg: "#f0faf6",
              },
            ].map(({ href, icon: Icon, titre, texte, couleur, bg }) => (
              <Link key={href} href={href} className="block group">
                <div className="rounded-2xl p-6 h-full transition-all duration-200 hover:shadow-md hover:-translate-y-0.5" style={{ backgroundColor: bg }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: couleur }}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{titre}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{texte}</p>
                  <span className="text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: couleur }}>
                    Explorer <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── GARANTIES ────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#515792' }}>Engagements</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Six garanties fondamentales</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">La Boussole repose sur des principes non négociables, inscrits dans sa conception depuis le premier jour.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GARANTIES.map(({ icon: Icon, titre, texte, couleur }) => (
              <Card key={titre} className="border border-gray-100 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: couleur + '15' }}>
                    <Icon className="h-5 w-5" style={{ color: couleur }} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{titre}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{texte}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="outline" className="font-semibold" style={{ borderColor: '#515792', color: '#515792' }} asChild>
              <Link href="/gouvernance">Lire les engagements complets <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── VERS UN PORTAIL COMPAGNON ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4" style={{ background: 'linear-gradient(135deg, #515792 0%, #3a4580 100%)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-4 text-white/70">Horizon</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Vers un portail compagnon</h2>
          <p className="text-white/80 leading-relaxed max-w-2xl mx-auto mb-10 text-lg">
            Ce site commence comme un espace de présentation et de recherche. Il pourra devenir, avec les partenaires et premiers utilisateurs, un portail compagnon pour suivre l'avancement, partager les retours, documenter les choix et préparer les premiers usages de la Boussole.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="font-semibold bg-white hover:bg-gray-50" style={{ color: '#515792' }} asChild>
              <Link href="/partenaires">
                <Users className="mr-2 h-4 w-4" />
                Devenir partenaire
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="font-semibold border-white/50 text-white hover:bg-white/10" asChild>
              <Link href="/methode">Lire la méthode</Link>
            </Button>
            <Button size="lg" variant="outline" className="font-semibold border-white/50 text-white hover:bg-white/10" asChild>
              <Link href="/partenaires">Suivre le projet</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
    </div>
  );
}
