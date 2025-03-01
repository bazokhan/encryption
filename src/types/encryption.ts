export interface EncryptionStep {
  name: string;
  inputs: string[];
  outputs: string[];
  animation: string;
  description?: string;
}

export interface EncryptionAlgorithm {
  id: string;
  name: string;
  description: string;
  inputs: string[];
  keyGeneration?: EncryptionStep[];
  steps: EncryptionStep[];
}

export type AnimationType = 
  | 'highlightCharacters'
  | 'shiftNumbers'
  | 'xorAnimation'
  | 'substitutionAnimation'
  | 'shiftRowsAnimation'
  | 'mixColumnsAnimation'
  | 'keyExpansionAnimation'
  | 'finalXorAnimation'
  | 'rsaAnimation';

export interface AnimationProps {
  type: AnimationType;
  data: Record<string, unknown>;
  isAnimating: boolean;
} 