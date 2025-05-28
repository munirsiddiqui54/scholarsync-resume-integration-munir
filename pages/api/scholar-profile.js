import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'; // Adjust as needed

export default async function handler(req, res) {
  const { url } = req.body;

  try {
    const browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const result = await page.evaluate(() => {
      const interests = [...document.querySelectorAll('a[href*="user"]')]
        .map(a => a.textContent.trim()).filter(Boolean);
      const papers = [...document.querySelectorAll('tr.gsc_a_tr')]
        .map(row => row.querySelector('.gsc_a_at')?.textContent.trim()).filter(Boolean);
      const citation = document.querySelector('td.gsc_rsb_std')?.textContent.trim() || '0';
      return { interests, papers, citations: parseInt(citation, 10) };
    });

    await browser.close();
    console.log(result)
    res.status(200).json(result);
  } catch (err) {
    console.error('Scraper error:', err);
    res.status(500).json({ error: 'Failed to fetch scholar data', details: err.message });
  }
}
