// src/surveys/surveys.controller.ts
import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('surveys')
export class SurveysController {
  constructor(private readonly surveyService: SurveyService) {}

  // UseGuards with an AdminGuard to protect this route for admin use only
  @Post()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async createSurvey(@Body() body: any) {
    return this.surveyService.createSurvey(body.title, body.questions);
  }

  @Get(':id')
  async getSurvey(@Param('id') id: string) {
    return this.surveyService.getSurvey(parseInt(id));
  }

  // Save the user's response to a survey
  @Post(':id/response')
  async saveSurveyResponse(@Param('id') id: string, @Body() body: any) {
    return this.surveyService.saveResponse(parseInt(id), body.responses);
  }
}