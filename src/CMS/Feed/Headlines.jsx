import { FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiKey } from './key';
import { formatDateString } from './Middle';
import { SkeletonCard } from './Skeleton';

export default function Headlines() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHeadlines = async () => {
            try {
                let res = await axios.get(`https://newsapi.org/v2/top-headlines?q=all&apiKey=${apiKey}`);
                setData(res.data.articles);
            } catch (error) {
                console.error('Error fetching headlines:', error);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };
        fetchHeadlines();
    }, []);

    const searchResult = data.filter((item) => {
        return item.title.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div>
            <div className="flex-1 p-4">
                <div className="mb-4 flex items-center">
                    <div className="relative flex-grow">
                        <MagnifyingGlassIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            placeholder="Search posts..."
                            className="w-full pl-10 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <FunnelIcon className="ml-3 h-5 w-5 text-gray-400 sm:hidden" />
                </div>

                <div className="space-y-4">
                    {loading ? (
                       <div className="space-y-4">
                       {[...Array(5)].map((_, index) => (
                           <SkeletonCard key={index} />
                       ))}
                   </div>
                    ) : searchResult.length !== 0 ? (
                        searchResult
                            .filter(post => post.urlToImage) // Filter out posts with null author or image
                            .map((post, index) => (
                                <div key={index} className="bg-white shadow-sm border border-gray-300 rounded-md overflow-hidden">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="relative h-80 sm:h-full">
                                            <img
                                                src={post.urlToImage || 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png?20210219185637'}
                                                alt={post.title || "Image not available"}
                                                className="w-full h-full object-cover bg-gray-200"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-between p-4">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{post.title}</h3>
                                                <h5 className="text-gray-900">Author: {post.author}</h5>
                                                <p className="mt-2 text-gray-700">{post.content}</p>
                                            </div>
                                            <p className="text-gray-500 text-sm">{formatDateString(post.publishedAt)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <p>No Data Found</p>
                    )}
                </div>
            </div>
        </div>
    );
}
