/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const LoginPage = () => {
    const [user, setUser] = useState({
        email: "",
        username: "",
        password: ""
    });

    const login = async () => { };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className='text-2xl'>Login</h1>
            <form action="" className='w-1/4'>
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
                        onClick={login}
                        className="bg-white rounded-md py-1 px-4 text-black font-bold mx-auto"
                    >
                        Submit
                    </button>
                    <Link href={"/register"} className='hover:underline'>Register Here</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;