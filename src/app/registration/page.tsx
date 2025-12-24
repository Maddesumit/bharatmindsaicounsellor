'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useRegistration } from '@/lib/RegistrationContext';
import MessageBubble from '@/components/chat/MessageBubble';
import ChatInput from '@/components/chat/ChatInput';
import QuickReply from '@/components/chat/QuickReply';
import MultiSelect from '@/components/chat/MultiSelect';
import { RegistrationStep, CounsellingType } from '@/types';
import {
    UGCET_COURSES,
    FARM_SCIENCE_COURSES,
    UGNEET_COURSES,
    SEAT_TYPES,
    getCourseCode,
    requiresPracticalRank
} from '@/services/counselling';
import {
    BASE_CATEGORIES,
    SPECIAL_CATEGORIES_LIST,
    UGNEET_SPECIAL_CATEGORIES_LIST
} from '@/services/counselling';

export default function RegistrationPage() {
    const router = useRouter();
    const {
        currentStep,
        messages,
        selectedCounsellingTypes,
        ugcetCourses,
        farmScienceCourses,
        ugneetCourses,
        courseRanks,
        specialCategories,
        ugneetSpecialCategories,
        snqApplied,
        incomeSlab,
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
        setSnqApplied,
        setIncomeSlab,
        addSpecialCategory,
        addUgneetSpecialCategory,
        calculateCategories,
        completeRegistration,
        initializeUser
    } = useRegistration();

    const scrollViewRef = useRef<HTMLDivElement>(null);
    const [showMultiSelect, setShowMultiSelect] = React.useState(false);
    const [multiSelectOptions, setMultiSelectOptions] = React.useState<string[]>([]);
    const [multiSelectTitle, setMultiSelectTitle] = React.useState('');
    const [multiSelectType, setMultiSelectType] = React.useState('');
    const [multiSelectAllowSkip, setMultiSelectAllowSkip] = React.useState(false);
    const [currentUGNEETCourse, setCurrentUGNEETCourse] = React.useState('');
    const [currentRankCourse, setCurrentRankCourse] = React.useState('');
    const [needsPracticalRank, setNeedsPracticalRank] = React.useState(false);
    const [collectedRankCourses, setCollectedRankCourses] = React.useState<string[]>([]);

    useEffect(() => {
        initializeUser();
    }, []);

    useEffect(() => {
        // Auto-scroll to bottom when new messages arrive
        setTimeout(() => {
            scrollViewRef.current?.scrollTo({
                top: scrollViewRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
    }, [messages]);

    const handleMultiSelectConfirm = (selected: string[]) => {
        setShowMultiSelect(false);

        switch (multiSelectType) {
            case 'UGCET_COURSES':
                selected.forEach(course => {
                    if (UGCET_COURSES.includes(course as any)) {
                        addUGCETCourse(course as any);
                    }
                });
                addMessage(`✅ Added ${selected.length} course(s)`, 'bot');

                if (selectedCounsellingTypes.includes(CounsellingType.UGNEET)) {
                    goToStep(RegistrationStep.UGNEET_COURSES);
                    setTimeout(() => {
                        addMessage('🏥 Now select your UGNEET courses:', 'bot');
                        setMultiSelectTitle('Select UGNEET Courses');
                        setMultiSelectOptions([...UGNEET_COURSES]);
                        setMultiSelectType('UGNEET_COURSES');
                        setShowMultiSelect(true);
                    }, 600);
                } else {
                    startRankCollection(selected);
                }
                break;

            case 'UGNEET_COURSES':
                if (selected.length > 0) {
                    addMessage(`✅ Selected UGNEET courses: ${selected.join(', ')}`, 'bot');
                    startSeatTypeCollection(selected);
                }
                break;

            case 'SEAT_TYPES':
                const seatTypeCodes = selected.map(label => {
                    const st = SEAT_TYPES.find(s => s.label === label);
                    return st?.code;
                }).filter(Boolean);

                if (currentUGNEETCourse) {
                    addUGNEETCourse(currentUGNEETCourse as any, seatTypeCodes as any);
                    addMessage(`✅ Added ${currentUGNEETCourse}`, 'bot');
                }
                continueSeatTypeCollection(currentUGNEETCourse);
                break;

            case 'CATEGORY_RESERVATIONS':
                if (selected.includes('Kannada')) setKannada(true);
                if (selected.includes('Rural')) setRural(true);
                addMessage(`✅ Reservations: ${selected.length > 0 ? selected.join(' & ') : 'None'}`, 'bot');

                goToStep(RegistrationStep.HK_REGION);
                setTimeout(() => {
                    addMessage('Do you belong to Hyderabad Karnataka Region (371J certificate)?', 'bot', ['Yes', 'No']);
                }, 500);
                break;

            case 'SPECIAL_CATEGORIES':
                selected.forEach(option => {
                    const catCode = option.split(' - ')[0];
                    if (SPECIAL_CATEGORIES_LIST.some(c => c.code === catCode)) {
                        addSpecialCategory(catCode as any);
                    }
                });
                addMessage(selected.length > 0 ? `✅ Added special categories` : '✅ No special categories', 'bot');

                if (selectedCounsellingTypes.includes(CounsellingType.UGNEET)) {
                    goToStep(RegistrationStep.UGNEET_SPECIAL_CATEGORIES);
                    setTimeout(() => {
                        addMessage('🌟 UGNEET Special Categories?', 'bot');
                        setMultiSelectTitle('Select UGNEET Special Categories');
                        setMultiSelectOptions(UGNEET_SPECIAL_CATEGORIES_LIST.map(c => `${c.code} - ${c.label}`));
                        setMultiSelectType('UGNEET_SPECIAL_CATEGORIES');
                        setMultiSelectAllowSkip(true);
                        setShowMultiSelect(true);
                    }, 500);
                } else {
                    showSummary();
                }
                break;

            case 'UGNEET_SPECIAL_CATEGORIES':
                selected.forEach(option => {
                    const catCode = option.split(' - ')[0];
                    addUgneetSpecialCategory(catCode as any);
                });
                addMessage('✅ Categories saved', 'bot');
                showSummary();
                break;
        }
    };

    const startSeatTypeCollection = (courses: string[]) => {
        if (courses.length === 0) return;
        const firstCourse = courses[0];
        setCurrentUGNEETCourse(firstCourse);

        setTimeout(() => {
            addMessage(`For ${firstCourse}, select seat types:`, 'bot');
            setMultiSelectTitle('Select Seat Types');
            setMultiSelectOptions(SEAT_TYPES.map(st => st.label));
            setMultiSelectType('SEAT_TYPES');
            setShowMultiSelect(true);
        }, 500);
    };

    const continueSeatTypeCollection = (completedCourse: string) => {
        // Implementation for continuing seat type collection
        goToStep(RegistrationStep.NEET_AIR);
        setTimeout(() => {
            addMessage('🎯 What\'s your NEET All India Rank (AIR)?', 'bot');
        }, 500);
    };

    const startRankCollection = (courses: string[]) => {
        if (courses.length === 0) {
            if (selectedCounsellingTypes.includes(CounsellingType.UGNEET)) {
                goToStep(RegistrationStep.NEET_AIR);
                setTimeout(() => {
                    addMessage('🎯 What\'s your NEET All India Rank (AIR)?', 'bot');
                }, 500);
            }
            return;
        }

        const firstCourse = courses[0];
        setCurrentRankCourse(firstCourse);
        setNeedsPracticalRank(requiresPracticalRank(firstCourse));

        goToStep(RegistrationStep.COURSE_RANKS);
        setTimeout(() => {
            addMessage(`What's your rank for ${firstCourse}?`, 'bot');
        }, 500);
    };

    const showSummary = () => {
        goToStep(RegistrationStep.CATEGORY_SUMMARY);
        const categories = calculateCategories();

        setTimeout(() => {
            addMessage(
                `📋 Your Profile Summary:\n\nEligible Categories: ${categories.join(', ')}\n\nType "Confirm" to complete registration.`,
                'bot',
                ['Confirm']
            );
        }, 500);
    };

    const handleUserInput = async (input: string) => {
        addMessage(input, 'user');

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
                    addMessage('🎓 Which counselling are you interested in?', 'bot', ['UGCET', 'UGNEET', 'Both UGCET & UGNEET']);
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
                } else if (input === 'Both UGCET & UGNEET') {
                    addCounsellingType(CounsellingType.UGCET);
                    addCounsellingType(CounsellingType.UGNEET);
                    goToStep(RegistrationStep.UGCET_COURSES);
                    setTimeout(() => {
                        addMessage('📚 Let\'s start with UGCET courses:', 'bot');
                        setMultiSelectTitle('Select UGCET Courses');
                        setMultiSelectOptions([...UGCET_COURSES]);
                        setMultiSelectType('UGCET_COURSES');
                        setShowMultiSelect(true);
                    }, 500);
                }
                break;

            case RegistrationStep.COURSE_RANKS:
                const rank = parseInt(input, 10);
                if (isNaN(rank) || rank < 1) {
                    addMessage('Please enter a valid rank.', 'bot');
                    return;
                }

                const courseCode = getCourseCode(currentRankCourse);
                addCourseRank({
                    courseCode,
                    courseName: currentRankCourse,
                    rank,
                });

                setCollectedRankCourses([...collectedRankCourses, currentRankCourse]);

                // Continue to NEET AIR or category selection
                if (selectedCounsellingTypes.includes(CounsellingType.UGNEET)) {
                    goToStep(RegistrationStep.NEET_AIR);
                    setTimeout(() => {
                        addMessage('🎯 What\'s your NEET All India Rank (AIR)?', 'bot');
                    }, 500);
                } else {
                    goToStep(RegistrationStep.CATEGORY_BASE);
                    setTimeout(() => {
                        addMessage('📋 Select your base category:', 'bot', BASE_CATEGORIES.map(c => `${c.code} - ${c.label}`));
                    }, 500);
                }
                break;

            case RegistrationStep.NEET_AIR:
                const neetRank = parseInt(input, 10);
                if (isNaN(neetRank) || neetRank < 1) {
                    addMessage('Please enter a valid NEET All India Rank.', 'bot');
                    return;
                }
                updateStudentData({ neetAIR: neetRank });

                goToStep(RegistrationStep.CATEGORY_BASE);
                setTimeout(() => {
                    addMessage('📋 Select your base category:', 'bot', BASE_CATEGORIES.map(c => `${c.code} - ${c.label}`));
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

            case RegistrationStep.HK_REGION:
                const hasHKRegion = input.toLowerCase() === 'yes';
                setHK(hasHKRegion);

                if (selectedCounsellingTypes.includes(CounsellingType.UGCET) && ugcetCourses.includes('Engineering and Technology')) {
                    goToStep(RegistrationStep.SNQ_QUOTA);
                    setTimeout(() => {
                        addMessage('💰 Do you want to claim SNQ (Supernumerary Quota)?', 'bot', ['Yes', 'No']);
                    }, 500);
                } else {
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
                    addMessage('Please enter your income slab', 'bot', [
                        'Slab 1: <Rs 1 lakh',
                        'Slab 2: Rs 1-2 lakh',
                        'Slab 3: Rs 2-3 lakh',
                        'Slab 4: Rs 3-4.5 lakh',
                        'Slab 5: Rs 4.5-6 lakh'
                    ]);
                } else {
                    setSnqApplied(false);
                    goToStep(RegistrationStep.SPECIAL_CATEGORIES);
                    setTimeout(() => {
                        addMessage('🌟 Special categories?', 'bot');
                        setMultiSelectTitle('Select Special Categories');
                        setMultiSelectOptions(SPECIAL_CATEGORIES_LIST.map(c => `${c.code} - ${c.label}`));
                        setMultiSelectType('SPECIAL_CATEGORIES');
                        setMultiSelectAllowSkip(true);
                        setShowMultiSelect(true);
                    }, 500);
                }
                break;

            case RegistrationStep.CATEGORY_SUMMARY:
                if (input.toLowerCase() === 'confirm') {
                    try {
                        const studentId = await completeRegistration();
                        addMessage('✅ Registration complete! Redirecting to your option list...', 'bot');
                        setTimeout(() => {
                            router.push('/option-list');
                        }, 2000);
                    } catch (error: any) {
                        addMessage(`❌ Error: ${error.message}`, 'bot');
                    }
                }
                break;
        }
    };

    const lastMessage = messages[messages.length - 1];
    const showQuickReplies = lastMessage?.role === 'bot' && lastMessage?.options && !showMultiSelect;

    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Header */}
            <div className="bg-gray-900 bg-opacity-50 backdrop-blur-sm border-b border-gray-700 px-4 py-3">
                <h1 className="text-xl font-bold text-white">BharatMinds AI Counsellor</h1>
                <p className="text-sm text-gray-400">Chat-based Registration</p>
            </div>

            {/* Messages */}
            <div ref={scrollViewRef} className="flex-1 overflow-y-auto">
                {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                ))}
            </div>

            {/* Quick Replies */}
            {showQuickReplies && (
                <QuickReply
                    options={lastMessage.options!}
                    onSelect={handleUserInput}
                />
            )}

            {/* Multi Select */}
            {showMultiSelect && (
                <MultiSelect
                    options={multiSelectOptions}
                    onConfirm={handleMultiSelectConfirm}
                    title={multiSelectTitle}
                    allowSkip={multiSelectAllowSkip}
                />
            )}

            {/* Chat Input */}
            <ChatInput
                onSend={handleUserInput}
                placeholder="Type your message..."
                disabled={showMultiSelect}
            />
        </div>
    );
}
