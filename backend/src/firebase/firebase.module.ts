import { Module } from '@nestjs/common';
import { FirestoreProvider } from './firebase.provider';

@Module({
  providers: [FirestoreProvider],
  exports: [FirestoreProvider],
})
export class FirebaseModule {}
