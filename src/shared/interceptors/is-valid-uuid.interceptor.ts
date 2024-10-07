import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { Request } from 'express';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiException } from '../exceptions/api.exception';

/**
 * Interceptor to validate UUID parameters in the request.
 * This interceptor checks if specified parameters in the URL are valid UUIDs
 * and throws an ApiException if any of them are invalid.
 */
@Injectable()
export class IsValidUuidInterceptor implements NestInterceptor {
  private readonly paramsNames: string[];
  private readonly serviceName: string;
  private readonly logger: Logger;

  /**
   * Constructs an instance of IsValidUuidInterceptor.
   * @param paramsNames - The names of the URL parameters to validate as UUIDs.
   * @param serviceName - Optional name of the service for logging purposes.
   */
  constructor(
    paramsNames: string[] = [],
    serviceName: string = 'UnknownService',
  ) {
    this.paramsNames = paramsNames;
    this.serviceName = serviceName;
    this.logger = new Logger(IsValidUuidInterceptor.name);
  }

  /**
   * Intercepts the request and validates the specified UUID parameters.
   * @param context - The execution context providing details about the current request.
   * @param next - The next handler to call after validation.
   * @returns An Observable that resolves to the response from the next handler.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    // Validate each parameter in paramsNames.
    this.paramsNames.forEach((paramName) => {
      const paramValue = request.params[paramName];

      // Check if the parameter is a valid UUID.
      if (!isUUID(paramValue)) {
        const errorMessage = `Bad request: ${paramName} is not valid`;

        this.logger.error(
          `[${context.getClass().name}] [${this.serviceName} Method] URL [${request.url}] Method [${request.method}] [${HttpStatus.BAD_REQUEST} Status] Error: ${errorMessage}`,
        );

        // Throw an ApiException with detailed error information.
        throw new ApiException({
          statusCode: HttpStatus.BAD_REQUEST,
          methodController: this.serviceName,
          error: errorMessage,
        });
      }
    });

    // Continue to the next handler.
    return next.handle().pipe(catchError((error) => throwError(() => error)));
  }
}
