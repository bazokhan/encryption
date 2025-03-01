import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { AnimationType, EncryptionStep } from '@/types/encryption';
import { AnimationRenderer } from './animations/AnimationRenderer';

interface AlgorithmStepProps {
  step: EncryptionStep | null;
  intermediateResults: Record<string, unknown>;
  isAnimating: boolean;
}

export function AlgorithmStep({ step, intermediateResults, isAnimating }: AlgorithmStepProps) {
  const { t } = useTranslation();

  if (!step) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-muted-foreground">{t('encryption.selectAlgorithmAndStart')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-2"
      >
        <h3 className="text-lg font-medium">{step.name}</h3>
        {step.description && (
          <p className="text-sm text-muted-foreground">{step.description}</p>
        )}
      </motion.div>

      <div className="border rounded-md p-4 bg-muted/30">
        <AnimationRenderer
          type={step.animation as AnimationType}
          data={{
            step,
            inputs: step.inputs.map(input => ({
              name: input,
              value: intermediateResults[input]
            })),
            outputs: step.outputs.map(output => ({
              name: output,
              value: intermediateResults[output]
            }))
          }}
          isAnimating={isAnimating}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">{t('encryption.inputs')}</h4>
          <div className="space-y-1">
            {step.inputs.map(input => (
              <div key={input} className="flex justify-between text-sm p-2 bg-background rounded border">
                <span className="font-mono">{input}:</span>
                <span className="font-mono">
                  {intermediateResults[input] !== undefined 
                    ? String(intermediateResults[input]).substring(0, 30) 
                    : t('encryption.notAvailable')}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">{t('encryption.outputs')}</h4>
          <div className="space-y-1">
            {step.outputs.map(output => (
              <div key={output} className="flex justify-between text-sm p-2 bg-background rounded border">
                <span className="font-mono">{output}:</span>
                <span className="font-mono">
                  {intermediateResults[output] !== undefined 
                    ? String(intermediateResults[output]).substring(0, 30) 
                    : t('encryption.calculating')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 