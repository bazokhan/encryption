# Encryption Algorithms Explorer

An interactive educational web app for learning about encryption and cryptography. Visualize step-by-step how different encryption algorithms work—from classical ciphers to modern standards—with animated demos and detailed explanations.

## Features

- **Classical Encryption**: Caesar and Vigenère ciphers with historical context and ASCII visualization
- **Symmetric Encryption**: AES-128 with key expansion, SubBytes, ShiftRows, and MixColumns steps
- **Asymmetric Encryption**: RSA with key generation (n, φ(n), d) and encryption/decryption flow
- **Interactive Step-by-Step Demo**: Run through each algorithm with your own input and watch intermediate values update
- **Animated Visualizations**: Character highlighting, number shifting, XOR, and placeholder animations for each step
- **Internationalization**: Full i18n support (Arabic and English) with RTL layout
- **Responsive UI**: Radix UI components with Tailwind CSS and dark/light theme support

## Prerequisites

- **Node.js** (v18 or higher) — [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** (comes with Node.js)

## Getting Started

### 1. Clone the Repository

```bash
git clone <YOUR_GIT_URL>
cd encryption
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### 4. Build for Production

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Technology Stack

- **Frontend Framework**: Vite + React 19 + TypeScript
- **Routing**: React Router v7
- **UI Components**: Radix UI + Tailwind CSS + shadcn-style components
- **Animations**: Framer Motion
- **Internationalization**: i18next with browser language detection

## Available Scripts

| Script      | Description                    |
|------------|--------------------------------|
| `npm run dev`     | Start development server       |
| `npm run build`   | Build for production          |
| `npm run preview` | Preview production build      |
| `npm run lint`    | Run ESLint                    |

## Project Structure

```
encryption/
├── src/
│   ├── components/       # React components
│   │   ├── encryption/   # Algorithm step, selector, animations
│   │   └── ui/           # Reusable UI (button, card, input, etc.)
│   ├── configs/          # Encryption routes and algorithm definitions
│   ├── i18n/             # Locales (ar, en)
│   ├── layouts/          # MainLayout, CategoryLayout
│   ├── routes/           # HomePage, EncryptionDemoPage, router
│   └── types/            # TypeScript definitions
├── public/
└── package.json
```

## Supported Algorithms

| Category   | Algorithm  | Description                                                                 |
|-----------|------------|-----------------------------------------------------------------------------|
| Classical | Caesar     | Shift cipher; each letter shifted by a fixed number of positions           |
| Classical | Vigenère   | Polyalphabetic substitution using a keyword                               |
| Symmetric | AES-128    | Block cipher with SubBytes, ShiftRows, MixColumns, AddRoundKey             |
| Asymmetric| RSA        | Public-key cryptosystem based on factoring large primes                    |

## License

Private Repository, Proprietary Software.
