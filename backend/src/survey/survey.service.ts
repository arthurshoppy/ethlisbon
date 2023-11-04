import { Injectable } from '@nestjs/common';
import {Survey} from '../dtos/app.survey';

@Injectable()
export class SurveyService {
    postNewSurvey(): Survey {
        const survey1: Survey = {name: '0x0'};
        return survey1;
      }
    createSurvey(): number {
        return 1;
    }

    getSurvey(): number {
        const id = 1;
        return id;
    }
      getSurveyResults(): string {
        const result = '0x0'
        return result;
      }
}