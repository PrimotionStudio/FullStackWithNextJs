"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useParams } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

const ProfilePage = () => {
    const { profile_id } = useParams();
    const router = useRouter();
    return (

        <div
            className="flex flex-col items-center justify-center h-screen"
            style={{ backgroundColor: '#F9F9F9' }}
        >
            <h1
                className="text-3xl font-bold text-gray-900 text-center"
                style={{ marginTop: '2rem' }}
            >Profile Page</h1>
            <p
                className="text-xl font-semibold text-gray-900 text-center"
                style={{ marginTop: '1rem' }}
            >Welcome to: /{profile_id}</p>
            <p
                className="text-sm text-gray-600 text-center"
                style={{ marginTop: '1rem' }}
            >Here you can view your profile details, update your information, and manage your posts.</p>
            <p
                className="text-sm text-gray-600 text-center"
            >Please note that this is a placeholder page for demonstration purposes. In a real-world application, you would likely use a backend API to fetch and display user data.</p>
            <button
                onClick={async () => {
                    await axios.delete('/api/users/logout');
                    router.push('/login');
                }}
                className='bg-gray-400 text-white rounded py-1 px-4 mt-4'
            >Logout</button>
            <Toaster />
        </div>
    );
};

export default ProfilePage;