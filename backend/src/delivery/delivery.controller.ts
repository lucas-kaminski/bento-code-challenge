import {
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Headers,
  Req,
  Get,
  Param,
} from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  DeliveryFeeResponseDto,
  DeliveryFeeResponseSwaggerDto,
} from './dto/delivery-fee-response';
import { RequestWithSessionToken } from '../common/middleware/user-session-token.middleware';

@ApiTags('delivery')
@ApiBearerAuth()
@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  private readonly logger = new Logger(DeliveryController.name);

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get delivery fee with margin',
    description:
      'Calculates the delivery fee with a 13% margin and stores the request in Firestore.',
  })
  @ApiResponse({ status: 200, type: DeliveryFeeResponseSwaggerDto })
  @Get('fee/:user_id')
  async getDeliveryFee(
    @Headers('user-agent') userAgent: string | undefined,
    @Req() req: RequestWithSessionToken,
    @Param('user_id') userId: string,
  ): Promise<DeliveryFeeResponseDto> {
    if (!userId) {
      throw new Error('Missing user_id in request params');
    }

    const token = req.userSessionToken || '';

    const payload = {
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
        uuid: userId,
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
