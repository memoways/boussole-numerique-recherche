import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileText, Download, ExternalLink, TrendingUp, AlertTriangle, Lightbulb, BookOpen, Users, Target, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";

/**
 * Design Philosophy: Data-Driven Infographic
 * - Color-coded by theme (AI=blue, opportunities=green, challenges=orange)
 * - Animated statistics and data visualization
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
          <Badge className="mb-6 text-base px-4 py-2 bg-chart-2/10 text-chart-2 border-chart-2/20">
            Recherche • Février 2026
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 bg-clip-text text-transparent">Transformation</span>{" "}
            <span className="bg-gradient-to-r from-green-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">Numérique</span>
            <br />
            <span className="text-foreground">dans le Secteur Culturel</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
            État des lieux complet sur l'adoption de l'IA et la transformation numérique dans les industries culturelles et créatives. Une base documentaire pour le projet <span className="font-semibold text-foreground">Boussole Numérique Culture</span>.
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-12">
            <Card className="bg-card/80 backdrop-blur-sm border-2 border-chart-2/20 hover:border-chart-2/40 transition-all">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">104</div>
                <div className="text-sm text-muted-foreground">Sources identifiées</div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/80 backdrop-blur-sm border-2 border-chart-3/20 hover:border-chart-3/40 transition-all">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl md:text-5xl font-bold text-green-500 mb-2">4</div>
                <div className="text-sm text-muted-foreground">Documents PDF clés</div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/80 backdrop-blur-sm border-2 border-destructive/20 hover:border-destructive/40 transition-all">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">70%</div>
                <div className="text-sm text-muted-foreground">Taux d'échec</div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/80 backdrop-blur-sm border-2 border-chart-1/20 hover:border-chart-1/40 transition-all">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl md:text-5xl font-bold text-yellow-600 mb-2">3</div>
                <div className="text-sm text-muted-foreground">Années couvertes</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg group"
              onClick={() => scrollToSection('vue-ensemble')}
            >
              Découvrir la recherche
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg group"
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
              Cette recherche approfondie analyse la transformation numérique dans les secteurs culturels et artistiques (cinéma, arts plastiques, théâtre, musées, festivals) en Suisse, France, Europe et Canada. Elle constitue la base documentaire du projet <strong>Boussole Numérique Culture</strong>, un outil d'auto-évaluation destiné aux acteurs culturels genevois.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 border-chart-2/20 hover:border-chart-2/40 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-3 bg-chart-2/10 text-chart-2 border-chart-2/20">Objectif</Badge>
                    <CardTitle className="text-2xl">Base Documentaire Probante</CardTitle>
                  </div>
                  <Target className="w-8 h-8 text-chart-2 flex-shrink-0" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Fournir une base de réflexion solide pour élaborer le concept de la <strong>Boussole Numérique Culture</strong> et démontrer l'intérêt de réaliser cet outil d'auto-évaluation de la maturité numérique avec accompagnement IA personnalisé.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-chart-3/20 hover:border-chart-3/40 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-3 bg-chart-3/10 text-chart-3 border-chart-3/20">Méthodologie</Badge>
                    <CardTitle className="text-2xl">Approche Rigoureuse</CardTitle>
                  </div>
                  <BookOpen className="w-8 h-8 text-chart-3 flex-shrink-0" />
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>104 sources</strong> identifiées et analysées (2023-2026)</li>
                  <li>• <strong>4 documents PDF</strong> majeurs téléchargés et synthétisés</li>
                  <li>• Couverture : Suisse, France, Europe, Québec</li>
                  <li>• Focus : transformation numérique, IA, politiques publiques</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Constats Majeurs Section */}
      <section id="constats" className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Constats Majeurs</h2>
            <p className="text-lg text-muted-foreground">
              Les problèmes récurrents, les opportunités identifiées et les enjeux critiques pour le secteur culturel
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Problèmes Récurrents */}
            <Card className="border-2 border-destructive/20 hover:border-destructive/40 transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Badge className="mb-3 bg-destructive/10 text-destructive border-destructive/20">Problèmes</Badge>
                    <CardTitle className="text-xl mb-2">Obstacles Récurrents</CardTitle>
                    <CardDescription>Ce qui freine la transformation</CardDescription>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-destructive flex-shrink-0 ml-4" />
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="text-destructive mr-2">•</span>
                    <span><strong>70%</strong> des transformations numériques échouent (BCG, McKinsey, Gartner)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-destructive mr-2">•</span>
                    <span><strong>Résistance culturelle</strong> au changement (peur de l'inconnu, remise en cause des hiérarchies)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-destructive mr-2">•</span>
                    <span><strong>Manque de stratégie</strong> numérique claire (efforts fragmentés, ressources gaspillées)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-destructive mr-2">•</span>
                    <span><strong>Écart de compétences</strong> numériques important (digital skills gap)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-destructive mr-2">•</span>
                    <span><strong>Faible priorisation</strong> et manque de ressources dédiées</span>
                  </li>
                </ul>
                
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm font-semibold mb-2">Chiffres Suisse (L'Œil du Public 2023, 304 institutions) :</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• <strong>63%</strong> : Manque de budget</li>
                    <li>• <strong>49%</strong> : Manque de compétences/formation</li>
                    <li>• <strong>40%</strong> : Pas de stratégie digitale formalisée</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Opportunités */}
            <Card className="border-2 border-chart-3/20 hover:border-chart-3/40 transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Badge className="mb-3 bg-chart-3/10 text-chart-3 border-chart-3/20">Opportunités</Badge>
                    <CardTitle className="text-xl mb-2">Leviers d'Action</CardTitle>
                    <CardDescription>Ce qui peut faire la différence</CardDescription>
                  </div>
                  <Lightbulb className="w-8 h-8 text-chart-3 flex-shrink-0 ml-4" />
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="text-chart-3 mr-2">•</span>
                    <span><strong>Nouveaux financements</strong> OFC/BAK 2026-2028 pour transformation numérique et IA</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-chart-3 mr-2">•</span>
                    <span><strong>Politiques publiques actives</strong> : Plan directeur 2030 Genève, Pro Helvetia Innovation & Société</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-chart-3 mr-2">•</span>
                    <span><strong>Méthodologies validées</strong> : Grille d'évaluation québécoise, Digitalomètre France</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-chart-3 mr-2">•</span>
                    <span><strong>Demande croissante</strong> pour formation et accompagnement (75% souhaitent se former)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-chart-3 mr-2">•</span>
                    <span><strong>IA comme assistant</strong> : Aide à la création, gestion, médiation (pas remplacement)</span>
                  </li>
                </ul>
                
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm font-semibold mb-2">Adoption IA (Québec 2025) :</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• <strong>62%</strong> utilisent déjà l'IA</li>
                    <li>• <strong>83%</strong> estiment que leur métier évoluera avec l'IA</li>
                    <li>• <strong>75%</strong> souhaitent se former davantage</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Enjeux Critiques */}
            <Card className="border-2 border-chart-2/20 hover:border-chart-2/40 transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Badge className="mb-3 bg-chart-2/10 text-chart-2 border-chart-2/20">Enjeux</Badge>
                    <CardTitle className="text-xl mb-2">Défis Stratégiques</CardTitle>
                    <CardDescription>Les questions essentielles</CardDescription>
                  </div>
                  <TrendingUp className="w-8 h-8 text-chart-2 flex-shrink-0 ml-4" />
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="text-chart-2 mr-2">•</span>
                    <span><strong>Équité et accès</strong> aux outils numériques et d'IA pour tous les acteurs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-chart-2 mr-2">•</span>
                    <span><strong>Diversité culturelle</strong> face aux biais algorithmiques et homogénéisation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-chart-2 mr-2">•</span>
                    <span><strong>Souveraineté culturelle</strong> : éviter la dépendance aux plateformes technologiques</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-chart-2 mr-2">•</span>
                    <span><strong>Formation et compétences</strong> hybrides (technique + artistique + éthique)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-chart-2 mr-2">•</span>
                    <span><strong>Dimension humaine</strong> : culture organisationnelle et gestion du changement</span>
                  </li>
                </ul>
                
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm font-semibold mb-2">Compétences numériques Europe :</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• <strong>56%</strong> seulement ont compétences de base</li>
                    <li>• <strong>Objectif 2030</strong> : 80% → Gap de 24 points</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nouvelle Section: Pourquoi un Nouvel Outil */}
      <section id="pourquoi-nouvel-outil" className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Pourquoi un Nouvel Outil ?</h2>
            <p className="text-lg text-muted-foreground">
              Analyse critique des solutions existantes et identification du gap à combler
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {/* Constat Stagnation */}
            <Card className="border-2 border-destructive/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                  Stagnation depuis 2019
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Les derniers outils d'auto-évaluation spécifiques au secteur culturel datent de <strong>2019-2022</strong>. Depuis 2023-2026, <strong>aucun nouvel outil n'a été détecté</strong>.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-semibold mb-2">Meemoo (Flandre, 2019)</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 47 déclarations / 5 catégories</li>
                      <li>• Néerlandais uniquement</li>
                      <li>• Pas de mise à jour depuis 5 ans</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-semibold mb-2">DigMus (Estonie, 2021-2022)</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Projet ponctuel académique</li>
                      <li>• Pas de plateforme pérenne</li>
                      <li>• Pas de suivi longitudinal</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-semibold mb-2">Microsoft Framework (2020-2022)</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Biais commercial évident</li>
                      <li>• Pousse vers solutions Microsoft</li>
                      <li>• Pas d'adoption vérifiable</li>
                    </ul>
                  </div>
                </div>

                <div className="p-6 bg-destructive/5 border-l-4 border-destructive rounded-r-lg">
                  <p className="font-semibold text-destructive mb-2">Raisons de la stagnation :</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>Désintérêt des financeurs</strong> : pas de revenus ni données exploitables commercialement</li>
                    <li>• <strong>Pas de suivi d'impact</strong> : aucune étude robuste sur l'efficacité réelle</li>
                    <li>• <strong>Fragmentation sectorielle</strong> : difficile de créer un outil universel</li>
                    <li>• <strong>Priorité post-COVID</strong> : urgence streaming/billetterie vs démarches long-terme</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Limite Commune */}
            <Card className="border-2 border-chart-1/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Zap className="w-6 h-6 text-chart-1" />
                  Limite Commune à Tous les Outils
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-6 bg-chart-1/5 border-l-4 border-chart-1 rounded-r-lg mb-6">
                  <p className="text-lg font-semibold mb-2">Problème identifié :</p>
                  <p className="text-muted-foreground">
                    Tous ces outils fournissent un <strong>score</strong> mais <strong>PAS de plan d'action actionnable</strong>. Ils permettent de reconnaître le problème, mais pas de le résoudre.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Critère</th>
                        <th className="text-left p-3 font-semibold">Audit Cabinet</th>
                        <th className="text-left p-3 font-semibold">Auto-diagnostic</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3">Coût</td>
                        <td className="p-3">5'000-20'000 CHF (Suisse PME)</td>
                        <td className="p-3 text-chart-3 font-semibold">Gratuit</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">Durée</td>
                        <td className="p-3">2-6 semaines</td>
                        <td className="p-3">15-30 minutes</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">Profondeur</td>
                        <td className="p-3">Analyse systèmes + interviews staff</td>
                        <td className="p-3">Questionnaire déclaratif</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">Accompagnement</td>
                        <td className="p-3">Suivi mise en œuvre (payant)</td>
                        <td className="p-3 text-destructive font-semibold">Aucun</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3">ROI documenté</td>
                        <td className="p-3">20-30% réduction coûts</td>
                        <td className="p-3 text-destructive font-semibold">Non mesuré</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">Limite majeure</td>
                        <td className="p-3 text-destructive font-semibold">Prix prohibitif</td>
                        <td className="p-3 text-destructive font-semibold">Pas d'action concrète</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Gap à Combler */}
            <Card className="border-2 border-chart-3/20 bg-chart-3/5">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Target className="w-6 h-6 text-chart-3" />
                  Gap à Combler : L'Approche Hybride
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-semibold mb-3 text-lg">Ce qui existe :</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✅ <strong>Audits cabinets</strong> : Profondeur + accompagnement MAIS prix prohibitif</li>
                      <li>✅ <strong>Auto-diagnostic</strong> : Gratuit + accessible MAIS inefficace seul</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-semibold mb-3 text-lg text-chart-3">Ce qui manque :</p>
                    <ul className="space-y-2 text-sm">
                      <li>🎯 <strong>Outil gratuit</strong> accessible à tous</li>
                      <li>🎯 <strong>Accompagnement IA conversationnel</strong> personnalisé</li>
                      <li>🎯 <strong>Plan d'action actionnable</strong> concret</li>
                      <li>🎯 <strong>Suivi dans le temps</strong> et mesure des progrès</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-6 bg-background rounded-lg border-2 border-chart-3">
                  <p className="text-lg font-semibold mb-2">Solution proposée : Boussole Numérique Culture</p>
                  <p className="text-muted-foreground">
                    Un outil hybride combinant la <strong>gratuité et l'accessibilité</strong> de l'auto-diagnostic avec <strong>l'accompagnement personnalisé</strong> d'un audit professionnel, grâce à l'intelligence artificielle conversationnelle et une base de connaissances curatée.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Solutions Locales */}
            <Card className="border-2 border-chart-2/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Users className="w-6 h-6 text-chart-2" />
                  Solutions Locales, Open Source et Souveraines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  L'objectif est de créer un outil qui tourne de manière <strong>sécurisée en Suisse</strong>, en privilégiant les solutions locales, open source et souveraines. Cela inclut :
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Hébergement suisse</strong> (ex: Infomaniak, autres fournisseurs locaux)</li>
                  <li>• <strong>LLM locaux ou souverains</strong> (idéalement 100% suisse, selon l'offre disponible au moment de la réalisation)</li>
                  <li>• <strong>Code open source</strong> pour transparence et réplicabilité</li>
                  <li>• <strong>Données hébergées en Suisse</strong> avec conformité RGPD</li>
                  <li>• <strong>Indépendance</strong> vis-à-vis des grandes plateformes technologiques</li>
                </ul>
                
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-sm font-semibold mb-2">Principe de souveraineté culturelle :</p>
                  <p className="text-sm text-muted-foreground">
                    Éviter la dépendance aux plateformes technologiques étrangères et garantir que les données culturelles suisses restent sous contrôle local.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nouvelle Section: Modèle de Référence */}
      <section id="modele-reference" className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Modèle de Référence : Nos Gestes Climat</h2>
            <p className="text-lg text-muted-foreground">
              Un exemple inspirant d'outil d'auto-évaluation réussi et son adaptation au secteur culturel
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="border-2 border-chart-3/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-3 bg-chart-3/10 text-chart-3 border-chart-3/20">Cas d'Usage</Badge>
                    <CardTitle className="text-2xl mb-2">Nos Gestes Climat</CardTitle>
                    <CardDescription>L'outil d'auto-évaluation carbone qui fonctionne</CardDescription>
                  </div>
                  <Lightbulb className="w-10 h-10 text-chart-3 flex-shrink-0" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-semibold mb-3">Chiffres clés :</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• <strong>2,7 millions de tests</strong> réalisés (décembre 2025)</li>
                      <li>• <strong>Open source</strong> (GitHub : 2000+ stars)</li>
                      <li>• Quiz <strong>10-15 minutes</strong>, gratuit</li>
                      <li>• <strong>Soutien institutionnel</strong> (ADEME)</li>
                      <li>• <strong>Modèle Publicodes</strong> : architecture modulaire, régionalisée</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-semibold mb-3">Pourquoi ça marche :</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>✅ <strong>Enjeu sociétal fort</strong> (urgence climatique)</li>
                      <li>✅ <strong>Actions individuelles claires</strong> (manger moins de viande, isoler logement)</li>
                      <li>✅ <strong>Interface ludique</strong>, partage social</li>
                      <li>✅ <strong>Score + actions concrètes</strong> priorisées</li>
                      <li>✅ <strong>Réplicabilité</strong> (utilisé par autres pays)</li>
                    </ul>
                  </div>
                </div>

                <div className="p-6 bg-muted rounded-lg">
                  <p className="font-semibold mb-3 text-lg">Transposition "Boussole Numérique Culture" :</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-sm mb-2 text-destructive">Défis :</p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>⚠️ Enjeu transformation numérique <strong>moins mobilisateur</strong> que climat</li>
                        <li>⚠️ Actions <strong>moins évidentes</strong> (nécessite accompagnement personnalisé)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-sm mb-2 text-chart-3">Opportunités :</p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>✅ <strong>Modèle open source</strong> réplicable</li>
                        <li>✅ <strong>Agents conversationnels IA</strong> pour pallier manque accompagnement humain</li>
                        <li>✅ <strong>Architecture modulaire</strong> adaptable par secteur</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-chart-3/5 border-l-4 border-chart-3 rounded-r-lg">
                  <p className="font-semibold mb-2">Innovation de la Boussole :</p>
                  <p className="text-sm text-muted-foreground">
                    Contrairement à Nos Gestes Climat qui propose des actions génériques, la <strong>Boussole Numérique Culture</strong> utilise l'<strong>IA conversationnelle</strong> pour fournir un <strong>accompagnement personnalisé</strong> adapté à la réalité spécifique de chaque structure ou créateur (contexte, budget, compétences, secteur).
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nouvelle Section: Écosystème Genevois */}
      <section id="ecosysteme-genevois" className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Écosystème Genevois</h2>
            <p className="text-lg text-muted-foreground">
              Partenaires envisagés pour la co-construction, le testing et le déploiement de la Boussole
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-8">
            {/* Cercle 1: Institutionnels */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-chart-2/10 flex items-center justify-center text-chart-2 font-bold">1</div>
                Partenaires Institutionnels (Légitimité + Financement)
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 border-chart-2/20 hover:border-chart-2/40 transition-all">
                  <CardHeader>
                    <Badge className="mb-2 w-fit bg-destructive/10 text-destructive border-destructive/20">CRITIQUE - Délai 2 mars 2026</Badge>
                    <CardTitle className="text-xl">Ville de Genève - DCTN</CardTitle>
                    <CardDescription>Département de la Culture et de la Transition Numérique</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-semibold text-sm mb-1">Rôle :</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Financement initial : ~20'000 CHF</li>
                        <li>• Co-portage politique et validation</li>
                        <li>• Relais communication structures subventionnées</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1">Alignement :</p>
                      <p className="text-sm text-muted-foreground">
                        Plan directeur 2030 - Axe 4 : "Transition numérique responsable, créative et inclusive"
                      </p>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">
                        Contact : numerique.sec@ville-ge.ch / culture.numerique@etat.ge.ch
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-chart-2/20 hover:border-chart-2/40 transition-all">
                  <CardHeader>
                    <CardTitle className="text-xl">Pro Helvetia</CardTitle>
                    <CardDescription>Fondation suisse pour la culture</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-semibold text-sm mb-1">Rôle :</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Co-financement (30'000-100'000 CHF)</li>
                        <li>• Déploiement national (Suisse romande → alémanique)</li>
                        <li>• Légitimité fédérale</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1">Programme :</p>
                      <p className="text-sm text-muted-foreground">
                        Innovation & Société - Synergies (art + technologies numériques, 18 mois)
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1">Gap identifié :</p>
                      <p className="text-sm text-muted-foreground">
                        Aucun outil d'auto-évaluation maturité numérique culture en Suisse
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-chart-2/20 hover:border-chart-2/40 transition-all">
                  <CardHeader>
                    <CardTitle className="text-xl">Loterie Romande</CardTitle>
                    <CardDescription>Fonds de soutien genevois</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-semibold text-sm mb-1">Rôle :</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Co-financement développement</li>
                        <li>• Financement maintenance (années 2-5)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1">Budget Genève 2024 :</p>
                      <p className="text-sm text-muted-foreground">
                        39,5 millions CHF distribués / 5'000 projets/an Suisse romande
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-chart-2/20 hover:border-chart-2/40 transition-all">
                  <CardHeader>
                    <CardTitle className="text-xl">UNIGE + HEAD Genève</CardTitle>
                    <CardDescription>Partenaires académiques</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-semibold text-sm mb-1">UNIGE - Rôle :</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Validation académique</li>
                        <li>• CAS Innovation et changement culturel</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1">HEAD - Rôle :</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Arts numériques</li>
                        <li>• Étudiants testeurs</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Cercle 2: Terrain */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-chart-3/10 flex items-center justify-center text-chart-3 font-bold">2</div>
                Partenaires Terrain (Co-construction + Testing)
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-2 border-chart-3/20 hover:border-chart-3/40 transition-all">
                  <CardHeader>
                    <Badge className="mb-2 w-fit bg-chart-3/10 text-chart-3 border-chart-3/20">STRATÉGIQUE</Badge>
                    <CardTitle className="text-lg">XN Swiss</CardTitle>
                    <CardDescription>Création numérique Suisse romande</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Déjà client (plateforme Notion)</li>
                      <li>• Réseau créateurs numériques</li>
                      <li>• Terrain de test privilégié (ICP validé)</li>
                      <li>• Co-construction questionnaire</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-chart-3/20 hover:border-chart-3/40 transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg">Bureau des Compagnies / Tigre</CardTitle>
                    <CardDescription>Théâtre indépendant Genève</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Compagnies théâtre genevoises</li>
                      <li>• Testing phase pilote (5-10 compagnies)</li>
                      <li>• Relais communication membres</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-chart-3/20 hover:border-chart-3/40 transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg">Fonction:Cinéma</CardTitle>
                    <CardDescription>Cinéma indépendant</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Basée Genève (Maison des Arts du Grütli)</li>
                      <li>• Cinéma indépendant</li>
                      <li>• Spécificités production audiovisuelle</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-chart-3/20 hover:border-chart-3/40 transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg">RP Danses</CardTitle>
                    <CardDescription>Rencontres Professionnelles de Danses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Association métier depuis 2008</li>
                      <li>• Diversité artistique (perspective danse)</li>
                      <li>• Besoins spécifiques (captation, streaming)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-chart-3/20 hover:border-chart-3/40 transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg">PolNum</CardTitle>
                    <CardDescription>Pôle Numérique Genève</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Réseau acteurs numériques genevois</li>
                      <li>• Relais communication</li>
                      <li>• Expertise technique</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-chart-3/20 hover:border-chart-3/40 transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg">Autres Associations</CardTitle>
                    <CardDescription>Écosystème culturel genevois</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Musées et patrimoine</li>
                      <li>• Festivals</li>
                      <li>• Arts visuels</li>
                      <li>• Musique</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="p-6 bg-chart-2/5 border-l-4 border-chart-2 rounded-r-lg">
              <p className="font-semibold mb-2">Note sur les partenaires :</p>
              <p className="text-sm text-muted-foreground">
                Les partenaires listés sont <strong>envisagés et en partie déjà contactés</strong>. Leur participation sera confirmée progressivement durant la phase de développement du projet. Cette liste démontre l'ancrage local du projet et sa légitimité auprès de l'écosystème culturel genevois.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Principaux Section */}
      <section id="documents" className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Documents Principaux</h2>
            <p className="text-lg text-muted-foreground">
              Téléchargez l'étude complète et les documents sources
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Complete Study */}
            <Card className="border-2 border-chart-4/20 hover:border-chart-4/40 transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Badge className="mb-3 bg-chart-4/10 text-chart-4 border-chart-4/20">Étude Complète</Badge>
                    <CardTitle className="text-xl mb-2">Document Consolidé - Toute l'Étude</CardTitle>
                    <CardDescription>Rapport complet incluant état des lieux, synthèse et sources</CardDescription>
                  </div>
                  <FileText className="w-8 h-8 text-chart-4 flex-shrink-0 ml-4" />
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• Résumé exécutif avec chiffres clés</li>
                  <li>• État des lieux complet (4 sections)</li>
                  <li>• Synthèse des 4 documents PDF</li>
                  <li>• Liste des 104 sources + annexes méthodologiques</li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full group"
                  asChild
                >
                  <a href="/etude_complete_transformation_numerique_culture.md" download>
                    Télécharger l'étude complète
                    <Download className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Sources List */}
            <Card className="border-2 border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Badge className="mb-3 bg-secondary/10 text-secondary border-secondary/20">Base Documentaire</Badge>
                    <CardTitle className="text-xl mb-2">Liste Complète des Sources</CardTitle>
                    <CardDescription>104 sources identifiées et documentées</CardDescription>
                  </div>
                  <BookOpen className="w-8 h-8 text-secondary flex-shrink-0 ml-4" />
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• 89 sources initiales + 15 sources GenSpark</li>
                  <li>• Études, rapports, articles (2023-2026)</li>
                  <li>• Couverture : Suisse, France, Europe, Québec</li>
                  <li>• Catégorisées par géographie et secteur</li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full group"
                  asChild
                >
                  <a href="/sources_trouvees.md" download>
                    Télécharger la liste des sources
                    <Download className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* PDF Documents Section */}
      <section id="pdf" className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Documents PDF Clés</h2>
            <p className="text-lg text-muted-foreground">
              4 rapports majeurs téléchargés et analysés en profondeur
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <Card className="border-2 border-chart-2/20 hover:border-chart-2/40 transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <Badge className="mb-2 w-fit bg-chart-2/10 text-chart-2 border-chart-2/20">UNESCO</Badge>
                <CardTitle className="text-lg">IA et Culture (2025)</CardTitle>
                <CardDescription>Rapport du Groupe d'Experts Indépendants</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Référence internationale sur l'impact de l'IA dans le secteur culturel. Enjeux : équité d'accès, diversité culturelle, compétences hybrides.
                </p>
                <Button variant="outline" size="sm" className="w-full group" asChild>
                  <a href="/UNESCO_AI_Culture_2025.pdf" download>
                    <Download className="mr-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                    Télécharger (3.3 MB)
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-chart-3/20 hover:border-chart-3/40 transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <Badge className="mb-2 w-fit bg-chart-3/10 text-chart-3 border-chart-3/20">Québec</Badge>
                <CardTitle className="text-lg">L'IA en Culture (2025)</CardTitle>
                <CardDescription>Compétence Culture - 126 pages</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  LA référence méthodologique : grille d'évaluation maturité IA, sondage 500+ acteurs, recommandations pratiques par type d'organisation.
                </p>
                <Button variant="outline" size="sm" className="w-full group" asChild>
                  <a href="/Quebec_IA_Culture_2025.pdf" download>
                    <Download className="mr-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                    Télécharger (7.9 MB)
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-chart-1/20 hover:border-chart-1/40 transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <Badge className="mb-2 w-fit bg-chart-1/10 text-chart-1 border-chart-1/20">Europe</Badge>
                <CardTitle className="text-lg">AI in Cultural Industries (2025)</CardTitle>
                <CardDescription>CREMEL - Étude Comparative</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analyse de l'adoption de l'IA dans 6 pays européens. Patterns identifiés, barrières communes, facteurs de succès.
                </p>
                <Button variant="outline" size="sm" className="w-full group" asChild>
                  <a href="/Europe_AI_Cultural_Industries_2025.pdf" download>
                    <Download className="mr-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                    Télécharger (782 KB)
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-chart-4/20 hover:border-chart-4/40 transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <Badge className="mb-2 w-fit bg-chart-4/10 text-chart-4 border-chart-4/20">Europe</Badge>
                <CardTitle className="text-lg">Digital Transformation & Cultural Policies (2024)</CardTitle>
                <CardDescription>Hylland & Primorac - Recherche Académique</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Analyse approfondie des politiques culturelles numériques en Europe, incluant un chapitre sur la Suisse. Modèles de politiques publiques.
                </p>
                <Button variant="outline" size="sm" className="w-full group" asChild>
                  <a href="/Digital_Transformation_Cultural_Policies_Europe_2024.pdf" download>
                    <Download className="mr-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                    Télécharger (2.3 MB)
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">À Propos de ce Projet</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Cette recherche a été réalisée pour le projet <strong>Boussole Numérique Culture</strong>, porté par Ulrich Fischer / Memoways, dans le cadre d'une demande de financement auprès de la Ville de Genève.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" asChild>
                <a href="https://memoways.com/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Visiter Memoways
                </a>
              </Button>
            </div>

            <div className="mt-12 p-6 bg-muted rounded-lg text-left">
              <p className="font-semibold mb-2">Approche Memoways :</p>
              <p className="text-sm text-muted-foreground">
                Transformation <strong>PAR</strong> le numérique - centrée sur le sens, la curiosité, l'autonomie, le partage et la collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t bg-muted/30">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Recherche réalisée en février 2026 par Manus AI pour Memoways</p>
          <p className="mt-2">Projet Boussole Numérique Culture - Genève</p>
        </div>
      </footer>
    </div>
  );
}
