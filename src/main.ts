import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const moment_tz = require("moment-timezone"); // should be importer for tz function in jalali_moment;
import * as express from "express";
import * as path from "path";
import * as rate_limit from "express-rate-limit";
import * as compression from 'compression';
import * as hpp from "hpp";
import * as mongoSanitize from 'express-mongo-sanitize';
import { environment } from './services/app.env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use("/", rate_limit({max: 100, windowMs: 4000, message: "too many requests"}));
  app.useGlobalPipes(new ValidationPipe());
  app.use(compression());
  app.use(hpp());
  app.use(mongoSanitize());
  app.use(express.static(path.join(__dirname, "..", "..", "assets")));
  await app.listen(environment.PORT);
}
bootstrap();
