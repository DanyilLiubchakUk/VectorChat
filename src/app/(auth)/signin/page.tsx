import type { Metadata } from "next";
import SignInClient from "./SignInClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Sign in | VectorChat",
    description:
        "Sign in to VectorChat to manage data uploads and chat retrieval.",
    alternates: { canonical: "/signin" },
    robots: { index: false, follow: false },
};

export default function SignInPage() {
    return <SignInClient />;
}
