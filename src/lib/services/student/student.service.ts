import { ID, Query } from 'appwrite';
import { databases, storage, config, isAppwriteConfigured } from '@/config/appwrite.config';
import { Student } from '@/types';

const STUDENT_STORAGE_KEY = '@ai_counsellor_student';

/**
 * Save student data (Appwrite or local storage)
 */
export async function saveStudent(student: Student): Promise<string> {
    const isConfigured = isAppwriteConfigured();
    console.log('💾 Saving student...', {
        isAppwriteConfigured: isConfigured,
        studentName: student.name,
        studentEmail: student.email
    });

    if (isConfigured) {
        // Save to Appwrite with optimized schema (19 separate columns using TEXT type)
        try {
            const document = await databases.createDocument(
                config.databaseId,
                config.studentsCollectionId,
                ID.unique(),
                {
                    // Basic Info
                    name: student.name,
                    mobile: student.mobile,
                    email: student.email,

                    // Counselling & Courses (TEXT fields - stored as JSON strings)
                    counsellingTypes: JSON.stringify(student.counsellingTypes),
                    ugcetCourses: JSON.stringify(student.ugcetCourses || []),
                    farmScienceCourses: JSON.stringify(student.farmScienceCourses || []),
                    ugneetCourses: JSON.stringify(student.ugneetCourses || []),
                    ugneetSpecialCategories: JSON.stringify(student.ugneetSpecialCategories || []),

                    // Ranks
                    neetAIR: student.neetAIR || 0,
                    courseRanks: JSON.stringify(student.courseRanks || []),

                    // Category Information
                    baseCategory: student.baseCategory,
                    hasKannada: Boolean(student.hasKannada),
                    hasRural: Boolean(student.hasRural),
                    hasHK: Boolean(student.hasHK),

                    // SNQ Quota
                    snqApplied: Boolean(student.snqApplied),
                    incomeSlab: student.incomeSlab || '',

                    // Categories (TEXT fields - stored as JSON strings)
                    eligibleCategories: JSON.stringify(student.eligibleCategories || []),
                    specialCategories: JSON.stringify(student.specialCategories || []),

                    // Metadata
                    createdAt: new Date().toISOString()
                }
            );

            console.log('✅ Student saved to Appwrite successfully! Document ID:', document.$id);
            return document.$id;
        } catch (error) {
            console.error('Error saving to Appwrite:', error);
            throw error;
        }
    } else {
        // Save to local storage for MVP testing
        console.log('⚠️ Appwrite not configured, saving to local storage');
        try {
            const studentWithId = {
                ...student,
                id: student.id || ID.unique()
            };
            if (typeof window !== 'undefined') {
                localStorage.setItem(STUDENT_STORAGE_KEY, JSON.stringify(studentWithId));
            }
            return studentWithId.id;
        } catch (error) {
            console.error('Error saving to local storage:', error);
            throw error;
        }
    }
}

/**
 * Get student data
 */
export async function getStudent(studentId?: string): Promise<Student | null> {
    if (isAppwriteConfigured() && studentId) {
        // Get from Appwrite
        try {
            const document = await databases.getDocument(
                config.databaseId,
                config.studentsCollectionId,
                studentId
            );

            return {
                id: document.$id,
                name: document.name,
                mobile: document.mobile,
                email: document.email,
                counsellingTypes: JSON.parse(document.counsellingTypes || '[]'),
                ugcetCourses: JSON.parse(document.ugcetCourses || '[]'),
                farmScienceCourses: JSON.parse(document.farmScienceCourses || '[]'),
                ugneetCourses: JSON.parse(document.ugneetCourses || '[]'),
                ugneetSpecialCategories: JSON.parse(document.ugneetSpecialCategories || '[]'),
                neetAIR: document.neetAIR,
                courseRanks: JSON.parse(document.courseRanks || '[]'),
                baseCategory: document.baseCategory,
                hasKannada: document.hasKannada,
                hasRural: document.hasRural,
                hasHK: document.hasHK,
                snqApplied: document.snqApplied,
                incomeSlab: document.incomeSlab,
                eligibleCategories: JSON.parse(document.eligibleCategories || '[]'),
                specialCategories: JSON.parse(document.specialCategories || '[]'),
                createdAt: document.createdAt
            };
        } catch (error) {
            console.error('Error getting from Appwrite:', error);
            return null;
        }
    } else {
        // Get from local storage
        try {
            if (typeof window !== 'undefined') {
                const data = localStorage.getItem(STUDENT_STORAGE_KEY);
                return data ? JSON.parse(data) : null;
            }
            return null;
        } catch (error) {
            console.error('Error getting from local storage:', error);
            return null;
        }
    }
}

/**
 * Update student data
 */
export async function updateStudent(studentId: string, updates: Partial<Student>): Promise<void> {
    if (isAppwriteConfigured()) {
        // Update in Appwrite
        try {
            // First get current data
            const current = await getStudent(studentId);
            if (!current) {
                throw new Error('Student not found');
            }

            // Merge updates
            const merged = { ...current, ...updates };

            // Prepare update data
            const updateData: any = {
                name: merged.name,
                mobile: merged.mobile,
                email: merged.email,
                counsellingTypes: JSON.stringify(merged.counsellingTypes),
                ugcetCourses: JSON.stringify(merged.ugcetCourses || []),
                farmScienceCourses: JSON.stringify(merged.farmScienceCourses || []),
                ugneetCourses: JSON.stringify(merged.ugneetCourses || []),
                ugneetSpecialCategories: JSON.stringify(merged.ugneetSpecialCategories || []),
                neetAIR: merged.neetAIR || 0,
                courseRanks: JSON.stringify(merged.courseRanks || []),
                baseCategory: merged.baseCategory,
                hasKannada: Boolean(merged.hasKannada),
                hasRural: Boolean(merged.hasRural),
                hasHK: Boolean(merged.hasHK),
                snqApplied: Boolean(merged.snqApplied),
                incomeSlab: merged.incomeSlab || '',
                eligibleCategories: JSON.stringify(merged.eligibleCategories || []),
                specialCategories: JSON.stringify(merged.specialCategories || [])
            };

            // Update document
            await databases.updateDocument(
                config.databaseId,
                config.studentsCollectionId,
                studentId,
                updateData
            );
        } catch (error) {
            console.error('Error updating in Appwrite:', error);
            throw error;
        }
    } else {
        // Update in local storage
        try {
            const current = await getStudent();
            if (current && typeof window !== 'undefined') {
                const updated = { ...current, ...updates };
                localStorage.setItem(STUDENT_STORAGE_KEY, JSON.stringify(updated));
            }
        } catch (error) {
            console.error('Error updating in local storage:', error);
            throw error;
        }
    }
}

/**
 * Delete student data
 */
export async function deleteStudent(studentId: string): Promise<void> {
    if (isAppwriteConfigured()) {
        // Delete from Appwrite
        try {
            await databases.deleteDocument(
                config.databaseId,
                config.studentsCollectionId,
                studentId
            );
        } catch (error) {
            console.error('Error deleting from Appwrite:', error);
            throw error;
        }
    } else {
        // Delete from local storage
        try {
            if (typeof window !== 'undefined') {
                localStorage.removeItem(STUDENT_STORAGE_KEY);
            }
        } catch (error) {
            console.error('Error deleting from local storage:', error);
            throw error;
        }
    }
}

/**
 * Save option list
 */
export async function saveOptionList(studentId: string, optionListData: any, pdfUrl?: string): Promise<string> {
    if (isAppwriteConfigured()) {
        try {
            const document = await databases.createDocument(
                config.databaseId,
                config.optionListsCollectionId,
                ID.unique(),
                {
                    studentId,
                    optionListData: JSON.stringify(optionListData),
                    generatedAt: new Date().toISOString(),
                    pdfUrl: pdfUrl || ''
                }
            );

            return document.$id;
        } catch (error) {
            console.error('Error saving option list:', error);
            throw error;
        }
    } else {
        // Save to local storage
        const key = `@option_list_${studentId}`;
        try {
            if (typeof window !== 'undefined') {
                localStorage.setItem(key, JSON.stringify({
                    studentId,
                    optionListData,
                    generatedAt: new Date().toISOString(),
                    pdfUrl
                }));
            }
            return key;
        } catch (error) {
            console.error('Error saving option list to local storage:', error);
            throw error;
        }
    }
}

/**
 * Get student by email
 */
export async function getStudentByEmail(email: string): Promise<Student | null> {
    if (isAppwriteConfigured()) {
        try {
            // Try query first
            const response = await databases.listDocuments(
                config.databaseId,
                config.studentsCollectionId,
                [Query.equal('email', email)]
            );

            if (response.documents.length > 0) {
                const document = response.documents[0];

                return {
                    id: document.$id,
                    name: document.name,
                    mobile: document.mobile,
                    email: document.email,
                    counsellingTypes: JSON.parse(document.counsellingTypes || '[]'),
                    ugcetCourses: JSON.parse(document.ugcetCourses || '[]'),
                    farmScienceCourses: JSON.parse(document.farmScienceCourses || '[]'),
                    ugneetCourses: JSON.parse(document.ugneetCourses || '[]'),
                    ugneetSpecialCategories: JSON.parse(document.ugneetSpecialCategories || '[]'),
                    neetAIR: document.neetAIR,
                    courseRanks: JSON.parse(document.courseRanks || '[]'),
                    baseCategory: document.baseCategory,
                    hasKannada: document.hasKannada,
                    hasRural: document.hasRural,
                    hasHK: document.hasHK,
                    snqApplied: document.snqApplied,
                    incomeSlab: document.incomeSlab,
                    eligibleCategories: JSON.parse(document.eligibleCategories || '[]'),
                    specialCategories: JSON.parse(document.specialCategories || '[]'),
                    createdAt: document.createdAt
                };
            }
        } catch (error) {
            console.error('Error getting student by email (query):', error);

            // Fallback: List documents and filter client-side
            try {
                const response = await databases.listDocuments(
                    config.databaseId,
                    config.studentsCollectionId
                );

                const match = response.documents.find(doc => doc.email === email);
                if (match) {
                    return {
                        id: match.$id,
                        name: match.name,
                        mobile: match.mobile,
                        email: match.email,
                        counsellingTypes: JSON.parse(match.counsellingTypes || '[]'),
                        ugcetCourses: JSON.parse(match.ugcetCourses || '[]'),
                        farmScienceCourses: JSON.parse(match.farmScienceCourses || '[]'),
                        ugneetCourses: JSON.parse(match.ugneetCourses || '[]'),
                        ugneetSpecialCategories: JSON.parse(match.ugneetSpecialCategories || '[]'),
                        neetAIR: match.neetAIR,
                        courseRanks: JSON.parse(match.courseRanks || '[]'),
                        baseCategory: match.baseCategory,
                        hasKannada: match.hasKannada,
                        hasRural: match.hasRural,
                        hasHK: match.hasHK,
                        snqApplied: match.snqApplied,
                        incomeSlab: match.incomeSlab,
                        eligibleCategories: JSON.parse(match.eligibleCategories || '[]'),
                        specialCategories: JSON.parse(match.specialCategories || '[]'),
                        createdAt: match.createdAt
                    };
                }
            } catch (fallbackError) {
                console.error('Error getting student by email (fallback):', fallbackError);
            }
        }
    }
    return null;
}
