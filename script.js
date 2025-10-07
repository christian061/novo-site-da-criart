// Elite Bio - Interactive JavaScript with Modern Effects

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize countdown timer
    initCountdownTimer();
    
    // Initialize VSL players
    initVSLPlayers();
    
    // Initialize parallax effects
    initParallaxEffects();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // CTA Button click tracking and animation
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Track click (you can integrate with analytics here)
            console.log('CTA clicked:', this.textContent);
            
            // Special handling for CRIART CTA
            if (this.id === 'criart-cta') {
                setTimeout(() => {
                    showCriartModal();
                }, 200);
            } else {
                // Simulate redirect to payment page
                setTimeout(() => {
                    alert('Redirecionando para a página de pagamento...\n\nEm um site real, isso levaria você para o checkout.');
                }, 200);
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate sections on scroll
    const animatedSections = document.querySelectorAll('.hero, .before-after, .problem, .old-format, .new-format, .steps, .packs, .bonuses, .target, .pricing, .choice, .about');
    animatedSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Counter animation for pricing
    const priceElement = document.querySelector('.new-price');
    if (priceElement) {
        const finalPrice = 397;
        let currentPrice = 0;
        const increment = finalPrice / 50;
        
        const countUp = () => {
            currentPrice += increment;
            if (currentPrice < finalPrice) {
                priceElement.textContent = `R$ ${Math.floor(currentPrice)},00`;
                requestAnimationFrame(countUp);
            } else {
                priceElement.textContent = `R$ ${finalPrice},00`;
            }
        };
        
        // Start counter when pricing section is visible
        const pricingSection = document.querySelector('.pricing');
        const pricingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(countUp, 500);
                    pricingObserver.unobserve(entry.target);
                }
            });
        });
        pricingObserver.observe(pricingSection);
    }

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item h4');
    faqItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isOpen = content.style.display === 'block';
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item p').forEach(p => {
                p.style.display = 'none';
            });
            
            // Toggle current item
            if (!isOpen) {
                content.style.display = 'block';
                content.style.animation = 'fadeIn 0.3s ease';
            }
        });
    });

    // Add hover effects to step items
    const stepItems = document.querySelectorAll('.step-item');
    stepItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Pack items hover effect
    const packItems = document.querySelectorAll('.pack-item');
    packItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotateY(5deg)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateY(0deg)';
            this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        });
    });

    // Floating animation for features
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
    });

    // Add floating keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    // Add pulse animation to CTA buttons
    ctaButtons.forEach(button => {
        button.classList.add('pulse');
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    // Mobile menu toggle (if needed in future)
    const createMobileMenu = () => {
        // This function can be expanded for mobile navigation
        console.log('Mobile menu functionality ready');
    };

    // Initialize mobile menu
    createMobileMenu();

    // Performance optimization - lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Add success message for form submissions
    const showSuccessMessage = (message) => {
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            animation: slideIn 0.5s ease;
        `;
        successDiv.textContent = message;
        document.body.appendChild(successDiv);

        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    };

    // Console welcome message
    console.log(`
    🚀 Elite Bio Website Loaded Successfully!
    
    ✨ Features:
    - Smooth scrolling
    - Interactive animations
    - Responsive design
    - Modern UI/UX
    - VSL Integration
    - Countdown Timer
    - Parallax Effects
    
    Built with ❤️ for Elite Bio
    `);
});

// Countdown Timer Function
function initCountdownTimer() {
    const timer = document.getElementById('countdown-timer');
    if (!timer) return;
    
    // Set target date (24 hours from now)
    const targetDate = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            // Timer expired, reset to 24 hours
            const newTarget = new Date().getTime() + (24 * 60 * 60 * 1000);
            updateTimerDisplay(newTarget - new Date().getTime());
            return;
        }
        
        updateTimerDisplay(distance);
    };
    
    const updateTimerDisplay = (distance) => {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    };
    
    // Update immediately and then every second
    updateTimer();
    setInterval(updateTimer, 1000);
}

// VSL Players Function
function initVSLPlayers() {
    const playButtons = document.querySelectorAll('.play-button');
    
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const vslContainer = this.closest('.vsl-placeholder, .vsl-placeholder-middle');
            
            // Add clicked animation
            this.style.transform = 'translate(-50%, -50%) scale(0.8)';
            setTimeout(() => {
                this.style.transform = 'translate(-50%, -50%) scale(1.2)';
            }, 150);
            
            // Simulate video loading
            setTimeout(() => {
                showVideoModal(vslContainer.id || 'default');
            }, 300);
        });
    });
}

// Video Modal Function
function showVideoModal(videoId) {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-content">
            <div class="video-modal-header">
                <h3>🎥 Vídeo Exclusivo - Elite Bio</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="video-placeholder">
                <div class="video-loading">
                    <div class="loading-spinner"></div>
                    <p>Carregando vídeo exclusivo...</p>
                    <p class="video-description">
                        ${videoId === 'hero-play-btn' ? 
                            'Descubra o método secreto dos grandes influencers' : 
                            'Revelação exclusiva: Como converter bio em dinheiro'
                        }
                    </p>
                </div>
            </div>
            <div class="video-cta">
                <p>👆 Este é apenas uma demonstração. Em produção, aqui seria exibido seu VSL real.</p>
                <button class="cta-button">🚀 QUERO COMEÇAR AGORA</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    const ctaBtn = modal.querySelector('.cta-button');
    
    closeBtn.addEventListener('click', () => modal.remove());
    ctaBtn.addEventListener('click', () => {
        modal.remove();
        document.getElementById('main-cta').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    // Add modal styles
    const modalStyles = `
        .video-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .video-modal-content {
            background: white;
            border-radius: 20px;
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            animation: slideIn 0.3s ease;
        }
        
        .video-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 30px;
            border-bottom: 1px solid #eee;
        }
        
        .close-modal {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #666;
        }
        
        .video-placeholder {
            height: 400px;
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
            padding: 40px;
        }
        
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255,255,255,0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        
        .video-cta {
            padding: 30px;
            text-align: center;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes slideIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    
    if (!document.getElementById('modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }
}

// Parallax Effects Function
function initParallaxEffects() {
    let ticking = false;
    
    const parallaxElements = [
        { element: '.hero', speed: 0.5 },
        { element: '.floating-elements', speed: 0.3 },
        { element: '.before-after', speed: 0.2 }
    ];
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(({ element, speed }) => {
            const el = document.querySelector(element);
            if (el) {
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            }
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Mouse movement parallax for floating elements
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        document.querySelectorAll('.floating-icon').forEach((icon, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            
            icon.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// CRIART Modal Function
function showCriartModal() {
    const modal = document.createElement('div');
    modal.className = 'criart-modal';
    modal.innerHTML = `
        <div class="criart-modal-content">
            <div class="criart-modal-header">
                <h3>🎨 <span class="criart-brand-modal">CRIART</span> - Sua Parceira VIP</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="criart-modal-body">
                <div class="modal-hero">
                    <h4>🚀 PARABÉNS! Você escolheu trabalhar com os MELHORES!</h4>
                    <p>Você está a um clique de transformar seu negócio com a agência que já fez +5.000 empreendedores triplicarem suas vendas!</p>
                </div>
                
                <div class="modal-benefits">
                    <h5>✨ Como Cliente VIP CRIART, você recebe:</h5>
                    <div class="modal-benefit-list">
                        <div class="modal-benefit">
                            <i class="fas fa-crown"></i>
                            <span><strong>Atendimento VIP 24/7:</strong> Suporte exclusivo via WhatsApp</span>
                        </div>
                        <div class="modal-benefit">
                            <i class="fas fa-rocket"></i>
                            <span><strong>Implementação Express:</strong> Seus templates em menos de 2 horas</span>
                        </div>
                        <div class="modal-benefit">
                            <i class="fas fa-gift"></i>
                            <span><strong>Bônus Exclusivos:</strong> +20 templates extras só para você</span>
                        </div>
                        <div class="modal-benefit">
                            <i class="fas fa-chart-line"></i>
                            <span><strong>Consultoria Gratuita:</strong> Análise completa da sua estratégia</span>
                        </div>
                        <div class="modal-benefit">
                            <i class="fas fa-shield-alt"></i>
                            <span><strong>Garantia Estendida:</strong> 60 dias ao invés de 30</span>
                        </div>
                    </div>
                </div>
                
                <div class="modal-urgency">
                    <div class="urgency-text">
                        <h5>⚡ ATENÇÃO: Oferta VIP limitada!</h5>
                        <p>Apenas <strong>47 vagas</strong> restantes para o atendimento VIP CRIART este mês!</p>
                    </div>
                    <div class="modal-timer">
                        <div class="timer-label">Sua vaga expira em:</div>
                        <div class="modal-countdown">
                            <span class="countdown-number" id="modal-minutes">14</span>:
                            <span class="countdown-number" id="modal-seconds">59</span>
                        </div>
                    </div>
                </div>
                
                <div class="modal-cta">
                    <button class="cta-button criart-vip-btn">
                        <span class="cta-text">👑 GARANTIR MINHA VAGA VIP AGORA</span>
                        <span class="cta-subtext">Acesso imediato + Todos os bônus VIP</span>
                    </button>
                    <p class="modal-guarantee">🛡️ Garantia de 60 dias ou seu dinheiro de volta</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Start countdown timer
    startModalCountdown();
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    const vipBtn = modal.querySelector('.criart-vip-btn');
    
    closeBtn.addEventListener('click', () => modal.remove());
    vipBtn.addEventListener('click', () => {
        modal.remove();
        alert('🎉 PARABÉNS! Você garantiu sua vaga VIP na CRIART!\n\nEm produção, isso redirecionaria para o checkout VIP com todos os bônus inclusos.');
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    // Add modal styles
    const modalStyles = `
        .criart-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .criart-modal-content {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 25px;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            animation: slideInUp 0.4s ease;
            border: 3px solid #FFD700;
        }
        
        .criart-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 25px 30px;
            border-bottom: 2px solid rgba(255, 215, 0, 0.3);
        }
        
        .criart-brand-modal {
            background: linear-gradient(45deg, #FFD700, #FFA500);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 900;
            font-size: 1.5rem;
        }
        
        .criart-modal-body {
            padding: 30px;
        }
        
        .modal-hero {
            text-align: center;
            margin-bottom: 30px;
            background: rgba(255, 255, 255, 0.1);
            padding: 25px;
            border-radius: 15px;
        }
        
        .modal-hero h4 {
            font-size: 1.4rem;
            margin-bottom: 15px;
            color: #FFD700;
        }
        
        .modal-benefits {
            margin-bottom: 30px;
        }
        
        .modal-benefits h5 {
            font-size: 1.2rem;
            margin-bottom: 20px;
            color: #FFD700;
            text-align: center;
        }
        
        .modal-benefit-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .modal-benefit {
            display: flex;
            align-items: center;
            gap: 15px;
            background: rgba(255, 255, 255, 0.1);
            padding: 15px;
            border-radius: 10px;
        }
        
        .modal-benefit i {
            font-size: 1.2rem;
            color: #FFD700;
            min-width: 20px;
        }
        
        .modal-urgency {
            background: rgba(231, 76, 60, 0.2);
            border: 2px solid #e74c3c;
            padding: 20px;
            border-radius: 15px;
            margin-bottom: 30px;
            text-align: center;
        }
        
        .modal-urgency h5 {
            color: #FFD700;
            margin-bottom: 10px;
        }
        
        .modal-timer {
            margin-top: 15px;
        }
        
        .timer-label {
            font-size: 0.9rem;
            margin-bottom: 10px;
        }
        
        .modal-countdown {
            font-size: 2rem;
            font-weight: 900;
            color: #e74c3c;
        }
        
        .countdown-number {
            background: #e74c3c;
            color: white;
            padding: 5px 10px;
            border-radius: 8px;
            margin: 0 2px;
        }
        
        .modal-cta {
            text-align: center;
        }
        
        .criart-vip-btn {
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            color: #2c3e50;
            border: none;
            padding: 20px 40px;
            border-radius: 50px;
            font-weight: 900;
            cursor: pointer;
            transition: all 0.3s ease;
            animation: pulse-gold 2s ease-in-out infinite;
            margin-bottom: 15px;
        }
        
        .criart-vip-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(255, 215, 0, 0.6);
        }
        
        .modal-guarantee {
            font-size: 0.9rem;
            opacity: 0.9;
            margin: 0;
        }
        
        @keyframes slideInUp {
            from { 
                transform: translateY(50px);
                opacity: 0;
            }
            to { 
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    
    if (!document.getElementById('criart-modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'criart-modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }
}

// Modal Countdown Timer
function startModalCountdown() {
    let minutes = 14;
    let seconds = 59;
    
    const minutesEl = document.getElementById('modal-minutes');
    const secondsEl = document.getElementById('modal-seconds');
    
    const countdown = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(countdown);
                // Timer expired
                if (minutesEl) minutesEl.textContent = '00';
                if (secondsEl) secondsEl.textContent = '00';
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}
