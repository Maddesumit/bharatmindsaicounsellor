import { account, isAppwriteConfigured } from './appwrite';
import { ID } from 'appwrite';

export interface AuthUser {
    $id: string;
    email: string;
    name: string;
}

/**
 * Create a new user account
 */
export async function signUp(email: string, password: string, name: string): Promise<AuthUser> {
    if (!isAppwriteConfigured()) {
        throw new Error('Appwrite is not configured');
    }

    try {
        const user = await account.create(
            ID.unique(),
            email,
            password,
            name
        );

        // Automatically log in after signup
        await account.createEmailPasswordSession(email, password);

        return user;
    } catch (error: any) {
        console.error('Signup error:', error);
        throw error;
    }
}

/**
 * Login with email and password
 */
export async function login(email: string, password: string): Promise<AuthUser> {
    if (!isAppwriteConfigured()) {
        throw new Error('Appwrite is not configured');
    }

    try {
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
