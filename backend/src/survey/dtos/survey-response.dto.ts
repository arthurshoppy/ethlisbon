import { IsInt, IsNotEmpty, IsArray, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

class AnswerDto {
  @IsInt()
  questionId: number;

  @IsNotEmpty()
  answer: string; // Can be string or string[] depending on your answer model
}

export class SurveyResponseDto {
  @IsInt()
  surveyId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  @IsObject({ each: true })
  responses: AnswerDto[];
}