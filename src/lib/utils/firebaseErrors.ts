export interface FirebaseErrorInfo {
    code: string;
    userMessage: string;
    category: "auth" | "network" | "validation" | "system";
}

export const getFirebaseAuthErrorMessage = (errorMessage: string): string => {
    const errorMap: Record<string, string> = {
        // Authentication errors
        "auth/user-not-found": "No account found with this email address",
        "auth/wrong-password": "Incorrect password. Please try again",
        "auth/invalid-credential":
            "Invalid email or password. Please try again",
        "auth/invalid-email": "Please enter a valid email address",
        "auth/weak-password":
            "Password is too weak. Please choose a stronger password (at least 6 characters)",
        "auth/email-already-in-use":
            "An account with this email already exists. Please sign in instead",
        "auth/operation-not-allowed":
            "Email/password sign up is not enabled. Please contact support",
        "auth/too-many-requests":
            "Too many failed attempts. Please try again later",
        "auth/user-disabled":
            "This account has been disabled. Please contact support",
        "auth/requires-recent-login": "Please sign in again to continue",
        "auth/account-exists-with-different-credential":
            "An account already exists with the same email but different sign-in credentials",
        "auth/credential-already-in-use":
            "This credential is already associated with a different user account",

        // Google Sign-in specific errors
        "auth/popup-closed-by-user": "Sign in was cancelled. Please try again",
        "auth/popup-blocked":
            "Pop-up was blocked. Please allow pop-ups and try again",
        "auth/cancelled-popup-request":
            "Sign in was cancelled. Please try again",

        // Network and system errors
        "auth/network-request-failed":
            "Network error. Please check your connection and try again",
        "auth/quota-exceeded":
            "Service temporarily unavailable. Please try again later",
        "auth/unauthorized-domain":
            "This domain is not authorized for sign up. Please contact support",
        "auth/app-deleted": "This app has been deleted. Please contact support",
        "auth/app-not-authorized":
            "This app is not authorized. Please contact support",
        "auth/invalid-api-key": "Configuration error. Please contact support",
        "auth/invalid-app-name": "Configuration error. Please contact support",
        "auth/invalid-user-token":
            "Your session has expired. Please sign in again",
        "auth/invalid-tenant-id": "Configuration error. Please contact support",
        "auth/tenant-id-mismatch":
            "Configuration error. Please contact support",
        "auth/unsupported-persistence-type":
            "Configuration error. Please contact support",
        "auth/user-cancelled": "Sign up was cancelled. Please try again",
        "auth/user-token-expired":
            "Your session has expired. Please sign in again",
        "auth/web-storage-unsupported":
            "Your browser doesn't support required features. Please try a different browser",

        // Verification errors
        "auth/invalid-verification-code":
            "Invalid verification code. Please try again",
        "auth/invalid-verification-id":
            "Invalid verification ID. Please try again",
        "auth/missing-verification-code":
            "Verification code is required. Please check your email",
        "auth/missing-verification-id":
            "Verification ID is missing. Please try again",

        // General errors
        "auth/argument-error":
            "Invalid arguments provided. Please check your input",
        "auth/not-signed-in": "You must be signed in to perform this action",
        "auth/firebase-not-initialized":
            "Firebase not initialized. Please refresh the page and try again",
    };

    // Find the matching error message
    for (const [errorCode, message] of Object.entries(errorMap)) {
        if (errorMessage.includes(errorCode)) {
            return message;
        }
    }

    // Default fallback message
    return "Something went wrong. Please check your details and try again.";
};

export const getFirebaseErrorInfo = (
    errorMessage: string
): FirebaseErrorInfo => {
    const userMessage = getFirebaseAuthErrorMessage(errorMessage);

    // Categorize the error for potential future use
    let category: "auth" | "network" | "validation" | "system" = "system";

    if (
        errorMessage.includes("auth/network-request-failed") ||
        errorMessage.includes("auth/quota-exceeded")
    ) {
        category = "network";
    } else if (
        errorMessage.includes("auth/invalid-email") ||
        errorMessage.includes("auth/weak-password") ||
        errorMessage.includes("auth/invalid-credential")
    ) {
        category = "validation";
    } else if (
        errorMessage.includes("auth/") ||
        errorMessage.includes("popup") ||
        errorMessage.includes("credential")
    ) {
        category = "auth";
    }

    return {
        code: errorMessage,
        userMessage,
        category,
    };
};
