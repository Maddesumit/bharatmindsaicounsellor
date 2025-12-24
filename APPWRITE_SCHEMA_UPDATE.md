# Appwrite Database Schema Update Guide

## Overview
This document outlines the required changes to the Appwrite database schema to support the new flow redesign.

## Students Collection Schema Changes

### Fields to Add

1. **counsellingTypes** (Array of Strings)
   - Type: `string[]`
   - Required: Yes
   - Array: Yes
   - Description: Types of counselling the student is interested in (UGCET, UGNEET, or both)

2. **ugcetCourses** (Array of Strings)
   - Type: `string[]`
   - Required: No
   - Array: Yes
   - Description: UGCET courses selected by the student

3. **farmScienceCourses** (Array of Strings)
   - Type: `string[]`
   - Required: No
   - Array: Yes
   - Description: Farm Science courses selected (if Farm Science was chosen in UGCET)

4. **ugneetCourses** (String - JSON)
   - Type: `string`
   - Required: No
   - Description: JSON string containing UGNEET courses with seat types
   - Format: `[{"course": "MBBS", "seatTypes": ["G", "P"]}]`

5. **neetAIR** (Number)
   - Type: `integer`
   - Required: No
   - Description: NEET All India Rank

6. **courseRanks** (String - JSON)
   - Type: `string`
   - Required: Yes
   - Description: JSON string containing course-specific ranks
   - Format: `[{"courseCode": "ENGG", "courseName": "Engineering", "rank": 5000, "practicalRank": 1200}]`

### Fields to Remove

1. **rank** (Number) - Replaced by courseRanks array
2. **preferredCourses** (Array) - Replaced by ugcetCourses/ugneetCourses
3. **preferredLocations** (Array) - Removed (not needed in new flow)
4. **preferredCollegeType** (String) - Removed (not needed in new flow)
5. **preferredBranches** (Array) - Removed (not needed in new flow)

### Fields to Keep (No Changes)

- **name** (String)
- **mobile** (String)
- **email** (String)
- **baseCategory** (String)
- **hasKannada** (Boolean)
- **hasRural** (Boolean)
- **hasHK** (Boolean)
- **eligibleCategories** (Array of Strings)
- **createdAt** (String/DateTime)

## Step-by-Step Update Instructions

### Option 1: Using Appwrite Console (Recommended)

1. **Login to Appwrite Console**
   - Navigate to your Appwrite instance
   - Go to Databases → Your Database → students collection

2. **Add New Attributes**
   - Click "Add Attribute"
   - Add each new field listed above with the specified type and settings
   - For array fields, enable "Array" option
   - For optional fields, uncheck "Required"

3. **Update Existing Documents** (If you have existing data)
   - Before removing old fields, export existing data
   - Create a migration script to transform old data to new format
   - Import transformed data

4. **Remove Old Attributes**
   - Once data is migrated, delete the old attributes
   - **Warning**: This is irreversible!

### Option 2: Using Appwrite CLI

```bash
# Install Appwrite CLI if not already installed
npm install -g appwrite-cli

# Login to your Appwrite instance
appwrite login

# Add new attributes
appwrite databases createStringAttribute \\
  --databaseId [YOUR_DATABASE_ID] \\
  --collectionId [YOUR_COLLECTION_ID] \\
  --key counsellingTypes \\
  --size 255 \\
  --required true \\
  --array true

appwrite databases createStringAttribute \\
  --databaseId [YOUR_DATABASE_ID] \\
  --collectionId [YOUR_COLLECTION_ID] \\
  --key ugcetCourses \\
  --size 255 \\
  --array true

appwrite databases createStringAttribute \\
  --databaseId [YOUR_DATABASE_ID] \\
  --collectionId [YOUR_COLLECTION_ID] \\
  --key farmScienceCourses \\
  --size 255 \\
  --array true

appwrite databases createStringAttribute \\
  --databaseId [YOUR_DATABASE_ID] \\
  --collectionId [YOUR_COLLECTION_ID] \\
  --key ugneetCourses \\
  --size 5000

appwrite databases createIntegerAttribute \\
  --databaseId [YOUR_DATABASE_ID] \\
  --collectionId [YOUR_COLLECTION_ID] \\
  --key neetAIR

appwrite databases createStringAttribute \\
  --databaseId [YOUR_DATABASE_ID] \\
  --collectionId [YOUR_COLLECTION_ID] \\
  --key courseRanks \\
  --size 10000 \\
  --required true

# Delete old attributes (after migration)
appwrite databases deleteAttribute \\
  --databaseId [YOUR_DATABASE_ID] \\
  --collectionId [YOUR_COLLECTION_ID] \\
  --key rank

# Repeat for other old attributes
```

## Data Migration Script

If you have existing student data, use this migration script:

```typescript
import { databases } from './src/services/appwrite';

async function migrateStudentData() {
  // Get all existing students
  const response = await databases.listDocuments(
    'YOUR_DATABASE_ID',
    'YOUR_COLLECTION_ID'
  );

  for (const student of response.documents) {
    // Transform old data to new format
    const updates = {
      counsellingTypes: ['UGCET'], // Default to UGCET
      ugcetCourses: student.preferredCourses || [],
      farmScienceCourses: [],
      ugneetCourses: JSON.stringify([]),
      neetAIR: 0,
      courseRanks: JSON.stringify([
        {
          courseCode: 'ENGG',
          courseName: 'Engineering',
          rank: student.rank || 0
        }
      ])
    };

    // Update document
    await databases.updateDocument(
      'YOUR_DATABASE_ID',
      'YOUR_COLLECTION_ID',
      student.$id,
      updates
    );
  }

  console.log('Migration complete!');
}

// Run migration
migrateStudentData();
```

## Testing the Schema

After updating the schema, test with a sample student:

```typescript
const testStudent = {
  name: "Test Student",
  mobile: "9876543210",
  email: "test@example.com",
  counsellingTypes: ["UGCET", "UGNEET"],
  ugcetCourses: ["Engineering and Technology"],
  farmScienceCourses: [],
  ugneetCourses: JSON.stringify([
    { course: "MBBS", seatTypes: ["G", "P"] }
  ]),
  neetAIR: 15000,
  courseRanks: JSON.stringify([
    { courseCode: "ENGG", courseName: "Engineering and Technology", rank: 5000 }
  ]),
  baseCategory: "2AG",
  hasKannada: true,
  hasRural: false,
  hasHK: false,
  eligibleCategories: ["2AG", "2AK", "GM", "GMK"],
  createdAt: new Date().toISOString()
};
```

## Rollback Plan

If you need to rollback:

1. Keep a backup of your database before making changes
2. Use Appwrite's backup/restore feature
3. Or manually recreate old attributes and restore data from backup

## Notes

- **JSON Fields**: `ugneetCourses` and `courseRanks` are stored as JSON strings because Appwrite doesn't support complex nested objects
- **Array Size**: Ensure string array fields have sufficient size (255 characters recommended)
- **Required Fields**: Only `counsellingTypes` and `courseRanks` are required; others are optional based on user's selections
