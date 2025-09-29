// Variáveis globais para controle das cenas
let currentScene = 0;
let totalScenes = 5; // Número total de cenas
let sceneTransitioning = false;

// Mobile detection and optimization
const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();
    
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
                
                // Close mobile menu if open
                closeMobileMenu();
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

// Enhanced particle system (optimized for mobile)
function createParticleSystem() {
    const particleContainer = document.querySelector('.particle-container');
    if (!particleContainer) return;
    
    // Create different amounts based on device
    const particleCount = isMobile ? 20 : 50; // Mobile gets fewer particles
    console.log(`Criando ${particleCount} partículas para ${isMobile ? 'mobile' : 'desktop'}`);
    
    // Create optimized particles
    for (let i = 0; i < particleCount; i++) {
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

// Enhanced Mouse trail effect (desktop only)
let mouseTrailActive = true;
let trailParticles = [];

document.addEventListener('mousemove', function(e) {
    if (!isMobile && mouseTrailActive) { // Only on desktop
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

// Cinematic video effects (disabled on mobile)
function initCinematicEffects() {
    // Skip cinematic effects on mobile for better performance
    if (isMobile) {
        console.log('Efeitos cinematográficos desabilitados no mobile');
        return;
    }
    
    // Create dynamic camera movements (desktop only)
    const videoBackground = document.querySelector('.video-background');
    
    // Parallax depth effect (desktop only)
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
    
    // Dynamic zoom effect on scroll (desktop only)
    window.addEventListener('scroll', function() {
        if (isMobile) return; // Skip on mobile
        
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.0005;
        
        if (videoBackground) {
            videoBackground.style.transform = `scale(${1 + rate}) translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // Cinematic transitions between scenes (desktop only)
    const cinematicInterval = setInterval(() => {
        if (!isMobile) {
            createCinematicTransition();
        }
    }, 8000);
    
    // Store interval for cleanup
    window.cinematicEffectsInterval = cinematicInterval;
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

// Mouse trail (desktop only)
if (!isMobile) {
    console.log('Ativando rastro do mouse para desktop...');
    
    // Add mouse trail for desktop only
    document.addEventListener('mousemove', function(e) {
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
    
    console.log('Rastro do mouse ativado para desktop!');
} else {
    console.log('Rastro do mouse desabilitado no mobile para melhor performance');
}

// Add simple trail animation and light cinematic flash
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
    
    @keyframes lightCinematicFlash {
        0%, 100% { opacity: 0; }
        50% { opacity: 0.1; }
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
    
    // Optimized scene transition for mobile - keep smooth but faster
    if (isMobile) {
        // Faster but smooth transition on mobile
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
                
            }, 400); // Faster transition for mobile
        }, 100);
        
        resetAutoSceneTransition();
        return;
    }
    
    // Full animation for desktop
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
            
            // Create scene transition effect (desktop only)
            if (!isMobile) {
                createSceneTransitionEffect();
            }
            
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

// ===== MOBILE SPECIFIC FUNCTIONS =====

// Mobile Menu Functions
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', function() {
            toggleMobileMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
    }
}

function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileMenu && mobileToggle) {
        mobileMenu.classList.toggle('active');
        
        // Update toggle button
        const span = mobileToggle.querySelector('span');
        if (mobileMenu.classList.contains('active')) {
            span.innerHTML = '✕';
            // Don't prevent body scrolling - allow natural scroll behavior
        } else {
            span.innerHTML = '☰';
        }
    }
}

function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileMenu && mobileToggle) {
        mobileMenu.classList.remove('active');
        mobileToggle.querySelector('span').innerHTML = '☰';
        // Don't modify body overflow - allow natural scrolling
    }
}

// Touch-friendly scene navigation
function initTouchSceneNavigation() {
    if (isTouch) {
        const heroSection = document.querySelector('.hero');
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;
        
        heroSection.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        });
        
        heroSection.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        });
        
        function handleSwipe() {
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            const minSwipeDistance = 80; // Increased threshold to avoid conflicts with scrolling
            
            // Only handle horizontal swipes that are clearly horizontal
            if (Math.abs(deltaX) > Math.abs(deltaY) * 2 && Math.abs(deltaX) > minSwipeDistance) {
                // Only if it's clearly a horizontal gesture and not vertical scroll
                if (!sceneTransitioning) {
                    if (deltaX > 0) {
                        // Swipe right - previous scene
                        const prevScene = currentScene === 0 ? totalScenes - 1 : currentScene - 1;
                        changeScene(prevScene);
                    } else {
                        // Swipe left - next scene
                        const nextScene = (currentScene + 1) % totalScenes;
                        changeScene(nextScene);
                    }
                }
            }
        }
    }
}

// Smart mobile performance optimizations - keep effects but optimize them
function optimizeForMobile() {
    if (isMobile) {
        console.log('Aplicando otimizações inteligentes para mobile...');
        
        // Reduce particle count but keep some for visual appeal
        const particleElements = document.querySelectorAll('.floating-particle');
        particleElements.forEach((particle, index) => {
            if (index > 15) { // Keep only 15 particles instead of removing all
                particle.remove();
            } else {
                // Slow down remaining particles
                particle.style.animationDuration = '20s';
                particle.style.opacity = '0.4';
            }
        });
        
        // Optimize complex animations instead of disabling
        const complexElements = document.querySelectorAll(`
            .holographic-interfaces, .lens-flares, .light-streaks, .portal-transitions,
            .ai-data-flows, .floating-elements, .hologram-layer, .energy-flows,
            .neural-network, .data-nodes, .ai-connections, .quantum-field,
            .dimensional-rifts, .interface-panels, .star-field, .space-station,
            .orbital-rings, .portal-ring, .portal-core, .particle-swirl,
            .city-skyline, .holographic-buildings, .flying-drones, .neon-lights,
            .geometric-shapes, .morphing-particles, .human-silhouette,
            .fragmentation-effect, .hologram-reconstruction, .glitch-overlay,
            .holographic-figure, .portal-burst, .energy-particles
        `);
        complexElements.forEach(element => {
            // Optimize instead of hiding
            element.style.animationDuration = '8s';
            element.style.opacity = '0.4';
            element.style.transform = 'scale(0.8)';
        });
        
        // Keep scene backgrounds but simplify them slightly
        const sceneBackgrounds = document.querySelectorAll('.scene-background');
        sceneBackgrounds.forEach(bg => {
            bg.style.filter = 'brightness(0.8)';
        });
        
        // Reduce parallax intensity instead of disabling
        const originalParallax = window.updateParallaxLayers;
        if (originalParallax) {
            window.updateParallaxLayers = function() {
                // Reduced parallax effect for mobile
                const activeScene = document.querySelector('.hero-scene.active');
                if (!activeScene) return;
                
                const parallaxLayers = activeScene.querySelectorAll('.parallax-layer');
                parallaxLayers.forEach(layer => {
                    const speed = parseFloat(layer.dataset.speed) || 0.5;
                    const moveX = mouseX * speed * 5; // Reduced from 20 to 5
                    const moveY = mouseY * speed * 5;
                    
                    layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
                });
            };
        }
        
        // Smooth scene transitions but faster
        const scenes = document.querySelectorAll('.cinematic-scene');
        scenes.forEach(scene => {
            scene.style.transition = 'opacity 0.5s ease';
        });
        
        // Moderate auto scene transition time
        if (autoSceneTimer) {
            clearInterval(autoSceneTimer);
            autoSceneTimer = setInterval(() => {
                if (!sceneTransitioning) {
                    const nextScene = (currentScene + 1) % totalScenes;
                    changeScene(nextScene);
                }
            }, 12000); // 12 seconds - balanced performance
        }
        
        // Reduce cinematic effects frequency instead of disabling
        if (window.cinematicEffectsInterval) {
            clearInterval(window.cinematicEffectsInterval);
            window.cinematicEffectsInterval = setInterval(() => {
                if (!isMobile) return;
                // Lighter cinematic transition for mobile
                createLightCinematicTransition();
            }, 15000); // Less frequent
        }
        
        console.log('Otimizações móveis inteligentes aplicadas!');
    }
}

// Lighter version of cinematic transition for mobile
function createLightCinematicTransition() {
    const transition = document.createElement('div');
    transition.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at center, 
            transparent 0%, 
            rgba(0, 255, 255, 0.05) 50%, 
            transparent 100%
        );
        z-index: 25;
        pointer-events: none;
        animation: lightCinematicFlash 1s ease-in-out;
    `;
    
    document.body.appendChild(transition);
    
    setTimeout(() => {
        if (transition && transition.parentNode) {
            transition.remove();
        }
    }, 1000);
}

// Viewport height fix for mobile browsers
function fixMobileViewport() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Update on resize/orientation change
    window.addEventListener('resize', () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
}

// Touch feedback for interactive elements
function addTouchFeedback() {
    if (isTouch) {
        const interactiveElements = document.querySelectorAll(
            '.cta-button, .service-card, .portfolio-item, .indicator, .submit-button'
        );
        
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
                this.style.transition = 'transform 0.1s ease';
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.transition = '';
                }, 100);
            });
        });
    }
}

// Optimize form inputs for mobile
function optimizeMobileForm() {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        // Prevent zoom on focus for iOS
        input.style.fontSize = '16px';
        
        // Add mobile-specific attributes
        if (input.type === 'email') {
            input.setAttribute('inputmode', 'email');
        }
        if (input.type === 'tel') {
            input.setAttribute('inputmode', 'tel');
        }
    });
}

// Initialize mobile optimizations
if (isMobile || isTouch) {
    // Apply critical mobile optimizations immediately
    document.documentElement.style.setProperty('--mobile-optimized', '1');
    
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Inicializando otimizações mobile...');
        
        // Apply optimizations in order of priority
        fixMobileViewport();
        optimizeForMobile();
        initTouchSceneNavigation();
        addTouchFeedback();
        optimizeMobileForm();
        
        // Disable unnecessary features
        window.mouseTrailActive = false;
        
        // Force garbage collection if available
        if (window.gc) {
            setTimeout(() => window.gc(), 2000);
        }
        
        console.log('Otimizações mobile aplicadas com sucesso!');
    });
    
    // Preload critical mobile styles
    const mobileStyleHint = document.createElement('style');
    mobileStyleHint.textContent = `
        @media (max-width: 768px) {
            * { 
                will-change: auto !important;
                transform: translateZ(0) !important;
            }
        }
    `;
    document.head.appendChild(mobileStyleHint);
}

// Handle orientation change
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        fixMobileViewport();
        // Refresh scene layout
        const activeScene = document.querySelector('.cinematic-scene.active');
        if (activeScene) {
            activeScene.style.transform = 'scale(1)';
        }
    }, 100);
});

// Allow normal scrolling on mobile - no interference
// Removed touchmove prevention to allow natural scrolling
