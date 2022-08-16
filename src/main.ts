import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('W3D Webhook')
    .setDescription('W3D Webhook API description')
    .setContact('Vagner Ribeiro', '', 'ribeirovagn@gmail.com')
    .setVersion('1.0')
    .addTag('Ethereum')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.getHttpAdapter().getInstance().disable('x-powered-by');
  await app.listen(3000);
}
bootstrap();
