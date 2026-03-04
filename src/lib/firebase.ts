"use client";

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Only initialise when a real API key is present (prevents build-time crashes)
export const hasValidConfig = !!firebaseConfig.apiKey && firebaseConfig.apiKey !== "";

let app: FirebaseApp | undefined;
if (hasValidConfig) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
}

// Provide typed stubs when Firebase isn't available (build time)
export const auth: Auth = hasValidConfig && app ? getAuth(app) : ({} as Auth);
export const db: Firestore = hasValidConfig && app ? getFirestore(app) : ({} as Firestore);
export const storage: FirebaseStorage = hasValidConfig && app ? getStorage(app) : ({} as FirebaseStorage);
export default app;
