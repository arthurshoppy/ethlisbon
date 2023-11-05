// src/surveys/test/survey.test.ts
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Survey from '../schemas/survey.schema';

chai.use(chaiAsPromised);

describe('Survey Model Tests', () => {
  let mongoServer: MongoMemoryServer;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Survey.deleteMany({});
  });

  it('should create a new survey', async () => {
    const surveyData = {
      title: 'Sample Survey',
      questions: [
        {
          questionText: 'What is your favorite color?',
          options: [
            { text: 'Red', value: 1 },
            { text: 'Blue', value: 2 },
          ],
        },
      ],
    };

    const survey = new Survey(surveyData);
    await survey.save();

    expect(survey).to.have.property('id');
    expect(survey.title).to.equal(surveyData.title);
  });

  it('should retrieve a survey', async () => {
    const surveyData = {
      title: 'Sample Survey',
      questions: [
        {
          questionText: 'What is your favorite color?',
          options: [
            { text: 'Red', value: 1 },
            { text: 'Blue', value: 2 },
          ],
        },
      ],
    };

    const survey = new Survey(surveyData);
    await survey.save();

    const foundSurvey = await Survey.findById(survey.id).exec();

    expect(foundSurvey).to.not.be.null;
    expect(foundSurvey!.title).to.equal(surveyData.title);
  });

  // More tests...
});
