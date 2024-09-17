import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  console.log("WOMPI_PRIVATE_KEY:", process.env.WOMPI_PRIVATE_KEY);


  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe()); 
  await app.listen(3000);
}
bootstrap();
