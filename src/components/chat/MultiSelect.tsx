'use client';

import React, { useState } from 'react';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';

interface MultiSelectProps {
    options: string[];
    onConfirm: (selected: string[]) => void;
    title?: string;
    minSelections?: number;
    maxSelections?: number;
    singleSelect?: boolean;
    allowSkip?: boolean;
    skipLabel?: string;
}

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

    return (
        <div className="bg-gray-900 rounded-[20px] mx-3 my-2 p-4 max-h-[400px] border border-gray-700">
            {title && (
                <h3 className="text-base font-semibold text-gray-200 mb-4 text-center">
                    {title}
                </h3>
            )}

            <div className="max-h-[280px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                <div className="flex flex-wrap gap-2.5 pb-2">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => toggleSelection(option)}
                            className={`flex items-center gap-2 px-3.5 py-3 rounded-xl transition-all ${isSelected(option)
                                    ? 'bg-gradient-to-br from-blue-500 to-green-500'
                                    : 'bg-gray-800 border border-gray-600'
                                }`}
                        >
                            {isSelected(option) ? (
                                <CheckCircle className="w-4 h-4 text-white" />
                            ) : (
                                <Circle className="w-4 h-4 text-gray-500" />
                            )}
                            <span className={`text-sm font-medium ${isSelected(option) ? 'text-white' : 'text-gray-300'
                                }`}>
                                {option}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {!singleSelect && (
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                    <span className="text-sm text-gray-500">
                        {selected.length} selected
                    </span>

                    <div className="flex items-center gap-2.5">
                        {allowSkip && selected.length === 0 && (
                            <button
                                onClick={handleSkip}
                                className="px-4 py-3 rounded-[20px] border border-gray-600"
                            >
                                <span className="text-sm font-medium text-gray-400">
                                    {skipLabel}
                                </span>
                            </button>
                        )}

                        <button
                            onClick={handleConfirm}
                            disabled={selected.length === 0 && !allowSkip}
                            className={`flex items-center gap-2 px-6 py-3 rounded-[25px] transition-all ${selected.length > 0
                                    ? 'bg-gradient-to-r from-blue-500 to-green-500'
                                    : allowSkip
                                        ? 'bg-gray-700'
                                        : 'bg-gray-800 opacity-50 cursor-not-allowed'
                                }`}
                        >
                            <span className={`text-base font-semibold ${selected.length > 0 || allowSkip ? 'text-white' : 'text-gray-600'
                                }`}>
                                {selected.length > 0 ? 'Continue' : (allowSkip ? 'None' : 'Select')}
                            </span>
                            <ArrowRight className={`w-5 h-5 ${selected.length > 0 || allowSkip ? 'text-white' : 'text-gray-600'
                                }`} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
