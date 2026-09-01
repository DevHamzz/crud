import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module.js';
import { User } from './users/entities/user.entity.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:'localhost',
      port: 5432,
      username: 'postgres',
      entities: [User],
      password: '24434Hamzah@$$#$',
      database: 'crud',
      synchronize: true,
      logging: true,
    }),
    UsersModule,
  ],  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
