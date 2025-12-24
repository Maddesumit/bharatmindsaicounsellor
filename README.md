# AI Counsellor MVP

A mobile app for KCET engineering college counselling powered by AI.

## Features

- 🤖 Chat-based registration
- 🎯 Personalized college recommendations
- 📊 Probability-based tier system (Safe/Target/Reach)
- 📄 PDF export of option list
- 🏛️ Support for all 25 KCET categories
- 📍 Location and branch preferences

## Tech Stack

- React Native with Expo
- TypeScript
- React Navigation
- React Native Paper
- Appwrite (optional backend)
- AsyncStorage (local fallback)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- iOS Simulator (Mac) or Android Emulator
- Expo Go app on your phone (optional)

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web
```

### Appwrite Setup (Optional - Automated)

For production deployment with cloud storage, you can automatically set up Appwrite:

**Quick Setup:**
```bash
# 1. Create Appwrite project at cloud.appwrite.io
# 2. Get your Project ID and API Key
# 3. Copy environment file
cp .env.example .env

# 4. Edit .env and add your credentials
# APPWRITE_PROJECT_ID=your_project_id
# APPWRITE_API_KEY=your_api_key

# 5. Run automated setup
npm run setup:appwrite
```

**Detailed Instructions**: See [APPWRITE_AUTOMATED_SETUP.md](./APPWRITE_AUTOMATED_SETUP.md)

The script will automatically create:
- Database with proper schema
- Collections (students, option_lists)
- Storage bucket for PDFs
- All indexes and permissions

**Note**: The app works without Appwrite using local storage for MVP testing.

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Chat/        # Chat interface components
│   └── College/     # College card components
├── screens/         # App screens
│   ├── Registration/
│   └── OptionList/
├── services/        # Business logic
│   ├── csvParser.ts
│   ├── optionListAlgorithm.ts
│   ├── pdfGenerator.ts
│   ├── dataLoader.ts
│   ├── studentService.ts
│   └── appwrite.ts
├── types/           # TypeScript definitions
├── context/         # State management
└── navigation/      # Navigation config
```

## Algorithm

The app uses a proprietary algorithm for college recommendations:

1. **Eligibility Check**: Calculates all categories a student can apply under
2. **Search Range**: `rank - 10,000` (reach) to `rank + 5,000` (safe)
3. **Probability Calculation**: Based on rank difference from cutoff
4. **Scoring System**: 40% probability, 25% location, 20% branch, 15% college type
5. **Tier Grouping**: Safe (80-95%), Target (40-80%), Reach (20-40%)

## Data

- KCET 2024 Round 1 cutoff data (1,639 records)
- 127 engineering colleges
- 25 category variants
- 20+ branches

## License

Proprietary - BharatMinds

## Contact

For support: support@bharatminds.com
