import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

// Pages existantes (conservées)
import ReferencesInspirantes from "./pages/ReferencesInspirantes";
import EtudeComplete from "./pages/EtudeComplete";
import EtatDesLieux from "./pages/EtatDesLieux";
import AnalyseOutils from "./pages/AnalyseOutils";
import Sources from "./pages/Sources";
import SyntheseDocuments from "./pages/SyntheseDocuments";

// Nouvelles pages selon le PRD
import Projet from "./pages/Projet";
import Experience from "./pages/Experience";
import Methode from "./pages/Methode";
import Timeline from "./pages/Timeline";
import Recherche from "./pages/Recherche";
import References from "./pages/References";
import Partenaires from "./pages/Partenaires";
import Gouvernance from "./pages/Gouvernance";
import Ressources from "./pages/Ressources";

function Router() {
  return (
    <>
      <ScrollToTop />
      <Navigation />
      <main className="min-h-screen">
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
        <Route path={"/gouvernance"} component={Gouvernance} />
        <Route path={"/ressources"} component={Ressources} />

        {/* Anciennes pages (conservées pour les liens existants) */}
        <Route path={"/references-inspirantes"} component={References} />
        <Route path={"/description-projet"} component={Projet} />
        <Route path={"/etude-complete"} component={EtudeComplete} />
        <Route path={"/etat-des-lieux"} component={EtatDesLieux} />
        <Route path={"/analyse-outils"} component={AnalyseOutils} />
        <Route path={"/sources"} component={Sources} />
        <Route path={"/synthese-documents"} component={SyntheseDocuments} />

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
