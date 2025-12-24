'use client';

import React, { useState } from 'react';
import { Send, Plus, Mic } from 'lucide-react';

interface ChatInputProps {
    onSend: (message: string) => void;
    placeholder?: string;
    disabled?: boolean;
}

export default function ChatInput({
    onSend,
    placeholder = 'Type a message...',
    disabled = false
}: ChatInputProps) {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim() && !disabled) {
            onSend(message.trim());
            setMessage('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="px-3 pb-5 pt-2">
            <div className={`flex items-center bg-gray-900 rounded-full px-2 py-1.5 border-2 border-gray-700 shadow-xl ${disabled ? 'opacity-50' : ''}`}>
                <button
                    className="p-2"
                    disabled={disabled}
                    type="button"
                >
                    <Plus className={`w-6 h-6 ${disabled ? 'text-gray-600' : 'text-blue-500'}`} />
                </button>

                <textarea
                    className="flex-1 bg-transparent text-gray-200 text-base px-2.5 py-2.5 resize-none outline-none max-h-[120px] placeholder:text-gray-500"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={placeholder}
                    disabled={disabled}
                    rows={1}
                    style={{
                        minHeight: '40px',
                        maxHeight: '120px',
                    }}
                />

                <button
                    className="p-2"
                    disabled={disabled}
                    type="button"
                >
                    <Mic className={`w-6 h-6 ${disabled ? 'text-gray-600' : 'text-green-500'}`} />
                </button>

                {message.trim().length > 0 && (
                    <button
                        onClick={handleSend}
                        disabled={disabled}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center ml-1 shadow-lg hover:shadow-xl transition-shadow"
                        type="button"
                    >
                        <Send className="w-5 h-5 text-white" />
                    </button>
                )}
            </div>
        </div>
    );
}
