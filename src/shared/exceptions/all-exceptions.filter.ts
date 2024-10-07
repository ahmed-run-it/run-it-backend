import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  CustomHttpExceptionResponse,
  HttpExceptionResponse,
} from './models/http-exception-response.interface';
import { ApiException } from './api.exception';

// Constants for default values
const UNKNOWN_SERVICE = 'Unknown Service';
const UNKNOWN_METHOD = 'Unknown Method';
const UNKNOWN_ERROR = 'Unknown error';

/**
 * Exception filter that handles all exceptions thrown in the application.
 * It logs the error and formats the response according to a predefined structure.
 */
@Injectable()
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger: Logger;

  constructor() {
    // Initializes a logger instance specific to this filter.
    this.logger = new Logger(AllExceptionsFilter.name);
  }

  /**
   * Catches the thrown exception and handles it by formatting the error response
   * and logging the error details.
   *
   * @param exception - The exception thrown by the application.
   * @param host - The context of the exception, providing access to the request and response objects.
   */
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Extracts formatted exception details.
    const { statusCode, error, service, methodController, message } =
      this.formatException(exception);

    // Constructs the error message.
    const errorMessage: string = `${error}${message ? '  ' + message : ''}`;

    // Prepares the error response to be sent to the client.
    const errorResponse: CustomHttpExceptionResponse = this.getErrorResponse(
      statusCode || HttpStatus.INTERNAL_SERVER_ERROR, // Ensures a default status code
      errorMessage,
      request,
      service,
      methodController,
    );

    // Sends the error response back to the client.
    response
      .status(statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .json(errorResponse);

    // Logs the error if it's not an instance of ApiException.
    if (!(exception instanceof ApiException)) {
      this.logger.error(
        `[${exception?.constructor?.name || 'UnknownException'}] [${statusCode || HttpStatus.INTERNAL_SERVER_ERROR} Status]
         [Message: ${errorMessage}]
         [Path: ${request.url}] [Method: ${request.method}]`,
      );
    }
  }

  /**
   * Constructs a formatted error response object.
   *
   * @param statusCode - The HTTP status code to be sent in the response.
   * @param error - The error message to be included in the response.
   * @param request - The request object containing details about the incoming request.
   * @param service - Optional name of the service where the error occurred.
   * @param methodController - Optional name of the controller method where the error occurred.
   * @returns A structured error response object.
   */
  private getErrorResponse(
    statusCode: HttpStatus,
    error: string,
    request: Request,
    service?: string,
    methodController?: string,
  ): CustomHttpExceptionResponse {
    return {
      statusCode,
      error,
      service: service || UNKNOWN_SERVICE, // Default values in case data is missing
      methodController: methodController || UNKNOWN_METHOD,
      path: request.url,
      method: request.method,
      timeStamp: new Date(), // Records the time of the error
    };
  }

  /**
   * Formats the exception into a structured response format.
   *
   * @param exception - The exception object to be formatted.
   * @returns A structured object containing relevant error details.
   */
  private formatException(exception: unknown): HttpExceptionResponse {
    // Cast the exception to any to safely access properties
    const ex = exception as any;

    return {
      message: ex?.response?.message || UNKNOWN_ERROR, // Ensures a default value
      service: ex?.response?.service || UNKNOWN_SERVICE,
      statusCode: ex?.response?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      methodController: ex?.response?.methodController || UNKNOWN_METHOD,
      error: ex?.response?.error || UNKNOWN_ERROR,
    };
  }
}
