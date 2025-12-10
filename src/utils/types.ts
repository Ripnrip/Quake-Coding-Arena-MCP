// 🌟 The cosmic configuration of our enhanced digital arena
export interface Achievement {
    file: string;
    category: "streak" | "quality" | "multi" | "game" | "team";
    threshold: number;
    description?: string;
}

export const ENHANCED_ACHIEVEMENTS: Record<string, Achievement> = {
    // 🎯 Classic Kill Streaks (Available in both male and female)
    'RAMPAGE': { file: 'rampage.mp3', category: 'streak', threshold: 10 },
    'DOMINATING': { file: 'dominating.mp3', category: 'streak', threshold: 15 },
    'UNSTOPPABLE': { file: 'unstoppable.mp3', category: 'streak', threshold: 20 },
    'GODLIKE': { file: 'godlike.mp3', category: 'streak', threshold: 25 },

    // ✨ Quality Achievements (Male only - will fallback)
    'EXCELLENT': { file: 'excellent.mp3', category: 'quality', threshold: 1 },
    'PERFECT': { file: 'perfect.mp3', category: 'quality', threshold: 1 },
    'IMPRESSIVE': { file: 'impressive.mp3', category: 'quality', threshold: 1 },

    // 🔥 Special Multi-kills (Available in both male and female)
    'WICKED SICK': { file: 'wicked-sick.mp3', category: 'multi', threshold: 7 },
    'HEADSHOT': { file: 'headshot.mp3', category: 'multi', threshold: 1 },
    'MULTI KILL': { file: 'multi-kill.mp3', category: 'multi', threshold: 2 },
    'ULTRA KILL': { file: 'ultra-kill.mp3', category: 'multi', threshold: 4 },
    'MONSTER KILL': { file: 'monster-kill.mp3', category: 'multi', threshold: 6 },
    'LUDICROUS KILL': { file: 'ludicrous-kill.mp3', category: 'multi', threshold: 8 },
    'KILLING SPREE': { file: 'killing-spree.mp3', category: 'multi', threshold: 3 },

    // 🎪 Game State Announcements (Available in both male and female)
    'HUMILIATION': { file: 'humiliation.mp3', category: 'game', threshold: 1 },
    'FIRST BLOOD': { file: 'first-blood.mp3', category: 'game', threshold: 1 },
    'HOLY SHIT': { file: 'holy-shit.mp3', category: 'game', threshold: 1 },
    'BOTTOM FEEDER': { file: 'bottom-feeder.mp3', category: 'game', threshold: 1 },

    // 👥 Team Achievements (Male only - will fallback)
    'PREPARE TO FIGHT': { file: 'prepare-to-fight.mp3', category: 'team', threshold: 1 },
    'PLAY': { file: 'play.mp3', category: 'team', threshold: 1 },

    // Additional male-only achievements
    'DOUBLE KILL': { file: 'double-kill.mp3', category: 'multi', threshold: 2 },
    'TRIPLE KILL': { file: 'triple-kill.mp3', category: 'multi', threshold: 3 }
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
        path: 'sounds/female',
        displayName: 'Female Announcer',
        description: 'Authentic female announcer voice pack with energetic tone'
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
