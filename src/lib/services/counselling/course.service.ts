import {
    UGCETCourse,
    FarmScienceCourse,
    UGNEETCourse,
    SeatType,
    UGNEETCourseSelection
} from '@/types';

// ============================================================================
// UGCET COURSES
// ============================================================================

export const UGCET_COURSES: UGCETCourse[] = [
    'Engineering and Technology',
    'Architecture',
    'Bachelor of Yoga and Naturopathy (BNYS)',
    'B.Sc. (Nursing)',
    'Veterinary : Bachelor of Veterinary Science and Animal Husbandry (B.V.Sc. & A.H.)',
    'Farm Science / Agri courses',
    'B. Pharma, Pharm-D'
];

export const FARM_SCIENCE_COURSES: FarmScienceCourse[] = [
    'B.Sc. (Hons) Agriculture',
    'B.Sc. (Hons) Sericulture',
    'B.Sc. (Hons) Horticulture',
    'B.Sc (Hons) Forestry',
    'B.Tec Technology',
    'B.Sc.(Hons) Community Science',
    'B.Tech (Agricultural Engineering)',
    'B.Tech (Food Technology)',
    'B.Tech (D. Tech)',
    'B.F.Sc (Fisheries)',
    'B.Sc. (Hons) Agri. Business Management'
];

// ============================================================================
// UGNEET COURSES
// ============================================================================

export const UGNEET_COURSES: UGNEETCourse[] = [
    'MBBS',
    'BDS',
    'BAMS',
    'BHMS',
    'BUMS'
];

export const SEAT_TYPES: { code: SeatType; label: string }[] = [
    { code: SeatType.GOVT, label: 'Government (G)' },
    { code: SeatType.PRIVATE, label: 'Private (P)' },
    { code: SeatType.MANAGEMENT, label: 'Others/Management (Q)' },
    { code: SeatType.NRI, label: 'NRI (N)' }
];

// ============================================================================
// COURSE LOGIC FUNCTIONS
// ============================================================================

/**
 * Check if a course requires practical rank
 */
export function requiresPracticalRank(course: string): boolean {
    return course === 'Veterinary : Bachelor of Veterinary Science and Animal Husbandry (B.V.Sc. & A.H.)' ||
        course === 'Farm Science / Agri courses' ||
        FARM_SCIENCE_COURSES.includes(course as FarmScienceCourse);
}

/**
 * Get course code from course name
 */
export function getCourseCode(courseName: string): string {
    const courseCodeMap: Record<string, string> = {
        'Engineering and Technology': 'ENGG',
        'Architecture': 'ARCH',
        'Bachelor of Yoga and Naturopathy (BNYS)': 'BNYS',
        'B.Sc. (Nursing)': 'NURS',
        'Veterinary : Bachelor of Veterinary Science and Animal Husbandry (B.V.Sc. & A.H.)': 'VET',
        'Farm Science / Agri courses': 'FARM',
        'B. Pharma, Pharm-D': 'PHAR',

        // Farm Science courses
        'B.Sc. (Hons) Agriculture': 'AGRI',
        'B.Sc. (Hons) Sericulture': 'SERI',
        'B.Sc. (Hons) Horticulture': 'HORT',
        'B.Sc (Hons) Forestry': 'FORE',
        'B.Tec Technology': 'BTEC',
        'B.Sc.(Hons) Community Science': 'COMM',
        'B.Tech (Agricultural Engineering)': 'AGRE',
        'B.Tech (Food Technology)': 'FOOD',
        'B.Tech (D. Tech)': 'DTECH',
        'B.F.Sc (Fisheries)': 'FISH',
        'B.Sc. (Hons) Agri. Business Management': 'AGBM',

        // UGNEET courses
        'MBBS': 'MBBS',
        'BDS': 'BDS',
        'BAMS': 'BAMS',
        'BHMS': 'BHMS',
        'BUMS': 'BUMS'
    };

    return courseCodeMap[courseName] || courseName;
}

/**
 * Validate UGCET course selection
 */
export function isValidUGCETCourse(course: string): boolean {
    return UGCET_COURSES.includes(course as UGCETCourse);
}

/**
 * Validate Farm Science course selection
 */
export function isValidFarmScienceCourse(course: string): boolean {
    return FARM_SCIENCE_COURSES.includes(course as FarmScienceCourse);
}

/**
 * Validate UGNEET course selection
 */
export function isValidUGNEETCourse(course: string): boolean {
    return UGNEET_COURSES.includes(course as UGNEETCourse);
}

/**
 * Format seat types for display
 */
export function formatSeatTypes(seatTypes: SeatType[]): string {
    return seatTypes
        .map(type => SEAT_TYPES.find(st => st.code === type)?.label || type)
        .join(', ');
}

/**
 * Format UGNEET course selection for display
 */
export function formatUGNEETCourseSelection(selection: UGNEETCourseSelection): string {
    return `${selection.course} - ${formatSeatTypes(selection.seatTypes)}`;
}
