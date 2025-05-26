import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const { AllExceptionsFilter } = await import(
    './filters/http-exception.filter'
  );
  app.useGlobalFilters(new AllExceptionsFilter());

  app.useLogger(app.get(Logger));

  const config = new DocumentBuilder()
    .setTitle('Bento Code Challenge API')
    .setDescription('Docs for Bento Code Challenge API')
    .setVersion('0.0.1')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Enter JWT Bearer token',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [],
    deepScanRoutes: true,
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });
  document.components = document.components || {};
  document.components.securitySchemes =
    document.components.securitySchemes || {};
  document.components.securitySchemes.bearer = {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  };
  document.security = [{ bearer: [] }];

  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT;

  if (!port) {
    throw new Error('PORT environment variable is not set');
  }

  await app.listen(port);
}

bootstrap().catch((err) => {
  console.error('Error starting the application:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
