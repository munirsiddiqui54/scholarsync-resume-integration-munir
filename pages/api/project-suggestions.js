const projectDatabase = [
  {
    title: 'Machine Learning Model for Academic Research',
    keywords: ['machine learning', 'python'],
    description: 'Develop ML models to analyze academic performance or research patterns using Python.'
  },
  {
    title: 'Web Scraper for Scholar Data',
    keywords: ['web scraping', 'cheerio', 'javascript'],
    description: 'Build a JavaScript-based web scraper using Cheerio to extract scholar-related information.'
  },
  {
    title: 'Data Visualization Dashboard',
    keywords: ['react', 'data visualization'],
    description: 'Create an interactive dashboard in React to visualize research metrics or academic datasets.'
  },
  {
    title: 'NLP for Research Papers',
    keywords: ['nlp', 'text mining'],
    description: 'Use NLP and text mining techniques to extract and analyze insights from research documents.'
  }
];

export default function handler(req, res) {
  const { resume, scholar } = req.body;
  if (!resume || !scholar) return res.status(400).json({ error: 'Missing data' });

  const skillSet = (resume.skills || []).flatMap(s => s.toLowerCase().split(/[^a-z]+/));
  const researchTopics = (scholar.interests || []).flatMap(t => t.toLowerCase().split(/[^a-z]+/));
  const allKeywords = new Set([...skillSet, ...researchTopics]);

  const rankedSuggestions = projectDatabase
    .map(project => ({
      ...project,
      matchCount: project.keywords.filter(kw => allKeywords.has(kw.toLowerCase())).length,
    }))
    .filter(p => p.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, 3);

  const finalSuggestions = rankedSuggestions.length
    ? rankedSuggestions
    : shuffleArray(projectDatabase).slice(0, 2);

  res.status(200).json(finalSuggestions);
}

// Utility to shuffle array
function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
