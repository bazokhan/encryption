import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Code, Lock, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface NavigationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  className?: string;
}

const NavigationCard = ({ title, description, icon, to, className }: NavigationCardProps) => {
  const { t } = useTranslation();
  
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="rounded-full bg-primary/10 p-2 text-primary">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardContent>
      <CardFooter className="pt-2">
        <Button asChild variant="ghost" className="ml-auto gap-1 p-0 text-primary">
          <Link to={to}>
            {t('navigation.explore')} <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

interface CardsNavigationProps {
  items: {
    title: string;
    description: string;
    icon: keyof typeof icons;
    to: string;
  }[];
  className?: string;
}

const icons = {
  classical: <BookOpen className="h-5 w-5" />,
  symmetric: <Lock className="h-5 w-5" />,
  asymmetric: <Shield className="h-5 w-5" />,
  code: <Code className="h-5 w-5" />,
};

export const CardsNavigation = ({ items, className }: CardsNavigationProps) => {
  return (
    <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((item) => (
        <NavigationCard
          key={item.to}
          title={item.title}
          description={item.description}
          icon={icons[item.icon]}
          to={item.to}
        />
      ))}
    </div>
  );
};
