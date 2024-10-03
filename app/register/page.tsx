/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';


const RegisterPage = () => {
    const router = useRouter();
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [user, setUser] = useState({
        email: "",
        username: "",
        password: ""
    });
    useEffect(() => {
        if (user.email.length > 0 && user.username.length > 0 && user.password.length > 0)
            setButtonDisabled(false);
        else
            setButtonDisabled(true);
    }, [user]);
    const register = async () => {
        try {
            const response = await axios.post('/api/users/signup', user);
            // console.log(response.data);
            toast('Successful Registration');
            router.push('/login');
        } catch (error: unknown) {
            if (error instanceof Error)
                toast.error(error.message);
            else
                toast.error('An unknown error occured');
        }
    };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className='text-2xl'>Register</h1>
            <form action="" className='w-1/4' onSubmit={(e) => e.preventDefault()}>
                <div className="my-4 flex outline mx-auto items-center gap-4 rounded-md">
                    <label
                        htmlFor="email"
                        className="block items-center text-white w-24 text-sm pl-2 pt-1 font-bold mb-2"
                    >Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="w-full text-black p-1 focus:outline-none"
                    />
                </div>
                <div className="my-4 flex outline mx-auto items-center gap-4 rounded-md">
                    <label
                        htmlFor="username"
                        className="block items-center text-white w-24 text-sm pl-2 pt-1 font-bold mb-2"
                    >Username:</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        className="w-full text-black p-1 focus:outline-none"
                    />
                </div>
                <div className="my-4 flex outline mx-auto items-center gap-4 rounded-md">
                    <label
                        htmlFor="password"
                        className="block items-center text-white w-24 text-sm pl-2 pt-1 font-bold mb-2"
                    >Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        className="w-full text-black p-1 focus:outline-none"
                    />
                </div>
                <div className="flex flex-col">
                    <button
                        type="submit"
                        onClick={register}
                        className="bg-white rounded-md py-1 px-4 text-black font-bold mx-auto"
                    // {isButtonDisabled ? (
                    //     style = {{cursor: 'not-allowed'}}
                    // )}
                    // disabled={isButtonDisabled}
                    >
                        Submit
                    </button>
                    <Link href={"/login"} className='hover:underline'>Login Here</Link>
                </div>
            </form>
            <Toaster />
        </div>
    );
};

export default RegisterPage;