import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { enhancedStats } from "../utils/types.js";

export function registerStatsTools(server: McpServer) {
    // 📊 Get Enhanced Achievement Stats
    server.registerTool(
        "get_enhanced_achievement_stats",
        {
            description: "📊 Retrieve current session statistics and achievement progress",
            inputSchema: {
                // No parameters required for this tool
                _dummy: z.string().optional().describe("No parameters required")
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
