import { useTranslation } from 'react-i18next';
import { EncryptionDemo } from '@/components/EncryptionDemo';

export function EncryptionDemoPage() {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('encryption.title')}</h1>
        <p className="text-muted-foreground">{t('encryption.description')}</p>
      </div>
      
      <EncryptionDemo />
    </div>
  );
} 