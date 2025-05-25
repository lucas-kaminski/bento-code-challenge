import { Injectable } from '@nestjs/common';
import { BentoService } from '../bento/bento.service';
import { BentoFeePayloadDto } from '../bento/dto/bento-fee-payload';
import { DeliveryFeeResponseDto } from './dto/delivery-fee-response';

@Injectable()
export class DeliveryService {
  constructor(private readonly bentoService: BentoService) {}

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
