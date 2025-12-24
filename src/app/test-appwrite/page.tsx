'use client';

import { useEffect, useState } from 'react';
import { isAppwriteConfigured } from '@/lib/appwrite';
import { CheckCircle, XCircle, Loader2, AlertTriangle } from 'lucide-react';

export default function AppwriteTestPage() {
    const [status, setStatus] = useState<{
        configured: boolean;
        endpoint: string;
        projectId: string;
        databaseId: string;
        studentsCollectionId: string;
        optionListsCollectionId: string;
        pdfBucketId: string;
    } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkConfig = () => {
            const configured = isAppwriteConfigured();

            setStatus({
                configured,
                endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'NOT SET',
                projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'NOT SET',
                databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'NOT SET',
                studentsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_STUDENTS_COLLECTION_ID || 'NOT SET',
                optionListsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_OPTION_LISTS_COLLECTION_ID || 'NOT SET',
                pdfBucketId: process.env.NEXT_PUBLIC_APPWRITE_PDF_BUCKET_ID || 'NOT SET',
            });
            setLoading(false);
        };

        checkConfig();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8">Appwrite Configuration Test</h1>

                {/* Overall Status */}
                <div className={`p-6 rounded-2xl mb-6 ${status?.configured
                        ? 'bg-green-500 bg-opacity-10 border-2 border-green-500'
                        : 'bg-red-500 bg-opacity-10 border-2 border-red-500'
                    }`}>
                    <div className="flex items-center gap-3">
                        {status?.configured ? (
                            <>
                                <CheckCircle className="w-8 h-8 text-green-500" />
                                <div>
                                    <h2 className="text-xl font-bold text-green-400">Appwrite is Configured ✓</h2>
                                    <p className="text-green-300 text-sm">All environment variables are set</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <XCircle className="w-8 h-8 text-red-500" />
                                <div>
                                    <h2 className="text-xl font-bold text-red-400">Appwrite is NOT Configured ✗</h2>
                                    <p className="text-red-300 text-sm">Some environment variables are missing</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Environment Variables */}
                <div className="bg-white bg-opacity-5 rounded-2xl p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-4">Environment Variables</h3>
                    <div className="space-y-3">
                        {[
                            { label: 'Endpoint', value: status?.endpoint },
                            { label: 'Project ID', value: status?.projectId },
                            { label: 'Database ID', value: status?.databaseId },
                            { label: 'Students Collection ID', value: status?.studentsCollectionId },
                            { label: 'Option Lists Collection ID', value: status?.optionListsCollectionId },
                            { label: 'PDF Bucket ID', value: status?.pdfBucketId },
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                                <span className="text-gray-300 font-medium">{item.label}:</span>
                                <div className="flex items-center gap-2">
                                    {item.value === 'NOT SET' ? (
                                        <>
                                            <XCircle className="w-4 h-4 text-red-500" />
                                            <span className="text-red-400 font-mono text-sm">{item.value}</span>
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            <span className="text-green-400 font-mono text-sm">
                                                {item.value.substring(0, 20)}...
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Instructions */}
                {!status?.configured && (
                    <div className="mt-6 bg-yellow-500 bg-opacity-10 border-2 border-yellow-500 rounded-2xl p-6">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-lg font-bold text-yellow-400 mb-2">Action Required</h3>
                                <ol className="text-yellow-300 text-sm space-y-2 list-decimal list-inside">
                                    <li>Check your <code className="bg-black bg-opacity-30 px-2 py-1 rounded">.env.local</code> file</li>
                                    <li>Make sure all variables start with <code className="bg-black bg-opacity-30 px-2 py-1 rounded">NEXT_PUBLIC_</code></li>
                                    <li>Restart the development server: <code className="bg-black bg-opacity-30 px-2 py-1 rounded">npm run dev</code></li>
                                    <li>Refresh this page</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                )}

                {/* Next Steps */}
                {status?.configured && (
                    <div className="mt-6 bg-blue-500 bg-opacity-10 border-2 border-blue-500 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-blue-400 mb-3">Next Steps</h3>
                        <ul className="text-blue-300 text-sm space-y-2">
                            <li>✓ Configuration looks good!</li>
                            <li>→ Go to <a href="/auth" className="underline hover:text-blue-200">/auth</a> to test authentication</li>
                            <li>→ Try creating a new account</li>
                            <li>→ Check your Appwrite Console to verify user creation</li>
                        </ul>
                    </div>
                )}

                {/* Back Button */}
                <div className="mt-6">
                    <a
                        href="/"
                        className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-xl text-white font-semibold hover:shadow-lg transition-all"
                    >
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
}
