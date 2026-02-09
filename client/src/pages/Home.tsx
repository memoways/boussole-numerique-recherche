import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileText, Download, ExternalLink, TrendingUp, AlertTriangle, Lightbulb, BookOpen } from "lucide-react";

/**
 * Design Philosophy: Data-Driven Infographic
 * - Color-coded by theme (AI=blue, opportunities=green, challenges=orange)
 * - Tile-based layout with varied card sizes
 * - Animated statistics and visual data
 * - Custom iconography for each section
 */

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Data Visualization Background */}
      <section 
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/s8jDwY7kKeLp2ysb9RJVBl/sandbox/gSc6Q6AF4hoSwsOEKVwFZZ-img-1_1770647276000_na1fn_aGVyby1kYXRhLXZpc3VhbGl6YXRpb24.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvczhqRHdZN2tLZUxwMnlzYjlSSlZCbC9zYW5kYm94L2dTYzZRNkFGNGhvU3dzT0VLVndGWlotaW1nLTFfMTc3MDY0NzI3NjAwMF9uYTFmbl9hR1Z5Ynkxa1lYUmhMWFpwYzNWaGJHbDZZWFJwYjI0LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=lNibmShzwRCx5K4uj35jbQSU9tnk-zn4VYXkapQ6H2riN9XGfUW506ITkO0qWWG5hjTP6p9xQgEFIDZieTPdqfDXApggdXYQP4jGtSq5UN2slN87CjDzxZ9EHvrhywIX8~aoRgnGMnD2uG492KJ09v3pmy~hHOwhF50eXOqtV4ZM6Ga3HPXoINrqilAmJAOUFUxZr645M5jARTKomDrYyaPOQOTJzrB5bRPhIe6KqCYx3fdKAY-BH0FvVHogDQeQsL88xwZxq1o~CXznOTYLCUdGvMyu0giKgwFxx7wyKU~Pefi2RWnPp20e7gpA0ulq0EzxmbOymmLyaCRkW-YUjw__')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background"></div>
        
        <div className="container relative z-10 text-center px-4 py-20">
          <Badge className="mb-6 text-sm px-4 py-2 bg-primary/10 text-primary border-primary/20">
            Recherche • Février 2026
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Transformation Numérique
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-foreground/90">
            dans le Secteur Culturel
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            État des lieux complet sur l'adoption de l'IA et la transformation numérique dans les industries culturelles et créatives. Une base documentaire pour le projet <span className="font-semibold text-foreground">Boussole Numérique Culture</span>.
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold font-mono text-primary mb-2">89</div>
                <div className="text-sm text-muted-foreground">Sources identifiées</div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/80 backdrop-blur-sm border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold font-mono text-secondary mb-2">4</div>
                <div className="text-sm text-muted-foreground">Documents PDF clés</div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/80 backdrop-blur-sm border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold font-mono text-accent mb-2">70%</div>
                <div className="text-sm text-muted-foreground">Taux d'échec</div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/80 backdrop-blur-sm border-chart-4/20 hover:border-chart-4/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold font-mono text-chart-4 mb-2">3</div>
                <div className="text-sm text-muted-foreground">Années couvertes</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-base group" onClick={() => scrollToSection('overview')}>
              Découvrir la recherche
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="text-base" onClick={() => scrollToSection('documents')}>
              <Download className="mr-2 h-5 w-5" />
              Télécharger les documents
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-20">
        {/* Introduction */}
        <div id="overview" className="max-w-4xl mx-auto mb-20 scroll-mt-20">
          <h3 className="text-3xl font-bold mb-6">Vue d'ensemble</h3>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Ce dossier contient le résultat d'une recherche approfondie sur la transformation numérique dans les industries culturelles et créatives, menée en février 2026. L'objectif est de fournir une base documentaire solide pour le projet <strong className="text-foreground">Boussole Numérique Culture</strong> et la préparation d'un dossier de subvention auprès de la Ville de Genève.
          </p>
        </div>

        {/* Key Findings Grid */}
        <div id="findings" className="grid md:grid-cols-3 gap-8 mb-20 scroll-mt-20">
          {/* Challenges Card */}
          <Card className="border-accent/30 hover:border-accent/60 transition-all duration-300 hover:shadow-xl group">
            <CardHeader>
              <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-8 h-8 text-accent" />
              </div>
              <CardTitle className="text-2xl">Problèmes Récurrents</CardTitle>
              <CardDescription>Les obstacles identifiés</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                <p className="text-sm"><strong className="font-semibold">70% d'échec</strong> des transformations numériques (BCG, McKinsey, Gartner)</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                <p className="text-sm">Résistance culturelle au changement</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                <p className="text-sm">Manque de stratégie numérique claire</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                <p className="text-sm">Écart de compétences numériques (digital skills gap)</p>
              </div>
            </CardContent>
          </Card>

          {/* Opportunities Card */}
          <Card className="border-secondary/30 hover:border-secondary/60 transition-all duration-300 hover:shadow-xl group">
            <CardHeader>
              <div className="w-16 h-16 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-secondary" />
              </div>
              <CardTitle className="text-2xl">Opportunités Majeures</CardTitle>
              <CardDescription>Les leviers identifiés</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                <p className="text-sm">Nouveaux instruments de financement (OFC/BAK 2026-2028)</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                <p className="text-sm">Politiques publiques actives (Genève, Pro Helvetia)</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                <p className="text-sm">Méthodologies d'évaluation validées (Québec, France)</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                <p className="text-sm">Demande croissante pour formation et accompagnement</p>
              </div>
            </CardContent>
          </Card>

          {/* Critical Issues Card */}
          <Card className="border-primary/30 hover:border-primary/60 transition-all duration-300 hover:shadow-xl group">
            <CardHeader>
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Enjeux Critiques</CardTitle>
              <CardDescription>Les défis à relever</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <p className="text-sm">Équité et accès aux outils numériques et d'IA</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <p className="text-sm">Diversité culturelle et biais algorithmiques</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <p className="text-sm">Souveraineté culturelle</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <p className="text-sm">Formation et compétences hybrides</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents Section */}
        <div id="documents" className="mb-20 scroll-mt-20">
          <h3 className="text-3xl font-bold mb-8">Documents Principaux</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Main Report */}
            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Document Principal</Badge>
                    <CardTitle className="text-xl mb-2">État des Lieux - Transformation Numérique Culture</CardTitle>
                    <CardDescription>Synthèse complète et structurée de la recherche</CardDescription>
                  </div>
                  <FileText className="w-8 h-8 text-primary flex-shrink-0 ml-4" />
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• État des lieux de la transformation numérique culturelle</li>
                  <li>• Analyse de l'adoption de l'IA dans le secteur</li>
                  <li>• Politiques publiques et mécanismes de soutien</li>
                  <li>• Recommandations stratégiques pour le projet Boussole</li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full group"
                  asChild
                >
                  <a href="/etat_des_lieux_transformation_numerique_culture.md" target="_blank" rel="noopener noreferrer">
                    Consulter le document
                    <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
                    <CardTitle className="text-xl mb-2">Liste des 89 Sources</CardTitle>
                    <CardDescription>Études, rapports, articles et guides</CardDescription>
                  </div>
                  <BookOpen className="w-8 h-8 text-secondary flex-shrink-0 ml-4" />
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• Classées par thématique</li>
                  <li>• Avec URLs et niveau de pertinence</li>
                  <li>• Couverture: Suisse, Europe, Québec</li>
                  <li>• Période: 2023-2026</li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full group"
                  asChild
                >
                  <a href="/sources_trouvees.md" target="_blank" rel="noopener noreferrer">
                    Voir toutes les sources
                    <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* PDF Documents */}
        <div id="pdfs" className="mb-20 scroll-mt-20">
          <h3 className="text-3xl font-bold mb-8">Documents PDF Téléchargés</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg">UNESCO - IA et Culture (2025)</CardTitle>
                <CardDescription>Rapport du Groupe d'Experts Indépendants • 80 pages</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge className="mb-3">Référence Internationale</Badge>
                <p className="text-sm text-muted-foreground mb-4">MONDIACULT 2025 - Analyse complète de l'impact de l'IA sur le secteur culturel mondial</p>
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <a href="/UNESCO_AI_Culture_2025.pdf" download>
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger (3.3 MB)
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg">L'IA en culture - Québec (2025)</CardTitle>
                <CardDescription>Compétence Culture • 126 pages</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge className="mb-3">Méthodologie Clé</Badge>
                <p className="text-sm text-muted-foreground mb-4">Grille d'évaluation de maturité IA directement applicable au contexte suisse romand</p>
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <a href="/Quebec_IA_Culture_2025.pdf" download>
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger (7.9 MB)
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg">AI in European Cultural Industries (2025)</CardTitle>
                <CardDescription>CREMEL • Étude comparative</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge className="mb-3">Comparaison Européenne</Badge>
                <p className="text-sm text-muted-foreground mb-4">Adoption de l'IA dans 6 pays européens - Patterns et barrières identifiés</p>
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <a href="/Europe_AI_Cultural_Industries_2025.pdf" download>
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger (782 KB)
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg">Digital Transformation & Cultural Policies (2024)</CardTitle>
                <CardDescription>Hylland & Primorac • Recherche académique</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge className="mb-3">Politiques Publiques</Badge>
                <p className="text-sm text-muted-foreground mb-4">Analyse des politiques culturelles numériques en Europe, incluant la Suisse</p>
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <a href="/Digital_Transformation_Cultural_Policies_Europe_2024.pdf" download>
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger (2.3 MB)
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer CTA */}
        <Card className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-2 border-primary/20">
          <CardContent className="pt-8 pb-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Projet Boussole Numérique Culture</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Cette recherche constitue la base documentaire pour l'élaboration d'une application web d'auto-évaluation de la maturité numérique destinée aux acteurs culturels genevois.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="https://memoways.com/" target="_blank" rel="noopener noreferrer">
                  En savoir plus sur le projet
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://memoways.com/" target="_blank" rel="noopener noreferrer">
                  Contacter Memoways
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-3">À propos</h4>
              <p className="text-sm text-muted-foreground">
                Recherche réalisée par <strong>Manus AI</strong> pour le compte de <strong>Memoways</strong>, dans le cadre du projet Boussole Numérique Culture.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <p className="text-sm text-muted-foreground">
                <strong>Ulrich Fischer</strong><br />
                Memoways<br />
                <a href="https://memoways.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">memoways.com</a>
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Approche</h4>
              <p className="text-sm text-muted-foreground">
                Transformation PAR le numérique - centrée sur le sens, la curiosité, l'autonomie, le partage et la collaboration.
              </p>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground border-t pt-8">
            © 2026 Memoways • Recherche réalisée en février 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
