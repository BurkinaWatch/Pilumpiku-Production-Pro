import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import { IntroScreen } from "@/components/IntroScreen";
import { useState } from "react";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Services from "@/pages/Services";
import Partners from "@/pages/Partners";
import News from "@/pages/News";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/a-propos" component={About} />
        <Route path="/projets" component={Projects} />
        <Route path="/projets/:slug" component={ProjectDetail} />
        <Route path="/services" component={Services} />
        <Route path="/partenaires" component={Partners} />
        <Route path="/actualites" component={News} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
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
