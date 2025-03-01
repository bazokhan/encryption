import { Outlet } from "react-router-dom";
import { CardsNavigation } from "@/components/CardsNavigation";
import { EncryptionIcon } from "@/configs/encryption";

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
  // Transform the links to the format expected by CardsNavigation
  const navigationItems = links.map((link) => ({
    title: link.label,
    description: link.description,
    icon: link.icon,
    to: link.to,
  }));

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
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
