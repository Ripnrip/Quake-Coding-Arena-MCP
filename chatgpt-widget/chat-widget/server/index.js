import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import OpenAI from "openai";
import { Client as McpClient } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const PORT = Number(process.env.PORT ?? 4173);
const MCP_SERVER_URL = process.env.MCP_SERVER_URL ?? "http://localhost:3000/mcp";
const OPENAI_MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

if (!process.env.OPENAI_API_KEY) {
  console.warn("⚠️  OPENAI_API_KEY is not set. /chat endpoint will fail until you provide a key.");
}

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", openai: Boolean(openai), mcpServer: MCP_SERVER_URL });
});

app.post("/chat", async (req, res) => {
  const { message } = req.body ?? {};
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "message field is required" });
  }

  if (!openai) {
    return res.status(500).json({ error: "OPENAI_API_KEY missing" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content:
            "You are the Quake Coding Arena co-pilot. Respond concisely and include fun arena commentary when appropriate.",
        },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices?.[0]?.message?.content?.trim() ??
      "I couldn't craft a response this time, sorry!";

    const quakeSound = pickAchievement({ userText: message, reply });

    res.json({ reply, quakeSound });
  } catch (error) {
    console.error("Failed to call OpenAI", error);
    res.status(500).json({ error: "Failed to reach ChatGPT", details: error.message ?? String(error) });
  }
});

app.get("/quake-sound", async (req, res) => {
  const achievement = typeof req.query.achievement === "string" ? req.query.achievement : undefined;
  const voiceGender = typeof req.query.voiceGender === "string" ? req.query.voiceGender : undefined;
  const volumeRaw = typeof req.query.volume === "string" ? req.query.volume : undefined;

  if (!achievement) {
    return res.status(400).json({ error: "achievement query param required" });
  }

  try {
    const volume = volumeRaw ? clampVolume(Number(volumeRaw)) : undefined;
    await triggerQuakeAchievement({ achievement, voiceGender, volume });
    res.json({ success: true });
  } catch (error) {
    console.error("Failed to trigger achievement", error);
    res.status(500).json({ error: "Failed to call MCP server", details: error.message ?? String(error) });
  }
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
  console.log(`⚡️ Chat widget server on http://localhost:${PORT}`);
  console.log(`🤖 MCP server target: ${MCP_SERVER_URL}`);
});

function pickAchievement({ userText, reply }) {
  const text = `${userText} ${reply}`.toLowerCase();
  if (/deploy|ship|release/.test(text)) return "GODLIKE";
  if (/bug|fix|squash/.test(text)) return "HEADSHOT";
  if (/test|coverage|unit/.test(text)) return "PERFECT";
  if (/refactor|cleanup|massive/.test(text)) return "MONSTER KILL";
  if (/start|ready|prep/.test(text)) return "PREPARE TO FIGHT";
  if (/awesome|excellent|great|amazing/.test(text)) return "EXCELLENT";
  return undefined;
}

function clampVolume(value) {
  if (Number.isNaN(value)) return undefined;
  return Math.max(0, Math.min(100, value));
}

let quakeClientPromise;

async function getQuakeClient() {
  if (quakeClientPromise) return quakeClientPromise;

  quakeClientPromise = (async () => {
    const client = new McpClient({
      name: "quake-chat-widget",
      version: "0.1.0",
    });

    const transport = new StreamableHTTPClientTransport(new URL(MCP_SERVER_URL));
    await client.connect(transport);
    return { client, transport };
  })().catch((error) => {
    quakeClientPromise = undefined;
    throw error;
  });

  return quakeClientPromise;
}

async function triggerQuakeAchievement({ achievement, voiceGender, volume }) {
  const normalized = achievement.trim();
  const { client } = await getQuakeClient();

  const args = { achievement: normalized };
  if (voiceGender) args.voiceGender = voiceGender;
  if (typeof volume === "number") args.volume = volume;

  await client.callTool({
    name: "play_enhanced_quake_sound",
    arguments: args,
  });
}

process.on("SIGINT", async () => {
  console.log("\nShutting down chat widget server...");
  try {
    const clientState = await Promise.resolve(quakeClientPromise);
    await clientState?.transport?.close?.();
  } catch (error) {
    console.error("Failed to close MCP transport", error);
  }
  process.exit(0);
});
