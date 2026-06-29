import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Users, MessageSquare, Wrench, TestTube, RefreshCw, FileText, Share2,
  Heart, Shield, Code2, Server, Globe, Lock, AlertTriangle, CheckCircle
} from "lucide-react";
import { Link } from "wouter";

/**
 * Page /methode — Méthode, co-conception & gouvernance
 * Fusion de l'ancienne page /methode et de l'ancienne page /gouvernance
 * Couleurs Memoways : bleu #515792, orange #E27227, vert #3aab8a
 */

const ETAPES_METHODE = [
  { icon: MessageSquare, titre: "Écouter", desc: "Rencontrer les structures culturelles, comprendre leurs pratiques réelles, leurs frictions, leurs besoins non formulés.", couleur: "#515792" },
  { icon: FileText, titre: "Formuler", desc: "Traduire les observations en questions, en dimensions, en scénarios d'usage. Valider avec les partenaires.", couleur: "#E27227" },
  { icon: Wrench, titre: "Prototyper", desc: "Construire une première version du questionnaire et de la restitution. Rapide, imparfaite, testable.", couleur: "#3aab8a" },
  { icon: TestTube, titre: "Tester", desc: "Faire essayer la Boussole à de vraies structures culturelles. Observer, noter, questionner.", couleur: "#9b59b6" },
  { icon: RefreshCw, titre: "Ajuster", desc: "Intégrer les retours. Reformuler les questions floues. Corriger les biais. Améliorer la restitution.", couleur: "#E58441" },
  { icon: FileText, titre: "Documenter", desc: "Garder une trace de chaque décision, de chaque apprentissage. Rendre la méthode reproductible.", couleur: "#515792" },
  { icon: Share2, titre: "Partager", desc: "Rendre les résultats accessibles. Publier les apprentissages. Inviter d'autres à s'en inspirer.", couleur: "#E27227" },
];

const IMPLICATIONS_PARTENAIRES = [
  { titre: "Ateliers de cadrage", desc: "Réunions de travail pour valider les dimensions, les formulations et les scénarios d'usage." },
  { titre: "Entretiens individuels", desc: "Conversations approfondies avec des professionnels culturels pour comprendre les pratiques réelles." },
  { titre: "Tests utilisateurs", desc: "Sessions d'essai de la Boussole avec des retours structurés sur l'expérience." },
  { titre: "Révision des formulations", desc: "Lecture critique des questions et des recommandations pour éviter le jargon et les biais." },
  { titre: "Retours d'usage", desc: "Après la mise à disposition, partage d'observations sur l'utilité et les limites de l'outil." },
];

const PRINCIPES_GOUVERNANCE = [
  {
    icon: Heart,
    titre: "Gratuité",
    couleur: "#E27227",
    texte: "La Boussole est et restera gratuite pour toutes les structures culturelles. Un outil payant exclut les structures les plus petites — celles qui en ont souvent le plus besoin.",
    engagements: ["Aucun abonnement", "Aucun freemium", "Aucune fonctionnalité payante"],
  },
  {
    icon: Globe,
    titre: "Non-commercialité",
    couleur: "#515792",
    texte: "La Boussole ne repose pas sur la captation des données ni sur la conversion des utilisateurs en clients. Sa valeur tient à l'utilité du diagnostic et à la qualité des ressources partagées.",
    engagements: ["Aucune revente de données", "Aucun partenariat commercial", "Aucune logique de lead generation"],
  },
  {
    icon: Shield,
    titre: "Neutralité des recommandations",
    couleur: "#3aab8a",
    texte: "Les recommandations ne favorisent aucun prestataire, aucun produit commercial, aucune solution propriétaire. Elles sont fondées sur des critères de pertinence, d'accessibilité et d'adéquation au contexte culturel.",
    engagements: ["Indépendantes de tout partenariat commercial", "Priorité aux outils libres et open source", "Transparence sur les critères de sélection"],
  },
  {
    icon: Code2,
    titre: "Open source",
    couleur: "#9b59b6",
    texte: "Le code source est ouvert et consultable. La méthode est documentée. Toute structure peut s'en inspirer, l'adapter ou contribuer à son amélioration.",
    engagements: ["Code source public", "Licence ouverte", "Documentation de la méthode accessible"],
  },
  {
    icon: Server,
    titre: "Hébergement souverain",
    couleur: "#E58441",
    texte: "La Boussole est hébergée en Suisse, chez Infomaniak. Les données restent en Europe, sous le cadre légal suisse et européen.",
    engagements: ["Hébergement Infomaniak (Suisse)", "Données en Europe", "Conformité RGPD et LPD suisse"],
  },
  {
    icon: Lock,
    titre: "Données et consentement",
    couleur: "#515792",
    texte: "Les réponses au questionnaire sont anonymisées. Aucune donnée personnelle n'est collectée sans consentement explicite. Les résultats individuels ne sont jamais partagés sans accord.",
    engagements: ["Anonymisation des réponses", "Consentement explicite", "Pas de partage sans accord"],
  },
];

export default function Methode() {
  return (
    <div className="bg-white">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="pt-20 sm:pt-24 pb-12 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#3aab8a' }}>Méthode & gouvernance</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Méthode, co-conception & gouvernance
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed mb-8">
            La Boussole sera construite avec les structures culturelles — pas pour elles. Et ses engagements fondateurs sont inscrits dans sa conception depuis le premier jour.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button style={{ backgroundColor: '#515792' }} asChild>
              <Link href="/timeline">Voir le calendrier <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" style={{ borderColor: '#E27227', color: '#E27227' }} asChild>
              <Link href="/partenaires">Devenir partenaire</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── POURQUOI CO-CONSTRUIRE ────────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Pourquoi co-construire ?</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Un outil conçu sans ses utilisateurs risque d'être trop technique, trop général ou trop éloigné des pratiques réelles. La co-conception réduit ce risque en intégrant les retours du terrain à chaque étape.</p>
                <p>Les structures culturelles ont des pratiques très diverses — artistes indépendants, grandes institutions, associations de médiation, compagnies de spectacle vivant. Un outil utile doit tenir compte de cette diversité dès sa conception.</p>
                <p>La co-conception, c'est aussi une manière de construire la confiance. Un outil que les structures ont contribué à façonner est un outil qu'elles s'approprieront plus facilement.</p>
              </div>
            </div>
            <div className="rounded-2xl p-8" style={{ backgroundColor: '#f0f1f8' }}>
              <blockquote className="text-gray-700 italic leading-relaxed text-lg">
                "La co-conception n'est pas un supplément de communication. C'est une manière de réduire le risque de produire un outil trop technique, trop général ou trop éloigné des pratiques réelles."
              </blockquote>
              <p className="mt-4 text-sm text-gray-500 font-medium">— Principe fondateur du projet Boussole</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LES SEPT TEMPS DE LA MÉTHODE ─────────────────────────────────────── */}
      <section className="py-14 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Les sept temps de la méthode</h2>
          <p className="text-gray-500 mb-10 max-w-xl">Un processus itératif, documenté à chaque étape.</p>

          {/* Desktop: grille */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4">
            {ETAPES_METHODE.map(({ icon: Icon, titre, desc, couleur }, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: couleur }}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{titre}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Mobile: liste verticale */}
          <div className="sm:hidden space-y-3">
            {ETAPES_METHODE.map(({ icon: Icon, titre, desc, couleur }, i) => (
              <div key={i} className="flex gap-4 items-start bg-white rounded-xl p-4 border border-gray-100">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: couleur }}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{titre}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOUVERNANCE & ENGAGEMENTS FONDATEURS ─────────────────────────────── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#515792' }}>Gouvernance</Badge>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Engagements fondateurs</h2>
          <p className="text-gray-500 mb-10 max-w-xl">
            La Boussole repose sur six principes inscrits dans sa conception depuis le premier jour — indépendamment des financements ou des partenariats.
          </p>
          <div className="space-y-4">
            {PRINCIPES_GOUVERNANCE.map(({ icon: Icon, titre, couleur, texte, engagements }) => (
              <div key={titre} className="rounded-2xl p-6 border border-gray-100">
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

          {/* Anonymisation & limites */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Anonymisation des données</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Les réponses individuelles ne sont jamais publiées ni partagées sans consentement explicite. Seules des synthèses agrégées et anonymisées pourront être utilisées pour améliorer l'outil ou documenter les tendances du secteur.</p>
                <p>L'objectif de la collecte de données n'est pas de constituer une base de données sur les structures culturelles, mais d'améliorer la pertinence des recommandations de manière anonyme.</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Limites claires</h3>
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

      {/* ── COMMENT LES PARTENAIRES SERONT IMPLIQUÉS ─────────────────────────── */}
      <section className="py-14 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Comment les partenaires seront impliqués</h2>
          <p className="text-gray-500 mb-8 max-w-xl">Plusieurs formes de participation sont prévues, selon la disponibilité et l'intérêt de chaque structure.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {IMPLICATIONS_PARTENAIRES.map(({ titre, desc }) => (
              <div key={titre} className="flex gap-4 items-start p-5 rounded-xl bg-white">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#515792' }}></div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{titre}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMENT LES RETOURS SERONT INTÉGRÉS ──────────────────────────────── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Comment les retours seront intégrés</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Chaque session de test donnera lieu à une synthèse documentée. Les retours seront catégorisés : formulations à clarifier, dimensions à ajuster, recommandations à améliorer, bugs UX à corriger.</p>
                <p>Les décisions prises à la suite des retours seront documentées et publiées sur ce portail. Les partenaires pourront voir comment leurs retours ont été pris en compte.</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Comment le portail pourra évoluer</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Ce site compagnon est lui-même un objet évolutif. Il pourra devenir, avec les partenaires et premiers utilisateurs, un espace de suivi de l'avancement, de partage des apprentissages et de documentation ouverte.</p>
                <p>L'objectif n'est pas de construire une plateforme permanente, mais de garder une trace vivante du projet et de ses apprentissages.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-14 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Participer à la co-conception</h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            Vous êtes une structure culturelle ? Votre participation peut prendre la forme d'un entretien, d'un atelier ou d'un test utilisateur. Pour toute question sur les données ou la gouvernance, n'hésitez pas à nous écrire.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button style={{ backgroundColor: '#515792' }} asChild>
              <Link href="/partenaires">Signaler mon intérêt <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" style={{ borderColor: '#E27227', color: '#E27227' }} asChild>
              <a href="mailto:ulrich.fischer@memoways.com?subject=Question méthode ou gouvernance Boussole">
                Nous écrire
              </a>
            </Button>
            <Button variant="outline" style={{ borderColor: '#515792', color: '#515792' }} asChild>
              <Link href="/timeline">Voir le calendrier</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
