// Multiple Choice Functionality
function checkAnswer(element, isCorrect) {
    const responses = element.parentNode.querySelectorAll('.response');
    
    // Disable all responses
    responses.forEach(response => {
        response.disabled = true;
        response.style.pointerEvents = 'none';
        
        if (response === element) {
            if (isCorrect) {
                response.classList.add('correct');
                response.innerHTML += '<span class="feedback"> ✓ Correct!</span>';
                createCelebration(response);
            } else {
                response.classList.add('incorrect');
                response.innerHTML += '<span class="feedback"> ✗ Incorrect</span>';
            }
        } else if (!response.classList.contains('correct') && !response.classList.contains('incorrect')) {
            response.style.opacity = '0.6';
        }
    });
}

// Flashcard Functionality
function flipCard(card) {
    card.classList.toggle('flipped');
    
    // Add some visual feedback
    if (card.classList.contains('flipped')) {
        createSparkles(card);
    }
}

// Handle keyboard navigation for flashcards
function handleCardKeydown(event, card) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        flipCard(card);
    }
}

// Matching Game Functionality
let selectedMatch = null;
let matchedPairs = 0;
const totalPairs = 6;

function selectMatch(element, matchId) {
    if (element.classList.contains('matched')) return;

    if (selectedMatch === null) {
        // First selection
        selectedMatch = { element, matchId };
        element.classList.add('selected');
        updateMatchResult('Item selected. Now choose its match.');
    } else {
        if (selectedMatch.element === element) {
            // Deselect if clicking the same element
            selectedMatch.element.classList.remove('selected');
            selectedMatch = null;
            updateMatchResult('Selection cleared. Choose an item to match.');
            return;
        }

        if (selectedMatch.matchId === matchId) {
            // Correct match
            selectedMatch.element.classList.remove('selected');
            selectedMatch.element.classList.add('matched');
            element.classList.add('matched');
            
            matchedPairs++;
            
            // Create celebration effect
            createCelebration(element);
            createCelebration(selectedMatch.element);
            
            if (matchedPairs === totalPairs) {
                updateMatchResult('🎉 Congratulations! All pairs matched correctly!');
                createConfetti();
            } else {
                updateMatchResult(`✓ Correct match! (${matchedPairs}/${totalPairs} completed)`);
            }
        } else {
            // Incorrect match
            element.classList.add('selected');
            updateMatchResult('✗ Not a match. Try again!');
            
            setTimeout(() => {
                selectedMatch.element.classList.remove('selected');
                element.classList.remove('selected');
                updateMatchResult('Choose an item to match.');
            }, 1500);
        }
        selectedMatch = null;
    }
}

function updateMatchResult(message) {
    const resultElement = document.getElementById('match-result');
    resultElement.textContent = message;
}

// Visual Effects
function createCelebration(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            createSparkle(centerX, centerY);
        }, i * 100);
    }
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'glitter';
    sparkle.style.left = (x + (Math.random() - 0.5) * 100) + 'px';
    sparkle.style.top = (y + (Math.random() - 0.5) * 100) + 'px';
    sparkle.style.animationDuration = (Math.random() * 2 + 1) + 's';
    
    document.getElementById('glitter-container').appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 3000);
}

function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            createSparkle(
                rect.left + Math.random() * rect.width,
                rect.top + Math.random() * rect.height
            );
        }, i * 200);
    }
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createSparkle(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }, i * 100);
    }
}

// Continuous Glitter Animation
function createGlitter() {
    const glitter = document.createElement('div');
    glitter.className = 'glitter';
    
    const colors = ['#6c63ff', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    glitter.style.left = Math.random() * window.innerWidth + 'px';
    glitter.style.bottom = '0px';
    glitter.style.backgroundColor = randomColor;
    glitter.style.animationDuration = (Math.random() * 3 + 2) + 's';
    
    document.getElementById('glitter-container').appendChild(glitter);
    
    setTimeout(() => {
        if (glitter.parentNode) {
            glitter.remove();
        }
    }, 5000);
}

// Mouse Trail Effect
let mouseTrailEnabled = true;

function createMouseTrail(e) {
    if (!mouseTrailEnabled) return;
    
    const trail = document.createElement('div');
    trail.className = 'trail-dot';
    
    const colors = ['#6c63ff', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    trail.style.background = randomColor;
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
        if (trail.parentNode) {
            trail.remove();
        }
    }, 1000);
}

// Smooth scrolling for navigation
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Start glitter animation
    setInterval(createGlitter, 500);
    
    // Add mouse trail
    document.addEventListener('mousemove', createMouseTrail);
    
    // Add smooth scrolling to navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll(this.getAttribute('href'));
        });
    });
    
    // Add keyboard navigation for responses
    document.querySelectorAll('.response').forEach(response => {
        response.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Initialize match game message
    updateMatchResult('Choose an item to match.');
    
    console.log('🎨 Art History Study Guide loaded successfully!');
});

// Performance optimization: Reduce effects on slower devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    mouseTrailEnabled = false;
}

// Accessibility: Respect user's motion preferences
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    mouseTrailEnabled = false;
    // Reduce glitter frequency
    setInterval(createGlitter, 2000);
}
