const express = require('express');
const app = express();
const openai = require('openai');
const cors = require('cors');
require('dotenv').config();

openai.apiKey = process.env.API_KEY;

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      'http://localhost:5173',
      'https://abhidocs.vercel.app',
      'https://abhidocs.vercel.app/',
    ],
    methods: 'GET,POST,PUT,DELETE',
  })
);
app.use(express.json());

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});

app.get('/', (req, res) => {
  res.send('Api is working!');
});

app.post('/search', (req, res) => {
  const { query } = req.body;
  openai.completions
    .create({
      prompt: `search ${query}`,
      model: 'text-davinci-002',
      temperature: 0.5,
    })
    .then((response) => {
      res.send(response.choices[0].text);
    });
});
