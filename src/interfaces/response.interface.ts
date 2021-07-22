import { HttpStatus } from '@nestjs/common';

export interface ResponseInterface {
  statusCode: HttpStatus,
  timestamp?: number,
  errCode?: number,
  message?: string,
  data?: any,
  auth?: string,
  token?: string,
}