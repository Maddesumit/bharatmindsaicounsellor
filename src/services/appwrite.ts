import { Client, Databases, Storage, Account } from 'appwrite';

const client = new Client();

// Configuration from environment variables
export const config = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || '',
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || 'main_db',
    studentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_STUDENTS_COLLECTION_ID || 'students',
    optionListsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_OPTION_LISTS_COLLECTION_ID || 'option_lists',
    pdfBucketId: process.env.EXPO_PUBLIC_APPWRITE_PDF_BUCKET_ID || 'pdfs',
};

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
