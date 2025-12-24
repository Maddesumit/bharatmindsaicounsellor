import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface ChatInputProps {
    onSend: (message: string) => void;
    placeholder?: string;
    disabled?: boolean;
}

export default function ChatInput({ onSend, placeholder = 'Type a message...', disabled = false }: ChatInputProps) {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim() && !disabled) {
            onSend(message.trim());
            setMessage('');
            Keyboard.dismiss();
        }
    };

    return (
        <View style={styles.container}>
            <View style={[styles.inputWrapper, disabled && styles.inputWrapperDisabled]}>
                <TouchableOpacity style={styles.iconButton} disabled={disabled}>
                    <Ionicons name="add-circle-outline" size={26} color={disabled ? "#555" : "#4285F4"} />
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                    placeholder={placeholder}
                    placeholderTextColor="#888"
                    multiline
                    maxLength={1000}
                    editable={!disabled}
                    onSubmitEditing={handleSend}
                />

                <TouchableOpacity style={styles.iconButton} disabled={disabled}>
                    <Ionicons name="mic-outline" size={26} color={disabled ? "#555" : "#34A853"} />
                </TouchableOpacity>

                {message.trim().length > 0 && (
                    <TouchableOpacity
                        onPress={handleSend}
                        disabled={disabled}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={['#4285F4', '#34A853']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.sendButton}
                        >
                            <Ionicons name="arrow-up" size={22} color="#FFFFFF" />
                        </LinearGradient>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        paddingBottom: 20,
        paddingTop: 8,
        backgroundColor: 'transparent',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1A1B',
        borderRadius: 28,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderWidth: 1.5,
        borderColor: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    inputWrapperDisabled: {
        opacity: 0.5,
    },
    input: {
        flex: 1,
        color: '#E8EAED',
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 10,
        maxHeight: 120,
    },
    iconButton: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4,
        shadowColor: '#4285F4',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 4,
    },
});

