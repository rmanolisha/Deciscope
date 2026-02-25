const express = require("express");
const cors = require("cors");
const { Ollama } = require("ollama");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middleware =====
// ===== Ollama Setup =====
const ollama = new Ollama({
  host: 'http://localhost:11434'
});

// Use a local model - make sure you have it installed via Ollama
// Common models: llama2, mistral, codellama, etc.
const MODEL_NAME = "llama2";

// ===== Test Ollama Connection on Startup =====
(async () => {
  try {
    console.log("📡 Testing Ollama connection...");
    const response = await ollama.chat({
      model: MODEL_NAME,
      messages: [{ role: "user", content: 'Return {"status": "ok"}' }],
      format: "json"
    });
    console.log("✅ Ollama Connected Successfully");
  } catch (error) {
    console.error("❌ Ollama Connection Failed:", error.message);
    console.log("⚠️ Make sure Ollama is running on your machine. Download from https://ollama.com");
  }
})();

app.use(cors());
app.use(express.json());

// ===== Health Check Route =====
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Deciscope Backend Running 🚀",
    status: "OK",
    ai: "Ollama (Local)"
  });
});

// ===== List Models Route (Debug) =====
app.get("/api/models", async (req, res) => {
  try {
    const response = await ollama.list();
    res.status(200).json(response);
  } catch (error) {
    console.error("Error listing models:", error);
    res.status(500).json({ error: "Failed to list models. Make sure Ollama is running." });
  }
});

// ===== Analyze Decision Route =====
app.post("/api/analyze", async (req, res) => {
  try {
    console.log("🔥 /api/analyze route hit");
    const { decision } = req.body;

    // Validation
    if (!decision) {
      return res.status(400).json({
        success: false,
        error: "Decision field is required."
      });
    }

    if (decision.trim().length < 15) {
      return res.status(400).json({
        success: false,
        error: "Decision must be at least 15 characters long."
      });
    }

    // ===== Ollama AI Call =====
    const prompt = `
You are an AI decision analysis assistant called Deciscope.

Analyze the following decision:

"${decision}"

Return your response strictly in JSON format like this:

{
  "summary": "Short neutral summary",
  "detected_biases": ["bias1", "bias2"],
  "missing_considerations": ["point1", "point2"],
  "reframing_questions": ["question1", "question2"],
  "reasoning_score": number_between_0_and_100
}
`;

    const completion = await ollama.chat({
      model: MODEL_NAME,
      messages: [
        { 
          role: "system", 
          content: "You are an AI decision analysis assistant. Return responses strictly in JSON format." 
        },
        { role: "user", content: prompt }
      ],
      format: "json"
    });

    const text = completion.message.content;

    let analysisData;
    try {
      analysisData = JSON.parse(text);
    } catch (e) {
      analysisData = null;
    }

    return res.status(200).json({
      success: true,
      data: analysisData || text
    });

  } catch (error) {
    console.error("Error in /api/analyze:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error. Make sure Ollama is running on your machine."
    });
  }
});

// ===== 404 Handler =====
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found"
  });
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
