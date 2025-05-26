import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { FirestoreProvider } from '../firebase/firebase.provider';

@Module({
  imports: [],
  controllers: [RequestsController],
  providers: [RequestsService, FirestoreProvider],
})
export class RequestsModule {}
