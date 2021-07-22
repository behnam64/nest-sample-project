import { ResponseInterface } from '../../../interfaces/response.interface';
import { UserAuthService } from '../services/user-auth.service';
import { Controller, Get, Post, Req, Res, Body, Param, Query, Logger, Put, HttpStatus } from '@nestjs/common';
import { Request, Response } from "express";
import { environment } from '../../../services/app.env';
import * as jalali_moment from "jalali-moment";

@Controller("user-auth")
export class UserAuthController {
  private logger = new Logger("UserAuthController");
  constructor(
    private _user_auth_service: UserAuthService
  ) {}

  @Get("get-with-token-user")
  async get_with_token_user_route(@Res({passthrough: true}) res: Response) {
    let response: ResponseInterface = await this._user_auth_service.get_with_token_user_service();
    response.timestamp = jalali_moment().unix();
    if(response.statusCode === HttpStatus.OK) return response;
    else res.status(response.statusCode).json(response);
  }
}
