import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { enhancedStats } from "../utils/types.js";

export function registerStatsTools(server: McpServer) {
    // 📊 Get Enhanced Achievement Stats
    server.registerTool(
        "get_enhanced_achievement_stats",
        {
            description: "📊 Retrieve comprehensive session statistics and achievement progress. Returns total achievements played, category breakdown, session duration, current voice pack, volume setting, favorite category, current streak, longest streak, and achievements per minute rate.",
            inputSchema: {
                // No parameters required for this tool
                _dummy: z.string().optional().describe("No parameters required. This tool returns session statistics without requiring any input.")
            },
            annotations: {
                title: "📊 Get Achievement Stats",
                readOnlyHint: true,
                destructiveHint: false,
                idempotentHint: true,
                openWorldHint: false
            }
        },
        async () => {
            const sessionMinutes = Math.floor((Date.now() - new Date(enhancedStats.sessionStart).getTime()) / 60000);

            return {
                content: [{
                    type: "text",
                    text: `📊 Enhanced arena statistics retrieved!\nTotal achievements: ${enhancedStats.totalAchievements}\nSession time: ${sessionMinutes} minutes\nCurrent voice: ${enhancedStats.voicePack}`
                }],
                stats: {
                    ...enhancedStats,
                    sessionMinutes,
                    achievementsPerMinute: sessionMinutes > 0 ? enhancedStats.totalAchievements / sessionMinutes : 0
                }
            };
        }
    );
}
