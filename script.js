// Variáveis globais para controle das cenas
let currentScene = 0;
let totalScenes = 5; // Número total de cenas
let sceneTransitioning = false;

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Particle animation enhancement
    createParticleSystem();

    // Form handling

    // Service card hover effects
    setupServiceCardEffects();

    // Portfolio hover effects
    setupPortfolioEffects();

    // Hero button click effect
    setupHeroButton();
    
    // Initialize cinematic video effects
    initCinematicEffects();
    
    // Initialize multiple hero scenes
    initHeroScenes();
    
    // Ensure mouse trail is active
    mouseTrailActive = true;
    
    // Add mouse trail toggle (optional - for testing)
    document.addEventListener('keydown', function(e) {
        if (e.key === 't' || e.key === 'T') {
            mouseTrailActive = !mouseTrailActive;
            console.log('Mouse trail:', mouseTrailActive ? 'ON' : 'OFF');
        }
    });
});

// Enhanced particle system
function createParticleSystem() {
    const particleContainer = document.querySelector('.particle-container');
    
    // Create floating particles
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: ${Math.random() > 0.5 ? '#00d4ff' : '#00ffff'};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
            opacity: ${Math.random() * 0.8 + 0.2};
        `;
        particleContainer.appendChild(particle);
    }

    // Add CSS animation for floating particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(0px) translateX(0px) rotate(0deg);
            }
            33% {
                transform: translateY(-100px) translateX(50px) rotate(120deg);
            }
            66% {
                transform: translateY(-200px) translateX(-50px) rotate(240deg);
            }
            100% {
                transform: translateY(-300px) translateX(0px) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// Form interactions
function setupFormInteractions() {
    const form = document.querySelector('.contact-form form');
    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        // Add focus and blur effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });

        // Add typing effect
        input.addEventListener('input', function() {
            const glow = this.parentElement.querySelector('.input-glow');
            glow.style.opacity = '0.3';
            setTimeout(() => {
                glow.style.opacity = '0';
            }, 200);
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.querySelector('span').textContent;
        
        // Animate button
        submitButton.querySelector('span').textContent = 'TRANSMITTING...';
        submitButton.style.transform = 'scale(0.95)';
        
        // Simulate form submission
        setTimeout(() => {
            submitButton.querySelector('span').textContent = 'MESSAGE SENT!';
            submitButton.style.background = 'linear-gradient(135deg, #00d4ff 0%, #00ffff 100%)';
            submitButton.style.color = '#0a0a0a';
            
            setTimeout(() => {
                submitButton.querySelector('span').textContent = originalText;
                submitButton.style.transform = 'scale(1)';
                submitButton.style.background = 'transparent';
                submitButton.style.color = '#00d4ff';
                form.reset();
            }, 2000);
        }, 1500);
    });
}

// Service card effects
function setupServiceCardEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(0, 212, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (rect.width / 2 - size / 2) + 'px';
            ripple.style.top = (rect.height / 2 - size / 2) + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Portfolio effects
function setupPortfolioEffects() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.project-overlay');
            overlay.style.transform = 'scale(1.05)';
            overlay.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.5)';
        });
        
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.project-overlay');
            overlay.style.transform = 'scale(1)';
            overlay.style.boxShadow = 'none';
        });
    });
}

// Hero button effects
function setupHeroButton() {
    const heroButton = document.querySelector('.cta-button');
    
    heroButton.addEventListener('click', function() {
        // Create energy burst effect
        const burst = document.createElement('div');
        burst.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 255, 255, 0.8) 0%, transparent 70%);
            transform: translate(-50%, -50%);
            animation: energyBurst 0.8s ease-out;
            pointer-events: none;
            z-index: 1000;
        `;
        
        document.body.appendChild(burst);
        
        setTimeout(() => {
            burst.remove();
        }, 800);
        
        // Scroll to services section
        document.querySelector('#services').scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Add energy burst animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes energyBurst {
            0% {
                width: 0;
                height: 0;
                opacity: 1;
            }
            100% {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Enhanced Mouse trail effect
let mouseTrailActive = true;
let trailParticles = [];

document.addEventListener('mousemove', function(e) {
    if (window.innerWidth > 768 && mouseTrailActive) { // Only on desktop
        createMouseTrail(e.clientX, e.clientY);
        createGlowTrail(e.clientX, e.clientY);
    }
});

function createMouseTrail(x, y) {
    // Main trail particle
    const trail = document.createElement('div');
    trail.className = 'mouse-trail-particle';
    trail.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, 
            rgba(0, 255, 255, 1) 0%, 
            rgba(0, 212, 255, 0.8) 30%, 
            transparent 70%
        );
        border-radius: 50%;
        left: ${x - 4}px;
        top: ${y - 4}px;
        pointer-events: none;
        z-index: 9999;
        box-shadow: 
            0 0 10px rgba(0, 255, 255, 0.8),
            0 0 20px rgba(0, 212, 255, 0.4);
        animation: trailFade 1.2s ease-out forwards;
    `;
    
    document.body.appendChild(trail);
    trailParticles.push(trail);
    
    // Limit particles for performance
    if (trailParticles.length > 15) {
        const oldParticle = trailParticles.shift();
        if (oldParticle && oldParticle.parentNode) {
            oldParticle.remove();
        }
    }
    
    setTimeout(() => {
        if (trail && trail.parentNode) {
            trail.remove();
        }
    }, 1200);
}

function createGlowTrail(x, y) {
    // Secondary glow effect
    const glow = document.createElement('div');
    glow.className = 'mouse-glow-trail';
    glow.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, 
            rgba(0, 255, 255, 0.3) 0%, 
            rgba(0, 212, 255, 0.1) 50%, 
            transparent 70%
        );
        border-radius: 50%;
        left: ${x - 10}px;
        top: ${y - 10}px;
        pointer-events: none;
        z-index: 9998;
        animation: glowTrailFade 0.8s ease-out forwards;
    `;
    
    document.body.appendChild(glow);
    
    setTimeout(() => {
        if (glow && glow.parentNode) {
            glow.remove();
        }
    }, 800);
}

// Enhanced trail animations
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        50% {
            opacity: 0.8;
            transform: scale(1.2);
        }
        100% {
            opacity: 0;
            transform: scale(0.2);
        }
    }
    
    @keyframes glowTrailFade {
        0% {
            opacity: 0.6;
            transform: scale(0.8);
        }
        30% {
            opacity: 0.8;
            transform: scale(1.1);
        }
        100% {
            opacity: 0;
            transform: scale(1.5);
        }
    }
    
    .mouse-trail-particle {
        filter: blur(0.5px);
    }
    
    .mouse-glow-trail {
        filter: blur(1px);
    }
`;
document.head.appendChild(trailStyle);

// Parallax scrolling effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function() {
    setTimeout(() => {
        const subtitle = document.querySelector('.hero-subtitle');
        const originalText = subtitle.textContent;
        typeWriter(subtitle, originalText, 30);
    }, 1000);
});

// Add glitch effect to title on hover
const heroTitle = document.querySelector('.hero-title');
heroTitle.addEventListener('mouseenter', function() {
    this.style.animation = 'glitch 0.3s ease-in-out';
});

heroTitle.addEventListener('animationend', function() {
    this.style.animation = 'titleGlow 3s ease-in-out infinite alternate';
});

// Add glitch animation
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
    @keyframes glitch {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-2px); }
        40% { transform: translateX(2px); }
        60% { transform: translateX(-1px); }
        80% { transform: translateX(1px); }
    }
`;
document.head.appendChild(glitchStyle);

// Cinematic video effects
function initCinematicEffects() {
    // Create dynamic camera movements
    const videoBackground = document.querySelector('.video-background');
    
    // Parallax depth effect
    window.addEventListener('mousemove', function(e) {
        if (window.innerWidth > 768) {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            
            // Apply subtle parallax to different layers
            const cityscape = document.querySelector('.digital-cityscape');
            const dataFlows = document.querySelector('.ai-data-flows');
            const portals = document.querySelector('.portal-transitions');
            
            if (cityscape) {
                cityscape.style.transform = `translate(${x * 0.02}px, ${y * 0.02}px)`;
            }
            if (dataFlows) {
                dataFlows.style.transform = `translate(${x * -0.01}px, ${y * -0.01}px)`;
            }
            if (portals) {
                portals.style.transform = `translate(${x * 0.015}px, ${y * 0.015}px)`;
            }
        }
    });
    
    // Dynamic zoom effect on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.0005;
        
        if (videoBackground) {
            videoBackground.style.transform = `scale(${1 + rate}) translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // Cinematic transitions between scenes
    setInterval(() => {
        createCinematicTransition();
    }, 8000);
}

// Create cinematic scene transitions
function createCinematicTransition() {
    const transition = document.createElement('div');
    transition.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at center, 
            transparent 0%, 
            rgba(0, 255, 255, 0.1) 50%, 
            transparent 100%
        );
        z-index: 25;
        pointer-events: none;
        animation: cinematicFlash 2s ease-in-out;
    `;
    
    document.body.appendChild(transition);
    
    setTimeout(() => {
        transition.remove();
    }, 2000);
}

// Add cinematic flash animation
const cinematicStyle = document.createElement('style');
cinematicStyle.textContent = `
    @keyframes cinematicFlash {
        0%, 100% { opacity: 0; }
        50% { opacity: 0.3; }
    }
`;
document.head.appendChild(cinematicStyle);

// Force mouse trail activation - TESTE DIRETO
console.log('Ativando rastro do mouse...');

// Remove any existing mouse trail listeners
document.removeEventListener('mousemove', createMouseTrail);

// Add new robust mouse trail
document.addEventListener('mousemove', function(e) {
    console.log('Mouse movido:', e.clientX, e.clientY); // Debug
    
    // Create trail particle immediately
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        width: 12px;
        height: 12px;
        background: #00ffff;
        border-radius: 50%;
        left: ${e.clientX - 6}px;
        top: ${e.clientY - 6}px;
        pointer-events: none;
        z-index: 99999;
        box-shadow: 0 0 15px #00ffff, 0 0 25px #00d4ff;
        animation: simpleTrailFade 1s ease-out forwards;
    `;
    
    document.body.appendChild(trail);
    
    // Remove after animation
    setTimeout(() => {
        if (trail && trail.parentNode) {
            trail.remove();
        }
    }, 1000);
});

// Add simple trail animation
const simpleTrailStyle = document.createElement('style');
simpleTrailStyle.textContent = `
    @keyframes simpleTrailFade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0.3);
        }
    }
`;
document.head.appendChild(simpleTrailStyle);

console.log('Rastro do mouse ativado! Mova o mouse para testar.');

// Multiple Hero Scenes System
let autoSceneTimer;

function initHeroScenes() {
    console.log('Inicializando sistema de múltiplas cenas...');
    
    // Setup scene navigation
    setupSceneNavigation();
    
    // Setup parallax effects
    setupParallaxEffects();
    
    // Start auto scene transition
    startAutoSceneTransition();
    
    // Setup interactive controls
    setupSceneControls();
    
    // Initialize scene indicators
    updateSceneIndicators(0);
}

function setupSceneNavigation() {
    const indicators = document.querySelectorAll('.indicator');
    const scenes = document.querySelectorAll('.hero-scene');
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (!sceneTransitioning && index !== currentScene) {
                changeScene(index);
            }
        });
    });
}

function setupSceneControls() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (!sceneTransitioning) {
                const prevScene = currentScene === 0 ? totalScenes - 1 : currentScene - 1;
                changeScene(prevScene);
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (!sceneTransitioning) {
                const nextScene = (currentScene + 1) % totalScenes;
                changeScene(nextScene);
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!sceneTransitioning) {
            if (e.key === 'ArrowLeft') {
                const prevScene = currentScene === 0 ? totalScenes - 1 : currentScene - 1;
                changeScene(prevScene);
            } else if (e.key === 'ArrowRight') {
                const nextScene = (currentScene + 1) % totalScenes;
                changeScene(nextScene);
            }
        }
    });
}

function updateSceneIndicators(activeIndex) {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index === activeIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function changeScene(newSceneIndex) {
    if (sceneTransitioning || newSceneIndex === currentScene) return;
    
    sceneTransitioning = true;
    updateSceneIndicators(newSceneIndex);
    
    const currentSceneEl = document.querySelector(`[data-scene="${currentScene}"].cinematic-scene`);
    const newSceneEl = document.querySelector(`[data-scene="${newSceneIndex}"].cinematic-scene`);
    
    // Scene transition animation
    if (currentSceneEl) {
        currentSceneEl.classList.add('transitioning-out');
        currentSceneEl.classList.remove('active');
    }
    
    setTimeout(() => {
        if (newSceneEl) {
            newSceneEl.classList.add('transitioning-in', 'active');
            newSceneEl.classList.remove('transitioning-out');
        }
        
        setTimeout(() => {
            if (currentSceneEl) {
                currentSceneEl.classList.remove('transitioning-out');
            }
            if (newSceneEl) {
                newSceneEl.classList.remove('transitioning-in');
            }
            
            currentScene = newSceneIndex;
            sceneTransitioning = false;
            
            // Create scene transition effect
            createSceneTransitionEffect();
            
        }, 800);
    }, 200);
    
    // Reset auto transition timer
    resetAutoSceneTransition();
}

function createSceneTransitionEffect() {
    const effect = document.createElement('div');
    effect.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at center, 
            rgba(0, 255, 255, 0.2) 0%, 
            transparent 70%
        );
        z-index: 1000;
        pointer-events: none;
        animation: sceneTransitionFlash 1s ease-out;
    `;
    
    document.body.appendChild(effect);
    
    setTimeout(() => {
        if (effect && effect.parentNode) {
            effect.remove();
        }
    }, 1000);
}

function setupParallaxEffects() {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1; // -1 to 1
        mouseY = (e.clientY / window.innerHeight) * 2 - 1; // -1 to 1
        
        updateParallaxLayers();
    });
    
    function updateParallaxLayers() {
        const activeScene = document.querySelector('.hero-scene.active');
        if (!activeScene) return;
        
        const parallaxLayers = activeScene.querySelectorAll('.parallax-layer');
        
        parallaxLayers.forEach(layer => {
            const speed = parseFloat(layer.dataset.speed) || 0.5;
            const moveX = mouseX * speed * 20;
            const moveY = mouseY * speed * 20;
            
            layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
    
    // Scroll parallax
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const activeScene = document.querySelector('.hero-scene.active');
        
        if (activeScene && scrolled < window.innerHeight) {
            const parallaxLayers = activeScene.querySelectorAll('.parallax-layer');
            
            parallaxLayers.forEach(layer => {
                const speed = parseFloat(layer.dataset.speed) || 0.5;
                const yPos = scrolled * speed * 0.5;
                
                const currentTransform = layer.style.transform || '';
                const newTransform = currentTransform.replace(/translateY\([^)]*\)/, '') + ` translateY(${yPos}px)`;
                layer.style.transform = newTransform;
            });
        }
    });
}

function startAutoSceneTransition() {
    autoSceneTimer = setInterval(() => {
        if (!sceneTransitioning) {
            const nextScene = (currentScene + 1) % totalScenes;
            changeScene(nextScene);
        }
    }, 8000); // Change scene every 8 seconds
}

function resetAutoSceneTransition() {
    clearInterval(autoSceneTimer);
    startAutoSceneTransition();
}

// Add scene transition animation CSS
const sceneTransitionStyle = document.createElement('style');
sceneTransitionStyle.textContent = `
    @keyframes sceneTransitionFlash {
        0% { opacity: 0; }
        50% { opacity: 0.3; }
        100% { opacity: 0; }
    }
`;
document.head.appendChild(sceneTransitionStyle);
