import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // Allow CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({ error: "Question and answer are required" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            'You are a technical interviewer. Evaluate the answer. Respond ONLY in JSON format like this: {"score": number (0-2), "feedback": "short feedback"}',
        },
        {
          role: "user",
          content: `Question: ${question}\nAnswer: ${answer}`,
        },
      ],
    });

    let text = response.choices[0].message.content;

    // Clean GPT formatting issues
    text = text.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { score: 1, feedback: text };
    }

    return res.json(parsed);
  } catch (err) {
    console.error("AI Error:", err.message);
    return res.status(500).json({ error: "AI evaluation failed" });
  }
}
