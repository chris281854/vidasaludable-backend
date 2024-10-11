import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api/server");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("VidaSaludable API")
    .setDescription("API para el manejo del software de VidaSaludable")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);
  await app.listen(parseInt(process.env.PORT)|| 3030 || 3030);
}
bootstrap();
