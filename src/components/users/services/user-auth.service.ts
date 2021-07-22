import { ResponseInterface } from '../../../interfaces/response.interface';
import { environment } from './../../../services/app.env';
import { Role } from '../../../authentication/authentication.enum';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchemaName, UserDocument } from '../../../schemas/users.schema';
import { Model } from 'mongoose';
import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import { Response } from "express";
const jalali_moment = require("jalali-moment");
import * as voucher_code from "voucher-code-generator";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UserAuthService {
  private logger = new Logger("UserAuthService");

  constructor(
    @InjectModel(UserSchemaName) private UserModel: Model<UserDocument>,
    private _authenticationService: AuthenticationService,
  ) {}

  limitList = "_id first_name last_name";
  dateString = JSON.stringify({next_password: {count: 1, number: null, date: null}, next_sms: {count: 1, number: 2, date: null, exp: null}, next_code: {count: 1, number: null, date: null, exp: null}, next_reset_sms: {count: 1, number: 2, date: null, exp: null}, next_reset_code: {count: 1, number: null, date: null, exp: null}, code: null, reset_code: null});

  async get_with_token_user_service() {
    const user = await this.UserModel.findOne({mobile_number: this._authenticationService.user.mobile_number}, this.limitList).lean();
    if(user) {
      delete user.password;
      const response: ResponseInterface = {statusCode: HttpStatus.OK, data: user};
      return response;
    } else {
      const response: ResponseInterface = {statusCode: HttpStatus.BAD_REQUEST, message: "user not found"};
      return response;
    }
  }
}
