// Music Player Logic with Local Audio Support
const playlist = [
    {
        title: "Our Special Song",
        artist: "Track 1",
        album: "Love Story",
        cover: "1.jpg",
        src: "song1.ogg",
        duration: "Loading..."
    },
    {
        title: "Sweet Melody",
        artist: "Track 2",
        album: "Romance",
        cover: "2.jpg",
        src: "song2.ogg",
        duration: "Loading..."
    },
    {
        title: "Perfect Moment",
        artist: "Track 3",
        album: "Forever",
        cover: "3.jpg",
        src: "song3.ogg",
        duration: "Loading..."
    },
    {
        title: "Lovely Tune",
        artist: "Track 4",
        album: "Memories",
        cover: "4.jpg",
        src: "song4.ogg",
        duration: "Loading..."
    },
    {
        title: "Endless Love",
        artist: "Track 5",
        album: "Us",
        cover: "5.jpg",
        src: "song5.ogg",
        duration: "Loading..."
    }
];

let currentSongIndex = 0;
let audioPlayer = new Audio();
let isPlaying = false;
let progressInterval;

// Initialize Player
audioPlayer.src = playlist[currentSongIndex].src;

// Event Listeners for Audio Object
audioPlayer.addEventListener('ended', () => {
    changeSong(1); // Auto-play next
});

audioPlayer.addEventListener('timeupdate', () => {
    updateProgress();
});

audioPlayer.addEventListener('loadedmetadata', () => {
    const duration = audioPlayer.duration;
    // Only update if the UI element exists
    const durationEl = document.getElementById('current-duration');
    if (durationEl) {
        durationEl.innerText = formatTime(duration);
    }
    playlist[currentSongIndex].totalDuration = duration; // Cache it
});

audioPlayer.addEventListener('error', (e) => {
    console.error("Audio Error:", e);
    // Don't alert if it's just a placeholder missing
    if (playlist[currentSongIndex].src.includes('song1.ogg')) {
        // Only alert for the main file if it fails
        console.log("Could not play song1.ogg. Make sure the file exists.");
    }
});


function showMusicPlayer() {
    // Only create UI overlay if not exists
    if (document.querySelector('.music-player-overlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'music-player-overlay';

    const song = playlist[currentSongIndex];

    overlay.innerHTML = `
        <div class="music-player-card">
            <button class="close-music-btn" onclick="closeMusicPlayer()">×</button>
            
            <h2 class="music-header">Our Love Sounds Like This! 🎵</h2>
            
            <div class="player-main">
                <div class="album-art-container">
                    <img src="${song.cover}" alt="${song.album}" class="album-art" id="current-cover">
                </div>
                
                <div class="song-info">
                    <h3 id="current-title">${song.title}</h3>
                    <div class="progress-area">
                        <span class="time-current" id="curr-time">0:00</span>
                        <div class="progress-bar" onclick="seekSong(event)">
                            <div class="progress-fill"></div>
                        </div>
                        <span class="time-total" id="current-duration">0:00</span>
                    </div>
                    
                    <div class="controls">
                        <button class="control-btn prev-btn" onclick="changeSong(-1)"><i class="fas fa-backward"></i></button>
                        <button class="control-btn play-btn" onclick="togglePlay()">
                            <i class="fas fa-play"></i>
                        </button>
                        <button class="control-btn next-btn" onclick="changeSong(1)"><i class="fas fa-forward"></i></button>
                    </div>
                </div>
            </div>
            
            <div class="playlist-section">
                <h3>OUR PLAYLIST</h3>
                <ul class="playlist-list">
                    ${playlist.map((s, i) => `
                        <li class="playlist-item ${i === currentSongIndex ? 'active' : ''}" onclick="playSong(${i})">
                            <span class="song-index">0${i + 1}</span>
                            <span class="song-title-list">${s.title}</span>
                            <!-- <span class="song-duration">${s.duration}</span> -->
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    // Sync UI
    updatePlayerUI();

    // If we're already playing, update the icon
    const playBtn = document.querySelector('.play-btn');
    if (playBtn) {
        playBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    }
}

function closeMusicPlayer() {
    // Close the music player
    const overlay = document.querySelector('.music-player-overlay');
    if (overlay) overlay.remove();

    // Return to Gift Selection
    showGiftSelection();
}

function togglePlay() {
    const playBtn = document.querySelector('.play-btn');

    if (audioPlayer.paused) {
        audioPlayer.play().then(() => {
            isPlaying = true;
            if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }).catch(err => {
            console.error("Playback failed:", err);
            alert("Please interact with the document first or check file path.");
        });
    } else {
        audioPlayer.pause();
        isPlaying = false;
        if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function changeSong(direction) {
    currentSongIndex += direction;
    if (currentSongIndex < 0) currentSongIndex = playlist.length - 1;
    if (currentSongIndex >= playlist.length) currentSongIndex = 0;

    loadAndPlaySong(currentSongIndex);
}

function playSong(index) {
    if (currentSongIndex === index) {
        togglePlay();
        return;
    }
    currentSongIndex = index;
    loadAndPlaySong(currentSongIndex);
}

function loadAndPlaySong(index) {
    audioPlayer.src = playlist[index].src;
    audioPlayer.load();
    updatePlayerUI();

    const playBtn = document.querySelector('.play-btn');

    audioPlayer.play().then(() => {
        isPlaying = true;
        if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }).catch(err => {
        console.warn("Could not play song:", err);
        alert("Audio playback failed. Please check if your audio files (song1.ogg etc.) are in the correct folder.");
        isPlaying = false;
        if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
}

function updatePlayerUI() {
    const song = playlist[currentSongIndex];
    const cover = document.getElementById('current-cover');
    const title = document.getElementById('current-title');
    const durationEl = document.getElementById('current-duration');

    if (cover) cover.src = song.cover;
    if (title) title.innerText = song.title;

    // Duration might not be known yet if allowed to load
    if (durationEl && !isNaN(audioPlayer.duration)) {
        durationEl.innerText = formatTime(audioPlayer.duration);
    } else if (durationEl) {
        durationEl.innerText = "--:--";
    }

    // Update Playlist Highlight
    document.querySelectorAll('.playlist-item').forEach((item, i) => {
        if (i === currentSongIndex) item.classList.add('active');
        else item.classList.remove('active');
    });
}

function updateProgress() {
    const progressFill = document.querySelector('.progress-fill');
    const currTimeEl = document.getElementById('curr-time');

    const current = audioPlayer.currentTime;
    const total = audioPlayer.duration;

    if (total > 0 && progressFill) {
        const percent = (current / total) * 100;
        progressFill.style.width = percent + '%';
    }

    if (currTimeEl) {
        currTimeEl.innerText = formatTime(current);
    }
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function seekSong(event) {
    if (!audioPlayer.duration) return;

    const progressBar = event.currentTarget;
    const clickX = event.clientX - progressBar.getBoundingClientRect().left;
    const width = progressBar.offsetWidth;
    const percent = clickX / width;

    audioPlayer.currentTime = audioPlayer.duration * percent;
}
