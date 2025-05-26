import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as fs from 'fs';

export const FirestoreProvider = {
  provide: 'FIRESTORE',
  useFactory: () => {
    const path = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    if (!path) {
      throw new Error('GOOGLE_APPLICATION_CREDENTIALS not set');
    }
    if (!fs.existsSync(path)) {
      throw new Error(`Credential file not found: ${path}`);
    }
    const credential = cert(
      JSON.parse(
        fs.readFileSync(path, 'utf8'),
      ) as import('firebase-admin').ServiceAccount,
    );
    const app =
      getApps().length === 0 ? initializeApp({ credential }) : getApps()[0];

    const firestore = getFirestore(app);

    return firestore;
  },
};
