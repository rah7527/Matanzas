import type { Config } from '@netlify/functions';

export default async (req: Request) => {
  const incomingUrl = new URL(req.url);
  const path = incomingUrl.pathname;
  const search = incomingUrl.search;

  let targetUrl = '';
  let userAgent = 'MatanzasApp/1.0';

  if (path.startsWith('/sensestream')) {
    const upstreamPath = path.replace(/^\/sensestream/, '') || '/';
    targetUrl = `https://api.sensestream.org${upstreamPath}${search}`;
    userAgent = 'Mozilla/5.0';
  } else if (path.startsWith('/noaa')) {
    const upstreamPath = path.replace(/^\/noaa/, '') || '/';
    targetUrl = `https://noaa.gov${upstreamPath}${search}`;
    userAgent = 'MatanzasApp/1.0';
  } else {
    return new Response(
      JSON.stringify({ error: 'Unknown proxy route', receivedPath: path }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const upstreamResponse = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': userAgent
      }
    });

    const bodyText = await upstreamResponse.text();

    return new Response(bodyText, {
      status: upstreamResponse.status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Upstream fetch failed';
    return new Response(
      JSON.stringify({ error: message, targetUrl }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const config: Config = {
  path: ['/sensestream/*', '/noaa/*']
};
