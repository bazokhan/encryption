import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface XORAnimationProps {
  data: Record<string, unknown>;
  isAnimating: boolean;
}

export function XORAnimation({ data, isAnimating }: XORAnimationProps) {
  const { t } = useTranslation();
  
  // Extract input and output data
  const inputs = data.inputs as Array<{ name: string; value: unknown }> || [];
  const outputs = data.outputs as Array<{ name: string; value: unknown }> || [];
  
  // Get the first input value (usually the text to be processed)
  const input1 = inputs.length > 0 && inputs[0].value 
    ? String(inputs[0].value).split(',').map(v => v.trim()) 
    : [];
  
  // Get the second input value (usually the key)
  const input2 = inputs.length > 1 && inputs[1].value 
    ? String(inputs[1].value).split(',').map(v => v.trim()) 
    : [];
  
  // Get the output value
  const outputValues = outputs.length > 0 && outputs[0].value 
    ? String(outputs[0].value).split(',').map(v => v.trim()) 
    : [];

  if (input1.length === 0 || input2.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-muted-foreground">{t('encryption.noInputData')}</p>
      </div>
    );
  }

  // Limit the number of values displayed to avoid overwhelming the UI
  const maxValuesToShow = 8;
  const displayInput1 = input1.slice(0, maxValuesToShow);
  const displayInput2 = input2.slice(0, maxValuesToShow);
  const displayOutput = outputValues.slice(0, maxValuesToShow);
  const hasMoreValues = input1.length > maxValuesToShow;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">{inputs[0]?.name || 'Input 1'}</h4>
        <div className="flex flex-wrap gap-1 p-2 bg-background rounded border">
          {displayInput1.map((value, index) => (
            <motion.div
              key={`input1-${index}`}
              className="inline-block min-w-8 h-8 px-2 flex items-center justify-center border rounded font-mono"
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
              {value}
            </motion.div>
          ))}
          {hasMoreValues && <div className="px-2 flex items-center">...</div>}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <motion.div
          className="text-xl font-bold text-primary"
          initial={{ scale: 1 }}
          animate={isAnimating ? { 
            scale: [1, 1.2, 1],
            transition: { 
              duration: 0.5,
              delay: displayInput1.length * 0.05
            }
          } : {}}
        >
          ⊕
        </motion.div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">{inputs[1]?.name || 'Input 2'}</h4>
        <div className="flex flex-wrap gap-1 p-2 bg-background rounded border">
          {displayInput2.map((value, index) => (
            <motion.div
              key={`input2-${index}`}
              className="inline-block min-w-8 h-8 px-2 flex items-center justify-center border rounded font-mono"
              initial={{ backgroundColor: 'transparent' }}
              animate={isAnimating ? { 
                backgroundColor: ['transparent', 'rgba(var(--primary), 0.2)', 'transparent'],
                transition: { 
                  duration: 0.5,
                  delay: (displayInput1.length * 0.05) + 0.5 + (index * 0.05),
                  repeat: 1
                }
              } : {}}
            >
              {value}
            </motion.div>
          ))}
          {hasMoreValues && <div className="px-2 flex items-center">...</div>}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <motion.div
          className="text-xl font-bold"
          initial={{ opacity: 0 }}
          animate={isAnimating ? { 
            opacity: 1,
            transition: { 
              duration: 0.3,
              delay: (displayInput1.length * 0.05) + (displayInput2.length * 0.05) + 1
            }
          } : { opacity: 1 }}
        >
          =
        </motion.div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">{outputs[0]?.name || 'Output'}</h4>
        <div className="flex flex-wrap gap-1 p-2 bg-background rounded border">
          {displayOutput.map((value, index) => (
            <motion.div
              key={`output-${index}`}
              className="inline-block min-w-8 h-8 px-2 flex items-center justify-center border rounded font-mono"
              initial={{ opacity: 0, y: 10 }}
              animate={isAnimating ? { 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.3,
                  delay: (displayInput1.length * 0.05) + (displayInput2.length * 0.05) + 1.2 + (index * 0.05)
                }
              } : { opacity: 1, y: 0 }}
            >
              {value}
            </motion.div>
          ))}
          {hasMoreValues && <div className="px-2 flex items-center">...</div>}
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>{t('encryption.animations.xorOperation.description', { fallback: 'XOR operation combines two values bit by bit.' })}</p>
      </div>
    </div>
  );
} 