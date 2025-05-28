import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  const { url } = req.body;

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });

    const $ = cheerio.load(response.data);

    const interests = [];
    $('a[href*="user"]').each((_, el) => {
      const text = $(el).text().trim();
      if (text) interests.push(text);
    });

    const papers = [];
    $('tr.gsc_a_tr').each((_, row) => {
      const title = $(row).find('.gsc_a_at').text().trim();
      if (title) papers.push(title);
    });

    const citation = $('td.gsc_rsb_std').first().text().trim() || '0';

    res.status(200).json({
      interests,
      papers,
      citations: parseInt(citation, 10)
    });

  } catch (err) {
    console.error('Cheerio scraper error:', err.message);
    res.status(500).json({ error: 'Scraping failed', details: err.message });
  }
}
