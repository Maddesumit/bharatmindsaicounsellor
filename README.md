# BharatMinds AI Counsellor 🎓

> AI-powered college counselling platform for UGCET and UGNEET students in Karnataka

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)](https://tailwindcss.com/)
[![Appwrite](https://img.shields.io/badge/Appwrite-Cloud-f02e65)](https://appwrite.io/)

## 🌟 Features

- **AI-Powered Matching** - Analyze 1,600+ cutoff records across 127+ colleges
- **Smart Category Calculation** - 25+ category combinations for maximum opportunities
- **Expert Counselling** - One-on-one guidance from experienced counsellors
- **Instant Reports** - PDF downloads with safe, target, and reach colleges
- **Multi-Course Support** - UGCET (Engineering), UGNEET (Medical), Farm Science
- **Real-time Updates** - Round-by-round admission tracking

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Appwrite account ([cloud.appwrite.io](https://cloud.appwrite.io))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-counsellor-mvp/ai-counsellor-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your Appwrite credentials:
   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=main_db
   NEXT_PUBLIC_APPWRITE_STUDENTS_COLLECTION_ID=students
   NEXT_PUBLIC_APPWRITE_OPTION_LISTS_COLLECTION_ID=option_lists
   NEXT_PUBLIC_APPWRITE_PDF_BUCKET_ID=pdfs
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ai-counsellor-web/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # Auth routes group
│   │   ├── (dashboard)/         # Protected routes
│   │   ├── (marketing)/         # Public routes
│   │   └── api/                 # API routes
│   ├── components/              # React components
│   │   ├── ui/                  # UI primitives
│   │   ├── forms/               # Form components
│   │   ├── chat/                # Chat interface
│   │   ├── layout/              # Layout components
│   │   └── shared/              # Shared components
│   ├── lib/                     # Core libraries
│   │   ├── config/              # Configuration
│   │   ├── hooks/               # Custom hooks
│   │   ├── services/            # Business logic
│   │   ├── utils/               # Utilities
│   │   └── validations/         # Zod schemas
│   └── types/                   # TypeScript types
├── public/                      # Static assets
├── docs/                        # Documentation
└── tests/                       # Test files
```

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom components with Lucide icons

### Backend
- **BaaS:** Appwrite Cloud
- **Database:** Appwrite Database
- **Storage:** Appwrite Storage
- **Auth:** Appwrite Authentication

### Development
- **Linting:** ESLint
- **Formatting:** Prettier
- **Version Control:** Git

## 📖 Documentation

- [Architecture Guide](./docs/ARCHITECTURE.md) - System design and patterns
- [API Documentation](./docs/API.md) - API endpoints and usage
- [Contributing Guide](./docs/CONTRIBUTING.md) - How to contribute
- [Deployment Guide](./docs/DEPLOYMENT.md) - Production deployment

## 🎯 Path Aliases

The project uses TypeScript path aliases for clean imports:

```typescript
import { Button } from '@/components/ui';
import { useAuth } from '@/hooks';
import { login } from '@/services/auth';
import { ROUTES } from '@/config/constants';
```

Available aliases:
- `@/*` → `src/*`
- `@/components/*` → `src/components/*`
- `@/lib/*` → `src/lib/*`
- `@/types/*` → `src/types/*`
- `@/hooks/*` → `src/lib/hooks/*`
- `@/services/*` → `src/lib/services/*`
- `@/utils/*` → `src/lib/utils/*`
- `@/config/*` → `src/lib/config/*`

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## 🧪 Testing

```bash
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
npm run test:watch   # Run tests in watch mode
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Manual Deployment

```bash
npm run build
npm start
```

## 🔐 Environment Variables

Required environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_APPWRITE_ENDPOINT` | Appwrite API endpoint | `https://cloud.appwrite.io/v1` |
| `NEXT_PUBLIC_APPWRITE_PROJECT_ID` | Appwrite project ID | `your_project_id` |
| `NEXT_PUBLIC_APPWRITE_DATABASE_ID` | Database ID | `main_db` |
| `NEXT_PUBLIC_APPWRITE_STUDENTS_COLLECTION_ID` | Students collection | `students` |
| `NEXT_PUBLIC_APPWRITE_OPTION_LISTS_COLLECTION_ID` | Option lists collection | `option_lists` |
| `NEXT_PUBLIC_APPWRITE_PDF_BUCKET_ID` | PDF storage bucket | `pdfs` |

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./docs/CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Code Quality

- **TypeScript** - Strict type checking
- **ESLint** - Code linting with Next.js rules
- **Prettier** - Consistent code formatting
- **Husky** - Git hooks for quality checks

## 🐛 Troubleshooting

### Appwrite Connection Issues
- Verify environment variables
- Check Appwrite project ID and endpoint
- Ensure CORS is configured in Appwrite console

### Build Errors
```bash
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Import Errors
- Ensure path aliases are configured in `tsconfig.json`
- Restart TypeScript server in your IDE

## 📊 Performance

- **Lighthouse Score:** 95+
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **SEO Score:** 100

## 🔒 Security

- Environment variables for sensitive data
- HTTPS only in production
- Input validation with Zod
- Secure session management

## 📄 License

Proprietary - BharatMinds © 2024

## 📧 Support

- **Email:** support@bharatminds.com
- **Documentation:** [docs/](./docs/)
- **Issues:** GitHub Issues

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Appwrite for the backend infrastructure
- Tailwind CSS for the styling system
- All contributors and supporters

---

**Built with ❤️ by the BharatMinds Team**
