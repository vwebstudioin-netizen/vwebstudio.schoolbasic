/**
 * Set Admin Custom Claim
 *
 * Usage:
 *   npx tsx scripts/set-admin.ts <user-email>
 *
 * This script sets the 'admin' custom claim on a Firebase Auth user,
 * granting them access to the admin dashboard.
 *
 * Prerequisites:
 *   - .env.local with Firebase Admin credentials:
 *     FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY
 *   - The user must already exist in Firebase Authentication
 */

import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

// Initialize Firebase Admin using the same env vars as src/lib/firebase-admin.ts
if (!getApps().length) {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    console.error("❌ Firebase Admin credentials not set in .env.local.");
    console.error("   Required: FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY");
    process.exit(1);
  }

  try {
    initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });
  } catch (error) {
    console.error("❌ Failed to initialize Firebase Admin:", error);
    process.exit(1);
  }
}

async function setAdmin(email: string) {
  const auth = getAuth();

  try {
    // Find user by email
    const user = await auth.getUserByEmail(email);
    console.log(`✅ Found user: ${user.displayName || user.email} (${user.uid})`);

    // Set admin custom claim
    await auth.setCustomUserClaims(user.uid, { admin: true });
    console.log(`✅ Admin claim set for ${email}`);
    console.log("");
    console.log("⚠️  The user must sign out and sign back in for changes to take effect.");
  } catch (error: any) {
    if (error.code === "auth/user-not-found") {
      console.error(`❌ No user found with email: ${email}`);
      console.error("   Make sure the user has signed up first.");
    } else {
      console.error("❌ Error:", error.message);
    }
    process.exit(1);
  }
}

// Parse command line args
const email = process.argv[2];

if (!email) {
  console.log("Usage: npx tsx scripts/set-admin.ts <user-email>");
  console.log("");
  console.log("Example:");
  console.log("  npx tsx scripts/set-admin.ts admin@myschool.com");
  process.exit(1);
}

setAdmin(email);
