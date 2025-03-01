import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AlgorithmTemplateProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function AlgorithmTemplate({ title, description, children }: AlgorithmTemplateProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="demo">Interactive Demo</TabsTrigger>
          <TabsTrigger value="code">Code Example</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
              <CardDescription>
                Understanding the principles behind the algorithm
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                This section will contain a detailed explanation of how the algorithm works,
                including its history, mathematical foundations, and practical applications.
              </p>
              <div className="rounded-md bg-muted p-4">
                <h3 className="mb-2 text-lg font-medium">Key Features</h3>
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
                <CardTitle>Strengths</CardTitle>
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
                <CardTitle>Weaknesses</CardTitle>
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
              <CardTitle>Interactive Demo</CardTitle>
              <CardDescription>
                Try out the algorithm with your own inputs
              </CardDescription>
            </CardHeader>
            <CardContent>
              {children || (
                <div className="flex items-center justify-center h-64 bg-muted rounded-md">
                  <p className="text-muted-foreground">Interactive demo will be implemented here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="code" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Code Example</CardTitle>
              <CardDescription>
                Implementation example in JavaScript
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