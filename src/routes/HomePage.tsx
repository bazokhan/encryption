import { Link } from "react-router-dom";
import { encryptionRoutes, EncryptionIcon } from "@/configs/encryption";
import { CardsNavigation } from "@/components/CardsNavigation";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function HomePage() {
  const { t } = useTranslation();
  
  // Transform the encryption routes to the format expected by CardsNavigation
  const navigationItems = Object.entries(encryptionRoutes).map(
    ([category]) => ({
      title: t(`categories.${category}.title`),
      description: t(`categories.${category}.description`),
      icon: category as EncryptionIcon,
      to: `/${category}`,
    })
  );

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                {t('app.title')}
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                {t('app.subtitle')}
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild>
                <Link to="/classical">
                  {t('app.getStarted')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/demo" className="flex items-center">
                  <Play className="mr-2 h-4 w-4" />
                  {t('navigation.demo')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                {t('categories.title')}
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground">
                {t('categories.subtitle')}
              </p>
            </div>
          </div>
          <div className="mt-8">
            <CardsNavigation items={navigationItems} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 md:py-12 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                {t('features.title')}
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground">
                {t('features.subtitle')}
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mt-8">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">{t('features.secure.title')}</h3>
              <p className="text-center text-muted-foreground">
                {t('features.secure.description')}
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M2 3h20" />
                  <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
                  <path d="m7 21 5-5 5 5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">{t('features.interactive.title')}</h3>
              <p className="text-center text-muted-foreground">
                {t('features.interactive.description')}
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">{t('features.educational.title')}</h3>
              <p className="text-center text-muted-foreground">
                {t('features.educational.description')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 