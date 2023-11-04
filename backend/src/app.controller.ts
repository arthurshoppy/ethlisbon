import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Survey } from './dtos/app.survey';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get()
  getSurveyResults(): string {
    return this.appService.getSurveyResults();
  }

  @Post()
  postNewSurvey(): Survey {
    return this.appService.postNewSurvey();
  }
}
