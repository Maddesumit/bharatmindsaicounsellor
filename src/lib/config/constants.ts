/**
 * Application-wide constants
 */

export const APP_NAME = 'BharatMinds AI Counsellor';
export const APP_DESCRIPTION = 'AI-powered college counselling for UGCET and UGNEET students';

// Routes
export const ROUTES = {
    HOME: '/',
    AUTH: '/auth',
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    REGISTRATION: '/registration',
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/auth/login',
        SIGNUP: '/api/auth/signup',
        LOGOUT: '/api/auth/logout',
        ME: '/api/auth/me',
    },
    STUDENTS: {
        CREATE: '/api/students',
        GET: '/api/students/:id',
        UPDATE: '/api/students/:id',
        DELETE: '/api/students/:id',
    },
    COUNSELLING: {
        GENERATE: '/api/counselling/generate',
        OPTIONS: '/api/counselling/options',
    },
} as const;

// Counselling Constants
export const COURSES = {
    UGCET: 'UGCET',
    UGNEET: 'UGNEET',
    FARM_SCIENCE: 'Farm Science',
} as const;

export const CATEGORIES = {
    GENERAL: 'General',
    SC: 'SC',
    ST: 'ST',
    OBC: 'OBC',
    GM: 'GM',
    '2A': '2A',
    '2B': '2B',
    '3A': '3A',
    '3B': '3B',
} as const;

// Validation Constants
export const VALIDATION = {
    PASSWORD_MIN_LENGTH: 8,
    MOBILE_LENGTH: 10,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

// UI Constants
export const TOAST_DURATION = 3000;
export const DEBOUNCE_DELAY = 300;
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Feature Flags
export const FEATURES = {
    ENABLE_SOCIAL_LOGIN: false,
    ENABLE_PREMIUM_PLAN: false,
    ENABLE_ANALYTICS: true,
} as const;
