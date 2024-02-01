/*Author Erik Priemer*/

import {Configuration, OpenAIApi} from 'openai';
import createHandler from '../../../utility/createHandler';
import {config} from 'dotenv';
config();
type Params = {
  keywords: Array<string>;
};

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  }),
);

const getGptBrainstorm = createHandler(async ({keywords}: Params) => {
  try {
    let keywordsReformed = '[';
    for (const keyword of keywords) {
      keywordsReformed += `${keyword},`;
    }
    keywordsReformed += ']';

    const response = await openAi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You will receive an array of keywords and you will brainstorm about those keywords! The idea is, that you create some nice Ideas around those keywords.',
        },
        {role: 'user', content: keywordsReformed},
      ],
    });
    return response.data.choices[0].message?.content;
  } catch (err) {
    console.log(err);
  }
});

export default getGptBrainstorm;
