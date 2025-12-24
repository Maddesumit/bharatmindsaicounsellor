import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface QuickReplyProps {
    options: string[];
    onSelect: (option: string) => void;
}

export default function QuickReply({ options, onSelect }: QuickReplyProps) {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => onSelect(option)}
                        activeOpacity={0.7}
                    >
                        <LinearGradient
                            colors={['#2A2A2B', '#1E1F20']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={styles.chip}
                        >
                            <Text style={styles.chipText}>{option}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        paddingHorizontal: 0,
    },
    scrollContent: {
        paddingHorizontal: 16,
        gap: 10,
    },
    chip: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#4285F4',
        paddingHorizontal: 18,
        paddingVertical: 12,
        shadowColor: '#4285F4',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    chipText: {
        color: '#E3E3E3',
        fontSize: 14,
        fontWeight: '600',
    },
});
