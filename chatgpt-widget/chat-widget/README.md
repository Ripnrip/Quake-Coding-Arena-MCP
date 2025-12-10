# ChatGPT + Quake Sound Widget

A lightweight Express + vanilla JS widget that proxies ChatGPT responses and calls the **Enhanced Quake Coding Arena MCP** server to blast announcer achievements.

## Features
- `/chat` endpoint proxies to the OpenAI Chat Completions API
- `/quake-sound` endpoint calls the `play_enhanced_quake_sound` MCP tool over Streamable HTTP
- Frontend chat widget with instant Quake announcer controls (voice + volume)
- Drop-in Dockerfile for containerized deployment

## Prerequisites
1. **Running Quake MCP server** (local or remote). Example local boot:
   ```bash
   npm install
   npm run build
   node .smithery/index.cjs
   ```
2. **OpenAI API key** (or update `server/index.js` to use a different LLM provider).

## Quick Start
```bash
cd examples/chat-widget
cp .env.example .env               # fill in OPENAI_API_KEY + MCP_SERVER_URL
npm install
npm run dev                        # server on http://localhost:4173
```
Now open `http://localhost:4173` in a browser, send a prompt, and listen for the announcer callouts.

## Environment Variables
| Name | Required | Description |
| ---- | -------- | ----------- |
| `OPENAI_API_KEY` | ✅ | Passed to the OpenAI SDK for `/chat` |
| `OPENAI_MODEL` |  | Defaults to `gpt-4o-mini` |
| `MCP_SERVER_URL` | ✅ | HTTP endpoint for the Enhanced Quake Coding Arena MCP server (ex: `http://localhost:3000/mcp`) |
| `PORT` |  | Port for the widget (`4173` default) |

## Endpoint Overview
| Endpoint | Description |
| -------- | ----------- |
| `POST /chat` | Accepts `{ message: string }`, forwards to ChatGPT, and returns `{ reply, quakeSound? }` |
| `GET /quake-sound` | Takes query params `achievement`, optional `voiceGender` and `volume`, and calls the MCP tool |
| `GET /health` | Basic readiness probe |

## Docker
```bash
cd examples/chat-widget
cp .env.example .env
# build image
docker build -t quake-chat-widget .
# run container (expects MCP + OpenAI to be reachable from the container)
docker run --env-file .env -p 4173:4173 quake-chat-widget
```

## Folder Structure
```
chat-widget/
├── public/                              # HTML/CSS/JS widget
│   ├── index.html                      # Full-page widget
│   ├── widget.js                       # Widget JavaScript
│   └── styles.css                      # Widget styles
├── server/index.js                     # Express server + OpenAI + MCP bridge
├── widget.widget                       # Standalone embeddable widget file
├── chatkit-widget.html                 # ChatKit-integrated version
├── quake-achievements.widget.jsx      # ChatKit widget (JSX format) - Full
├── quake-achievements-simple.widget.jsx # ChatKit widget (JSX format) - Simple
├── quake-achievements.widget.json      # ChatKit widget (JSON format) - Full
├── quake-achievements-simple.widget.json # ChatKit widget (JSON format) - Simple
├── .env.example                        # Starter env vars
├── Dockerfile                          # Optional container image
├── README.md                           # This file
├── EMBED.md                            # Embedding guide for widget.widget
├── CHATKIT-INTEGRATION.md              # ChatKit integration guide
└── WIDGET-UPLOAD-GUIDE.md              # Widget upload troubleshooting guide
```

## Widget Files

### **Standalone Widget (`widget.widget`)**
A self-contained, embeddable widget file that can be included in any web page:
- Single HTML file with inline CSS and JavaScript
- Configurable via URL parameters
- No build step required
- See [EMBED.md](./EMBED.md) for embedding instructions

### **ChatKit Integration (`chatkit-widget.html`)**
OpenAI ChatKit-compatible version with enhanced features:
- Professional ChatKit UI components
- MCP tool integration
- Custom Quake achievement controls
- See [CHATKIT-INTEGRATION.md](./CHATKIT-INTEGRATION.md) for setup

### **Full Application (`public/` + `server/`)**
Complete Express-based application:
- Backend API endpoints
- Frontend widget interface
- Docker support

## Customizing the Widget
- Adjust the heuristics in `server/index.js → pickAchievement()` to decide when automatic sounds fire.
- Expand `public/widget.js` to display tool results, stats, or user streaks.
- Add more MCP calls (ex: `set_voice_pack`, `get_enhanced_achievement_stats`) to the backend and expose them via buttons.
- Customize `widget.widget` styling and behavior for your use case.
- Integrate with ChatKit using `chatkit-widget.html` and the integration guide.

## Integration Options

1. **Standalone Widget** - Use `widget.widget` for simple embedding
2. **ChatKit Widget Builder** - Upload `quake-achievements.widget.jsx` to [widgets.chatkit.studio](https://widgets.chatkit.studio)
3. **ChatKit Integration** - Use `chatkit-widget.html` for OpenAI ChatKit features
4. **Full Application** - Use the complete Express app for maximum control

## ChatKit Widget Builder

To use with ChatKit Widget Builder:

1. **Go to** [widgets.chatkit.studio](https://widgets.chatkit.studio)
2. **Upload** `quake-achievements.widget.jsx` (or the simple version)
3. **Configure** the `onClickAction` to call your MCP server endpoint
4. **Test** the widget in the preview

See [WIDGET-UPLOAD-GUIDE.md](./WIDGET-UPLOAD-GUIDE.md) for detailed instructions.

Enjoy mixing AI replies with Quake-style hype! 🎧
