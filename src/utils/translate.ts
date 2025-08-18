import OpenAI from "openai";
const client = new OpenAI();

export default async function translate(text: string, targetLanguage: string) {
  try {
    const response = await client.responses.create({
        model: "gpt-5-nano",
        input: `Translate the following text into the target language: ${text}, Target Language: ${targetLanguage}`,
        reasoning: { effort: "low" },
      });
    console.log(response.output_text);
    return response.output_text;

  } catch (error) {
    console.error("Error:", error);
  }

}