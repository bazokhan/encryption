import { EncryptionAlgorithm } from '@/types/encryption';

export const encryptionAlgorithms: EncryptionAlgorithm[] = [
  {
    id: 'caesar',
    name: 'Caesar Cipher',
    description: 'A simple substitution cipher where each letter is shifted by a fixed number of positions.',
    inputs: ['plaintext', 'shift'],
    steps: [
      {
        name: 'Convert Text to ASCII',
        inputs: ['plaintext'],
        outputs: ['asciiValues'],
        animation: 'highlightCharacters',
        description: 'Each character is converted to its ASCII numeric value.'
      },
      {
        name: 'Shift ASCII Values',
        inputs: ['asciiValues', 'shift'],
        outputs: ['shiftedValues'],
        animation: 'shiftNumbers',
        description: 'Each ASCII value is shifted by the specified amount.'
      },
      {
        name: 'Convert Back to Characters',
        inputs: ['shiftedValues'],
        outputs: ['cipherText'],
        animation: 'highlightCharacters',
        description: 'The shifted ASCII values are converted back to characters.'
      }
    ]
  },
  {
    id: 'vigenere',
    name: 'Vigenère Cipher',
    description: 'A method of encrypting text using a series of interwoven Caesar ciphers based on a keyword.',
    inputs: ['plaintext', 'keyword'],
    steps: [
      {
        name: 'Convert Text and Keyword to ASCII',
        inputs: ['plaintext', 'keyword'],
        outputs: ['textAscii', 'keywordAscii'],
        animation: 'highlightCharacters',
        description: 'Both the plaintext and keyword are converted to ASCII values.'
      },
      {
        name: 'Extend Keyword to Match Text Length',
        inputs: ['keywordAscii', 'plaintext'],
        outputs: ['extendedKeyAscii'],
        animation: 'highlightCharacters',
        description: 'The keyword is repeated to match the length of the plaintext.'
      },
      {
        name: 'Apply Vigenère Formula',
        inputs: ['textAscii', 'extendedKeyAscii'],
        outputs: ['encryptedAscii'],
        animation: 'shiftNumbers',
        description: 'Each character is shifted according to the corresponding keyword character.'
      },
      {
        name: 'Convert Back to Characters',
        inputs: ['encryptedAscii'],
        outputs: ['cipherText'],
        animation: 'highlightCharacters',
        description: 'The encrypted ASCII values are converted back to characters.'
      }
    ]
  },
  {
    id: 'aes',
    name: 'AES-128',
    description: 'Advanced Encryption Standard with 128-bit key size, a symmetric block cipher adopted by the U.S. government.',
    inputs: ['plaintext', 'key'],
    keyGeneration: [
      {
        name: 'Key Expansion',
        inputs: ['key'],
        outputs: ['roundKeys'],
        animation: 'keyExpansionAnimation',
        description: 'The initial key is expanded into a key schedule for each round.'
      }
    ],
    steps: [
      {
        name: 'Initial Round - Add Round Key',
        inputs: ['plaintext', 'roundKeys[0]'],
        outputs: ['stateMatrix'],
        animation: 'xorAnimation',
        description: 'The plaintext is XORed with the first round key.'
      },
      {
        name: 'SubBytes',
        inputs: ['stateMatrix'],
        outputs: ['substitutedState'],
        animation: 'substitutionAnimation',
        description: 'Each byte is replaced with another according to a lookup table (S-box).'
      },
      {
        name: 'ShiftRows',
        inputs: ['substitutedState'],
        outputs: ['shiftedState'],
        animation: 'shiftRowsAnimation',
        description: 'The rows of the state are shifted cyclically by different offsets.'
      },
      {
        name: 'MixColumns',
        inputs: ['shiftedState'],
        outputs: ['mixedState'],
        animation: 'mixColumnsAnimation',
        description: 'The columns of the state are mixed using a linear transformation.'
      },
      {
        name: 'Add Round Key',
        inputs: ['mixedState', 'roundKeys[1]'],
        outputs: ['newState'],
        animation: 'xorAnimation',
        description: 'The state is XORed with the current round key.'
      },
      {
        name: 'Final Round - Add Round Key',
        inputs: ['newState', 'roundKeys[10]'],
        outputs: ['cipherText'],
        animation: 'finalXorAnimation',
        description: 'The state is XORed with the final round key to produce the ciphertext.'
      }
    ]
  },
  {
    id: 'rsa',
    name: 'RSA',
    description: 'A public-key cryptosystem widely used for secure data transmission.',
    inputs: ['plaintext', 'publicKey', 'privateKey'],
    keyGeneration: [
      {
        name: 'Generate Prime Numbers',
        inputs: [],
        outputs: ['p', 'q'],
        animation: 'highlightCharacters',
        description: 'Two large prime numbers are generated.'
      },
      {
        name: 'Calculate Modulus',
        inputs: ['p', 'q'],
        outputs: ['n'],
        animation: 'shiftNumbers',
        description: 'The modulus n = p × q is calculated.'
      },
      {
        name: 'Calculate Totient',
        inputs: ['p', 'q'],
        outputs: ['phi'],
        animation: 'shiftNumbers',
        description: 'The totient φ(n) = (p-1) × (q-1) is calculated.'
      },
      {
        name: 'Choose Public Exponent',
        inputs: ['phi'],
        outputs: ['e'],
        animation: 'highlightCharacters',
        description: 'A public exponent e is chosen such that 1 < e < φ(n) and gcd(e, φ(n)) = 1.'
      },
      {
        name: 'Calculate Private Exponent',
        inputs: ['e', 'phi'],
        outputs: ['d'],
        animation: 'shiftNumbers',
        description: 'The private exponent d is calculated such that (d × e) mod φ(n) = 1.'
      }
    ],
    steps: [
      {
        name: 'Convert Plaintext to Number',
        inputs: ['plaintext'],
        outputs: ['m'],
        animation: 'highlightCharacters',
        description: 'The plaintext is converted to a numerical representation.'
      },
      {
        name: 'Apply Encryption Formula',
        inputs: ['m', 'e', 'n'],
        outputs: ['c'],
        animation: 'shiftNumbers',
        description: 'The ciphertext c = m^e mod n is calculated.'
      },
      {
        name: 'Format Ciphertext',
        inputs: ['c'],
        outputs: ['cipherText'],
        animation: 'highlightCharacters',
        description: 'The numerical ciphertext is formatted for output.'
      }
    ]
  }
]; 