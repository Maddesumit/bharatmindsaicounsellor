'use client';

import React from 'react';
import { ChatMessage } from '@/types';
import { Sparkles } from 'lucide-react';

interface MessageBubbleProps {
    message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
    const isBot = message.role === 'bot';

    return (
        <div className={`my-4 px-4 w-full ${isBot ? 'flex justify-start' : 'flex justify-end'}`}>
            {isBot ? (
                <div className="flex gap-3 max-w-[92%]">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center shadow-lg flex-shrink-0">
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="flex-1">
                        <p className="text-gray-200 text-[15px] leading-6 whitespace-pre-wrap">
                            {message.content}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="max-w-[80%] px-5 py-3 rounded-[20px] rounded-tr-md bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                    <p className="text-white text-[15px] leading-[22px] font-medium">
                        {message.content}
                    </p>
                </div>
            )}
        </div>
    );
}
