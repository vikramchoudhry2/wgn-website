export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Missing url' });
    }

    // Basic SSRF protection: only allow Givebutter URLs
    try {
      const parsed = new URL(url);
      const hostname = parsed.hostname.toLowerCase();
      if (!hostname.endsWith('givebutter.com')) {
        return res.status(400).json({ error: 'Only givebutter.com URLs are allowed' });
      }
    } catch {
      return res.status(400).json({ error: 'Invalid url' });
    }

    const response = await fetch(url, {
      // Avoid caching stale content
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; WeGotNextBot/1.0)' },
      cache: 'no-store',
      redirect: 'follow',
    });

    if (!response.ok) {
      return res.status(502).json({ error: 'Failed to fetch campaign page' });
    }

    const html = await response.text();

    const getMeta = (property) => {
      const regex = new RegExp(
        `<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`,
        'i'
      );
      const match = html.match(regex);
      return match && match[1] ? match[1] : '';
    };

    const title = getMeta('og:title') || getMeta('twitter:title');
    const description = getMeta('og:description') || getMeta('twitter:description');
    const image = getMeta('og:image') || getMeta('twitter:image');

    return res.status(200).json({ title, description, image });
  } catch (err) {
    return res.status(500).json({ error: 'Unexpected error' });
  }
}


