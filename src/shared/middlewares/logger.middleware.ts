import { HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * LoggerMiddleware is a custom middleware for logging incoming requests and their responses.
 * It implements the NestMiddleware interface provided by NestJS.
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger: Logger;

  /**
   * Constructor to initialize the LoggerMiddleware.
   * A logger instance is created for logging messages with the name of this middleware.
   */
  constructor() {
    this.logger = new Logger(LoggerMiddleware.name);
  }

  /**
   * The main middleware function that is executed for each incoming request.
   *
   * @param request - The incoming HTTP request object.
   * @param response - The outgoing HTTP response object.
   * @param next - A function that, when called, will pass control to the next middleware in the stack.
   */
  use(request: Request, response: Response, next: NextFunction): void {
    // Extract relevant information from the request object
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    // Attach a listener to the response 'finish' event
    response.on('finish', () => {
      const { statusCode } = response; // Get the HTTP status code of the response
      // Construct a log message with the request and response details
      const msg = `Method [${method}] OriginalUrl [${originalUrl}] Status [${statusCode}] UserAgent [${userAgent}] IP [${ip}]`;

      // Log the message with different severity levels based on the status code
      if (statusCode < HttpStatus.BAD_REQUEST) {
        this.logger.verbose(msg); // Log as verbose for successful responses
      } else {
        this.logger.warn(msg); // Log as a warning for error responses
      }
    });

    // Try to execute the next middleware or route handler
    try {
      next();
    } catch (error) {
      // Log any errors that occur during the execution of the middleware
      this.logger.error(`Error occurred: ${error.message}`);
      // Send an Internal Server Error response to the client
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Internal Server Error');
    }
  }
}
