import { AnimationType } from '@/types/encryption';
import { HighlightCharactersAnimation } from './HighlightCharactersAnimation';
import { ShiftNumbersAnimation } from './ShiftNumbersAnimation';
import { PlaceholderAnimation } from './PlaceholderAnimation';
import { XORAnimation } from './XORAnimation';
import { RSAAnimation } from './RSAAnimation';

interface AnimationRendererProps {
  type: AnimationType;
  data: Record<string, unknown>;
  isAnimating: boolean;
}

export function AnimationRenderer({ type, data, isAnimating }: AnimationRendererProps) {
  // Render the appropriate animation component based on the type
  switch (type) {
    case 'highlightCharacters':
      return <HighlightCharactersAnimation data={data} isAnimating={isAnimating} />;
    case 'shiftNumbers':
      return <ShiftNumbersAnimation data={data} isAnimating={isAnimating} />;
    case 'xorAnimation':
      return <XORAnimation data={data} isAnimating={isAnimating} />;
    case 'substitutionAnimation':
      return <PlaceholderAnimation data={data} isAnimating={isAnimating} title="Substitution" />;
    case 'shiftRowsAnimation':
      return <PlaceholderAnimation data={data} isAnimating={isAnimating} title="Shift Rows" />;
    case 'mixColumnsAnimation':
      return <PlaceholderAnimation data={data} isAnimating={isAnimating} title="Mix Columns" />;
    case 'keyExpansionAnimation':
      return <PlaceholderAnimation data={data} isAnimating={isAnimating} title="Key Expansion" />;
    case 'finalXorAnimation':
      return <XORAnimation data={data} isAnimating={isAnimating} />;
    case 'rsaAnimation':
      return <RSAAnimation data={data} isAnimating={isAnimating} />;
    default:
      return (
        <div className="p-4 text-center">
          <p>Animation not implemented for type: {type}</p>
        </div>
      );
  }
} 