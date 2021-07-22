import { AppMiddleware } from './services/app.middleware';
import { AuthenticationService } from './authentication/authentication.service';
import { UserAuthService } from './components/users/services/user-auth.service';
import { UserAuthController } from './components/users/controllers/user-auth.controller';
import { UsersController } from './components/users/controllers/users.controller';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserSchema, UserSchemaName } from './schemas/users.schema';
import { InitService } from './services/init.service';
import { environment } from './services/app.env';

@Module({
  imports: [
    MongooseModule.forRoot(environment.MONGODB_URI, {useNewUrlParser: true, useCreateIndex: true}),
    MongooseModule.forFeature([{ name: UserSchemaName, schema: UserSchema }]),
  ],
  controllers: [
    AppController,
    UserAuthController,
    UsersController,
  ],
  providers: [
    {provide: APP_GUARD, useClass: AuthenticationGuard},
    AuthenticationService,
    InitService,
    UserAuthService
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppMiddleware).forRoutes("*");
  }
}
