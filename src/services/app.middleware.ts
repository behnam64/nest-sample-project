import { environment } from './app.env';
import { AuthenticationService } from './../authentication/authentication.service';
import { Injectable, NestMiddleware, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as cookie from "cookie";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AppMiddleware implements NestMiddleware {
  constructor(private _authenticationService: AuthenticationService) {}
  async use(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Set-Cookie, Cookie');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    var origin = req.get('origin');
    origin ? res.setHeader("Access-Control-Allow-Origin", origin) : null;
    this._authenticationService.user = {user_type: 0};
    this._authenticationService.AuthJWT = null;
    if(environment.COOKIE === "true") {
      if(req.headers.cookie) {
        req.cookies = cookie.parse(req.headers.cookie);
      }
    } else {
      req.cookies = {}
      req.query.token ? req.cookies.token = req.query.token : null;
      req.query.auth ? req.cookies.auth = req.query.auth : null;
    }
    if(req.cookies) {
      if(req.cookies.token) {
        const user = await this.verifyJWT(req.cookies.token);
        user ? this._authenticationService.user = user : null;
      }
      if(req.cookies.auth) {
        const AuthJWT = await this.verifyJWT(req.cookies.auth);
        AuthJWT ? this._authenticationService.AuthJWT = AuthJWT : null;
      }
    }
    if(req.method === "OPTIONS") {
      res.status(HttpStatus.OK).end();
    } else {
      next();
    }
  }

  verifyJWT = (token): Promise<any> => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, environment.TOKEN, function(err, decoded) {
        if(decoded) {
          resolve(decoded);
        } else {
          resolve(null);
        }
      });
    })
  }
}
