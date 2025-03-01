import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface ShiftNumbersAnimationProps {
  data: Record<string, unknown>;
  isAnimating: boolean;
}

export function ShiftNumbersAnimation({ data, isAnimating }: ShiftNumbersAnimationProps) {
  const { t } = useTranslation();
  
  // Extract input and output data
  const inputs = data.inputs as Array<{ name: string; value: unknown }> || [];
  const outputs = data.outputs as Array<{ name: string; value: unknown }> || [];
  
  // Get the values to be shifted (usually ASCII values)
  const valuesToShift = inputs.length > 0 && inputs[0].value 
    ? String(inputs[0].value).split(',').map(v => v.trim()) 
    : [];
  
  // Get the shift amount
  const shiftAmount = inputs.length > 1 && inputs[1].value 
    ? Number(inputs[1].value) 
    : 0;
  
  // Get the shifted values
  const shiftedValues = outputs.length > 0 && outputs[0].value 
    ? String(outputs[0].value).split(',').map(v => v.trim()) 
    : [];

  if (valuesToShift.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-muted-foreground">{t('encryption.noInputData')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">{t('encryption.originalValues')}</h4>
        <div className="flex flex-wrap gap-1 p-2 bg-background rounded border">
          {valuesToShift.map((value, index) => (
            <motion.div
              key={`input-${index}`}
              className="inline-block min-w-8 h-8 px-2 flex items-center justify-center border rounded font-mono"
              initial={{ y: 0 }}
              animate={isAnimating ? { 
                y: [0, -20, 0],
                transition: { 
                  duration: 0.5,
                  delay: index * 0.05
                }
              } : {}}
            >
              {value}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <motion.div
          className="flex items-center gap-2 text-primary font-medium"
          initial={{ opacity: 0 }}
          animate={isAnimating ? { 
            opacity: 1,
            transition: { 
              duration: 0.3,
              delay: valuesToShift.length * 0.05
            }
          } : { opacity: 1 }}
        >
          <span>{t('encryption.shiftBy')}</span>
          <div className="inline-block min-w-8 h-8 px-2 flex items-center justify-center border border-primary rounded font-mono">
            {shiftAmount}
          </div>
        </motion.div>
      </div>

      {shiftedValues.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">{t('encryption.shiftedValues')}</h4>
          <div className="flex flex-wrap gap-1 p-2 bg-background rounded border">
            {shiftedValues.map((value, index) => (
              <motion.div
                key={`output-${index}`}
                className="inline-block min-w-8 h-8 px-2 flex items-center justify-center border rounded font-mono"
                initial={{ y: 20, opacity: 0 }}
                animate={isAnimating ? { 
                  y: 0, 
                  opacity: 1,
                  transition: { 
                    duration: 0.3,
                    delay: (valuesToShift.length * 0.05) + 0.3 + (index * 0.05)
                  }
                } : { y: 0, opacity: 1 }}
              >
                {value}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="text-sm text-muted-foreground">
        <p>{t('encryption.animations.shiftNumbers.description')}</p>
      </div>
    </div>
  );
} 