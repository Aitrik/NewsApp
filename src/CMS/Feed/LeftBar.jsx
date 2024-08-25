import React from 'react';

export default function LeftBar() {
  

    return (
        <>
            {/* Left Section: Filters */}
            <div className="sticky top-20 left-0 w-40 h-screen overflow-y-auto p-4 bg-gray-100 border-r border-gray-200 z-50 hidden md:block">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>
                <ul className="space-y-1">
                    {filters.map((filter) => (
                        <li key={filter} className="text-gray-700 hover:text-gray-900 cursor-pointer">
                            {filter}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
