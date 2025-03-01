import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";

interface AlgorithmTemplateProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function AlgorithmTemplate({ title, description, children }: AlgorithmTemplateProps) {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">{t('algorithmTemplate.overview')}</TabsTrigger>
          <TabsTrigger value="demo">{t('algorithmTemplate.demo')}</TabsTrigger>
          <TabsTrigger value="code">{t('algorithmTemplate.code')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('algorithmTemplate.howItWorks.title')}</CardTitle>
              <CardDescription>
                {t('algorithmTemplate.howItWorks.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                {t('algorithmTemplate.howItWorks.description')}
              </p>
              <div className="rounded-md bg-muted p-4">
                <h3 className="mb-2 text-lg font-medium">{t('algorithmTemplate.keyFeatures')}</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Feature one of the algorithm</li>
                  <li>Feature two of the algorithm</li>
                  <li>Feature three of the algorithm</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('algorithmTemplate.strengths')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Strength one</li>
                  <li>Strength two</li>
                  <li>Strength three</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('algorithmTemplate.weaknesses')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Weakness one</li>
                  <li>Weakness two</li>
                  <li>Weakness three</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="demo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('algorithmTemplate.demo')}</CardTitle>
              <CardDescription>
                {t('algorithmTemplate.demoDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {children || (
                <div className="flex items-center justify-center h-64 bg-muted rounded-md">
                  <p className="text-muted-foreground">{t('algorithmTemplate.demoPlaceholder')}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="code" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('algorithmTemplate.codeExample.title')}</CardTitle>
              <CardDescription>
                {t('algorithmTemplate.codeExample.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code className="text-sm">
                  {`// Example implementation
function encrypt(text, key) {
  // Algorithm implementation
  return encryptedText;
}

function decrypt(encryptedText, key) {
  // Algorithm implementation
  return decryptedText;
}

// Usage example
const message = "Hello, World!";
const key = "secret";
const encrypted = encrypt(message, key);
const decrypted = decrypt(encrypted, key);
`}
                </code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 