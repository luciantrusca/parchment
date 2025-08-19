import OpenAI from "openai";
const client = new OpenAI();

const defaultTextLimit = 2000;

export default async function translate(text: string, targetLanguage: string, textLimit: number = defaultTextLimit) {
  try {
    // Ensure text limit is within bounds
    textLimit = Math.min(textLimit, defaultTextLimit);

    // Send request to OpenAI API
    const response = await client.responses.create({
        model: "gpt-5-nano",
        input: `Translate the following text into the target language: ${text.substring(0,textLimit)}, Target Language: ${targetLanguage}`,
        reasoning: { effort: "low" },
      });
    console.log(response.output_text);
    return response.output_text;

  } catch (error) {
    console.error("Error:", error);
  }

}