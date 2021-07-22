import { InitService } from './services/init.service';
import { IsNotEmpty, Length } from 'class-validator';
import { Controller, Get, Logger, Post, Req, Res, Param, Query, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Request, Response } from "express";
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from "fs";

class PostMobileUserBody {
  @IsNotEmpty()
  @Length(11, 11)
  mobile_number: string;
  // @Length(10, 20)
  // title: string;

  // @Contains('hello')
  // text: string;

  // @IsInt()
  // @Min(0)
  // @Max(10)
  // rating: number;

  // @IsEmail()
  // email: string;

  // @IsFQDN()
  // site: string;

  // @IsDate()
  // createDate: Date;
}

@Controller()
export class AppController {
  private logger = new Logger("AppController");
  constructor(private readonly _init_service: InitService) {
    _init_service.make_assets_folders();
    _init_service.make_default_users();
  }
}

// {
//   "statusCode": 500,
//   "message": "Internal server error"
// }

// {
//   "statusCode": 400,
//   "message": [
//     "mobile_number must be longer than or equal to 11 characters",
//     "mobile_number should not be empty"
//   ],
//   "error": "Bad Request"
// }

// {
//   "statusCode": 404,
//   "message": "Cannot POST /user-auth/fkgjhdfjkgdf",
//   "error": "Not Found"
// }