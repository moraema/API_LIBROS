import { INestApplication, ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import { CustomExceptionFilter } from './customException.filter';
import { ResponseInterceptor } from './customResponse.interceptor';
import { CreateBookDto } from 'src/books/infrestructure/ports/class-validator/create-book.dto';
import { UpdateBookDto } from 'src/books/infrestructure/ports/class-validator/update-book.dto';
import { CreateUserDto } from 'src/users/infrestructure/ports/class-validator/user-create.dto';
import { UpdateUserDto } from 'src/users/infrestructure/ports/class-validator/update-user.dto';
import { loginReqDto } from 'src/users/infrestructure/ports/class-validator/login-req.dto';

export const setUp = (app: INestApplication): INestApplication => {
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(
    new ResponseInterceptor()
  )
  app.useGlobalFilters(

    new CustomExceptionFilter(),
  );

  const config = new DocumentBuilder()
    .setTitle('API con NestJS')
    .setDescription('API que se usara para la app de libros')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Ingresa el valor del token, sin la palabra clave "Bearer"',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const configOptions: SwaggerDocumentOptions = {
    extraModels: [
      CreateUserDto,
      CreateBookDto,
      UpdateBookDto,
      UpdateUserDto,
      loginReqDto,
    ],
  };
  const document = SwaggerModule.createDocument(app, config, configOptions);
  SwaggerModule.setup('docs', app, document);
  return app;
};