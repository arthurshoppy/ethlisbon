import { Injectable } from '@nestjs/common';
import { CreateSurveyDto } from './dtos/create-survey.dto';
import { SurveyResponseDto } from './dtos/survey-response.dto';

@Injectable()
export class SurveyService {
    
    createSurvey(title:string, question: string ): CreateSurveyDto {
        
        return ;
    }

    getSurvey(id: number): String {
        const user = id;
        return ;
    }

    saveResponse(id: number, responses): any {
        const user = id;
        const saveResponses = responses;
        return ; //save it to DB  
    }
    
    getSurveyResults(): SurveyResponseDto {
        const result = '0x0'
        // returns the survey result from DB 
        // Returns the global DB survey result from DB
        return ;
      }
}