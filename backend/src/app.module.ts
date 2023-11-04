import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SurveyModule } from './survey/survey.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, SurveyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
