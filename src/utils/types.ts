// 🌟 The cosmic configuration of our enhanced digital arena
export interface Achievement {
    file: string;
    category: "streak" | "quality" | "multi" | "game" | "team";
    threshold: number;
    description?: string;
}

export const ENHANCED_ACHIEVEMENTS: Record<string, Achievement> = {
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
export interface VoicePack {
    path: string;
    displayName: string;
    description: string;
}

export const VOICE_PACKS: Record<string, VoicePack> = {
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
export interface SessionStats {
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
export let enhancedStats: SessionStats = {
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
