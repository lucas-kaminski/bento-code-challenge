import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { FirestoreProvider } from '../firebase/firebase.provider';

@Module({
  controllers: [HealthController],
  providers: [FirestoreProvider],
})
export class HealthModule {}
