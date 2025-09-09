# ReadME Generator 🚀
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An AI-powered README generator that transforms any GitHub repository into professional, comprehensive documentation with beautiful formatting, badges, and installation guides.

## ✨ Features

- 🤖 **AI-Powered Generation** - Intelligent README creation based on repository analysis
- 🎨 **Beautiful UI** - Modern, responsive design with Tailwind CSS and shadcn/ui
- 📊 **Repository Analysis** - Automatic detection of project structure and technologies
- 🏷️ **Smart Badges** - Auto-generated badges based on detected technologies
- 📋 **Copy & Download** - Easy copying and downloading of generated README files
- 🔄 **Regeneration** - Ability to regenerate README with updated content
- 📱 **Mobile Responsive** - Works perfectly on all device sizes
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.19
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: shadcn/ui with Radix UI primitives
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Notifications**: Sonner toast notifications

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-readme-pro.git
   cd ai-readme-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📖 Usage

1. **Enter Repository URL**: Paste any GitHub repository URL (supports various formats)
2. **Repository Analysis**: The app fetches and analyzes the repository structure
3. **README Generation**: AI generates a comprehensive README based on the analysis
4. **Copy or Download**: Use the generated README in your project

### Supported URL Formats

- `https://github.com/owner/repo`
- `https://github.com/owner/repo.git`
- `owner/repo`

## 🏗️ Project Structure

```
ai-readme-pro/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── ErrorDisplay.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ReadmeOutput.tsx
│   │   ├── RepositoryInfo.tsx
│   │   └── UrlInput.tsx
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── pages/            # Page components
│   ├── services/         # API services
│   │   ├── github.ts     # GitHub API integration
│   │   └── readme.ts     # README generation logic
│   ├── App.tsx           # Main app component
│   └── main.tsx          # App entry point
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

