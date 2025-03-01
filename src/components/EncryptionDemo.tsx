import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { ChevronLeft, ChevronRight, Play, RotateCcw } from 'lucide-react';
import { AlgorithmStep } from './encryption/AlgorithmStep';
import { AlgorithmSelector } from './encryption/AlgorithmSelector';
import { EncryptionAlgorithm, EncryptionStep } from '@/types/encryption';
import { encryptionAlgorithms } from '@/configs/encryption-algorithms';

export function EncryptionDemo() {
  const { t } = useTranslation();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<EncryptionAlgorithm | null>(null);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [intermediateResults, setIntermediateResults] = useState<Record<string, unknown>>({});
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  // Reset state when algorithm changes
  useEffect(() => {
    if (selectedAlgorithm) {
      const initialInputs: Record<string, string> = {};
      selectedAlgorithm.inputs.forEach(input => {
        initialInputs[input] = '';
      });
      setInputs(initialInputs);
      setCurrentStep(-1);
      setIntermediateResults({});
      setIsStarted(false);
    }
  }, [selectedAlgorithm]);

  const handleInputChange = (inputName: string, value: string) => {
    setInputs(prev => ({
      ...prev,
      [inputName]: value
    }));
  };

  const startEncryption = () => {
    // Validate inputs
    const hasEmptyInputs = Object.values(inputs).some(value => value === '');
    if (hasEmptyInputs) return;

    setIsStarted(true);
    setCurrentStep(0);
    
    // Initialize intermediate results with inputs
    const initialResults = { ...inputs };
    setIntermediateResults(initialResults);
  };

  const goToNextStep = () => {
    if (!selectedAlgorithm) return;
    
    const totalSteps = (selectedAlgorithm.keyGeneration?.length || 0) + selectedAlgorithm.steps.length;
    
    if (currentStep < totalSteps - 1) {
      setIsAnimating(true);
      
      // Process the current step and update intermediate results
      const step = getCurrentStepObject();
      if (step) {
        processStep(step);
      }
      
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
      }, 1000); // Animation duration
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const resetDemo = () => {
    setCurrentStep(-1);
    setIntermediateResults({ ...inputs });
    setIsStarted(false);
  };

  const getCurrentStepObject = (): EncryptionStep | null => {
    if (!selectedAlgorithm || currentStep < 0) return null;
    
    const keyGenSteps = selectedAlgorithm.keyGeneration || [];
    
    if (currentStep < keyGenSteps.length) {
      return keyGenSteps[currentStep];
    } else {
      const stepIndex = currentStep - keyGenSteps.length;
      return selectedAlgorithm.steps[stepIndex];
    }
  };

  const processStep = (step: EncryptionStep) => {
    const newResults = { ...intermediateResults };
    
    // Get the current algorithm
    if (!selectedAlgorithm) return;
    
    // Process based on algorithm type and step
    switch (selectedAlgorithm.id) {
      case 'caesar':
        processCaesarStep(step, newResults);
        break;
      case 'vigenere':
        processVigenereStep(step, newResults);
        break;
      case 'aes':
        processAESStep(step, newResults);
        break;
      case 'rsa':
        processRSAStep(step, newResults);
        break;
      default:
        // Fallback for unknown algorithms
        step.outputs.forEach(output => {
          newResults[output] = `Result of ${step.name}`;
        });
    }
    
    setIntermediateResults(newResults);
  };
  
  const processCaesarStep = (step: EncryptionStep, results: Record<string, unknown>) => {
    const plaintext = String(results['plaintext'] || '');
    const shift = parseInt(String(results['shift'] || '0'), 10);
    
    switch (step.name) {
      case 'Convert Text to ASCII': {
        // Convert plaintext to ASCII values
        const asciiValues = plaintext.split('').map(char => char.charCodeAt(0)).join(',');
        results['asciiValues'] = asciiValues;
        break;
      }
        
      case 'Shift ASCII Values': {
        // Shift ASCII values
        const values = String(results['asciiValues'] || '').split(',').map(v => parseInt(v.trim(), 10));
        const shiftedValues = values.map(val => {
          // Handle uppercase letters (65-90)
          if (val >= 65 && val <= 90) {
            return ((val - 65 + shift) % 26) + 65;
          }
          // Handle lowercase letters (97-122)
          else if (val >= 97 && val <= 122) {
            return ((val - 97 + shift) % 26) + 97;
          }
          // Leave non-alphabetic characters unchanged
          return val;
        }).join(',');
        results['shiftedValues'] = shiftedValues;
        break;
      }
        
      case 'Convert Back to Characters': {
        // Convert shifted ASCII values back to characters
        const chars = String(results['shiftedValues'] || '').split(',').map(v => 
          String.fromCharCode(parseInt(v.trim(), 10))
        ).join('');
        results['cipherText'] = chars;
        break;
      }
    }
  };
  
  const processVigenereStep = (step: EncryptionStep, results: Record<string, unknown>) => {
    const plaintext = String(results['plaintext'] || '');
    const keyword = String(results['keyword'] || '');
    
    switch (step.name) {
      case 'Convert Text and Keyword to ASCII': {
        // Convert plaintext to ASCII values
        const textAscii = plaintext.split('').map(char => char.charCodeAt(0)).join(',');
        results['textAscii'] = textAscii;
        
        // Convert keyword to ASCII values
        const keywordAscii = keyword.split('').map(char => char.charCodeAt(0)).join(',');
        results['keywordAscii'] = keywordAscii;
        break;
      }
      
      case 'Extend Keyword to Match Text Length': {
        // Extend the keyword to match the plaintext length
        const keyChars = keyword.split('');
        const extendedKey = [];
        
        for (let i = 0; i < plaintext.length; i++) {
          const keyChar = keyChars[i % keyChars.length];
          extendedKey.push(keyChar.charCodeAt(0));
        }
        
        results['extendedKeyAscii'] = extendedKey.join(',');
        break;
      }
      
      case 'Apply Vigenère Formula': {
        // Apply the Vigenère formula (add plaintext and key values, then modulo 26)
        const textValues = String(results['textAscii'] || '').split(',').map(v => parseInt(v.trim(), 10));
        const keyValues = String(results['extendedKeyAscii'] || '').split(',').map(v => parseInt(v.trim(), 10));
        const encryptedValues = [];
        
        for (let i = 0; i < textValues.length; i++) {
          const textVal = textValues[i];
          const keyVal = keyValues[i];
          
          // Handle uppercase letters (65-90)
          if (textVal >= 65 && textVal <= 90) {
            const keyShift = (keyVal >= 65 && keyVal <= 90) ? keyVal - 65 : (keyVal >= 97 && keyVal <= 122) ? keyVal - 97 : 0;
            encryptedValues.push(((textVal - 65 + keyShift) % 26) + 65);
          }
          // Handle lowercase letters (97-122)
          else if (textVal >= 97 && textVal <= 122) {
            const keyShift = (keyVal >= 65 && keyVal <= 90) ? keyVal - 65 : (keyVal >= 97 && keyVal <= 122) ? keyVal - 97 : 0;
            encryptedValues.push(((textVal - 97 + keyShift) % 26) + 97);
          }
          // Leave non-alphabetic characters unchanged
          else {
            encryptedValues.push(textVal);
          }
        }
        
        results['encryptedAscii'] = encryptedValues.join(',');
        break;
      }
      
      case 'Convert Back to Characters': {
        // Convert encrypted ASCII values back to characters
        const chars = String(results['encryptedAscii'] || '').split(',').map(v => 
          String.fromCharCode(parseInt(v.trim(), 10))
        ).join('');
        results['cipherText'] = chars;
        break;
      }
    }
  };
  
  const processAESStep = (step: EncryptionStep, results: Record<string, unknown>) => {
    const text = String(results['text'] || '');
    const key = String(results['key'] || '');
    
    switch (step.name) {
      case 'Convert to Bytes': {
        // Convert text to bytes (represented as hex values)
        const bytes = text.split('').map(char => {
          const hex = char.charCodeAt(0).toString(16).padStart(2, '0');
          return hex;
        });
        
        results['bytes'] = bytes.join(' ');
        break;
      }
      
      case 'Initial Key Addition': {
        // Simulate XOR of plaintext with key
        // For demonstration, we'll use a simplified approach
        const textBytes = text.split(' ');
        const keyBytes = key.split(' ');
        
        // Ensure key is long enough by repeating it if necessary
        const extendedKeyBytes: string[] = [];
        for (let i = 0; i < textBytes.length; i++) {
          extendedKeyBytes.push(keyBytes[i % keyBytes.length]);
        }
        
        // Perform XOR operation
        const result = textBytes.map((byte, index) => {
          // Convert hex to decimal, perform XOR, convert back to hex
          const textByte = parseInt(byte, 16);
          const keyByte = parseInt(extendedKeyBytes[index], 16);
          const xorResult = textByte ^ keyByte;
          return xorResult.toString(16).padStart(2, '0');
        });
        
        results['xorResult'] = result.join(' ');
        break;
      }
      
      case 'Substitute Bytes': {
        // Simulate S-box substitution
        // For demonstration, we'll use a simplified approach
        const bytes = text.split(' ');
        
        // Simple substitution (not the actual AES S-box)
        const substituted = bytes.map(byte => {
          const value = parseInt(byte, 16);
          // Simple substitution formula (for demonstration only)
          const newValue = ((value * 7) + 5) % 256;
          return newValue.toString(16).padStart(2, '0');
        });
        
        results['substitutedBytes'] = substituted.join(' ');
        break;
      }
      
      case 'Shift Rows': {
        // Simulate the ShiftRows operation
        // For demonstration, we'll use a simplified approach with a 4x4 matrix
        const bytes = text.split(' ');
        
        // Ensure we have 16 bytes for a 4x4 matrix
        const matrix = [];
        for (let i = 0; i < 4; i++) {
          const row = [];
          for (let j = 0; j < 4; j++) {
            const index = i * 4 + j;
            row.push(index < bytes.length ? bytes[index] : '00');
          }
          matrix.push(row);
        }
        
        // Perform row shifting
        // Row 0: No shift
        // Row 1: Shift left by 1
        // Row 2: Shift left by 2
        // Row 3: Shift left by 3
        const shiftedMatrix = [
          [...matrix[0]],
          [...matrix[1].slice(1), matrix[1][0]],
          [...matrix[2].slice(2), ...matrix[2].slice(0, 2)],
          [...matrix[3].slice(3), ...matrix[3].slice(0, 3)]
        ];
        
        // Flatten the matrix back to a single array
        const result = shiftedMatrix.flat();
        
        results['shiftedMatrix'] = result.join(' ');
        break;
      }
      
      case 'Mix Columns': {
        // Simulate the MixColumns operation
        // For demonstration, we'll use a simplified approach
        const bytes = text.split(' ');
        
        // Ensure we have 16 bytes for a 4x4 matrix
        const matrix = [];
        for (let i = 0; i < 4; i++) {
          const column = [];
          for (let j = 0; j < 4; j++) {
            const index = j * 4 + i;
            column.push(index < bytes.length ? bytes[index] : '00');
          }
          matrix.push(column);
        }
        
        // Perform a simplified column mixing (not the actual AES operation)
        const mixedMatrix = matrix.map(column => {
          // Simple mixing operation for demonstration
          const mixed = [
            (parseInt(column[0], 16) ^ parseInt(column[1], 16)).toString(16).padStart(2, '0'),
            (parseInt(column[1], 16) ^ parseInt(column[2], 16)).toString(16).padStart(2, '0'),
            (parseInt(column[2], 16) ^ parseInt(column[3], 16)).toString(16).padStart(2, '0'),
            (parseInt(column[3], 16) ^ parseInt(column[0], 16)).toString(16).padStart(2, '0')
          ];
          return mixed;
        });
        
        // Flatten and transpose the matrix back to the original format
        const result = [];
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            result.push(mixedMatrix[j][i]);
          }
        }
        
        results['mixedMatrix'] = result.join(' ');
        break;
      }
      
      default: {
        results['result'] = `AES ${step.name} result`;
      }
    }
  };
  
  const processRSAStep = (step: EncryptionStep, results: Record<string, unknown>) => {
    // Get input values
    const text = String(results['text'] || '');
    const p = Number(results['p'] || 0);
    const q = Number(results['q'] || 0);
    const e = Number(results['e'] || 0);
    
    switch (step.name) {
      case 'Calculate n': {
        // Calculate n = p * q
        const n = p * q;
        results['n'] = n;
        break;
      }
      
      case 'Calculate Phi': {
        // Calculate φ(n) = (p-1) * (q-1)
        const phi = (p - 1) * (q - 1);
        results['phi'] = phi;
        break;
      }
      
      case 'Calculate d': {
        // Calculate d (modular multiplicative inverse of e modulo φ(n))
        const phi = Number(results['phi'] || 0);
        
        // Simple implementation of Extended Euclidean Algorithm to find d
        const findModInverse = (a: number, m: number): number => {
          // Ensure a is positive
          a = ((a % m) + m) % m;
          
          for (let x = 1; x < m; x++) {
            if ((a * x) % m === 1) {
              return x;
            }
          }
          return 1; // Fallback, should not happen with valid inputs
        };
        
        const d = findModInverse(e, phi);
        results['d'] = d;
        break;
      }
      
      case 'Convert to Numbers': {
        // Convert text to numbers (ASCII values)
        const numbers = text.split('').map(char => char.charCodeAt(0));
        results['numbers'] = numbers.join(',');
        break;
      }
      
      case 'Encrypt': {
        // Encrypt each number using the formula: c = m^e mod n
        const numbers = String(results['numbers'] || '').split(',').map(Number);
        const n = Number(results['n'] || 0);
        
        // Simple modular exponentiation function
        const modPow = (base: number, exponent: number, modulus: number): number => {
          if (modulus === 1) return 0;
          
          let result = 1;
          base = base % modulus;
          
          while (exponent > 0) {
            if (exponent % 2 === 1) {
              result = (result * base) % modulus;
            }
            exponent = Math.floor(exponent / 2);
            base = (base * base) % modulus;
          }
          
          return result;
        };
        
        const encrypted = numbers.map(m => modPow(m, e, n));
        results['encrypted'] = encrypted.join(',');
        break;
      }
      
      case 'Decrypt': {
        // Decrypt each number using the formula: m = c^d mod n
        const encrypted = String(results['encrypted'] || '').split(',').map(Number);
        const n = Number(results['n'] || 0);
        const d = Number(results['d'] || 0);
        
        // Simple modular exponentiation function (same as in Encrypt step)
        const modPow = (base: number, exponent: number, modulus: number): number => {
          if (modulus === 1) return 0;
          
          let result = 1;
          base = base % modulus;
          
          while (exponent > 0) {
            if (exponent % 2 === 1) {
              result = (result * base) % modulus;
            }
            exponent = Math.floor(exponent / 2);
            base = (base * base) % modulus;
          }
          
          return result;
        };
        
        const decrypted = encrypted.map(c => modPow(c, d, n));
        results['decrypted'] = decrypted.join(',');
        break;
      }
      
      case 'Convert to Text': {
        // Convert decrypted numbers back to text
        const decrypted = String(results['decrypted'] || '').split(',').map(Number);
        const text = decrypted.map(code => String.fromCharCode(code)).join('');
        results['decryptedText'] = text;
        break;
      }
      
      default: {
        results['result'] = `RSA ${step.name} result`;
      }
    }
  };

  const calculateProgress = (): number => {
    if (!selectedAlgorithm || currentStep < 0) return 0;
    
    const totalSteps = (selectedAlgorithm.keyGeneration?.length || 0) + selectedAlgorithm.steps.length;
    return ((currentStep + 1) / totalSteps) * 100;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <AlgorithmSelector 
              algorithms={encryptionAlgorithms}
              selectedAlgorithm={selectedAlgorithm}
              onSelectAlgorithm={setSelectedAlgorithm}
              disabled={isStarted}
            />
            
            {selectedAlgorithm && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedAlgorithm.inputs.map(input => (
                    <div key={input} className="space-y-2">
                      <Label htmlFor={input}>{t(`encryption.inputs.${input}`)}</Label>
                      <Input
                        id={input}
                        value={inputs[input] || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(input, e.target.value)}
                        disabled={isStarted}
                        placeholder={t(`encryption.placeholders.${input}`)}
                      />
                    </div>
                  ))}
                </div>
                
                {!isStarted ? (
                  <Button 
                    onClick={startEncryption} 
                    disabled={Object.values(inputs).some(value => value === '')}
                    className="w-full"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    {t('encryption.startEncryption')}
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Progress value={calculateProgress()} className="flex-1" />
                      <span className="text-sm text-muted-foreground">
                        {currentStep + 1} / {(selectedAlgorithm.keyGeneration?.length || 0) + selectedAlgorithm.steps.length}
                      </span>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <AlgorithmStep 
                        step={getCurrentStepObject()} 
                        intermediateResults={intermediateResults}
                        isAnimating={isAnimating}
                      />
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="outline" 
                        onClick={goToPreviousStep} 
                        disabled={currentStep <= 0 || isAnimating}
                      >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        {t('encryption.previousStep')}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        onClick={resetDemo}
                        disabled={isAnimating}
                      >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        {t('encryption.reset')}
                      </Button>
                      
                      <Button 
                        onClick={goToNextStep} 
                        disabled={
                          currentStep >= ((selectedAlgorithm.keyGeneration?.length || 0) + selectedAlgorithm.steps.length - 1) || 
                          isAnimating
                        }
                      >
                        {t('encryption.nextStep')}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 