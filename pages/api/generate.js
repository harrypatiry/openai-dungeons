import { Configuration, OpenAIApi } from "openai";

const prefix = process.env.OPENAI_API_KEY || '';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function generate(req, res) {
  const completion = await openai.createCompletion("text-curie-001", {
    prompt: generatePrompt(req.body.name),
    temperature: .9,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(n) {
  const nLower = n[0].toUpperCase() + n.slice(1).toLowerCase();
  return `Input your name to generate a story
  "Create an interactive dungeons and dragons story where the players name is ${nLower} and there must be an ending within 400 characters.",`;
}