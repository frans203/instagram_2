import React from 'react'
import { AiFillHome, AiOutlineHome, AiOutlinePlusCircle, AiFillPlusCircle } from "react-icons/ai"
import { RiSendPlane2Fill, RiSendPlane2Line } from "react-icons/ri"
import { BsHeartFill, BsHeart, BsInstagram } from "react-icons/bs"
import { HiUserGroup, HiOutlineUserGroup } from "react-icons/hi"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { modalState } from '../atom/modalAtom'


function MobileHeader() {
    const router = useRouter()
    const { data: session } = useSession()
    const [open, setOpen] = useRecoilState(modalState)

    return (
        <div className="py-3 px-1 border-t-2 border-gray-300 fixed bottom-0 md:hidden flex items-center space-x-2 bg-white w-screen justify-between">
            <AiOutlineHome className="icon-header-mobile" />
            <div className="relative icon-header-mobile ">
                <RiSendPlane2Line className="icon-header-mobile -rotate-45" />
                <div className="absolute -top-2 -right-1 bg-red-500 rounded-full flex items-center justify-center animate-pulse w-4 text-xs h-4 text-white">3</div>
            </div>
            <AiOutlinePlusCircle
                onClick={() => setOpen(prev => !prev)} className="icon-header-mobile" />
            <BsHeart className="icon-header-mobile" />
            <HiOutlineUserGroup className="icon-header-mobile" />

        </div>
    )
}

export default MobileHeader