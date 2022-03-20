import faker from '@faker-js/faker'
import React, { useEffect, useState } from 'react'

export function Suggestions() {
    const [suggestions, setSuggestions] = useState([])
    useEffect(() => {
        const suggestions = [...Array(5)].map((_, i) => (
            {
                ...faker.helpers.contextualCard(),
                id: i
            }
        ))

        setSuggestions(suggestions)
    }, [])
    return (
        <div className='mt-4 ml-10'>
            <div className='flex justify-between text-sm mb-5'>
                <h3 className="text-sm font-bold text-gray-500">Suggestions for you</h3>
                <button className='text-gray-600 font-semibold'>See All</button>
            </div>

            {
                suggestions?.map(profile => (
                    <div key={profile.id} className="w-full  flex items-center justify-between mt-3">
                        <img className="cursor-pointer w-10 h-10 p-[2px] border border-gray-300 rounded-full" r src={profile.avatar} />
                        <div className='flex-1 cursor-pointer'>
                            <h2 className='font-semibold text-sm'>{profile.username}</h2>
                            <h3 className='text-xs text-gray-400'>Works at {profile.company.name} </h3>
                        </div>
                        <button className='cursor-pointer text-blue-400 text-xs font-bold'>Follow</button>
                    </div>
                ))
            }
        </div>
    )
}

