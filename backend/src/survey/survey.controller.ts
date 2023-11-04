// src/surveys/surveys.controller.ts
import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateSurveyDto } from './dtos/create-survey.dto';
import { SurveyResponseDto } from './dtos/survey-response.dto';

@Controller('surveys')
export class SurveysController {
  constructor(private readonly surveyService: SurveyService) {}


  @Post()
  //auth token
  async createSurvey(@Body() body: any) {
    // UUID for survey
    return this.surveyService.createSurvey(body.title, body.questions);
  }

  @Get(':id')
  async getSurvey(@Param('id') id: string) {
    return this.surveyService.getSurvey(parseInt(id));
  }
  @Get (':id/my-survey')
  async getMySurvey(){
    // UUID of survey matching with user address. 
    return ;
  }

  // Save the user's response to a survey
  @Post(':id/response')
  //auth token
  async saveSurveyResponse(@Param('id') id: string, @Body() body: SurveyResponseDto) {
    return this.surveyService.saveResponse(parseInt(id), body.responses);
  }
}