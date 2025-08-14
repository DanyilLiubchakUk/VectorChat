import { NextResponse } from "next/server";

export async function POST() {
    const res = NextResponse.json({ success: true });
    const cookieName = process.env.AUTH_COOKIE_NAME!;
    res.cookies.set(cookieName, "", {
        httpOnly: true,
        maxAge: 0,
        path: "/",
        sameSite: "lax",
        secure: process.env.USE_SECURE_COOKIES === "true",
    });
    return res;
}
