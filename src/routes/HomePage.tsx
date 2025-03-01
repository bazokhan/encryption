import { Link } from "react-router-dom";
import { encryptionRoutes, EncryptionIcon } from "@/configs/encryption";
import { CardsNavigation } from "@/components/CardsNavigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HomePage() {
  // Transform the encryption routes to the format expected by CardsNavigation
  const navigationItems = Object.entries(encryptionRoutes).map(
    ([category, { label, description }]) => ({
      title: label,
      description: description || `Explore ${label} encryption algorithms`,
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
                Encryption Algorithms Explorer
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Learn about different encryption techniques from classical to modern approaches.
                Understand how they work and see them in action.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild>
                <Link to="/classical">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
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
                Encryption Categories
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground">
                Explore different types of encryption algorithms categorized by their approach and security level.
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
                Features
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground">
                This application provides interactive demonstrations of encryption algorithms.
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
              <h3 className="text-xl font-bold">Secure</h3>
              <p className="text-center text-muted-foreground">
                Learn about secure encryption methods used in modern applications.
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
              <h3 className="text-xl font-bold">Interactive</h3>
              <p className="text-center text-muted-foreground">
                Try out encryption algorithms with your own inputs and see the results.
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
              <h3 className="text-xl font-bold">Educational</h3>
              <p className="text-center text-muted-foreground">
                Understand the principles behind different encryption techniques.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 