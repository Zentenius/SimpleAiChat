import { createOllama } from "ollama-ai-provider";

import { streamText } from "ai";

const ollama = createOllama({
  baseURL: process.env.OLLAMA_URL,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: ollama("deepseek-r1:1.5b"),
    messages,
  });

  return result.toDataStreamResponse();
}