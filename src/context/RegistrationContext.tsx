import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';
import {
    Student,
    RegistrationStep,
    ChatMessage,
    CounsellingType,
    UGCETCourse,
    FarmScienceCourse,
    UGNEETCourse,
    UGNEETCourseSelection,
    SeatType,
    CourseRank,
    BaseCategory,
    CategoryVariant,
    SpecialCategory,
    UGNEETSpecialCategory
} from '../types';
import {
    getCategoryReservations,
    calculateEligibleCategories,
    SPECIAL_CATEGORIES_LIST
} from '../services/categoryService';
import { saveStudent } from '../services/studentService';

interface RegistrationContextType {
    currentStep: RegistrationStep;
    studentData: Partial<Student>;
    messages: ChatMessage[];

    // Temporary state during registration
    selectedCounsellingTypes: CounsellingType[];
    ugcetCourses: UGCETCourse[];
    farmScienceCourses: FarmScienceCourse[];
    ugneetCourses: UGNEETCourseSelection[];
    courseRanks: CourseRank[];
    currentRankIndex: number;
    specialCategories: SpecialCategory[];
    ugneetSpecialCategories: UGNEETSpecialCategory[];
    snqApplied: boolean;
    incomeSlab: string;

    // Actions

    // Actions
    addMessage: (content: string, role: 'user' | 'bot', options?: string[]) => void;
    updateStudentData: (data: Partial<Student>) => void;
    nextStep: () => void;
    setStep: (step: RegistrationStep) => void;

    // Course management
    addCounsellingType: (type: CounsellingType) => void;
    addUGCETCourse: (course: UGCETCourse) => void;
    removeUGCETCourse: (course: UGCETCourse) => void;
    addFarmScienceCourse: (course: FarmScienceCourse) => void;
    removeFarmScienceCourse: (course: FarmScienceCourse) => void;
    addUGNEETCourse: (course: UGNEETCourse, seatTypes: SeatType[]) => void;
    removeUGNEETCourse: (course: UGNEETCourse) => void;

    // Rank management
    addCourseRank: (rank: CourseRank) => void;

    // Category management
    setBaseCategory: (category: BaseCategory) => void;
    setKannada: (value: boolean) => void;
    setRural: (value: boolean) => void;
    setHK: (value: boolean) => void;
    setSnqApplied: (value: boolean) => void;
    setIncomeSlab: (value: string) => void;
    addSpecialCategory: (category: SpecialCategory) => void;
    removeSpecialCategory: (category: SpecialCategory) => void;
    addUgneetSpecialCategory: (category: UGNEETSpecialCategory) => void;
    removeUgneetSpecialCategory: (category: UGNEETSpecialCategory) => void;
    calculateCategories: () => CategoryVariant[];

    goToStep: (step: RegistrationStep) => void;
    completeRegistration: () => Promise<string>;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export function RegistrationProvider({ children }: { children: ReactNode }) {
    const [currentStep, setCurrentStep] = useState<RegistrationStep>(RegistrationStep.WELCOME);
    const [studentData, setStudentData] = useState<Partial<Student>>({
        hasKannada: false,
        hasRural: false,
        hasHK: false,
        counsellingTypes: [],
        courseRanks: [],
        eligibleCategories: [],
        baseCategory: '1G'
    });

    // Temporary state during registration
    const [selectedCounsellingTypes, setSelectedCounsellingTypes] = useState<CounsellingType[]>([]);
    const [ugcetCourses, setUgcetCourses] = useState<UGCETCourse[]>([]);
    const [farmScienceCourses, setFarmScienceCourses] = useState<FarmScienceCourse[]>([]);
    const [ugneetCourses, setUgneetCourses] = useState<UGNEETCourseSelection[]>([]);
    const [courseRanks, setCourseRanks] = useState<CourseRank[]>([]);
    const [currentRankIndex, setCurrentRankIndex] = useState(0);
    const [baseCategoryState, setBaseCategoryState] = useState<BaseCategory>('1G');
    const [specialCategories, setSpecialCategories] = useState<SpecialCategory[]>([]);
    const [ugneetSpecialCategories, setUgneetSpecialCategories] = useState<UGNEETSpecialCategory[]>([]);
    const [snqApplied, setSnqAppliedState] = useState(false);
    const [incomeSlab, setIncomeSlabState] = useState('');

    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '0',
            role: 'bot',
            content: '👋 Welcome to BharatMinds AI Counsellor!\n\nI\'m here to help you with KEA counselling for UGCET and UGNEET.\n\nLet\'s start by getting to know you. What\'s your name?',
            timestamp: new Date()
        }
    ]);
    const messageIdCounter = useRef(1);

    const addMessage = (content: string, role: 'user' | 'bot', options?: string[]) => {
        const newMessage: ChatMessage = {
            id: `msg_${messageIdCounter.current++}`,
            role,
            content,
            timestamp: new Date(),
            options
        };
        setMessages(prev => [...prev, newMessage]);
    };

    const updateStudentData = (data: Partial<Student>) => {
        setStudentData(prev => ({ ...prev, ...data }));
    };

    const nextStep = () => {
        // Simple sequential navigation is risky with dynamic flows
        // Consumers should use goToStep for explicit navigation
    };

    const goToStep = (step: RegistrationStep) => {
        setStep(step);
    };

    const setStep = (step: RegistrationStep) => {
        setCurrentStep(step);
    };

    // Course management functions
    const addCounsellingType = (type: CounsellingType) => {
        setSelectedCounsellingTypes(prev => {
            if (!prev.includes(type)) {
                return [...prev, type];
            }
            return prev;
        });
    };

    const addUGCETCourse = (course: UGCETCourse) => {
        setUgcetCourses(prev => {
            if (!prev.includes(course)) {
                return [...prev, course];
            }
            return prev;
        });
    };

    const removeUGCETCourse = (course: UGCETCourse) => {
        setUgcetCourses(prev => prev.filter(c => c !== course));
    };

    const addFarmScienceCourse = (course: FarmScienceCourse) => {
        setFarmScienceCourses(prev => {
            if (!prev.includes(course)) {
                return [...prev, course];
            }
            return prev;
        });
    };

    const removeFarmScienceCourse = (course: FarmScienceCourse) => {
        setFarmScienceCourses(prev => prev.filter(c => c !== course));
    };

    const addUGNEETCourse = (course: UGNEETCourse, seatTypes: SeatType[]) => {
        setUgneetCourses(prev => {
            const existingIndex = prev.findIndex(c => c.course === course);
            if (existingIndex !== -1) {
                // Update existing
                const updated = [...prev];
                updated[existingIndex] = { course, seatTypes };
                return updated;
            } else {
                // Add new
                return [...prev, { course, seatTypes }];
            }
        });
    };

    const removeUGNEETCourse = (course: UGNEETCourse) => {
        setUgneetCourses(prev => prev.filter(c => c.course !== course));
    };

    const addCourseRank = (rank: CourseRank) => {
        setCourseRanks(prev => [...prev, rank]);
    };

    // Category management functions
    const setBaseCategory = (category: BaseCategory) => {
        setBaseCategoryState(category);
    };

    const setKannada = (value: boolean) => {
        setStudentData(prev => ({ ...prev, hasKannada: value }));
    };

    const setRural = (value: boolean) => {
        setStudentData(prev => ({ ...prev, hasRural: value }));
    };

    const setHK = (value: boolean) => {
        setStudentData(prev => ({ ...prev, hasHK: value }));
    };

    const setSnqApplied = (value: boolean) => {
        setSnqAppliedState(value);
        setStudentData(prev => ({ ...prev, snqApplied: value }));
    };

    const setIncomeSlab = (value: string) => {
        setIncomeSlabState(value);
        setStudentData(prev => ({ ...prev, incomeSlab: value }));
    };

    const addSpecialCategory = (category: SpecialCategory) => {
        setSpecialCategories(prev => {
            if (!prev.includes(category)) {
                return [...prev, category];
            }
            return prev;
        });
    };

    const removeSpecialCategory = (category: SpecialCategory) => {
        setSpecialCategories(prev => prev.filter(c => c !== category));
    };

    const addUgneetSpecialCategory = (category: UGNEETSpecialCategory) => {
        setUgneetSpecialCategories(prev => {
            if (!prev.includes(category)) {
                return [...prev, category];
            }
            return prev;
        });
    };

    const removeUgneetSpecialCategory = (category: UGNEETSpecialCategory) => {
        setUgneetSpecialCategories(prev => prev.filter(c => c !== category));
    };

    const calculateCategories = (): CategoryVariant[] => {
        return calculateEligibleCategories(
            baseCategoryState,
            Boolean(studentData.hasKannada),
            Boolean(studentData.hasRural),
            Boolean(studentData.hasHK),
            specialCategories
        );
    };

    const completeRegistration = async (): Promise<string> => {
        // Calculate eligible categories
        const eligibleCategories = calculateCategories();

        try {
            const { getCurrentUser, signUp } = await import('../services/authService');

            // Check if user is already logged in
            let authUser = await getCurrentUser();

            // If not logged in, create account
            if (!authUser) {
                const password = `${studentData.mobile}@Kcet2024`;
                authUser = await signUp(
                    studentData.email || '',
                    password,
                    studentData.name || ''
                );
            }

            // Create complete student object with auth user ID
            const student: Student = {
                id: authUser.$id,
                name: studentData.name || '',
                mobile: studentData.mobile || '',
                email: studentData.email || '',
                counsellingTypes: selectedCounsellingTypes,
                ugcetCourses: ugcetCourses.length > 0 ? ugcetCourses : undefined,
                farmScienceCourses: farmScienceCourses.length > 0 ? farmScienceCourses : undefined,
                ugneetCourses: ugneetCourses.length > 0 ? ugneetCourses : undefined,
                ugneetSpecialCategories: ugneetSpecialCategories.length > 0 ? ugneetSpecialCategories : undefined,
                neetAIR: studentData.neetAIR,
                courseRanks,
                baseCategory: baseCategoryState,
                hasKannada: Boolean(studentData.hasKannada),
                hasRural: Boolean(studentData.hasRural),
                hasHK: Boolean(studentData.hasHK),
                snqApplied,
                incomeSlab: snqApplied ? incomeSlab : undefined,
                eligibleCategories,
                specialCategories,
                createdAt: new Date().toISOString()
            };

            // Save to database
            const studentId = await saveStudent(student);

            return studentId;
        } catch (error: any) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    return (
        <RegistrationContext.Provider
            value={{
                currentStep,
                studentData,
                messages,
                selectedCounsellingTypes,
                ugcetCourses,
                farmScienceCourses,
                ugneetCourses,
                courseRanks,
                currentRankIndex,
                specialCategories,
                ugneetSpecialCategories,
                snqApplied,
                incomeSlab,
                addMessage,
                updateStudentData,
                nextStep,
                setStep,
                addCounsellingType,
                addUGCETCourse,
                removeUGCETCourse,
                addFarmScienceCourse,
                removeFarmScienceCourse,
                addUGNEETCourse,
                removeUGNEETCourse,
                addCourseRank,
                setBaseCategory,
                setKannada,
                setRural,
                setHK,
                setSnqApplied,
                setIncomeSlab,
                addSpecialCategory,
                removeSpecialCategory,
                addUgneetSpecialCategory,
                removeUgneetSpecialCategory,
                calculateCategories,
                goToStep,
                completeRegistration
            }}
        >
            {children}
        </RegistrationContext.Provider>
    );
}

export function useRegistration() {
    const context = useContext(RegistrationContext);
    if (!context) {
        throw new Error('useRegistration must be used within RegistrationProvider');
    }
    return context;
}
