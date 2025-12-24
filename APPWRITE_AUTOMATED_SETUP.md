# Automated Appwrite Setup Guide

## Quick Setup (Recommended)

Instead of manually creating collections in the Appwrite console, use our automated setup script!

### Step 1: Create Appwrite Project

1. Go to [Appwrite Cloud](https://cloud.appwrite.io/) (or your self-hosted instance)
2. Click **"Create Project"**
3. Name it: **"AI Counsellor MVP"**
4. Copy your **694160ab00190d61cdfe**

### Step 2: Generate API Key

1. In your Appwrite project, go to **Settings** → **API Keys**
2. Click **"Create API Key"**
3. Name it: **"Setup Script"**
4. Set expiration: **Never** (or 1 year)
5. **Scopes**: Select ALL scopes (or at minimum):
   - `databases.read`
   - `databases.write`
   - `collections.read`
   - `collections.write`
   - `attributes.read`
   - `attributes.write`
   - `indexes.read`
   - `indexes.write`
   - `buckets.read`
   - `buckets.write`
6. Click **"Create"**
7. **Copy the API Key** (you won't see it again!)


### Step 3: Configure Environment

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```env
   APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   APPWRITE_PROJECT_ID=your_project_id_here
   APPWRITE_API_KEY=your_api_key_here
   
   EXPO_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
   ```

### Step 4: Run Setup Script

```bash
npm run setup:appwrite
```

**That's it!** The script will automatically:
- ✅ Create database
- ✅ Create `students` collection with all attributes and indexes
- ✅ Create `option_lists` collection with all attributes and indexes
- ✅ Create `pdfs` storage bucket
- ✅ Update your `.env` file with all the IDs

### Step 5: Restart Your App

```bash
npm start
```

Your app will now use Appwrite for data storage!

---

## What the Script Creates

### Database
- **Name**: AI Counsellor DB
- **ID**: Auto-generated and saved to `.env`

### Collections

#### 1. `students` Collection
**Attributes:**
- `name` (string, required)
- `mobile` (string, required, unique)
- `email` (email, required, unique)
- `rank` (integer, required, 1-300000)
- `baseCategory` (string, required)
- `hasKannada` (boolean, default: false)
- `hasRural` (boolean, default: false)
- `hasHK` (boolean, default: false)
- `eligibleCategories` (string array, required)
- `preferredCourses` (string array, required)
- `preferredLocations` (string array, required)
- `preferredCollegeType` (string, required)
- `preferredBranches` (string array, required)
- `createdAt` (datetime, required)

**Indexes:**
- `rank_index` - For fast rank-based queries
- `email_index` - Unique email constraint
- `mobile_index` - Unique mobile constraint

**Permissions:**
- Users can create, read, update, and delete their own documents

#### 2. `option_lists` Collection
**Attributes:**
- `studentId` (string, required)
- `optionListData` (string, required, max 1MB)
- `generatedAt` (datetime, required)
- `pdfUrl` (url, optional)

**Indexes:**
- `student_index` - Link to student
- `generated_index` - Sort by generation time

**Permissions:**
- Users can create, read, update, and delete their own documents

### Storage Bucket

#### `pdfs` Bucket
- **Max file size**: 10 MB
- **Allowed extensions**: `.pdf`
- **Encryption**: Enabled
- **Antivirus**: Enabled
- **Permissions**: Users can upload, read, update, and delete their own files

---

## Troubleshooting

### Error: "Invalid API key"
- Make sure you copied the API key correctly
- Ensure the API key has all required scopes
- Check that the API key hasn't expired

### Error: "Project not found"
- Verify your Project ID is correct
- Make sure you're using the right endpoint (cloud vs self-hosted)

### Error: "Attribute already exists"
- The script has already been run
- Delete the database from Appwrite console and run again
- Or manually create collections following `APPWRITE_SETUP.md`

### Script hangs or times out
- Check your internet connection
- Verify Appwrite endpoint is accessible
- Try running the script again

---

## Manual Setup (Alternative)

If you prefer to create collections manually, follow the detailed instructions in `APPWRITE_SETUP.md`.

---

## Verify Setup

After running the script, check your Appwrite console:

1. Go to **Databases** → You should see "AI Counsellor DB"
2. Click on the database → You should see 2 collections:
   - `students`
   - `option_lists`
3. Go to **Storage** → You should see "PDFs" bucket

---

## Next Steps

1. **Test the app**: Run `npm start` and register a student
2. **Check Appwrite**: Go to your Appwrite console and verify data is being saved
3. **Generate option list**: Complete registration and see the colleges
4. **Export PDF**: Try the PDF export feature

---

## Security Notes

⚠️ **Important**:
- Never commit your `.env` file to Git
- The `.env` file is already in `.gitignore`
- Keep your API key secure
- For production, use separate API keys with limited scopes

---

## Support

If you encounter any issues:
1. Check the error message in terminal
2. Verify your Appwrite credentials
3. Check Appwrite console for any errors
4. Review the `APPWRITE_SETUP.md` for manual setup

Happy coding! 🚀
