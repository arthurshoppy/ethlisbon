// src/surveys/schemas/survey.schema.ts
import * as mongoose from 'mongoose';

const OptionSchema = new mongoose.Schema({
  text: String,
  value: Number,
});

const QuestionSchema = new mongoose.Schema({
  questionText: String,
  options: [OptionSchema],
});

const SurveySchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [QuestionSchema],
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Survey = mongoose.model('Survey', SurveySchema);

export default Survey;
