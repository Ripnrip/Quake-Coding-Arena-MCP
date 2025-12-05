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
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";
import * as url from "url";
import { spawn } from "child_process";
import { ListResourcesRequestSchema, ReadResourceRequestSchema, ListPromptsRequestSchema, GetPromptRequestSchema } from "@modelcontextprotocol/sdk/types.js";

// 🎯 Configuration Schema for Smithery
export const configSchema = z.object({
  volume: z.number().min(0).max(100).default(80).describe("🔊 Volume level (0-100)"),
  voiceGender: z.enum(["male", "female"]).default("male").describe("🎤 Voice pack selection"),
  defaultVoiceStyle: z.string().default("sexy-announcer").describe("🎭 Female voice style"),
}).optional();

// 🌟 The cosmic configuration of our enhanced digital arena
interface Achievement {
  file: string;
  category: "streak" | "quality" | "multi" | "game" | "team";
  threshold: number;
  description?: string;
}

const ENHANCED_ACHIEVEMENTS: Record<string, Achievement> = {
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

// 🎤 Available voice pack configurations
interface VoicePack {
  path: string;
  displayName: string;
  description: string;
}

const VOICE_PACKS: Record<string, VoicePack> = {
  male: {
    path: 'sounds/male',
    displayName: 'Male Announcer',
    description: 'Classic Quake 3 Arena male announcer voice'
  },
  female: {
    path: 'sounds/female/sexy-announcer',
    displayName: 'Sexy Female Announcer',
    description: 'Authentic female announcer voice pack with energetic tone (WAV format)'
  }
};

// 📊 Session statistics interface
interface SessionStats {
  totalAchievements: number;
  categoryStats: Record<string, number>;
  lastPlayed: string | null;
  volume: number;
  sessionStart: string;
  favoriteCategory: string | null;
  currentStreak: number;
  longestStreak: number;
  voicePack: string;
  femaleVoiceStyle: string;
}

// 🎪 The cosmic state of our enhanced digital arena
let enhancedStats: SessionStats = {
  totalAchievements: 0,
  categoryStats: {},
  lastPlayed: null,
  volume: 80,
  sessionStart: new Date().toISOString(),
  favoriteCategory: null,
  currentStreak: 0,
  longestStreak: 0,
  voicePack: 'male',
  femaleVoiceStyle: 'sexy-announcer'
};

// 🎨 Initialize category stats
Object.values(ENHANCED_ACHIEVEMENTS).forEach(achievement => {
  if (!enhancedStats.categoryStats[achievement.category]) {
    enhancedStats.categoryStats[achievement.category] = 0;
  }
});

// 🌟 Path Resolution Helper
function getProjectRoot(): string {
  // Try to find 'sounds' directory starting from CWD
  if (fs.existsSync(path.join(process.cwd(), 'sounds'))) {
    return process.cwd();
  }

  // Try __dirname (if CJS) or import.meta.url (if ESM/TS source)
  // Since we compile to CJS in .smithery, we can check relative to that
  try {
    // If we are in .smithery/index.cjs, the root is one level up
    const currentDir = typeof __dirname !== 'undefined' ? __dirname : path.dirname(url.fileURLToPath(import.meta.url));
    if (fs.existsSync(path.join(currentDir, '..', 'sounds'))) {
      return path.resolve(currentDir, '..');
    }
  } catch (e) {
    // Ignore error
  }

  // Fallback to CWD
  return process.cwd();
}


// 🌟 The Enhanced Cross-Platform Sound Alchemist
class EnhancedSoundOracle {
  static async playAchievementSound(
    achievementName: string,
    volume: number = 80,
    voiceGender: string | null = null
  ): Promise<boolean> {
    const achievement = ENHANCED_ACHIEVEMENTS[achievementName.toUpperCase()];

    if (!achievement) {
      throw new Error(`❌ Unknown achievement: ${achievementName}`);
    }

    // 🎤 Use selected voice pack or default to current voice pack
    const selectedVoice = voiceGender || enhancedStats.voicePack;
    const voiceConfig = VOICE_PACKS[selectedVoice] || VOICE_PACKS.male;

    const projectRoot = getProjectRoot();

    // 🎵 Try WAV first (for female sounds), then MP3
    const baseName = achievement.file.replace('.mp3', '');
    const soundPathWav = path.join(projectRoot, voiceConfig.path, `${baseName}.wav`);
    const soundPathMp3 = path.join(projectRoot, voiceConfig.path, achievement.file);

    let soundPath: string;
    if (fs.existsSync(soundPathWav)) {
      soundPath = soundPathWav;
    } else if (fs.existsSync(soundPathMp3)) {
      soundPath = soundPathMp3;
    } else {
      // Fallback to male voice
      const maleVoiceConfig = VOICE_PACKS.male;
      const malePathWav = path.join(projectRoot, maleVoiceConfig.path, `${baseName}.wav`);
      const malePathMp3 = path.join(projectRoot, maleVoiceConfig.path, achievement.file);

      if (fs.existsSync(malePathWav)) {
        soundPath = malePathWav;
      } else if (fs.existsSync(malePathMp3)) {
        soundPath = malePathMp3;
      } else {
        throw new Error(`❌ Sound file not found: ${baseName} (${achievement.file}) checked in ${projectRoot}`);
      }
    }

    try {
      // 🎨 Cross-platform audio magic with enhanced volume control
      const platform = process.platform;
      let command: string;

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

      // 🎭 Execute the enhanced sound ritual
      return new Promise((resolve, reject) => {
        const child = spawn(command, [], { shell: true, detached: true });

        child.unref(); // Let it run in the background
        child.on('error', reject);
        child.on('spawn', () => {
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
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`🌩️ Enhanced sound challenge: ${errorMessage}`);
      throw error;
    }
  }

  static async checkAchievementExists(achievementName: string): Promise<boolean> {
    return ENHANCED_ACHIEVEMENTS.hasOwnProperty(achievementName.toUpperCase());
  }

  static getAchievementInfo(achievementName: string): Achievement | undefined {
    return ENHANCED_ACHIEVEMENTS[achievementName.toUpperCase()];
  }

  static getRandomAchievement(category: string | null = null): string | null {
    const achievements = category
      ? Object.entries(ENHANCED_ACHIEVEMENTS).filter(([_, info]) => info.category === category)
      : Object.entries(ENHANCED_ACHIEVEMENTS);

    const random = achievements[Math.floor(Math.random() * achievements.length)];
    return random ? random[0] : null;
  }
}

// 🎭 Create Server Function - Required by Smithery
export default function createServer({ config }: { config?: z.infer<typeof configSchema> }) {
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

  // 🎯 Play Enhanced Quake Sound Tool
  server.registerTool(
    "play_enhanced_quake_sound",
    {
      description: "🏆 Plays a high-quality enhanced Quake achievement sound with voice pack support",
      inputSchema: {
        achievement: z.enum(Object.keys(ENHANCED_ACHIEVEMENTS) as [string, ...string[]]).describe("🏆 Enhanced achievement name"),
        volume: z.number().min(0).max(100).default(80).describe("🔊 Enhanced volume level (0-100)"),
        voiceGender: z.enum(["male", "female"]).optional().describe("🎤 Voice gender selection"),
      }
    },
    async ({ achievement, volume, voiceGender }) => {
      try {
        await EnhancedSoundOracle.playAchievementSound(achievement, volume, voiceGender);

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

  // 📊 Get Enhanced Achievement Stats
  server.registerTool(
    "get_enhanced_achievement_stats",
    {
      description: "📊 Retrieve current session statistics and achievement progress",
      inputSchema: {}
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

      // Play the sound directly instead of calling another tool
      try {
        await EnhancedSoundOracle.playAchievementSound(randomAchievement, volume || 80, null);
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

  // 📚 Resources Implementation
  server.server.setRequestHandler(ListResourcesRequestSchema, async () => {
    const projectRoot = getProjectRoot();
    const resources = [];

    // Male sounds
    const malePath = path.join(projectRoot, VOICE_PACKS.male.path);
    if (fs.existsSync(malePath)) {
      const files = fs.readdirSync(malePath).filter(f => f.endsWith('.mp3') || f.endsWith('.wav'));
      files.forEach(file => {
        resources.push({
          uri: `quake://${VOICE_PACKS.male.path}/${file}`,
          name: `Male Voice: ${file.replace(/\.(mp3|wav)/, '')}`,
          mimeType: file.endsWith('.mp3') ? 'audio/mpeg' : 'audio/wav',
          description: `Male announcer sound for ${file}`
        });
      });
    }

    // Female sounds
    const femalePath = path.join(projectRoot, VOICE_PACKS.female.path);
    if (fs.existsSync(femalePath)) {
      const files = fs.readdirSync(femalePath).filter(f => f.endsWith('.mp3') || f.endsWith('.wav'));
      files.forEach(file => {
        resources.push({
          uri: `quake://${VOICE_PACKS.female.path}/${file}`,
          name: `Female Voice: ${file.replace(/\.(mp3|wav)/, '')}`,
          mimeType: file.endsWith('.mp3') ? 'audio/mpeg' : 'audio/wav',
          description: `Female announcer sound for ${file}`
        });
      });
    }

    return {
      resources
    };
  });

  server.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const uri = request.params.uri;
    const projectRoot = getProjectRoot();

    // Parse URI quake://path/to/file
    if (!uri.startsWith('quake://')) {
      throw new Error('Invalid resource URI');
    }

    const relativePath = uri.replace('quake://', '');
    const fullPath = path.join(projectRoot, relativePath);

    if (!fs.existsSync(fullPath)) {
      throw new Error(`Resource not found: ${uri}`);
    }

    const content = fs.readFileSync(fullPath);
    const mimeType = fullPath.endsWith('.mp3') ? 'audio/mpeg' : 'audio/wav';

    return {
      contents: [{
        uri,
        mimeType,
        blob: content.toString('base64')
      }]
    };
  });

  // 💡 Prompts Implementation
  server.server.setRequestHandler(ListPromptsRequestSchema, async () => {
    return {
      prompts: [
        {
          name: "encourage-developer",
          description: "Encourage the developer with a Quake sound based on recent success",
          arguments: [
            {
              name: "success_level",
              description: "Level of success (low, medium, high)",
              required: true
            }
          ]
        },
        {
          name: "celebrate-victory",
          description: "Celebrate a major coding victory",
          arguments: [
            {
              name: "achievement",
              description: "Specific achievement to reference (e.g. GODLIKE)",
              required: false
            }
          ]
        }
      ]
    };
  });

  server.server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    const promptName = request.params.name;
    const args = request.params.arguments || {};

    if (promptName === "encourage-developer") {
      const level = args.success_level;
      let sound = "IMPRESSIVE";
      if (level === "high") sound = "GODLIKE";
      if (level === "low") sound = "EXCELLENT";

      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `The developer just achieved a ${level} success. Please acknowledge this and then immediately call the play_enhanced_quake_sound tool with the '${sound}' achievement.`
            }
          }
        ]
      };
    }

    if (promptName === "celebrate-victory") {
      const achievement = args.achievement || "PERFECT";
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `We have a victory! Please celebrate by calling the play_enhanced_quake_sound tool with the '${achievement}' achievement and add an encouraging comment.`
            }
          }
        ]
      };
    }

    throw new Error("Prompt not found");
  });

  return server.server; // Must return the underlying Server
}