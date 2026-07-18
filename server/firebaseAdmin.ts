import admin from "firebase-admin";

import serviceAccount from "../zenvex-pesticontorl-firebase-adminsdk-fbsvc-a724023db9.json";

if (!admin.apps.length) {
    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
}

export const adminAuth = admin.auth();
export const adminDB = admin.firestore();