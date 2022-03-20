import Image from "next/image"
import { BiSearchAlt } from "react-icons/bi"
import { AiFillHome, AiOutlineHome, AiOutlinePlusCircle, AiFillPlusCircle } from "react-icons/ai"
import { RiSendPlane2Fill, RiSendPlane2Line } from "react-icons/ri"
import { BsHeartFill, BsHeart, BsInstagram } from "react-icons/bs"
import { HiUserGroup, HiOutlineUserGroup } from "react-icons/hi"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { modalState } from "../atom/modalAtom"
import { useRecoilState } from "recoil"

export function Header() {
    const { data: session } = useSession()
    const [open, setOpen] = useRecoilState(modalState)
    const router = useRouter()
    return (
        <div className="shadow py-2 flex w-screen items-center justify-between px-2 border-b bg-white sticky top-0 z-50">
            <div className="cursor-pointer" onClick={() => router.push("/")}>
                <img className="hidden md:block w-32 h-10 object-cover" src="https://links.papareact.com/ocw" />
                <BsInstagram className="md:hidden h-10 w-10" />
            </div>

            <div onClick={() => router.push("/")} className="border border-gray-500 border-solid flex items-center px-2 space-x-2 rounded-md">
                <BiSearchAlt className="icon-header text-gray-500 " />
                <form>
                    <input type="text" placeholder="search" className="outline-none text-left w-20 md:w-44 h-8" />
                </form>
            </div>

            {session ? <div className="hidden md:flex items-center space-x-2">
                <AiOutlineHome className="icon-header" />
                <div className="relative icon-header ">
                    <RiSendPlane2Line className="icon-header -rotate-45" />
                    <div className="absolute -top-2 -right-1 bg-red-500 rounded-full flex items-center justify-center animate-pulse w-4 text-xs h-4 text-white">3</div>
                </div>
                <AiOutlinePlusCircle
                    onClick={() => setOpen(prev => !prev)} className="icon-header" />
                <BsHeart className="icon-header" />
                <HiOutlineUserGroup className="icon-header" />
                <img
                    onClick={signOut}
                    src={session?.user?.image} className="object-cover w-8 h-8 rounded-full cursor-pointer" />


            </div> :
                <button onClick={signIn}>Sign In</button>
            }
        </div>)
}