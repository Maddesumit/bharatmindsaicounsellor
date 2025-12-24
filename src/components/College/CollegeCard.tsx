import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScoredCollege } from '../../types';
import { Ionicons } from '@expo/vector-icons';

interface CollegeCardProps {
    college: ScoredCollege;
    onPress: () => void;
}

export default function CollegeCard({ college, onPress }: CollegeCardProps) {
    const getTierColor = (): [string, string] => {
        switch (college.tier) {
            case 'safe':
                return ['#10B981', '#059669'];
            case 'target':
                return ['#F59E0B', '#D97706'];
            case 'reach':
                return ['#EF4444', '#DC2626'];
            default:
                return ['#6366F1', '#4F46E5'];
        }
    };

    const getTierLabel = () => {
        switch (college.tier) {
            case 'safe':
                return 'SAFE';
            case 'target':
                return 'TARGET';
            case 'reach':
                return 'REACH';
            default:
                return '';
        }
    };

    const getTierIcon = () => {
        switch (college.tier) {
            case 'safe':
                return 'checkmark-circle';
            case 'target':
                return 'radio-button-on';
            case 'reach':
                return 'arrow-up-circle';
            default:
                return 'help-circle';
        }
    };

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
            <LinearGradient
                colors={['#FFFFFF', '#F9FAFB']}
                style={styles.card}
            >
                {/* Tier Badge */}
                <LinearGradient
                    colors={getTierColor()}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.tierBadge}
                >
                    <Ionicons name={getTierIcon() as any} size={16} color="#FFFFFF" />
                    <Text style={styles.tierText}>{getTierLabel()}</Text>
                </LinearGradient>

                {/* College Info */}
                <Text style={styles.collegeName} numberOfLines={2}>
                    {college.collegeName}
                </Text>

                <View style={styles.infoRow}>
                    <Ionicons name="school-outline" size={16} color="#6B7280" />
                    <Text style={styles.infoText}>{college.courseName}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Ionicons name="pricetag-outline" size={16} color="#6B7280" />
                    <Text style={styles.infoText}>Category: {college.category}</Text>
                </View>

                {/* Probability Bar */}
                <View style={styles.probabilityContainer}>
                    <Text style={styles.probabilityLabel}>
                        Admission Probability: {(college.probability * 100).toFixed(0)}%
                    </Text>
                    <View style={styles.progressBarBg}>
                        <LinearGradient
                            colors={getTierColor()}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[styles.progressBarFill, { width: `${college.probability * 100}%` }]}
                        />
                    </View>
                </View>

                {/* Cutoff Info */}
                <View style={styles.cutoffContainer}>
                    <View style={styles.cutoffItem}>
                        <Text style={styles.cutoffLabel}>Cutoff Rank</Text>
                        <Text style={styles.cutoffValue}>{college.cutoffRank.toLocaleString()}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.cutoffItem}>
                        <Text style={styles.cutoffLabel}>Score</Text>
                        <Text style={styles.cutoffValue}>{(college.score * 100).toFixed(0)}</Text>
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    tierBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    tierText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
    },
    collegeName: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 12,
        marginRight: 80,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        gap: 6,
    },
    infoText: {
        fontSize: 14,
        color: '#6B7280',
    },
    probabilityContainer: {
        marginTop: 12,
        marginBottom: 12,
    },
    probabilityLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 6,
    },
    progressBarBg: {
        height: 8,
        backgroundColor: '#E5E7EB',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 4,
    },
    cutoffContainer: {
        flexDirection: 'row',
        marginTop: 8,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    cutoffItem: {
        flex: 1,
        alignItems: 'center',
    },
    cutoffLabel: {
        fontSize: 12,
        color: '#9CA3AF',
        marginBottom: 4,
    },
    cutoffValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1F2937',
    },
    divider: {
        width: 1,
        backgroundColor: '#E5E7EB',
        marginHorizontal: 12,
    },
});
