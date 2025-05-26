import { Module } from '@nestjs/common';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { BentoModule } from '../bento/bento.module';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [BentoModule, FirebaseModule],
  controllers: [DeliveryController],
  providers: [DeliveryService],
})
export class DeliveryModule {}
