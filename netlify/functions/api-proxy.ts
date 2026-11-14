export default async (req: Request) => {
  const incomingUrl = new URL(req.url);
  const path = incomingUrl.pathname;
  const search = incomingUrl.search;

  let targetUrl = '';

  if (path.startsWith('/sensestream')) {
    const upstreamPath = path.replace(/^\/sensestream/, '') || '/';
    targetUrl = `https://api.sensestream.org${upstreamPath}${search}`;
  } else if (path.startsWith('/noaa')) {
    const upstreamPath = path.replace(/^\/noaa/, '') || '/';
    targetUrl = `https://noaa.gov${upstreamPath}${search}`;
  } else {
    return new Response(
      JSON.stringify({ error: 'Unknown proxy route', receivedPath: path }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }

  try {
    const upstreamResponse = await fetch(targetUrl, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const bodyText = await upstreamResponse.text();

    if (bodyText.trim().startsWith('<')) {
      return new Response(
        JSON.stringify({
          error: 'Upstream returned HTML instead of JSON',
          status: upstreamResponse.status,
          targetUrl
        }),
        {
          status: 502,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    return new Response(bodyText, {
      status: upstreamResponse.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store'
      }
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Upstream fetch failed';
    return new Response(
      JSON.stringify({ error: message, targetUrl }),
      {
        status: 502,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
};

export const config = {
  path: ['/sensestream/*', '/noaa/*']
};
