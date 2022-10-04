// src/index.ts
export default {
  async fetch(request: Request): Promise<Response> {
    const query = new URL(request.url).searchParams;
    const contentLength = query.get("length") || "0";
    const useContentType = !query.has("no-content-type");

    return new Response(null, {
      headers: {
        "content-length": contentLength,
        "content-type": useContentType ? "text/plain" : "",
      },
    });
  },
};
