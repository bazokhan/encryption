import { Link } from "react-router-dom";
import { BookOpen, Code, Lock, Menu, Play, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const icons = {
  classical: <BookOpen className="h-4 w-4" />,
  symmetric: <Lock className="h-4 w-4" />,
  asymmetric: <Shield className="h-4 w-4" />,
  code: <Code className="h-4 w-4" />,
};

interface HeaderNavigationProps {
  items: {
    category: string;
    label: string;
    icon: keyof typeof icons;
    children: {
      label: string;
      description?: string;
      href: string;
    }[];
  }[];
  className?: string;
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

// Mobile Navigation Component
const MobileNavigation = ({ items }: HeaderNavigationProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] pt-10">
        <nav className="flex flex-col gap-4">
          <Link 
            to="/" 
            className="flex items-center gap-2 px-2 py-1 text-lg font-medium"
            onClick={() => setOpen(false)}
          >
            {t("navigation.home")}
          </Link>
          
          <Link 
            to="/demo" 
            className="flex items-center gap-2 px-2 py-1 text-lg font-medium"
            onClick={() => setOpen(false)}
          >
            <Play className="h-4 w-4 text-primary" />
            {t("navigation.demo")}
          </Link>
          
          {items.map((item) => (
            <div key={item.category} className="space-y-2">
              <div className="flex items-center gap-2 px-2 py-1 text-lg font-medium">
                <span className="text-primary">{icons[item.icon]}</span>
                {t(`categories.${item.category}.title`)}
              </div>
              <div className="ml-6 space-y-1 border-l pl-2">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    to={child.href}
                    className="block py-1 text-sm hover:text-primary"
                    onClick={() => setOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

// Desktop Navigation Component
const DesktopNavigation = ({ items, className }: HeaderNavigationProps) => {
  const { t } = useTranslation();

  return (
    <NavigationMenu className={cn("mx-auto hidden md:block", className)}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/" className={navigationMenuTriggerStyle()}>
            {t("navigation.home")}
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/demo" className={navigationMenuTriggerStyle()}>
            <span className="flex items-center gap-1">
              <Play className="h-4 w-4 text-primary" />
              {t("navigation.demo")}
            </span>
          </Link>
        </NavigationMenuItem>

        {items.map((item) => (
          <NavigationMenuItem key={item.category}>
            <NavigationMenuTrigger className="flex items-center gap-1">
              <span className="text-primary">{icons[item.icon]}</span>
              {t(`categories.${item.category}.title`)}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-3 p-4 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {item.children.map((child) => (
                  <li key={child.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={child.href}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">
                          {child.label}
                        </div>
                        {child.description && (
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {child.description}
                          </p>
                        )}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export const HeaderNavigation = ({
  items,
  className,
}: HeaderNavigationProps) => {
  return (
    <div className="flex items-center">
      <MobileNavigation items={items} />
      <DesktopNavigation items={items} className={className} />
    </div>
  );
};
