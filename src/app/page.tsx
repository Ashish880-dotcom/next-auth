"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

const Page = () => {
    const { data: session, status } = useSession()

    return (
        <div className='flex flex-col h-screen justify-center items-center gap-4'>
            {status === "unauthenticated" && (
                <button
                    className='cursor-pointer bg-white px-4 py-2 rounded-md text-black hover:bg-blue-600 transition-colors'
                    onClick={() => signIn("google")}
                >
                    Login with Google
                </button>
            )}

            {status === "authenticated" && (
                <div className='flex flex-col items-center gap-6'>
                    <div className='text-center'>
                        <h1 className='text-2xl font-bold'>Welcome!</h1>
                        <p className='text-gray-600'>Logged In as: {session?.user?.name}</p>
                        <p className='text-sm text-gray-500'>{session?.user?.email}</p>
                    </div>
                    <button
                        className='cursor-pointer bg-red-500 px-6 py-2 rounded-md text-white hover:bg-red-600 transition-colors'
                        onClick={() => signOut()}
                    >
                        Logout
                    </button>
                    
                </div>
            )}
        </div>
    )
}

export default Page