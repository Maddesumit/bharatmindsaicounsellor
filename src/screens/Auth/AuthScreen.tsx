import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { login, signUp } from '../../services/authService';

interface AuthScreenProps {
    onAuthSuccess: (userId: string) => void;
    onSkip: () => void;
}

export default function AuthScreen({ onAuthSuccess, onSkip }: AuthScreenProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAuth = async () => {
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        if (!isLogin && !name) {
            setError('Please enter your name');
            return;
        }

        setLoading(true);

        try {
            if (isLogin) {
                const user = await login(email, password);
                onAuthSuccess(user.$id);
            } else {
                const user = await signUp(email, password, name);
                onAuthSuccess(user.$id);
            }
        } catch (err: any) {
            console.error('Auth error:', err);
            if (err.code === 401) {
                setError('Invalid email or password');
            } else if (err.code === 409) {
                setError('Account already exists. Please login.');
                setIsLogin(true);
            } else {
                setError(err.message || 'Authentication failed');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#1F2937', '#111827']}
                style={styles.gradient}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardView}
                >
                    <View style={styles.content}>
                        {/* Header */}
                        <View style={styles.header}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="school" size={48} color="#8B5CF6" />
                            </View>
                            <Text style={styles.title}>BharatMinds</Text>
                            <Text style={styles.subtitle}>AI Counsellor</Text>
                            <Text style={styles.description}>
                                Find your perfect engineering college based on KCET rank
                            </Text>
                        </View>

                        {/* Auth Form */}
                        <View style={styles.form}>
                            {/* Toggle Login/Register */}
                            <View style={styles.toggleContainer}>
                                <TouchableOpacity
                                    style={[styles.toggleButton, isLogin && styles.toggleButtonActive]}
                                    onPress={() => setIsLogin(true)}
                                >
                                    <Text style={[styles.toggleText, isLogin && styles.toggleTextActive]}>
                                        Login
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.toggleButton, !isLogin && styles.toggleButtonActive]}
                                    onPress={() => setIsLogin(false)}
                                >
                                    <Text style={[styles.toggleText, !isLogin && styles.toggleTextActive]}>
                                        Register
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* Name Input (Register only) */}
                            {!isLogin && (
                                <View style={styles.inputContainer}>
                                    <Ionicons name="person-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Full Name"
                                        placeholderTextColor="#6B7280"
                                        value={name}
                                        onChangeText={setName}
                                        autoCapitalize="words"
                                    />
                                </View>
                            )}

                            {/* Email Input */}
                            <View style={styles.inputContainer}>
                                <Ionicons name="mail-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    placeholderTextColor="#6B7280"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>

                            {/* Password Input */}
                            <View style={styles.inputContainer}>
                                <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    placeholderTextColor="#6B7280"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    autoCapitalize="none"
                                />
                            </View>

                            {/* Error Message */}
                            {error ? (
                                <View style={styles.errorContainer}>
                                    <Ionicons name="alert-circle" size={16} color="#EF4444" />
                                    <Text style={styles.errorText}>{error}</Text>
                                </View>
                            ) : null}

                            {/* Auth Button */}
                            <TouchableOpacity
                                style={styles.authButton}
                                onPress={handleAuth}
                                disabled={loading}
                            >
                                <LinearGradient
                                    colors={['#8B5CF6', '#6366F1']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.authButtonGradient}
                                >
                                    {loading ? (
                                        <ActivityIndicator color="#FFFFFF" />
                                    ) : (
                                        <Text style={styles.authButtonText}>
                                            {isLogin ? 'Login' : 'Create Account'}
                                        </Text>
                                    )}
                                </LinearGradient>
                            </TouchableOpacity>

                            {/* Skip Button */}
                            <TouchableOpacity
                                style={styles.skipButton}
                                onPress={onSkip}
                            >
                                <Text style={styles.skipText}>Continue without account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 18,
        color: '#8B5CF6',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#9CA3AF',
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        padding: 4,
        marginBottom: 24,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 8,
    },
    toggleButtonActive: {
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
    },
    toggleText: {
        fontSize: 16,
        color: '#9CA3AF',
        fontWeight: '600',
    },
    toggleTextActive: {
        color: '#8B5CF6',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        paddingVertical: 16,
        fontSize: 16,
        color: '#FFFFFF',
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        gap: 8,
    },
    errorText: {
        color: '#EF4444',
        fontSize: 14,
        flex: 1,
    },
    authButton: {
        marginBottom: 16,
    },
    authButtonGradient: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    authButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    skipButton: {
        paddingVertical: 12,
        alignItems: 'center',
    },
    skipText: {
        color: '#9CA3AF',
        fontSize: 14,
    },
});
