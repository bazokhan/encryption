import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface RSAAnimationProps {
  data: Record<string, unknown>;
  isAnimating: boolean;
}

export function RSAAnimation({ data, isAnimating }: RSAAnimationProps) {
  const { t } = useTranslation();
  
  // Extract input and output data
  const inputs = data.inputs as Array<{ name: string; value: unknown }> || [];
  const outputs = data.outputs as Array<{ name: string; value: unknown }> || [];
  
  // Get the input values
  const message = inputs.find(input => input.name === 'Message')?.value;
  const publicKey = inputs.find(input => input.name === 'Public Key')?.value;
  
  // Get the output value
  const output = outputs.length > 0 ? outputs[0].value : null;
  
  if (!message || !publicKey) {
    return (
      <div className="text-center p-4">
        <p className="text-muted-foreground">{t('encryption.noInputData')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Message */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Message</h4>
        <motion.div 
          className="p-3 bg-background rounded border font-mono"
          initial={{ opacity: 1 }}
          animate={isAnimating ? { 
            opacity: [1, 0.5, 1],
            transition: { duration: 1, repeat: 1 }
          } : {}}
        >
          {String(message)}
        </motion.div>
      </div>

      {/* Public Key */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Public Key (e, n)</h4>
        <motion.div 
          className="p-3 bg-background rounded border font-mono"
          initial={{ opacity: 1 }}
          animate={isAnimating ? { 
            opacity: [1, 0.5, 1],
            transition: { duration: 1, delay: 1, repeat: 1 }
          } : {}}
        >
          {String(publicKey)}
        </motion.div>
      </div>

      {/* Formula */}
      <motion.div 
        className="p-4 bg-muted rounded-md text-center"
        initial={{ scale: 1 }}
        animate={isAnimating ? { 
          scale: [1, 1.05, 1],
          transition: { duration: 0.5, delay: 2 }
        } : {}}
      >
        <span className="font-mono text-lg">C = M<sup>e</sup> mod n</span>
      </motion.div>

      {/* Output */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">{outputs[0]?.name || 'Output'}</h4>
        <motion.div 
          className="p-3 bg-background rounded border font-mono"
          initial={{ opacity: 0 }}
          animate={isAnimating ? { 
            opacity: 1,
            transition: { duration: 0.5, delay: 2.5 }
          } : { opacity: 1 }}
        >
          {output ? String(output) : ''}
        </motion.div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>{t('encryption.animations.rsa.description', { fallback: 'RSA encryption uses modular exponentiation with public key (e, n).' })}</p>
      </div>
    </div>
  );
} 