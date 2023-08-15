import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const optionsApp = {
    customSiteTitle: 'API Big Chat Brasil',
  };
  const config = new DocumentBuilder()
    .setTitle('API Big Chat Brasil')
    .setDescription('API')
    .setContact('Renan', '', 'renan010222002@hotmail.com')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document, optionsApp);

  await app.listen(3000);
}
bootstrap();
