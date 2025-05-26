import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Logger,
  Headers,
} from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { BentoFeePayloadDto } from '../bento/dto/bento-fee-payload';
import { DeliveryFeeResponseDto } from './dto/delivery-fee-response';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  private readonly logger = new Logger(DeliveryController.name);

  @Get('fee')
  @HttpCode(HttpStatus.OK)
  async getDeliveryFee(
    @Headers('user-agent') userAgent: string | undefined,
  ): Promise<DeliveryFeeResponseDto> {
    const token = process.env.USER_SESSION_TOKEN;
    if (!token)
      throw new Error('Missing USER_SESSION_TOKEN environment variable');

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

    const response = await this.deliveryService.getDeliveryFeeWithMargin(
      payload,
      token,
    );

    await this.deliveryService.storeRequest({
      originalFee: response.originalFee,
      newFee: response.newFee,
      deliveryTime: response.deliveryTime,
      distanceMeters: response.distanceMeters,
      message: response.message,
      userAgent: userAgent || 'unknown',
      merchantId: payload.merchant.id,
      userUuid: payload.user.uuid,
      coordinates: {
        lat: payload.addressFrom.coordinates.lat,
        lng: payload.addressFrom.coordinates.lng,
      },
    });

    return response;
  }
}
