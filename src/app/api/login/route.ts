import { NextResponse } from "next/server";
import { getFirebaseAdminAuth } from "@/lib/firebase/admin";

export async function POST(request: Request) {
    try {
        const authHeader = request.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return new Response("Unauthorized", { status: 401 });
        }

        const idToken = authHeader.split(" ")[1];
        const expiresIn = 5 * 24 * 60 * 60 * 1000; // 5 days

        const auth = getFirebaseAdminAuth();

        // Verify the ID token and create a session cookie
        await auth.verifyIdToken(idToken);
        const sessionCookie = await auth.createSessionCookie(idToken, {
            expiresIn,
        });

        const res = NextResponse.json({ success: true });
        const cookieName = process.env.AUTH_COOKIE_NAME!;

        res.cookies.set(cookieName, sessionCookie, {
            httpOnly: true,
            maxAge: expiresIn / 1000,
            path: "/",
            sameSite: "lax",
            secure: process.env.USE_SECURE_COOKIES === "true",
        });

        return res;
    } catch {
        return new Response("Unauthorized", { status: 401 });
    }
}
