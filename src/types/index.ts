// ============================================================================
// COUNSELLING TYPES
// ============================================================================

export enum CounsellingType {
  UGCET = 'UGCET',
  UGNEET = 'UGNEET',
  COMBINED = 'COMBINED'
}

// ============================================================================
// UGCET COURSES
// ============================================================================

export type UGCETCourse =
  | 'Engineering and Technology'
  | 'Architecture'
  | 'Bachelor of Yoga and Naturopathy (BNYS)'
  | 'B.Sc. (Nursing)'
  | 'Veterinary : Bachelor of Veterinary Science and Animal Husbandry (B.V.Sc. & A.H.)'
  | 'Farm Science / Agri courses'
  | 'B. Pharma, Pharm-D';

export type FarmScienceCourse =
  | 'B.Sc. (Hons) Agriculture'
  | 'B.Sc. (Hons) Sericulture'
  | 'B.Sc. (Hons) Horticulture'
  | 'B.Sc (Hons) Forestry'
  | 'B.Tec Technology'
  | 'B.Sc.(Hons) Community Science'
  | 'B.Tech (Agricultural Engineering)'
  | 'B.Tech (Food Technology)'
  | 'B.Tech (D. Tech)'
  | 'B.F.Sc (Fisheries)'
  | 'B.Sc. (Hons) Agri. Business Management';

// ============================================================================
// UGNEET COURSES
// ============================================================================

export type UGNEETCourse =
  | 'MBBS'
  | 'BDS'
  | 'BAMS'
  | 'BHMS'
  | 'BUMS';

export enum SeatType {
  GOVT = 'G',           // Government
  PRIVATE = 'P',        // Private
  MANAGEMENT = 'Q',     // Others/Management
  NRI = 'N'            // NRI
}

export interface UGNEETCourseSelection {
  course: UGNEETCourse;
  seatTypes: SeatType[];
}

export type UGNEETSpecialCategory =
  | 'GMP'   // General Merit Private Quota
  | 'GMPH'  // General Merit Private Hyderabad
  | 'MA'    // Minority Linguistic Tamil
  | 'MC'    // Minority Christian
  | 'ME'    // Minority Linguistic Telugu
  | 'MEH'   // Minority Linguistic Telugu Hyderabad
  | 'MM'    // Muslim Minority
  | 'MMH'   // Muslim Minority Hyderabad
  | 'MU'    // Muslim Category
  | 'RC1' | 'RC2' | 'RC3' | 'RC4' | 'RC5' | 'RC6' | 'RC7' | 'RC8'; // Roman Catholic Categories

// ============================================================================
// RANK TYPES
// ============================================================================

export interface CourseRank {
  courseCode: string;
  courseName: string;
  rank: number;
  practicalRank?: number;  // For Veterinary and Farm Science courses
}

// ============================================================================
// CATEGORY SYSTEM
// ============================================================================

export type BaseCategory =
  | '1G' | '2AG' | '2BG' | '3AG' | '3BG'
  | 'SCG' | 'STG' | 'GM';

export type SpecialCategory =
  | 'AGL' | 'CAP' | 'DEF' | 'JK'
  | 'NCC' | 'PH' | 'S-G' | 'SPO' | 'XD';

export type CategoryVariant =
  | SpecialCategory
  // Category 1
  | '1G' | '1R' | '1K' | '1H' | '1RH' | '1KH'
  // Category 2A
  | '2AG' | '2AR' | '2AK' | '2AH' | '2ARH' | '2AKH'
  // Category 2B
  | '2BG' | '2BR' | '2BK' | '2BH' | '2BRH' | '2BKH'
  // Category 3A
  | '3AG' | '3AR' | '3AK' | '3AH' | '3ARH' | '3AKH'
  // Category 3B
  | '3BG' | '3BR' | '3BK' | '3BH' | '3BRH' | '3BKH'
  // SC
  | 'SCG' | 'SCR' | 'SCK' | 'SCH' | 'SCRH' | 'SCKH'
  // ST
  | 'STG' | 'STR' | 'STK' | 'STH' | 'STRH' | 'STKH'
  // GM
  | 'GM' | 'GMR' | 'GMK' | 'GMH' | 'GMRH' | 'GMKH';

// ============================================================================
// STUDENT TYPES
// ============================================================================

export interface Student {
  id: string;
  name: string;
  mobile: string;
  email: string;

  // Counselling Information
  counsellingTypes: CounsellingType[];

  // UGCET Data
  ugcetCourses?: UGCETCourse[];
  farmScienceCourses?: FarmScienceCourse[];

  // UGNEET Data
  ugneetCourses?: UGNEETCourseSelection[];
  ugneetSpecialCategories?: UGNEETSpecialCategory[];
  neetAIR?: number;  // All India Rank for NEET

  // Ranks (course-specific for UGCET)
  courseRanks: CourseRank[];

  // Category Information
  baseCategory: BaseCategory;
  hasKannada: boolean;
  hasRural: boolean;
  hasHK: boolean;
  snqApplied?: boolean;
  incomeSlab?: string;
  eligibleCategories: CategoryVariant[];
  specialCategories: SpecialCategory[];

  createdAt: string;
}

// Legacy interface for backward compatibility (deprecated)
export interface StudentPreferences {
  courses: string[];
  locations: string[];
  collegeType: 'Government' | 'Aided' | 'Private' | 'All';
  branches: string[];
}

// College and Cutoff Types
export interface College {
  code: string; // e.g., 'E001'
  name: string;
  city: string;
  type: 'Government' | 'Aided' | 'Private' | 'Autonomous';
}

export interface Cutoff {
  collegeCode: string;
  collegeName: string;
  course: string; // e.g., 'CS Computers'
  courseCode: string; // e.g., 'CS'
  courseName: string; // e.g., 'Computers'
  category: string; // e.g., '3AG'
  cutoffRank: number;
  round: string; // 'Round 1'
  year: number; // 2024
}

export interface CutoffRow {
  collegeCodeWithName: string;
  course: string;
  '1G': string;
  '1K': string;
  '1R': string;
  '2AG': string;
  '2AK': string;
  '2AR': string;
  '2BG': string;
  '2BK': string;
  '2BR': string;
  '3AG': string;
  '3AK': string;
  '3AR': string;
  '3BG': string;
  '3BK': string;
  '3BR': string;
  'GM': string;
  'GMK': string;
  'GMR': string;
  'SCG': string;
  'SCK': string;
  'SCR': string;
  'STG': string;
  'STK': string;
  'STR': string;
}

// Option List Types
export interface ScoredCollege extends Cutoff {
  score: number;
  probability: number;
  tier: 'safe' | 'target' | 'reach';
}

export interface OptionList {
  safe: ScoredCollege[];
  target: ScoredCollege[];
  reach: ScoredCollege[];
}

// Chat Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
  options?: string[]; // Quick reply options
}

export enum RegistrationStep {
  WELCOME = 'WELCOME',
  NAME = 'NAME',
  MOBILE = 'MOBILE',
  EMAIL = 'EMAIL',

  // Counselling Type Selection
  COUNSELLING_TYPE = 'COUNSELLING_TYPE',

  // UGCET Flow
  UGCET_COURSES = 'UGCET_COURSES',
  FARM_SCIENCE_COURSES = 'FARM_SCIENCE_COURSES',

  // UGNEET Flow
  UGNEET_COURSES = 'UGNEET_COURSES',
  SEAT_TYPES = 'SEAT_TYPES',
  UGNEET_SPECIAL_CATEGORIES = 'UGNEET_SPECIAL_CATEGORIES',

  // Rank Collection
  COURSE_RANKS = 'COURSE_RANKS',
  PRACTICAL_RANK_CHECK = 'PRACTICAL_RANK_CHECK',
  NEET_AIR = 'NEET_AIR',

  // Category Selection
  CATEGORY_BASE = 'CATEGORY_BASE',
  CATEGORY_RESERVATIONS = 'CATEGORY_RESERVATIONS',
  HK_REGION = 'HK_REGION',
  SNQ_QUOTA = 'SNQ_QUOTA',
  SNQ_SLAB_SELECTION = 'SNQ_SLAB_SELECTION',
  SPECIAL_CATEGORIES = 'SPECIAL_CATEGORIES',
  CATEGORY_SUMMARY = 'CATEGORY_SUMMARY',

  // Completion
  SUMMARY = 'SUMMARY',
  COMPLETE = 'COMPLETE'
}

export interface RegistrationState {
  currentStep: RegistrationStep;
  data: Partial<Student>;
  messages: ChatMessage[];
}
