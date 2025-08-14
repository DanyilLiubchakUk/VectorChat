import type { Metadata } from "next";
import SignUpClient from "./SignUpClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Sign up | VectorChat",
    description:
        "Create your VectorChat account to start managing data uploads and chat retrieval.",
    alternates: { canonical: "/signup" },
    robots: { index: false, follow: false },
};

export default function SignUpPage() {
    return <SignUpClient />;
}
