import React from 'react'

function Story({ img, username }) {

    return (
        <div>
            <img className="hover:scale-110 transform transition-all duration-75 cursor-pointer h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2" src={img} alt={username} />
            <p className='text-xs truncate w-14 text-center'>{username}</p>
        </div>
    )
}

export default Story