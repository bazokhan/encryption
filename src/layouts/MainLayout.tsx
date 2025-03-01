import { Outlet } from "react-router-dom";
import { encryptionRoutes } from "@/configs/encryption";
import { HeaderNavigation } from "@/components/HeaderNavigation";

export const MainLayout = () => {
  // Transform the encryption routes to the format expected by HeaderNavigation
  const navigationItems = Object.entries(encryptionRoutes).map(
    ([category, { label, children }]) => ({
      category,
      label,
      icon: category as "classical" | "symmetric" | "asymmetric",
      children: children.map((child) => ({
        label: child.label,
        description: `${label} encryption using ${child.label} algorithm`,
        href: `/${category}/${child.label.toLowerCase()}`,
      })),
    })
  );

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <HeaderNavigation items={navigationItems} />
        </div>
      </header>
      <main className="flex-1 container py-6">
        <Outlet />
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with React, Shadcn UI, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};
