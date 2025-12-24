import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import CollegeCard from '../../components/College/CollegeCard';
import { loadCutoffData } from '../../services/dataLoader';
import { generateOptionList } from '../../services/optionListAlgorithm';
import { generateAndSharePDF } from '../../services/pdfGenerator';
import { getStudent } from '../../services/studentService';
import { Student, OptionList, ScoredCollege } from '../../types';

export default function OptionListScreen({ route, navigation }: any) {
    const { studentId } = route.params;
    const [student, setStudent] = useState<Student | null>(null);
    const [optionList, setOptionList] = useState<OptionList | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedTier, setSelectedTier] = useState<'all' | 'safe' | 'target' | 'reach'>('all');
    const [generatingPDF, setGeneratingPDF] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);

            // Load student data
            const studentData = await getStudent(studentId);
            if (!studentData) {
                Alert.alert('Error', 'Student data not found');
                navigation.goBack();
                return;
            }
            setStudent(studentData);

            // Load cutoff data
            const cutoffs = await loadCutoffData();

            // Generate option list
            const list = generateOptionList(studentData, cutoffs);
            setOptionList(list);
        } catch (error) {
            console.error('Error loading data:', error);
            Alert.alert('Error', 'Failed to load college data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleExportPDF = async () => {
        if (!student || !optionList) return;

        try {
            setGeneratingPDF(true);
            await generateAndSharePDF(student, optionList);
        } catch (error) {
            console.error('Error generating PDF:', error);
            Alert.alert('Error', 'Failed to generate PDF. Please try again.');
        } finally {
            setGeneratingPDF(false);
        }
    };

    const getFilteredColleges = (): ScoredCollege[] => {
        if (!optionList) return [];

        switch (selectedTier) {
            case 'safe':
                return optionList.safe;
            case 'target':
                return optionList.target;
            case 'reach':
                return optionList.reach;
            default:
                return [...optionList.safe, ...optionList.target, ...optionList.reach];
        }
    };

    const getTotalCount = () => {
        if (!optionList) return 0;
        return optionList.safe.length + optionList.target.length + optionList.reach.length;
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6366F1" />
                <Text style={styles.loadingText}>Generating your personalized college list...</Text>
            </View>
        );
    }

    const filteredColleges = getFilteredColleges();

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#1F2937', '#111827']} style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle}>Your Option List</Text>
                        <Text style={styles.headerSubtitle}>{getTotalCount()} colleges found</Text>
                    </View>
                    <TouchableOpacity
                        onPress={handleExportPDF}
                        style={styles.pdfButton}
                        disabled={generatingPDF}
                    >
                        {generatingPDF ? (
                            <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                            <Ionicons name="download-outline" size={24} color="#FFFFFF" />
                        )}
                    </TouchableOpacity>
                </View>

                {/* Tier Filter */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.filterContainer}
                    contentContainerStyle={styles.filterContent}
                >
                    <TouchableOpacity
                        style={[styles.filterChip, selectedTier === 'all' && styles.filterChipActive]}
                        onPress={() => setSelectedTier('all')}
                    >
                        <Text style={[styles.filterText, selectedTier === 'all' && styles.filterTextActive]}>
                            All ({getTotalCount()})
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.filterChip, selectedTier === 'safe' && styles.filterChipActiveSafe]}
                        onPress={() => setSelectedTier('safe')}
                    >
                        <Text style={[styles.filterText, selectedTier === 'safe' && styles.filterTextActive]}>
                            Safe ({optionList?.safe.length || 0})
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.filterChip, selectedTier === 'target' && styles.filterChipActiveTarget]}
                        onPress={() => setSelectedTier('target')}
                    >
                        <Text style={[styles.filterText, selectedTier === 'target' && styles.filterTextActive]}>
                            Target ({optionList?.target.length || 0})
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.filterChip, selectedTier === 'reach' && styles.filterChipActiveReach]}
                        onPress={() => setSelectedTier('reach')}
                    >
                        <Text style={[styles.filterText, selectedTier === 'reach' && styles.filterTextActive]}>
                            Reach ({optionList?.reach.length || 0})
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </LinearGradient>

            <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
                {filteredColleges.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="school-outline" size={64} color="#9CA3AF" />
                        <Text style={styles.emptyText}>No colleges found in this tier</Text>
                    </View>
                ) : (
                    filteredColleges.map((college, index) => (
                        <CollegeCard
                            key={`${college.collegeCode}-${college.courseCode}-${college.category}-${index}`}
                            college={college}
                            onPress={() => {
                                // Navigate to college details (to be implemented)
                                Alert.alert(
                                    college.collegeName,
                                    `Branch: ${college.courseName}\nCategory: ${college.category}\nCutoff: ${college.cutoffRank}\nProbability: ${(college.probability * 100).toFixed(0)}%`
                                );
                            }}
                        />
                    ))
                )}
                <View style={styles.bottomPadding} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#6B7280',
    },
    header: {
        paddingTop: 12,
        paddingBottom: 16,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    backButton: {
        padding: 8,
    },
    headerTextContainer: {
        flex: 1,
        marginLeft: 8,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#D1D5DB',
        marginTop: 2,
    },
    pdfButton: {
        padding: 8,
    },
    filterContainer: {
        paddingHorizontal: 16,
    },
    filterContent: {
        gap: 8,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    filterChipActive: {
        backgroundColor: '#6366F1',
        borderColor: '#6366F1',
    },
    filterChipActiveSafe: {
        backgroundColor: '#10B981',
        borderColor: '#10B981',
    },
    filterChipActiveTarget: {
        backgroundColor: '#F59E0B',
        borderColor: '#F59E0B',
    },
    filterChipActiveReach: {
        backgroundColor: '#EF4444',
        borderColor: '#EF4444',
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    filterTextActive: {
        color: '#FFFFFF',
    },
    listContainer: {
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 64,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 16,
        color: '#9CA3AF',
    },
    bottomPadding: {
        height: 32,
    },
});
