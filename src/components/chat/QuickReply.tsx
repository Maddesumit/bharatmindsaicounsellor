'use client';

import React from 'react';

interface QuickReplyProps {
    options: string[];
    onSelect: (option: string) => void;
}

export default function QuickReply({ options, onSelect }: QuickReplyProps) {
    return (
        <div className="py-3 px-0">
            <div className="flex overflow-x-auto gap-2.5 px-4 scrollbar-hide">
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onSelect(option)}
                        className="flex-shrink-0 bg-gradient-to-b from-gray-800 to-gray-900 border border-blue-500 rounded-[20px] px-4 py-3 shadow-md hover:shadow-lg transition-shadow"
                    >
                        <span className="text-gray-200 text-sm font-semibold whitespace-nowrap">
                            {option}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
