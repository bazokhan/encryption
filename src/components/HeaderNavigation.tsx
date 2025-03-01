import { Link } from "react-router-dom";
import { BookOpen, Code, Lock, Play, Shield } from "lucide-react";
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
import React from "react";
import { useTranslation } from "react-i18next";

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

export const HeaderNavigation = ({
  items,
  className,
}: HeaderNavigationProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between w-full">
      <NavigationMenu className={cn("mx-auto", className)}>
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
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
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
    </div>
  );
};
