import OpenAI from "openai";
const client = new OpenAI();

try {
  const response = await client.chat.completions.create({
      model: "gpt-5-nano",
      messages: [{
          role: "user",
          content: "Write a one-sentence bedtime story about a unicorn."
      }],
  });

  console.log(response.choices[0].message.content);
} catch (error) {
  console.error("Error:", error);
}