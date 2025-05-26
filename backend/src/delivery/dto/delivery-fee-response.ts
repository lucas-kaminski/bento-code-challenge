import { ApiProperty } from '@nestjs/swagger';

export class DeliveryFeeResponseDto {
  originalFee: number;
  newFee: number;
  deliveryTime: number;
  distanceMeters: number;
  message: string | null;
}

export class DeliveryFeeResponseSwaggerDto {
  @ApiProperty({ example: 8.13 })
  originalFee: number;

  @ApiProperty({ example: 9.19 })
  newFee: number;

  @ApiProperty({ example: 0 })
  deliveryTime: number;

  @ApiProperty({ example: 6651.61 })
  distanceMeters: number;

  @ApiProperty({ example: null })
  message: string | null;
}
