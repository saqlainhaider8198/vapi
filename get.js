// api/getCookie.js
export default async function handler(req, res) {
  try {
    const response = await fetch('https://jiotv.byte-vault.workers.dev/?token=42e4f5-2d863b-3c37d8-7f3f50', {
      method: 'GET',
      headers: {
        'Host': 'jiotv.byte-vault.workers.dev',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0',
        'accept': '*/*',
        'cache-control': 'no-cache, no-store',
        'accept-encoding': 'gzip'
      }
    });

    const text = await response.text();
    const exthttpLine = text.split('\n').find(line => line.startsWith('#EXTHTTP:'));
    
    if (!exthttpLine) {
      throw new Error('EXTHTTP line not found');
    }

    const cookieData = JSON.parse(exthttpLine.replace('#EXTHTTP:', ''));
    res.status(200).json(cookieData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const config = {
  runtime: 'nodejs18.x'
};
