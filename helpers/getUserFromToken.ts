import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export const getUserFromToken = async (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || '';
        const decodedUser = await jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedUser;
    } catch (error: any) {

        console.log(error.message);

        return null;
    }
};