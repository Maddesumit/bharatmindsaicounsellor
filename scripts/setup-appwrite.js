const { Client, Databases, Storage, ID, Permission, Role } = require('node-appwrite');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Initialize Appwrite client
const client = new Client();
client
    .setEndpoint(process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_PROJECT_ID || '')
    .setKey(process.env.APPWRITE_API_KEY || '');

const databases = new Databases(client);
const storage = new Storage(client);

async function setupAppwrite() {
    console.log('🚀 Starting Appwrite setup...\n');

    try {
        // Step 1: Create Database
        console.log('📊 Creating database...');
        const database = await databases.create(
            ID.unique(),
            'AI Counsellor DB'
        );
        const databaseId = database.$id;
        console.log(`✅ Database created: ${databaseId}\n`);

        // Step 2: Create Students Collection
        console.log('👥 Creating students collection...');
        const studentsCollection = await databases.createCollection(
            databaseId,
            ID.unique(),
            'students',
            [
                Permission.read(Role.users()),
                Permission.create(Role.users()),
                Permission.update(Role.users()),
                Permission.delete(Role.users())
            ]
        );
        const studentsCollectionId = studentsCollection.$id;
        console.log(`✅ Students collection created: ${studentsCollectionId}`);

        // Create attributes for students collection
        console.log('   Adding attributes to students collection...');

        await databases.createStringAttribute(databaseId, studentsCollectionId, 'name', 255, true);
        await databases.createStringAttribute(databaseId, studentsCollectionId, 'mobile', 15, true);
        await databases.createEmailAttribute(databaseId, studentsCollectionId, 'email', true);
        await databases.createIntegerAttribute(databaseId, studentsCollectionId, 'rank', true, 1, 300000);
        await databases.createStringAttribute(databaseId, studentsCollectionId, 'baseCategory', 10, true);
        await databases.createBooleanAttribute(databaseId, studentsCollectionId, 'hasKannada', false, false);
        await databases.createBooleanAttribute(databaseId, studentsCollectionId, 'hasRural', false, false);
        await databases.createBooleanAttribute(databaseId, studentsCollectionId, 'hasHK', false, false);
        await databases.createStringAttribute(databaseId, studentsCollectionId, 'eligibleCategories', 500, true, undefined, true);
        await databases.createStringAttribute(databaseId, studentsCollectionId, 'preferredCourses', 500, true, undefined, true);
        await databases.createStringAttribute(databaseId, studentsCollectionId, 'preferredLocations', 500, true, undefined, true);
        await databases.createStringAttribute(databaseId, studentsCollectionId, 'preferredCollegeType', 50, true);
        await databases.createStringAttribute(databaseId, studentsCollectionId, 'preferredBranches', 500, true, undefined, true);
        await databases.createDatetimeAttribute(databaseId, studentsCollectionId, 'createdAt', true);

        console.log('   ✅ All attributes added to students collection\n');

        // Create indexes for students collection
        console.log('   Creating indexes for students collection...');
        await databases.createIndex(databaseId, studentsCollectionId, 'rank_index', 'key', ['rank'], ['asc']);
        await databases.createIndex(databaseId, studentsCollectionId, 'email_index', 'unique', ['email'], ['asc']);
        await databases.createIndex(databaseId, studentsCollectionId, 'mobile_index', 'unique', ['mobile'], ['asc']);
        console.log('   ✅ Indexes created\n');

        // Step 3: Create Option Lists Collection
        console.log('📋 Creating option_lists collection...');
        const optionListsCollection = await databases.createCollection(
            databaseId,
            ID.unique(),
            'option_lists',
            [
                Permission.read(Role.users()),
                Permission.create(Role.users()),
                Permission.update(Role.users()),
                Permission.delete(Role.users())
            ]
        );
        const optionListsCollectionId = optionListsCollection.$id;
        console.log(`✅ Option lists collection created: ${optionListsCollectionId}`);

        // Create attributes for option_lists collection
        console.log('   Adding attributes to option_lists collection...');
        await databases.createStringAttribute(databaseId, optionListsCollectionId, 'studentId', 255, true);
        await databases.createStringAttribute(databaseId, optionListsCollectionId, 'optionListData', 1000000, true);
        await databases.createDatetimeAttribute(databaseId, optionListsCollectionId, 'generatedAt', true);
        await databases.createUrlAttribute(databaseId, optionListsCollectionId, 'pdfUrl', false);
        console.log('   ✅ All attributes added to option_lists collection\n');

        // Create indexes for option_lists collection
        console.log('   Creating indexes for option_lists collection...');
        await databases.createIndex(databaseId, optionListsCollectionId, 'student_index', 'key', ['studentId'], ['asc']);
        await databases.createIndex(databaseId, optionListsCollectionId, 'generated_index', 'key', ['generatedAt'], ['desc']);
        console.log('   ✅ Indexes created\n');

        // Step 4: Create Storage Bucket
        console.log('📁 Creating PDF storage bucket...');
        const bucket = await storage.createBucket(
            ID.unique(),
            'PDFs',
            [
                Permission.read(Role.users()),
                Permission.create(Role.users()),
                Permission.update(Role.users()),
                Permission.delete(Role.users())
            ],
            false, // fileSecurity
            true,  // enabled
            10485760, // maxFileSize (10MB)
            ['pdf'], // allowedFileExtensions
            'none', // compression
            true,  // encryption
            true   // antivirus
        );
        const bucketId = bucket.$id;
        console.log(`✅ PDF bucket created: ${bucketId}\n`);

        // Step 5: Update .env file
        console.log('📝 Updating .env file...');
        const envPath = path.join(__dirname, '..', '.env');
        let envContent = '';

        if (fs.existsSync(envPath)) {
            envContent = fs.readFileSync(envPath, 'utf8');
        } else {
            envContent = fs.readFileSync(path.join(__dirname, '..', '.env.example'), 'utf8');
        }

        // Update or add the IDs
        const updates = {
            'APPWRITE_DATABASE_ID': databaseId,
            'APPWRITE_STUDENTS_COLLECTION_ID': studentsCollectionId,
            'APPWRITE_OPTION_LISTS_COLLECTION_ID': optionListsCollectionId,
            'APPWRITE_PDF_BUCKET_ID': bucketId,
            'EXPO_PUBLIC_APPWRITE_DATABASE_ID': databaseId,
            'EXPO_PUBLIC_APPWRITE_STUDENTS_COLLECTION_ID': studentsCollectionId,
            'EXPO_PUBLIC_APPWRITE_OPTION_LISTS_COLLECTION_ID': optionListsCollectionId,
            'EXPO_PUBLIC_APPWRITE_PDF_BUCKET_ID': bucketId
        };

        for (const [key, value] of Object.entries(updates)) {
            const regex = new RegExp(`^${key}=.*$`, 'm');
            if (regex.test(envContent)) {
                envContent = envContent.replace(regex, `${key}=${value}`);
            } else {
                envContent += `\n${key}=${value}`;
            }
        }

        fs.writeFileSync(envPath, envContent);
        console.log('✅ .env file updated\n');

        // Step 6: Display summary
        console.log('🎉 Appwrite setup completed successfully!\n');
        console.log('📋 Summary:');
        console.log(`   Database ID: ${databaseId}`);
        console.log(`   Students Collection ID: ${studentsCollectionId}`);
        console.log(`   Option Lists Collection ID: ${optionListsCollectionId}`);
        console.log(`   PDF Bucket ID: ${bucketId}\n`);
        console.log('✅ Your .env file has been updated with these IDs.');
        console.log('🚀 You can now run your app with Appwrite integration!\n');

    } catch (error) {
        console.error('❌ Error during setup:', error.message);
        if (error.code) {
            console.error(`   Error code: ${error.code}`);
        }
        if (error.response) {
            console.error(`   Response: ${JSON.stringify(error.response, null, 2)}`);
        }
        process.exit(1);
    }
}

// Run setup
setupAppwrite();
