import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";

/**
 * Page /references — Références inspirantes
 * Nos Gestes Climat, DeepLearning.AI Skill Builder, AICred, baromètres
 * Couleurs Memoways : bleu #515792, orange #E27227
 */

const REFERENCES = [
  {
    id: 1,
    nom: "Nos Gestes Climat",
    url: "https://nosgestesclimat.fr",
    badge: "Diagnostic ouvert · ADEME",
    couleur: "#3aab8a",
    ce_que_fait: "Un simulateur de bilan carbone personnel, gratuit, open source, réalisé 2,7 millions de fois en 3 ans. Il propose un questionnaire accessible, une restitution visuelle claire et des pistes d'action concrètes.",
    ce_que_boussole_apprend: "La gratuité et l'open source ne sont pas des contraintes : ce sont des leviers d'adoption. Un outil pédagogue, sans jargon, peut toucher des millions de personnes et modifier durablement les comportements.",
    ce_que_boussole_fait_differemment: "La Boussole s'adresse à un secteur spécifique (la culture genevoise) et explore des pratiques numériques plutôt que l'empreinte carbone. Elle intègre une dimension multimodale et un ancrage local.",
    limites: "Nos Gestes Climat est très centré sur l'individu et le foyer. Il ne propose pas de mode structure ou d'analyse collective. La dimension professionnelle y est absente.",
  },
  {
    id: 2,
    nom: "DeepLearning.AI Skill Builder",
    url: "https://skillbuilder.deeplearning.ai",
    badge: "Parcours guidé · Formation IA",
    couleur: "#515792",
    ce_que_fait: "Un outil d'évaluation des compétences IA pour les professionnels, avec des parcours d'apprentissage personnalisés selon le profil et le niveau. Interface fluide, progression claire, recommandations adaptées.",
    ce_que_boussole_apprend: "La fluidité d'une conversation guidée, la personnalisation selon le profil, et la clarté de la progression sont des qualités essentielles pour un outil d'évaluation. L'expérience doit donner envie de continuer.",
    ce_que_boussole_fait_differemment: "La Boussole n'est pas un outil de formation. Elle ne cherche pas à enseigner, mais à rendre visible. Elle s'adresse à des non-spécialistes du numérique, pas à des professionnels de l'IA.",
    limites: "Skill Builder est orienté vers les compétences techniques en IA. Il ne prend pas en compte les pratiques numériques ordinaires ni les enjeux de souveraineté ou de données.",
  },
  {
    id: 3,
    nom: "AICred",
    url: "https://aicred.ai",
    badge: "Évaluation IA · Référence professionnelle",
    couleur: "#9b59b6",
    ce_que_fait: "Un outil d'évaluation de la maturité IA des organisations, avec un système de certification et de recommandations structurées. Orienté vers les entreprises et les équipes techniques.",
    ce_que_boussole_apprend: "La rigueur d'un modèle d'évaluation structuré, avec des dimensions claires et des niveaux de maturité progressifs. La restitution sous forme de certification donne de la valeur au résultat.",
    ce_que_boussole_fait_differemment: "La Boussole ne certifie pas. Elle ne classe pas. Elle ne vise pas les entreprises technologiques. Elle s'adresse aux structures culturelles, avec un ton bienveillant et sans enjeu de performance.",
    limites: "AICred est orienté vers les organisations qui veulent valoriser leur maturité IA. Il n'est pas adapté aux petites structures culturelles, aux artistes indépendants ou aux non-spécialistes.",
  },
  {
    id: 4,
    nom: "Baromètres de maturité numérique",
    url: "#",
    badge: "Observatoires · Benchmarks sectoriels",
    couleur: "#E27227",
    ce_que_fait: "Plusieurs observatoires (Diag-numerique.fr, Observatoire du numérique genevois, CMA France) proposent des diagnostics numériques pour les entreprises et les PME. Ils mesurent le niveau de maturité numérique selon des critères standardisés.",
    ce_que_boussole_apprend: "La structuration en dimensions mesurables, la comparaison avec des pairs, et la lisibilité des résultats sont des qualités à retenir. Ces outils montrent qu'un diagnostic numérique peut être utile et accessible.",
    ce_que_boussole_fait_differemment: "Ces baromètres sont conçus pour les PME généralistes. Ils n'intègrent pas la dimension culturelle, ni les enjeux spécifiques des artistes et des petites structures. La Boussole comble ce vide.",
    limites: "Orientation commerciale (lead generation), questions génériques, absence de dimension IA, interface peu accessible pour les non-spécialistes.",
  },
];

export default function References() {
  const [refOuverte, setRefOuverte] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-20 sm:pt-24 pb-12 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#E27227' }}>Références</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Références inspirantes
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed">
            La Boussole ne cherche pas à copier un modèle existant. Elle assemble plusieurs inspirations : la simplicité d'un diagnostic ouvert, la fluidité d'une conversation guidée, la rigueur d'un modèle d'évaluation et l'ancrage local d'un outil conçu avec son terrain.
          </p>
        </div>
      </section>

      {/* Angle éditorial */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-6 border-l-4" style={{ backgroundColor: '#f0f1f8', borderColor: '#515792' }}>
            <div className="flex items-start gap-4">
              <Lightbulb className="h-6 w-6 flex-shrink-0 mt-0.5" style={{ color: '#515792' }} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Une approche par assemblage</h3>
                <p className="text-gray-600 leading-relaxed">Chaque référence apporte quelque chose de précis. Aucune n'est copiée. La Boussole emprunte la gratuité et l'open source à Nos Gestes Climat, la fluidité conversationnelle à Skill Builder, la rigueur structurelle à AICred — et y ajoute l'ancrage culturel genevois qui manque à tous.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Références */}
      <section className="py-14 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-4xl mx-auto space-y-4">
          {REFERENCES.map((ref) => (
            <div
              key={ref.id}
              className="bg-white rounded-2xl border-2 cursor-pointer transition-all hover:shadow-md"
              style={{ borderColor: refOuverte === ref.id ? ref.couleur : '#e5e7eb' }}
              onClick={() => setRefOuverte(refOuverte === ref.id ? null : ref.id)}
            >
              <div className="p-6 flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg font-bold text-white" style={{ backgroundColor: ref.couleur }}>
                    {ref.id}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-bold text-gray-900 text-lg">{ref.nom}</h3>
                      {ref.url !== "#" && (
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs" style={{ borderColor: ref.couleur, color: ref.couleur }}>
                      {ref.badge}
                    </Badge>
                  </div>
                </div>
                {refOuverte === ref.id
                  ? <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  : <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                }
              </div>

              {refOuverte === ref.id && (
                <div className="px-6 pb-6 border-t border-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide">Ce que l'outil fait</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{ref.ce_que_fait}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide">Ce que la Boussole peut en apprendre</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{ref.ce_que_boussole_apprend}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide">Ce que la Boussole fait différemment</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{ref.ce_que_boussole_fait_differemment}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide">Limites de la référence</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{ref.limites}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Explorer la recherche complète</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button style={{ backgroundColor: '#515792' }} asChild>
              <Link href="/recherche">État de l'art <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" style={{ borderColor: '#E27227', color: '#E27227' }} asChild>
              <Link href="/ressources">Toutes les ressources</Link>
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
            <Link href="/recherche" className="hover:text-gray-600">Recherche</Link>
            <Link href="/ressources" className="hover:text-gray-600">Ressources</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
