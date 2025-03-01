import { useTranslation } from 'react-i18next';

interface PlaceholderAnimationProps {
  data: Record<string, unknown>;
  isAnimating: boolean;
  title: string;
}

export function PlaceholderAnimation({ data, isAnimating, title }: PlaceholderAnimationProps) {
  const { t } = useTranslation();
  
  // Extract step information
  const step = data.step as { name: string; description?: string } | undefined;
  
  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-md bg-muted/20">
        <div className="text-center">
          <h4 className="font-medium mb-2">{title}</h4>
          <p className="text-sm text-muted-foreground">
            {step?.description || t('encryption.animations.placeholder.description')}
          </p>
          <div className="mt-4 p-4 border rounded-md bg-background">
            <p className="text-sm">
              {isAnimating 
                ? t('encryption.animations.placeholder.animating') 
                : t('encryption.animations.placeholder.static')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 