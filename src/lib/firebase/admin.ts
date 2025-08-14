import * as admin from "firebase-admin";

let firebaseAdminApp: admin.app.App | null = null;

interface ServiceAccount {
    projectId: string;
    clientEmail: string;
    privateKey: string;
}

export function getFirebaseAdminApp(): admin.app.App {
    if (!firebaseAdminApp) {
        if (!admin.apps.length) {
            const serviceAccount: ServiceAccount = {
                projectId:
                    process.env.FIREBASE_PROJECT_ID ||
                    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
                    "",
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL || "",
                privateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(
                    /\\n/g,
                    "\n"
                ),
            };

            firebaseAdminApp = admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
        } else {
            firebaseAdminApp = admin.apps[0]!;
        }
    }

    return firebaseAdminApp;
}

export function getFirebaseAdminAuth(): admin.auth.Auth {
    return admin.auth(getFirebaseAdminApp());
}
