import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ChatMessage } from '../../types';

interface MessageBubbleProps {
    message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
    const isBot = message.role === 'bot';

    return (
        <View style={[styles.container, isBot ? styles.botContainer : styles.userContainer]}>
            {isBot ? (
                <View style={styles.botMessage}>
                    <LinearGradient
                        colors={['#4285F4', '#34A853']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.botIconContainer}
                    >
                        <Ionicons name="sparkles" size={14} color="#FFFFFF" />
                    </LinearGradient>
                    <View style={styles.botTextContainer}>
                        <Text style={styles.botText}>{message.content}</Text>
                    </View>
                </View>
            ) : (
                <LinearGradient
                    colors={['#4285F4', '#5E97F6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.userBubble}
                >
                    <Text style={styles.userText}>{message.content}</Text>
                </LinearGradient>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        paddingHorizontal: 16,
        width: '100%',
    },
    botContainer: {
        alignItems: 'flex-start',
    },
    userContainer: {
        alignItems: 'flex-end',
    },
    botMessage: {
        flexDirection: 'row',
        maxWidth: '92%',
        gap: 12,
    },
    botIconContainer: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#4285F4',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    botTextContainer: {
        flex: 1,
    },
    botText: {
        color: '#E8EAED',
        fontSize: 15,
        lineHeight: 24,
        letterSpacing: 0.2,
    },
    userBubble: {
        maxWidth: '80%',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
        borderTopRightRadius: 6,
        shadowColor: '#4285F4',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 4,
    },
    userText: {
        color: '#FFFFFF',
        fontSize: 15,
        lineHeight: 22,
        fontWeight: '500',
    },
});
