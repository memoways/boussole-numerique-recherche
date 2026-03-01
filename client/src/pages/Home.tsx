import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileText, Download, ExternalLink, TrendingUp, AlertTriangle, Lightbulb, BookOpen, Users, Target, Zap, Building2, Theater, Sparkles, Eye, Star, Compass, Globe, Shield, Layers } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";

/**
 * Design Philosophy: Data-Driven Infographic with Memoways Branding
 * - Memoways colors: #515792 (blue), #E27227 (orange), #E58441 (light orange), #EFCFB7 (beige)
 * - Flashy gradients on main title
 * - Modern typography (Poppins/Open Sans/Roboto Mono)
 */
export default function Home() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      {/* Hero Section with Data Visualization Background */}
      <section 
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(https://cdn.manus.space/i03jtsba6w88n8r7talhx-4adef7d1/01JJ7FQWP8KFXGCQNFVF5XJHQQ.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background"></div>
        
        <div className="container relative z-10 text-center px-4 py-24 mt-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span style={{ background: 'linear-gradient(to right, #515792, #4a7fc1, #3aab8a, #6dc05a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Transformation numérique</span>
            <br />
            <span style={{ background: 'linear-gradient(to right, #6dc05a, #c8b830, #E58441, #E27227)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>dans le secteur culturel genevois</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
            Un site compagnon pour le projet de <strong>Boussole numérique culture</strong>, pour proposer un état des lieux sur l'adoption de l'IA et la transformation numérique dans les industries culturelles et créatives genevoises.
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-12">
            {/* Stat 1 : Pour qui ? */}
            <Card className="bg-card/80 backdrop-blur-sm border-2 transition-all hover:border-[#515792]" style={{ borderColor: '#515792' }}>
              <CardContent className="pt-6 text-center">
                <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#515792' }}>Pour qui ?</div>
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#515792' }}>~5 000</div>
                <div className="text-sm text-muted-foreground">Structures et établissements des industries culturelles et créatives (canton de Genève)</div>
                <div className="text-xs text-muted-foreground italic mt-2">
                  <a href="https://www.geneve.ch/sites/default/files/2023-06/DCTN-etude-les-empreintes-creatives-2023-geneve.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#515792] transition-colors">Empreintes Créatives, DCTN 2023</a>
                </div>
              </CardContent>
            </Card>
            
            {/* Stat 2 : Combien ? */}
            <Card className="bg-card/80 backdrop-blur-sm border-2 transition-all hover:border-[#E27227]" style={{ borderColor: '#E27227' }}>
              <CardContent className="pt-6 text-center">
                <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#E27227' }}>Combien ?</div>
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#E27227' }}>~25 000</div>
                <div className="text-sm text-muted-foreground">Personnes actives dans une profession créative et culturelle (canton de Genève, 2020–2022)</div>
                <div className="text-xs text-muted-foreground italic mt-2">
                  <a href="https://www.geneve.ch/sites/default/files/2023-06/DCTN-etude-les-empreintes-creatives-2023-geneve.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#E27227] transition-colors">Empreintes Créatives, DCTN 2023</a>
                </div>
              </CardContent>
            </Card>
            
            {/* Stat 3 : Pourquoi ? */}
            <Card className="bg-card/80 backdrop-blur-sm border-2 transition-all hover:border-[#E58441]" style={{ borderColor: '#E58441' }}>
              <CardContent className="pt-6 text-center">
                <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#E58441' }}>Pourquoi ?</div>
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#E58441' }}>55–59%</div>
                <div className="text-sm text-muted-foreground">Des professionnels culturels peinent à identifier leurs besoins en compétences IA — et 59% des actifs auront besoin de formation d'ici 2030</div>
                <div className="text-xs text-muted-foreground italic mt-2">
                  <a href="https://competenceculture.ca/nouvelles/sortie-de-letude-sur-le-developpement-des-competences-ia-en-culture/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#E58441] transition-colors">Compétence Culture 2025</a>
                  {' '}·{' '}
                  <a href="https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#E58441] transition-colors">WEF 2025</a>
                </div>
              </CardContent>
            </Card>
            
            {/* Stat 4 : Sources */}
            <Card className="bg-card/80 backdrop-blur-sm border-2 transition-all hover:border-[#EFCFB7]" style={{ borderColor: '#EFCFB7' }}>
              <CardContent className="pt-6 text-center">
                <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#262845' }}>Base documentaire</div>
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#262845' }}>104</div>
                <div className="text-sm text-muted-foreground">Sources documentées pour le projet Boussole numérique culture</div>
                <div className="text-xs text-muted-foreground italic mt-2">Recherche réalisée en février 2026</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg group"
              style={{ backgroundColor: '#515792', borderColor: '#515792' }}
              onClick={() => scrollToSection('constats')}
            >
              Constats
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg group"
              style={{ borderColor: '#E27227', color: '#E27227' }}
              onClick={() => scrollToSection('proposition')}
            >
              Proposition
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      <section id="boussole" className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="mb-4" style={{ backgroundColor: '#515792', color: 'white', borderColor: '#515792' }}>Projet en développement</Badge>
            <h2 className="text-4xl font-bold mb-6">La Boussole numérique culture</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              La <strong>Boussole numérique culture</strong> est une <strong>application web gratuite</strong> conçue pour les acteurs culturels genevois non-techniciens — directeurs, chargés de projet, artistes, administrateurs. Elle propose une expérience d'auto-évaluation de la maturité numérique, accessible sans expertise préalable, inspirée du modèle <em>Nos Gestes Climat</em> (2,7 millions de tests).
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              L'outil est conçu selon une <strong>approche contributive</strong> : dès le départ, les structures culturelles genevoises participent à la définition des indicateurs, à la validation des questions et à l'enrichissement des recommandations. L'expérience est <strong>multimodale et personnalisable</strong> : l'utilisateur choisit son type de parcours selon ses préférences (questionnaire rapide, conversation guidée, mode ludique ou interaction vocale). Les recommandations pointent vers l'écosystème genevois — formations locales, réseaux de pairs, dispositifs de financement cantonaux — sans orienter vers un acteur commercial unique.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-2">
              <Button asChild variant="outline" style={{ borderColor: '#515792', color: '#515792' }}>
                <a href="https://typebot.memoways.com/transformation" target="_blank" rel="noopener noreferrer">
                  <Eye className="w-4 h-4 mr-2" />
                  Prototype 2024 (base d'expertise)
                </a>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground italic">
              Ce prototype constitue notre base d'expertise : certaines questions et approches seront reprises et intégrées dans la version 2.0, aujourd'hui en conception.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
            <Card className="border-2" style={{ borderColor: '#515792' }}>
              <CardHeader>
                <Badge className="mb-3 w-fit" style={{ backgroundColor: '#515792', color: 'white', borderColor: '#515792' }}>Objectif</Badge>
                <CardTitle className="text-2xl">Sensibilisation et appropriation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Permettre aux structures culturelles genevoises de mieux appréhender les enjeux numériques et de l'IA, de s'approprier les nouvelles possibilités plutôt que de les subir.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Évaluation simple et rapide</li>
                  <li>• Conseil personnalisé intégré</li>
                  <li>• Suivi régulier avec points d'étape avant/après</li>
                  <li>• Complémentaire au travail de consultants</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2" style={{ borderColor: '#E27227' }}>
              <CardHeader>
                <Badge className="mb-3 w-fit" style={{ backgroundColor: '#E27227', color: 'white', borderColor: '#E27227' }}>Impact</Badge>
                <CardTitle className="text-2xl">Temps libéré pour l'essentiel</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Un outil d'auto-évaluation rapide et accessible libère du temps pour se concentrer sur l'essentiel :
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Projets artistiques</strong> et créatifs</li>
                  <li>• <strong>Collaboration</strong> entre acteurs culturels</li>
                  <li>• <strong>Intégration des publics</strong> dans les projets</li>
                  <li>• <strong>Enjeux de société</strong> et communication</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-2" style={{ borderColor: '#E58441' }}>
              <CardHeader>
                <Badge className="mb-3 w-fit" style={{ backgroundColor: '#E58441', color: 'white', borderColor: '#E58441' }}>Évolutivité</Badge>
                <CardTitle className="text-2xl">Potentiel de transposition</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Selon l'intérêt et le succès de cet outil à Genève, <strong>il est possible de le transposer à d'autres cantons et à l'ensemble de la Suisse</strong>. Le modèle genevois servira de pilote pour valider la méthodologie, les fonctionnalités et l'impact avant un déploiement plus large.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Relation recherche ↔ développement */}
      <section className="py-20 bg-gradient-to-br from-[#515792]/5 to-[#E27227]/5">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2" style={{ borderColor: '#515792' }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-3" style={{ backgroundColor: '#515792', color: 'white', borderColor: '#515792' }}>Relation recherche ↔ développement</Badge>
                    <CardTitle className="text-2xl">Comment ce site nourrit le projet Boussole</CardTitle>
                  </div>
                  <ArrowRight className="w-8 h-8 flex-shrink-0" style={{ color: '#515792' }} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Ce site de recherche constitue <strong>la base de ressources existantes du projet Boussole</strong> et un <strong>terrain d'expérimentation</strong> pour guider et cadrer les choix de conception. La recherche approfondie menée ici a permis de :
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2" style={{ color: '#515792' }}>•</span>
                    <span><strong>Valider les hypothèses</strong> et l'analyse de terrain sur les besoins des acteurs culturels</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2" style={{ color: '#515792' }}>•</span>
                    <span><strong>Situer le projet</strong> dans un contexte plus large (Suisse, Europe, Québec)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2" style={{ color: '#515792' }}>•</span>
                    <span><strong>Identifier les modèles de référence</strong> (Nos Gestes Climat) et analyser les outils existants</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2" style={{ color: '#515792' }}>•</span>
                    <span><strong>Alimenter la base de ressources</strong> qui sera intégrée dans les recommandations de la Boussole</span>
                  </li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  L'outil continuera d'être <strong>alimenté et amélioré tout au long du développement de la Boussole</strong>, assurant une évolution continue fondée sur des données probantes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recherche & contexte Section */}
      <section id="recherche-contexte" className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Vue d'ensemble de la recherche</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cette recherche approfondie analyse la transformation numérique dans les secteurs culturels et artistiques (cinéma, arts plastiques, théâtre, musées, festivals) en Suisse, France, Europe et Canada. Elle constitue la base documentaire du projet <strong>Boussole Numérique Culture</strong>, un outil de sensibilisation et d'accompagnement à l'image de <em>Nos Gestes Climat</em> : simple, concret, rapide à utiliser pour une première évaluation, puis utilisable régulièrement pour suivre ses avancées avec des points d'étape avant/après.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="border-2 transition-all hover:border-[#E58441]" style={{ borderColor: '#E58441' }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-3" style={{ backgroundColor: '#E58441', color: 'white', borderColor: '#E58441' }}>Méthodologie</Badge>
                    <CardTitle className="text-xl">Recherche assistée par IA</CardTitle>
                  </div>
                  <BookOpen className="w-8 h-8 flex-shrink-0" style={{ color: '#E58441' }} />
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>104 sources</strong> (2023-2026)</li>
                  <li>• <strong>4 PDF</strong> majeurs synthétisés</li>
                  <li>• Suisse, France, Europe, Québec</li>
                  <li>• Focus : numérique, IA, politiques</li>
                  <li>• Réalisée avec <strong>Perplexity</strong>, <strong>Manus</strong> et <strong>GenSpark</strong></li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Écosystème Genevois intégré dans Recherche & contexte */}
          <div className="mt-16">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Écosystème culturel genevois</h3>
              <p className="text-lg text-muted-foreground">
                Genève dispose d'un écosystème culturel riche et diversifié, avec des institutions de renommée internationale et un tissu associatif dynamique.
              </p>
            </div>

            <div className="text-center mb-8">
              <p className="text-muted-foreground">
                Genève couvre <strong>11 domaines culturels</strong> selon la classification de la Ville de Genève (source : <a href="https://www.geneve.ch/actualites/dossiers-information/culture-creatrice-valeurs" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#515792' }}>Ville de Genève, janvier 2026</a>)
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
              <Card className="border-2 transition-all hover:border-[#515792]" style={{ borderColor: '#515792' }}>
                <CardHeader>
                  <Badge className="mb-2" style={{ backgroundColor: '#515792', color: 'white', borderColor: '#515792' }}>Musées</Badge>
                  <CardTitle className="text-lg">16 Musées</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">MAH, MEG, Muséum, MAMCO, Musée d'histoire des sciences, Conservatoire et Jardin botaniques, etc.</p>
                </CardContent>
              </Card>
              <Card className="border-2 transition-all hover:border-[#E27227]" style={{ borderColor: '#E27227' }}>
                <CardHeader>
                  <Badge className="mb-2" style={{ backgroundColor: '#E27227', color: 'white', borderColor: '#E27227' }}>Spectacle Vivant</Badge>
                  <CardTitle className="text-lg">20+ Scènes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Grand Théâtre, Comédie, Am Stram Gram, Alhambra, Arena, Victoria Hall, Casino Théâtre, etc.</p>
                </CardContent>
              </Card>
              <Card className="border-2 transition-all hover:border-[#E58441]" style={{ borderColor: '#E58441' }}>
                <CardHeader>
                  <Badge className="mb-2" style={{ backgroundColor: '#E58441', color: 'white', borderColor: '#E58441' }}>Musique</Badge>
                  <CardTitle className="text-lg">Tous Genres</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Classique, jazz, musiques actuelles, opéra, musique improvisée (AMR), festivals musicaux.</p>
                </CardContent>
              </Card>
              <Card className="border-2 transition-all hover:border-[#515792]" style={{ borderColor: '#515792' }}>
                <CardHeader>
                  <Badge className="mb-2" style={{ backgroundColor: '#515792', color: 'white', borderColor: '#515792' }}>Cinéma & Audiovisuel</Badge>
                  <CardTitle className="text-lg">Production & Diffusion</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Salles de cinéma, festivals (GIFF, etc.), production audiovisuelle, création vidéo.</p>
                </CardContent>
              </Card>
              <Card className="border-2 transition-all hover:border-[#E27227]" style={{ borderColor: '#E27227' }}>
                <CardHeader>
                  <Badge className="mb-2" style={{ backgroundColor: '#E27227', color: 'white', borderColor: '#E27227' }}>Arts Visuels</Badge>
                  <CardTitle className="text-lg">Galeries & Ateliers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Galeries d'art, espaces d'exposition, ateliers d'artistes, illustration, bande dessinée.</p>
                </CardContent>
              </Card>
              <Card className="border-2 transition-all hover:border-[#E58441]" style={{ borderColor: '#E58441' }}>
                <CardHeader>
                  <Badge className="mb-2" style={{ backgroundColor: '#E58441', color: 'white', borderColor: '#E58441' }}>Littérature & Édition</Badge>
                  <CardTitle className="text-lg">Livres & Presse</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Bibliothèque de Genève (BGE), maisons d'édition, salons du livre, centres de littérature.</p>
                </CardContent>
              </Card>
              <Card className="border-2 transition-all hover:border-[#515792]" style={{ borderColor: '#515792' }}>
                <CardHeader>
                  <Badge className="mb-2" style={{ backgroundColor: '#515792', color: 'white', borderColor: '#515792' }}>Patrimoine</Badge>
                  <CardTitle className="text-lg">Matériel & Immatériel</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Archives, conservation, patrimoine culturel immatériel (Escalade, Feuillu, etc.).</p>
                </CardContent>
              </Card>
              <Card className="border-2 transition-all hover:border-[#E27227]" style={{ borderColor: '#E27227' }}>
                <CardHeader>
                  <Badge className="mb-2" style={{ backgroundColor: '#E27227', color: 'white', borderColor: '#E27227' }}>Festivals</Badge>
                  <CardTitle className="text-lg">Manifestations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Fête de la Musique, festivals de cinéma, festivals musicaux, manifestations culturelles.</p>
                </CardContent>
              </Card>
              <Card className="border-2 transition-all hover:border-[#E58441]" style={{ borderColor: '#E58441' }}>
                <CardHeader>
                  <Badge className="mb-2" style={{ backgroundColor: '#E58441', color: 'white', borderColor: '#E58441' }}>Architecture & Design</Badge>
                  <CardTitle className="text-lg">Création & Exposition</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Bureaux d'architecture, design graphique et industriel, expositions, arts appliqués.</p>
                </CardContent>
              </Card>
              <Card className="border-2 transition-all hover:border-[#515792]" style={{ borderColor: '#515792' }}>
                <CardHeader>
                  <Badge className="mb-2" style={{ backgroundColor: '#515792', color: 'white', borderColor: '#515792' }}>Médias Numériques</Badge>
                  <CardTitle className="text-lg">Création Digitale</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Création numérique, nouveaux médias, art digital, installations interactives.</p>
                </CardContent>
              </Card>
              <Card className="border-2 transition-all hover:border-[#E27227]" style={{ borderColor: '#E27227' }}>
                <CardHeader>
                  <Badge className="mb-2" style={{ backgroundColor: '#E27227', color: 'white', borderColor: '#E27227' }}>Danse</Badge>
                  <CardTitle className="text-lg">Compagnies & Création</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Compagnies de danse, création chorégraphique, performances, enseignement.</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mb-8">
              <p className="text-xs text-muted-foreground italic">
                Sources : Ville de Genève (janvier 2026), Culture accessible Genève, Canton de Genève
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="border-2" style={{ borderColor: '#515792' }}>
                <CardHeader>
                  <CardTitle className="text-2xl">Impact et fréquentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold mb-2" style={{ color: '#515792' }}>1,5M</div>
                      <p className="text-sm text-muted-foreground">Visiteurs musées 2024</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2" style={{ color: '#E27227' }}>6,2%</div>
                      <p className="text-sm text-muted-foreground">Emplois en industries culturelles</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2" style={{ color: '#E58441' }}>135'000</div>
                      <p className="text-sm text-muted-foreground">Participants médiation 2023</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic mt-6 text-center">
                    Sources : Bilan (février 2025), RTS (étude juin 2023), Ville de Genève (septembre 2024)
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Constats majeurs Section */}
      <section id="constats" className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Constats majeurs</h2>
            <p className="text-lg text-muted-foreground">
              Les résultats de cette recherche révèlent des défis importants mais aussi des opportunités significatives pour les acteurs culturels.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Problèmes récurrents */}
            <Card className="border-2 transition-all hover:border-[#E58441]" style={{ borderColor: '#E58441' }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-3" style={{ backgroundColor: '#E58441', color: 'white', borderColor: '#E58441' }}>Problèmes</Badge>
                    <CardTitle className="text-2xl">Défis récurrents</CardTitle>
                  </div>
                  <AlertTriangle className="w-8 h-8 flex-shrink-0" style={{ color: '#E58441' }} />
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2" style={{ color: '#E58441' }}>•</span>
                    <span><strong>70% d'échec</strong> des transformations numériques (BCG, McKinsey)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2" style={{ color: '#E58441' }}>•</span>
                    <span><strong>63% manque de budget</strong> et ressources humaines</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2" style={{ color: '#E58441' }}>•</span>
                    <span><strong>Résistance culturelle</strong> au changement organisationnel</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2" style={{ color: '#E58441' }}>•</span>
                    <span><strong>Écart de compétences</strong> numériques important (46% Europe)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2" style={{ color: '#E58441' }}>•</span>
                    <span><strong>Manque de stratégie claire</strong> et de vision long terme</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Opportunités */}
            <Card className="border-2 transition-all duration-300 hover:shadow-xl hover:border-[#E27227]" style={{ borderColor: '#E27227' }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-3" style={{ backgroundColor: '#E27227', color: 'white', borderColor: '#E27227' }}>Opportunités</Badge>
                    <CardTitle className="text-2xl">Leviers d'action</CardTitle>
                  </div>
                  <Lightbulb className="w-8 h-8 flex-shrink-0 ml-4" style={{ color: '#E27227' }} />
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2" style={{ color: '#E27227' }}>•</span>
                    <span><strong>62% utilisent déjà l'IA</strong> dans leurs activités culturelles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2" style={{ color: '#E27227' }}>•</span>
                    <span><strong>Nouveaux financements</strong> OFC/BAK 2026-2028 pour transformation numérique</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2" style={{ color: '#E27227' }}>•</span>
                    <span><strong>Solutions locales souveraines</strong> disponibles (Infomaniak, etc.)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2" style={{ color: '#E27227' }}>•</span>
                    <span><strong>Modèles validés</strong> (Nos Gestes Climat : 2,7M tests)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2" style={{ color: '#E27227' }}>•</span>
                    <span><strong>Écosystème genevois</strong> dynamique et structuré</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Enjeux stratégiques */}
            <Card className="border-2 transition-all duration-300 hover:shadow-xl hover:border-[#515792]" style={{ borderColor: '#515792' }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-3" style={{ backgroundColor: '#515792', color: 'white', borderColor: '#515792' }}>Enjeux</Badge>
                    <CardTitle className="text-2xl">Enjeux stratégiques</CardTitle>
                  </div>
                  <TrendingUp className="w-8 h-8 flex-shrink-0 ml-4" style={{ color: '#515792' }} />
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2" style={{ color: '#515792' }}>•</span>
                    <span><strong>Souveraineté numérique</strong> et protection des données culturelles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2" style={{ color: '#515792' }}>•</span>
                    <span><strong>Accessibilité</strong> et démocratisation de la culture</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2" style={{ color: '#515792' }}>•</span>
                    <span><strong>Durabilité</strong> des modèles économiques culturels</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2" style={{ color: '#515792' }}>•</span>
                    <span><strong>Préservation</strong> du patrimoine culturel numérique</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2" style={{ color: '#515792' }}>•</span>
                    <span><strong>Innovation</strong> dans les pratiques artistiques et créatives</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Pourquoi un Nouvel Outil */}
            <Card className="border-2 transition-all duration-300 hover:shadow-xl hover:border-[#EFCFB7]" style={{ borderColor: '#EFCFB7' }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-3" style={{ backgroundColor: '#EFCFB7', color: '#262845', borderColor: '#EFCFB7' }}>Analyse</Badge>
                    <CardTitle className="text-2xl">Pourquoi un nouvel outil ?</CardTitle>
                  </div>
                  <Zap className="w-8 h-8 flex-shrink-0" style={{ color: '#262845' }} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-6 border-l-4 rounded-r-lg" style={{ backgroundColor: 'rgba(239, 207, 183, 0.1)', borderColor: '#EFCFB7' }}>
                    <p className="text-sm font-semibold mb-2" style={{ color: '#262845' }}>Un outil de sensibilisation, pas un audit</p>
                    <p className="text-sm text-muted-foreground">
                      À l'image de <em>Nos Gestes Climat</em> (2,7M tests), la Boussole propose un premier état des lieux accessible, rapide et gratuit. L'objectif : mieux appréhender les enjeux numériques et IA, s'approprier les possibilités plutôt que de les subir.
                    </p>
                  </div>
                  
                  <div className="p-6 border-l-4 rounded-r-lg" style={{ backgroundColor: 'rgba(81, 87, 146, 0.05)', borderColor: '#515792' }}>
                    <p className="text-sm font-semibold mb-2" style={{ color: '#515792' }}>Complémentaire au travail de consultants</p>
                    <p className="text-sm text-muted-foreground">
                      Les consultants apportent bien plus qu'un audit : stratégie, accompagnement, expertise métier. La Boussole offre un point de départ pour identifier ses besoins avant d'engager un accompagnement professionnel, ou pour suivre régulièrement ses avancées avec des points d'étape avant/après.
                    </p>
                  </div>
                  
                  <div className="p-6 border-l-4 rounded-r-lg" style={{ backgroundColor: 'rgba(226, 114, 39, 0.05)', borderColor: '#E27227' }}>
                    <p className="text-sm font-semibold mb-2" style={{ color: '#E27227' }}>Outils existants : limites importantes</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Meemoo (Belgique) et DigMus (Suède) n'ont pas évolué depuis 2019. L'<strong>Observatoire du numérique genevois</strong> (DEE + UNIGE + HEG, 1200+ entreprises) est excellent pour les PME tous secteurs, mais non adapté à la culture et sans dimension IA. Les outils français (Diag-numerique.fr, Visiativ, CMA) présentent des limites :
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                      <li>• <strong>Modèle opaque</strong> : Algorithmes non transparents, pas d'open source</li>
                      <li>• <strong>Orientation commerciale</strong> : Lead generation (Visiativ, OPCALIA), pas de bien commun</li>
                      <li>• <strong>Pas de suivi longitudinal</strong> : Impossible de mesurer les progrès dans le temps</li>
                      <li>• <strong>Questions génériques</strong> : Peu adaptées aux spécificités du secteur culturel</li>
                      <li>• <strong>Pas de dimension collaborative</strong> : Outils individuels, pas de mise en réseau</li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-3 italic">
                      Source : Analyse comparative février 2026 (Observatoire du numérique Genève, Diag-numerique.fr/MEDEF, Visiativ, CMA France)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section id="documents" className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Documents principaux</h2>
            <p className="text-lg text-muted-foreground">
              Accédez aux synthèses et documents sources qui ont alimenté cette recherche.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Étude complète */}
            <Card className="border-2 transition-all hover:shadow-lg hover:border-[#515792]" style={{ borderColor: '#515792' }}>
              <CardHeader>
                <FileText className="w-12 h-12 mb-4" style={{ color: '#515792' }} />
                <CardTitle>Étude complète</CardTitle>
                <CardDescription>Document Consolidé - Toute l'Étude</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Résumé exécutif, état des lieux, synthèse des 4 PDF, 104 sources, grille d'évaluation maturité IA, recommandations stratégiques.
                </p>
                <Link href="/etude-complete">
                  <Button className="w-full" style={{ backgroundColor: '#515792', borderColor: '#515792' }}>
                    <Eye className="mr-2 h-4 w-4" />
                    Consulter
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* État des lieux */}
            <Card className="border-2 transition-all hover:shadow-lg hover:border-[#E27227]" style={{ borderColor: '#E27227' }}>
              <CardHeader>
                <FileText className="w-12 h-12 mb-4" style={{ color: '#E27227' }} />
                <CardTitle>État des lieux</CardTitle>
                <CardDescription>Rapport de Synthèse Principal</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analyse détaillée de la transformation numérique, adoption de l'IA, politiques publiques, enjeux et recommandations.
                </p>
                <Link href="/etat-des-lieux">
                  <Button className="w-full" style={{ backgroundColor: '#E27227', borderColor: '#E27227' }}>
                    <Eye className="mr-2 h-4 w-4" />
                    Consulter
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Analyse outils existants */}
            <Card className="border-2 transition-all hover:shadow-lg hover:border-[#EFCFB7]" style={{ borderColor: '#EFCFB7' }}>
              <CardHeader>
                <FileText className="w-12 h-12 mb-4" style={{ color: '#262845' }} />
                <CardTitle>Analyse outils existants</CardTitle>
                <CardDescription>Diagnostic Numérique France</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analyse comparative de 4 outils (Observatoire du numérique Genève, Diag-numerique.fr, Visiativ, CMA) : ce qui fonctionne, limites, recommandations pour la Boussole.
                </p>
                <Link href="/analyse-outils">
                  <Button className="w-full" style={{ backgroundColor: '#262845', borderColor: '#262845' }}>
                    <Eye className="mr-2 h-4 w-4" />
                    Consulter
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Liste des sources */}
            <Card className="border-2 transition-all hover:shadow-lg hover:border-[#E58441]" style={{ borderColor: '#E58441' }}>
              <CardHeader>
                <FileText className="w-12 h-12 mb-4" style={{ color: '#E58441' }} />
                <CardTitle>Liste des sources</CardTitle>
                <CardDescription>104 Sources Documentées</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Bibliographie complète avec liens, descriptions et catégorisation par thématique et géographie.
                </p>
                <Link href="/sources">
                  <Button className="w-full" style={{ backgroundColor: '#E58441', borderColor: '#E58441' }}>
                    <Eye className="mr-2 h-4 w-4" />
                    Consulter
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Synthèse documents clés */}
            <Card className="border-2 transition-all hover:shadow-lg hover:border-[#EFCFB7]" style={{ borderColor: '#EFCFB7' }}>
              <CardHeader>
                <FileText className="w-12 h-12 mb-4" style={{ color: '#262845' }} />
                <CardTitle>Synthèse documents clés</CardTitle>
                <CardDescription>Extraction des 4 PDF Majeurs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Informations essentielles extraites des rapports UNESCO, Québec, Europe et politiques culturelles.
                </p>
                <Link href="/synthese-documents">
                  <Button className="w-full" style={{ backgroundColor: '#262845', borderColor: '#262845' }}>
                    <Eye className="mr-2 h-4 w-4" />
                    Consulter
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Références inspirantes */}
            <Card className="border-2 transition-all hover:shadow-lg hover:border-[#515792]" style={{ borderColor: '#515792' }}>
              <CardHeader>
                <Compass className="w-12 h-12 mb-4" style={{ color: '#515792' }} />
                <CardTitle>Références inspirantes</CardTitle>
                <CardDescription>Analyse Comparative Nos Gestes Climat & Skill Builder</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analyse UX, logique pédagogique et proposition originale de la Boussole par contraste avec deux modèles internationaux.
                </p>
                <Link href="/references-inspirantes">
                  <Button className="w-full" style={{ backgroundColor: '#515792', borderColor: '#515792' }}>
                    <Eye className="mr-2 h-4 w-4" />
                    Consulter
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* README */}
            <Card className="border-2 transition-all hover:shadow-lg hover:border-[#515792]" style={{ borderColor: '#515792' }}>
              <CardHeader>
                <FileText className="w-12 h-12 mb-4" style={{ color: '#515792' }} />
                <CardTitle>Guide d'utilisation</CardTitle>
                <CardDescription>README - Mode d'Emploi</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Instructions pour naviguer dans la base documentaire et utiliser les ressources efficacement.
                </p>
                <Button className="w-full" style={{ backgroundColor: '#515792', borderColor: '#515792' }} asChild>
                  <a href="/README.md" download>
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger (MD)
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* PDF Section */}
      <section id="pdfs" className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Documents PDF clés</h2>
            <p className="text-lg text-muted-foreground">
              Les 4 rapports majeurs qui ont structuré cette recherche.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className="border-2 transition-all hover:shadow-lg hover:border-[#515792]" style={{ borderColor: '#515792' }}>
              <CardHeader>
                <Badge className="mb-3 w-fit" style={{ backgroundColor: '#515792', color: 'white', borderColor: '#515792' }}>UNESCO 2025</Badge>
                <CardTitle>IA et culture</CardTitle>
                <CardDescription>Rapport du Groupe d'Experts Indépendants</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Cadre éthique et recommandations pour l'usage de l'IA dans les secteurs culturels et créatifs.
                </p>
                <Button className="w-full" style={{ backgroundColor: '#515792', borderColor: '#515792' }} asChild>
                  <a href="/UNESCO_AI_Culture_2025.pdf" download>
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger PDF
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:shadow-lg hover:border-[#E27227]" style={{ borderColor: '#E27227' }}>
              <CardHeader>
                <Badge className="mb-3 w-fit" style={{ backgroundColor: '#E27227', color: 'white', borderColor: '#E27227' }}>Québec 2025</Badge>
                <CardTitle>L'IA en culture</CardTitle>
                <CardDescription>Mieux Comprendre pour Agir Ensemble</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Grille d'évaluation de maturité numérique/IA validée, méthodologie de sondage éprouvée.
                </p>
                <Button className="w-full" style={{ backgroundColor: '#E27227', borderColor: '#E27227' }} asChild>
                  <a href="/Quebec_IA_Culture_2025.pdf" download>
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger PDF
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:shadow-lg hover:border-[#E58441]" style={{ borderColor: '#E58441' }}>
              <CardHeader>
                <Badge className="mb-3 w-fit" style={{ backgroundColor: '#E58441', color: 'white', borderColor: '#E58441' }}>Europe 2025</Badge>
                <CardTitle>IA dans les industries culturelles</CardTitle>
                <CardDescription>Adoption et Impact en Europe</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analyse de l'adoption de l'IA dans les industries culturelles et créatives européennes.
                </p>
                <Button className="w-full" style={{ backgroundColor: '#E58441', borderColor: '#E58441' }} asChild>
                  <a href="/Europe_AI_Cultural_Industries_2025.pdf" download>
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger PDF
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:shadow-lg hover:border-[#EFCFB7]" style={{ borderColor: '#EFCFB7' }}>
              <CardHeader>
                <Badge className="mb-3 w-fit" style={{ backgroundColor: '#EFCFB7', color: '#262845', borderColor: '#EFCFB7' }}>Europe 2024</Badge>
                <CardTitle>Transformation numérique et politiques culturelles</CardTitle>
                <CardDescription>Perspectives Européennes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analyse des politiques publiques de soutien à la transformation numérique culturelle en Europe.
                </p>
                <Button className="w-full" style={{ backgroundColor: '#262845', borderColor: '#262845' }} asChild>
                  <a href="/Digital_Transformation_Cultural_Policies_Europe_2024.pdf" download>
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger PDF
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Proposition Section */}

      {/* Références inspirantes Section */}
      <section id="references-inspirantes" className="py-20 bg-gradient-to-br from-[#515792]/5 to-[#E27227]/5">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="mb-4" style={{ backgroundColor: '#515792', color: 'white', borderColor: '#515792' }}>Références inspirantes</Badge>
            <h2 className="text-4xl font-bold mb-6">Deux modèles qui inspirent la Boussole</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              La conception de la Boussole Numérique Culture s'appuie sur l'analyse approfondie de deux outils internationaux exemplaires dans leurs domaines respectifs : <strong>Nos Gestes Climat</strong> (ADEME, France) et le <strong>Skill Builder</strong> de DeepLearning.AI. Ni l'un ni l'autre n'est transposable tel quel au contexte genevois — mais chacun incarne des principes de conception dont la Boussole s'inspire.
            </p>
          </div>

          {/* Nos Gestes Climat */}
          <div className="max-w-6xl mx-auto mb-12">
            <Card className="border-2" style={{ borderColor: '#515792' }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-3" style={{ backgroundColor: '#515792', color: 'white', borderColor: '#515792' }}>Modèle 1 · Bien commun numérique</Badge>
                    <CardTitle className="text-2xl">Nos Gestes Climat (ADEME, France)</CardTitle>
                    <p className="text-muted-foreground mt-2">2,7 millions de tests · Gratuit · Open source · Sans inscription</p>
                  </div>
                  <Globe className="w-10 h-10 flex-shrink-0 ml-4" style={{ color: '#515792' }} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-3" style={{ color: '#515792' }}>Ce qui inspire la Boussole</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start">
                        <span className="mr-2" style={{ color: '#515792' }}>•</span>
                        <span><strong>Accessibilité radicale</strong> : sans inscription, sans expertise préalable, résultats immédiats</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2" style={{ color: '#515792' }}>•</span>
                        <span><strong>Pédagogie par les ordres de grandeur</strong> : situer son profil dans un contexte plus large</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2" style={{ color: '#515792' }}>•</span>
                        <span><strong>Recommandations chiffrées et actionnables</strong> : chaque action a un impact mesurable</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2" style={{ color: '#515792' }}>•</span>
                        <span><strong>Dimension collective</strong> : groupes organisations, tableau de bord agrégé, anonymat préservé</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2" style={{ color: '#515792' }}>•</span>
                        <span><strong>Modèle contributif et open source</strong> : calcul côté client, données souveraines, communauté de contributeurs</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3" style={{ color: '#E58441' }}>Limites pour notre contexte</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start">
                        <span className="mr-2" style={{ color: '#E58441' }}>•</span>
                        <span>Conçu pour la population française généraliste, pas pour un secteur professionnel spécifique</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2" style={{ color: '#E58441' }}>•</span>
                        <span>Mesure des comportements et consommations, non des compétences organisationnelles</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2" style={{ color: '#E58441' }}>•</span>
                        <span>Données françaises : pas de version suisse, pas d'adaptation au contexte genevois</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2" style={{ color: '#E58441' }}>•</span>
                        <span>Format exclusivement formulaire : pas de modalités vocales, ludiques ou narratives</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* DeepLearning.AI Skill Builder */}
          <div className="max-w-6xl mx-auto mb-12">
            <Card className="border-2" style={{ borderColor: '#E27227' }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-3" style={{ backgroundColor: '#E27227', color: 'white', borderColor: '#E27227' }}>Modèle 2 · Évaluation conversationnelle</Badge>
                    <CardTitle className="text-2xl">DeepLearning.AI Skill Builder</CardTitle>
                    <p className="text-muted-foreground mt-2">Conversation vocale · Parcours en 5 étapes · Recommandations personnalisées</p>
                  </div>
                  <Layers className="w-10 h-10 flex-shrink-0 ml-4" style={{ color: '#E27227' }} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-3" style={{ color: '#E27227' }}>Ce qui inspire la Boussole</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start">
                        <span className="mr-2" style={{ color: '#E27227' }}>•</span>
                        <span><strong>Interaction vocale naturelle</strong> : réduit la friction cognitive des formulaires, réponses plus nuancées</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2" style={{ color: '#E27227' }}>•</span>
                        <span><strong>Personnalisation dynamique</strong> : l'agent adapte ses questions au profil émergent de l'utilisateur</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2" style={{ color: '#E27227' }}>•</span>
                        <span><strong>Ton bienveillant et non normatif</strong> : posture d'accompagnement, pas d'évaluation culpabilisante</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2" style={{ color: '#E27227' }}>•</span>
                        <span><strong>Suivi de progression</strong> : mesure de l'évolution dans le temps, pas seulement un état ponctuel</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3" style={{ color: '#E58441' }}>Limites pour notre contexte</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start">
                        <span className="mr-2" style={{ color: '#E58441' }}>•</span>
                        <span>Entièrement en anglais, conçu pour des professionnels de la tech à l'international</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2" style={{ color: '#E58441' }}>•</span>
                        <span>Recommandations orientées vers le catalogue commercial de DeepLearning.AI</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2" style={{ color: '#E58441' }}>•</span>
                        <span>Données hébergées aux États-Unis : incompatible avec les exigences de souveraineté suisse</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2" style={{ color: '#E58441' }}>•</span>
                        <span>Pas de dimension territoriale ni d'orientation vers un écosystème local de soutien</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AICred mention */}
          <div className="max-w-6xl mx-auto mb-12">
            <Card className="border-2" style={{ borderColor: '#EFCFB7' }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-3" style={{ backgroundColor: '#EFCFB7', color: '#262845', borderColor: '#EFCFB7' }}>Mention complémentaire · Outil professionnel avancé</Badge>
                    <CardTitle className="text-2xl">AICred.ai — Référence pour le positionnement</CardTitle>
                    <p className="text-muted-foreground mt-2">Score 1-10 · 6 sections · 35-45 min · Validation externe PAICE</p>
                  </div>
                  <Star className="w-10 h-10 flex-shrink-0 ml-4" style={{ color: '#262845' }} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  AICred.ai se présente comme « le standard pour l'évaluation de la fluidité IA ». Cet outil propose une évaluation conversationnelle approfondie organisée en 6 sections couvrant cinq dimensions de compétence : maîtrise du prompting, compréhension technique, application pratique, évaluation critique et conception de flux de travail. Les résultats sont exprimés sur une échelle de 1 à 10, assortis d'un plan d'apprentissage personnalisé et d'un profil public partageable.
                </p>
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(239, 207, 183, 0.2)', borderLeft: '4px solid #EFCFB7' }}>
                  <p className="text-sm text-muted-foreground">
                    <strong>Positionnement de la Boussole par contraste :</strong> AICred.ai s'adresse à des professionnels souhaitant certifier leurs compétences individuelles en IA. La Boussole vise un objectif différent : permettre à des <em>structures culturelles</em> d'appréhender collectivement leurs enjeux de transformation numérique et d'identifier les leviers d'action adaptés à leur réalité institutionnelle, dans un cadre francophone, non commercial et ancré dans l'écosystème genevois.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* La proposition originale de la Boussole */}
          <div className="max-w-6xl mx-auto">
            <Card className="border-2" style={{ borderColor: '#515792' }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-3" style={{ backgroundColor: '#515792', color: 'white', borderColor: '#515792' }}>Proposition originale</Badge>
                    <CardTitle className="text-2xl">Ce que la Boussole apporte de différent</CardTitle>
                  </div>
                  <Compass className="w-10 h-10 flex-shrink-0 ml-4" style={{ color: '#515792' }} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Aucun des outils analysés n'occupe l'espace que vise la Boussole : un outil d'auto-évaluation de la maturité numérique <strong>en français, gratuit, souverain, sectoriel, multimodal et écosystémique</strong>, conçu spécifiquement pour les structures culturelles de Genève et, par extension, de la Suisse romande.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border" style={{ borderColor: '#515792', backgroundColor: 'rgba(81, 87, 146, 0.05)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-4 h-4" style={{ color: '#515792' }} />
                      <span className="font-semibold text-sm" style={{ color: '#515792' }}>Ancrage sectoriel</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Questions, indicateurs et recommandations calibrés sur les réalités des structures culturelles genevoises</p>
                  </div>
                  <div className="p-4 rounded-lg border" style={{ borderColor: '#E27227', backgroundColor: 'rgba(226, 114, 39, 0.05)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="w-4 h-4" style={{ color: '#E27227' }} />
                      <span className="font-semibold text-sm" style={{ color: '#E27227' }}>Approche multimodale</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Hybride : questionnaire Likert, conversation guidée, éléments ludiques, interaction vocale selon les préférences</p>
                  </div>
                  <div className="p-4 rounded-lg border" style={{ borderColor: '#E58441', backgroundColor: 'rgba(229, 132, 65, 0.05)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4" style={{ color: '#E58441' }} />
                      <span className="font-semibold text-sm" style={{ color: '#E58441' }}>Souveraineté des données</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Hébergement suisse ou européen, sans monétisation, sans inscription obligatoire — bien commun numérique</p>
                  </div>
                  <div className="p-4 rounded-lg border" style={{ borderColor: '#515792', backgroundColor: 'rgba(81, 87, 146, 0.05)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Compass className="w-4 h-4" style={{ color: '#515792' }} />
                      <span className="font-semibold text-sm" style={{ color: '#515792' }}>Orientation écosystémique</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Recommandations vers l'écosystème genevois : formations locales, réseaux pairs, dispositifs de financement cantonaux</p>
                  </div>
                  <div className="p-4 rounded-lg border" style={{ borderColor: '#E27227', backgroundColor: 'rgba(226, 114, 39, 0.05)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4" style={{ color: '#E27227' }} />
                      <span className="font-semibold text-sm" style={{ color: '#E27227' }}>Approche contributive</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Co-construction avec les structures culturelles : définition des indicateurs, validation des questions, enrichissement des recommandations</p>
                  </div>
                  <div className="p-4 rounded-lg border" style={{ borderColor: '#E58441', backgroundColor: 'rgba(229, 132, 65, 0.05)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4" style={{ color: '#E58441' }} />
                      <span className="font-semibold text-sm" style={{ color: '#E58441' }}>Suivi longitudinal</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Points d'étape avant/après : mesurer la progression dans le temps, pas seulement un état ponctuel</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <Link href="/references-inspirantes">
                    <Button variant="outline" style={{ borderColor: '#515792', color: '#515792' }}>
                      <Eye className="mr-2 h-4 w-4" />
                      Lire l'analyse complète
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img 
                src="/logo-memoways.png" 
                alt="Memoways" 
                className="h-12 w-auto"
              />
              <div className="text-left">
                <p className="font-semibold" style={{ color: '#515792' }}>Memoways Research</p>
                <p className="text-sm text-muted-foreground">Février 2026</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground mb-2">
                Base documentaire pour le projet <strong>Boussole Numérique Culture</strong>
              </p>
              <a 
                href="https://memoways.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-semibold hover:underline"
                style={{ color: '#515792' }}
              >
                memoways.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
