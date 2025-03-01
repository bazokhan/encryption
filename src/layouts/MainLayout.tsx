import { Outlet } from "react-router-dom";
import { encryptionRoutes } from "@/configs/encryption";
import { HeaderNavigation } from "@/components/HeaderNavigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useTranslation } from "react-i18next";

export const MainLayout = () => {
  const { t } = useTranslation();
  
  // Transform the encryption routes to the format expected by HeaderNavigation
  const navigationItems = Object.entries(encryptionRoutes).map(
    ([category, { label, children }]) => ({
      category,
      label,
      icon: category as "classical" | "symmetric" | "asymmetric",
      children: children.map((child) => ({
        label: child.label,
        description: t(`algorithms.${child.label.toLowerCase()}.description`),
        href: `/${category}/${child.label.toLowerCase()}`,
      })),
    })
  );

  return (
    <div className="flex min-h-screen flex-col w-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between mx-auto max-w-screen-xl">
          <HeaderNavigation items={navigationItems} />
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6 mx-auto max-w-screen-xl">
        <Outlet />
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row  w-full mx-auto">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            {t('app.footer.builtWith')}
          </p>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            {t('app.footer.copyright')}
          </p>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            {t('app.footer.madeWith')}{" "}
            <a
              href="https://github.com/yourusername"
              className="hover:text-primary"
            >
              yourusername
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};
