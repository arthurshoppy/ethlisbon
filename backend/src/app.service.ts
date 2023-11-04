import { Injectable } from '@nestjs/common';
import {Survey} from './dtos/app.survey';

@Injectable()
export class AppService {
  

  getHello(): string {
    return 'Hello World!';
  }

  authUser(): string {
    // implement usersignup with credentials
    const userAddress = '0x1';
    return userAddress;
  }

  postNewSurvey(): Survey {
    const survey1: Survey = {name: '0x0'};
    return survey1;
  }

  getSurveyResults(): string {
    const result = '0x0'
    return result;
  }


}
