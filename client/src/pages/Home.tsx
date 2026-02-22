import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileText, Download, ExternalLink, TrendingUp, AlertTriangle, Lightbulb, BookOpen, Users, Target, Zap, Building2, Theater, Sparkles } from "lucide-react";
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
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(https://cdn.manus.space/i03jtsba6w88n8r7talhx-4adef7d1/01JJ7FQWP8KFXGCQNFVF5XJHQQ.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background"></div>
        
        <div className="container relative z-10 text-center px-4 py-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 bg-clip-text text-transparent">Transformation</span>{" "}
            <span className="bg-gradient-to-r from-green-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">Numérique</span>
            <br />
            <span className="text-foreground">dans le Secteur Culturel</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
            État des lieux sur l'adoption de l'IA et la transformation numérique dans les industries culturelles et créatives.<br/>
            Une base documentaire pour le projet <span className="font-semibold text-foreground">Boussole Numérique Culture</span>.
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-12">
            <Card className="bg-card/80 backdrop-blur-sm border-2 transition-all hover:border-[#515792]" style={{ borderColor: '#515792' }}>
              <CardContent className="pt-6 text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#515792' }}>60+</div>
                <div className="text-sm text-muted-foreground">Institutions culturelles (Genève)</div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/80 backdrop-blur-sm border-2 transition-all hover:border-[#E27227]" style={{ borderColor: '#E27227' }}>
              <CardContent className="pt-6 text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#E27227' }}>40%</div>
                <div className="text-sm text-muted-foreground">Pourraient l'utiliser</div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/80 backdrop-blur-sm border-2 transition-all hover:border-[#E58441]" style={{ borderColor: '#E58441' }}>
              <CardContent className="pt-6 text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#E58441' }}>25h</div>
                <div className="text-sm text-muted-foreground">Économisées par structure</div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/80 backdrop-blur-sm border-2 transition-all hover:border-[#EFCFB7]" style={{ borderColor: '#EFCFB7' }}>
              <CardContent className="pt-6 text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#262845' }}>60M</div>
                <div className="text-sm text-muted-foreground">CHF subventions annuelles</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg group"
              style={{ backgroundColor: '#515792', borderColor: '#515792' }}
              onClick={() => scrollToSection('vue-ensemble')}
            >
              Découvrir la recherche
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg group"
              style={{ borderColor: '#E27227', color: '#E27227' }}
              onClick={() => scrollToSection('documents')}
            >
              <Download className="mr-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
              Télécharger les documents
            </Button>
          </div>
        </div>
      </section>

      {/* Vue d'ensemble Section */}
      <section id="vue-ensemble" className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Vue d'Ensemble de la Recherche</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Cette recherche approfondie analyse la transformation numérique dans les secteurs culturels et artistiques (cinéma, arts plastiques, théâtre, musées, festivals) en Suisse, France, Europe et Canada. Elle constitue la base documentaire du projet <strong>Boussole Numérique Culture</strong>, un outil de sensibilisation et d'accompagnement à l'image de <em>Nos Gestes Climat</em> : simple, concret, rapide à utiliser pour une première évaluation, puis utilisable régulièrement pour suivre ses avancées avec des points d'étape avant/après.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 transition-all hover:border-[#515792]" style={{ borderColor: '#515792' }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-3" style={{ backgroundColor: '#515792', color: 'white', borderColor: '#515792' }}>Objectif</Badge>
                    <CardTitle className="text-xl">Base Documentaire Probante</CardTitle>
                  </div>
                  <Target className="w-8 h-8 flex-shrink-0" style={{ color: '#515792' }} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Fournir une base de réflexion solide pour élaborer le concept de la <strong>Boussole Numérique Culture</strong>, un outil de sensibilisation permettant aux acteurs culturels de mieux appréhender les enjeux numériques et de l'IA.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-[#E27227]" style={{ borderColor: '#E27227' }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-3" style={{ backgroundColor: '#E27227', color: 'white', borderColor: '#E27227' }}>Impact</Badge>
                    <CardTitle className="text-xl">Temps Libéré pour Créer</CardTitle>
                  </div>
                  <Sparkles className="w-8 h-8 flex-shrink-0" style={{ color: '#E27227' }} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>25h économisées</strong> par structure sur l'auto-évaluation. Ce temps gagné permet de se concentrer sur l'essentiel : <strong>projets artistiques, collaboration, intégration des publics</strong> et enjeux de société.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-[#E58441]" style={{ borderColor: '#E58441' }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-3" style={{ backgroundColor: '#E58441', color: 'white', borderColor: '#E58441' }}>Méthodologie</Badge>
                    <CardTitle className="text-xl">Approche Rigoureuse</CardTitle>
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
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Constats Majeurs Section */}
      <section id="findings" className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Constats Majeurs</h2>
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
                    <CardTitle className="text-2xl">Défis Récurrents</CardTitle>
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
                    <CardTitle className="text-2xl">Leviers d'Action</CardTitle>
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
                    <CardTitle className="text-2xl">Enjeux Stratégiques</CardTitle>
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
                    <CardTitle className="text-2xl">Pourquoi un Nouvel Outil ?</CardTitle>
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
                    <p className="text-sm font-semibold mb-2" style={{ color: '#E27227' }}>Outils existants : stagnation depuis 2019</p>
                    <p className="text-sm text-muted-foreground">
                      Meemoo (Belgique) et DigMus (Suède) n'ont pas évolué. Aucun outil spécifique pour la Suisse romande avec accompagnement IA personnalisé.
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
            <h2 className="text-4xl font-bold mb-6">Documents Principaux</h2>
            <p className="text-lg text-muted-foreground">
              Accédez aux synthèses et documents sources qui ont alimenté cette recherche.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Étude Complète */}
            <Card className="border-2 transition-all hover:shadow-lg hover:border-[#515792]" style={{ borderColor: '#515792' }}>
              <CardHeader>
                <FileText className="w-12 h-12 mb-4" style={{ color: '#515792' }} />
                <CardTitle>Étude Complète</CardTitle>
                <CardDescription>Document Consolidé - Toute l'Étude</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Résumé exécutif, état des lieux, synthèse des 4 PDF, 104 sources, grille d'évaluation maturité IA, recommandations stratégiques.
                </p>
                <Button className="w-full" style={{ backgroundColor: '#515792', borderColor: '#515792' }} asChild>
                  <a href="/etude_complete_transformation_numerique_culture.md" download>
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger (MD)
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* État des Lieux */}
            <Card className="border-2 transition-all hover:shadow-lg hover:border-[#E27227]" style={{ borderColor: '#E27227' }}>
              <CardHeader>
                <FileText className="w-12 h-12 mb-4" style={{ color: '#E27227' }} />
                <CardTitle>État des Lieux</CardTitle>
                <CardDescription>Rapport de Synthèse Principal</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analyse détaillée de la transformation numérique, adoption de l'IA, politiques publiques, enjeux et recommandations.
                </p>
                <Button className="w-full" style={{ backgroundColor: '#E27227', borderColor: '#E27227' }} asChild>
                  <a href="/etat_des_lieux_transformation_numerique_culture.md" download>
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger (MD)
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Liste des Sources */}
            <Card className="border-2 transition-all hover:shadow-lg hover:border-[#E58441]" style={{ borderColor: '#E58441' }}>
              <CardHeader>
                <FileText className="w-12 h-12 mb-4" style={{ color: '#E58441' }} />
                <CardTitle>Liste des Sources</CardTitle>
                <CardDescription>104 Sources Documentées</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Bibliographie complète avec liens, descriptions et catégorisation par thématique et géographie.
                </p>
                <Button className="w-full" style={{ backgroundColor: '#E58441', borderColor: '#E58441' }} asChild>
                  <a href="/sources_trouvees.md" download>
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger (MD)
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Synthèse Documents Clés */}
            <Card className="border-2 transition-all hover:shadow-lg hover:border-[#EFCFB7]" style={{ borderColor: '#EFCFB7' }}>
              <CardHeader>
                <FileText className="w-12 h-12 mb-4" style={{ color: '#262845' }} />
                <CardTitle>Synthèse Documents Clés</CardTitle>
                <CardDescription>Extraction des 4 PDF Majeurs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Informations essentielles extraites des rapports UNESCO, Québec, Europe et politiques culturelles.
                </p>
                <Button className="w-full" style={{ backgroundColor: '#262845', borderColor: '#262845' }} asChild>
                  <a href="/synthese_documents_cles.md" download>
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger (MD)
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* README */}
            <Card className="border-2 transition-all hover:shadow-lg hover:border-[#515792]" style={{ borderColor: '#515792' }}>
              <CardHeader>
                <FileText className="w-12 h-12 mb-4" style={{ color: '#515792' }} />
                <CardTitle>Guide d'Utilisation</CardTitle>
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
            <h2 className="text-4xl font-bold mb-6">Documents PDF Clés</h2>
            <p className="text-lg text-muted-foreground">
              Les 4 rapports majeurs qui ont structuré cette recherche.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card className="border-2 transition-all hover:shadow-lg hover:border-[#515792]" style={{ borderColor: '#515792' }}>
              <CardHeader>
                <Badge className="mb-3 w-fit" style={{ backgroundColor: '#515792', color: 'white', borderColor: '#515792' }}>UNESCO 2025</Badge>
                <CardTitle>IA et Culture</CardTitle>
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
                <CardTitle>L'IA en Culture</CardTitle>
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
                <CardTitle>IA dans les Industries Culturelles</CardTitle>
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
                <CardTitle>Transformation Numérique et Politiques Culturelles</CardTitle>
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

      {/* Écosystème Genevois Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Écosystème Culturel Genevois</h2>
            <p className="text-lg text-muted-foreground">
              Genève dispose d'un écosystème culturel riche et diversifié, avec des institutions de renommée internationale et un tissu associatif dynamique.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            <Card className="border-2 transition-all hover:border-[#515792]" style={{ borderColor: '#515792' }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-3" style={{ backgroundColor: '#515792', color: 'white', borderColor: '#515792' }}>Musées</Badge>
                    <CardTitle className="text-xl">16 Musées</CardTitle>
                  </div>
                  <Building2 className="w-8 h-8 flex-shrink-0" style={{ color: '#515792' }} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  MAH, MEG, Muséum d'histoire naturelle, MAMCO, Musée d'histoire des sciences, Conservatoire et Jardin botaniques, et plus.
                </p>
                <p className="text-xs text-muted-foreground italic">
                  Source : Ville de Genève, janvier 2026
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-[#E27227]" style={{ borderColor: '#E27227' }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-3" style={{ backgroundColor: '#E27227', color: 'white', borderColor: '#E27227' }}>Scènes</Badge>
                    <CardTitle className="text-xl">20+ Théâtres & Salles</CardTitle>
                  </div>
                  <Theater className="w-8 h-8 flex-shrink-0" style={{ color: '#E27227' }} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Grand Théâtre, Comédie de Genève, Am Stram Gram, Alhambra, Arena, Victoria Hall, Casino Théâtre, et plus.
                </p>
                <p className="text-xs text-muted-foreground italic">
                  Source : Culture accessible Genève
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-[#E58441]" style={{ borderColor: '#E58441' }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-3" style={{ backgroundColor: '#E58441', color: 'white', borderColor: '#E58441' }}>Soutien</Badge>
                    <CardTitle className="text-xl">60M CHF/an</CardTitle>
                  </div>
                  <Sparkles className="w-8 h-8 flex-shrink-0" style={{ color: '#E58441' }} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  La Ville de Genève octroie plus de 60 millions de francs de subventions annuelles dans le domaine culturel.
                </p>
                <p className="text-xs text-muted-foreground italic">
                  Source : Ville de Genève, février 2026
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-2" style={{ borderColor: '#515792' }}>
              <CardHeader>
                <CardTitle className="text-2xl">Impact et Fréquentation</CardTitle>
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
