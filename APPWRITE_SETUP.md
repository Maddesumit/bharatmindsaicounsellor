# Appwrite Configuration Guide

## Step 1: Get Your Appwrite Credentials

You need to copy the Appwrite credentials from your React Native app's `.env` file.

### From React Native App

Open `/Users/sumitmadde/Desktop/AI Counsellor/ai-counsellor-mvp/.env` and copy these values:
- `EXPO_PUBLIC_APPWRITE_ENDPOINT`
- `EXPO_PUBLIC_APPWRITE_PROJECT_ID`
- `EXPO_PUBLIC_APPWRITE_DATABASE_ID`
- `EXPO_PUBLIC_APPWRITE_STUDENTS_COLLECTION_ID`
- `EXPO_PUBLIC_APPWRITE_OPTION_LISTS_COLLECTION_ID`
- `EXPO_PUBLIC_APPWRITE_PDF_BUCKET_ID`

## Step 2: Create `.env.local` File

Create a new file at `/Users/sumitmadde/Desktop/AI Counsellor/ai-counsellor-mvp/ai-counsellor-web/.env.local` with the following content:

```env
# Appwrite Configuration (from your React Native app)
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_APPWRITE_DATABASE_ID=main_db
NEXT_PUBLIC_APPWRITE_STUDENTS_COLLECTION_ID=students
NEXT_PUBLIC_APPWRITE_OPTION_LISTS_COLLECTION_ID=option_lists
NEXT_PUBLIC_APPWRITE_PDF_BUCKET_ID=pdfs
```

**Replace the placeholder values** with your actual Appwrite credentials from the React Native app.

## Step 3: Configure Appwrite Console

### Enable Web Platform

1. Go to your Appwrite Console: https://cloud.appwrite.io
2. Select your project
3. Go to **Settings** → **Platforms**
4. Click **Add Platform** → **Web App**
5. Add these hostnames:
   - `localhost` (for development)
   - `http://localhost:3000` (for development)
   - Your production domain (when deploying)

### Verify Collections

Make sure these collections exist in your Appwrite database:

1. **students** collection with attributes:
   - name (string)
   - mobile (string)
   - email (string)
   - counsellingTypes (string/text)
   - ugcetCourses (string/text)
   - farmScienceCourses (string/text)
   - ugneetCourses (string/text)
   - ugneetSpecialCategories (string/text)
   - neetAIR (integer)
   - courseRanks (string/text)
   - baseCategory (string)
   - hasKannada (boolean)
   - hasRural (boolean)
   - hasHK (boolean)
   - snqApplied (boolean)
   - incomeSlab (string)
   - eligibleCategories (string/text)
   - specialCategories (string/text)
   - createdAt (string)

2. **option_lists** collection (if needed)

3. **pdfs** storage bucket (if needed)

## Step 4: Restart Development Server

After creating `.env.local`, restart your Next.js development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 5: Test Authentication

1. Go to http://localhost:3000/auth
2. Try creating a new account
3. Check Appwrite Console to verify the user was created

## Troubleshooting

### "Appwrite is not configured" Error
- Make sure `.env.local` file exists
- Verify all environment variables are set correctly
- Restart the dev server after creating `.env.local`

### CORS Errors
- Add `localhost` and `http://localhost:3000` to your Appwrite platform settings
- Make sure you're using the correct endpoint URL

### 401 Unauthorized
- Check that your project ID is correct
- Verify the endpoint URL matches your Appwrite instance

### User Creation Fails
- Verify the students collection exists
- Check that all required attributes are created in Appwrite
- Make sure permissions are set correctly (allow create for guests/users)

## Quick Setup Command

Run this command to create `.env.local` with template:

```bash
cd /Users/sumitmadde/Desktop/AI\ Counsellor/ai-counsellor-mvp/ai-counsellor-web
cp env.example .env.local
# Then edit .env.local with your actual credentials
```
