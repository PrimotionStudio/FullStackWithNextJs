/* eslint-disable @typescript-eslint/no-unused-vars */
import dbConnect from "@/db/config";
import User from "@/models/Users";
import { NextRequest, NextResponse } from 'next/server';
import { hash, genSalt } from "bcryptjs";


dbConnect();

export const POST = async (request: NextRequest) => {
    try {
        const requestBody = await request.json();
        // console.log(requestBody);
        const { username, email, password } = requestBody;

        // check if user already exists
        const user = await User.findOne({
            $or: [{ email }, { username }]
        });
        if (user)
            return NextResponse.json({ error: "User already exists" }, { status: 400 });

        // hash password
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        // create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser
        }, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof Error)
            return NextResponse.json({ error: error.message }, { status: 500 });
        else
            return NextResponse.json({ error: "An unknown error occured" }, { status: 500 });
    }
};
