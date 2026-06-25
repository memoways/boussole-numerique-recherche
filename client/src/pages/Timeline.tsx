import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, ChevronUp, Calendar, Users, Wrench, TestTube, Globe, BookOpen } from "lucide-react";
import { Link } from "wouter";

/**
 * Page /timeline — Calendrier du projet (18 mois, 5 phases)
 * Pas de détails financiers selon le PRD
 * Couleurs Memoways : bleu #515792, orange #E27227
 */

const PHASES = [
  {
    num: "01",
    titre: "Cadrage et co-conception",
    duree: "Mois 1–4",
    icon: Users,
    couleur: "#515792",
    statut: "En cours",
    items: [
      "Ateliers avec les partenaires culturels",
      "Entretiens individuels avec des professionnels",
      "Validation des cinq dimensions",
      "Scénarios d'usage (individuel et structure)",
      "Premières maquettes du questionnaire",
    ],
    detail: "Cette phase est la plus importante. Elle détermine la pertinence de tout ce qui suit. L'objectif est de comprendre les pratiques réelles des structures culturelles genevoises — pas de projeter des hypothèses sur elles.",
  },
  {
    num: "02",
    titre: "Prototype fonctionnel",
    duree: "Mois 5–9",
    icon: Wrench,
    couleur: "#E27227",
    statut: "À venir",
    items: [
      "Questionnaire conversationnel complet",
      "Modes individuel et structure",
      "Restitution visuelle (radar cinq dimensions)",
      "Synthèse personnalisée",
      "Premières recommandations",
      "Base de ressources adaptées",
    ],
    detail: "Le prototype fonctionnel est une version testable de la Boussole. Elle n'est pas encore parfaite, mais elle est suffisamment complète pour être utilisée dans des conditions proches du réel.",
  },
  {
    num: "03",
    titre: "Tests et affinages",
    duree: "Mois 10–13",
    icon: TestTube,
    couleur: "#3aab8a",
    statut: "À venir",
    items: [
      "Tests avec les partenaires culturels",
      "Ajustements UX et formulations",
      "Correction des formulations ambiguës",
      "Amélioration des recommandations",
      "Vérification des principes de données",
    ],
    detail: "Les tests permettent de confronter le prototype à la réalité. Chaque session est documentée. Les retours sont intégrés de manière transparente, avec une traçabilité des décisions prises.",
  },
  {
    num: "04",
    titre: "Fonctionnement public",
    duree: "Mois 14–16",
    icon: Globe,
    couleur: "#9b59b6",
    statut: "À venir",
    items: [
      "Mise à disposition publique de la Boussole",
      "Retours d'usage des premiers utilisateurs",
      "Documentation continue",
      "Suivi des besoins émergents",
      "Amélioration continue légère",
    ],
    detail: "La mise à disposition publique est une étape, pas une fin. La Boussole continue d'évoluer avec les retours des utilisateurs. Le portail compagnon joue ici un rôle central : suivre l'avancement, partager les apprentissages.",
  },
  {
    num: "05",
    titre: "Bilan et transmission",
    duree: "Mois 17–18",
    icon: BookOpen,
    couleur: "#E58441",
    statut: "À venir",
    items: [
      "Rapport de retour d'expérience",
      "Synthèse anonymisée des usages",
      "Documentation ouverte de la méthode",
      "Pistes d'évolution identifiées",
    ],
    detail: "Le bilan est une ressource pour l'ensemble du secteur. Il documente ce qui a fonctionné, ce qui a été difficile, et ce qui pourrait être amélioré. Il est publié en accès libre.",
  },
];

export default function Timeline() {
  const [phaseOuverte, setPhaseOuverte] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="pt-20 sm:pt-24 pb-12 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#9b59b6' }}>Calendrier</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Calendrier du projet
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed mb-6">
            Un projet de 18 mois, organisé en cinq phases progressives — de la co-conception au bilan ouvert.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 rounded-full px-4 py-2 w-fit">
            <Calendar className="h-4 w-4" />
            <span>18 mois · 5 phases</span>
          </div>
        </div>
      </section>

      {/* Timeline desktop */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">

          {/* Barre de progression desktop — cercles alignés + titres complets */}
          <div className="hidden md:block mb-12">
            {/* Rangée des cercles avec la ligne de connexion */}
            <div className="relative flex items-center justify-between">
              {/* Ligne de fond */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5" style={{ backgroundColor: '#e5e7eb', zIndex: 0 }}></div>
              {PHASES.map((phase, i) => {
                const Icon = phase.icon;
                const isActive = phaseOuverte === i;
                return (
                  <button
                    key={i}
                    className="relative z-10 flex flex-col items-center gap-0 group flex-1"
                    onClick={() => setPhaseOuverte(isActive ? null : i)}
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110 shadow-sm"
                      style={{ backgroundColor: isActive ? phase.couleur : '#e5e7eb' }}
                    >
                      <Icon className="h-6 w-6" style={{ color: isActive ? 'white' : '#9ca3af' }} />
                    </div>
                  </button>
                );
              })}
            </div>
            {/* Rangée des légendes (numéro + titre) */}
            <div className="flex items-start justify-between mt-3">
              {PHASES.map((phase, i) => {
                const isActive = phaseOuverte === i;
                return (
                  <button
                    key={i}
                    className="flex-1 flex flex-col items-center text-center px-1 group"
                    onClick={() => setPhaseOuverte(isActive ? null : i)}
                  >
                    <p className="text-xs font-bold mb-0.5" style={{ color: isActive ? phase.couleur : '#9ca3af' }}>{phase.num}</p>
                    <p className="text-xs leading-tight" style={{ color: isActive ? phase.couleur : '#6b7280' }}>{phase.titre}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Détail de la phase sélectionnée (desktop) */}
          {phaseOuverte !== null && (
            <div className="hidden md:block rounded-2xl p-8 mb-8 transition-all" style={{ backgroundColor: PHASES[phaseOuverte].couleur + '10', borderLeft: `4px solid ${PHASES[phaseOuverte].couleur}` }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge style={{ backgroundColor: PHASES[phaseOuverte].couleur }} className="text-xs">{PHASES[phaseOuverte].duree}</Badge>
                    {PHASES[phaseOuverte].statut === "En cours" && (
                      <Badge variant="outline" className="text-xs border-green-400 text-green-600">En cours</Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Phase {PHASES[phaseOuverte].num} — {PHASES[phaseOuverte].titre}</h3>
                  <p className="text-gray-600 leading-relaxed">{PHASES[phaseOuverte].detail}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Livrables et activités</h4>
                  <ul className="space-y-2">
                    {PHASES[phaseOuverte].items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: PHASES[phaseOuverte].couleur }}></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Mobile: cartes dépliables verticales */}
          <div className="md:hidden space-y-3">
            {PHASES.map((phase, i) => {
              const Icon = phase.icon;
              return (
                <div
                  key={i}
                  className="rounded-xl border-2 bg-white cursor-pointer transition-all"
                  style={{ borderColor: phaseOuverte === i ? phase.couleur : '#e5e7eb' }}
                  onClick={() => setPhaseOuverte(phaseOuverte === i ? null : i)}
                >
                  <div className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: phase.couleur }}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-gray-400">{phase.duree}</span>
                        {phase.statut === "En cours" && (
                          <span className="text-xs text-green-600 font-medium">· En cours</span>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900">Phase {phase.num} — {phase.titre}</h3>
                    </div>
                    {phaseOuverte === i ? <ChevronUp className="h-4 w-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />}
                  </div>
                  {phaseOuverte === i && (
                    <div className="px-4 pb-4 border-t border-gray-50">
                      <p className="text-sm text-gray-600 leading-relaxed mt-3 mb-3">{phase.detail}</p>
                      <ul className="space-y-1.5">
                        {phase.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                            <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: phase.couleur }}></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="py-10 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-6 bg-white border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">Un calendrier indicatif</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Ce calendrier est une projection. Il sera ajusté en fonction des retours des partenaires, des apprentissages de chaque phase et des réalités du terrain. La flexibilité est une valeur, pas un défaut.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Suivre l'avancement</h2>
          <p className="text-gray-500 mb-8">Ce portail sera mis à jour régulièrement pour refléter l'état d'avancement du projet.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button style={{ backgroundColor: '#515792' }} asChild>
              <Link href="/partenaires">Signaler mon intérêt <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" style={{ borderColor: '#515792', color: '#515792' }} asChild>
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
            <Link href="/methode" className="hover:text-gray-600">Méthode</Link>
            <Link href="/partenaires" className="hover:text-gray-600">Partenaires</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
