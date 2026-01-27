import OpenAI from "openai";

export const chatWithAI = async (req, res) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { message } = req.body;

    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: message,
    });

    res.json({
      reply: response.output_text,
    });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "OpenAI error" });
  }
};
