export default async (req: Request) => {
  const incomingUrl = new URL(req.url);
  const path = incomingUrl.pathname;
  const search = incomingUrl.search;

  let targetBase = '';
  let strippedPath = '';
  let userAgent = 'MatanzasApp/1.0';

  if (path.startsWith('/sensestream')) {
    targetBase = 'https://api.sensestream.org';
    strippedPath = path.replace(/^\/sensestream/, '');
    userAgent = 'Mozilla/5.0';
  } else if (path.startsWith('/noaa')) {
    targetBase = 'https://noaa.gov';
    strippedPath = path.replace(/^\/noaa/, '');
    userAgent = 'MatanzasApp/1.0';
  } else {
    return new Response(JSON.stringify({ error: 'Unknown proxy route' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const targetUrl = `${targetBase}${strippedPath}${search}`;

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
    return new Response(JSON.stringify({ error: message, targetUrl }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
