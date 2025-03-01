import { Outlet, useParams } from "react-router-dom";
import { CardsNavigation } from "@/components/CardsNavigation";
import { EncryptionIcon } from "@/configs/encryption";
import { useTranslation } from "react-i18next";

export const CategoryLayout = ({
  title,
  description,
  links,
}: {
  title: string;
  description?: string;
  links: {
    to: string;
    label: string;
    description: string;
    icon: EncryptionIcon;
  }[];
}) => {
  const { t } = useTranslation();
  const { "*": path } = useParams();
  const category = path?.split('/')[0];
  
  // Use translations if category is available
  const translatedTitle = category ? t(`categories.${category}.title`) : title;
  const translatedDescription = category ? t(`categories.${category}.description`) : description;
  
  // Transform the links to the format expected by CardsNavigation
  const navigationItems = links.map((link) => {
    // Extract algorithm name from the link path
    const algorithmPath = link.to.split('/').pop() || '';
    
    return {
      title: t(`algorithms.${algorithmPath}.title`),
      description: t(`algorithms.${algorithmPath}.description`),
      icon: link.icon,
      to: link.to,
    };
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{translatedTitle}</h1>
        {translatedDescription && (
          <p className="text-muted-foreground">{translatedDescription}</p>
        )}
      </div>
      <div className="grid gap-6">
        <CardsNavigation items={navigationItems} />
        <div className="border rounded-lg p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
