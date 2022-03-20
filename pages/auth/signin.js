import React from 'react'
import { Header } from '../../components/Header'
import { getProviders, signIn as SignIntoProvider } from "next-auth/react"

//browsers...
function signIn({ providers }) {
    return (
        <>
            <Header />
            <div className='flex flex-col items-center justify-center max-h-screen h-screen py-2  px-14 text-center -mt-20'>
                <img src="https://links.papareact.com/ocw" className='w-80' alt="instagram logo" />
                <p>This is NOT a real app. Made just for educational purposes</p>
                <div className=''>
                    {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <button className="mt-5 p-4 bg-blue-500 rounded-lg text-white" onClick={() => SignIntoProvider(provider.id, { callbackUrl: "/" })}>
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}


//
export async function getServerSideProps() {
    const providers = await getProviders()

    return {
        props: {
            providers
        }
    }
}

export default signIn