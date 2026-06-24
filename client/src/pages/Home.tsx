import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight, Eye, Lightbulb, Zap, Compass, Shield, Globe, Code2,
  Heart, Lock, Server, BookOpen, Users, ChevronDown, ChevronUp, ExternalLink
} from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";

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

// ─── Composant principal ───────────────────────────────────────────────────────

export default function Home() {
  const [dimensionOuverte, setDimensionOuverte] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="pt-20 sm:pt-24 pb-20 sm:pb-28 px-4" style={{ background: 'linear-gradient(160deg, #f4f5fb 0%, #fdf6f0 50%, #f4f5fb 100%)' }}>
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge décoratif */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border" style={{ borderColor: '#515792', color: '#515792', backgroundColor: 'rgba(81,87,146,0.06)' }}>
            <Compass className="h-3.5 w-3.5" />
            Memoways Research · Genève
          </div>

          {/* Titre multicolore mot-par-mot */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] mb-8 tracking-tight">
            <span className="block">
              <span style={{ color: '#515792' }}>Boussole</span>
              {' '}
              <span style={{ color: '#3aab8a' }}>Numérique</span>
            </span>
            <span className="block">
              <span style={{ color: '#7ab648' }}>Culture</span>
              {' '}
              <span style={{ color: '#E27227' }}>Genev</span><span style={{ color: '#E58441' }}>oise</span>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#515792' }}>Pourquoi une Boussole ?</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">De la confusion vers une carte lisible</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Le numérique est déjà partout dans les pratiques culturelles. Mais les problèmes sont souvent ordinaires : fichiers éparpillés, versions multiples, contacts perdus, outils inadaptés, données vulnérables, communication fragmentée.</p>
                <p>On ne peut pas améliorer ce qu'on ne voit pas. La Boussole rend visibles ces pratiques — sans jugement, sans jargon — pour que chacun puisse choisir un premier pas réaliste.</p>
                <p className="font-medium" style={{ color: '#515792' }}>Elle n'est pas un audit culpabilisant. C'est un miroir bienveillant.</p>
              </div>
              <div className="mt-8">
                <Button variant="outline" className="font-semibold" style={{ borderColor: '#515792', color: '#515792' }} asChild>
                  <Link href="/projet">En savoir plus sur le projet <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
            {/* Illustration : cercles concentriques avec icônes tournantes */}
            <div className="flex justify-center">
              <style>{`
                @keyframes spin-orbit-1 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes spin-orbit-2 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
                @keyframes spin-orbit-3 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes spin-counter-1 { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(-360deg); } }
                @keyframes spin-counter-2 { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
                @keyframes spin-counter-3 { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(-360deg); } }
                .ring-1 { animation: spin-orbit-1 32s linear infinite; }
                .ring-2 { animation: spin-orbit-2 20s linear infinite; }
                .ring-3 { animation: spin-orbit-3 13s linear infinite; }
                .icon-1 { animation: spin-counter-1 32s linear infinite; }
                .icon-2 { animation: spin-counter-2 20s linear infinite; }
                .icon-3 { animation: spin-counter-3 13s linear infinite; }
              `}</style>
              <div className="relative" style={{ width: 300, height: 300 }}>

                {/* Anneau externe — 28s — icône 🛠️ */}
                <div className="ring-1 absolute rounded-full border-2 border-dashed" style={{ inset: 0, borderColor: '#515792', opacity: 0.22 }}>
                  <div className="icon-1 absolute w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-lg"
                    style={{ left: '50%', top: 0, transform: 'translate(-50%, -50%)' }}>
                    🛠️
                  </div>
                </div>

                {/* Anneau intermédiaire — 20s inverse — icône 🎓 */}
                <div className="ring-2 absolute rounded-full border-2 border-dashed" style={{ inset: 36, borderColor: '#E27227', opacity: 0.32 }}>
                  <div className="icon-2 absolute w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-lg"
                    style={{ left: '50%', top: 0, transform: 'translate(-50%, -50%)' }}>
                    🎓
                  </div>
                </div>

                {/* Anneau interne — 13s — icône 🗄️ */}
                <div className="ring-3 absolute rounded-full border-2 border-dashed" style={{ inset: 72, borderColor: '#3aab8a', opacity: 0.45 }}>
                  <div className="icon-3 absolute w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-base"
                    style={{ left: '50%', top: 0, transform: 'translate(-50%, -50%)' }}>
                    🗄️
                  </div>
                </div>

                {/* Centre fixe */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#515792' }}>
                    <Compass className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Icônes fixes aux extrémités */}
                <div className="absolute w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-base"
                  style={{ left: '8%', top: '62%', transform: 'translate(-50%,-50%)' }}>📡</div>
                <div className="absolute w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-base"
                  style={{ left: '92%', top: '62%', transform: 'translate(-50%,-50%)' }}>🔗</div>
              </div>
            </div>
          </div>
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

      {/* ── LES CINQ DIMENSIONS ──────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#515792' }}>Structure de l'évaluation</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Les cinq dimensions</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">La Boussole explore cinq grandes dimensions des pratiques numériques. Cliquez sur chacune pour voir un exemple concret.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DIMENSIONS.map((dim) => (
              <div
                key={dim.id}
                className="rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                style={{
                  borderColor: dimensionOuverte === dim.id ? dim.couleur : '#e5e7eb',
                  backgroundColor: dimensionOuverte === dim.id ? dim.couleur + '08' : 'white',
                }}
                onClick={() => setDimensionOuverte(dimensionOuverte === dim.id ? null : dim.id)}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl transition-transform duration-300" style={{ display: 'inline-block', transform: dimensionOuverte === dim.id ? 'scale(1.2)' : 'scale(1)' }}>{dim.icon}</span>
                      <h3 className="font-semibold text-sm leading-tight transition-colors duration-200" style={{ color: dimensionOuverte === dim.id ? dim.couleur : '#111827' }}>{dim.titre}</h3>
                    </div>
                    <div className="transition-transform duration-300" style={{ transform: dimensionOuverte === dim.id ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      <ChevronDown className="h-4 w-4 flex-shrink-0" style={{ color: dimensionOuverte === dim.id ? dim.couleur : '#9ca3af' }} />
                    </div>
                  </div>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: dimensionOuverte === dim.id ? 200 : 0, opacity: dimensionOuverte === dim.id ? 1 : 0 }}
                  >
                    <p className="mt-4 text-sm text-gray-600 leading-relaxed border-t pt-4" style={{ borderColor: dim.couleur + '30' }}>
                      {dim.exemple}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {/* Carte "En savoir plus" */}
            <div className="rounded-xl border-2 border-dashed border-gray-200 bg-white p-5 flex flex-col items-center justify-center text-center gap-3 hover:border-gray-300 transition-colors">
              <Compass className="h-8 w-8" style={{ color: '#515792' }} />
              <p className="text-sm text-gray-500">Découvrez comment ces dimensions sont explorées dans l'expérience Boussole.</p>
              <Button variant="outline" size="sm" className="text-xs" style={{ borderColor: '#515792', color: '#515792' }} asChild>
                <Link href="/projet">Voir le projet</Link>
              </Button>
            </div>
          </div>
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
      <footer className="py-10 px-4 border-t border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo-memoways.png" alt="Memoways" className="h-10 w-auto" />
            <div className="text-left">
              <p className="font-semibold" style={{ color: '#515792' }}>Memoways Research</p>
              <p className="text-sm text-gray-400">Juin 2026</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400 mb-2">
              Site compagnon du projet <span className="font-medium text-gray-600">Boussole Numérique Culture</span>
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-end text-xs text-gray-400">
              <Link href="/gouvernance" className="hover:text-gray-600 transition-colors">Gouvernance & données</Link>
              <Link href="/ressources" className="hover:text-gray-600 transition-colors">Ressources</Link>
              <a href="https://memoways.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors flex items-center gap-1">
                memoways.com <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
