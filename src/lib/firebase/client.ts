import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

let firebaseApp: FirebaseApp | null = null;

export function getFirebaseApp(): FirebaseApp | null {
    if (typeof window === "undefined") return null;

    if (!firebaseApp && !getApps().length) {
        firebaseApp = initializeApp(firebaseConfig);
    }

    return firebaseApp;
}

export function getFirebaseAuth(): Auth | null {
    const app = getFirebaseApp();
    return app ? getAuth(app) : null;
}
