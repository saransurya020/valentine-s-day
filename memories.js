const heartsContainer = document.getElementById('hearts-container');

// Background Heart Generator
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');

    // Random starting position and size
    heart.style.left = Math.random() * 100 + 'vw';
    const duration = Math.random() * 5 + 10; // 10-15s
    heart.style.animationDuration = duration + 's';

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Create hearts periodically
setInterval(createHeart, 500);

// Initial set of hearts
for (let i = 0; i < 15; i++) {
    setTimeout(createHeart, Math.random() * 3000);
}

// Advanced 3D Tilt Effect for Memories
const cards = document.querySelectorAll('.polaroid');

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

// Letter Data
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
    "She's the missing piece I never knew I needed."
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
                <h2 class="letter-header" style="border-bottom: 3px solid #ff4081; display: inline-block; padding-bottom: 5px;">My Love Letter 💌</h2>
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

// Lightbox for Memories
function openMemory(element) {
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
