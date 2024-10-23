import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    if (!token) return NextResponse.redirect(new URL('/', request.url));
    const response = await fetch(new URL('/api/verify-token', request.url), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
    });
    const { user } = await response.json();
    // sessionStorage.setItem('user', user);

    // if (!user) {
    //         console.log(user);
    //         return NextResponse.redirect(new URL('/', request.url));
    //     }
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/profile'],
};

// export { auth as middleware } from "@/auth";