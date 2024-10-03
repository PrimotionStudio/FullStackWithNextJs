import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import dbConnect from '@/db/config';
import User from '@/models/Users';
import jwt from 'jsonwebtoken';

dbConnect();

export const POST = async (request: NextRequest) => {
    try {
        const requestBody = await request.json();
        const { username, password } = requestBody;

        // find user
        const user = await User.findOne({ username });
        if (!user)
            return NextResponse.json({ error: 'Cannot find user by username' }, { status: 400 });

        // compare password and user.password
        if (!(await compare(password, user.password)))
            return NextResponse.json({ error: 'Password is incorrect' }, { status: 400 });

        // create jwt token
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1h' });

        // create response
        const response = NextResponse.json({
            message: 'Login Successful',
        }, { status: 200 });
        response.cookies.set('token', token, { httpOnly: true });
        return response;
    } catch (error: unknown) {
        if (error instanceof Error)
            return NextResponse.json({ error: error.message }, { status: 400 });
        return NextResponse.json({ error: "An unknown error occured" }, { status: 400 });
    }
};
