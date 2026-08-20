import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import { IntroScreen } from "@/components/IntroScreen";
import { lazy, Suspense, useState } from "react";

import { Cursor } from "@/components/Cursor";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Projects = lazy(() => import("@/pages/Projects"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const Services = lazy(() => import("@/pages/Services"));
const Partners = lazy(() => import("@/pages/Partners"));
const News = lazy(() => import("@/pages/News"));
const Contact = lazy(() => import("@/pages/Contact"));
const LaboPiiulgu = lazy(() => import("@/pages/LaboPiiulgu"));
const Sulunsuku = lazy(() => import("@/pages/Sulunsuku"));
const SalonCinematech = lazy(() => import("@/pages/SalonCinematech"));
const Coworking = lazy(() => import("@/pages/labo/Coworking"));
const Scenario = lazy(() => import("@/pages/labo/Scenario"));
const CoachingProduction = lazy(() => import("@/pages/labo/CoachingProduction"));
const CoachingEntrepreneuriat = lazy(
  () => import("@/pages/labo/CoachingEntrepreneuriat"),
);
const B2B = lazy(() => import("@/pages/labo/B2B"));
const Afterworks = lazy(() => import("@/pages/labo/Afterworks"));
const Admin = lazy(() => import("@/pages/Admin"));
const LegalMentions = lazy(() => import("@/pages/LegalMentions"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const NotFound = lazy(() => import("@/pages/not-found"));

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">
            Chargement...
          </div>
        }
      >
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/a-propos" component={About} />
          <Route path="/projets" component={Projects} />
          <Route path="/projets/:slug" component={ProjectDetail} />
          <Route path="/services" component={Services} />
          <Route path="/partenaires" component={Partners} />
          <Route path="/actualites" component={News} />
          <Route path="/sulunsuku" component={Sulunsuku} />
          <Route path="/salon-cinematech" component={SalonCinematech} />
          <Route path="/labo-piiulgu" component={LaboPiiulgu} />
          <Route path="/labo-piiulgu/coworking" component={Coworking} />
          <Route path="/labo-piiulgu/scenario" component={Scenario} />
          <Route
            path="/labo-piiulgu/coaching-production"
            component={CoachingProduction}
          />
          <Route
            path="/labo-piiulgu/coaching-entrepreneuriat"
            component={CoachingEntrepreneuriat}
          />
          <Route path="/labo-piiulgu/b2b" component={B2B} />
          <Route path="/labo-piiulgu/afterworks" component={Afterworks} />
          <Route path="/contact" component={Contact} />
          <Route path="/admin" component={Admin} />
          <Route path="/mentions-legales" component={LegalMentions} />
          <Route
            path="/politique-de-confidentialite"
            component={PrivacyPolicy}
          />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Layout>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof sessionStorage !== "undefined") {
      return !sessionStorage.getItem("pilimpiku_intro_seen");
    }
    return false;
  });

  const handleIntroComplete = () => {
    sessionStorage.setItem("pilimpiku_intro_seen", "1");
    setShowIntro(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Cursor />
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          {showIntro && <IntroScreen onComplete={handleIntroComplete} />}
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
