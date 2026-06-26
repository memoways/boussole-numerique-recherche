import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Shield, Code2, Server, Globe, Lock, AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "wouter";

/**
 * Page /gouvernance — Données, neutralité & gouvernance
 * Couleurs Memoways : bleu #515792, orange #E27227
 */

const PRINCIPES = [
  {
    icon: Heart,
    titre: "Gratuité",
    couleur: "#E27227",
    texte: "La Boussole est et restera gratuite pour toutes les structures culturelles. La gratuité n'est pas un modèle économique en attente de monétisation : c'est un principe fondateur. Un outil payant exclut les structures les plus petites — celles qui en ont souvent le plus besoin.",
    engagements: ["Aucun abonnement", "Aucun freemium", "Aucune fonctionnalité payante"],
  },
  {
    icon: Globe,
    titre: "Non-commercialité",
    couleur: "#515792",
    texte: "La Boussole ne repose pas sur la captation des données ni sur la conversion des utilisateurs en clients. Sa valeur tient à l'utilité du diagnostic, à la qualité des ressources partagées et aux apprentissages mutualisables.",
    engagements: ["Aucune revente de données", "Aucun partenariat commercial", "Aucune logique de lead generation"],
  },
  {
    icon: Shield,
    titre: "Neutralité des recommandations",
    couleur: "#3aab8a",
    texte: "Les recommandations proposées par la Boussole ne favorisent aucun prestataire, aucun produit commercial, aucune solution propriétaire. Elles sont fondées sur des critères de pertinence, d'accessibilité et d'adéquation au contexte culturel.",
    engagements: ["Pas de recommandations sponsorisées", "Priorité aux outils libres et open source", "Transparence sur les critères de sélection"],
  },
  {
    icon: Code2,
    titre: "Open source",
    couleur: "#9b59b6",
    texte: "Le code source de la Boussole est ouvert et consultable. La méthode est documentée. Toute structure peut s'en inspirer, l'adapter ou contribuer à son amélioration. L'open source est une garantie de transparence et de durabilité.",
    engagements: ["Code source public", "Licence ouverte", "Documentation de la méthode accessible"],
  },
  {
    icon: Server,
    titre: "Hébergement souverain",
    couleur: "#E58441",
    texte: "La Boussole est hébergée en Suisse, chez Infomaniak. Les données restent en Europe, sous le cadre légal suisse et européen. Ce choix est délibéré : il garantit que les données des structures culturelles genevoises ne transitent pas par des serveurs américains.",
    engagements: ["Hébergement Infomaniak (Suisse)", "Données en Europe", "Conformité RGPD et LPD suisse"],
  },
  {
    icon: Lock,
    titre: "Données et consentement",
    couleur: "#515792",
    texte: "Les réponses au questionnaire sont anonymisées. Aucune donnée personnelle n'est collectée sans consentement explicite. Les résultats individuels ne sont jamais partagés sans accord de la personne ou de la structure concernée.",
    engagements: ["Anonymisation des réponses", "Consentement explicite", "Pas de partage sans accord"],
  },
];

export default function Gouvernance() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="pt-20 sm:pt-24 pb-12 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#3aab8a' }}>Gouvernance</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Données, neutralité & gouvernance
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed">
            La Boussole repose sur des principes non négociables, inscrits dans sa conception depuis le premier jour. Voici ce que cela signifie concrètement.
          </p>
        </div>
      </section>

      {/* Citation centrale */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-8 border-l-4" style={{ backgroundColor: '#f0f1f8', borderColor: '#515792' }}>
            <blockquote className="text-xl text-gray-700 italic leading-relaxed">
              "La Boussole ne repose pas sur la captation des données ni sur la conversion des utilisateurs en clients. Sa valeur tient à l'utilité du diagnostic, à la qualité des ressources partagées et aux apprentissages mutualisables."
            </blockquote>
            <p className="mt-4 text-sm text-gray-500 font-medium">— Principe fondateur du projet Boussole Numérique Culture</p>
          </div>
        </div>
      </section>

      {/* Les six principes */}
      <section className="py-14 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Six principes fondamentaux</h2>
          <div className="space-y-4">
            {PRINCIPES.map(({ icon: Icon, titre, couleur, texte, engagements }) => (
              <div key={titre} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: couleur + '15' }}>
                    <Icon className="h-6 w-6" style={{ color: couleur }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{titre}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{texte}</p>
                    <div className="flex flex-wrap gap-2">
                      {engagements.map(e => (
                        <span key={e} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium" style={{ backgroundColor: couleur + '15', color: couleur }}>
                          <CheckCircle className="h-3 w-3" />
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Anonymisation */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Anonymisation des données</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Les réponses individuelles ne sont jamais publiées ni partagées sans consentement explicite. Seules des synthèses agrégées et anonymisées pourront être utilisées pour améliorer l'outil ou documenter les tendances du secteur.</p>
                <p>L'objectif de la collecte de données n'est pas de constituer une base de données sur les structures culturelles. C'est d'améliorer la pertinence des recommandations et de documenter les besoins du secteur de manière anonyme.</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Limites claires</h2>
              <div className="space-y-3">
                {[
                  "La Boussole ne remplace pas un conseil juridique ou un audit de sécurité.",
                  "Elle ne garantit pas que toutes les recommandations seront adaptées à chaque situation.",
                  "Elle ne collecte pas de données sensibles (données personnelles, financières, RH).",
                  "Elle ne prétend pas mesurer la performance ou la compétitivité d'une structure.",
                ].map(limite => (
                  <div key={limite} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#fef3ec' }}>
                    <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: '#E27227' }} />
                    <p className="text-sm text-gray-600 leading-relaxed">{limite}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Des questions sur la gouvernance ?</h2>
          <p className="text-gray-500 mb-8">N'hésitez pas à nous contacter pour toute question sur les données, la neutralité ou les principes de la Boussole.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button style={{ backgroundColor: '#515792' }} asChild>
              <a href="mailto:ulrich.fischer@memoways.com?subject=Question gouvernance Boussole">
                Écrire à Memoways <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" style={{ borderColor: '#515792', color: '#515792' }} asChild>
              <Link href="/projet">Le projet</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
