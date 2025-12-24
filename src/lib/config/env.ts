/**
 * Environment variables configuration
 * Validates and exports environment variables with type safety
 */

const getEnvVar = (key: string, defaultValue?: string): string => {
    const value = process.env[key] || defaultValue;
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
};

export const env = {
    // Appwrite Configuration
    appwrite: {
        endpoint: getEnvVar('NEXT_PUBLIC_APPWRITE_ENDPOINT', 'https://cloud.appwrite.io/v1'),
        projectId: getEnvVar('NEXT_PUBLIC_APPWRITE_PROJECT_ID'),
        databaseId: getEnvVar('NEXT_PUBLIC_APPWRITE_DATABASE_ID', 'main_db'),
        studentsCollectionId: getEnvVar('NEXT_PUBLIC_APPWRITE_STUDENTS_COLLECTION_ID', 'students'),
        optionListsCollectionId: getEnvVar(
            'NEXT_PUBLIC_APPWRITE_OPTION_LISTS_COLLECTION_ID',
            'option_lists'
        ),
        pdfBucketId: getEnvVar('NEXT_PUBLIC_APPWRITE_PDF_BUCKET_ID', 'pdfs'),
    },

    // Application Configuration
    app: {
        env: process.env.NODE_ENV || 'development',
        isDevelopment: process.env.NODE_ENV === 'development',
        isProduction: process.env.NODE_ENV === 'production',
        url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    },
} as const;

// Validate configuration on import
if (env.app.isDevelopment) {
    console.log('🔧 Environment Configuration:', {
        environment: env.app.env,
        appwriteEndpoint: env.appwrite.endpoint,
        projectId: env.appwrite.projectId ? '✅ Set' : '❌ Missing',
    });
}
