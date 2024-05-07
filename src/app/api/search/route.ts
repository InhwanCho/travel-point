// /api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    
    if (!query) {
      return new NextResponse(null, { status: 400, statusText: 'Bad Request: Query parameter is missing.' });
    }
    const clientId = process.env.NEXT_PUBLIC_NAVER_SEARCH_ID;
    const clientSecret = process.env.NEXT_PUBLIC_NAVER_SEARCH_KEY;

    if (!clientId || !clientSecret) {
      throw new Error("API credentials are not defined in environment variables.");
    }


    const url = `https://openapi.naver.com/v1/search/blog?query=${encodeURIComponent(query)}&display=4&start=1&sort=sim`;
    const headers = {
      "X-Naver-Client-Id": clientId,
      "X-Naver-Client-Secret": clientSecret,
      "Content-Type": "application/json",
    };

    const apiResponse = await fetch(url, { headers });
    if (!apiResponse.ok) {
      throw new Error(`Failed to fetch data from Naver API: ${apiResponse.statusText}`);
    }

    const data = await apiResponse.json();
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      console.error('An unexpected error occurred');
      return new NextResponse('An unexpected error occurred', { status: 500 });
    }
  }
}
