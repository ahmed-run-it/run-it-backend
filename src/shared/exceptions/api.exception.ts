import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpExceptionResponse } from './models/http-exception-response.interface';

/**
 * Custom exception class for API errors.
 * Inherits from NestJS HttpException to standardize error responses.
 */
export class ApiException extends HttpException {
  /**
   * Constructs a new ApiException.
   * @param {HttpExceptionResponse} exceptionDetails - Details of the exception, including status code and error message.
   */
  constructor(exceptionDetails: HttpExceptionResponse) {
    super(exceptionDetails, exceptionDetails.statusCode);
  }
}

/**
 * Generates and throws an ApiException based on the provided error.
 * Optionally logs the error using the provided Logger instance.
 *
 * @param {any} exception - The error that occurred, can be of any type.
 * @param {string} [service] - The name of the service where the error occurred, used for logging context.
 * @param {Logger} [logger] - Optional Logger instance for logging error messages.
 * @throws {ApiException} Throws an ApiException with structured error details.
 */
export function generateException(
  exception: any,
  service?: string,
  logger?: Logger,
) {
  // Check if the exception is an instance of ApiException
  const isApiException = exception instanceof ApiException;

  // Prepare service context for logging
  const _service = service ? `[${service} Method]` : '';

  // Determine the HTTP status code to return
  const _status = isApiException
    ? (exception.getResponse() as HttpExceptionResponse).statusCode
    : exception?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;

  // Initialize error details
  let _error: any;

  // Extract error details based on the type of exception
  if (isApiException) {
    _error = (exception.getResponse() as HttpExceptionResponse).error;
  } else if (exception?.code === 'ECONNREFUSED') {
    _error = exception?.code;
  } else {
    _error = exception?.response?.data || exception.response || 'Unknown error';
  }

  // Log the error details if a logger is provided
  if (logger) {
    logger.error(
      `${_service} [${_status} Status] Message: ${
        isApiException ? _error : JSON.stringify(_error)
      }`,
    );
  }

  // Throw a new ApiException with structured error response
  throw new ApiException({
    service,
    statusCode: _status,
    error: isApiException ? _error : exception.message,
  });
}
