import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Quote from "./models/Quote.js";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());

app.listen(5000, () => console.log("Server running on port 5000"));


dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/quotes", async (req, res) => {
	try {
		const quotes = await Quote.find();
		res.json(quotes)
	} catch(err) {
		res.status(500).json({ error: err.message });
	}
});

app.get("/quotes/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const quotes = await Quote.find({ category: new RegExp(`^${category}$`, "i") });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/quotes", async (req, res) => {
  try {
    const quote = await Quote.create(req.body);
    res.status(201).json(quote);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//AI route of the project

app.post("/ai-quote", async (req, res) => {
  try {
    const { category, topic } = req.body;

    if (!category || !topic) {
      return res.status(400).json({ error: "Category and topic required" });
    }

    const prompt = `
    Generate a short inspirational quote.
    Category: ${category}
    Topic: ${topic}
    Keep it under 25 words.
    Return only the quote text.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a creative quote generator." },
        { role: "user", content: prompt }
      ],
      max_tokens: 60,
    });

    const aiQuote = completion.choices[0].message.content.trim();

    res.json({
      text: aiQuote,
      author: "AI"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI generation failed" });
  }
});


app.get("/routes-check", (req, res) => {
  res.send("AI route exists");
});




// Test data inserted for checking functionality of backend and frontend

// app.get("/seed", async (req, res) => {
//   await Quote.insertMany([
//   {
//     text: "Push yourself, because no one else is going to do it for you.",
//     author: "Unknown",
//     category: "motivation"
//   },
//   {
//     text: "Life is really simple, but we insist on making it complicated.",
//     author: "Confucius",
//     category: "wisdom"
//   },
//   {
//     text: "Success is not final, failure is not fatal.",
//     author: "Winston Churchill",
//     category: "success"
//   },
//   {
//     text: "The best way to get started is to quit talking and begin doing.",
//     author: "Walt Disney",
//     category: "motivation"
//   },
//   {
//     text: "Don’t let yesterday take up too much of today.",
//     author: "Will Rogers",
//     category: "life"
//   },
//   {
//     text: "It’s not whether you get knocked down, it’s whether you get up.",
//     author: "Vince Lombardi",
//     category: "motivation"
//   },
//   {
//     text: "If you are working on something exciting, it will keep you motivated.",
//     author: "Unknown",
//     category: "motivation"
//   },
//   {
//     text: "Success doesn’t come to you, you go to it.",
//     author: "Marva Collins",
//     category: "success"
//   },
//   {
//     text: "Life is like a box of chocolates, you never know what you're going to get.",
//     author: "Forrest Gump",
//     category: "life"
//   },
//   {
//     text: "If you are going through hell, keep going.",
//     author: "Winston Churchill",
//     category: "wisdom"
//   },
//   {
//     text: "If at first you don't succeed, try, try again.",
//     author: "William Edward Hickson",
//     category: "success"
//   },
//   {
//     text: "Life is about making an impact, not making an income.",
//     author: "Kevin Kruse",
//     category: "wisdom"
//   }
//   ]);

//   res.send("Database seeded");
// });


