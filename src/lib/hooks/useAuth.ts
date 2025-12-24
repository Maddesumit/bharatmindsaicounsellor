import { useState, useEffect } from 'react';
import { getCurrentUser, login, logout, signUp } from '@/services/auth';
import type { AuthUser } from '@/types';

interface UseAuthReturn {
    user: AuthUser | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name: string, mobile?: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

/**
 * Custom hook for authentication
 * Manages user state and provides auth methods
 */
export const useAuth = (): UseAuthReturn => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Check for existing session on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            setLoading(true);
            const currentUser = await getCurrentUser();
            setUser(currentUser);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);
            const loggedInUser = await login(email, password);
            setUser(loggedInUser);
        } catch (err: any) {
            setError(err.message || 'Login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (
        email: string,
        password: string,
        name: string,
        mobile?: string
    ) => {
        try {
            setLoading(true);
            setError(null);
            const newUser = await signUp(email, password, name, mobile);
            setUser(newUser);
        } catch (err: any) {
            setError(err.message || 'Signup failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            setLoading(true);
            await logout();
            setUser(null);
        } catch (err: any) {
            setError(err.message || 'Logout failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const refreshUser = async () => {
        await checkAuth();
    };

    return {
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login: handleLogin,
        signup: handleSignup,
        logout: handleLogout,
        refreshUser,
    };
};
