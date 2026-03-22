import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


app.post("/evaluate", async (req, res) => {
  const { question, answer } = req.body;

  
  if (!question || !answer) {
    return res.status(400).json({
      error: "Question and answer are required",
    });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a technical interviewer. Evaluate the answer. Respond ONLY in JSON format like this: {\"score\": number (0-2), \"feedback\": \"short feedback\"}",
        },
        {
          role: "user",
          content: `Question: ${question}\nAnswer: ${answer}`,
        },
      ],
    });

    let text = response.choices[0].message.content;

    // 🔥 Clean GPT formatting issues
    text = text.replace(/```json|```/g, "").trim();

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (e) {
    
      parsed = {
        score: 1,
        feedback: text,
      };
    }

    res.json(parsed);
  } catch (err) {
    console.error("AI Error:", err.message);

    res.status(500).json({
      error: "AI evaluation failed",
    });
  }
});


app.get("/", (req, res) => {
  res.send("🚀 AI Interview Server Running");
});

//Start Server
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});