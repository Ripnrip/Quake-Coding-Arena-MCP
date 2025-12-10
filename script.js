// 🎭 Enhanced Quake Coding Arena Soundboard
// 25 Epic Achievements with Dual Voice System

const SOUND_BASE_URL_MALE = 'https://raw.githubusercontent.com/Ripnrip/Quake-Coding-Arena-MCP/main/sounds/male/';
const SOUND_BASE_URL_FEMALE = 'https://raw.githubusercontent.com/Ripnrip/Quake-Coding-Arena-MCP/main/sounds/female/';

// 🏆 All 25 Enhanced Achievements
const ACHIEVEMENTS = [
    // 🔥 Streak Achievements (Both Voices)
    { name: 'RAMPAGE', file: 'rampage.mp3', category: 'streak', icon: '🔥', threshold: 10 },
    { name: 'DOMINATING', file: 'dominating.mp3', category: 'streak', icon: '💀', threshold: 15 },
    { name: 'UNSTOPPABLE', file: 'unstoppable.mp3', category: 'streak', icon: '🛑', threshold: 20 },
    { name: 'GODLIKE', file: 'godlike.mp3', category: 'streak', icon: '⚡', threshold: 25 },
    
    // ✨ Quality Achievements (Male Voice)
    { name: 'EXCELLENT', file: 'excellent.mp3', category: 'quality', icon: '✨', maleOnly: true },
    { name: 'PERFECT', file: 'perfect.mp3', category: 'quality', icon: '💎', maleOnly: true },
    { name: 'IMPRESSIVE', file: 'impressive.mp3', category: 'quality', icon: '🌟', maleOnly: true },
    
    // ⚔️ Multi-Kill Achievements
    { name: 'WICKED SICK', file: 'wicked-sick.mp3', category: 'multi', icon: '☣️', threshold: 7 },
    { name: 'HEADSHOT', file: 'headshot.mp3', category: 'multi', icon: '🎯', femaleOnly: true },
    { name: 'MULTI KILL', file: 'multi-kill.mp3', category: 'multi', icon: '💥', femaleOnly: true },
    { name: 'KILLING SPREE', file: 'killing-spree.mp3', category: 'multi', icon: '🔪', femaleOnly: true },
    { name: 'ULTRA KILL', file: 'ultra-kill.mp3', category: 'multi', icon: '⚡', femaleOnly: true },
    { name: 'MONSTER KILL', file: 'monster-kill.mp3', category: 'multi', icon: '👹', femaleOnly: true },
    { name: 'LUDICROUS KILL', file: 'ludicrous-kill.mp3', category: 'multi', icon: '🤯', femaleOnly: true },
    { name: 'DOUBLE KILL', file: 'double-kill.mp3', category: 'multi', icon: '⚔️', maleOnly: true },
    { name: 'TRIPLE KILL', file: 'triple-kill.mp3', category: 'multi', icon: '🗡️', maleOnly: true },
    
    // 🎪 Game State Announcements
    { name: 'FIRST BLOOD', file: 'first-blood.mp3', category: 'game', icon: '🩸' },
    { name: 'HUMILIATION', file: 'humiliation.mp3', category: 'game', icon: '🎭', maleOnly: true },
    { name: 'HOLY SHIT', file: 'holy-shit.mp3', category: 'game', icon: '😱' },
    { name: 'BOTTOM FEEDER', file: 'bottom-feeder.mp3', category: 'game', icon: '🐟', femaleOnly: true },
    
    // 👥 Team Events
    { name: 'PREPARE TO FIGHT', file: 'prepare-to-fight.mp3', category: 'team', icon: '⚔️', maleOnly: true },
    { name: 'PLAY', file: 'play.mp3', category: 'team', icon: '▶️', femaleOnly: true }
];

const grid = document.getElementById('soundGrid');
const volumeSlider = document.getElementById('volume');
const voiceToggle = document.getElementById('voiceToggle');
const packSubtitle = document.getElementById('packSubtitle');
const toggleLabels = document.querySelectorAll('.toggle-label');
const categoryFilters = document.querySelectorAll('.filter-btn');
const totalAchievements = document.getElementById('totalAchievements');
const currentVoice = document.getElementById('currentVoice');
const volumeDisplay = document.getElementById('volumeDisplay');
const volumeValue = document.getElementById('volumeValue');

let audioContext = null;
let currentCategory = 'all';

// Helper to init audio context on first user interaction
function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
}

function getSoundUrl(achievement, isFemale) {
    const baseUrl = isFemale ? SOUND_BASE_URL_FEMALE : SOUND_BASE_URL_MALE;
    
    // Handle special cases
    if (isFemale && achievement.femaleOnly) {
        return `${SOUND_BASE_URL_FEMALE}${achievement.file}`;
    }
    if (!isFemale && achievement.maleOnly) {
        return `${SOUND_BASE_URL_MALE}${achievement.file}`;
    }
    
    // Try female first if female mode, fallback to male
    if (isFemale) {
        // For achievements available in both, prefer female
        return `${SOUND_BASE_URL_FEMALE}${achievement.file}`;
    }
    
    return `${baseUrl}${achievement.file}`;
}

function renderGrid() {
    grid.innerHTML = '';
    const isFemale = voiceToggle.checked;
    
    // Filter achievements based on voice and category
    const filtered = ACHIEVEMENTS.filter(ach => {
        // Voice filtering
        if (isFemale && ach.maleOnly) return false;
        if (!isFemale && ach.femaleOnly) return false;
        
        // Category filtering
        if (currentCategory !== 'all' && ach.category !== currentCategory) return false;
        
        return true;
    });
    
    totalAchievements.textContent = `${filtered.length} Achievements`;
    currentVoice.textContent = isFemale ? 'Female Voice' : 'Male Voice';
    
    filtered.forEach(ach => {
        const btn = document.createElement('div');
        btn.className = `sound-btn category-${ach.category}`;
        
        // Add voice-specific class
        if (ach.maleOnly) btn.classList.add('male-only');
        if (ach.femaleOnly) btn.classList.add('female-only');
        
        btn.innerHTML = `
            <div class="sound-icon">${ach.icon}</div>
            <div class="sound-name">${ach.name}</div>
            <div class="sound-category">${ach.category.toUpperCase()}</div>
            ${ach.threshold ? `<div class="sound-threshold">Threshold: ${ach.threshold}</div>` : ''}
        `;

        const handlePlay = (e) => {
            if (e.type === 'touchstart') e.preventDefault();
            initAudio();

            const soundUrl = getSoundUrl(ach, isFemale);
            const audio = new Audio(soundUrl);
            audio.volume = volumeSlider.value / 100;

            playSound(audio, btn);
        };

        btn.addEventListener('mousedown', handlePlay);
        btn.addEventListener('touchstart', handlePlay);

        grid.appendChild(btn);
    });
    
    if (filtered.length === 0) {
        grid.innerHTML = '<div class="no-results">No achievements found for this filter combination</div>';
    }
}

function playSound(audioObj, btnElement) {
    btnElement.classList.add('playing');

    const playPromise = audioObj.play();
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                audioObj.onended = () => {
                    btnElement.classList.remove('playing');
                };
            })
            .catch(error => {
                console.error("Playback failed:", error);
                btnElement.classList.remove('playing');
                // Try fallback to male voice if female fails
                if (voiceToggle.checked) {
                    const achievement = ACHIEVEMENTS.find(a => a.name === btnElement.querySelector('.sound-name').textContent);
                    if (achievement && !achievement.femaleOnly) {
                        const fallbackAudio = new Audio(`${SOUND_BASE_URL_MALE}${achievement.file}`);
                        fallbackAudio.volume = volumeSlider.value / 100;
                        playSound(fallbackAudio, btnElement);
                    }
                }
            });
    }
}

function updateUI() {
    const isFemale = voiceToggle.checked;

    // Update Subtitle
    packSubtitle.textContent = isFemale ? "FEMALE ANNOUNCER PACK" : "MALE ANNOUNCER PACK";
    packSubtitle.style.color = isFemale ? "#ff4081" : "#666";

    // Update Toggle Labels
    toggleLabels[0].classList.toggle('active', !isFemale); // Male label
    toggleLabels[1].classList.toggle('active', isFemale);  // Female label

    // Theme accent color update
    document.documentElement.style.setProperty('--quake-red', isFemale ? '#ff4081' : '#d32f2f');

    // Re-render grid
    renderGrid();
}

function updateVolume() {
    const volume = volumeSlider.value;
    volumeDisplay.textContent = `Volume: ${volume}%`;
    volumeValue.textContent = `${volume}%`;
}

// Event Listeners
voiceToggle.addEventListener('change', updateUI);
volumeSlider.addEventListener('input', updateVolume);

categoryFilters.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        renderGrid();
    });
});

// Init UI
updateUI();
updateVolume();
