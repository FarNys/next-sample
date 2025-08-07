import { NextResponse } from "next/server";

export async function GET() {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const chunks = [
        "Hello",
        ", ",
        "this ",
        "is ",
        "a ",
        "mocked ",
        "stream ",
        "response!",
      ];
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(chunk));
        await new Promise((res) => setTimeout(res, 200)); // simulate delay
      }
      controller.close();
    },
  });
  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache",
    },
  });
}
