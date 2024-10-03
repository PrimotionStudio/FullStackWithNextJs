import { NextResponse } from 'next/server';


export const DELETE = async () => {
    try {
        const response = NextResponse.json({}, { status: 200 });
        response.cookies.set('token', '', { httpOnly: true });
        return response;
    } catch (error: unknown) {
        if (error instanceof Error)
            return NextResponse.json({ error: error.message }, { status: 500 });
        else
            return NextResponse.json({ error: "An unknown error occured" }, { status: 500 });
    }
};