# Appwrite Setup Guide for AI Counsellor MVP

## Database Collections

### 1. Collection: `students`

**Purpose**: Store student profiles and registration data

**Attributes:**
```json
{
  "name": {
    "type": "string",
    "size": 255,
    "required": true
  },
  "mobile": {
    "type": "string",
    "size": 15,
    "required": true
  },
  "email": {
    "type": "email",
    "required": true
  },
  "rank": {
    "type": "integer",
    "required": true,
    "min": 1,
    "max": 300000
  },
  "baseCategory": {
    "type": "string",
    "size": 10,
    "required": true
  },
  "hasKannada": {
    "type": "boolean",
    "default": false
  },
  "hasRural": {
    "type": "boolean",
    "default": false
  },
  "hasHK": {
    "type": "boolean",
    "default": false
  },
  "eligibleCategories": {
    "type": "string",
    "size": 500,
    "required": true,
    "array": true
  },
  "preferredCourses": {
    "type": "string",
    "size": 500,
    "array": true
  },
  "preferredLocations": {
    "type": "string",
    "size": 500,
    "array": true
  },
  "preferredCollegeType": {
    "type": "string",
    "size": 50
  },
  "preferredBranches": {
    "type": "string",
    "size": 500,
    "array": true
  },
  "createdAt": {
    "type": "datetime",
    "required": true
  }
}
```

**Indexes:**
- `rank` (ascending)
- `email` (unique)
- `mobile` (unique)

**Permissions:**
- Create: Users
- Read: Users (own documents)
- Update: Users (own documents)
- Delete: Users (own documents)

---

### 2. Collection: `option_lists`

**Purpose**: Store generated option lists for students

**Attributes:**
```json
{
  "studentId": {
    "type": "string",
    "size": 255,
    "required": true
  },
  "optionListData": {
    "type": "string",
    "size": 1000000,
    "required": true
  },
  "generatedAt": {
    "type": "datetime",
    "required": true
  },
  "pdfUrl": {
    "type": "url",
    "size": 500
  }
}
```

**Indexes:**
- `studentId` (ascending)
- `generatedAt` (descending)

**Permissions:**
- Create: Users
- Read: Users (own documents)
- Update: Users (own documents)
- Delete: Users (own documents)

---

## Storage Buckets

### 1. Bucket: `pdfs`

**Purpose**: Store generated PDF files

**Settings:**
- Maximum file size: 10 MB
- Allowed file extensions: `.pdf`
- Encryption: Enabled
- Antivirus: Enabled

**Permissions:**
- Create: Users
- Read: Users (own files)
- Update: Users (own files)
- Delete: Users (own files)

---

## Appwrite Configuration Steps

### Step 1: Create Appwrite Project

1. Go to [Appwrite Cloud](https://cloud.appwrite.io/) or your self-hosted instance
2. Create a new project: "AI Counsellor MVP"
3. Note down:
   - Project ID
   - API Endpoint
   - Database ID (create one named "main_db")

### Step 2: Create Collections

For each collection above:
1. Go to Databases → main_db → Create Collection
2. Add attributes as specified
3. Create indexes
4. Set permissions

### Step 3: Create Storage Bucket

1. Go to Storage → Create Bucket
2. Name: "pdfs"
3. Configure settings as specified
4. Set permissions

### Step 4: Configure Environment Variables

Create `.env` file in project root:

```env
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
EXPO_PUBLIC_APPWRITE_DATABASE_ID=main_db
EXPO_PUBLIC_APPWRITE_STUDENTS_COLLECTION_ID=students
EXPO_PUBLIC_APPWRITE_OPTION_LISTS_COLLECTION_ID=option_lists
EXPO_PUBLIC_APPWRITE_PDF_BUCKET_ID=pdfs
```

### Step 5: Initialize Appwrite in App

The Appwrite client is already configured in `src/services/appwrite.ts`

---

## Quick Setup Commands

If using Appwrite CLI:

```bash
# Install Appwrite CLI
npm install -g appwrite-cli

# Login
appwrite login

# Create collections
appwrite databases createCollection \
  --databaseId main_db \
  --collectionId students \
  --name "Students"

# Add attributes (repeat for each attribute)
appwrite databases createStringAttribute \
  --databaseId main_db \
  --collectionId students \
  --key name \
  --size 255 \
  --required true

# Create storage bucket
appwrite storage createBucket \
  --bucketId pdfs \
  --name "PDFs" \
  --permissions "create('users')" \
  --fileSecurity true \
  --enabled true
```

---

## For MVP Testing

**Option 1: Use Appwrite Cloud**
- Fastest setup
- Free tier available
- No server management

**Option 2: Local Storage (No Appwrite)**
For quick MVP testing, we can use:
- AsyncStorage for student data
- Local file system for PDFs
- No authentication required

This allows you to test the app immediately without Appwrite setup.

---

## Migration Plan

Once Appwrite is set up:
1. Replace AsyncStorage calls with Appwrite Database calls
2. Replace local file storage with Appwrite Storage
3. Add authentication flow
4. Enable real-time sync

The app is designed to work with or without Appwrite initially!
