'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, User, Phone, Eye, EyeOff, Check, X, ArrowLeft, ArrowRight, Loader2, Instagram, Award, TrendingUp, Users } from 'lucide-react';
import { login, signUp } from '@/services/auth';

export default function AuthPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Password validation states
    const [passwordValidation, setPasswordValidation] = useState({
        minLength: false,
        hasNumberOrSymbol: false,
        hasUpperLower: false,
    });

    const validatePassword = (pwd: string) => {
        setPasswordValidation({
            minLength: pwd.length >= 8,
            hasNumberOrSymbol: /[0-9!@#$%^&*(),.?":{}|<>]/.test(pwd),
            hasUpperLower: /[a-z]/.test(pwd) && /[A-Z]/.test(pwd),
        });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pwd = e.target.value;
        setPassword(pwd);
        if (!isLogin) {
            validatePassword(pwd);
        }
    };

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        if (!isLogin && (!name || !mobile)) {
            setError('Please enter your name and mobile number');
            return;
        }

        if (!isLogin && password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!isLogin && (!passwordValidation.minLength || !passwordValidation.hasNumberOrSymbol || !passwordValidation.hasUpperLower)) {
            setError('Please meet all password requirements');
            return;
        }

        setLoading(true);

        try {
            if (isLogin) {
                const user = await login(email, password);
                router.push('/registration');
            } else {
                const user = await signUp(email, password, name, mobile);
                router.push('/registration');
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
        <div className="min-h-screen flex">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 bg-white flex flex-col">
                {/* Back Button */}
                <div className="p-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-700 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                </div>

                {/* Form Container */}
                <div className="flex-1 flex items-center justify-center px-6 pb-12">
                    <div className="w-full max-w-md">
                        {/* Toggle Sign In/Sign Up */}
                        <div className="mb-8">
                            <p className="text-gray-600 mb-2">
                                {isLogin ? 'New here?' : 'Already member?'}{' '}
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="text-purple-700 font-semibold hover:underline"
                                >
                                    {isLogin ? 'Sign up' : 'Sign in'}
                                </button>
                            </p>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                            {isLogin ? 'Sign In' : 'Sign Up'}
                        </h1>
                        <p className="text-gray-500 mb-8">
                            {isLogin
                                ? 'Welcome back to BharatMinds AI Counsellor'
                                : 'Secure Your College Admission with AI Counselling'}
                        </p>

                        {/* Form */}
                        <form onSubmit={handleAuth} className="space-y-5">
                            {/* Name Input (Sign Up only) */}
                            {!isLogin && (
                                <div className="relative">
                                    <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 py-3 focus-within:border-purple-500 transition-colors">
                                        <User className="w-5 h-5 text-gray-400 mr-3" />
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="flex-1 outline-none text-gray-900 placeholder:text-gray-400"
                                        />
                                        {name && (
                                            <Check className="w-5 h-5 text-green-500" />
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Email Input */}
                            <div className="relative">
                                <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 py-3 focus-within:border-purple-500 transition-colors">
                                    <Mail className="w-5 h-5 text-gray-400 mr-3" />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-1 outline-none text-gray-900 placeholder:text-gray-400"
                                        autoComplete="email"
                                    />
                                    {email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                                        <Check className="w-5 h-5 text-green-500" />
                                    )}
                                </div>
                            </div>

                            {/* Mobile Input (Sign Up only) */}
                            {!isLogin && (
                                <div className="relative">
                                    <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 py-3 focus-within:border-purple-500 transition-colors">
                                        <Phone className="w-5 h-5 text-gray-400 mr-3" />
                                        <input
                                            type="tel"
                                            placeholder="Mobile Number"
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                            className="flex-1 outline-none text-gray-900 placeholder:text-gray-400"
                                        />
                                        {mobile && mobile.length >= 10 && (
                                            <Check className="w-5 h-5 text-green-500" />
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Password Input */}
                            <div className="relative">
                                <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 py-3 focus-within:border-purple-500 transition-colors">
                                    <Lock className="w-5 h-5 text-gray-400 mr-3" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        className="flex-1 outline-none text-gray-900 placeholder:text-gray-400"
                                        autoComplete={isLogin ? "current-password" : "new-password"}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Password Validation (Sign Up only) */}
                            {!isLogin && password && (
                                <div className="space-y-2 text-sm">
                                    <div className={`flex items-center gap-2 ${passwordValidation.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                                        <Check className="w-4 h-4" />
                                        <span>Least 8 characters</span>
                                    </div>
                                    <div className={`flex items-center gap-2 ${passwordValidation.hasNumberOrSymbol ? 'text-green-600' : 'text-gray-500'}`}>
                                        <Check className="w-4 h-4" />
                                        <span>Least one number (0-9) or a symbol</span>
                                    </div>
                                    <div className={`flex items-center gap-2 ${passwordValidation.hasUpperLower ? 'text-green-600' : 'text-gray-500'}`}>
                                        <Check className="w-4 h-4" />
                                        <span>Lowercase (a-z) and uppercase (A-Z)</span>
                                    </div>
                                </div>
                            )}

                            {/* Confirm Password (Sign Up only) */}
                            {!isLogin && (
                                <div className="relative">
                                    <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 py-3 focus-within:border-purple-500 transition-colors">
                                        <Lock className="w-5 h-5 text-gray-400 mr-3" />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Re-Type Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="flex-1 outline-none text-gray-900 placeholder:text-gray-400"
                                            autoComplete="new-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <span>{isLogin ? 'Sign In' : 'Sign Up'}</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500">Or</span>
                                </div>
                            </div>

                            {/* Social Login Buttons */}
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    className="flex-1 border-2 border-gray-200 rounded-xl py-3 flex items-center justify-center gap-2 hover:border-purple-300 hover:bg-purple-50 transition-all"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    className="flex-1 border-2 border-gray-200 rounded-xl py-3 flex items-center justify-center gap-2 hover:border-purple-300 hover:bg-purple-50 transition-all"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z" />
                                        <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z" />
                                        <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z" />
                                        <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z" />
                                    </svg>
                                </button>
                            </div>
                        </form>

                        {/* Language Selector */}
                        <div className="mt-8 flex items-center gap-2 text-gray-600">
                            <div className="w-6 h-6 rounded-full overflow-hidden">
                                <svg viewBox="0 0 60 30" className="w-full h-full">
                                    <clipPath id="s">
                                        <path d="M0,0 v30 h60 v-30 z" />
                                    </clipPath>
                                    <clipPath id="t">
                                        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
                                    </clipPath>
                                    <g clipPath="url(#s)">
                                        <path d="M0,0 v30 h60 v-30 z" fill="#f93" />
                                        <path d="M0,0 v30 h60 v-30 z" fill="#fff" clipPath="url(#t)" />
                                        <path d="M0,0 v30 h60 v-30 z" fill="#128807" clipPath="url(#t)" />
                                        <circle cx="30" cy="15" r="4" fill="#008" />
                                        <circle cx="30" cy="15" r="3.5" fill="#fff" />
                                        <circle cx="30" cy="15" r="1" fill="#008" />
                                    </g>
                                </svg>
                            </div>
                            <span className="font-medium">ENG</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Decorative */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 relative overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center p-12 w-full">
                    {/* Stats Card 1 */}
                    <div className="absolute top-20 right-20 bg-white rounded-3xl shadow-2xl p-6 w-64 transform hover:scale-105 transition-transform">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-purple-600 font-semibold text-sm">Success Rate</span>
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                <Award className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <div className="text-4xl font-bold text-gray-900 mb-2">95%</div>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Card 2 */}
                    <div className="absolute top-64 left-20 bg-white rounded-3xl shadow-2xl p-6 w-72 transform hover:scale-105 transition-transform">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Students Guided</div>
                                <div className="text-3xl font-bold text-gray-900">35,000+</div>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <span>Growing every day</span>
                        </div>
                    </div>

                    {/* Main Feature Card */}
                    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md transform hover:scale-105 transition-transform">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
                                <Lock className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Your data, your rules</h3>
                            </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            Your data belongs to you, and our encryption ensures that nobody can access it without your permission.
                        </p>
                        <div className="mt-6 flex items-center gap-4">
                            <div className="flex-1 bg-gray-100 rounded-full h-2">
                                <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                            <span className="text-gray-400 text-sm">Secure</span>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="absolute top-32 right-32 bg-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform">
                        <Instagram className="w-6 h-6 text-pink-500" />
                    </div>
                    <div className="absolute bottom-32 right-24 bg-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Animations */}
            <style jsx>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -50px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(50px, 50px) scale(1.05); }
                }
                .animate-blob {
                    animation: blob 20s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}
