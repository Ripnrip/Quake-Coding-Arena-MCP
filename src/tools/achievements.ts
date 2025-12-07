import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { EnhancedSoundOracle } from "../utils/sound.js";
import { ENHANCED_ACHIEVEMENTS, enhancedStats } from "../utils/types.js";

export function registerAchievementTools(server: McpServer) {
    // 🎯 Play Enhanced Quake Sound Tool
    server.registerTool(
        "play_enhanced_quake_sound",
        {
            description: "🏆 Plays a high-quality enhanced Quake achievement sound with voice pack support",
            inputSchema: {
                achievement: z.enum(Object.keys(ENHANCED_ACHIEVEMENTS) as [string, ...string[]]).describe("🏆 Enhanced achievement name"),
                volume: z.number().min(0).max(100).default(80).describe("🔊 Enhanced volume level (0-100)"),
                voiceGender: z.enum(["male", "female"]).optional().describe("🎤 Voice gender selection"),
            },
            annotations: {
                title: "🏆 Play Achievement Sound",
                readOnlyHint: false,
                destructiveHint: false,
                idempotentHint: false,
                openWorldHint: true
            }
        },
        async ({ achievement, volume, voiceGender }) => {
            try {
                await EnhancedSoundOracle.playAchievementSound(achievement, volume, voiceGender, enhancedStats.voicePack);

                // Update statistics
                enhancedStats.totalAchievements++;
                enhancedStats.lastPlayed = achievement;
                const achievementInfo = ENHANCED_ACHIEVEMENTS[achievement];

                if (achievementInfo) {
                    enhancedStats.categoryStats[achievementInfo.category] =
                        (enhancedStats.categoryStats[achievementInfo.category] || 0) + 1;
                }

                return {
                    content: [{
                        type: "text",
                        text: `🎯 ✨ ${achievement.toUpperCase()} ECHOES THROUGH THE ARENA at ${volume}% volume!`
                    }],
                    success: true,
                    achievement,
                    volume,
                    voiceGender: voiceGender || enhancedStats.voicePack,
                    stats: {
                        totalAchievements: enhancedStats.totalAchievements,
                        categoryStats: enhancedStats.categoryStats,
                        lastPlayed: enhancedStats.lastPlayed,
                        volume: enhancedStats.volume,
                        sessionStart: enhancedStats.sessionStart,
                        favoriteCategory: enhancedStats.favoriteCategory,
                        voicePack: enhancedStats.voicePack,
                        femaleVoiceStyle: enhancedStats.femaleVoiceStyle
                    }
                };
            } catch (error) {
                return {
                    content: [{
                        type: "text",
                        text: `❌ Error playing ${achievement}: ${error instanceof Error ? error.message : String(error)}`
                    }],
                    success: false,
                    error: error instanceof Error ? error.message : String(error)
                };
            }
        }
    );

    // 🎲 Random Enhanced Achievement
    server.registerTool(
        "random_enhanced_achievement",
        {
            description: "🎲 Play a random achievement sound from a specific category",
            inputSchema: {
                category: z.enum(["streak", "quality", "multi", "game", "team"]).optional().describe("🎯 Filter by category"),
                volume: z.number().min(0).max(100).default(80).describe("🔊 Enhanced volume level (0-100)"),
            }
        },
        async ({ category, volume }) => {
            const randomAchievement = EnhancedSoundOracle.getRandomAchievement(category);

            if (!randomAchievement) {
                return {
                    content: [{
                        type: "text",
                        text: "❌ No achievements found for the specified category"
                    }],
                    success: false
                };
            }

            try {
                await EnhancedSoundOracle.playAchievementSound(randomAchievement, volume || 80, null, enhancedStats.voicePack);
                return {
                    content: [{
                        type: "text",
                        text: `🎲 Random achievement: ${randomAchievement} played!`
                    }],
                    success: true,
                    achievement: randomAchievement
                };
            } catch (error) {
                return {
                    content: [{
                        type: "text",
                        text: `❌ Error playing ${randomAchievement}: ${error instanceof Error ? error.message : String(error)}`
                    }],
                    success: false
                };
            }
        }
    );

    // 📋 List Enhanced Achievements
    server.registerTool(
        "list_enhanced_achievements",
        {
            description: "📋 List all available enhanced achievements and their categories",
            inputSchema: {
                category: z.enum(["streak", "quality", "multi", "game", "team"]).optional().describe("🎯 Filter by category"),
            },
            annotations: {
                title: "📋 List Achievements",
                readOnlyHint: true,
                destructiveHint: false,
                idempotentHint: true,
                openWorldHint: false
            }
        },
        async ({ category }) => {
            const achievements = category
                ? Object.entries(ENHANCED_ACHIEVEMENTS).filter(([_, info]) => info.category === category)
                : Object.entries(ENHANCED_ACHIEVEMENTS);

            const achievementList = achievements.map(([name, info]) =>
                `🏆 ${name} (${info.category}, threshold: ${info.threshold})`
            ).join('\n');

            return {
                content: [{
                    type: "text",
                    text: `📋 Available achievements:\n${achievementList}`
                }],
                achievements: achievements.map(([name, info]) => ({
                    name,
                    ...info
                })),
                total: achievements.length,
                category
            };
        }
    );
}
