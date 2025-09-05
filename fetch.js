import fetch from 'node-fetch';

export default async function handler(req, res) {
  const target = 'https://jiocinema-live.cloud-hatch.workers.dev/?token=...';
  const BROWSERLESS_TOKEN = process.env.BROWSERLESS_TOKEN; // set in Vercel env
  const url = `https://chrome.browserless.io/content?token=${BROWSERLESS_TOKEN}&url=${encodeURIComponent(target)}`;

  const r = await fetch(url, { method: 'GET' });
  const body = await r.text(); // browserless returns the rendered HTML or page body
  // If page contains JSON or returns JSON endpoint, parse it here. Otherwise return body for inspection:
  res.setHeader('Content-Type', 'text/plain');
  res.status(r.status).send(body);
}
