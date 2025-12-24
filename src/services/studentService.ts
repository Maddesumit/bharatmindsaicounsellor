import { ID } from 'appwrite';
import { databases, storage, config, isAppwriteConfigured } from './appwrite';
import { Student } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STUDENT_STORAGE_KEY = '@ai_counsellor_student';

/**
 * Save student data (Appwrite or local storage)
 */
export async function saveStudent(student: Student): Promise<string> {
    if (isAppwriteConfigured()) {
        // Save to Appwrite
        try {
            const document = await databases.createDocument(
                config.databaseId,
                config.studentsCollectionId,
                ID.unique(),
                {
                    name: student.name,
                    mobile: student.mobile,
                    email: student.email,
                    counsellingTypes: student.counsellingTypes,
                    ugcetCourses: student.ugcetCourses || [],
                    farmScienceCourses: student.farmScienceCourses || [],
                    ugneetCourses: JSON.stringify(student.ugneetCourses || []),
                    neetAIR: student.neetAIR || 0,
                    courseRanks: JSON.stringify(student.courseRanks),
                    baseCategory: student.baseCategory,
                    hasKannada: Boolean(student.hasKannada),
                    hasRural: Boolean(student.hasRural),
                    hasHK: Boolean(student.hasHK),
                    eligibleCategories: student.eligibleCategories,
                    specialCategories: student.specialCategories || [],
                    createdAt: new Date().toISOString()
                }
            );

            return document.$id;
        } catch (error) {
            console.error('Error saving to Appwrite:', error);
            throw error;
        }
    } else {
        // Save to local storage for MVP testing
        try {
            const studentWithId = {
                ...student,
                id: student.id || ID.unique()
            };
            await AsyncStorage.setItem(STUDENT_STORAGE_KEY, JSON.stringify(studentWithId));
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
                counsellingTypes: document.counsellingTypes,
                ugcetCourses: document.ugcetCourses,
                farmScienceCourses: document.farmScienceCourses,
                ugneetCourses: JSON.parse(document.ugneetCourses || '[]'),
                neetAIR: document.neetAIR,
                courseRanks: JSON.parse(document.courseRanks || '[]'),
                baseCategory: document.baseCategory,
                hasKannada: document.hasKannada,
                hasRural: document.hasRural,
                hasHK: document.hasHK,
                hasHK: document.hasHK,
                eligibleCategories: document.eligibleCategories,
                specialCategories: document.specialCategories || [],
                createdAt: document.createdAt
            };
        } catch (error) {
            console.error('Error getting from Appwrite:', error);
            return null;
        }
    } else {
        // Get from local storage
        try {
            const data = await AsyncStorage.getItem(STUDENT_STORAGE_KEY);
            return data ? JSON.parse(data) : null;
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
            const updateData: any = {};

            if (updates.name) updateData.name = updates.name;
            if (updates.mobile) updateData.mobile = updates.mobile;
            if (updates.email) updateData.email = updates.email;
            if (updates.counsellingTypes) updateData.counsellingTypes = updates.counsellingTypes;
            if (updates.ugcetCourses) updateData.ugcetCourses = updates.ugcetCourses;
            if (updates.farmScienceCourses) updateData.farmScienceCourses = updates.farmScienceCourses;
            if (updates.ugneetCourses) updateData.ugneetCourses = JSON.stringify(updates.ugneetCourses);
            if (updates.neetAIR) updateData.neetAIR = updates.neetAIR;
            if (updates.courseRanks) updateData.courseRanks = JSON.stringify(updates.courseRanks);
            if (updates.baseCategory) updateData.baseCategory = updates.baseCategory;
            if (updates.hasKannada !== undefined) updateData.hasKannada = updates.hasKannada;
            if (updates.hasRural !== undefined) updateData.hasRural = updates.hasRural;
            if (updates.hasHK !== undefined) updateData.hasHK = updates.hasHK;
            if (updates.eligibleCategories) updateData.eligibleCategories = updates.eligibleCategories;
            if (updates.specialCategories) updateData.specialCategories = updates.specialCategories;

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
            if (current) {
                const updated = { ...current, ...updates };
                await AsyncStorage.setItem(STUDENT_STORAGE_KEY, JSON.stringify(updated));
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
            await AsyncStorage.removeItem(STUDENT_STORAGE_KEY);
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
            await AsyncStorage.setItem(key, JSON.stringify({
                studentId,
                optionListData,
                generatedAt: new Date().toISOString(),
                pdfUrl
            }));
            return key;
        } catch (error) {
            console.error('Error saving option list to local storage:', error);
            throw error;
        }
    }
}
