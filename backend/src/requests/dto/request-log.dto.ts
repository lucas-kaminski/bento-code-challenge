import { ApiProperty } from '@nestjs/swagger';

export class RequestLogSwaggerDto {
  @ApiProperty({ example: 'abc123' })
  id: string;

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

  @ApiProperty({ example: '2025-05-25T12:00:00.000Z' })
  timestamp: string;

  @ApiProperty({ example: 'Mozilla/5.0' })
  userAgent: string;

  @ApiProperty({ example: { lat: 19.3331008, lng: -81.3801101 } })
  coordinates: { lat: number; lng: number };

  @ApiProperty({ example: 'USER_UUID' })
  userUuid: string;

  @ApiProperty({ example: '8JbEqL0RTgHfRREvtSuO' })
  merchantId: string;
}
