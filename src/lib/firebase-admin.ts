import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

function getAdminApp(): App {
  if (getApps().length > 0) return getApps()[0];

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Firebase Admin SDK is not configured. Set FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, and FIREBASE_ADMIN_PRIVATE_KEY environment variables."
    );
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

// Lazy getters so the admin SDK is only initialized when actually used at runtime
export const getAdminAuth = () => getAuth(getAdminApp());
export const getAdminDb = () => getFirestore(getAdminApp());
export const getAdminStorage = () => getStorage(getAdminApp());

// Backward-compatible exports (lazy)
export const adminAuth = new Proxy({} as ReturnType<typeof getAuth>, {
  get(_target, prop) {
    return (getAuth(getAdminApp()) as any)[prop];
  },
});
export const adminDb = new Proxy({} as ReturnType<typeof getFirestore>, {
  get(_target, prop) {
    return (getFirestore(getAdminApp()) as any)[prop];
  },
});
export const adminStorage = new Proxy({} as ReturnType<typeof getStorage>, {
  get(_target, prop) {
    return (getStorage(getAdminApp()) as any)[prop];
  },
});
