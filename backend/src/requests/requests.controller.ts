import { Controller, Get, Query } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { RequestLogSwaggerDto } from './dto/request-log.dto';

@ApiTags('requests')
@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Get('last')
  @ApiOperation({
    summary: 'Get last requests',
    description: 'Returns the last N delivery fee requests.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of requests to return (default: 10)',
  })
  @ApiResponse({
    status: 200,
    description: 'Array of last requests',
    type: RequestLogSwaggerDto,
    isArray: true,
  })
  async getLastRequests(
    @Query('limit') limit?: string,
  ): Promise<RequestLogSwaggerDto[]> {
    const parsedLimit = limit ? parseInt(limit, 10) : 10;
    return this.requestsService.getLastRequests(parsedLimit) as Promise<
      RequestLogSwaggerDto[]
    >;
  }
}
