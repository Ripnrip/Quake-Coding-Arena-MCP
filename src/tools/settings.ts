import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { VOICE_PACKS, enhancedStats } from "../utils/types.js";

export function registerSettingsTools(server: McpServer) {
    // 🔊 Set Enhanced Volume
    server.registerTool(
        "set_enhanced_volume",
        {
            description: "🔊 Adjust the global soundboard volume for all achievement sounds. This setting persists for the session and affects all subsequent audio playback until changed. Volume range is 0-100, where 0 is silent and 100 is maximum volume.",
            inputSchema: {
                volume: z.number().min(0).max(100).describe("🔊 Volume level (0-100). 0 = silent, 100 = maximum volume. Default is 80. This setting applies to all achievement sounds until changed. Examples: 50, 75, 80, 100"),
            },
            annotations: {
                title: "🔊 Set Volume",
                readOnlyHint: false,
                destructiveHint: false,
                idempotentHint: false,
                openWorldHint: false
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
            description: "🎤 Switch between Male and Female announcer voice packs. This sets the default voice pack for all subsequent achievement sounds. Male pack includes 15 classic Quake 3 Arena sounds. Female pack includes 16 unique female announcer sounds. The setting persists for the session until changed.",
            inputSchema: {
                voiceGender: z.enum(["male", "female"]).describe("🎤 Voice pack selection. Options: 'male' (Classic Quake 3 Arena male announcer with 15 sounds including EXCELLENT, PERFECT, IMPRESSIVE, DOUBLE KILL, TRIPLE KILL), 'female' (Female announcer with 16 sounds including HEADSHOT, MULTI KILL, KILLING SPREE, BOTTOM FEEDER, PLAY). Examples: 'male', 'female'"),
            },
            annotations: {
                title: "🎤 Set Voice Pack",
                readOnlyHint: false,
                destructiveHint: false,
                idempotentHint: false,
                openWorldHint: false
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
            description: "ℹ️ Get information about the currently active voice pack and all available voice packs. Returns the current voice pack name, display name, description, path, and list of all available voice packs (male and female) with their details.",
            inputSchema: {
                // No parameters required for this tool
                _dummy: z.string().optional().describe("No parameters required. This tool returns information about voice packs without requiring any input.")
            },
            annotations: {
                title: "ℹ️ Get Voice Pack Info",
                readOnlyHint: true,
                destructiveHint: false,
                idempotentHint: true,
                openWorldHint: false
            }
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
