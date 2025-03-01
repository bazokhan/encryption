import { AlgorithmTemplate } from "@/components/AlgorithmTemplate";

export type EncryptionIcon = "classical" | "symmetric" | "asymmetric" | "code";

export const encryptionRoutes = {
  classical: {
    label: "Classical",
    description: "Classical encryption methods are the foundation of cryptography, dating back thousands of years. These techniques, while not secure by modern standards, introduced fundamental concepts that evolved into today's sophisticated algorithms. They typically use substitution or transposition ciphers that can be performed with pen and paper.",
    children: [
      {
        label: "Caesar",
        description: "The Caesar cipher is one of the simplest and most widely known encryption techniques. Named after Julius Caesar, who used it to communicate with his generals, it works by shifting each letter in the plaintext by a fixed number of positions down the alphabet. Despite its simplicity, it introduces the concept of substitution ciphers that became the basis for more complex encryption methods.",
        element: <AlgorithmTemplate 
          title="Caesar Cipher" 
          description="The Caesar cipher is one of the simplest and most widely known encryption techniques. Named after Julius Caesar, who used it to communicate with his generals, it works by shifting each letter in the plaintext by a fixed number of positions down the alphabet."
        />,
        icon: "classical" as EncryptionIcon,
      },
      {
        label: "Vigenere",
        description: "The Vigenère cipher is a method of encrypting alphabetic text by using a simple form of polyalphabetic substitution. It employs a keyword to determine different shift values for each letter in the plaintext, making it significantly more secure than the Caesar cipher. For centuries, it was considered unbreakable until methods of cryptanalysis were developed in the 19th century.",
        element: <AlgorithmTemplate 
          title="Vigenère Cipher" 
          description="The Vigenère cipher is a method of encrypting alphabetic text by using a simple form of polyalphabetic substitution. It employs a keyword to determine different shift values for each letter in the plaintext, making it significantly more secure than the Caesar cipher."
        />,
        icon: "classical" as EncryptionIcon,
      },
    ],
  },
  symmetric: {
    label: "Symmetric",
    description: "Symmetric encryption uses the same key for both encryption and decryption. These algorithms are typically fast and efficient for large amounts of data, but require secure key exchange between parties. Modern symmetric algorithms like AES form the backbone of everyday secure communications and data storage.",
    children: [
      {
        label: "AES",
        description: "The Advanced Encryption Standard (AES) is one of the most widely used symmetric encryption algorithms in the world. Established by the U.S. National Institute of Standards and Technology (NIST) in 2001, AES operates on blocks of data using key sizes of 128, 192, or 256 bits. It's considered highly secure and is used in numerous applications from secure communications to file encryption.",
        element: <AlgorithmTemplate 
          title="Advanced Encryption Standard (AES)" 
          description="The Advanced Encryption Standard (AES) is one of the most widely used symmetric encryption algorithms in the world. Established by the U.S. National Institute of Standards and Technology (NIST) in 2001, AES operates on blocks of data using key sizes of 128, 192, or 256 bits."
        />,
        icon: "symmetric" as EncryptionIcon,
      },
    ],
  },
  asymmetric: {
    label: "Asymmetric",
    description: "Asymmetric encryption, also known as public-key cryptography, uses a pair of mathematically related keys: a public key for encryption and a private key for decryption. This revolutionary approach solved the key distribution problem of symmetric encryption and enables secure communications without prior key exchange. It's the foundation of modern internet security.",
    children: [
      {
        label: "RSA",
        description: "RSA (Rivest–Shamir–Adleman) is one of the first practical public-key cryptosystems, widely used for secure data transmission. The security of RSA is based on the practical difficulty of factoring the product of two large prime numbers. With sufficiently long keys, RSA provides a high level of security and is commonly used for secure communications, digital signatures, and key exchange protocols across the internet.",
        element: <AlgorithmTemplate 
          title="RSA (Rivest–Shamir–Adleman)" 
          description="RSA is one of the first practical public-key cryptosystems, widely used for secure data transmission. The security of RSA is based on the practical difficulty of factoring the product of two large prime numbers."
        />,
        icon: "asymmetric" as EncryptionIcon,
      },
    ],
  },
};
