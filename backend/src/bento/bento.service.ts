import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { BentoFeePayloadDto } from './dto/bento-fee-payload';
import { BentoFeeResponseDto } from './dto/bento-fee-response';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BentoService {
  private readonly logger = new Logger(BentoService.name);

  constructor(private readonly httpService: HttpService) {}

  async getDeliveryFee(
    payload: BentoFeePayloadDto,
    token: string,
  ): Promise<BentoFeeResponseDto> {
    try {
      const url = `${process.env.BENTO_API_URL}/delivery/fee`;
      const response = await firstValueFrom(
        this.httpService.post(url, payload, {
          headers: {
            accept: 'application/json',
            authorization: token,
            'content-type': 'application/json',
          },
          validateStatus: () => true,
        }),
      );

      const data = response.data as {
        fee: number;
        deliveryTime: number;
        distanceMeters: number;
        message?: string;
      };
      if (
        typeof data.fee !== 'number' ||
        typeof data.deliveryTime !== 'number' ||
        typeof data.distanceMeters !== 'number'
      ) {
        throw new HttpException(
          'Invalid Bento API response',
          HttpStatus.BAD_GATEWAY,
        );
      }
      return {
        fee: data.fee,
        deliveryTime: data.deliveryTime,
        distanceMeters: data.distanceMeters,
        message: data.message ?? null,
      };
    } catch (err: unknown) {
      const error = err as {
        response?: { status?: number };
        message?: unknown;
        status?: unknown;
      };
      if (
        typeof error?.response?.status === 'number' &&
        error.response.status === 401
      ) {
        throw new HttpException(
          'The token used to call the Bento API is invalid or is expired, try to re-login, collect a new token and try again',
          HttpStatus.UNAUTHORIZED,
        );
      }
      throw new HttpException(
        typeof error?.message === 'string'
          ? error.message +
            '\nThere was an error calling the Bento API and we could not get the delivery fee'
          : 'Unexpected error while calling the Bento API, please try again later',
        typeof error?.status === 'number'
          ? error.status
          : HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
