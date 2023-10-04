const express = require("express");
const app = express();
const Openai = require("openai");
const cors = require("cors");
require("dotenv").config();

const openai = new Openai({
  apiKey: process.env.API_KEY,
  timeout: 5000,
});

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      "http://localhost:5173",
      "https://abhidocs.vercel.app",
      "https://abhidocs.vercel.app/",
    ],
    methods: "GET,POST,PUT,DELETE",
  })
);
app.use(express.json());

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});

app.get("/", (req, res) => {
  res.send("Api is working!");
});

app.post("/search", async (req, res) => {
  const { query } = req.body;
  const content = query?.split('').reverse().join('') || ""
  try {
    const resy = await openai.chat.completions.create({
      messages: [{ role: 'user', content: query }],
      model: "gpt-3.5-turbo",
      temperature: 0.5,
    });

    const result = resy.choices[0].message.content;

    return res.status(200).send({ result });
  } catch (err) {
    res.status(401).send({ error: err });
  }
});
