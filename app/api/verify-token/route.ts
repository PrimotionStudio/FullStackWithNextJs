import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// export const config = {
//     runtime: 'nodejs',
// };
interface RequestBody {
    token: string;
}
export const POST = async (request: NextRequest) => {
    try {
        const requestBody: RequestBody = await request.json();
        const { token } = requestBody;
        if (!token) {
            return NextResponse.json({ message: 'Token is required' }, { status: 400 });
        }
        const user = await jwt.verify(token, process.env.TOKEN_SECRET!);
        return NextResponse.json({
            message: 'Token Verified',
            user
        }, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error)
            return NextResponse.json({ error: error.message }, { status: 400 });
        return NextResponse.json({ error: "An unknown error occured" }, { status: 400 });
    }
};