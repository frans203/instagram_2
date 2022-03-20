import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { Post } from "./Post"
export function Posts() {
    const [posts, setPosts] = useState([])

    useEffect(() =>
        onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")), snapshot => {
            setPosts(snapshot.docs);
        })

        , [db])

    return (
        <div>
            {posts.map(post => (
                <Post
                    key={post.id} id={post.id} userImg={post.data().profileImg} caption={post.data().caption} img={post.data().image} username={post.data().username} />
            ))}
        </div>
    )
}

