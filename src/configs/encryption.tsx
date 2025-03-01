export type EncryptionIcon = "classical" | "symmetric" | "asymmetric" | "code";

export const encryptionRoutes = {
  classical: {
    label: "Classical",
    children: [
      {
        label: "Caesar",
        description: "Caesar encryption using Caesar algorithm",
        element: <div>Caesar</div>,
        icon: "classical" as EncryptionIcon,
      },
      {
        label: "Vigenere",
        description: "Vigenere encryption using Vigenere algorithm",
        element: <div>Vigenere</div>,
        icon: "classical" as EncryptionIcon,
      },
    ],
  },
  symmetric: {
    label: "Symmetric",
    children: [
      {
        label: "AES",
        description: "AES encryption using AES algorithm",
        element: <div>AES</div>,
        icon: "symmetric" as EncryptionIcon,
      },
    ],
  },
  asymmetric: {
    label: "Asymmetric",
    children: [
      {
        label: "RSA",
        description: "RSA encryption using RSA algorithm",
        element: <div>RSA</div>,
        icon: "asymmetric" as EncryptionIcon,
      },
    ],
  },
};
