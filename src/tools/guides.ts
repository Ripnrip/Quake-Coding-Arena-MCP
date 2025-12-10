import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ENHANCED_ACHIEVEMENTS, VOICE_PACKS, enhancedStats } from "../utils/types.js";
import { EnhancedSoundOracle } from "../utils/sound.js";

export function registerGuideTools(server: McpServer) {
    // 📖 Get Enhanced Achievement Guide
    server.registerTool(
        "get_enhanced_achievement_guide",
        {
            description: "📖 Get a comprehensive guide explaining all available achievements, their categories, thresholds, and usage recommendations. Returns detailed information about each achievement including when to use them, what they represent, and which voice packs support them.",
            inputSchema: {
                category: z.enum(["streak", "quality", "multi", "game", "team"]).optional().describe("🎯 Filter guide by achievement category. Options: 'streak' (kill streak achievements), 'quality' (quality-based achievements), 'multi' (multi-kill achievements), 'game' (game state announcements), 'team' (team events). If omitted, returns guide for all categories. Examples: 'streak', 'multi'"),
            },
            annotations: {
                title: "📖 Get Achievement Guide",
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

            const guide = achievements.map(([name, info]) => {
                const voiceSupport = [];
                // Check which voices support this achievement
                const malePath = `sounds/male/${info.file}`;
                const femalePath = `sounds/female/${info.file}`;
                // Note: In real implementation, we'd check file existence, but for guide we'll indicate based on known availability
                
                let voiceInfo = "Both voices";
                if (name === "EXCELLENT" || name === "PERFECT" || name === "IMPRESSIVE" || name === "DOUBLE KILL" || name === "TRIPLE KILL" || name === "PREPARE TO FIGHT") {
                    voiceInfo = "Male voice only";
                } else if (name === "HEADSHOT" || name === "MULTI KILL" || name === "KILLING SPREE" || name === "ULTRA KILL" || name === "MONSTER KILL" || name === "LUDICROUS KILL" || name === "BOTTOM FEEDER" || name === "PLAY") {
                    voiceInfo = "Female voice only";
                }

                return `🏆 ${name}
   Category: ${info.category}
   Threshold: ${info.threshold}
   Voice Support: ${voiceInfo}
   Description: ${getAchievementDescription(name, info.category)}`;
            }).join('\n\n');

            return {
                content: [{
                    type: "text",
                    text: `📖 Enhanced Achievement Guide${category ? ` (${category} category)` : ''}\n\n${guide}\n\n💡 Usage Tips:\n- Use streak achievements for consecutive accomplishments\n- Quality achievements celebrate exceptional work\n- Multi-kill achievements recognize rapid success\n- Game events mark important milestones\n- Team events motivate collaboration`
                }],
                guide: achievements.map(([name, info]) => ({
                    name,
                    ...info
                })),
                category: category || "all"
            };
        }
    );

    // 🤖 Get AI Usage Guide
    server.registerTool(
        "get_ai_usage_guide",
        {
            description: "🤖 Get context-specific usage tips and best practices for AI assistants using this MCP server. Provides recommendations on when to trigger achievements, how to use voice packs effectively, and integration patterns for gamifying development workflows.",
            inputSchema: {
                context: z.enum(["coding", "testing", "debugging", "deployment", "general"]).optional().describe("🎯 Context for usage guide. Options: 'coding' (during code writing/refactoring), 'testing' (during test execution), 'debugging' (when fixing bugs), 'deployment' (during deployment processes), 'general' (general usage patterns). If omitted, returns comprehensive guide. Examples: 'coding', 'debugging'"),
            },
            annotations: {
                title: "🤖 Get AI Usage Guide",
                readOnlyHint: true,
                destructiveHint: false,
                idempotentHint: true,
                openWorldHint: false
            }
        },
        async ({ context }) => {
            const contextGuides: Record<string, string> = {
                coding: `💻 Coding Context:
- Trigger EXCELLENT/PERFECT when code passes linting
- Use IMPRESSIVE for creative solutions
- Play FIRST BLOOD when starting a new feature
- Use GODLIKE for completing major refactoring
- Switch to female voice for variety`,
                testing: `🧪 Testing Context:
- Play FIRST BLOOD when first test passes
- Use MULTI KILL for multiple passing tests
- Trigger WICKED SICK for 100% test coverage
- Use HOLY SHIT for unexpected test discoveries`,
                debugging: `🐛 Debugging Context:
- Play FIRST BLOOD when finding the bug
- Use HEADSHOT for quick bug fixes
- Trigger HUMILIATION for fixing embarrassing bugs
- Use BOTTOM FEEDER when learning from mistakes`,
                deployment: `🚀 Deployment Context:
- Play PREPARE TO FIGHT before deployment
- Use RAMPAGE for successful deployments
- Trigger GODLIKE for zero-downtime deployments
- Use PLAY to celebrate going live`,
                general: `🌟 General Usage:
- Set volume to 60-80% for comfortable listening
- Switch between male/female voices for variety
- Use random achievements for surprise celebrations
- Track stats to see your productivity patterns
- Combine achievements for epic moments`
            };

            const guide = context 
                ? contextGuides[context] 
                : Object.entries(contextGuides).map(([ctx, text]) => text).join('\n\n');

            return {
                content: [{
                    type: "text",
                    text: `🤖 AI Usage Guide${context ? ` (${context} context)` : ''}\n\n${guide}\n\n💡 Pro Tips:\n- Use voiceGender parameter to override default voice\n- Check stats regularly to track progress\n- Combine multiple achievements for epic moments\n- Adjust volume based on environment (lower in shared spaces)`
                }],
                context: context || "all",
                guide
            };
        }
    );

    // 🧪 Test Voice Packs
    server.registerTool(
        "test_voice_packs",
        {
            description: "🧪 Test all voice packs by playing a sample achievement from each voice pack (male and female). Useful for verifying audio setup, comparing voice styles, or ensuring all voice packs are working correctly. Plays one achievement from each voice pack sequentially.",
            inputSchema: {
                volume: z.number().min(0).max(100).default(80).describe("🔊 Volume level for test audio playback (0-100). Default is 80. Examples: 50, 80, 100"),
            },
            annotations: {
                title: "🧪 Test Voice Packs",
                readOnlyHint: false,
                destructiveHint: false,
                idempotentHint: false,
                openWorldHint: true
            }
        },
        async ({ volume }) => {
            const results = [];
            
            // Test male voice with a common achievement
            try {
                await EnhancedSoundOracle.playAchievementSound("RAMPAGE", volume, "male", "male");
                results.push({ voice: "male", achievement: "RAMPAGE", status: "success" });
            } catch (error) {
                results.push({ voice: "male", achievement: "RAMPAGE", status: "error", error: error instanceof Error ? error.message : String(error) });
            }

            // Small delay between sounds
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Test female voice with a common achievement
            try {
                await EnhancedSoundOracle.playAchievementSound("RAMPAGE", volume, "female", "female");
                results.push({ voice: "female", achievement: "RAMPAGE", status: "success" });
            } catch (error) {
                results.push({ voice: "female", achievement: "RAMPAGE", status: "error", error: error instanceof Error ? error.message : String(error) });
            }

            const successCount = results.filter(r => r.status === "success").length;
            const allSuccess = successCount === results.length;

            return {
                content: [{
                    type: "text",
                    text: `🧪 Voice Pack Test Results:\n\n${results.map(r => 
                        `🎤 ${r.voice.toUpperCase()}: ${r.status === "success" ? "✅ Success" : `❌ Error: ${r.error}`}`
                    ).join('\n')}\n\n${allSuccess ? "🎉 All voice packs working correctly!" : "⚠️ Some voice packs had issues. Check error messages above."}`
                }],
                results,
                successCount,
                totalTests: results.length,
                allSuccess
            };
        }
    );
}

function getAchievementDescription(name: string, category: string): string {
    const descriptions: Record<string, string> = {
        "RAMPAGE": "Celebrate multiple quick accomplishments or rapid progress",
        "DOMINATING": "Acknowledge complex problems solved or sustained excellence",
        "UNSTOPPABLE": "Recognize long productive sessions or continuous improvement",
        "GODLIKE": "Celebrate legendary coding sessions or exceptional achievements",
        "EXCELLENT": "Appreciate elegant solutions or well-written code",
        "PERFECT": "Acknowledge flawless implementation or zero-error work",
        "IMPRESSIVE": "Recognize creative problem-solving or innovative approaches",
        "WICKED SICK": "Celebrate mind-blowing solutions or exceptional performance",
        "HEADSHOT": "Acknowledge precision coding or exact problem solving",
        "MULTI KILL": "Recognize multiple bugs squashed or tasks completed",
        "KILLING SPREE": "Celebrate consistent productivity or rapid success",
        "ULTRA KILL": "Acknowledge exceptional performance or major milestones",
        "MONSTER KILL": "Recognize massive code refactoring or large-scale work",
        "LUDICROUS KILL": "Celebrate unbelievable solutions or extraordinary achievements",
        "DOUBLE KILL": "Acknowledge two quick wins or paired accomplishments",
        "TRIPLE KILL": "Recognize triple efficiency or three-part success",
        "FIRST BLOOD": "Mark the first bug found, first test passed, or initial success",
        "HUMILIATION": "Acknowledge quick bug fixes or rapid problem resolution",
        "HOLY SHIT": "Celebrate unexpected breakthroughs or surprising discoveries",
        "BOTTOM FEEDER": "Recognize learning from mistakes or growth moments",
        "PREPARE TO FIGHT": "Motivate team before deployment or major work",
        "PLAY": "Celebrate game on moments or starting new challenges"
    };
    
    return descriptions[name] || `Achievement in ${category} category`;
}

