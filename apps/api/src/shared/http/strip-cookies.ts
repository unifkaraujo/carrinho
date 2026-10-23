const COOKIE_HEADER = 'cookie';

export const stripCookieHeader = (headers: Headers): Headers => {
  const stripped = new Headers(headers);
  stripped.delete(COOKIE_HEADER);
  return stripped;
};

export const stripCookies = (request: Request): Request =>
  new Request(request, { headers: stripCookieHeader(request.headers) });
