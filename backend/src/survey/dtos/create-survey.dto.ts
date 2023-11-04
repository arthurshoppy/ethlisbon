import { IsString, IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class QuestionDto {
  @IsString()
  question: string;

  @IsArray()
  @ArrayNotEmpty()
  options: string[];
}

export class CreateSurveyDto {
  @IsString()
  title: string;

  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}