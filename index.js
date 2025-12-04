#!/usr/bin/env node

/**
 * 🎭 The Enhanced Quake Oracle - Node.js MCP Server Edition v2.1
 *
 * "Where coding victories become legendary achievements, and every
 * keystroke echoes through the digital arena with authentic male/female Quake voices!"
 *
 * Features: 11 achievements, voice switching (male/female), WAV/MP3 support
 *
 * - The Enhanced Quake Arena Master of Node.js
 */

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} = require('@modelcontextprotocol/sdk/types.js');

// 🌟 The cosmic configuration of our enhanced digital arena
// Now with actual downloaded Quake sounds!
const ENHANCED_ACHIEVEMENTS = {
  // 🎯 Classic Kill Streaks (Available Sounds)
  'RAMPAGE': { file: 'rampage.mp3', category: 'streak', threshold: 10 },
  'DOMINATING': { file: 'dominating.mp3', category: 'streak', threshold: 15 },
  'UNSTOPPABLE': { file: 'unstoppable.mp3', category: 'streak', threshold: 20 },
  'GODLIKE': { file: 'godlike.mp3', category: 'streak', threshold: 25 },

  // ✨ Quality Achievements (Available Sounds)
  'EXCELLENT': { file: 'excellent.mp3', category: 'quality', threshold: 1 },
  'PERFECT': { file: 'perfect.mp3', category: 'quality', threshold: 1 },
  'IMPRESSIVE': { file: 'impressive.mp3', category: 'quality', threshold: 1 },

  // 🔥 Special Multi-kills (Available Sounds)
  'WICKED SICK': { file: 'wicked-sick.mp3', category: 'multi', threshold: 7 },

  // 🎪 Game State Announcements (Available Sounds)
  'HUMILIATION': { file: 'humiliation.mp3', category: 'game', threshold: 1 },
  'FIRST BLOOD': { file: 'first-blood.mp3', category: 'game', threshold: 1 },

  // 👥 Team Achievements (Available Sounds)
  'PREPARE TO FIGHT': { file: 'prepare-to-fight.mp3', category: 'team', threshold: 1 }
};

// 🎪 The cosmic state of our enhanced digital arena
let enhancedStats = {
  totalAchievements: 0,
  categoryStats: {},
  lastPlayed: null,
  volume: 80, // Enhanced volume control
  sessionStart: new Date().toISOString(),
  favoriteCategory: null,
  currentStreak: 0,
  longestStreak: 0,
  voicePack: 'male', // 🎤 Voice gender selection: 'male', 'female'
  femaleVoiceStyle: 'sexy-announcer' // 🎭 Female voice style: 'sexy-announcer', 'gaming-announcer', etc.
};

// 🎤 Available voice pack configurations
const VOICE_PACKS = {
  male: {
    path: '../sounds/male',
    displayName: 'Male Announcer',
    description: 'Classic Quake 3 Arena male announcer voice'
  },
  female: {
    path: '../sounds/female/sexy-announcer',
    displayName: 'Sexy Female Announcer',
    description: 'Authentic female announcer voice pack with energetic tone (WAV format)'
  }
};

// 🎨 Initialize category stats
Object.values(ENHANCED_ACHIEVEMENTS).forEach(achievement => {
  if (!enhancedStats.categoryStats[achievement.category]) {
    enhancedStats.categoryStats[achievement.category] = 0;
  }
});

// 🌟 The Enhanced Cross-Platform Sound Alchemist
class EnhancedSoundOracle {
  static async playAchievementSound(achievementName, volume = 80, voiceGender = null) {
    const achievement = ENHANCED_ACHIEVEMENTS[achievementName.toUpperCase()];

    if (!achievement) {
      throw new Error(`❌ Unknown achievement: ${achievementName}`);
    }

    // 🎤 Use selected voice pack or default to current voice pack
    const selectedVoice = voiceGender || enhancedStats.voicePack;
    const voicePath = VOICE_PACKS[selectedVoice]?.path || VOICE_PACKS.male.path;

    // 🎵 Try WAV first (for female sounds), then MP3
    const baseName = achievement.file.replace('.mp3', '');
    const soundPathWav = `${__dirname}/${voicePath}/${baseName}.wav`;
    const soundPathMp3 = `${__dirname}/${voicePath}/${achievement.file}`;

    // Check which format exists for this voice pack
    const fs = require('fs');
    let soundPath;
    if (fs.existsSync(soundPathWav)) {
      soundPath = soundPathWav;
    } else if (fs.existsSync(soundPathMp3)) {
      soundPath = soundPathMp3;
    } else {
      // Fallback to male voice
      const maleVoicePath = VOICE_PACKS.male.path;
      const malePathWav = `${__dirname}/${maleVoicePath}/${baseName}.wav`;
      const malePathMp3 = `${__dirname}/${maleVoicePath}/${achievement.file}`;

      if (fs.existsSync(malePathWav)) {
        soundPath = malePathWav;
      } else if (fs.existsSync(malePathMp3)) {
        soundPath = malePathMp3;
      } else {
        throw new Error(`❌ Sound file not found: ${baseName} (${achievement.file})`);
      }
    }

    try {
      // 🎨 Cross-platform audio magic with enhanced volume control
      const platform = process.platform;
      let command;

      if (platform === 'darwin') {
        // macOS magic with volume control
        command = `afplay -v ${volume / 100} "${soundPath}"`;
      } else if (platform === 'win32') {
        // Windows PowerShell magic
        command = `powershell -Command "(New-Object Media.SoundPlayer '${soundPath}').PlaySync(); Start-Sleep -Milliseconds 100"`;
      } else {
        // Linux magic with volume control
        command = `paplay --volume=${volume} "${soundPath}" 2>/dev/null || aplay "${soundPath}" 2>/dev/null`;
      }

      // Achievement activation logged silently for MCP protocol

      // 🎭 Execute the enhanced sound ritual
      const { spawn } = require('child_process');
      return new Promise((resolve, reject) => {
        const child = spawn(command, [], { shell: true, detached: true });

        child.unref(); // Let it run in the background
        child.on('error', reject);
        child.on('spawn', () => {
          // Achievement success logged silently for MCP protocol
          resolve(true);
        });

        // Auto-cleanup after 5 seconds
        setTimeout(() => {
          try {
            child.kill('SIGTERM');
          } catch (e) {
            // Already finished
          }
        }, 5000);
      });

    } catch (error) {
      console.error(`🌩️ Enhanced sound challenge: ${error.message}`);
      throw error;
    }
  }

  static async checkAchievementExists(achievementName) {
    return ENHANCED_ACHIEVEMENTS.hasOwnProperty(achievementName.toUpperCase());
  }

  static getAchievementInfo(achievementName) {
    return ENHANCED_ACHIEVEMENTS[achievementName.toUpperCase()];
  }

  static getRandomAchievement(category = null) {
    const achievements = category
      ? Object.entries(ENHANCED_ACHIEVEMENTS).filter(([_, info]) => info.category === category)
      : Object.entries(ENHANCED_ACHIEVEMENTS);

    const random = achievements[Math.floor(Math.random() * achievements.length)];
    return random ? random[0] : null;
  }
}

// 🎭 The Enhanced MCP Server Virtuoso
class EnhancedQuakeMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: "enhanced-quake-coding-arena",
        version: "2.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupEnhancedTools();
  }

  // 🌟 Setup Enhanced Tools Ritual
  setupEnhancedTools() {
    // 🎯 Enhanced Sound Player Tool
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case "play_enhanced_quake_sound":
            return await this.handleEnhancedSoundPlay(args);
          case "get_enhanced_achievement_stats":
            return await this.getEnhancedAchievementStats();
          case "get_enhanced_achievement_guide":
            return await this.getEnhancedAchievementGuide(args);
          case "get_ai_usage_guide":
            return await this.getAIUsageGuide(args);
          case "set_enhanced_volume":
            return await this.setEnhancedVolume(args);
          case "random_enhanced_achievement":
            return await this.playRandomEnhancedAchievement(args);
          case "list_enhanced_achievements":
            return await this.listEnhancedAchievements(args);
          case "set_voice_pack":
            return await this.setVoicePack(args);
          case "get_voice_pack_info":
            return await this.getVoicePackInfo(args);
          case "test_voice_packs":
            return await this.testVoicePacks(args);
          default:
            throw new McpError(
              ErrorCode.MethodNotFound,
              `🌩️ Unknown enhanced tool: ${name}`
            );
        }
      } catch (error) {
        console.error(`🌩️ Enhanced tool error: ${error.message}`);
        throw new McpError(
          ErrorCode.InternalError,
          `🎭 Enhanced arena challenge: ${error.message}`
        );
      }
    });

    // 📚 Enhanced Tools List
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "play_enhanced_quake_sound",
            description: "🎯 Play an enhanced Quake achievement sound with voice gender selection!",
            inputSchema: {
              type: "object",
              properties: {
                achievement: {
                  type: "string",
                  description: "🏆 Enhanced achievement name (GODLIKE, UNSTOPPABLE, RAMPAGE, EXCELLENT, WICKED SICK, etc.)",
                  enum: Object.keys(ENHANCED_ACHIEVEMENTS),
                },
                volume: {
                  type: "number",
                  description: "🔊 Enhanced volume level (0-100)",
                  minimum: 0,
                  maximum: 100,
                  default: 80,
                },
                voiceGender: {
                  type: "string",
                  description: "🎤 Voice gender selection (male, female)",
                  enum: ["male", "female"],
                  default: null,
                },
              },
              required: ["achievement"],
            },
          },
          {
            name: "get_enhanced_achievement_stats",
            description: "📊 Get comprehensive enhanced achievement statistics and insights",
            inputSchema: {
              type: "object",
              properties: {},
            },
          },
          {
            name: "get_enhanced_achievement_guide",
            description: "📚 Complete enhanced guide to all Quake achievements and categories",
            inputSchema: {
              type: "object",
              properties: {
                category: {
                  type: "string",
                  description: "🎯 Filter by category (streak, quality, multi, game, team)",
                  enum: ["streak", "quality", "multi", "game", "team"],
                },
              },
            },
          },
          {
            name: "get_ai_usage_guide",
            description: "🤖 AI Usage Guide: Learn when and how to trigger Quake sounds for optimal coding motivation",
            inputSchema: {
              type: "object",
              properties: {
                context: {
                  type: "string",
                  description: "🎯 Get specific guidance for contexts like debugging, feature development, code review",
                  enum: ["debugging", "features", "quality", "productivity", "all"],
                },
              },
            },
          },
          {
            name: "set_enhanced_volume",
            description: "🔊 Set enhanced volume for all arena sounds (0-100)",
            inputSchema: {
              type: "object",
              properties: {
                volume: {
                  type: "number",
                  description: "🔊 Enhanced volume level (0-100)",
                  minimum: 0,
                  maximum: 100,
                },
              },
              required: ["volume"],
            },
          },
          {
            name: "random_enhanced_achievement",
            description: "🎲 Play a random enhanced achievement sound, optionally filtered by category",
            inputSchema: {
              type: "object",
              properties: {
                category: {
                  type: "string",
                  description: "🎯 Filter by category (streak, quality, multi, game, team, powerup)",
                  enum: ["streak", "quality", "multi", "game", "team", "powerup"],
                },
                volume: {
                  type: "number",
                  description: "🔊 Enhanced volume level (0-100)",
                  minimum: 0,
                  maximum: 100,
                  default: 80,
                },
              },
            },
          },
          {
            name: "list_enhanced_achievements",
            description: "📋 List all available enhanced achievements with detailed info",
            inputSchema: {
              type: "object",
              properties: {
                category: {
                  type: "string",
                  description: "🎯 Filter by category (streak, quality, multi, game, team, powerup)",
                  enum: ["streak", "quality", "multi", "game", "team", "powerup"],
                },
              },
            },
          },
          {
            name: "set_voice_pack",
            description: "🎤 Set the announcer voice pack (male or female)",
            inputSchema: {
              type: "object",
              properties: {
                voiceGender: {
                  type: "string",
                  description: "🎤 Voice gender selection",
                  enum: ["male", "female"],
                },
              },
              required: ["voiceGender"],
            },
          },
          {
            name: "get_voice_pack_info",
            description: "🎤 Get current voice pack information and available options",
            inputSchema: {
              type: "object",
              properties: {},
            },
          },
          {
            name: "test_voice_packs",
            description: "🧪 Test all available voice packs with a sample achievement",
            inputSchema: {
              type: "object",
              properties: {
                achievement: {
                  type: "string",
                  description: "🏆 Achievement to test with (default: EXCELLENT)",
                  enum: Object.keys(ENHANCED_ACHIEVEMENTS),
                  default: "EXCELLENT",
                },
              },
            },
          },
        ],
      };
    });
  }

  // 🎯 Enhanced Sound Handler
  async handleEnhancedSoundPlay(args) {
    const { achievement, volume = enhancedStats.volume, voiceGender } = args;

    if (!achievement) {
      throw new McpError(
        ErrorCode.InvalidParams,
        "🎯 Enhanced achievement name is required, arena champion!"
      );
    }

    const achievementUpper = achievement.toUpperCase();
    const exists = await EnhancedSoundOracle.checkAchievementExists(achievementUpper);

    if (!exists) {
      const available = Object.keys(ENHANCED_ACHIEVEMENTS).join(", ");
      throw new McpError(
        ErrorCode.InvalidParams,
        `❌ Unknown enhanced achievement: ${achievement}. Available: ${available}`
      );
    }

    const achievementInfo = EnhancedSoundOracle.getAchievementInfo(achievementUpper);

    try {
      await EnhancedSoundOracle.playAchievementSound(achievementUpper, volume, voiceGender);

      // 🎊 Update enhanced statistics
      enhancedStats.totalAchievements++;
      enhancedStats.categoryStats[achievementInfo.category]++;
      enhancedStats.lastPlayed = `${achievementUpper} (${new Date().toLocaleTimeString()})`;

      // 🔥 Update streak logic
      if (achievementInfo.category === 'streak') {
        enhancedStats.currentStreak = Math.max(enhancedStats.currentStreak, achievementInfo.threshold);
        enhancedStats.longestStreak = Math.max(enhancedStats.longestStreak, enhancedStats.currentStreak);
      }

      // 🏆 Update favorite category
      const maxCategory = Object.entries(enhancedStats.categoryStats)
        .reduce((a, b) => a[1] > b[1] ? a : b)[0];
      enhancedStats.favoriteCategory = maxCategory;

      return {
        success: true,
        message: `🎯 ✨ ENHANCED ${achievementUpper} ECHOES THROUGH THE ARENA at ${volume}% volume!`,
        achievement: achievementUpper,
        category: achievementInfo.category,
        threshold: achievementInfo.threshold,
        volume: volume,
        soundFile: achievementInfo.file,
        stats: enhancedStats
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `🌩️ Enhanced sound challenge: ${error.message}`
      );
    }
  }

  // 📊 Enhanced Statistics Handler
  async getEnhancedAchievementStats() {
    const session = enhancedStats.sessionStart ?
      Math.round((Date.now() - new Date(enhancedStats.sessionStart)) / 1000 / 60) : 0;

    return {
      success: true,
      message: "📊 Enhanced arena statistics retrieved!",
      stats: {
        totalAchievements: enhancedStats.totalAchievements,
        categoryStats: enhancedStats.categoryStats,
        lastPlayed: enhancedStats.lastPlayed,
        volume: enhancedStats.volume,
        sessionMinutes: session,
        favoriteCategory: enhancedStats.favoriteCategory,
        currentStreak: enhancedStats.currentStreak,
        longestStreak: enhancedStats.longestStreak,
        achievementsPerMinute: session > 0 ? (enhancedStats.totalAchievements / session).toFixed(2) : 0
      }
    };
  }

  // 📚 Enhanced Achievement Guide Handler
  async getEnhancedAchievementGuide(args) {
    const { category } = args;

    let guide = `🎯 **ENHANCED QUAKE CODING ARENA - COMPREHENSIVE ACHIEVEMENT GUIDE** 🎯\n\n`;
    guide += `📊 Total Achievements Available: ${Object.keys(ENHANCED_ACHIEVEMENTS).length}\n`;
    guide += `🔊 Current Volume: ${enhancedStats.volume}%\n\n`;

    const categories = {
      streak: "🔥 **KILL STREAKS** - Progressive achievement chains",
      quality: "✨ **QUALITY ACHIEVEMENTS** - Exceptional coding moments",
      multi: "⚔️ **MULTI-KILLS** - Rapid successive victories",
      game: "🎮 **GAME EVENTS** - Special arena moments",
      team: "👥 **TEAM ACHIEVEMENTS** - Collaborative victories",
      powerup: "💎 **POWER-UPS** - Enhancement moments"
    };

    if (category && categories[category]) {
      guide += `${categories[category]}\n\n`;

      const categoryAchievements = Object.entries(ENHANCED_ACHIEVEMENTS)
        .filter(([_, info]) => info.category === category)
        .sort((a, b) => a[1].threshold - b[1].threshold);

      categoryAchievements.forEach(([name, info]) => {
        guide += `🏆 **${name}** - ${info.file} (Threshold: ${info.threshold})\n`;
      });
    } else {
      Object.entries(categories).forEach(([cat, desc]) => {
        guide += `${desc}\n\n`;

        const catAchievements = Object.entries(ENHANCED_ACHIEVEMENTS)
          .filter(([_, info]) => info.category === cat)
          .sort((a, b) => a[1].threshold - b[1].threshold);

        catAchievements.forEach(([name, info]) => {
          guide += `  🏆 **${name}** - ${info.file}\n`;
        });
        guide += `\n`;
      });
    }

    guide += `\n🎮 **Usage Examples:**\n`;
    guide += `• "Play godlike achievement sound"\n`;
    guide += `• "Trigger wicked sick at 50% volume"\n`;
    guide += `• "Random streak achievement"\n`;
    guide += `• "Show me team achievements"\n\n`;

    guide += `📊 **Current Session Stats:**\n`;
    guide += `• Total Achievements: ${enhancedStats.totalAchievements}\n`;
    guide += `• Session Time: ${Math.round((Date.now() - new Date(enhancedStats.sessionStart)) / 1000 / 60)} minutes\n`;
    guide += `• Favorite Category: ${enhancedStats.favoriteCategory || 'None yet'}\n`;

    return {
      success: true,
      message: "📚 Enhanced achievement guide retrieved!",
      guide: guide
    };
  }

  // 🤖 AI Usage Guide Handler
  async getAIUsageGuide(args) {
    const { context } = args;

    let guide = `🤖 **ENHANCED QUAKE ARENA - AI USAGE GUIDE** 🤖\n\n`;
    guide += `📚 Learn when and how to trigger Quake sounds for optimal coding motivation!\n\n`;

    if (context && context !== 'all') {
      // Context-specific guidance
      const contexts = {
        debugging: {
          title: "🔍 DEBUGGING BATTLES",
          triggers: [
            "First bug found → 🎯 FIRST BLOOD",
            "Bug fixed quickly → 🎯 HUMILIATION achievement",
            "Complex bug solved → 🎯 WICKED SICK achievement",
            "All bugs defeated → 🎯 DOMINATING achievement"
          ],
          examples: [
            "🔍 Bug located! 🎯 First blood!",
            "✅ Bug defeated! 🎯 HUMILIATION for that pesky error!",
            "🧠 Brilliant debugging! 🎯 WICKED SICK!"
          ]
        },
        features: {
          title: "🚀 FEATURE DEVELOPMENT",
          triggers: [
            "Feature complete → 🎯 EXCELLENT achievement",
            "Multiple features → 🎯 RAMPAGE achievement",
            "Complex implementation → 🎯 DOMINATING achievement",
            "Perfect implementation → 🎯 PERFECT achievement"
          ],
          examples: [
            "✅ Feature implemented! 🎯 EXCELLENT achievement at 80% volume!",
            "🚀 3 features complete! 🎯 RAMPAGE! You're on fire!",
            "💡 Perfect implementation! 🎯 PERFECT achievement!"
          ]
        },
        quality: {
          title: "✨ CODE QUALITY MOMENTS",
          triggers: [
            "Clean code → 🎯 PERFECT achievement",
            "Elegant solution → 🎯 IMPRESSIVE achievement",
            "Excellent code → 🎯 EXCELLENT achievement",
            "Legendary code → 🎯 GODLIKE achievement"
          ],
          examples: [
            "🧹 Code refactored beautifully! 🎯 PERFECT achievement!",
            "💡 Elegant solution! 🎯 IMPRESSIVE achievement!",
            "🏆 Legendary implementation! 🎯 GODLIKE at 100% volume!"
          ]
        },
        productivity: {
          title: "📈 PRODUCTIVITY STREAKS",
          triggers: [
            "Quick succession tasks → 🎯 RAMPAGE achievement",
            "Unstoppable progress → 🎯 UNSTOPPABLE achievement",
            "Major milestone → 🎯 DOMINATING achievement",
            "Session start → 🎯 PREPARE TO FIGHT"
          ],
          examples: [
            "⚡ 3 tasks in quick succession! 🎯 RAMPAGE achievement!",
            "🔥 You're unstoppable! 🎯 UNSTOPPABLE achievement!",
            "🎯 Time to code! PREPARE TO FIGHT achievement!"
          ]
        }
      };

      const ctx = contexts[context];
      if (ctx) {
        guide += `${ctx.title}\n\n`;
        guide += `**🎯 When to Trigger:**\n`;
        ctx.triggers.forEach(trigger => {
          guide += `• ${trigger}\n`;
        });
        guide += `\n**💬 Example Responses:**\n`;
        ctx.examples.forEach(example => {
          guide += `• ${example}\n`;
        });
      }
    } else {
      // Complete guide
      guide += `## ⚡ **INSTANT TRIGGER CHEAT SHEET**\n\n`;

      guide += `### **Code Quality Moments:**\n`;
      guide += `• "Perfect code" → 🎯 **PERFECT** achievement\n`;
      guide += `• "Excellent solution" → 🎯 **EXCELLENT** achievement\n`;
      guide += `• "Brilliant approach" → 🎯 **IMPRESSIVE** achievement\n`;
      guide += `• "Clean implementation" → 🎯 **PERFECT** at 70% volume\n\n`;

      guide += `### **Problem Solving Victories:**\n`;
      guide += `• "First bug found" → 🎯 **FIRST BLOOD**\n`;
      guide += `• "Bug defeated" → 🎯 **HUMILIATION** achievement\n`;
      guide += `• "Clever solution" → 🎯 **WICKED SICK** achievement\n`;
      guide += `• "Breakthrough moment" → 🎯 **DOMINATING** achievement\n\n`;

      guide += `### **Productivity Streaks:**\n`;
      guide += `• "3 tasks complete" → 🎯 **RAMPAGE** achievement\n`;
      guide += `• "Quick succession" → 🎯 **RAMPAGE** at 80% volume\n`;
      guide += `• "On a roll" → 🎯 **DOMINATING** achievement\n`;
      guide += `• "Unstoppable" → 🎯 **UNSTOPPABLE** achievement\n\n`;

      guide += `### **Exceptional Achievements:**\n`;
      guide += `• "Legendary solution" → 🎯 **GODLIKE** at 100% volume\n`;
      guide += `• "Amazing work" → 🎯 **GODLIKE** achievement\n`;
      guide += `• "Incredible" → 🎯 **GODLIKE** at 90% volume\n`;
      guide += `• "Mind-blowing" → 🎯 **GODLIKE** at 100% volume\n\n`;

      guide += `### **Project Start:**\n`;
      guide += `• "Let's code" → 🎯 **PREPARE TO FIGHT** achievement\n`;
      guide += `• "Time to start" → 🎯 **PREPARE TO FIGHT** achievement\n`;
      guide += `• "Begin coding" → 🎯 **PREPARE TO FIGHT** achievement\n\n`;

      guide += `## 🔊 **VOLUME GUIDELINES**\n\n`;
      guide += `• **30-50%:** Small victories, minor fixes, subtle celebrations\n`;
      guide += `• **60-80%:** Good solutions, feature completion, moderate excitement\n`;
      guide += `• **90-100%:** Exceptional achievements, breakthroughs, major celebrations\n\n`;

      guide += `## ✅ **DO's AND ❌ DON'Ts**\n\n`;
      guide += `**✅ DO use for:**\n`;
      guide += `• User expresses satisfaction with solution\n`;
      guide += `• Code runs successfully without errors\n`;
      guide += `• Creative or clever problem solving\n`;
      guide += `• Multiple quick wins in succession\n`;
      guide += `• Learning moments and breakthroughs\n\n`;

      guide += `**❌ DON'T overuse for:**\n`;
      guide += `• Every single line of code\n`;
      guide += `• Simple explanations or routine tasks\n`;
      guide += `• Failed attempts or errors\n`;
      guide += `• When user is frustrated\n`;
      guide += `• Unremarkable accomplishments\n\n`;

      guide += `## 📝 **SAMPLE AI RESPONSES**\n\n`;
      guide += `\`\`\n`;
      guide += `✅ Perfect implementation! 🎯 Play perfect achievement at 70% volume\n\n`;
      guide += `🔍 Bug found and fixed! 🎯 First blood!\n\n`;
      guide += `🚀 Feature complete! 🎯 Excellent achievement at 80% volume\n\n`;
      guide += `💡 Brilliant solution! 🎯 Impressive achievement at 85% volume\n\n`;
      guide += `🏆 That's legendary! 🎯 GODLIKE ACHIEVEMENT at 100% volume!\n`;
      guide += `\`\`\n\n`;

      guide += `## 🎪 **CONTEXTUAL EXAMPLES**\n\n`;
      guide += `**Early Morning Coding:**\n`;
      guide += `User: "Time to start coding for the day!"\n`;
      guide += `AI: "☕ Coffee ready! 🎯 Prepare to fight achievement! Let's make today productive!"\n\n`;

      guide += `**Debugging Session:**\n`;
      guide += `User: "Finally found that annoying bug!"\n`;
      guide += `AI: "🎯 First blood! 🎯 HUMILIATION for the bug that challenged you!"\n\n`;

      guide += `**Feature Development:**\n`;
      guide += `User: "This API endpoint works perfectly!"\n`;
      guide += `AI: "✅ Perfect implementation! 🎯 Perfect achievement!"\n\n`;

      guide += `**Complex Problem:**\n`;
      guide += `User: "This solution is incredible!"\n`;
      guide += `AI: "🏆 Legendary work! 🎯 GODLIKE ACHIEVEMENT at 100% volume!"\n`;
    }

    guide += `\n\n🎯 **ENHANCED QUAKE ARENA - MAKING EVERY CODING SESSION EPIC!** 🎮✨`;
    guide += `\n📊 Available achievements: ${Object.keys(ENHANCED_ACHIEVEMENTS).length}`;
    guide += `\n🔧 Current volume: ${enhancedStats.volume}%`;

    return {
      success: true,
      message: "🤖 AI usage guide retrieved! Master the art of motivational coding!",
      guide: guide,
      context: context || 'all',
      available_achievements: Object.keys(ENHANCED_ACHIEVEMENTS).length
    };
  }

  // 🔊 Enhanced Volume Setter Handler
  async setEnhancedVolume(args) {
    const { volume } = args;

    if (typeof volume !== 'number' || volume < 0 || volume > 100) {
      throw new McpError(
        ErrorCode.InvalidParams,
        "🔊 Enhanced volume must be a number between 0 and 100!"
      );
    }

    enhancedStats.volume = Math.round(volume);

    return {
      success: true,
      message: `🔊 Enhanced arena volume set to ${enhancedStats.volume}%!`,
      volume: enhancedStats.volume
    };
  }

  // 🎲 Random Enhanced Achievement Handler
  async playRandomEnhancedAchievement(args) {
    const { category, volume = enhancedStats.volume } = args;

    const randomAchievement = EnhancedSoundOracle.getRandomAchievement(category);

    if (!randomAchievement) {
      throw new McpError(
        ErrorCode.InternalError,
        "🎲 No enhanced achievements available for the specified category!"
      );
    }

    return await this.handleEnhancedSoundPlay({
      achievement: randomAchievement,
      volume: volume
    });
  }

  // 📋 Enhanced Achievement Lister Handler
  async listEnhancedAchievements(args) {
    const { category } = args;

    let achievements = Object.entries(ENHANCED_ACHIEVEMENTS);

    if (category) {
      achievements = achievements.filter(([_, info]) => info.category === category);
    }

    const sortedAchievements = achievements.sort((a, b) => {
      // Sort by category first, then by threshold
      if (a[1].category !== b[1].category) {
        return a[1].category.localeCompare(b[1].category);
      }
      return a[1].threshold - b[1].threshold;
    });

    const list = sortedAchievements.map(([name, info]) => ({
      name: name,
      file: info.file,
      category: info.category,
      threshold: info.threshold
    }));

    return {
      success: true,
      message: category
        ? `📋 Found ${list.length} enhanced ${category} achievements!`
        : `📋 Found all ${list.length} enhanced achievements!`,
      achievements: list,
      total: list.length
    };
  }

  // 🎤 Voice Pack Management Methods

  // 🎭 Set Voice Pack - Switch between male and female announcer
  async setVoicePack(args) {
    const { voiceGender } = args;

    if (!voiceGender) {
      throw new McpError(
        ErrorCode.InvalidParams,
        "🎤 Voice gender is required (male or female)!"
      );
    }

    if (!VOICE_PACKS[voiceGender]) {
      const available = Object.keys(VOICE_PACKS).join(", ");
      throw new McpError(
        ErrorCode.InvalidParams,
        `❌ Unknown voice pack: ${voiceGender}. Available: ${available}`
      );
    }

    // 🎪 Update the global voice pack setting
    enhancedStats.voicePack = voiceGender;

    return {
      success: true,
      message: `🎤 Voice pack set to ${VOICE_PACKS[voiceGender].displayName}!`,
      currentVoicePack: enhancedStats.voicePack,
      voicePackInfo: VOICE_PACKS[voiceGender]
    };
  }

  // 🎭 Get Voice Pack Info - Show current and available voice packs
  async getVoicePackInfo(args) {
    return {
      success: true,
      message: "🎤 Voice pack information retrieved!",
      currentVoicePack: enhancedStats.voicePack,
      currentVoiceInfo: VOICE_PACKS[enhancedStats.voicePack],
      availableVoicePacks: Object.keys(VOICE_PACKS).map(key => ({
        id: key,
        ...VOICE_PACKS[key]
      }))
    };
  }

  // 🎭 Test Voice Packs - Test all available voice packs
  async testVoicePacks(args) {
    const { achievement = "EXCELLENT" } = args;

    if (!ENHANCED_ACHIEVEMENTS[achievement]) {
      const available = Object.keys(ENHANCED_ACHIEVEMENTS).join(", ");
      throw new McpError(
        ErrorCode.InvalidParams,
        `❌ Unknown achievement: ${achievement}. Available: ${available}`
      );
    }

    const testResults = [];

    for (const [voiceId, voiceInfo] of Object.entries(VOICE_PACKS)) {
      try {
        // 🎪 Test each voice pack
        await EnhancedSoundOracle.playAchievementSound(achievement, 70, voiceId);

        testResults.push({
          voiceId: voiceId,
          voiceName: voiceInfo.displayName,
          status: "success",
          message: `✅ ${voiceInfo.displayName} played successfully`
        });

        // Wait a moment between voices
        await new Promise(resolve => setTimeout(resolve, 1500));

      } catch (error) {
        testResults.push({
          voiceId: voiceId,
          voiceName: voiceInfo.displayName,
          status: "error",
          message: `❌ ${voiceInfo.displayName} failed: ${error.message}`
        });
      }
    }

    return {
      success: true,
      message: `🧪 Tested all voice packs with ${achievement}!`,
      testAchievement: achievement,
      testResults: testResults,
      totalVoices: Object.keys(VOICE_PACKS).length,
      successfulTests: testResults.filter(r => r.status === "success").length
    };
  }

  // 🚀 Enhanced Server Start Ritual
  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);

    // Only output JSON-RPC protocol messages - no emoji logs
    console.error(`ENHANCED QUAKE CODING ARENA - ${Object.keys(ENHANCED_ACHIEVEMENTS).length} achievements loaded`);
  }
}

// 🌟 Enhanced Server Activation Ritual
if (require.main === module) {
  const server = new EnhancedQuakeMCPServer();
  server.run().catch(error => {
    console.error('Enhanced server failed to start:', error.message);
    process.exit(1);
  });
}