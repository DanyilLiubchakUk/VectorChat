import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/signin", "/signup", "/home"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow public paths
    if (PUBLIC_PATHS.includes(pathname)) {
        return NextResponse.next();
    }

    const sessionCookie = request.cookies.get(
        process.env.AUTH_COOKIE_NAME || "vectorchat_session"
    );

    if (!sessionCookie?.value) {
        const signinUrl = new URL("/signin", request.url);
        signinUrl.searchParams.set("next", pathname);
        return NextResponse.redirect(signinUrl);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|api|.*\\.).*)"],
};
