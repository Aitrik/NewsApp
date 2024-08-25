import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { apiKey } from '@/CMS/Feed/key';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SkeletonCard } from './Skeleton';

export const formatDateString = (dateString) => {
    if (!dateString || dateString === '') { return ''; }
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
};

export default function Middle() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchQuery, setSearchQuery] = useState(''); // State to track search input
    const [loading, setLoading] = useState(false); // State to track loading

    const fetchData = async (isSearch = false) => {
        setLoading(true);
        const res = await axios.get(`https://newsapi.org/v2/everything?q=all&apiKey=${apiKey}&page=${page}`);
        setData(prevData => isSearch ? res.data.articles : [...prevData, ...res.data.articles]);

   
        if (res.data.articles.length === 0) {
            setHasMore(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    const fetchMoreData = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        setPage(1);  // Reset page to 1 on new search
        setHasMore(false); // Disable infinite scroll during search
        setData([]); // Clear the existing data to avoid duplicates
        fetchData(true); // Fetch data based on the search query
    };

    // Filter posts based on search query
    const filteredData = data.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {/* Middle Section: Posts */}
            <div className="flex-1 p-4">
                <div className="mb-4 flex items-center">
                    <div className="relative flex-grow">
                        <MagnifyingGlassIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search posts..."
                            className="w-full pl-10 py-2 rounded-md border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchQuery} // Bind input value to state
                            onChange={handleSearch} // Update search query on change
                        />
                    </div>
                    {/* Filter Icon */}
                    <FunnelIcon className="ml-3 h-5 w-5 text-gray-400 sm:hidden" />
                </div>
                <InfiniteScroll
                    dataLength={filteredData.length}
                    next={fetchMoreData}
                    hasMore={!searchQuery && hasMore} // Disable infinite scroll if a search query is present
                    loader={(
                        <div className="space-y-4">
                            {!searchQuery && loading && [...Array(5)].map((_, index) => (
                                <SkeletonCard key={index} />
                            ))}
                        </div>
                    )}
               
                >
                    <div className="space-y-4">
                        {filteredData.filter(item=>item.urlToImage).map((post, index) => (
                            <div key={index} className="bg-white shadow-sm border border-gray-300 rounded-md overflow-hidden">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="relative h-80 sm:h-full ">
                                        <img
                                            src={post.urlToImage || 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png?20210219185637'}
                                            alt={""}
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
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </>
    );
}
