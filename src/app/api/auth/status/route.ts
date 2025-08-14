import { cookies } from "next/headers";
import { getFirebaseAdminAuth } from "@/lib/firebase/admin";

export async function GET() {
    const cookieName = process.env.AUTH_COOKIE_NAME!;
    const sessionCookie = (await cookies()).get(cookieName)?.value;

    if (!sessionCookie) {
        return Response.json({ authenticated: false });
    }

    try {
        const auth = getFirebaseAdminAuth();
        // Verify the session cookie
        await auth.verifySessionCookie(sessionCookie, true);
        return Response.json({ authenticated: true });
    } catch {
        return Response.json({ authenticated: false });
    }
}
