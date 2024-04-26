const OpenAI = require("openai");

const openai = new OpenAI();

async function callChat(message) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: message }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);

  return completion.choices[0];
}

module.exports = callChat;
