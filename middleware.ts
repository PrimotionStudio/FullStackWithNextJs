import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUserFromToken } from '@/helpers/getUserFromToken';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPrivatePath = path === '/profile';
    const user = await getUserFromToken(request);
    if (isPrivatePath && !user) {
        console.log(user);
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (!isPrivatePath && user)
        return NextResponse.redirect(new URL('/profile', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '/register', '/login', '/profile'],
};