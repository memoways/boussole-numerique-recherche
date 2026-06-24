import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, User, Building2, Eye, Compass, Lightbulb, Download,
  Clock, ChevronRight, BarChart3, FileText, Zap
} from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";

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
    desc: "Individuel ou structure ? L'expérience s'adapte à votre situation. Quelques secondes suffisent pour orienter le questionnaire vers ce qui vous correspond.",
    icon: User,
    couleur: "#515792",
    detail: "Le choix du profil détermine le type de questions posées, la profondeur de l'analyse et le format de la restitution. Un artiste indépendant n'a pas les mêmes enjeux qu'une équipe de 15 personnes dans un musée.",
  },
  {
    num: "02",
    temps: "Premier temps",
    titre: "La photo",
    desc: "Un questionnaire conversationnel, bienveillant, sans jargon technique. Vous décrivez vos pratiques telles qu'elles sont — pas telles qu'elles devraient être.",
    icon: Eye,
    couleur: "#E27227",
    detail: "Le questionnaire explore les cinq dimensions des pratiques numériques. Les questions sont formulées en langage ordinaire. Il n'y a pas de bonne ou mauvaise réponse. L'objectif est de prendre une photo fidèle, pas de passer un examen.",
  },
  {
    num: "03",
    temps: "Deuxième temps",
    titre: "Le panorama",
    desc: "Une carte visuelle de vos pratiques numériques. Un radar en cinq dimensions, lisible en un coup d'œil, qui montre où vous êtes et où se situent les points de tension.",
    icon: BarChart3,
    couleur: "#3aab8a",
    detail: "Le panorama est une restitution visuelle personnalisée. Il ne note pas, il montre. Il ne classe pas, il cartographie. Chaque dimension est représentée avec un niveau et des observations concrètes issues de vos réponses.",
  },
  {
    num: "04",
    temps: "Troisième temps",
    titre: "L'approfondissement",
    desc: "Des pistes d'action réalistes, adaptées à votre contexte. Des ressources sélectionnées. Des suggestions concrètes pour un premier pas.",
    icon: Lightbulb,
    couleur: "#9b59b6",
    detail: "L'approfondissement propose des ressources adaptées à votre profil et à vos résultats. Il ne prescrit pas de solution universelle. Il ouvre des portes, suggère des lectures, identifie des outils ou des démarches qui correspondent à votre situation réelle.",
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

export default function Experience() {
  const [etapeOuverte, setEtapeOuverte] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-20 sm:pt-24 pb-12 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#E27227' }}>L'expérience</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            L'expérience Boussole
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed mb-8">
            Un parcours en quatre étapes, conçu pour être rapide, accessible et utile — quel que soit votre niveau numérique.
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
              <p className="text-gray-600 leading-relaxed mb-4">À la fin du questionnaire, vous recevez une carte visuelle de vos pratiques numériques. Un radar en cinq dimensions, lisible en un coup d'œil.</p>
              <p className="text-gray-500 text-sm leading-relaxed">Ce n'est pas une note. C'est une carte. Elle montre où vous êtes aujourd'hui — pour mieux choisir où aller demain.</p>
            </div>
            {/* Radar SVG illustratif */}
            <div className="flex justify-center">
              <svg viewBox="0 0 300 300" className="w-64 h-64 sm:w-72 sm:h-72">
                {/* Grille pentagone */}
                {[1, 0.75, 0.5, 0.25].map((scale, si) => {
                  const points = [0, 1, 2, 3, 4].map(i => {
                    const angle = (i * 72 - 90) * Math.PI / 180;
                    const r = 110 * scale;
                    return `${150 + r * Math.cos(angle)},${150 + r * Math.sin(angle)}`;
                  }).join(' ');
                  return <polygon key={si} points={points} fill="none" stroke="#e5e7eb" strokeWidth="1" />;
                })}
                {/* Axes */}
                {[0, 1, 2, 3, 4].map(i => {
                  const angle = (i * 72 - 90) * Math.PI / 180;
                  return <line key={i} x1="150" y1="150" x2={150 + 110 * Math.cos(angle)} y2={150 + 110 * Math.sin(angle)} stroke="#e5e7eb" strokeWidth="1" />;
                })}
                {/* Données (exemple illustratif) */}
                {(() => {
                  const vals = [0.7, 0.5, 0.8, 0.45, 0.65];
                  const points = vals.map((v, i) => {
                    const angle = (i * 72 - 90) * Math.PI / 180;
                    const r = 110 * v;
                    return `${150 + r * Math.cos(angle)},${150 + r * Math.sin(angle)}`;
                  }).join(' ');
                  return <polygon points={points} fill="#515792" fillOpacity="0.2" stroke="#515792" strokeWidth="2" />;
                })()}
                {/* Points */}
                {[0.7, 0.5, 0.8, 0.45, 0.65].map((v, i) => {
                  const angle = (i * 72 - 90) * Math.PI / 180;
                  const r = 110 * v;
                  return <circle key={i} cx={150 + r * Math.cos(angle)} cy={150 + r * Math.sin(angle)} r="5" fill="#515792" />;
                })}
                {/* Labels */}
                {["🛠️", "🎓", "🗄️", "📡", "🔗"].map((emoji, i) => {
                  const angle = (i * 72 - 90) * Math.PI / 180;
                  const r = 130;
                  return (
                    <text key={i} x={150 + r * Math.cos(angle)} y={150 + r * Math.sin(angle)} textAnchor="middle" dominantBaseline="middle" fontSize="18">
                      {emoji}
                    </text>
                  );
                })}
              </svg>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Envie de participer à la co-conception ?</h2>
          <p className="text-gray-500 mb-8">La Boussole est construite avec les structures culturelles genevoises. Votre retour compte.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button style={{ backgroundColor: '#515792' }} asChild>
              <Link href="/partenaires">Devenir partenaire <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" style={{ borderColor: '#E27227', color: '#E27227' }} asChild>
              <Link href="/methode">La méthode</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <img src="/logo-memoways.png" alt="Memoways" className="h-7 w-auto" />
            <span>Memoways Research · Juin 2026</span>
          </div>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-gray-600">Accueil</Link>
            <Link href="/projet" className="hover:text-gray-600">Le projet</Link>
            <Link href="/gouvernance" className="hover:text-gray-600">Gouvernance</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
