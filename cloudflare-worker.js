// Cloudflare Worker – CORS-Proxy ausschließlich für die Meteotest-Messdaten.
//
// Zweck: Meteotest sendet keine CORS-Header, daher kann index.html (auf
// keller.hochnebel.ch) die API nicht direkt aus dem Browser abrufen. Dieser
// Worker holt die Daten serverseitig und gibt sie mit passenden CORS-Headern
// als fertiges JSON zurück.
//
// Sicherheit: bewusst KEIN offener Proxy. Es ist nur die feste Meteotest-URL
// als Ziel und nur die eigene Domain als Aufrufer erlaubt.
//
// Deployment: Cloudflare-Dashboard → Workers & Pages → Worker erstellen →
// diesen Code einfügen → Deploy. Aktuell deployt unter:
//   https://late-art-b6e6.trap-crafter454.workers.dev/
// Diese URL ist in index.html als METEOTEST_PROXY hinterlegt.

const ALLOWED_ORIGIN = 'https://keller.hochnebel.ch';
const TARGET = 'https://meteotest.ch/actions/mdxConnector/mdx/MeteotestMeasurements';

export default {
  async fetch(request) {
    const cors = {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    };

    // CORS-Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: cors });
    }

    const upstream = await fetch(TARGET, { headers: { 'Accept': 'application/json' } });
    const body = await upstream.text();

    return new Response(body, {
      status: upstream.status,
      headers: { ...cors, 'Content-Type': 'application/json; charset=utf-8' },
    });
  },
};
