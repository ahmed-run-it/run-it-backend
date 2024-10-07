export interface HttpExceptionResponse {
  statusCode: number;
  error: string;
  service?: string;
  methodController?: string;
  message?: string;
}

export interface CustomHttpExceptionResponse extends HttpExceptionResponse {
  path: string;
  method: string;
  timeStamp: Date;
}
