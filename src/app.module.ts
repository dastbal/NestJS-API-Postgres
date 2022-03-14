import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PizzasModule } from './pizzas/pizzas.module';
import { DatabseModule } from './database/database.module';
import { enviroments } from './enviroments';
import { AuthModule } from './auth/auth.module';
import config from './config';

@Module({
  imports: [
    UsersModule,
    PizzasModule,
    DatabseModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.prod.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_HOST: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
      }),
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
