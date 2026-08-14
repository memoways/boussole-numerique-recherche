import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Link, Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import SeoMeta from "./components/SeoMeta";
import PageBreadcrumbs from "./components/PageBreadcrumbs";
import MarkdownDocument from "./components/MarkdownDocument";

import Projet from "./pages/Projet";
import Experience from "./pages/Experience";
import Methode from "./pages/Methode";
import Timeline from "./pages/Timeline";
import Recherche from "./pages/Recherche";
import References from "./pages/References";
import Partenaires from "./pages/Partenaires";
import PartnerPresentation from "./pages/PartnerPresentation";
import PartnerQuestionnaire from "./pages/PartnerQuestionnaire";
import PartnerAdmin from "./pages/PartnerAdmin";
import Ressources from "./pages/Ressources";

type HistoricalDocumentProps = {
  title: string;
  filename: string;
  description: string;
  archiveContext: string;
  archiveVersion?: string;
};

function HistoricalDocument({ title, filename, description, archiveContext, archiveVersion }: HistoricalDocumentProps) {
  return <MarkdownDocument title={title} filename={filename} description={description} archiveContext={archiveContext} archiveVersion={archiveVersion} />;
}

function LegacyRedirect({ to, label }: { to: string; label: string }) {
  const [, navigate] = useLocation();

  useEffect(() => {
    navigate(to, { replace: true });
  }, [navigate, to]);

  return (
    <section className="px-4 py-20 bg-slate-50">
      <div className="max-w-xl mx-auto rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Page déplacée</h1>
        <p className="text-gray-600 leading-relaxed mb-5">
          Cette page a été regroupée dans {label}. Redirection en cours.
        </p>
        <Link href={to} className="font-semibold text-[#515792] underline underline-offset-4">
          Ouvrir la page correspondante
        </Link>
      </div>
    </section>
  );
}

function Router() {
  const [location] = useLocation();

  return (
    <>
      <SeoMeta pathname={location} />
      <a href="#contenu-principal" className="skip-link">Aller au contenu principal</a>
      <ScrollToTop />
      <Navigation />
      <PageBreadcrumbs pathname={location} />
      <main id="contenu-principal" className="min-h-screen" tabIndex={-1}>
      <Switch>
        {/* Home */}
        <Route path={"/"} component={Home} />

        {/* Nouvelles pages PRD */}
        <Route path={"/projet"} component={Projet} />
        <Route path={"/experience"} component={Experience} />
        <Route path={"/methode"} component={Methode} />
        <Route path={"/timeline"} component={Timeline} />
        <Route path={"/recherche"} component={Recherche} />
        <Route path={"/references"} component={References} />
        <Route path={"/partenaires"} component={Partenaires} />
        <Route path={"/partenaires/presentation"} component={PartnerPresentation} />
        <Route path={"/partenaires/questionnaire/:token"} component={PartnerQuestionnaire} />
        <Route path={"/partenaires/questionnaire"} component={PartnerQuestionnaire} />
        <Route path={"/partenaires/admin"} component={PartnerAdmin} />
        <Route path={"/admin"} component={PartnerAdmin} />
        <Route path={"/ressources"} component={Ressources} />

        {/* Documents historiques préservés sous une arborescence Ressources explicite. */}
        <Route path={"/ressources/etude-complete"}>{() => (
          <HistoricalDocument
            title="Étude complète"
            filename="etude_complete_transformation_numerique_culture.md"
            description="Document consolidé : résumé exécutif, état des lieux, synthèse des quatre PDF, 104 sources, grille d’évaluation de maturité IA et recommandations stratégiques."
            archiveVersion="version 2, février 2026"
            archiveContext="Cette étude rassemble des sources publiées entre 2023 et 2026 et des choix de recherche formulés à cette date."
          />
        )}</Route>
        <Route path={"/ressources/etat-des-lieux"}>{() => (
          <HistoricalDocument
            title="État des lieux"
            filename="etat_des_lieux_transformation_numerique_culture.md"
            description="Rapport de synthèse sur la transformation numérique, l’adoption de l’IA, les politiques publiques et les enjeux du secteur culturel."
            archiveContext="Ce rapport ne porte pas de date de version explicite. Il doit être lu comme une synthèse de recherche historique, distincte des contenus actifs du portail."
          />
        )}</Route>
        <Route path={"/ressources/analyse-outils"}>{() => (
          <HistoricalDocument
            title="Analyse des outils existants"
            filename="analyse_outils_diagnostic_numerique_france.md"
            description="Document d’archive : comparaison d’outils de diagnostic et enseignements retenus pour la recherche du projet."
            archiveVersion="février 2026"
            archiveContext="Cette analyse compare des outils étudiés pendant la recherche initiale. Elle ne constitue pas le tableau comparatif actif et ne valide pas les services cités."
          />
        )}</Route>
        <Route path={"/ressources/synthese-documents"}>{() => (
          <HistoricalDocument
            title="Synthèse des documents clés"
            filename="synthese_documents_cles.md"
            description="Synthèse détaillée des quatre documents PDF majeurs analysés pour cette recherche."
            archiveContext="Cette synthèse reprend des documents datés dans leurs titres et doit être lue avec les dates de publication propres à chaque source."
          />
        )}</Route>
        <Route path={"/ressources/sources"}>{() => (
          <HistoricalDocument
            title="Liste des sources"
            filename="sources_trouvees.md"
            description="104 sources documentées, classées par thème, géographie et type de publication."
            archiveContext="Cette bibliographie garde la date indiquée par chaque source. Les mentions relatives telles que « récent » ou « priorité haute » reflètent le moment de la collecte."
          />
        )}</Route>
        <Route path={"/ressources/references-inspirantes"}>{() => (
          <HistoricalDocument
            title="Références inspirantes"
            filename="references_inspirantes.md"
            description="Document d’archive : analyse de références inspirantes mobilisées pendant la recherche initiale."
            archiveVersion="février 2026"
            archiveContext="Cette analyse reflète une sélection initiale. Les comparaisons et outils cités ne constituent pas les Références actives du portail."
          />
        )}</Route>

        {/* Anciennes URLs : leurs contenus sont disponibles aux destinations canoniques. */}
        <Route path={"/description-projet"}>{() => <LegacyRedirect to="/projet" label="la page Projet" />}</Route>
        <Route path={"/gouvernance"}>{() => <LegacyRedirect to="/methode" label="la page Méthode" />}</Route>
        <Route path={"/references-inspirantes"}>{() => <LegacyRedirect to="/ressources/references-inspirantes" label="les documents historiques" />}</Route>
        <Route path={"/etude-complete"}>{() => <LegacyRedirect to="/ressources/etude-complete" label="les documents et sources" />}</Route>
        <Route path={"/etat-des-lieux"}>{() => <LegacyRedirect to="/ressources/etat-des-lieux" label="les documents et sources" />}</Route>
        <Route path={"/analyse-outils"}>{() => <LegacyRedirect to="/ressources/analyse-outils" label="les documents et sources" />}</Route>
        <Route path={"/sources"}>{() => <LegacyRedirect to="/ressources/sources" label="les documents et sources" />}</Route>
        <Route path={"/synthese-documents"}>{() => <LegacyRedirect to="/ressources/synthese-documents" label="les documents et sources" />}</Route>

        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
