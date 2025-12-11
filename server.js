import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAIAPI
});

app.post("/generate", async (req, res) => {
  try {
    const { topic = "basic verbs", count = 6 } = req.body;

    const prompt = `
${count} English → Marathi flashcards तयार करा.
फॉर्मॅट:
[
 {"front":"Run","back":"धावणे","example":"I run fast."}
]
Topic: ${topic}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2
    });

    const txt = response.choices[0].message.content.trim();
    const json = JSON.parse(txt.replace(/^```json/, "").replace(/```$/, ""));

    res.json({ ok: true, flashcards: json });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));
