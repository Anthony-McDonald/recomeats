const OpenAI = require("openai");
require('dotenv').config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Path to gpt
async function callChat(message) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: message }],
    model: "gpt-3.5-turbo",
    temperature: 0.01, 
  });

  return completion.choices[0];
}

module.exports = callChat;
