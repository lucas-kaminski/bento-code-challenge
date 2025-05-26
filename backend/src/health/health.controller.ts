import { Controller, Get, Inject } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';

@Controller('health')
export class HealthController {
  constructor(@Inject('FIRESTORE') private readonly firestore: Firestore) {}

  @Get()
  async getHealth() {
    let firestoreStatus = 'ok';
    try {
      await this.firestore.listCollections();
    } catch (e) {
      console.error('Error pinging Firestore:', e);
      firestoreStatus = 'error';
    }
    return {
      status: 'ok',
      firestore: firestoreStatus,
      timestamp: new Date().toISOString(),
    };
  }
}
