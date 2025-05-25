import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    HealthModule,
    LoggerModule.forRoot({
      pinoHttp: {},
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
