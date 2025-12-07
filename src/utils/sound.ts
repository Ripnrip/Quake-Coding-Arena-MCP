import * as fs from "fs";
import * as path from "path";
import { spawn } from "child_process";
import { ENHANCED_ACHIEVEMENTS, VOICE_PACKS, Achievement } from "./types.js";
import { getProjectRoot } from "./path.js";

// 🌟 The Enhanced Cross-Platform Sound Alchemist
export class EnhancedSoundOracle {
    static async playAchievementSound(
        achievementName: string,
        volume: number = 80,
        voiceGender: string | null = null,
        currentVoicePack: string = 'male'
    ): Promise<boolean> {
        const achievement = ENHANCED_ACHIEVEMENTS[achievementName.toUpperCase()];

        if (!achievement) {
            throw new Error(`❌ Unknown achievement: ${achievementName}`);
        }

        // Skip actual playback in Smithery/production environment
        if (process.env.SMITHERY_ENV || process.env.NODE_ENV === 'production') {
            return true;
        }

        // 🎤 Use selected voice pack or default to current voice pack
        const selectedVoice = voiceGender || currentVoicePack;
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
                // In production/Smithery, fail silently
                if (process.env.SMITHERY_ENV) {
                    return true;
                }
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
