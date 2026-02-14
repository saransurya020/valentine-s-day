const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const question = document.getElementById('question');
const subtext = document.getElementById('subtext');
const mascot = document.getElementById('mascot');
const buttonsContainer = document.querySelector('.buttons');

let noClickCount = 0;
const noTexts = [
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
    "Plsss? :(("
];

// Sad bear images for sequence
const images = [
    "https://media.tenor.com/sFK9vl7E8M8AAAAi/cute-teddy-bear-teddy-bear.gif", // Default Brown Bear (Mocha)
    "https://media.tenor.com/K2s46_3gu78AAAAi/milk-and-mocha-bear.gif", // Sad 1
    "https://media.tenor.com/J3cJ2FV3bIIAAAAi/milk-mocha.gif", // Sad 2
    "https://media.tenor.com/c8gAC0G0t5MAAAAi/mocha-bear-sad.gif", // Sad 3
    "https://media.tenor.com/1-1VA7b4lK8AAAAi/milk-and-mocha-bear.gif", // Sad 4
    "https://media.tenor.com/q3XlX6Pq_dYAAAAi/sad-bear-cry.gif" // Sad 5 (Desperate)
];

// Logic for NO button click
noBtn.addEventListener('click', () => {
    noClickCount++;

    // 1. Change text on NO button
    if (noClickCount < noTexts.length) {
        noBtn.innerText = noTexts[noClickCount - 1];
    } else {
        noBtn.innerText = "No :(";
    }

    // 2. Increase size of YES button
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    const newSize = currentSize * 1.6; // Explodes in size faster
    yesBtn.style.fontSize = `${newSize}px`;
    yesBtn.style.width = 'auto'; // Allow width to grow with font
    yesBtn.style.height = 'auto'; // Allow height to grow with font
    yesBtn.style.padding = '20px 40px'; // Keep padding nice

    // 3. Change image to sad bear sequence
    const imageIndex = Math.min(noClickCount, images.length - 1);
    mascot.src = images[imageIndex];
});

// Logic for YES button
yesBtn.addEventListener('click', () => {
    // 1. Change the image to a happy/kissing bear
    mascot.src = "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"; // Better kissing gif

    // 2. Change the text
    question.innerHTML = "Yay! I love you! ❤️";
    subtext.innerHTML = "Best decision ever!";

    // 3. Remove the buttons
    buttonsContainer.style.display = 'none';

    // 4. Add confetti effect
    shootConfetti();

    // 5. Show Custom Envelope Menu
    showEnvelopeMenu();
});

function showEnvelopeMenu() {
    const overlay = document.createElement('div');
    overlay.className = 'envelope-overlay';

    overlay.innerHTML = `
        <div class="envelope-modal">
            <h2 class="envelope-title">Choose an envelope</h2>
            <p class="envelope-subtitle">Explore the little things I love about us.</p>
            
            <div class="envelope-grid">
                <div class="envelope-card" onclick="showMemoriesPopup()">
                    <i class="fas fa-images"></i>
                    <span>Our Memories</span>
                </div>
                
                <div class="envelope-card" onclick="showLetterPopup()">
                    <i class="fas fa-envelope-open-text"></i>
                    <span>My Letter</span>
                </div>
                
                <div class="envelope-card" onclick="showWhyILoveYouPopup()">
                    <i class="fas fa-heart"></i>
                    <span>Why I Love You</span>
                </div>
                
                <div class="envelope-card" onclick="showGiftSelection()">
                    <i class="fas fa-gift"></i>
                    <span>Surprise</span>
                </div>

                <div class="envelope-card" onclick="showFinalSurprise()" style="grid-column: span 2; background: #fff5f8;">
                    <i class="fas fa-star"></i>
                    <span>Final Surprise</span>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
}

// Final Surprise Logic - Interactive Envelope
function showFinalSurprise() {
    const overlay = document.createElement('div');
    overlay.className = 'final-overlay';

    overlay.innerHTML = `
        <div class="envelope-wrapper" id="final-envelope">
            <div class="envelope">
                <div class="envelope-flap"></div>
                <div class="envelope-pocket"></div>
                
                <div class="final-letter">
                    <div class="final-hearts">❤️❤️❤️</div>
                    <h2>To: My Valentine</h2>
                    <p>
                        You are the most beautiful chapter of my life. <br>
                        Every beat of my heart belongs to you.<br>
                        I love you endlessly!
                    </p>
                    <p style="font-size: 1.5rem; margin-top: 5px;">😘</p>
                </div>
            </div>
        </div>

        <div class="final-controls">
            <button class="fc-btn btn-open" onclick="openEnvelope()">OPEN</button>
            <button class="fc-btn btn-close" onclick="closeEnvelope()">CLOSE</button>
        </div>
    `;

    document.body.appendChild(overlay);
}

function openEnvelope() {
    const env = document.getElementById('final-envelope');
    if (env) {
        env.classList.add('open');
        shootConfetti();
    }
}

function closeEnvelope() {
    const overlay = document.querySelector('.final-overlay');
    if (overlay) overlay.remove();
}
// Gift Selection Modal
function showGiftSelection() {
    const overlay = document.createElement('div');
    overlay.className = 'gift-overlay';

    overlay.innerHTML = `
        <div class="gift-modal">
            <h2 class="gift-header">💖 Your Valentine Gifts 💖</h2>
            
            <div class="gift-container">
                <div class="gift-card" onclick="selectGift(0)">
                    <h3 class="gift-title">Gift 1</h3>
                    <div class="gift-box">
                        <span class="gift-emoji">🎁</span>
                    </div>
                    <p class="click-hint">Song 1</p>
                </div>

                <div class="gift-card" onclick="selectGift(1)">
                    <h3 class="gift-title">Gift 2</h3>
                    <div class="gift-box">
                        <span class="gift-emoji">🎁</span>
                    </div>
                    <p class="click-hint">Song 2</p>
                </div>

                <div class="gift-card" onclick="selectGift(2)">
                    <h3 class="gift-title">Gift 3</h3>
                    <div class="gift-box">
                        <span class="gift-emoji">🎁</span>
                    </div>
                    <p class="click-hint">Song 3</p>
                </div>

                <div class="gift-card" onclick="selectGift(3)">
                    <h3 class="gift-title">Gift 4</h3>
                    <div class="gift-box">
                        <span class="gift-emoji">🎁</span>
                    </div>
                    <p class="click-hint">Song 4</p>
                </div>

                <div class="gift-card" onclick="selectGift(4)">
                    <h3 class="gift-title">Gift 5</h3>
                    <div class="gift-box">
                        <span class="gift-emoji">🎁</span>
                    </div>
                    <p class="click-hint">Song 5</p>
                </div>
            </div>

            <button class="back-to-love-btn" onclick="this.parentElement.parentElement.remove()">Back to Love</button>
        </div>
    `;

    document.body.appendChild(overlay);
}

function selectGift(index) {
    // Remove the gift overlay
    const overlay = document.querySelector('.gift-overlay');
    if (overlay) overlay.remove();

    // Open Music Player
    // Gift 1 -> Song 1 (Index 0)
    // Gift 2 -> Song 2 (Index 1) - just for variety
    showMusicPlayer();

    // Call playSong immediately to satisfy browser autoplay policy
    if (typeof playSong === 'function') {
        playSong(index);
    }
}

// Logic for Static Memories Button (if it exists)
const staticMemoriesBtn = document.getElementById('memories-btn');
if (staticMemoriesBtn) {
    staticMemoriesBtn.addEventListener('click', () => {
        window.location.href = 'memories.html';
    });
}

// Simple Confetti / Heart Rain function
function shootConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    // Create simple hearts falling
    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval);
            return;
        }

        createHeart();
    }, 100);
}

function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '-20px';
    heart.style.fontSize = Math.random() * 20 + 20 + 'px';
    heart.style.animation = `fall ${Math.random() * 2 + 3}s linear`;
    heart.style.zIndex = '100';

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Inject keyframes for falling animation
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fall {
    to {
        transform: translateY(100vh) rotate(360deg);
    }
}
`;
document.head.appendChild(styleSheet);

// Check for URL parameter to show menu immediately
// Check for URL parameter to show menu immediately
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('menu') === 'true') {
        // Skip intro and show menu
        mascot.src = "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif";
        question.innerHTML = "Yay! I love you! ❤️";
        subtext.innerHTML = "Best decision ever!";
        buttonsContainer.style.display = 'none';

        // Create menu immediately without delay/animation
        const overlay = document.createElement('div');
        overlay.className = 'envelope-overlay';
        overlay.style.animation = 'none'; // Force instant show

        overlay.innerHTML = `
            <div class="envelope-modal" style="animation: none;">
                <h2 class="envelope-title">Choose an envelope</h2>
                <p class="envelope-subtitle">Explore the little things I love about us.</p>
                
                <div class="envelope-grid">
                    <div class="envelope-card" onclick="showMemoriesPopup()">
                        <i class="fas fa-images"></i>
                        <span>Our Memories</span>
                    </div>
                    
                    <div class="envelope-card" onclick="showLetterPopup()">
                        <i class="fas fa-envelope-open-text"></i>
                        <span>My Letter</span>
                    </div>
                    
                    <div class="envelope-card" onclick="showWhyILoveYouPopup()">
                        <i class="fas fa-heart"></i>
                        <span>Why I Love You</span>
                    </div>
                    
                    <div class="envelope-card" onclick="showGiftSelection()">
                        <i class="fas fa-gift"></i>
                        <span>Surprise</span>
                    </div>

                    <div class="envelope-card" onclick="showFinalSurprise()" style="grid-column: span 2; background: #fff5f8;">
                        <i class="fas fa-star"></i>
                        <span>Final Surprise</span>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
    }
});

// Letter Content
const loveNotes = [
    "Her smile is my daily dose of happiness.",
    "She's the reason I wake up with a smile.",
    "Her laughter is music to my ears.",
    "I'm captivated by her intelligence and wit.",
    "Her kindness and empathy inspire me.",
    "She's my partner in crime, my accomplice.",
    "I love the way she makes me laugh.",
    "Her touch ignites a fire within me.",
    "She's my safe haven, my shelter.",
    "I'm addicted to her hugs and cuddles.",
    "Her eyes sparkle like diamonds.",
    "She's my best friend and soulmate.",
    "I'm drawn to her quirky sense of humor.",
    "Her passion and enthusiasm are contagious.",
    "She's my rock, my support system.",
    "I love the way she always knows how to make me feel better.",
    "Her smile lights up the darkest rooms.",
    "She's my forever home, my place of solace.",
    "I'm captivated by her beauty, inside and out.",
    "She's the missing piece I never knew I needed.",
    "Her laughter is my happy place.",
    "I'm addicted to her kisses and affection.",
    "She's my everything, my reason for being.",
    "I love the way she challenges me to be my best self.",
    "Her love is my anchor, my guiding light.",
    "She's the sunshine that brightens up my day.",
    "I'm drawn to her adventurous spirit.",
    "Her heart is pure, kind, and generous.",
    "She's my soulmate, my perfect match.",
    "I'm captivated by her unique perspective on life.",
    "Her presence in my life is a gift.",
    "I love the way she supports me in everything I do.",
    "She's my confidante, my partner in every sense.",
    "Her touch is my happy place.",
    "She's the reason I believe in love again.",
    "I'm addicted to her scent, her perfume.",
    "Her eyes are the windows to her beautiful soul.",
    "She's my forever love, my always.",
    "I love the way she makes me feel like I'm home.",
    "Her love is my safe haven, my shelter.",
    "She's the missing beat in my heart.",
    "I'm captivated by her creativity and imagination.",
    "Her kindness and generosity inspire me.",
    "She's my best friend, my partner in every sense.",
    "I'm addicted to her love, her affection.",
    "Her smile is my daily motivation.",
    "She's the reason I wake up with a purpose.",
    "I love the way she challenges me to grow.",
    "Her presence in my life is a blessing.",
    "She's my soulmate, my forever love.",
    "I'm drawn to her intelligence and wisdom.",
    "Her laughter is music to my ears.",
    "She's my rock, my support system.",
    "I love the way she makes me feel like I'm the only person in the world.",
    "Her love is my anchor, my guiding light.",
    "She's the sunshine that brightens up my day.",
    "I'm captivated by her beauty, inside and out.",
    "Her heart is pure, kind, and generous.",
    "She's my everything, my reason for being.",
    "I'm addicted to her kisses and affection.",
    "Her presence in my life is a gift.",
    "I love the way she supports me in everything I do.",
    "She's my confidante, my partner in every sense.",
    "Her touch is my happy place.",
    "She's the reason I believe in love again.",
    "I'm drawn to her quirky sense of humor.",
    "Her laughter is contagious and makes me happy.",
    "She's my best friend and soulmate.",
    "I love the way she challenges me to be my best self.",
    "Her love is my safe haven, my shelter.",
    "She's the missing piece I never knew I needed.",
    "I'm captivated by her adventurous spirit.",
    "Her kindness and generosity inspire me.",
    "She's my forever love, my always.",
    "I'm addicted to her scent, her perfume.",
    "Her eyes are the windows to her beautiful soul.",
    "She's my forever home, my place of solace.",
    "I love the way she makes me feel like I'm home.",
    "Her love is my anchor, my guiding light.",
    "She's the reason I wake up with a smile.",
    "I'm drawn to her intelligence and wit.",
    "Her laughter is music to my ears.",
    "She's my rock, my support system.",
    "I love the way she makes me feel like I'm the only person in the world."
];

function showLetterPopup() {
    const overlay = document.createElement('div');
    overlay.className = 'letter-popup-overlay';

    // Create list items
    const listItems = loveNotes.map((note, index) =>
        `<li>${index + 1}. ${note}</li>`
    ).join('');

    overlay.innerHTML = `
        <div class="letter-content">
            <button class="close-letter-btn" onclick="this.parentElement.parentElement.remove()">×</button>
            
            <div class="letter-header-area">
                <h2 class="letter-header">My Love Letter 💌</h2>
            </div>
            
            <div class="letter-body">
                <ul class="letter-list">
                    ${listItems}
                </ul>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
}

// Why I Love You Content
const whyILoveYouContent = [
    "You make my bad days softer and my good days brighter.",
    "You listen — really listen — and that means everything.",
    "You're my calm and my chaos at the same time.",
    "You support my dreams like they're your own.",
    "Being with you feels like home."
];

function showWhyILoveYouPopup() {
    const overlay = document.createElement('div');
    overlay.className = 'letter-popup-overlay';

    const listItems = whyILoveYouContent.map((item, index) =>
        `<li class="love-item" style="animation-delay: ${index * 0.2}s">
            <span class="checkmark">✓</span>
            <span>${item}</span>
        </li>`
    ).join('');

    overlay.innerHTML = `
        <div class="letter-content love-content">
            <button class="close-letter-btn" onclick="this.parentElement.parentElement.remove()">×</button>
            
            <div class="letter-header-area">
                <h2 class="letter-header">Why I Love You 💖</h2>
            </div>
            
            <div class="letter-body">
                <ul class="love-list">
                    ${listItems}
                </ul>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
}

// Memories Popup Logic
function showMemoriesPopup() {
    const overlay = document.createElement('div');
    overlay.className = 'letter-popup-overlay';

    // HTML Content (Grid)
    const gridContent = `
        <div class="memories-container" id="popup-board" style="max-height: 60vh; overflow-y: auto; padding-bottom: 50px;">
            <div class="polaroid" onclick="openLightbox(this)">
                <div class="inner">
                    <img src="4.jpg" alt="Memory">
                </div>
                <div class="caption">First Hello 👋</div>
            </div>

            <div class="polaroid" onclick="openLightbox(this)">
                <div class="inner">
                    <img src="1.jpg" alt="Memory">
                </div>
                <div class="caption">Silly Times 🤪</div>
            </div>

            <div class="polaroid" onclick="openLightbox(this)">
                <div class="inner">
                    <img src="2.jpg" alt="Memory">
                </div>
                <div class="caption">Sweet Dates ☕</div>
            </div>

            <div class="polaroid" onclick="openLightbox(this)">
                <div class="inner">
                    <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" alt="Memory">
                </div>
                <div class="caption">Us Forever 💑</div>
            </div>

            <div class="polaroid" onclick="openLightbox(this)">
                <div class="inner">
                    <img src="3.jpg" alt="Memory">
                </div>
                <div class="caption">Just Because 💖</div>
            </div>

            <div class="polaroid" onclick="openLightbox(this)">
                <div class="inner">
                    <img src="5.jpg" alt="Memory">
                </div>
                <div class="caption">Hugs & Kisses</div>
            </div>
        </div>
    `;

    overlay.innerHTML = `
        <div class="letter-content" style="background: #fff; overflow: hidden;">
            <button class="close-letter-btn" onclick="this.parentElement.parentElement.remove()">×</button>
            
            <div class="letter-header-area">
                <h2 class="letter-header" style="color: #e91e63;">Our Memories 📸</h2>
                <p style="font-size: 0.9rem; color: #666;">Click on a photo to enlarge!</p>
            </div>
            
            <div class="letter-body" style="background: #fff;">
                ${gridContent}
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    // Initialize 3D Tilt Effect for these new elements
    requestAnimationFrame(() => {
        initTiltEffect(overlay.querySelectorAll('.polaroid'));
    });
}

// 3D Tilt Logic (Ported)
function initTiltEffect(cards) {
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Calculate rotation (max 15 degrees)
            const rotateY = (x / rect.width) * 30;
            const rotateX = (y / rect.height) * -30;

            card.style.transition = 'none'; // Instant movement
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

            // Dynamic Lighting Effect
            const shine = `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(255,255,255,0.2), transparent 40%)`;
            card.style.setProperty('--shine', shine);
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s ease'; // Smooth return
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            card.style.setProperty('--shine', 'none');
        });
    });
}

// Lightbox Logic (Ported)
function openLightbox(element) {
    const img = element.querySelector('img');
    const caption = element.querySelector('.caption').innerText;

    if (!img) return;

    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';

    overlay.innerHTML = `
        <div class="lightbox-content">
            <button class="close-lightbox-btn" onclick="this.parentElement.parentElement.remove()">×</button>
            <img src="${img.src}" alt="Memory" class="lightbox-img">
            <div class="lightbox-caption">${caption}</div>
        </div>
    `;

    // Close on background click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });

    document.body.appendChild(overlay);
}
