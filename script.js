const SOUND_BASE_URL = 'https://raw.githubusercontent.com/Ripnrip/Quake-Coding-Arena-MCP/main/sounds/male/';

const ACHIEVEMENTS = [
    { name: 'RAMPAGE', file: 'rampage.mp3', category: 'streak', icon: '🔥', femaleUrl: 'https://hoovers.101soundboards.com/sb/board_sounds_rendered/jpayxn.mp3?signature=BgrtU1JYrSmeM7GkpcMWzw&expires=1764979199' },
    { name: 'DOMINATING', file: 'dominating.mp3', category: 'streak', icon: '💀', femaleUrl: 'https://www.101soundboards.com/storage/board_sounds_rendered/480735-quake-female-dominating.mp3?signature=bHmoWXckwdiXkIKtLVS4xA&expires=1764979199' },
    { name: 'UNSTOPPABLE', file: 'unstoppable.mp3', category: 'streak', icon: '🛑', femaleUrl: 'https://www.101soundboards.com/storage/board_sounds_rendered/480744-quake-female-unstoppable.mp3?signature=XNbG3X7eGWigPJ4heQZWeQ&expires=1764979199' },
    { name: 'GODLIKE', file: 'godlike.mp3', category: 'streak', icon: '⚡', femaleUrl: 'https://www.101soundboards.com/storage/board_sounds_rendered/480737-quake-female-godlike.mp3?signature=SyAlzb4XG5TA0mk8HdDsJw&expires=1764979199' },
    { name: 'EXCELLENT', file: 'excellent.mp3', category: 'quality', icon: '✨' },
    { name: 'PERFECT', file: 'perfect.mp3', category: 'quality', icon: '💎' },
    { name: 'IMPRESSIVE', file: 'impressive.mp3', category: 'quality', icon: '🌟' },
    { name: 'WICKED SICK', file: 'wickedsick.mp3', category: 'multi', icon: '☣️', url: 'https://www.myinstants.com/media/sounds/wickedsick.mp3', femaleUrl: 'https://www.101soundboards.com/storage/board_sounds_rendered/480745-quake-female-wickedsick.mp3?signature=HBiOVyKzGHJu8zlfxHjAzg&expires=1764979199' },
    { name: 'MULTIKILL', file: 'wicked-sick.mp3', category: 'multi', icon: '💥', femaleUrl: 'https://hoovers.101soundboards.com/sb/board_sounds_rendered/lpxrel.mp3?signature=EWaLi-LDj0lhNA4RBfilHA&expires=1764979199', onlyFemale: true },
    { name: 'HUMILIATION', file: 'humiliation_1.mp3', category: 'game', icon: '🎭', url: 'https://www.myinstants.com/media/sounds/humiliation_1.mp3' },
    { name: 'HOLY SHIT', file: 'humiliation_1.mp3', category: 'game', icon: '😱', femaleUrl: 'https://www.101soundboards.com/storage/board_sounds_rendered/480739-quake-female-holyshit.mp3?signature=RYR_coYIJ3euvgtzxxEJ7g&expires=1764979199', onlyFemale: true },
    { name: 'FIRST BLOOD', file: 'first-blood.mp3', category: 'game', icon: '🩸', femaleUrl: 'https://www.101soundboards.com/storage/board_sounds_rendered/480736-quake-female-firstblood.mp3?signature=q7PPEc-LdmE72E0o3xjTZg&expires=1764979199' },
    { name: 'HEADSHOT', file: 'first-blood.mp3', category: 'game', icon: '🎯', femaleUrl: 'https://www.101soundboards.com/storage/board_sounds_rendered/480738-quake-female-headshot.mp3?signature=5Qe3O4yLv6a9UQRV-VucBA&expires=1764979199', onlyFemale: true },
    { name: 'PREPARE TO FIGHT', file: 'prepare-to-fight.mp3', category: 'team', icon: '⚔️' }
];

const grid = document.getElementById('soundGrid');
const volumeSlider = document.getElementById('volume');
const voiceToggle = document.getElementById('voiceToggle');
const packSubtitle = document.getElementById('packSubtitle');
const toggleLabels = document.querySelectorAll('.toggle-label');

let audioContext = null;

// Helper to init audio context on first user interaction
function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
}

function renderGrid() {
    grid.innerHTML = '';
    const isFemale = voiceToggle.checked;

    ACHIEVEMENTS.forEach(ach => {
        // Show female-only buttons ONLY in female mode
        if (ach.onlyFemale && !isFemale) return;

        const btn = document.createElement('div');
        btn.className = `sound-btn category-${ach.category}`;
        btn.innerHTML = `
            <div class="sound-icon">${ach.icon}</div>
            <div class="sound-name">${ach.name}</div>
            <div class="sound-category">${ach.category}</div>
        `;

        // Preload audio logic

        const handlePlay = (e) => {
            if (e.type === 'touchstart') e.preventDefault();
            initAudio();

            // Determine URL
            let currentUrl;
            let playbackRate = 1.0;

            if (isFemale) {
                if (ach.femaleUrl) {
                    currentUrl = ach.femaleUrl;
                } else {
                    currentUrl = ach.url || `${SOUND_BASE_URL}${ach.file}`;
                    playbackRate = 1.25;
                }
            } else {
                currentUrl = ach.url || `${SOUND_BASE_URL}${ach.file}`;
            }

            const audio = new Audio(currentUrl);
            audio.playbackRate = playbackRate;

            if (playbackRate !== 1.0) {
                if (audio.preservesPitch !== undefined) audio.preservesPitch = false;
                else if (audio.mozPreservesPitch !== undefined) audio.mozPreservesPitch = false;
                else if (audio.webkitPreservesPitch !== undefined) audio.webkitPreservesPitch = false;
            }

            playSound(audio, btn);
        };

        btn.addEventListener('mousedown', handlePlay);
        btn.addEventListener('touchstart', handlePlay);

        grid.appendChild(btn);
    });
}

function playSound(audioObj, btnElement) {
    audioObj.volume = volumeSlider.value;
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

    // Re-render grid to show/hide gender specific sounds if any
    renderGrid();
}

voiceToggle.addEventListener('change', updateUI);

// Init UI
updateUI();
