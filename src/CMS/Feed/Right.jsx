import React, { useEffect, useState } from 'react';
import { apiKey } from './key';
import axios from 'axios';
import { formatDateString } from './Middle';

export default function Right() {
    const [data, setData] = useState([])

    useEffect(() => {
        const Headlines = async () => {
            let res = await axios.get(`https://newsapi.org/v2/top-headlines?q=all&apiKey=${apiKey}`)
            setData(res.data.articles)
        }
        Headlines()
    }, [])

    console.log(data)
    return (
        <>
            {/* Right Section */}
            <div className="hidden md:block w-64 p-4 bg-gray-100 border-l border-gray-200">
                <h2 className=" text-center text-lg font-semibold mb-4">Headlines</h2>
                {/* Add content for the right section here */}

                <div className="p-2">
                    <div className="grid grid-cols-1 gap-4">
                       {data.map((item)=>(
                         <div
                         className="relative h-64 w-full flex items-end justify-start text-left bg-cover bg-center"
                         style={{
                             backgroundImage:
                                 `url(${item.urlToImage})`
                         }}
                     >
                         <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
                         <div className="absolute top-0 right-0 left-0 mx-3 mt-2 flex justify-between items-center">
                             <a
                                 href="#"
                                 className="text-xs bg-indigo-600 text-white px-3 py-1 uppercase hover:bg-white hover:text-indigo-600 transition ease-in-out duration-500"
                             >
                                 {item.source.name}
                             </a>
                             <div className="text-white font-regular flex flex-col justify-start">
                                 <span className="text-3xl leading-0 font-semibold">{formatDateString(item.publishedAt).slice(0,2)}</span>
                                 <span className="-mt-3">{formatDateString(item.publishedAt).slice(3,6)}</span>
                             </div>
                         </div>
                         <main className="p-5 z-10">
                             <a
                                 href="#"
                                 className="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline"
                             >
                               {item.title.slice(0,50)}...
                             </a>
                         </main>
                     </div>
                       ))}
                       
                    </div>
                </div>
            </div>
        </>
    );
}
