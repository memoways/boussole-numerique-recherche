import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight, Compass, Users, Building2, User, ChevronDown, ChevronUp,
  CheckCircle, XCircle, Heart, Shield, Code2, ExternalLink
} from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";

/**
 * Page /projet — Le projet Boussole Numérique Culture
 * Couleurs Memoways : bleu #515792, orange #E27227
 */

const DIMENSIONS = [
  { icon: "🛠️", titre: "Outils & manières de travailler", desc: "Logiciels, collaboration, organisation du travail numérique au quotidien." },
  { icon: "🎓", titre: "Compétences & culture numérique", desc: "Formation, autonomie, répartition des compétences dans l'équipe." },
  { icon: "🗄️", titre: "Données, archivage & documentation", desc: "Stockage, sauvegarde, politique de données, souveraineté numérique." },
  { icon: "📡", titre: "Médiation, publics & communication", desc: "Présence en ligne, outils de communication, relation aux publics numériques." },
  { icon: "🔗", titre: "Partage, circulation & cohérence", desc: "Cohérence des pratiques entre équipes, mutualisation, documentation collective." },
];

const CE_QUE_CE_NEST_PAS = [
  "Un audit culpabilisant",
  "Un cours de formation en ligne",
  "Un chatbot généraliste",
  "Un outil commercial",
  "Une plateforme de données personnelles",
  "Un outil de classement ou de notation",
];

const CE_QUE_CA_PERMET = [
  "Faire une photo claire de ses pratiques numériques",
  "Identifier les points de friction du quotidien",
  "Repérer les habitudes utiles et les angles morts",
  "Choisir quelques pistes réalistes et adaptées",
  "Partager une vision commune avec son équipe",
  "Trouver des ressources adaptées à son contexte",
];

export default function Projet() {
  const [dimOuverte, setDimOuverte] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-20 sm:pt-24 pb-12 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#515792' }}>Le projet</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            La Boussole Numérique Culture
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed mb-8">
            Une boussole, pas un audit. Un outil genevois gratuit, ouvert et non commercial pour aider le secteur culturel à mieux comprendre ses pratiques numériques.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button style={{ backgroundColor: '#515792' }} asChild>
              <Link href="/experience">Voir l'expérience <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" style={{ borderColor: '#E27227', color: '#E27227' }} asChild>
              <Link href="/methode">La méthode</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Une boussole, pas un audit</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>La Boussole Numérique Culture propose un <strong>miroir structuré</strong> : voici où vous en êtes, voici ce qui fonctionne, voici ce qui coince, voici quelques pistes réalistes pour avancer.</p>
                <p>Elle n'est pas un outil de classement, ni un cours magistral, ni un chatbot généraliste. Elle est conçue pour les actrices et acteurs culturels genevois — artistes, gestionnaires de structures, équipes de musées, compagnies, associations — qui veulent prendre le temps de regarder leurs pratiques numériques sans jugement.</p>
                <p>Le numérique est déjà partout dans les pratiques culturelles. Mais les problèmes sont souvent ordinaires : fichiers éparpillés, versions multiples, contacts perdus, outils inadaptés, données vulnérables. <strong>On ne peut pas améliorer ce qu'on ne voit pas.</strong></p>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="rounded-2xl p-6" style={{ backgroundColor: '#f0f1f8' }}>
                <div className="flex items-center gap-3 mb-4">
                  <Compass className="h-6 w-6" style={{ color: '#515792' }} />
                  <h3 className="font-bold text-gray-900">En chiffres</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { val: "~2 800", label: "structures ICC en Ville de Genève", note: "DCTN Empreintes Créatives 2023", url: "https://www.geneve.ch/sites/default/files/2023-06/DCTN-etude-les-empreintes-creatives-2023-geneve.pdf" },
                    { val: "12 150", label: "personnes dans le secteur ICC", note: "DCTN Empreintes Créatives 2023", url: "https://www.geneve.ch/sites/default/files/2023-06/DCTN-etude-les-empreintes-creatives-2023-geneve.pdf" },
                    { val: "55%", label: "ont du mal à identifier leurs besoins IA", note: "Compétence Culture Québec, nov. 2025", url: "https://competenceculture.ca/wp-content/uploads/sites/2/2025/11/ia-etude-21-novembre-2025_competence_culture.pdf" },
                    { val: "59%", label: "des travailleurs auront besoin de reskilling d'ici 2030", note: "WEF Future of Jobs 2025", url: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/" },
                    { val: "5", label: "dimensions explorées par la Boussole", note: "Cadre conceptuel Boussole", url: null },
                  ].map(({ val, label, note, url }) => (
                    <div key={label} className="border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                      <div className="flex items-baseline gap-3">
                        <span className="text-xl font-extrabold" style={{ color: '#515792' }}>{val}</span>
                        <span className="text-sm text-gray-600">{label}</span>
                      </div>
                      {url ? (
                        <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs mt-0.5 flex items-center gap-1 hover:underline" style={{ color: '#E27227' }}>
                          <ExternalLink className="h-2.5 w-2.5" />{note}
                        </a>
                      ) : (
                        <span className="text-xs mt-0.5 block" style={{ color: '#9ca3af' }}>{note}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publics visés */}
      <section className="py-14 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">À qui s'adresse la Boussole ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#515792' }}>
                  <User className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900">Mode individuel</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">Artistes, créateurs indépendants, professionnels culturels qui souhaitent faire le point sur leurs propres pratiques numériques.</p>
              <ul className="space-y-1 text-sm text-gray-500">
                {["Artiste indépendant·e", "Créateur·trice freelance", "Professionnel·le de la culture"].map(p => (
                  <li key={p} className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />{p}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E27227' }}>
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900">Mode structure</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">Équipes, associations, institutions culturelles qui veulent partager une vision commune de leurs pratiques numériques.</p>
              <ul className="space-y-1 text-sm text-gray-500">
                {["Musée, galerie, centre culturel", "Compagnie, association, collectif", "Bibliothèque, école de musique"].map(p => (
                  <li key={p} className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ce que la Boussole permet */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" /> Ce que la Boussole permet
              </h2>
              <ul className="space-y-3">
                {CE_QUE_CA_PERMET.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <XCircle className="h-6 w-6 text-red-400" /> Ce que la Boussole n'est pas
              </h2>
              <ul className="space-y-3">
                {CE_QUE_CE_NEST_PAS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-600">
                    <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Les cinq dimensions */}
      <section className="py-14 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Les cinq dimensions</h2>
          <p className="text-gray-500 mb-8 max-w-xl">La Boussole explore cinq grandes dimensions des pratiques numériques d'une structure culturelle.</p>
          <div className="space-y-3">
            {DIMENSIONS.map((dim, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 cursor-pointer hover:shadow-sm transition-all"
                onClick={() => setDimOuverte(dimOuverte === i ? null : i)}
              >
                <div className="p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{dim.icon}</span>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mr-2">Dimension {i + 1}</span>
                      <h3 className="font-semibold text-gray-900">{dim.titre}</h3>
                    </div>
                  </div>
                  {dimOuverte === i ? <ChevronUp className="h-4 w-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />}
                </div>
                {dimOuverte === i && (
                  <div className="px-5 pb-5 pt-0 border-t border-gray-50">
                    <p className="text-sm text-gray-600 leading-relaxed">{dim.desc}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi gratuit, neutre et ouvert */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Pourquoi l'outil doit être gratuit, neutre et ouvert</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Heart, titre: "Gratuit", texte: "Un outil payant exclut les structures les plus petites — celles qui en ont souvent le plus besoin. La gratuité est un choix éthique, pas une contrainte.", couleur: "#E27227" },
              { icon: Shield, titre: "Neutre", texte: "Aucune recommandation ne doit orienter vers un prestataire ou un produit commercial. La Boussole est un bien commun, pas un outil de vente.", couleur: "#515792" },
              { icon: Code2, titre: "Ouvert", texte: "Le code source est public. La méthode est documentée. Toute structure peut s'en inspirer, l'adapter ou contribuer à son amélioration.", couleur: "#3aab8a" },
            ].map(({ icon: Icon, titre, texte, couleur }) => (
              <div key={titre} className="rounded-2xl p-6" style={{ backgroundColor: couleur + '10' }}>
                <Icon className="h-8 w-8 mb-4" style={{ color: couleur }} />
                <h3 className="font-bold text-gray-900 mb-2">{titre}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Envie d'en savoir plus ?</h2>
          <p className="text-gray-500 mb-8">Explorez l'expérience utilisateur, la méthode de co-conception ou la base de recherche.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button style={{ backgroundColor: '#515792' }} asChild>
              <Link href="/experience">L'expérience Boussole <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" style={{ borderColor: '#E27227', color: '#E27227' }} asChild>
              <Link href="/methode">La méthode</Link>
            </Button>
            <Button variant="outline" style={{ borderColor: '#515792', color: '#515792' }} asChild>
              <Link href="/recherche">La recherche</Link>
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
            <Link href="/gouvernance" className="hover:text-gray-600">Gouvernance</Link>
            <Link href="/ressources" className="hover:text-gray-600">Ressources</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
