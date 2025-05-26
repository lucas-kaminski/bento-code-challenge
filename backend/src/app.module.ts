import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { LoggerModule } from 'nestjs-pino';
import { DeliveryModule } from './delivery/delivery.module';
import { RequestsModule } from './requests/requests.module';
import { UserSessionTokenMiddleware } from './common/middleware/user-session-token.middleware';
import { JwtValidationMiddleware } from './common/middleware/jwt-validation.middleware';

@Module({
  imports: [
    HealthModule,
    DeliveryModule,
    RequestsModule,
    ConfigModule.forRoot({ isGlobal: true }),
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
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserSessionTokenMiddleware, JwtValidationMiddleware)
      .forRoutes('*');
  }
}
