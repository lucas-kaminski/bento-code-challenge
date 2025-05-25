import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { LoggerModule } from 'nestjs-pino';
import { DeliveryModule } from './delivery/delivery.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  translateTime: 'SYS:standard',
                  ignore: 'pid,hostname',
                  singleLine: true,
                },
              }
            : undefined,
        serializers: {
          err: (err: unknown) => {
            if (typeof err === 'object' && err !== null) {
              const e = err as {
                type?: string;
                message?: string;
                stack?: string;
              };
              return {
                type: e.type ?? 'Error',
                message: e.message ?? '',
                stack: e.stack ?? '',
              };
            }
            return { type: 'Error', message: String(err), stack: '' };
          },
        },
      },
    }),
    DeliveryModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
