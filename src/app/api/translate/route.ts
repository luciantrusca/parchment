import translate from '@/utils/translate.ts';

export async function POST(request: Request) {
  const body = await request.json();
  const translatedText = await translate(body.text, body.targetLanguage);
  return new Response(JSON.stringify({ translatedText }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
