import { Controller, Get, Post, Req, Res, Body, Param, Query, Logger, Put } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response } from "express";
// import { CategorySchemaName, CategoryDocument } from './categories.schema';
const xss = require("xss");

@Controller("users")
export class UsersController {
  private logger = new Logger("UsersController");
}


// {
//   "statusCode": 500,
//   "message": "Internal server error"
// }