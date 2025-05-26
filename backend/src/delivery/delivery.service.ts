import { Inject, Injectable } from '@nestjs/common';
import { BentoService } from '../bento/bento.service';
import { BentoFeePayloadDto } from '../bento/dto/bento-fee-payload';
import { DeliveryFeeResponseDto } from './dto/delivery-fee-response';

import { Firestore } from 'firebase-admin/firestore';
import { DELIVERY_REQUESTS_LOG_COLLECTION_NAME } from 'src/firebase/firebase.utils';

@Injectable()
export class DeliveryService {
  constructor(
    private readonly bentoService: BentoService,
    @Inject('FIRESTORE') private readonly firestore: Firestore,
  ) {}

  async storeRequest(
    params: DeliveryFeeResponseDto & {
      userAgent: string;
      coordinates: { lat: number; lng: number };
      userUuid: string;
      merchantId: string;
    },
  ): Promise<void> {
    await this.firestore.collection(DELIVERY_REQUESTS_LOG_COLLECTION_NAME).add({
      originalFee: params.originalFee,
      newFee: params.newFee,
      deliveryTime: params.deliveryTime,
      distanceMeters: params.distanceMeters,
      message: params.message,
      timestamp: new Date().toISOString(),
      userAgent: params.userAgent,
      coordinates: params.coordinates,
      userUuid: params.userUuid,
      merchantId: params.merchantId,
    });
  }

  async getDeliveryFeeWithMargin(
    payload: BentoFeePayloadDto,
    token: string,
  ): Promise<DeliveryFeeResponseDto> {
    const bentoData = await this.bentoService.getDeliveryFee(payload, token);

    const originalFee = +(bentoData.fee / 100).toFixed(2);
    const newFee = +(originalFee * 1.13).toFixed(2);

    return {
      originalFee,
      newFee,
      deliveryTime: bentoData.deliveryTime,
      distanceMeters: bentoData.distanceMeters,
      message: bentoData.message ?? null,
    };
  }
}
