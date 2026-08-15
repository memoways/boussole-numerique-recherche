import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, ChevronUp, Calendar, Users, Wrench, TestTube, Globe, BookOpen } from "lucide-react";
import { Link } from "wouter";

/**
 * Page /timeline — Phases de vie du site compagnon et de l’outil (24 mois, 4 phases)
 * Pas de détails financiers
 * Couleurs Memoways : bleu #515792, orange #E27227, vert #3aab8a
 */

const PHASES = [
  {
    num: "01",
    titre: "Mobiliser et co-concevoir",
    duree: "Mois 1–3",
    icon: Users,
    couleur: "#515792",
    statut: "En cours",
    items: [
      "Questionnaire partenaire et demandes d’invitation",
      "Mobilisation des institutions, réseaux, collectifs et personnes actives dans la culture",
      "Préparation d’un atelier de co-conception, à confirmer avec les partenaires",
      "Validation des cinq dimensions d'évaluation",
      "Scénarios d'usage (individuel et structure)",
      "Premières maquettes du questionnaire adaptatif",
      "Validation des formulations et des références locales",
    ],
    detail: "Cette première phase ancre l’outil dans les pratiques réelles. L’objectif est d’écouter, de reformuler et de relier les organisations partenaires aux artistes et aux communautés qu’elles accompagnent, avant de décider ce qui mérite d’être prototypé.",
  },
  {
    num: "02",
    titre: "Décider et prototyper",
    duree: "Mois 4–5",
    icon: TestTube,
    couleur: "#E27227",
    statut: "À venir",
    items: [
      "Restitution synthétique des retours et des décisions d’atelier",
      "Prototype fonctionnel du questionnaire conversationnel",
      "Restitution visuelle et pistes d’action à tester",
      "Ajustements UX, formulations et priorités de conception",
      "Vérification des principes de données et de consentement",
    ],
    detail: "Les choix issus de la phase d’écoute deviennent un prototype testable. Les partenaires confrontent alors les questions et les restitutions à leurs situations ; chaque retour sert à décider ce qui doit être conservé, modifié ou laissé de côté.",
  },
  {
    num: "03",
    titre: "Tester et préparer la diffusion",
    duree: "Mois 6–8",
    icon: Globe,
    couleur: "#3aab8a",
    statut: "À venir",
    items: [
      "Tests avec des artistes et des structures volontaires",
      "Préparation d’une mise à disposition élargie",
      "Activation du mécanisme de retour continu (questionnaire de satisfaction)",
      "Suivi des premiers usages et des retours",
      "Rapport d'évaluation intermédiaire (fin de phase pilote)",
      "Ajustements prioritaires basés sur les retours",
    ],
    detail: "Les premiers tests reconnectent le prototype aux personnes qui en auront l’usage. Le site compagnon rendra visibles les apprentissages, les retours et les décisions prises avant toute diffusion plus large.",
  },
  {
    num: "04",
    titre: "Diffuser et accompagner",
    duree: "Mois 9–24",
    icon: BookOpen,
    couleur: "#9b59b6",
    statut: "À venir",
    items: [
      "Hébergement et maintenance de l'outil",
      "Enrichissement continu de la base de ressources",
      "Diffusion élargie via les partenaires et les réseaux",
      "Améliorations itératives basées sur les usages",
      "Documentation ouverte de la méthode et des décisions",
      "Rapport final et pistes d’évolution à l’issue des 24 mois",
    ],
    detail: "La phase la plus longue suit les usages de l’outil. La Boussole, ses ressources et le site compagnon pourront être enrichis au fil des retours. Un rapport final documentera les apprentissages et les pistes d’évolution pour la suite.",
  },
];

export default function Timeline() {
  const [phaseOuverte, setPhaseOuverte] = useState<number | null>(0);

  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="pt-20 sm:pt-24 pb-12 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#9b59b6' }}>Calendrier</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Les phases du site compagnon
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed mb-6">
            Un parcours indicatif de 24 mois, organisé en quatre phases : mobiliser les partenaires, décider le prototype, tester avec le terrain, puis diffuser et accompagner.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 rounded-full px-4 py-2 w-fit">
            <Calendar className="h-4 w-4" />
            <span>24 mois · 4 phases</span>
          </div>
        </div>
      </section>

      {/* Timeline desktop */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="sr-only">Les quatre phases du projet</h2>

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
                    aria-label={`${isActive ? 'Refermer' : 'Ouvrir'} le détail : phase ${phase.num}, ${phase.titre}`}
                    aria-expanded={isActive}
                    aria-controls={`phase-detail-${i}`}
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
                    aria-label={`${isActive ? 'Refermer' : 'Ouvrir'} le détail : phase ${phase.num}, ${phase.titre}`}
                    aria-expanded={isActive}
                    aria-controls={`phase-detail-${i}`}
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
                  <h3 className="font-semibold text-gray-900 mb-3">Livrables et activités</h3>
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
                  role="button"
                  tabIndex={0}
                  aria-label={`${phaseOuverte === i ? 'Refermer' : 'Ouvrir'} le détail : phase ${phase.num}, ${phase.titre}`}
                  aria-expanded={phaseOuverte === i}
                  aria-controls={`phase-detail-${i}`}
                  className="rounded-xl border-2 bg-white cursor-pointer transition-all"
                  style={{ borderColor: phaseOuverte === i ? phase.couleur : '#e5e7eb' }}
                  onClick={() => setPhaseOuverte(phaseOuverte === i ? null : i)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setPhaseOuverte(phaseOuverte === i ? null : i);
                    }
                  }}
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
                    <div id={`phase-detail-${i}`} role="region" aria-label={`Détail : phase ${phase.num}, ${phase.titre}`} className="px-4 pb-4 border-t border-gray-50">
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
            <h2 className="font-bold text-gray-900 mb-2">Un calendrier indicatif</h2>
            <p className="text-sm text-gray-600 leading-relaxed">Ce calendrier est une projection. Il sera ajusté en fonction des retours des partenaires, des apprentissages de chaque phase et des réalités du terrain. La flexibilité est une valeur, pas un défaut.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contribuer à la phase en cours</h2>
          <p className="text-gray-500 mb-8">Le site compagnon sera mis à jour au fil des apprentissages. Aujourd’hui, le questionnaire partenaire permet de préparer la suite du travail collectif.</p>
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
