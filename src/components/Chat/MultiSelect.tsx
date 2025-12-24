import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface MultiSelectProps {
    options: string[];
    onConfirm: (selected: string[]) => void;
    title?: string;
    minSelections?: number;
    maxSelections?: number;
    singleSelect?: boolean;
    allowSkip?: boolean; // Allow proceeding with 0 selections
    skipLabel?: string;
}

const { width } = Dimensions.get('window');

export default function MultiSelect({
    options,
    onConfirm,
    title = "Select options",
    minSelections = 1,
    maxSelections = Infinity,
    singleSelect = false,
    allowSkip = false,
    skipLabel = "Skip"
}: MultiSelectProps) {
    const [selected, setSelected] = useState<string[]>([]);

    const toggleSelection = (option: string) => {
        if (singleSelect) {
            // For single select, just set the option and confirm immediately
            onConfirm([option]);
            return;
        }

        if (selected.includes(option)) {
            setSelected(selected.filter(s => s !== option));
        } else {
            if (selected.length < maxSelections) {
                setSelected([...selected, option]);
            }
        }
    };

    const handleConfirm = () => {
        onConfirm(selected);
    };

    const handleSkip = () => {
        onConfirm([]);
    };

    const isSelected = (option: string) => selected.includes(option);
    const canContinue = selected.length >= minSelections || allowSkip;

    return (
        <View style={styles.container}>
            {title && <Text style={styles.title}>{title}</Text>}

            <ScrollView
                style={styles.optionsContainer}
                contentContainerStyle={styles.optionsContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.optionsGrid}>
                    {options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => toggleSelection(option)}
                            activeOpacity={0.7}
                        >
                            {isSelected(option) ? (
                                <LinearGradient
                                    colors={['#4285F4', '#34A853']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.optionSelected}
                                >
                                    <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
                                    <Text style={styles.optionTextSelected}>{option}</Text>
                                </LinearGradient>
                            ) : (
                                <View style={styles.option}>
                                    <View style={styles.checkboxEmpty} />
                                    <Text style={styles.optionText}>{option}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {!singleSelect && (
                <View style={styles.footer}>
                    <Text style={styles.selectionCount}>
                        {selected.length} selected
                    </Text>

                    <View style={styles.buttonRow}>
                        {allowSkip && selected.length === 0 && (
                            <TouchableOpacity
                                onPress={handleSkip}
                                style={styles.skipButton}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.skipButtonText}>{skipLabel}</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            onPress={handleConfirm}
                            disabled={selected.length === 0 && !allowSkip}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={selected.length > 0 ? ['#4285F4', '#34A853'] : (allowSkip ? ['#555', '#555'] : ['#3C3C3C', '#3C3C3C'])}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.confirmButton}
                            >
                                <Text style={[
                                    styles.confirmButtonText,
                                    selected.length === 0 && !allowSkip && styles.confirmButtonTextDisabled
                                ]}>
                                    {selected.length > 0 ? 'Continue' : (allowSkip ? 'None' : 'Select')}
                                </Text>
                                <Ionicons
                                    name="arrow-forward"
                                    size={20}
                                    color={selected.length > 0 || allowSkip ? "#FFFFFF" : "#666"}
                                />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1A1A1B',
        borderRadius: 20,
        marginHorizontal: 12,
        marginVertical: 8,
        padding: 16,
        maxHeight: 400,
        borderWidth: 1,
        borderColor: '#333',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#E3E3E3',
        marginBottom: 16,
        textAlign: 'center',
    },
    optionsContainer: {
        maxHeight: 280,
    },
    optionsContent: {
        paddingBottom: 8,
    },
    optionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'flex-start',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2A2A2B',
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#444',
        gap: 8,
    },
    optionSelected: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 12,
        gap: 8,
    },
    checkboxEmpty: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: '#666',
    },
    optionText: {
        fontSize: 14,
        color: '#C4C7C5',
        fontWeight: '500',
    },
    optionTextSelected: {
        fontSize: 14,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#333',
    },
    selectionCount: {
        fontSize: 14,
        color: '#888',
    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    skipButton: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#555',
    },
    skipButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#999',
    },
    confirmButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 25,
        gap: 8,
    },
    confirmButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    confirmButtonTextDisabled: {
        color: '#666',
    },
});

