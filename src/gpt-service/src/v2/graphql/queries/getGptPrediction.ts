/*Author Erik Priemer*/

import {Configuration, OpenAIApi} from 'openai';
import createHandler from '../../../utility/createHandler';
import {config} from 'dotenv';
config();
type Params = {
  prompt: string;
};

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  }),
);

const getGptPrediction = createHandler(async ({prompt}: Params) => {
  try {
    const response = await openAi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{role: 'user', content: prompt}],
    });
    return response.data.choices[0].message?.content;
  } catch (err) {
    console.log(err);
  }
});

export default getGptPrediction;
