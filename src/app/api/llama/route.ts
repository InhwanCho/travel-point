// /api/llama/route.ts
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

// Replicate API를 호출하는 비동기 함수
async function fetchPoemFromReplicate(prompt: string) {
  const replicate = new Replicate({
    auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
  });

  const input = {
    prompt: prompt
  };

  let output = '';
  for await (const event of replicate.stream("meta/meta-llama-3-70b-instruct", { input })) {
    output += event.toString();
  }

  return output;
}

// POST 요청을 처리하는 핸들러
export async function POST(request: NextRequest) {
  try {
    if (!request.body) {
      return new NextResponse(JSON.stringify({ error: "No data provided." }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }

    // 요청 본문에서 'prompt' 추출
    const data = await request.json();
    const prompt = data.prompt;

    if (!prompt) {
      return new NextResponse(JSON.stringify({ error: "Bad Request: Prompt parameter is missing." }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }

    // Replicate에서 시를 가져옴
    const poem = await fetchPoemFromReplicate(prompt);
    return new NextResponse(JSON.stringify({ poem }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    console.error(message);
    return new NextResponse(JSON.stringify({ error: message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
