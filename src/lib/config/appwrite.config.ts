import { Client, Databases, Storage, Account } from 'appwrite';

const client = new Client();

// Configuration from environment variables
export const config = {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '',
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'main_db',
    studentsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_STUDENTS_COLLECTION_ID || 'students',
    optionListsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_OPTION_LISTS_COLLECTION_ID || 'option_lists',
    pdfBucketId: process.env.NEXT_PUBLIC_APPWRITE_PDF_BUCKET_ID || 'pdfs',
};

// Debug logging (only in development)
if (process.env.NODE_ENV === 'development') {
    console.log('🔧 Appwrite Config:', {
        endpoint: config.endpoint,
        projectId: config.projectId ? '✅ Set' : '❌ Missing',
        databaseId: config.databaseId,
        studentsCollectionId: config.studentsCollectionId
    });
}

// Initialize client
client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId);

// Initialize services
export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);

/**
 * Check if Appwrite is properly configured
 */
export function isAppwriteConfigured(): boolean {
    return !!(config.projectId && config.endpoint);
}
