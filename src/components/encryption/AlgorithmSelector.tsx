import { useTranslation } from 'react-i18next';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { EncryptionAlgorithm } from '@/types/encryption';

interface AlgorithmSelectorProps {
  algorithms: EncryptionAlgorithm[];
  selectedAlgorithm: EncryptionAlgorithm | null;
  onSelectAlgorithm: (algorithm: EncryptionAlgorithm) => void;
  disabled?: boolean;
}

export function AlgorithmSelector({
  algorithms,
  selectedAlgorithm,
  onSelectAlgorithm,
  disabled = false
}: AlgorithmSelectorProps) {
  const { t } = useTranslation();

  const handleChange = (value: string) => {
    const algorithm = algorithms.find(algo => algo.id === value);
    if (algorithm) {
      onSelectAlgorithm(algorithm);
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor="algorithm-select" className="text-sm font-medium">
        {t('encryption.selectAlgorithm')}
      </label>
      <Select
        value={selectedAlgorithm?.id || ''}
        onValueChange={handleChange}
        disabled={disabled}
      >
        <SelectTrigger id="algorithm-select" className="w-full">
          <SelectValue placeholder={t('encryption.selectAlgorithmPlaceholder')} />
        </SelectTrigger>
        <SelectContent>
          {algorithms.map(algorithm => (
            <SelectItem key={algorithm.id} value={algorithm.id}>
              {algorithm.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedAlgorithm && (
        <p className="text-sm text-muted-foreground">
          {selectedAlgorithm.description}
        </p>
      )}
    </div>
  );
} 