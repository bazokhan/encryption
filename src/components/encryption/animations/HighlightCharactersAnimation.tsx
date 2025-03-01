import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface HighlightCharactersAnimationProps {
  data: Record<string, unknown>;
  isAnimating: boolean;
}

export function HighlightCharactersAnimation({ data, isAnimating }: HighlightCharactersAnimationProps) {
  const { t } = useTranslation();
  
  // Extract input and output data
  const inputs = data.inputs as Array<{ name: string; value: unknown }> || [];
  const outputs = data.outputs as Array<{ name: string; value: unknown }> || [];
  
  // Get the first input value (usually the text to be processed)
  const inputText = inputs.length > 0 && inputs[0].value 
    ? String(inputs[0].value) 
    : '';
  
  // Get the first output value (usually the processed text)
  const outputText = outputs.length > 0 && outputs[0].value 
    ? String(outputs[0].value) 
    : '';

  if (!inputText) {
    return (
      <div className="text-center p-4">
        <p className="text-muted-foreground">{t('encryption.noInputData')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">{t('encryption.inputText')}</h4>
        <div className="flex flex-wrap gap-1 p-2 bg-background rounded border">
          {inputText.split('').map((char, index) => (
            <motion.div
              key={`input-${index}`}
              className="inline-block w-8 h-8 flex items-center justify-center border rounded font-mono"
              initial={{ backgroundColor: 'transparent' }}
              animate={isAnimating ? { 
                backgroundColor: ['transparent', 'rgba(var(--primary), 0.2)', 'transparent'],
                transition: { 
                  duration: 0.5,
                  delay: index * 0.05,
                  repeat: 1
                }
              } : {}}
            >
              {char}
            </motion.div>
          ))}
        </div>
      </div>

      {outputText && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">{t('encryption.outputText')}</h4>
          <div className="flex flex-wrap gap-1 p-2 bg-background rounded border">
            {outputText.split('').map((char, index) => (
              <motion.div
                key={`output-${index}`}
                className="inline-block w-8 h-8 flex items-center justify-center border rounded font-mono"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isAnimating ? { 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    duration: 0.3,
                    delay: (inputText.length * 0.05) + (index * 0.05)
                  }
                } : { opacity: 1, scale: 1 }}
              >
                {char}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="text-sm text-muted-foreground">
        <p>{t('encryption.animations.highlightCharacters.description')}</p>
      </div>
    </div>
  );
} 