import { BaseCategory, CategoryVariant } from '../types';

// ============================================================================
// CATEGORY DEFINITIONS
// ============================================================================

export const BASE_CATEGORIES: { code: BaseCategory; label: string }[] = [
    { code: '1G', label: 'Category - 1 - General' },
    { code: '2AG', label: 'Category - 2A - General' },
    { code: '2BG', label: 'Category - 2B - General' },
    { code: '3AG', label: 'Category - 3A - General' },
    { code: '3BG', label: 'Category - 3B - General' },
    { code: 'SCG', label: 'Scheduled Caste General' },
    { code: 'STG', label: 'Scheduled Tribe - General' },
    { code: 'GM', label: 'General Merit' },
];

export const SPECIAL_CATEGORIES_LIST: { code: string; label: string }[] = [
    { code: 'AGL', label: 'Anglo Indian' },
    { code: 'CAP', label: 'Central Armed Forces' },
    { code: 'DEF', label: 'Defence' },
    { code: 'JK', label: 'Jammu Kashmir Migrants' },
    { code: 'NCC', label: 'National Cadet Corps' },
    { code: 'PH', label: 'Physically Handicapped' },
    { code: 'S-G', label: 'Scouts and guides' },
    { code: 'SPO', label: 'Sports' },
    { code: 'XD', label: 'Ex-Defence' },
];

export const UGNEET_SPECIAL_CATEGORIES_LIST: { code: string; label: string }[] = [
    { code: 'GMP', label: 'General Merit Private Quota' },
    { code: 'GMPH', label: 'General Merit Private Hyderabad' },
    { code: 'MA', label: 'Minority Linguistic Tamil' },
    { code: 'MC', label: 'Minority Christian' },
    { code: 'ME', label: 'Minority Linguistic Telugu' },
    { code: 'MEH', label: 'Minority Linguistic Telugu Hyderabad' },
    { code: 'MM', label: 'Muslim Minority' },
    { code: 'MMH', label: 'Muslim Minority Hyderabad' },
    { code: 'MU', label: 'Muslim Category' },
    { code: 'RC1', label: 'Roman Catholic Category 1' },
    { code: 'RC2', label: 'Roman Catholic Category 2' },
    { code: 'RC3', label: 'Roman Catholic Category 3' },
    { code: 'RC4', label: 'Roman Catholic Category 4' },
    { code: 'RC5', label: 'Roman Catholic Category 5' },
    { code: 'RC6', label: 'Roman Catholic Category 6' },
    { code: 'RC7', label: 'Roman Catholic Category 7' },
    { code: 'RC8', label: 'Roman Catholic Category 8' },
];

// Category name mapping
const CATEGORY_NAMES: Record<string, string> = {
    // Category 1
    '1G': 'Category - 1 - General',
    '1R': 'Category - 1 - Rural',
    '1K': 'Category - 1 - Kannada',
    '1H': 'Category - 1 - Hyderabad Karnataka',
    '1RH': 'Category - 1 - Rural Hyderabad Karnataka',
    '1KH': 'Category - 1 - Kannada Hyderabad Karnataka',

    // Category 2A
    '2AG': 'Category - 2A - General',
    '2AR': 'Category - 2A - Rural',
    '2AK': 'Category - 2A - Kannada',
    '2AH': 'Category - 2A - Hyderabad Karnataka',
    '2ARH': 'Category - 2A - Rural Hyderabad Karnataka',
    '2AKH': 'Category - 2A - Kannada Hyderabad Karnataka',

    // Category 2B
    '2BG': 'Category - 2B - General',
    '2BR': 'Category - 2B - Rural',
    '2BK': 'Category - 2B - Kannada',
    '2BH': 'Category - 2B - Hyderabad Karnataka',
    '2BRH': 'Category - 2B - Rural Hyderabad Karnataka',
    '2BKH': 'Category - 2B - Kannada Hyderabad Karnataka',

    // Category 3A
    '3AG': 'Category - 3A - General',
    '3AR': 'Category - 3A - Rural',
    '3AK': 'Category - 3A - Kannada',
    '3AH': 'Category - 3A - Hyderabad Karnataka',
    '3ARH': 'Category - 3A - Rural Hyderabad Karnataka',
    '3AKH': 'Category - 3A - Kannada Hyderabad Karnataka',

    // Category 3B
    '3BG': 'Category - 3B - General',
    '3BR': 'Category - 3B - Rural',
    '3BK': 'Category - 3B - Kannada',
    '3BH': 'Category - 3B - Hyderabad Karnataka',
    '3BRH': 'Category - 3B - Rural Hyderabad Karnataka',
    '3BKH': 'Category - 3B - Kannada Hyderabad Karnataka',

    // SC
    'SCG': 'Scheduled Caste General',
    'SCR': 'Scheduled Caste Rural',
    'SCK': 'Scheduled Caste Kannada',
    'SCH': 'Scheduled Caste - Hyderabad Karnataka',
    'SCRH': 'Scheduled Caste Rural Hyderabad Karnataka',
    'SCKH': 'Scheduled Caste Kannada Hyderabad Karnataka',

    // ST
    'STG': 'Scheduled Tribe - General',
    'STR': 'Scheduled Tribe Rural',
    'STK': 'Scheduled Tribe Kannada',
    'STH': 'Scheduled Tribe - Hyderabad Karnataka',
    'STRH': 'Scheduled Tribe Rural Hyderabad Karnataka',
    'STKH': 'Scheduled Tribe Kannada Hyderabad Karnataka',

    // GM
    'GM': 'General Merit',
    'GMR': 'General Merit Rural',
    'GMK': 'General Merit Kannada',
    'GMH': 'General Merit Hyderabad Karnataka',
    'GMRH': 'General Merit Rural Hyderabad Karnataka',
    'GMKH': 'General Merit Kannada Hyderabad Karnataka',

    // Special Categories
    'AGL': 'Anglo Indian',
    'CAP': 'Central Armed Forces',
    'DEF': 'Defence',
    'JK': 'Jammu Kashmir Migrants',
    'NCC': 'National Cadet Corps',
    'PH': 'Physically Handicapped',
    'S-G': 'Scouts and guides',
    'SPO': 'Sports',
    'XD': 'Ex-Defence',
};

// ============================================================================
// CATEGORY LOGIC FUNCTIONS
// ============================================================================

/**
 * Get available reservation options for a base category
 */
export function getCategoryReservations(baseCategory: BaseCategory): string[] {
    const reservations: string[] = [];

    // All categories can have Kannada and Rural reservations
    if (baseCategory !== 'GM') {
        reservations.push('Kannada (K)', 'Rural (R)');
    }

    return reservations;
}

/**
 * Calculate all eligible categories based on selections
 */
export function calculateEligibleCategories(
    baseCategory: BaseCategory,
    hasKannada: boolean,
    hasRural: boolean,
    hasHK: boolean,
    specialCategories: string[] = []
): CategoryVariant[] {
    const categories: CategoryVariant[] = [];

    // Extract base prefix (e.g., '1', '2A', '2B', '3A', '3B', 'SC', 'ST', 'GM')
    const prefix = baseCategory.replace('G', '');

    // Add base category
    categories.push(baseCategory);

    // Add Kannada variant
    if (hasKannada && baseCategory !== 'GM') {
        categories.push(`${prefix}K` as CategoryVariant);
    }

    // Add Rural variant
    if (hasRural && baseCategory !== 'GM') {
        categories.push(`${prefix}R` as CategoryVariant);
    }

    // Add HK variants
    if (hasHK) {
        categories.push(`${prefix}H` as CategoryVariant);

        if (hasKannada && baseCategory !== 'GM') {
            categories.push(`${prefix}KH` as CategoryVariant);
        }

        if (hasRural && baseCategory !== 'GM') {
            categories.push(`${prefix}RH` as CategoryVariant);
        }
    }

    // ALWAYS add GM categories (seat allotment starts from GM)
    if (baseCategory !== 'GM') {
        categories.push('GM');

        if (hasKannada) {
            categories.push('GMK');
        }

        if (hasRural) {
            categories.push('GMR');
        }

        if (hasHK) {
            categories.push('GMH');

            if (hasKannada) {
                categories.push('GMKH');
            }

            if (hasRural) {
                categories.push('GMRH');
            }
        }
    } else {
        // If base category is GM, add its variants
        if (hasKannada) {
            categories.push('GMK');
        }

        if (hasRural) {
            categories.push('GMR');
        }

        if (hasHK) {
            categories.push('GMH');

            if (hasKannada) {
                categories.push('GMKH');
            }

            if (hasRural) {
                categories.push('GMRH');
            }
        }
    }

    // Add Special Categories
    specialCategories.forEach(cat => {
        categories.push(cat as CategoryVariant);
    });

    return categories;
}

/**
 * Format categories for display
 */
export function formatCategoryDisplay(categories: CategoryVariant[]): string {
    return categories
        .map(code => `${code} - ${CATEGORY_NAMES[code] || code}`)
        .join('\n');
}

/**
 * Get category name by code
 */
export function getCategoryName(code: string): string {
    return CATEGORY_NAMES[code] || code;
}

/**
 * Validate if a category code is valid
 */
export function isValidCategory(code: string): boolean {
    return code in CATEGORY_NAMES;
}
