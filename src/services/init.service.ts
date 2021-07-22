import { UserSchemaName, UserDocument } from '../schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import * as fs from "fs";
import { Model } from 'mongoose';
import * as bcrypt from "bcryptjs";

@Injectable()
export class InitService {
  logger = new Logger("InitService");

  constructor(@InjectModel(UserSchemaName) private UserModel: Model<UserDocument>,) {}

  async make_assets_folders() {
    try {
      var dir = '../assets';
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }
      this.logger.log("asset folders created");
    } catch (error) {
      this.logger.log("asset folders not created", error);
    }
  }

  async make_default_users() {
    try {
      for(let i = 0; i < this.users.length; i++) {
        let d = await this.UserModel.findOne({mobile_number: this.users[i].mobile_number});
        if(!d) {
          var hash = bcrypt.hashSync(this.users[i].password, bcrypt.genSaltSync(12));
          this.users[i].password = hash;
          await this.UserModel.create(this.users[i]);
        }
      }
      this.logger.log("defult users created");
    } catch (error) {
      this.logger.log("defult users not created", error);
    }
  }

  users = [
  ];
}
