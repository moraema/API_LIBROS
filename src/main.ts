import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { configService } from './share/config/configService';
import { setUp } from './share/config/setUp';

async function bootstrap() {
  const logger  = new Logger('main-app');
  const port = configService.get('API_PORT');
  let app = await NestFactory.create(AppModule);
  app = setUp(app);
  await app.listen(port);
  logger.log(`API corriendo en el puerto ${port}`)
}
bootstrap();
