import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MessageBubble from '../../components/Chat/MessageBubble';
import ChatInput from '../../components/Chat/ChatInput';
import QuickReply from '../../components/Chat/QuickReply';
import MultiSelect from '../../components/Chat/MultiSelect';
import { useRegistration } from '../../context/RegistrationContext';
import {
    BaseCategory,
    RegistrationStep,
    CounsellingType,
    SeatType,
    UGCETCourse,
    FarmScienceCourse,
    UGNEETCourse,
    SpecialCategory,
    UGNEETSpecialCategory
} from '../../types';
import {
    BASE_CATEGORIES,
    formatCategoryDisplay,
    SPECIAL_CATEGORIES_LIST,
    UGNEET_SPECIAL_CATEGORIES_LIST
} from '../../services/categoryService';
import {
    UGCET_COURSES,
    FARM_SCIENCE_COURSES,
    UGNEET_COURSES,
    SEAT_TYPES,
    getCourseCode,
    requiresPracticalRank
} from '../../services/courseService';

export default function RegistrationScreen({ navigation }: any) {
    const {
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
        addMessage,
        updateStudentData,
        goToStep,
        addCounsellingType,
        addUGCETCourse,
        addFarmScienceCourse,
        addUGNEETCourse,
        addCourseRank,
        setBaseCategory,
        setKannada,
        setRural,
        setHK,
        addSpecialCategory,
        removeSpecialCategory,
        addUgneetSpecialCategory,
        removeUgneetSpecialCategory,
        setSnqApplied,
        setIncomeSlab,
        snqApplied,
        incomeSlab,
        calculateCategories,
        completeRegistration
    } = useRegistration();

    const scrollViewRef = useRef<ScrollView>(null);
    const [tempSeatTypes, setTempSeatTypes] = useState<SeatType[]>([]);
    const [currentUGNEETCourse, setCurrentUGNEETCourse] = useState<string>('');
    const [currentRankCourse, setCurrentRankCourse] = useState<string>('');
    const [needsPracticalRank, setNeedsPracticalRank] = useState(false);
    const [collectedRankCourses, setCollectedRankCourses] = useState<string[]>([]);
    const [showMultiSelect, setShowMultiSelect] = useState(false);
    const [multiSelectOptions, setMultiSelectOptions] = useState<string[]>([]);
    const [multiSelectTitle, setMultiSelectTitle] = useState('');
    const [multiSelectType, setMultiSelectType] = useState<string>(''); // Track what we're selecting
    const [multiSelectAllowSkip, setMultiSelectAllowSkip] = useState(false); // Allow skipping

    useEffect(() => {
        // Auto-scroll to bottom when new messages arrive
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
    }, [messages]);

    // Handle multi-select confirmation for all types
    const handleMultiSelectConfirm = (selected: string[]) => {
        switch (multiSelectType) {
            case 'UGCET_COURSES':
                // Store the selected UGCET courses for rank collection
                const selectedUGCETCourses = selected.filter(course =>
                    course !== 'Farm Science / Agri courses' && UGCET_COURSES.includes(course as any)
                );

                // Add all selected UGCET courses
                selected.forEach(course => {
                    if (course === 'Farm Science / Agri courses') {
                        addUGCETCourse(course as any);
                        // Show farm science sub-selection
                        setTimeout(() => {
                            addMessage('🌾 Select specific Farm Science courses:', 'bot');
                            setMultiSelectTitle('Select Farm Science Courses');
                            setMultiSelectOptions([...FARM_SCIENCE_COURSES]);
                            setMultiSelectType('FARM_SCIENCE');
                            // Store the non-farm-science courses for later rank collection
                            (window as any).pendingUGCETCourses = selectedUGCETCourses;
                            setShowMultiSelect(true);
                        }, 300);
                        return;
                    } else if (UGCET_COURSES.includes(course as any)) {
                        addUGCETCourse(course as any);
                    }
                });

                // Only continue if Farm Science wasn't selected (it has its own flow)
                if (!selected.includes('Farm Science / Agri courses')) {
                    addMessage(`✅ Added ${selected.length} course(s): ${selected.join(', ')}`, 'bot');

                    if (selectedCounsellingTypes.includes(CounsellingType.UGNEET)) {
                        goToStep(RegistrationStep.UGNEET_COURSES);
                        // Store courses for later rank collection
                        (window as any).pendingUGCETCourses = selectedUGCETCourses;
                        setTimeout(() => {
                            addMessage('🏥 Now select your UGNEET courses:', 'bot');
                            setMultiSelectTitle('Select UGNEET Courses');
                            setMultiSelectOptions([...UGNEET_COURSES]);
                            setMultiSelectType('UGNEET_COURSES');
                            setShowMultiSelect(true);
                        }, 600);
                    } else {
                        // Start rank collection with the courses we just selected
                        startRankCollection(selectedUGCETCourses);
                    }
                }
                break;

            case 'FARM_SCIENCE':
                // Add all selected Farm Science courses
                selected.forEach(course => {
                    if (FARM_SCIENCE_COURSES.includes(course as any)) {
                        addFarmScienceCourse(course as any);
                    }
                });

                addMessage(`✅ Added Farm Science courses: ${selected.join(', ')}`, 'bot');

                // Get the previously selected UGCET courses (including Farm Science as a ranked course)
                const previousUGCETCourses = (window as any).pendingUGCETCourses || [];
                // Farm Science is treated as a single course for ranking
                const allCoursesToRank = [...previousUGCETCourses, 'Farm Science / Agri courses'];

                if (selectedCounsellingTypes.includes(CounsellingType.UGNEET)) {
                    goToStep(RegistrationStep.UGNEET_COURSES);
                    // Update pending courses to include Farm Science
                    (window as any).pendingUGCETCourses = allCoursesToRank;
                    setTimeout(() => {
                        addMessage('🏥 Now select your UGNEET courses:', 'bot');
                        setMultiSelectTitle('Select UGNEET Courses');
                        setMultiSelectOptions([...UGNEET_COURSES]);
                        setMultiSelectType('UGNEET_COURSES');
                        setShowMultiSelect(true);
                    }, 600);
                } else {
                    // Start rank collection with all courses including Farm Science
                    startRankCollection(allCoursesToRank);
                }
                break;

            case 'UGNEET_COURSES':
                // Add all selected UGNEET courses - now ask for seat types
                if (selected.length > 0) {
                    addMessage(`✅ Selected UGNEET courses: ${selected.join(', ')}`, 'bot');

                    // Start collecting seat types for each course individually
                    startSeatTypeCollection(selected);
                }
                break;

            case 'SEAT_TYPES':
                // Add seat types to current UGNEET course
                const seatTypeCodes = selected.map(label => {
                    const st = SEAT_TYPES.find(s => s.label === label);
                    return st?.code;
                }).filter(Boolean) as SeatType[];

                if (currentUGNEETCourse && UGNEET_COURSES.includes(currentUGNEETCourse as any)) {
                    addUGNEETCourse(currentUGNEETCourse as any, seatTypeCodes);
                    addMessage(`✅ Added ${currentUGNEETCourse} with seat types: ${selected.join(', ')}`, 'bot');
                }

                // Continue to next course
                continueSeatTypeCollection(currentUGNEETCourse);
                break;

            case 'UGNEET_SPECIAL_CATEGORIES':
                // Add all selected UGNEET special categories
                selected.forEach(option => {
                    const catCode = option.split(' - ')[0];
                    if (UGNEET_SPECIAL_CATEGORIES_LIST.some(c => c.code === catCode)) {
                        addUgneetSpecialCategory(catCode as UGNEETSpecialCategory);
                    }
                });

                if (selected.length > 0) {
                    const catNames = selected.map(s => s.split(' - ')[0]).join(', ');
                    addMessage(`✅ Added UGNEET special categories: ${catNames}`, 'bot');
                } else {
                    addMessage('✅ No UGNEET special categories selected.', 'bot');
                }

                // Go to summary
                goToStep(RegistrationStep.CATEGORY_SUMMARY);
                setTimeout(() => {
                    showSummary();
                }, 500);
                break;

            case 'CATEGORY_RESERVATIONS':
                // Handle Kannada/Rural selections
                if (selected.includes('Kannada')) {
                    setKannada(true);
                }
                if (selected.includes('Rural')) {
                    setRural(true);
                }

                const reservations = selected.length > 0 ? selected.join(' & ') : 'None';
                addMessage(`✅ Reservations: ${reservations}`, 'bot');

                goToStep(RegistrationStep.HK_REGION);
                setTimeout(() => {
                    addMessage(
                        'Do you belong to Hyderabad Karnataka Region (371J certificate)?',
                        'bot',
                        ['Yes', 'No']
                    );
                }, 500);
                break;

            case 'SNQ_SLAB_SELECTION':
                if (selected.length > 0) {
                    const slab = selected[0]; // Single select
                    setIncomeSlab(slab);
                    addMessage(`✅ Selected Income Slab: ${slab}`, 'bot');

                    goToStep(RegistrationStep.SPECIAL_CATEGORIES);
                    setTimeout(() => {
                        addMessage('🌟 Do you have any Special Category reservations?', 'bot');
                        setMultiSelectTitle('Select Special Categories (if any)');
                        setMultiSelectOptions(SPECIAL_CATEGORIES_LIST.map(c => `${c.code} - ${c.label}`));
                        setMultiSelectType('SPECIAL_CATEGORIES');
                        setMultiSelectAllowSkip(true);
                        setShowMultiSelect(true);
                    }, 500);
                }
                break;

            case 'SPECIAL_CATEGORIES':
                // Add all selected special categories (format: "CODE - Label")
                selected.forEach(option => {
                    const catCode = option.split(' - ')[0]; // Extract code from "CODE - Label"
                    if (SPECIAL_CATEGORIES_LIST.some(c => c.code === catCode)) {
                        addSpecialCategory(catCode as SpecialCategory);
                    }
                });

                if (selected.length > 0) {
                    const catNames = selected.map(s => s.split(' - ')[0]).join(', ');
                    addMessage(`✅ Added special categories: ${catNames}`, 'bot');
                } else {
                    addMessage('✅ No special categories selected.', 'bot');
                }

                // Check if UGNEET is selected to show UGNEET special categories
                if (selectedCounsellingTypes.includes(CounsellingType.UGNEET)) {
                    goToStep(RegistrationStep.UGNEET_SPECIAL_CATEGORIES);
                    setTimeout(() => {
                        addMessage('🌟 Do you belong to any of these Special Categories? (UGNEET)', 'bot');
                        setMultiSelectTitle('Select UGNEET Special Categories');
                        setMultiSelectOptions(UGNEET_SPECIAL_CATEGORIES_LIST.map(c => `${c.code} - ${c.label}`));
                        setMultiSelectType('UGNEET_SPECIAL_CATEGORIES');
                        setMultiSelectAllowSkip(true);
                        setShowMultiSelect(true);
                    }, 500);
                } else {
                    // Go to summary
                    goToStep(RegistrationStep.CATEGORY_SUMMARY);
                    setTimeout(() => {
                        showSummary();
                    }, 500);
                }
                break;

            default:
                break;
        }
    };

    const handleUserInput = async (input: string) => {
        // Add user message
        addMessage(input, 'user');

        // Process based on current step
        switch (currentStep) {
            case RegistrationStep.WELCOME:
                updateStudentData({ name: input });
                goToStep(RegistrationStep.MOBILE);
                setTimeout(() => {
                    addMessage(`Nice to meet you, ${input}! 📱\n\nWhat's your mobile number?`, 'bot');
                }, 500);
                break;

            case RegistrationStep.MOBILE:
                updateStudentData({ mobile: input });
                goToStep(RegistrationStep.EMAIL);
                setTimeout(() => {
                    addMessage('📧 What\'s your email address?', 'bot');
                }, 500);
                break;

            case RegistrationStep.EMAIL:
                updateStudentData({ email: input });
                goToStep(RegistrationStep.COUNSELLING_TYPE);
                setTimeout(() => {
                    addMessage(
                        '🎓 Which counselling are you interested in?',
                        'bot',
                        ['UGCET', 'UGNEET', 'Both UGCET & UGNEET']
                    );
                }, 500);
                break;

            case RegistrationStep.COUNSELLING_TYPE:
                if (input === 'UGCET') {
                    addCounsellingType(CounsellingType.UGCET);
                    goToStep(RegistrationStep.UGCET_COURSES);
                    setTimeout(() => {
                        addMessage('📚 Select all the UGCET courses you\'re interested in:', 'bot');
                        setMultiSelectTitle('Select UGCET Courses');
                        setMultiSelectOptions([...UGCET_COURSES]);
                        setMultiSelectType('UGCET_COURSES');
                        setShowMultiSelect(true);
                    }, 500);
                } else if (input === 'UGNEET') {
                    addCounsellingType(CounsellingType.UGNEET);
                    goToStep(RegistrationStep.UGNEET_COURSES);
                    setTimeout(() => {
                        addMessage('🏥 Select all the UGNEET courses you\'re interested in:', 'bot');
                        setMultiSelectTitle('Select UGNEET Courses');
                        setMultiSelectOptions([...UGNEET_COURSES]);
                        setMultiSelectType('UGNEET_COURSES');
                        setShowMultiSelect(true);
                    }, 500);
                } else if (input === 'Both UGCET & UGNEET' || input === 'Combined') {
                    addCounsellingType(CounsellingType.UGCET);
                    addCounsellingType(CounsellingType.UGNEET);
                    goToStep(RegistrationStep.UGCET_COURSES);
                    setTimeout(() => {
                        addMessage('📚 Let\'s start with UGCET courses. Select all that apply:', 'bot');
                        setMultiSelectTitle('Select UGCET Courses');
                        setMultiSelectOptions([...UGCET_COURSES]);
                        setMultiSelectType('UGCET_COURSES');
                        setShowMultiSelect(true);
                    }, 500);
                }
                break;



            case RegistrationStep.UGCET_COURSES:
                if (input === 'Done') {
                    if (ugcetCourses.length === 0 && farmScienceCourses.length === 0) {
                        addMessage('Please select at least one course before typing "Done".', 'bot', [...UGCET_COURSES, 'Done']);
                        return;
                    }

                    // Check if we need to go to UGNEET or rank collection
                    if (selectedCounsellingTypes.includes(CounsellingType.UGNEET) && ugneetCourses.length === 0) {
                        goToStep(RegistrationStep.UGNEET_COURSES);
                        setTimeout(() => {
                            addMessage(
                                '🏥 Now, select the UGNEET courses you\'re interested in:\n\n(You can select multiple courses. Type "Done" when finished)',
                                'bot',
                                [...UGNEET_COURSES, 'Done']
                            );
                        }, 500);
                    } else {
                        // Start rank collection
                        startRankCollection();
                    }
                } else if (input === 'Farm Science / Agri courses') {
                    addUGCETCourse(input as any);
                    goToStep(RegistrationStep.FARM_SCIENCE_COURSES);
                    setTimeout(() => {
                        addMessage(
                            '🌾 Select specific Farm Science courses:\n\n(You can select multiple or type "All" for all courses. Type "Done" when finished)',
                            'bot',
                            [...FARM_SCIENCE_COURSES, 'All', 'Done']
                        );
                    }, 500);
                } else if (UGCET_COURSES.includes(input as any)) {
                    addUGCETCourse(input as any);
                    addMessage(`Added ${input}. Select more or type "Done".`, 'bot', [...UGCET_COURSES, 'Done']);
                }
                break;

            case RegistrationStep.FARM_SCIENCE_COURSES:
                if (input === 'Done') {
                    if (farmScienceCourses.length === 0) {
                        addMessage('Please select at least one Farm Science course or type "Back" to return.', 'bot', [...FARM_SCIENCE_COURSES, 'All', 'Back', 'Done']);
                        return;
                    }
                    goToStep(RegistrationStep.UGCET_COURSES);
                    setTimeout(() => {
                        addMessage(
                            'Farm Science courses added! Select more UGCET courses or type "Done".',
                            'bot',
                            [...UGCET_COURSES, 'Done']
                        );
                    }, 500);
                } else if (input === 'All') {
                    FARM_SCIENCE_COURSES.forEach(course => addFarmScienceCourse(course));
                    addMessage('All Farm Science courses added!', 'bot', ['Done']);
                } else if (FARM_SCIENCE_COURSES.includes(input as any)) {
                    addFarmScienceCourse(input as any);
                    addMessage(`Added ${input}. Select more or type "Done".`, 'bot', [...FARM_SCIENCE_COURSES, 'Done']);
                } else if (input === 'Back') {
                    goToStep(RegistrationStep.UGCET_COURSES);
                    setTimeout(() => {
                        addMessage('Select UGCET courses:', 'bot', [...UGCET_COURSES, 'Done']);
                    }, 500);
                }
                break;

            case RegistrationStep.UGNEET_COURSES:
                if (input === 'Done') {
                    if (ugneetCourses.length === 0) {
                        addMessage('Please select at least one course before typing "Done".', 'bot', [...UGNEET_COURSES, 'Done']);
                        return;
                    }
                    // Don't start rank collection here - it was already started after UGCET courses
                    // Just move to NEET AIR collection
                    goToStep(RegistrationStep.NEET_AIR);
                    setTimeout(() => {
                        addMessage('🎯 What\'s your NEET All India Rank (AIR)?', 'bot');
                    }, 500);
                } else if (UGNEET_COURSES.includes(input as any)) {
                    setCurrentUGNEETCourse(input);
                    goToStep(RegistrationStep.SEAT_TYPES);
                    setTimeout(() => {
                        addMessage(
                            `For ${input}, select the seat types you're interested in:\n\n(You can select multiple. Type "Done" when finished)`,
                            'bot',
                            [...SEAT_TYPES.map(st => st.label), 'Done']
                        );
                    }, 500);
                }
                break;

            case RegistrationStep.SEAT_TYPES:
                if (input === 'Done') {
                    if (tempSeatTypes.length === 0) {
                        addMessage('Please select at least one seat type.', 'bot', [...SEAT_TYPES.map(st => st.label), 'Done']);
                        return;
                    }
                    addUGNEETCourse(currentUGNEETCourse as any, tempSeatTypes);
                    setTempSeatTypes([]);
                    goToStep(RegistrationStep.UGNEET_COURSES);
                    setTimeout(() => {
                        addMessage(
                            `${currentUGNEETCourse} added! Select more courses or type "Done".`,
                            'bot',
                            [...UGNEET_COURSES, 'Done']
                        );
                    }, 500);
                } else {
                    const seatType = SEAT_TYPES.find(st => st.label === input);
                    if (seatType && !tempSeatTypes.includes(seatType.code)) {
                        setTempSeatTypes([...tempSeatTypes, seatType.code]);
                        addMessage(`Added ${input}. Select more or type "Done".`, 'bot', [...SEAT_TYPES.map(st => st.label), 'Done']);
                    }
                }
                break;

            case RegistrationStep.UGNEET_SPECIAL_CATEGORIES:
                if (input === 'None') {
                    // Go to summary
                    goToStep(RegistrationStep.CATEGORY_SUMMARY);
                    setTimeout(() => {
                        addMessage('Type "Confirm" to proceed to summary.', 'bot', ['Confirm']);
                    }, 500);
                } else if (input === 'Done') {
                    // Go to summary
                    goToStep(RegistrationStep.CATEGORY_SUMMARY);
                    setTimeout(() => {
                        addMessage('Type "Confirm" to proceed to summary.', 'bot', ['Confirm']);
                    }, 500);
                } else if (UGNEET_SPECIAL_CATEGORIES_LIST.some(c => c.code === input)) {
                    if (ugneetSpecialCategories.includes(input as UGNEETSpecialCategory)) {
                        removeUgneetSpecialCategory(input as UGNEETSpecialCategory);
                        addMessage(
                            `Removed ${input}. Select more or type "Done".`,
                            'bot',
                            [...UGNEET_SPECIAL_CATEGORIES_LIST.map(c => c.code).filter(c => !ugneetSpecialCategories.includes(c as any) || c === input), 'Done']
                        );
                    } else {
                        addUgneetSpecialCategory(input as UGNEETSpecialCategory);
                        addMessage(
                            `Added ${input}. Select more or type "Done".`,
                            'bot',
                            [...UGNEET_SPECIAL_CATEGORIES_LIST.map(c => c.code).filter(c => !ugneetSpecialCategories.includes(c as any) && c !== input), 'Done']
                        );
                    }
                }
                break;

            case RegistrationStep.COURSE_RANKS:
                const rank = parseInt(input, 10);
                if (isNaN(rank) || rank < 1) {
                    addMessage('Please enter a valid rank.', 'bot');
                    return;
                }

                // Store the rank temporarily
                (window as any).tempNormalRank = rank;

                if (needsPracticalRank) {
                    // Ask if they have practical rank
                    setNeedsPracticalRank(false);
                    goToStep(RegistrationStep.PRACTICAL_RANK_CHECK);
                    setTimeout(() => {
                        addMessage(
                            `Rank for ${currentRankCourse}: ${rank}\n\nDo you have a practical rank for ${currentRankCourse}?`,
                            'bot',
                            ['Yes', 'No']
                        );
                    }, 500);
                } else {
                    // Regular course without practical rank
                    const courseCode = getCourseCode(currentRankCourse);
                    addCourseRank({
                        courseCode,
                        courseName: currentRankCourse,
                        rank,
                    });
                    delete (window as any).tempNormalRank;

                    // Mark as collected
                    setCollectedRankCourses([...collectedRankCourses, currentRankCourse]);

                    // Continue to next course or move to NEET AIR
                    continueRankCollection(currentRankCourse);
                }
                break;

            case RegistrationStep.PRACTICAL_RANK_CHECK:
                if (input.toLowerCase() === 'yes') {
                    // Ask for practical rank
                    setTimeout(() => {
                        addMessage(
                            `What's your practical rank for ${currentRankCourse}?`,
                            'bot'
                        );
                    }, 500);
                    // Stay in same step but now expecting number input
                    (window as any).expectingPracticalRank = true;
                } else if (input.toLowerCase() === 'no') {
                    // No practical rank, save with just normal rank
                    const courseCode = getCourseCode(currentRankCourse);
                    addCourseRank({
                        courseCode,
                        courseName: currentRankCourse,
                        rank: (window as any).tempNormalRank,
                    });
                    delete (window as any).tempNormalRank;

                    // Mark as collected
                    setCollectedRankCourses([...collectedRankCourses, currentRankCourse]);

                    continueRankCollection(currentRankCourse);
                } else if ((window as any).expectingPracticalRank) {
                    // User entered practical rank number
                    const practicalRank = parseInt(input, 10);
                    if (isNaN(practicalRank) || practicalRank < 1) {
                        addMessage('Please enter a valid practical rank.', 'bot');
                        return;
                    }

                    const courseCode = getCourseCode(currentRankCourse);
                    addCourseRank({
                        courseCode,
                        courseName: currentRankCourse,
                        rank: (window as any).tempNormalRank,
                        practicalRank
                    });
                    delete (window as any).tempNormalRank;
                    delete (window as any).expectingPracticalRank;

                    // Mark as collected
                    setCollectedRankCourses([...collectedRankCourses, currentRankCourse]);

                    continueRankCollection(currentRankCourse);
                } else {
                    addMessage('Please select "Yes" or "No".', 'bot', ['Yes', 'No']);
                }
                break;

            case RegistrationStep.NEET_AIR:
                const neetRank = parseInt(input, 10);
                if (isNaN(neetRank) || neetRank < 1) {
                    addMessage('Please enter a valid NEET All India Rank.', 'bot');
                    return;
                }
                updateStudentData({ neetAIR: neetRank });

                // Move to category selection
                goToStep(RegistrationStep.CATEGORY_BASE);
                setTimeout(() => {
                    addMessage(
                        '📋 Select your base category:',
                        'bot',
                        BASE_CATEGORIES.map(c => `${c.code} - ${c.label}`)
                    );
                }, 500);
                break;

            case RegistrationStep.CATEGORY_BASE:
                const categoryCode = input.split(' - ')[0];
                const category = BASE_CATEGORIES.find(c => c.code === categoryCode);
                if (category) {
                    setBaseCategory(category.code);
                    goToStep(RegistrationStep.CATEGORY_RESERVATIONS);
                    setTimeout(() => {
                        addMessage('🏷️ Select your reservations:', 'bot');
                        setMultiSelectTitle('Select Reservations (if any)');
                        setMultiSelectOptions(['Kannada', 'Rural']);
                        setMultiSelectType('CATEGORY_RESERVATIONS');
                        setMultiSelectAllowSkip(true);
                        setShowMultiSelect(true);
                    }, 500);
                }
                break;

            case RegistrationStep.CATEGORY_RESERVATIONS:
                // This is now handled by MultiSelect, but keep fallback for quick replies
                if (input === 'Kannada') {
                    setKannada(true);
                } else if (input === 'Rural') {
                    setRural(true);
                } else if (input === 'Both') {
                    setKannada(true);
                    setRural(true);
                }

                goToStep(RegistrationStep.HK_REGION);
                setTimeout(() => {
                    addMessage(
                        'Do you belong to Hyderabad Karnataka Region (371J certificate)?',
                        'bot',
                        ['Yes', 'No']
                    );
                }, 500);
                break;

            case RegistrationStep.HK_REGION:
                const hasHKRegion = input.toLowerCase() === 'yes';
                setHK(hasHKRegion);

                // Calculate and show all eligible categories
                const eligibleCategories = calculateCategories();

                // Check if UGCET is selected for SNQ Quota check AND Engineering is selected
                if (selectedCounsellingTypes.includes(CounsellingType.UGCET) && ugcetCourses.includes('Engineering and Technology')) {
                    goToStep(RegistrationStep.SNQ_QUOTA);
                    setTimeout(() => {
                        addMessage(
                            '💰 Do you want to claim SNQ (Supernumerary Quota)?\n\n(For candidates with annual family income less than Rs. 6 Lakhs)',
                            'bot',
                            ['Yes', 'No']
                        );
                    }, 500);
                } else {
                    // Skip to Special Categories
                    goToStep(RegistrationStep.SPECIAL_CATEGORIES);
                    setTimeout(() => {
                        addMessage('🌟 Do you have any Special Category reservations?', 'bot');
                        setMultiSelectTitle('Select Special Categories (if any)');
                        setMultiSelectOptions(SPECIAL_CATEGORIES_LIST.map(c => `${c.code} - ${c.label}`));
                        setMultiSelectType('SPECIAL_CATEGORIES');
                        setMultiSelectAllowSkip(true);
                        setShowMultiSelect(true);
                    }, 500);
                }
                break;

            case RegistrationStep.SNQ_QUOTA:
                if (input.toLowerCase() === 'yes') {
                    setSnqApplied(true);
                    goToStep(RegistrationStep.SNQ_SLAB_SELECTION);
                    setTimeout(() => {
                        addMessage('📊 Select your Income Slab:', 'bot');
                        setMultiSelectTitle('Select Income Slab');
                        setMultiSelectOptions([
                            'Slab 1: <Rs 1 lakh',
                            'Slab 2: Rs 1 lakh – 2 lakh',
                            'Slab 3: Rs 2 lakh – 3 lakh',
                            'Slab 4: Rs 3 lakh – 4.5 lakh',
                            'Slab 5: Rs 4.5 lakh – 6 lakh'
                        ]);
                        setMultiSelectType('SNQ_SLAB_SELECTION');
                        setShowMultiSelect(true);
                        // Note: MultiSelect is used but we treat it as single select effectively by just taking the selection
                    }, 500);
                } else {
                    setSnqApplied(false);
                    // Move to Special Categories
                    goToStep(RegistrationStep.SPECIAL_CATEGORIES);
                    setTimeout(() => {
                        addMessage('🌟 Do you have any Special Category reservations?', 'bot');
                        setMultiSelectTitle('Select Special Categories (if any)');
                        setMultiSelectOptions(SPECIAL_CATEGORIES_LIST.map(c => `${c.code} - ${c.label}`));
                        setMultiSelectType('SPECIAL_CATEGORIES');
                        setMultiSelectAllowSkip(true);
                        setShowMultiSelect(true);
                    }, 500);
                }
                break;

            case RegistrationStep.SNQ_SLAB_SELECTION:
                // Fallback if they type instead of select
                if (input.includes('Slab')) {
                    setIncomeSlab(input);
                    goToStep(RegistrationStep.SPECIAL_CATEGORIES);
                    setTimeout(() => {
                        addMessage('🌟 Do you have any Special Category reservations?', 'bot');
                        setMultiSelectTitle('Select Special Categories (if any)');
                        setMultiSelectOptions(SPECIAL_CATEGORIES_LIST.map(c => `${c.code} - ${c.label}`));
                        setMultiSelectType('SPECIAL_CATEGORIES');
                        setMultiSelectAllowSkip(true);
                        setShowMultiSelect(true);
                    }, 500);
                } else {
                    addMessage('Please select an income slab from the list.', 'bot');
                }
                break;

            case RegistrationStep.SPECIAL_CATEGORIES:
                if (input === 'None') {
                    if (selectedCounsellingTypes.includes(CounsellingType.UGNEET)) {
                        goToStep(RegistrationStep.UGNEET_SPECIAL_CATEGORIES);
                        setTimeout(() => {
                            addMessage('🌟 Do you belong to any of these Special Categories? (UGNEET)', 'bot');
                            setMultiSelectTitle('Select UGNEET Special Categories');
                            setMultiSelectOptions(UGNEET_SPECIAL_CATEGORIES_LIST.map(c => `${c.code} - ${c.label}`));
                            setMultiSelectType('UGNEET_SPECIAL_CATEGORIES');
                            setMultiSelectAllowSkip(true);
                            setShowMultiSelect(true);
                        }, 500);
                    } else {
                        // Start summary
                        goToStep(RegistrationStep.CATEGORY_SUMMARY);
                        setTimeout(() => {
                            addMessage('Type "Confirm" to proceed to summary.', 'bot', ['Confirm']);
                        }, 500);
                    }
                } else if (input === 'Done') {
                    if (selectedCounsellingTypes.includes(CounsellingType.UGNEET)) {
                        goToStep(RegistrationStep.UGNEET_SPECIAL_CATEGORIES);
                        setTimeout(() => {
                            addMessage('🌟 Do you belong to any of these Special Categories? (UGNEET)', 'bot');
                            setMultiSelectTitle('Select UGNEET Special Categories');
                            setMultiSelectOptions(UGNEET_SPECIAL_CATEGORIES_LIST.map(c => `${c.code} - ${c.label}`));
                            setMultiSelectType('UGNEET_SPECIAL_CATEGORIES');
                            setMultiSelectAllowSkip(true);
                            setShowMultiSelect(true);
                        }, 500);
                    } else {
                        // Start summary
                        goToStep(RegistrationStep.CATEGORY_SUMMARY);
                        setTimeout(() => {
                            addMessage('Type "Confirm" to proceed to summary.', 'bot', ['Confirm']);
                        }, 500);
                    }
                } else if (SPECIAL_CATEGORIES_LIST.some(c => c.code === input)) {
                    if (specialCategories.includes(input as SpecialCategory)) {
                        removeSpecialCategory(input as SpecialCategory);
                        addMessage(
                            `Removed ${input}. Select more or type "Done".`,
                            'bot',
                            [...SPECIAL_CATEGORIES_LIST.map(c => c.code).filter(c => !specialCategories.includes(c as any) || c === input), 'Done']
                        );
                    } else {
                        addSpecialCategory(input as SpecialCategory);
                        addMessage(
                            `Added ${input}. Select more or type "Done".`,
                            'bot',
                            [...SPECIAL_CATEGORIES_LIST.map(c => c.code).filter(c => !specialCategories.includes(c as any) && c !== input), 'Done']
                        );
                    }
                }
                break;

            case RegistrationStep.CATEGORY_SUMMARY:
                if (input.toLowerCase() === 'confirm') {
                    goToStep(RegistrationStep.SUMMARY);
                    setTimeout(() => {
                        showSummary();
                    }, 500);
                }
                break;

            case RegistrationStep.SUMMARY:
                if (input.toLowerCase() === 'confirm') {
                    try {
                        const studentId = await completeRegistration();
                        goToStep(RegistrationStep.COMPLETE);
                        setTimeout(() => {
                            addMessage('🎉 Registration complete! Let\'s generate your personalized college list.', 'bot');
                            setTimeout(() => {
                                navigation.navigate('OptionList', { studentId });
                            }, 1500);
                        }, 500);
                    } catch (error: any) {
                        console.error('Registration error:', error);
                        addMessage(`Sorry, there was an error: ${error?.message || 'Unknown error'}. Please try again.`, 'bot');
                    }
                } else {
                    addMessage('Please type "Confirm" to proceed.', 'bot', ['Confirm']);
                }
                break;
        }
    };

    const startSeatTypeCollection = (courses: string[]) => {
        // Store courses to collect seat types for
        (window as any).pendingSeatTypeCourses = courses;

        if (courses.length > 0) {
            const firstCourse = courses[0];
            setCurrentUGNEETCourse(firstCourse);
            goToStep(RegistrationStep.SEAT_TYPES);

            setTimeout(() => {
                addMessage(`🏥 Select seat types for ${firstCourse}:`, 'bot');
                setMultiSelectTitle(`Select Seat Types for ${firstCourse}`);
                setMultiSelectOptions(SEAT_TYPES.map(st => st.label));
                setMultiSelectType('SEAT_TYPES');
                setShowMultiSelect(true);
            }, 500);
        }
    };

    const continueSeatTypeCollection = (justFinishedCourse: string) => {
        const courses = (window as any).pendingSeatTypeCourses || [];
        // Filter out the course we just finished
        // Note: we can't just slice because we need to be robust
        const remainingCourses = courses.filter((c: string) => c !== justFinishedCourse && !ugneetCourses.some(saved => saved.course === c));

        // Also simpler: strict order based on index is better if names are unique.
        // But here we can just look for the *next* course in the list that hasn't been processed
        // actually, let's just use the filtered list approach, assuming names are unique (they are)

        // Better approach: find index of justFinished and take next
        const currentIndex = courses.indexOf(justFinishedCourse);
        if (currentIndex !== -1 && currentIndex < courses.length - 1) {
            const nextCourse = courses[currentIndex + 1];
            setCurrentUGNEETCourse(nextCourse);
            // We are already in SEAT_TYPES step

            setTimeout(() => {
                addMessage(`🏥 Select seat types for ${nextCourse}:`, 'bot');
                setMultiSelectTitle(`Select Seat Types for ${nextCourse}`);
                setMultiSelectOptions(SEAT_TYPES.map(st => st.label));
                setMultiSelectType('SEAT_TYPES');
                setShowMultiSelect(true);
            }, 500);
        } else {
            // Done with all seat types
            delete (window as any).pendingSeatTypeCourses;

            // Get pending UGCET courses and collect ranks
            const ugcetCoursesForRanks = (window as any).pendingUGCETCourses || [];
            delete (window as any).pendingUGCETCourses;

            // Now collect ranks for UGCET courses (if any) before moving to NEET AIR
            startRankCollection(ugcetCoursesForRanks);
        }
    };

    const startRankCollection = (coursesOverride?: string[]) => {
        // Collect ranks for UGCET courses only (not individual Farm Science courses)
        // Farm Science is treated as a single course
        // Use override if provided (for immediate use after multi-select before state updates)
        const coursesToCollectRanks = coursesOverride || ugcetCourses;

        if (coursesToCollectRanks.length > 0) {
            const firstCourse = coursesToCollectRanks[0];
            setCurrentRankCourse(firstCourse);
            // Store the courses we need to collect ranks for
            setCollectedRankCourses([]);
            (window as any).pendingRankCourses = coursesToCollectRanks;
            goToStep(RegistrationStep.COURSE_RANKS);

            const needsPractical = requiresPracticalRank(firstCourse);
            setNeedsPracticalRank(needsPractical);

            setTimeout(() => {
                addMessage(
                    `🎯 What's your rank for ${firstCourse}?`,
                    'bot'
                );
            }, 500);
        } else if (selectedCounsellingTypes.includes(CounsellingType.UGNEET)) {
            // No UGCET courses, go to NEET AIR
            goToStep(RegistrationStep.NEET_AIR);
            setTimeout(() => {
                addMessage('🎯 What\'s your NEET All India Rank (AIR)?', 'bot');
            }, 500);
        } else {
            // No courses at all, go to category
            goToStep(RegistrationStep.CATEGORY_BASE);
            setTimeout(() => {
                addMessage(
                    '📋 Select your base category:',
                    'bot',
                    BASE_CATEGORIES.map(c => `${c.code} - ${c.label}`)
                );
            }, 500);
        }
    };

    const continueRankCollection = (justCollectedCourse?: string) => {
        // Use the pending courses we stored earlier, or fall back to context state
        const coursesToCollectRanks = (window as any).pendingRankCourses || ugcetCourses;
        const remainingCourses = coursesToCollectRanks.filter((c: string) =>
            !collectedRankCourses.includes(c) && c !== justCollectedCourse
        );

        if (remainingCourses.length > 0) {
            const nextCourse = remainingCourses[0];
            setCurrentRankCourse(nextCourse);
            goToStep(RegistrationStep.COURSE_RANKS);

            const needsPractical = requiresPracticalRank(nextCourse);
            setNeedsPracticalRank(needsPractical);

            setTimeout(() => {
                addMessage(
                    `🎯 What's your rank for ${nextCourse}?`,
                    'bot'
                );
            }, 500);
        } else if (selectedCounsellingTypes.includes(CounsellingType.UGNEET)) {
            // All UGCET ranks collected, now get NEET AIR
            delete (window as any).pendingRankCourses;
            goToStep(RegistrationStep.NEET_AIR);
            setTimeout(() => {
                addMessage('🎯 What\'s your NEET All India Rank (AIR)?', 'bot');
            }, 500);
        } else {
            // All ranks collected, move to category
            delete (window as any).pendingRankCourses;
            goToStep(RegistrationStep.CATEGORY_BASE);
            setTimeout(() => {
                addMessage(
                    '📋 Select your base category:',
                    'bot',
                    BASE_CATEGORIES.map(c => `${c.code} - ${c.label}`)
                );
            }, 500);
        }
    };

    const showSummary = () => {
        const eligibleCategories = calculateCategories();

        let summary = `📝 **Your Profile Summary**\n\n`;
        summary += `👤 Name: ${studentData.name}\n`;
        summary += `📱 Mobile: ${studentData.mobile}\n`;
        summary += `📧 Email: ${studentData.email}\n\n`;

        summary += `🎓 Counselling: ${selectedCounsellingTypes.join(', ')}\n\n`;

        if (ugcetCourses.length > 0) {
            summary += `📚 UGCET Courses:\n${ugcetCourses.map(c => `  • ${c}`).join('\n')}\n`;
        }

        if (farmScienceCourses.length > 0) {
            summary += `🌾 Farm Science Courses:\n${farmScienceCourses.map(c => `  • ${c}`).join('\n')}\n`;
        }

        if (ugneetCourses.length > 0) {
            summary += `🏥 UGNEET Courses:\n${ugneetCourses.map(c => `  • ${c.course} (${c.seatTypes.join(', ')})`).join('\n')}\n`;
        }

        if (ugneetSpecialCategories.length > 0) {
            summary += `\n🌟 UGNEET Special Categories:\n${ugneetSpecialCategories.map(c => `  • ${c} - ${UGNEET_SPECIAL_CATEGORIES_LIST.find(s => s.code === c)?.label}`).join('\n')}\n`;
        }

        if (courseRanks.length > 0) {
            summary += `\n🎯 Ranks:\n${courseRanks.map(r => {
                if (r.courseName === 'Architecture') {
                    return `  • Architecture: ${r.rank} (NATA Rank)`;
                }
                return `  • ${r.courseName}: ${r.rank}${r.practicalRank ? ` (Practical: ${r.practicalRank})` : ''}`;
            }).join('\n')}\n`;
        }

        if (studentData.neetAIR) {
            summary += `\n🎯 NEET AIR: ${studentData.neetAIR}\n`;
        }

        summary += `\n📋 Base Category: ${studentData.baseCategory}\n`;
        summary += `${studentData.hasKannada ? '✓ Kannada Reservation\n' : ''}`;
        summary += `${studentData.hasRural ? '✓ Rural Reservation\n' : ''}`;
        summary += `${studentData.hasHK ? '✓ HK Region\n' : ''}`;

        // SNQ Status
        if (selectedCounsellingTypes.includes(CounsellingType.UGCET)) {
            if (snqApplied) {
                summary += `✓ SNQ Quota Applied\n`;
                if (incomeSlab) summary += `  - Income: ${incomeSlab}\n`;
            } else {
                summary += `• SNQ Quota: No\n`;
            }
        }

        const categoriesList = formatCategoryDisplay(eligibleCategories).split('\n').map(c => `  • ${c}`).join('\n');
        summary += `\n✅ Eligible Categories (${eligibleCategories.length}):\n${categoriesList}\n`;

        if (specialCategories.length > 0) {
            summary += `\n🌟 Special Categories:\n${specialCategories.map(c => `  • ${c} - ${SPECIAL_CATEGORIES_LIST.find(s => s.code === c)?.label}`).join('\n')}\n`;
        }

        summary += `\nType "Confirm" to complete registration.`;

        addMessage(summary, 'bot', ['Confirm']);
    };

    const lastMessage = messages[messages.length - 1];
    const showQuickReplies = lastMessage?.role === 'bot' && lastMessage?.options;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#131314" />

            {/* BharatMinds AI Counsellor Header */}
            <LinearGradient
                colors={['#1A1A1B', '#131314']}
                style={styles.header}
            >
                <TouchableOpacity style={styles.headerButton}>
                    <Ionicons name="menu-outline" size={26} color="#E3E3E3" />
                </TouchableOpacity>
                <View style={styles.brandContainer}>
                    <Ionicons name="sparkles" size={22} color="#4285F4" />
                    <Text style={styles.headerTitle}>BharatMinds</Text>
                    <Text style={styles.headerSubtitle}>AI Counsellor</Text>
                </View>
                <View style={{ flex: 1 }} />
                <TouchableOpacity style={styles.headerButton}>
                    <Ionicons name="person-circle-outline" size={26} color="#E3E3E3" />
                </TouchableOpacity>
            </LinearGradient>

            <View style={styles.content}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardView}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
                >
                    <ScrollView
                        ref={scrollViewRef}
                        style={styles.messagesContainer}
                        contentContainerStyle={styles.messagesContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {messages.length === 0 ? (
                            <View style={styles.emptyStateContainer}>
                                <LinearGradient
                                    colors={['#4285F4', '#34A853', '#FBBC04']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.emptyStateIcon}
                                >
                                    <Ionicons name="sparkles" size={32} color="#FFFFFF" />
                                </LinearGradient>
                                <Text style={styles.emptyStateGreeting}>Hello!</Text>
                                <Text style={styles.emptyStateText}>Welcome to BharatMinds AI Counsellor</Text>
                                <Text style={styles.emptyStateSubtext}>Let's help you find your perfect college</Text>
                            </View>
                        ) : (
                            messages.map((message) => (
                                <MessageBubble key={message.id} message={message} />
                            ))
                        )}
                    </ScrollView>

                    {showQuickReplies && !showMultiSelect && (
                        <QuickReply
                            options={lastMessage.options!}
                            onSelect={handleUserInput}
                        />
                    )}

                    {showMultiSelect && (
                        <MultiSelect
                            options={multiSelectOptions}
                            title={multiSelectTitle}
                            allowSkip={multiSelectAllowSkip}
                            onConfirm={(selected) => {
                                setShowMultiSelect(false);
                                setMultiSelectAllowSkip(false); // Reset
                                handleMultiSelectConfirm(selected);
                            }}
                        />
                    )}

                    <ChatInput
                        onSend={handleUserInput}
                        placeholder="Type a message..."
                        disabled={currentStep === RegistrationStep.COMPLETE || showMultiSelect}
                    />
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#131314', // Gemini Dark
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#2A2A2B',
    },
    brandContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
        gap: 6,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#E3E3E3',
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    },
    headerSubtitle: {
        fontSize: 14,
        fontWeight: '400',
        color: '#4285F4',
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    },
    headerButton: {
        padding: 4,
    },
    content: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    messagesContainer: {
        flex: 1,
    },
    messagesContent: {
        paddingVertical: 16,
        paddingBottom: 8,
    },
    emptyStateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    emptyStateIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#4285F4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    },
    emptyStateGreeting: {
        fontSize: 32,
        fontWeight: '700',
        color: '#E8EAED',
        marginTop: 24,
    },
    emptyStateText: {
        fontSize: 18,
        fontWeight: '500',
        marginTop: 8,
        color: '#BDC1C6',
    },
    emptyStateSubtext: {
        fontSize: 15,
        color: '#9AA0A6',
        marginTop: 8,
    },
});
