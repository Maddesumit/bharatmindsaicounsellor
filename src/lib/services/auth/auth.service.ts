import { account, isAppwriteConfigured } from '@/config/appwrite.config';
import { ID } from 'appwrite';
import { AuthUser } from '@/types';

/**
 * Create a new user account
 */
export async function signUp(email: string, password: string, name: string, phone?: string): Promise<AuthUser> {
    if (!isAppwriteConfigured()) {
        throw new Error('Appwrite is not configured');
    }

    try {
        // Check if there's an existing session and delete it
        try {
            await account.deleteSession('current');
        } catch (error) {
            // No existing session, continue
        }

        const user = await account.create(
            ID.unique(),
            email,
            password,
            name
        );

        // Automatically log in after signup
        await account.createEmailPasswordSession(email, password);

        // Update phone if provided
        if (phone) {
            try {
                await account.updatePhone(phone, password);
            } catch (phoneError) {
                console.error('Failed to update phone:', phoneError);
                // Don't fail the entire signup if phone update fails, but maybe log it
            }
        }

        return user;
    } catch (error: any) {
        console.error('Signup error:', error);
        throw error;
    }
}

/**
 * Update phone number
 */
export async function updatePhone(phone: string, password: string): Promise<void> {
    if (!isAppwriteConfigured()) return;
    await account.updatePhone(phone, password);
}

/**
 * Login with email and password
 */
export async function login(email: string, password: string): Promise<AuthUser> {
    if (!isAppwriteConfigured()) {
        throw new Error('Appwrite is not configured');
    }

    try {
        // Check if there's an existing session and delete it
        try {
            await account.deleteSession('current');
        } catch (error) {
            // No existing session, continue
        }

        await account.createEmailPasswordSession(email, password);
        const user = await account.get();
        return user;
    } catch (error: any) {
        console.error('Login error:', error);
        throw error;
    }
}

/**
 * Get current logged in user
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
    if (!isAppwriteConfigured()) {
        return null;
    }

    try {
        const user = await account.get();
        return user;
    } catch (error) {
        return null;
    }
}

/**
 * Logout current user
 */
export async function logout(): Promise<void> {
    if (!isAppwriteConfigured()) {
        return;
    }

    try {
        await account.deleteSession('current');
    } catch (error: any) {
        console.error('Logout error:', error);
        throw error;
    }
}

/**
 * Check if user is logged in
 */
export async function isLoggedIn(): Promise<boolean> {
    const user = await getCurrentUser();
    return user !== null;
}
