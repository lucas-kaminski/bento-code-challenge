import { Inject, Injectable } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';
import { DELIVERY_REQUESTS_LOG_COLLECTION_NAME } from '../firebase/firebase.utils';

@Injectable()
export class RequestsService {
  constructor(@Inject('FIRESTORE') private readonly firestore: Firestore) {}

  async getLastRequests(limit = 10): Promise<any[]> {
    const snapshot = await this.firestore
      .collection(DELIVERY_REQUESTS_LOG_COLLECTION_NAME)
      .orderBy('timestamp', 'desc')
      .limit(limit)
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
}
