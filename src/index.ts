#!/usr/bin/env node

/**
 * 🎭 The Enhanced Quake Oracle - TypeScript MCP Server Edition v2.2
 *
 * "Where coding victories become legendary achievements, and every
 * keystroke echoes through the digital arena with authentic male/female Quake voices!"
 *
 * Features: 11 achievements, voice switching (male/female), WAV/MP3 support, Resources, Prompts
 *
 * - The Enhanced Quake Arena Master of TypeScript
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createStatelessServer } from "@smithery/sdk/server/stateless.js";
import { z } from "zod";
import { enhancedStats } from "./utils/types.js";
import { registerAchievementTools } from "./tools/achievements.js";
import { registerSettingsTools } from "./tools/settings.js";
import { registerStatsTools } from "./tools/stats.js";
import { registerSoundResources } from "./resources/sounds.js";
import { registerEncouragementPrompts } from "./prompts/encouragement.js";

// 🎯 Configuration Schema for Smithery
export const configSchema = z.object({
  volume: z.number().min(0).max(100).default(80).describe("🔊 Volume level (0-100)"),
  voiceGender: z.enum(["male", "female"]).default("male").describe("🎤 Voice pack selection"),
  defaultVoiceStyle: z.string().default("sexy-announcer").describe("🎭 Female voice style"),
}).optional();

// 🎭 Create Server Function - Required by Smithery
function createMcpServer({ config }: { config?: z.infer<typeof configSchema> }) {
  // Apply configuration if provided
  if (config) {
    enhancedStats.volume = config.volume;
    enhancedStats.voicePack = config.voiceGender;
    enhancedStats.femaleVoiceStyle = config.defaultVoiceStyle;
  }

  const server = new McpServer({
    name: "Enhanced Quake Coding Arena",
    version: "2.2.0",
  }, {
    capabilities: {
      tools: {},
      resources: {},
      prompts: {},
    }
  });

  // Register all tools
  registerAchievementTools(server);
  registerSettingsTools(server);
  registerStatsTools(server);

  // Register resources
  registerSoundResources(server.server);

  // Register prompts
  registerEncouragementPrompts(server.server);

  return server.server; // Return the underlying Server
}

// Export for Smithery SDK
export default createStatelessServer(createMcpServer, { configSchema });