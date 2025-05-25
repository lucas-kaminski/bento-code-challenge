import { Controller, HttpCode, HttpStatus, Get, Logger } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { BentoFeePayloadDto } from '../bento/dto/bento-fee-payload';
import { DeliveryFeeResponseDto } from './dto/delivery-fee-response';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  private readonly logger = new Logger(DeliveryController.name);

  @Get('fee')
  @HttpCode(HttpStatus.OK)
  async getDeliveryFee(): Promise<DeliveryFeeResponseDto> {
    const token = 'Bearer ' + process.env.USER_SESSION_TOKEN;

    if (!process.env.USER_UUID) {
      throw new Error('Missing USER_UUID environment variable');
    }

    const payload: BentoFeePayloadDto = {
      addressFrom: {
        coordinates: {
          lat: 19.3331008,
          lng: -81.3801101,
        },
      },
      addressTo: {
        coordinatesAdjustment: {
          lat: 19.280354483797733,
          lng: -81.37386862188578,
        },
      },
      merchant: {
        id: '8JbEqL0RTgHfRREvtSuO',
      },
      user: {
        uuid: process.env.USER_UUID,
      },
    };

    return this.deliveryService.getDeliveryFeeWithMargin(payload, token);
  }
}
