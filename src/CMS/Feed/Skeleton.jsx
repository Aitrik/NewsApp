import React from 'react';

export function SkeletonCard() {
    return (
        <div className="bg-white shadow-sm border border-gray-300 rounded-md overflow-hidden animate-pulse">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative h-80 sm:h-full bg-gray-300"></div>
                <div className="flex flex-col justify-between p-4 space-y-4">
                    <div className="h-6 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-20 bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>
    );
}
