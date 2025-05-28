import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('CustomExceptionFilter');

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Obtener el mensaje de error como string
    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as any).message || 'Unexpected error';

    this.logger.error(`Error: ${message} (Status: ${status})`);

    // Manejo específico de "Empty response"
    if (message.toString().includes('Empty response')) {
      return response.status(500).json({
        status: 500,
        message: message.toString(),
      });
    }

    // Respuesta genérica con el status original
    return response.status(status).json({
      status,
      message,
    });
  }
}
