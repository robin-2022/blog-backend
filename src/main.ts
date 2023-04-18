import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {

  const port = process.env.PORT || 5000;
  const app: NestApplication  = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
  .setTitle('Blog API')
  .setDescription('Robin')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
