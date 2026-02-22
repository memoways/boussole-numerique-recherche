import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import EtudeComplete from "./pages/EtudeComplete";
import EtatDesLieux from "./pages/EtatDesLieux";
import AnalyseOutils from "./pages/AnalyseOutils";
import Sources from "./pages/Sources";
import SyntheseDocuments from "./pages/SyntheseDocuments";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/etude-complete"} component={EtudeComplete} />
      <Route path={"/etat-des-lieux"} component={EtatDesLieux} />
      <Route path={"/analyse-outils"} component={AnalyseOutils} />
      <Route path={"/sources"} component={Sources} />
      <Route path={"/synthese-documents"} component={SyntheseDocuments} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
