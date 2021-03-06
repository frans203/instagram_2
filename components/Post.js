import React, { useEffect, useState } from 'react'
import { BookmarkIcon, ChatIcon, DotsHorizontalIcon, EmojiHappyIcon, HeartIcon, PaperAirplaneIcon } from "@heroicons/react/outline"
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid"
import { useSession } from 'next-auth/react'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import Moment from 'react-moment'

export function Post({ id, username, userImg, img, caption }) {
    const { data: session } = useSession()
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState([])
    const [hasLiked, setHasLiked] = useState(false)
    useEffect(async () => onSnapshot(
        await query(
            collection(db, 'posts', id, 'comments'),
            orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
    ), [db, id])

    useEffect(async () => {
        return await onSnapshot(collection(db, 'posts', id, 'likes'),
            (snapshot) => setLikes(snapshot.docs))
    }, [db, id])

    useEffect(() => {
        setHasLiked(likes.findIndex(like => (like.id === session?.user?.uid)) !== -1)
    }, [likes, session])


    const likePost = async () => {
        if (hasLiked) {
            await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
        } else {
            await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
                username: session.user.username
            })
        }

    }

    const sendComment = async (e) => {
        e.preventDefault();

        const commentToSend = comment;
        setComment("")
        await addDoc(collection(db, "posts", id, "comments"), {
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp(),
        })
    }
    return (
        <div className='bg-white justify-between my-5 mb-7 border border-gray-300 rounded-sm'>
            <div className='flex items-center p-5 w-full '>
                <img src={userImg} className="rounded-full h-12 w-12 object-cover border p-1 mr-3" />
                <p className='flex-1 font-bold'>{username}</p>
                <DotsHorizontalIcon className="h-5 cursor-pointer" />
            </div>
            <div>
                <img src={img} className="object-cover" />
            </div>
            {session && <div className='flex justify-between px-5 py-2'>
                <div className='flex space-x-4 w-full'>
                    {
                        hasLiked ? (
                            <HeartIconFilled
                                onClick={likePost}
                                className='icon-feed text-red-500' />
                        ) : <HeartIcon
                            onClick={likePost}
                            className='icon-feed' />
                    }

                    <ChatIcon className='icon-feed' />
                    <PaperAirplaneIcon className='icon-feed rotate-45' />
                </div>
                <BookmarkIcon className='icon-feed ' />

            </div>}

            <p className='p-5 pt-0 truncate'>
                {likes.length > 0 && (
                    <p className='font-bold mb-2'>{likes.length} Likes</p>
                )}
                <span className='font-bold mr-1'>{username}</span>
                {caption}
            </p>
            {
                comments.length > 0 && (
                    <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
                        {comments.map(comment => {
                            return <div key={comment.id} className="flex items-center space-x-2 mb-3" >
                                <img
                                    className='h-7 w-7 rounded-full'
                                    src={comment.data().userImage} alt="" />
                                <p className="text-sm flex-1">
                                    <span className='font-bold'>
                                        {comment.data().username}
                                    </span>
                                    {" "}
                                    {comment.data().comment}</p>
                                <Moment fromNow className='text-xs text-gray-400'>
                                    {comment.data().timestamp?.toDate()}
                                </Moment>
                            </div>
                        }
                        )}
                    </div>
                )
            }
            {session && <form className='flex py-3 px-2'>
                <EmojiHappyIcon className='icon-feed text-gray-500' />
                <input
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    className="outline-none px-3 flex-1 rounded-full border border-gray-100" type="text"
                    placeholder="Add a comment..." />

                <button
                    onClick={sendComment}
                    type="submit"
                    disable={!comment.trim()}
                    className='text-blue-500 mx-3'>Post</button>
            </form>}
        </div>
    )
}

