import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, User, Building2, Eye, Compass, Lightbulb, Download,
  Clock, ChevronRight, BarChart3, FileText, Zap
} from "lucide-react";
import { Link } from "wouter";

/**
 * Page /experience — L'expérience Boussole
 * Visualisations explicatives (pas de collecte de données réelle)
 * Couleurs Memoways : bleu #515792, orange #E27227
 */

const PARCOURS = [
  {
    num: "01",
    temps: "Avant de commencer",
    titre: "Choisir son profil",
    desc: "Individuel ou structure ? La future expérience tiendra compte de cette première indication pour orienter le questionnaire.",
    icon: User,
    couleur: "#515792",
    detail: "Le choix du profil déterminera le type de questions, la profondeur de l’analyse et le format de la restitution. Un artiste indépendant n’a pas les mêmes enjeux qu’une équipe de 15 personnes dans un musée.",
  },
  {
    num: "02",
    temps: "Premier temps",
    titre: "La photo",
    desc: "Un questionnaire conversationnel, formulé en langage ordinaire. Vous pourrez décrire vos pratiques telles qu’elles sont.",
    icon: Eye,
    couleur: "#E27227",
    detail: "Le questionnaire explorera les cinq dimensions des pratiques numériques. Les questions seront formulées en langage ordinaire. Il n’y aura pas de bonne ou de mauvaise réponse. L’objectif sera de prendre une photo fidèle de la situation.",
  },
  {
    num: "03",
    temps: "Deuxième temps",
    titre: "Le panorama",
    desc: "Une carte visuelle de vos pratiques numériques. Un radar en cinq dimensions montrera les points d’attention à discuter.",
    icon: BarChart3,
    couleur: "#3aab8a",
    detail: "Le panorama sera une restitution visuelle personnalisée. Chaque dimension sera représentée avec un niveau et des observations issues de vos réponses.",
  },
  {
    num: "04",
    temps: "Troisième temps",
    titre: "L'approfondissement",
    desc: "Des pistes d’action et des ressources proposeront un premier pas en fonction des réponses partagées.",
    icon: Lightbulb,
    couleur: "#9b59b6",
    detail: "L’approfondissement proposera des ressources liées au profil et aux résultats. Il suggérera des lectures, des outils ou des démarches à discuter selon la situation décrite.",
  },
];

const EXTRAS = [
  {
    icon: Building2,
    titre: "Mode structure : regards croisés",
    desc: "En mode structure, plusieurs membres d'une équipe peuvent répondre séparément. La Boussole croise les regards et fait apparaître les convergences et les écarts de perception.",
    couleur: "#515792",
  },
  {
    icon: Download,
    titre: "Export et ressources",
    desc: "Les résultats peuvent être exportés en PDF. Une sélection de ressources adaptées est proposée à la fin de chaque parcours.",
    couleur: "#E27227",
  },
  {
    icon: Clock,
    titre: "Suivi dans le temps",
    desc: "La Boussole pourra être refaite après quelques mois pour mesurer l'évolution des pratiques et l'impact des changements engagés.",
    couleur: "#3aab8a",
  },
];

// Dimensions du radar
const DIMS = [
  {
    label: "Outils",
    emoji: "🛠️",
    couleur: "#515792",
    desc: "Les logiciels, applications et plateformes utilisés au quotidien. Cette dimension évalue si vos outils sont adaptés à vos usages réels — pas à ce qu'on vous a vendu.",
  },
  {
    label: "Compétences",
    emoji: "🎓",
    couleur: "#E27227",
    desc: "Les savoir-faire numériques de votre équipe. La Boussole ne juge pas le niveau — elle aide à repérer les écarts entre les besoins du terrain et les compétences disponibles.",
  },
  {
    label: "Données",
    emoji: "🗄️",
    couleur: "#3aab8a",
    desc: "La manière dont vous collectez, stockez et utilisez vos données (publics, projets, finances). Une dimension souvent sous-estimée, pourtant centrale pour piloter une structure culturelle.",
  },
  {
    label: "Diffusion",
    emoji: "📡",
    couleur: "#9b59b6",
    desc: "Votre présence numérique — site web, réseaux sociaux, newsletters, billetterie en ligne. Cette dimension évalue la cohérence et l'efficacité de vos canaux de communication.",
  },
  {
    label: "Collaboration",
    emoji: "🔗",
    couleur: "#E58441",
    desc: "Les outils et pratiques de travail en équipe — partage de fichiers, gestion de projets, communication interne. Là où beaucoup de structures perdent le plus d'énergie au quotidien.",
  },
];

// Valeurs cibles qui oscillent entre min et max
const TARGETS_A = [0.72, 0.50, 0.83, 0.45, 0.68];
const TARGETS_B = [0.40, 0.78, 0.55, 0.82, 0.35];

function AnimatedRadar() {
  const [vals, setVals] = useState(TARGETS_A);
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [activeDim, setActiveDim] = useState<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const phaseRef = useRef(0); // 0 = vers B, 1 = vers A
  const progressRef = useRef(0);

  useEffect(() => {
    const ORBIT_SPEED = 0.008; // degrés par ms → ~125s/tour
    const MORPH_DURATION = 4000; // ms pour passer d'un état à l'autre
    let lastTime = 0;

    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const dt = ts - lastTime;
      lastTime = ts;

      // Orbite
      setOrbitAngle(prev => (prev + ORBIT_SPEED * dt) % 360);

      // Morphing des pointes
      progressRef.current = Math.min(progressRef.current + dt / MORPH_DURATION, 1);
      const t = progressRef.current;
      // easing sinusoïdal
      const ease = (1 - Math.cos(t * Math.PI)) / 2;
      const from = phaseRef.current === 0 ? TARGETS_A : TARGETS_B;
      const to   = phaseRef.current === 0 ? TARGETS_B : TARGETS_A;
      setVals(from.map((f, i) => f + (to[i] - f) * ease));

      if (progressRef.current >= 1) {
        progressRef.current = 0;
        phaseRef.current = phaseRef.current === 0 ? 1 : 0;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const CX = 150, CY = 150, R_GRID = 100, R_ORBIT = 138;

  // Calcule les points du radar
  const radarPoints = vals.map((v, i) => {
    const angle = (i * 72 - 90) * Math.PI / 180;
    const r = R_GRID * v;
    return { x: CX + r * Math.cos(angle), y: CY + r * Math.sin(angle) };
  });
  const radarPath = radarPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ') + ' Z';

  return (
    <div className="flex flex-col items-center gap-4 w-full">
    <svg viewBox="0 0 300 300" className="w-64 h-64 sm:w-80 sm:h-80" style={{ overflow: 'visible' }} role="group" aria-label="Radar interactif des cinq dimensions de l'expérience">
      {/* Grille pentagone */}
      {[1, 0.75, 0.5, 0.25].map((scale, si) => {
        const pts = [0,1,2,3,4].map(i => {
          const a = (i * 72 - 90) * Math.PI / 180;
          return `${(CX + R_GRID * scale * Math.cos(a)).toFixed(1)},${(CY + R_GRID * scale * Math.sin(a)).toFixed(1)}`;
        }).join(' ');
        return <polygon key={si} points={pts} fill="none" stroke="#e5e7eb" strokeWidth="1" />;
      })}
      {/* Axes */}
      {[0,1,2,3,4].map(i => {
        const a = (i * 72 - 90) * Math.PI / 180;
        return <line key={i} x1={CX} y1={CY} x2={(CX + R_GRID * Math.cos(a)).toFixed(1)} y2={(CY + R_GRID * Math.sin(a)).toFixed(1)} stroke="#e5e7eb" strokeWidth="1" />;
      })}
      {/* Zone radar animée */}
      <path d={radarPath} fill="#515792" fillOpacity="0.18" stroke="#515792" strokeWidth="2" strokeLinejoin="round" />
      {/* Points sur les pointes — cliquables */}
      {radarPoints.map((p, i) => (
        <g
          key={i}
          role="button"
          tabIndex={0}
          aria-label={`Afficher ${DIMS[i].label}`}
          aria-pressed={activeDim === i}
          style={{ cursor: 'pointer' }}
          onClick={() => setActiveDim(activeDim === i ? null : i)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setActiveDim(activeDim === i ? null : i);
            }
          }}
        >
          {/* Halo de clic élargi */}
          <circle cx={p.x.toFixed(2)} cy={p.y.toFixed(2)} r="14" fill="transparent" />
          {/* Anneau de sélection */}
          {activeDim === i && (
            <circle cx={p.x.toFixed(2)} cy={p.y.toFixed(2)} r="9" fill={DIMS[i].couleur} fillOpacity="0.2" stroke={DIMS[i].couleur} strokeWidth="1" />
          )}
          <circle cx={p.x.toFixed(2)} cy={p.y.toFixed(2)} r={activeDim === i ? 6 : 4.5} fill={DIMS[i].couleur} stroke="white" strokeWidth="1.5" />
        </g>
      ))}
      {/* Icônes en orbite dans le sens horaire */}
      {DIMS.map((dim, i) => {
        const baseAngle = i * 72 - 90;
        const a = (baseAngle + orbitAngle) * Math.PI / 180;
        const x = CX + R_ORBIT * Math.cos(a);
        const y = CY + R_ORBIT * Math.sin(a);
        return (
          <g key={i}>
            <circle cx={x.toFixed(1)} cy={y.toFixed(1)} r="16" fill="white" stroke={dim.couleur} strokeWidth="1.5" style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.12))' }} />
            <text x={x.toFixed(1)} y={y.toFixed(1)} textAnchor="middle" dominantBaseline="middle" fontSize="14">{dim.emoji}</text>
          </g>
        );
      })}
    </svg>

    {/* Panneau description dimension active */}
    <div
      className="w-full max-w-xs rounded-xl px-4 py-3 text-sm leading-relaxed transition-all duration-300"
      aria-live="polite"
      style={{
        minHeight: '72px',
        backgroundColor: activeDim !== null ? DIMS[activeDim].couleur + '12' : '#f8f9fc',
        borderLeft: activeDim !== null ? `3px solid ${DIMS[activeDim].couleur}` : '3px solid #e5e7eb',
        opacity: activeDim !== null ? 1 : 0.5,
      }}
    >
      {activeDim !== null ? (
        <>
          <p className="font-bold mb-1" style={{ color: DIMS[activeDim].couleur }}>
            {DIMS[activeDim].emoji} {DIMS[activeDim].label}
          </p>
          <p className="text-gray-600">{DIMS[activeDim].desc}</p>
        </>
      ) : (
        <p className="text-gray-400 italic text-xs">Cliquez sur un point du radar pour découvrir la dimension correspondante.</p>
      )}
    </div>
    </div>
  );
}

export default function Experience() {
  const [etapeOuverte, setEtapeOuverte] = useState<number | null>(0);

  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="pt-20 sm:pt-24 pb-12 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#E27227' }}>L'expérience</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            L'expérience Boussole
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed mb-8">
            Une démonstration du futur parcours, mise à disposition sur ce site compagnon pour aider les partenaires à réagir aux étapes envisagées. Elle ne collecte pas de données réelles.
          </p>
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 rounded-full px-4 py-2">
              <Clock className="h-4 w-4" />
              <span>20–30 minutes</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 rounded-full px-4 py-2">
              <User className="h-4 w-4" />
              <span>Individuel ou structure</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 rounded-full px-4 py-2">
              <Zap className="h-4 w-4" />
              <span>Gratuit</span>
            </div>
          </div>
        </div>
      </section>

      {/* Flowchart du parcours */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Le parcours pas à pas</h2>
          <p className="text-gray-500 mb-10 max-w-xl">Cliquez sur chaque étape pour en savoir plus.</p>

          {/* Desktop: horizontal */}
          <div className="hidden md:block">
            {/* Barre de progression */}
            <div className="flex items-center mb-8">
              {PARCOURS.map((etape, i) => (
                <div key={i} className="flex items-center flex-1">
                  <button
                    className="flex flex-col items-center gap-2 group flex-shrink-0"
                    onClick={() => setEtapeOuverte(etapeOuverte === i ? null : i)}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-sm transition-transform group-hover:scale-110"
                      style={{ backgroundColor: etapeOuverte === i ? etape.couleur : '#d1d5db' }}
                    >
                      {etape.num}
                    </div>
                    <span className="text-xs font-semibold text-center" style={{ color: etapeOuverte === i ? etape.couleur : '#6b7280' }}>
                      {etape.titre}
                    </span>
                  </button>
                  {i < PARCOURS.length - 1 && (
                    <div className="flex-1 h-0.5 mx-2" style={{ backgroundColor: '#e5e7eb' }}></div>
                  )}
                </div>
              ))}
            </div>
            {/* Détail de l'étape sélectionnée */}
            {etapeOuverte !== null && (
              <div className="rounded-2xl p-8 transition-all" style={{ backgroundColor: PARCOURS[etapeOuverte].couleur + '10', borderLeft: `4px solid ${PARCOURS[etapeOuverte].couleur}` }}>
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: PARCOURS[etapeOuverte].couleur }}>
                    {(() => { const Icon = PARCOURS[etapeOuverte].icon; return <Icon className="h-6 w-6 text-white" />; })()}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: PARCOURS[etapeOuverte].couleur }}>{PARCOURS[etapeOuverte].temps}</p>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{PARCOURS[etapeOuverte].titre}</h3>
                    <p className="text-gray-600 leading-relaxed mb-3">{PARCOURS[etapeOuverte].desc}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{PARCOURS[etapeOuverte].detail}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile: vertical */}
          <div className="md:hidden space-y-3">
            {PARCOURS.map((etape, i) => {
              const Icon = etape.icon;
              return (
                <div
                  key={i}
                  className="rounded-xl border-2 bg-white cursor-pointer transition-all"
                  style={{ borderColor: etapeOuverte === i ? etape.couleur : '#e5e7eb' }}
                  onClick={() => setEtapeOuverte(etapeOuverte === i ? null : i)}
                >
                  <div className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white text-sm" style={{ backgroundColor: etape.couleur }}>
                      {etape.num}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400">{etape.temps}</p>
                      <h3 className="font-bold text-gray-900">{etape.titre}</h3>
                    </div>
                    <ChevronRight className={`h-4 w-4 text-gray-400 transition-transform ${etapeOuverte === i ? 'rotate-90' : ''}`} />
                  </div>
                  {etapeOuverte === i && (
                    <div className="px-4 pb-4 border-t border-gray-50">
                      <p className="text-sm text-gray-600 leading-relaxed mt-3">{etape.desc}</p>
                      <p className="text-sm text-gray-500 leading-relaxed mt-2">{etape.detail}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Exemple de radar (wireframe stylisé) */}
      <section className="py-14 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Un panorama visuel en cinq dimensions</h2>
              <p className="text-gray-600 leading-relaxed mb-4">La future restitution proposera une carte visuelle des pratiques numériques. Ce radar en cinq dimensions est une représentation explicative.</p>
              <p className="text-gray-500 text-sm leading-relaxed">Il aidera à situer les points d’attention et à choisir les prochaines questions à explorer.</p>
            </div>
            {/* Radar animé */}
            <div className="flex justify-center">
              <AnimatedRadar />
            </div>
          </div>
        </div>
      </section>

      {/* Fonctionnalités supplémentaires */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Fonctionnalités complémentaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXTRAS.map(({ icon: Icon, titre, desc, couleur }) => (
              <div key={titre} className="rounded-2xl p-6" style={{ backgroundColor: couleur + '10' }}>
                <Icon className="h-7 w-7 mb-4" style={{ color: couleur }} />
                <h3 className="font-bold text-gray-900 mb-2">{titre}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Note importante */}
      <section className="py-10 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-6 border border-gray-200 bg-white">
            <div className="flex items-start gap-4">
              <FileText className="h-6 w-6 flex-shrink-0 mt-0.5" style={{ color: '#515792' }} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Note importante</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Les visualisations présentées sur cette page sont des <strong>représentations explicatives</strong> du futur outil. La Boussole est en cours de co-conception. Elle ne collecte pas encore de données réelles. Ces schémas illustrent l'expérience telle qu'elle est envisagée.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Votre réaction peut aider à définir le prototype</h2>
          <p className="text-gray-500 mb-8">Les partenaires peuvent partager leurs besoins, leurs points de vigilance et les situations à ne pas oublier avant l’atelier de co-conception.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button style={{ backgroundColor: '#E07428', color: '#fff' }} asChild>
              <Link href="/partenaires/questionnaire">Répondre au questionnaire partenaire <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" style={{ borderColor: '#515792', color: '#515792' }} asChild>
              <Link href="/partenaires">Comprendre le rôle des partenaires</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
