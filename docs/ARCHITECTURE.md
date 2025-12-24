# System Architecture

## 🏗️ Overview

BharatMinds AI Counsellor is built using a modern, scalable architecture designed for performance, maintainability, and developer experience.

## 📐 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Next.js    │  │    React     │  │  TypeScript  │      │
│  │  App Router  │  │  Components  │  │   Types      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                     Application Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Services   │  │    Hooks     │  │    Utils     │      │
│  │   (Business  │  │   (State)    │  │  (Helpers)   │      │
│  │    Logic)    │  │              │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                       Data Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Appwrite   │  │     CSV      │  │     PDF      │      │
│  │   Database   │  │    Parser    │  │  Generator   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## 🗂️ Folder Structure

### `/src/app` - Application Routes
- Uses Next.js 14 App Router
- Route groups for organization: `(auth)`, `(dashboard)`, `(marketing)`
- Server and client components
- API routes in `/api`

### `/src/components` - React Components
- **ui/** - Reusable UI primitives (buttons, inputs, cards)
- **forms/** - Form components with validation
- **chat/** - Chat interface components
- **layout/** - Layout components (header, footer, sidebar)
- **shared/** - Shared components (loading, errors)

### `/src/lib` - Core Libraries
- **config/** - Configuration files (Appwrite, constants, env)
- **services/** - Business logic organized by domain
  - auth/ - Authentication services
  - student/ - Student management
  - counselling/ - Counselling algorithm
  - data/ - Data processing
  - pdf/ - PDF generation
- **hooks/** - Custom React hooks
- **utils/** - Utility functions
- **validations/** - Zod validation schemas

### `/src/types` - TypeScript Types
- Centralized type definitions
- Shared interfaces and types
- API response types

## 🔄 Data Flow

### Authentication Flow
```
User Input → Auth Form → useAuth Hook → Auth Service → Appwrite → Response
                                                           ↓
                                                    Update User State
```

### Counselling Flow
```
Student Data → Registration → Algorithm Service → CSV Data
                                      ↓
                              Option List Generation
                                      ↓
                              PDF Generator → Download
```

## 🎯 Design Patterns

### 1. Service Layer Pattern
- Business logic separated from UI
- Services are stateless and reusable
- Single responsibility principle

### 2. Custom Hooks Pattern
- Encapsulate stateful logic
- Reusable across components
- Clean component code

### 3. Configuration Pattern
- Centralized configuration
- Environment-based settings
- Type-safe constants

### 4. Index Exports Pattern
- Clean imports with barrel exports
- Better code organization
- Easier refactoring

## 🔐 Security

### Authentication
- Appwrite session-based auth
- Secure password hashing
- Session management

### Data Protection
- Environment variables for secrets
- HTTPS only in production
- Input validation with Zod

## 🚀 Performance

### Optimization Strategies
- Code splitting with Next.js
- Image optimization
- Lazy loading components
- Memoization where needed

### Caching
- Static page generation
- API response caching
- Browser caching headers

## 📊 State Management

### Current Approach
- React Context for registration flow
- Custom hooks for auth state
- Local state for UI components

### Future Considerations
- Zustand for global state
- React Query for server state
- Optimistic updates

## 🧪 Testing Strategy

### Unit Tests
- Service layer functions
- Utility functions
- Custom hooks

### Integration Tests
- API routes
- Component integration
- User flows

### E2E Tests
- Critical user journeys
- Registration flow
- Counselling generation

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS for styling
- Breakpoint system
- Touch-friendly interfaces

## 🔧 Development Workflow

1. **Local Development**
   - `npm run dev` - Start dev server
   - Hot reload enabled
   - TypeScript checking

2. **Code Quality**
   - ESLint for linting
   - Prettier for formatting
   - TypeScript for type safety

3. **Version Control**
   - Git for source control
   - Feature branches
   - Pull request reviews

## 🌐 Deployment

### Production Environment
- Vercel for hosting
- Appwrite Cloud for backend
- CDN for static assets

### CI/CD Pipeline
- Automated testing
- Build verification
- Deployment automation

## 📈 Scalability

### Horizontal Scaling
- Stateless services
- API-first architecture
- Microservices ready

### Vertical Scaling
- Optimized queries
- Efficient algorithms
- Resource management

## 🔮 Future Enhancements

1. **Real-time Features**
   - WebSocket integration
   - Live updates
   - Collaborative features

2. **Advanced Analytics**
   - User behavior tracking
   - Performance monitoring
   - Error tracking

3. **AI Improvements**
   - Machine learning models
   - Predictive analytics
   - Personalization

---

**Last Updated:** December 2024
