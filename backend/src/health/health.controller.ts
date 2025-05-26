import { Controller, Get, Inject } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthResponseSwaggerDto } from './dto/health-response.dto';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(@Inject('FIRESTORE') private readonly firestore: Firestore) {}

  @Get()
  @ApiOperation({
    summary: 'Health check',
    description:
      'Returns the health status of the API and Firestore connection.',
  })
  @ApiResponse({
    status: 200,
    description: 'Health status object',
    type: HealthResponseSwaggerDto,
  })
  async getHealth(): Promise<HealthResponseSwaggerDto> {
    let firestoreStatus = 'ok';
    try {
      await this.firestore.listCollections();
    } catch (e) {
      console.error('Error pinging Firestore:', e);
      firestoreStatus = 'error';
    }
    return {
      status: 'ok',
      firestore: firestoreStatus,
      timestamp: new Date().toISOString(),
    };
  }
}
