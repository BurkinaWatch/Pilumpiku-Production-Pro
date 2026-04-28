import { useSeo } from "@/hooks/use-seo";
import { useAuth } from "@workspace/replit-auth-web";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Lock, LogOut, ShieldAlert } from "lucide-react";
import { ProjectsAdmin } from "@/components/admin/ProjectsAdmin";
import { NewsAdmin } from "@/components/admin/NewsAdmin";
import { ServicesAdmin } from "@/components/admin/ServicesAdmin";
import { PartnersAdmin } from "@/components/admin/PartnersAdmin";
import { SettingsAdmin } from "@/components/admin/SettingsAdmin";

export default function Admin() {
  useSeo({ title: "Administration", description: "Espace d'administration" });
  const { user, isLoading, isAuthenticated, login, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-24">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-24 px-6">
        <div className="bg-card border border-border/50 rounded-md p-12 max-w-md text-center">
          <Lock className="mx-auto mb-6 text-primary" size={32} />
          <h1 className="font-serif text-3xl text-foreground mb-4">
            Espace d'administration
          </h1>
          <p className="text-muted-foreground font-light mb-8">
            Connectez-vous pour gérer les contenus de Pilumpiku Production.
          </p>
          <Button onClick={login} size="lg" className="w-full" data-testid="button-admin-login">
            Se connecter
          </Button>
        </div>
      </div>
    );
  }

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-24 px-6">
        <div className="bg-card border border-border/50 rounded-md p-12 max-w-md text-center">
          <ShieldAlert className="mx-auto mb-6 text-destructive" size={32} />
          <h1 className="font-serif text-3xl text-foreground mb-4">Accès refusé</h1>
          <p className="text-muted-foreground font-light mb-2">
            Connecté en tant que <span className="text-foreground">{user?.email ?? user?.firstName}</span>.
          </p>
          <p className="text-muted-foreground font-light mb-8">
            Votre compte ne dispose pas des droits d'administration.
          </p>
          <Button onClick={logout} variant="outline" data-testid="button-admin-logout">
            <LogOut size={16} className="mr-2" /> Se déconnecter
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-2">
              Administration
            </h1>
            <p className="text-sm text-muted-foreground">
              Connecté en tant que{" "}
              <span className="text-foreground" data-testid="text-admin-email">
                {user.email ?? user.firstName}
              </span>
            </p>
          </div>
          <Button variant="outline" onClick={logout} data-testid="button-admin-logout">
            <LogOut size={16} className="mr-2" /> Déconnexion
          </Button>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="mb-8 grid grid-cols-2 md:grid-cols-5 w-full">
            <TabsTrigger value="projects" data-testid="tab-projects">Projets</TabsTrigger>
            <TabsTrigger value="news" data-testid="tab-news">Actualités</TabsTrigger>
            <TabsTrigger value="services" data-testid="tab-services">Services</TabsTrigger>
            <TabsTrigger value="partners" data-testid="tab-partners">Partenaires</TabsTrigger>
            <TabsTrigger value="settings" data-testid="tab-settings">Site</TabsTrigger>
          </TabsList>
          <TabsContent value="projects"><ProjectsAdmin /></TabsContent>
          <TabsContent value="news"><NewsAdmin /></TabsContent>
          <TabsContent value="services"><ServicesAdmin /></TabsContent>
          <TabsContent value="partners"><PartnersAdmin /></TabsContent>
          <TabsContent value="settings"><SettingsAdmin /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
