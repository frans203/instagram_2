import React from 'react'
import { signOut, useSession } from 'next-auth/react'

export function MiniProfile() {
    const session = useSession()
    return (
        <div className='flex items-center jusitfy-between mt-14 ml-10'>
            <img className='w-20 h-20 rounded-full border p-[2px]' alt="user-img" src={session?.data.user?.image} />
            <div className=''>
                <h2 className="font-bold">{session?.data.user?.username}</h2>
                <h3 className='text-sm text-gray-400'>Welcome to Instagram</h3>
            </div>
            <button onClick={signOut} className='text-blue-400 text-sm font-semibold ml-3'>Sign Out</button>
        </div>
    )
}

