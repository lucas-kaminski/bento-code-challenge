import { ApiProperty } from '@nestjs/swagger';

export class HealthResponseSwaggerDto {
  @ApiProperty({ example: 'ok' })
  status: string;

  @ApiProperty({ example: 'ok' })
  firestore: string;

  @ApiProperty({ example: '2025-05-25T12:00:00.000Z' })
  timestamp: string;
}
