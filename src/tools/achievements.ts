import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { EnhancedSoundOracle } from "../utils/sound.js";
import { ENHANCED_ACHIEVEMENTS, enhancedStats } from "../utils/types.js";

export function registerAchievementTools(server: McpServer) {
    // 🎯 Play Enhanced Quake Sound Tool
    server.registerTool(
        "play_enhanced_quake_sound",
        {
            description: "🏆 Plays a high-quality enhanced Quake 3 Arena achievement sound with dual voice pack support (male/female). Triggers audio playback on the local system and updates session statistics. Supports 25 different achievements across 5 categories: streak, quality, multi-kill, game events, and team events.",
            inputSchema: {
                achievement: z.enum(Object.keys(ENHANCED_ACHIEVEMENTS) as [string, ...string[]]).describe("🏆 Achievement name to play. Available achievements: RAMPAGE, DOMINATING, UNSTOPPABLE, GODLIKE (streak), EXCELLENT, PERFECT, IMPRESSIVE (quality), WICKED SICK, HEADSHOT, MULTI KILL, ULTRA KILL, MONSTER KILL, LUDICROUS KILL, KILLING SPREE, DOUBLE KILL, TRIPLE KILL (multi-kill), FIRST BLOOD, HUMILIATION, HOLY SHIT, BOTTOM FEEDER (game events), PREPARE TO FIGHT, PLAY (team events). Examples: 'GODLIKE', 'FIRST BLOOD', 'HEADSHOT'"),
                volume: z.number().min(0).max(100).default(80).describe("🔊 Volume level for audio playback (0-100). Default is 80. Set to 0 for silent, 100 for maximum volume. Examples: 50, 80, 100"),
                voiceGender: z.enum(["male", "female"]).optional().describe("🎤 Voice pack selection for this specific playback. Options: 'male' (Classic Quake 3 Arena male announcer, 15 sounds), 'female' (Female announcer voice pack, 16 sounds). If omitted, uses the currently set default voice pack. Examples: 'male', 'female'"),
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
            description: "🎲 Play a random achievement sound from a specific category. Useful for surprise celebrations or testing different achievement sounds. Returns the selected achievement name.",
            inputSchema: {
                category: z.enum(["streak", "quality", "multi", "game", "team"]).optional().describe("🎯 Filter achievements by category. Options: 'streak' (RAMPAGE, DOMINATING, etc.), 'quality' (EXCELLENT, PERFECT, etc.), 'multi' (WICKED SICK, HEADSHOT, etc.), 'game' (FIRST BLOOD, HUMILIATION, etc.), 'team' (PREPARE TO FIGHT, PLAY). If omitted, selects from all categories."),
                volume: z.number().min(0).max(100).default(80).describe("🔊 Volume level for audio playback (0-100). Default is 80. Higher values increase audio volume."),
            },
            annotations: {
                title: "🎲 Random Achievement",
                readOnlyHint: false,
                destructiveHint: false,
                idempotentHint: false,
                openWorldHint: true
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
            description: "📋 List all available enhanced achievements and their categories. Returns achievement names, categories, and thresholds. Useful for discovering available achievements or filtering by category type.",
            inputSchema: {
                category: z.enum(["streak", "quality", "multi", "game", "team"]).optional().describe("🎯 Filter achievements by category. Options: 'streak' (kill streak achievements like RAMPAGE, DOMINATING), 'quality' (quality-based achievements like EXCELLENT, PERFECT), 'multi' (multi-kill achievements like WICKED SICK, HEADSHOT), 'game' (game state announcements like FIRST BLOOD, HUMILIATION), 'team' (team events like PREPARE TO FIGHT, PLAY). If omitted, returns all achievements. Examples: 'streak', 'multi'"),
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
