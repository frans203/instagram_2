import faker from "@faker-js/faker"
import { useEffect, useState } from "react"
import Story from "./Story"
import { useSession } from "next-auth/react"

export function Stories() {
    const session = useSession()
    const [suggestions, setSuggestions] = useState([])
    useEffect(() => {
        const data = [...Array(20)].map((_, idx) => ({
            ...faker.helpers.contextualCard(),
            id: idx,
        })
        )
        setSuggestions(data)
    }, [])
    return (
        //ADD SWIPER FURTHER
        <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
            {session.data && (
                <Story img={session?.data?.user.image} username={session?.data?.user.username} />
            )}

            {suggestions.map(profile => (
                <Story key={profile.id} img={profile.avatar} username={profile.username} />
            ))}
        </div>)
}