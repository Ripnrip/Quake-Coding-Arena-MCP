import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { VOICE_PACKS, enhancedStats } from "../utils/types.js";

export function registerSettingsTools(server: McpServer) {
    // 🔊 Set Enhanced Volume
    server.registerTool(
        "set_enhanced_volume",
        {
            description: "🔊 Adjust the global soundboard volume (0-100)",
            inputSchema: {
                volume: z.number().min(0).max(100).describe("🔊 Enhanced volume level (0-100)"),
            }
        },
        async ({ volume }) => {
            enhancedStats.volume = volume;

            return {
                content: [{
                    type: "text",
                    text: `🔊 Enhanced volume set to ${volume}%`
                }],
                volume: enhancedStats.volume
            };
        }
    );

    // 🎤 Set Voice Pack
    server.registerTool(
        "set_voice_pack",
        {
            description: "🎤 Switch between Male and Female announcer voice packs",
            inputSchema: {
                voiceGender: z.enum(["male", "female"]).describe("🎤 Voice gender selection"),
            }
        },
        async ({ voiceGender }) => {
            enhancedStats.voicePack = voiceGender;
            const voiceConfig = VOICE_PACKS[voiceGender];

            return {
                content: [{
                    type: "text",
                    text: `🎤 Voice pack set to ${voiceConfig.displayName}!`
                }],
                currentVoicePack: voiceGender,
                voicePackInfo: voiceConfig
            };
        }
    );

    // 🎤 Get Voice Pack Info
    server.registerTool(
        "get_voice_pack_info",
        {
            description: "ℹ️ Get information about the currently active voice pack",
            inputSchema: {}
        },
        async () => {
            return {
                content: [{
                    type: "text",
                    text: `🎤 Current voice: ${enhancedStats.voicePack}\nAvailable voices: male, female`
                }],
                currentVoicePack: enhancedStats.voicePack,
                currentVoiceInfo: VOICE_PACKS[enhancedStats.voicePack],
                availableVoicePacks: Object.entries(VOICE_PACKS).map(([id, pack]) => ({
                    id,
                    ...pack
                }))
            };
        }
    );
}
