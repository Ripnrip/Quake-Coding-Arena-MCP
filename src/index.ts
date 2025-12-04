#!/usr/bin/env node

/**
 * 🎭 The Enhanced Quake Oracle - TypeScript MCP Server Edition v2.1
 *
 * "Where coding victories become legendary achievements, and every
 * keystroke echoes through the digital arena with authentic male/female Quake voices!"
 *
 * Features: 11 achievements, voice switching (male/female), WAV/MP3 support
 *
 * - The Enhanced Quake Arena Master of TypeScript
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as fs from "fs";
import * as path from "path";
import { spawn } from "child_process";

// Get current directory - handle both CommonJS and ESM
const __dirname = path.dirname(new URL(import.meta.url).pathname);

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

    // 🎵 Try WAV first (for female sounds), then MP3
    const baseName = achievement.file.replace('.mp3', '');
    const soundPathWav = path.join(__dirname, '..', voiceConfig.path, `${baseName}.wav`);
    const soundPathMp3 = path.join(__dirname, '..', voiceConfig.path, achievement.file);

    let soundPath: string;
    if (fs.existsSync(soundPathWav)) {
      soundPath = soundPathWav;
    } else if (fs.existsSync(soundPathMp3)) {
      soundPath = soundPathMp3;
    } else {
      // Fallback to male voice
      const maleVoiceConfig = VOICE_PACKS.male;
      const malePathWav = path.join(__dirname, '..', maleVoiceConfig.path, `${baseName}.wav`);
      const malePathMp3 = path.join(__dirname, '..', maleVoiceConfig.path, achievement.file);

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
    version: "2.1.1",
  });

  // 🎯 Play Enhanced Quake Sound Tool
  server.tool(
    "play_enhanced_quake_sound",
    {
      achievement: {
        type: "string",
        description: "🏆 Enhanced achievement name",
        enum: Object.keys(ENHANCED_ACHIEVEMENTS),
      },
      volume: {
        type: "number",
        description: "🔊 Enhanced volume level (0-100)",
        minimum: 0,
        maximum: 100,
        default: enhancedStats.volume,
      },
      voiceGender: {
        type: "string",
        description: "🎤 Voice gender selection",
        enum: ["male", "female"],
        default: null,
      },
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
  server.tool(
    "get_enhanced_achievement_stats",
    {},
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
  server.tool(
    "random_enhanced_achievement",
    {
      category: {
        type: "string",
        description: "🎯 Filter by category",
        enum: ["streak", "quality", "multi", "game", "team"],
        default: null,
      },
      volume: {
        type: "number",
        description: "🔊 Enhanced volume level (0-100)",
        minimum: 0,
        maximum: 100,
        default: enhancedStats.volume,
      },
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

      return await server.tools.call("play_enhanced_quake_sound", {
        achievement: randomAchievement,
        volume,
        voiceGender: null
      });
    }
  );

  // 📋 List Enhanced Achievements
  server.tool(
    "list_enhanced_achievements",
    {
      category: {
        type: "string",
        description: "🎯 Filter by category",
        enum: ["streak", "quality", "multi", "game", "team"],
        default: null,
      },
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
  server.tool(
    "set_enhanced_volume",
    {
      volume: {
        type: "number",
        description: "🔊 Enhanced volume level (0-100)",
        minimum: 0,
        maximum: 100,
      },
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
  server.tool(
    "set_voice_pack",
    {
      voiceGender: {
        type: "string",
        description: "🎤 Voice gender selection",
        enum: ["male", "female"],
      },
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
  server.tool(
    "get_voice_pack_info",
    {},
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

  return server;
}