import { IncomingForm } from 'formidable';
import fs from 'fs';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { data } from 'autoprefixer';

export const config = {
  api: { bodyParser: false },
};

function extractInfo(text) {
  const extractSection = (sectionName, until = null) => {
    const pattern = until
      ? new RegExp(`${sectionName}[\\s\\S]*?(?=${until})`, 'i')
      : new RegExp(`${sectionName}[\\s\\S]*`, 'i');
    const match = text.match(pattern);
    return match ? match[0].trim() : '';
  };

  const education = extractSection('EDUCATION', 'TECHNICAL SKILLS');
  const skills = extractSection('TECHNICAL SKILLS', 'EXPERIENCE')
    .split('\n')
    .map(line => line.replace(/●/g, '').trim())
    .filter(Boolean);
  const experience = extractSection('EXPERIENCE', 'COMMUNITY');
  const projects = extractSection('PROJECTS', 'COURSES');
  const courses = extractSection('COURSES');

  // Contact details
  const email = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/)?.[0] || '';
  const phone = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3,5}\)?[-.\s]?\d{3,5}[-.\s]?\d{4}/)?.[0] || '';
  const linkedIn = text.match(/https?:\/\/(www\.)?linkedin\.com\/[^\s)]+/)?.[0] || '';
  const github = text.match(/https?:\/\/(www\.)?github\.com\/[^\s)]+/)?.[0] || '';

  const contact = { email, phone, linkedIn, github };

  return {
    contact,
    education,
    skills,
    experience,
    // projects,
    // courses,
  };
}


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const form = new IncomingForm({ maxFileSize: 5 * 1024 * 1024 });

  form.parse(req, async (err, fields, files) => {
    if (err || !files.resume) {
      return res.status(400).json({ error: 'Invalid upload' });
    }

    const file = files.resume[0];
    const ext = file.originalFilename.split('.').pop();

    try {
      const buffer = fs.readFileSync(file.filepath);
      let text = '';

      if (ext === 'pdf') {
        const data = await pdfParse(buffer);
        text = data.text;
      } else if (ext === 'docx') {
        const result = await mammoth.extractRawText({ buffer });
        text = result.value;
      } else {
        return res.status(400).json({ error: 'Only PDF or DOCX files allowed' });
      }
      const parsedData = extractInfo(text);
      console.log(parsedData)
      return res.status(200).json(parsedData);
    } catch (error) {
      return res.status(500).json({ error: 'Parsing failed' });
    }
  });
}
