export const HOST = 'http://localhost:23567';

export enum Method {
  GET = 'GET',
  POST = 'POST'
}

export async function createRequest(
  url: string,
  method: Method,
  payload?: object,
): Promise<Response> {
  const init: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Cache-Control": "no-cache",
    },
  };
  if (method !== Method.GET) {

    console.log(`jsonify: ${JSON.stringify(payload)}`);

    init.body = JSON.stringify(payload);
  }

  return fetch(url, init);
}
