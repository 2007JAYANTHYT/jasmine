// Initialize Lenis for Smooth Scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
});

// Preloader & Entry Logic
document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enter-btn');
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    
    // Background Audio setup (Assuming there's an audio file, using a placeholder logic for now. User can add real audio later)
    // For real implementation: const audio = new Audio('path_to_romantic_song.mp3');
    // audio.loop = true;

    enterBtn.addEventListener('click', () => {
        // Fade out preloader
        preloader.style.opacity = '0';
        
        setTimeout(() => {
            preloader.style.display = 'none';
            mainContent.style.display = 'block';
            
            // Refresh AOS and ScrollTrigger after content is visible
            AOS.refresh();
            ScrollTrigger.refresh();
            
            // Start audio if added
            // audio.play();
            // document.getElementById('audio-toggle').classList.add('playing');
        }, 1000);
    });

    // Create floating hearts background
    createFloatingHearts();
});

// Audio Toggle Logic
const audioBtn = document.getElementById('audio-toggle');
let isPlaying = false;
audioBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    if(isPlaying) {
        audioBtn.classList.add('playing');
        audioBtn.innerHTML = '<span class="audio-icon">🎶</span>';
        // audio.play();
    } else {
        audioBtn.classList.remove('playing');
        audioBtn.innerHTML = '<span class="audio-icon">🎵</span>';
        // audio.pause();
    }
});

// Floating Hearts Background Animation
function createFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    const heartCount = 30;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.opacity = Math.random() * 0.3 + 0.1;
        heart.style.filter = 'blur(2px)';
        heart.style.zIndex = '-1';
        container.appendChild(heart);

        animateHeart(heart);
    }
}

function animateHeart(heart) {
    const duration = Math.random() * 10000 + 10000;
    
    anime({
        targets: heart,
        translateY: [0, -window.innerHeight - 100],
        translateX: () => anime.random(-50, 50),
        rotate: () => anime.random(-360, 360),
        duration: duration,
        easing: 'linear',
        loop: true,
        delay: Math.random() * 5000
    });
}

// Countdown Timer Logic
const targetDate = luxon.DateTime.fromISO('2026-05-16T00:00:00');

function updateCountdown() {
    const now = luxon.DateTime.now();
    let diff = targetDate.diff(now, ['days', 'hours', 'minutes', 'seconds']);
    
    // If birthday passed this year, set to next year
    if (diff.toMillis() < 0) {
        diff = luxon.DateTime.fromISO((now.year + 1) + '-05-16T00:00:00').diff(now, ['days', 'hours', 'minutes', 'seconds']);
    }

    document.getElementById('days').innerText = Math.floor(diff.days).toString().padStart(2, '0');
    document.getElementById('hours').innerText = Math.floor(diff.hours).toString().padStart(2, '0');
    document.getElementById('minutes').innerText = Math.floor(diff.minutes).toString().padStart(2, '0');
    document.getElementById('seconds').innerText = Math.floor(diff.seconds).toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Quotes Carousel Logic
const slides = document.querySelectorAll('.quote-card');
const dotsContainer = document.getElementById('quote-dots');
const prevBtn = document.getElementById('quote-prev');
const nextBtn = document.getElementById('quote-next');
let currentSlide = 0;

// Create dots
slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

// Auto slide
setInterval(() => {
    goToSlide(currentSlide + 1);
}, 5000);

// Reveal Reasons Logic
function revealReason(element) {
    if (!element.classList.contains('revealed')) {
        element.classList.add('revealed');
        
        // Small pop animation
        anime({
            targets: element,
            scale: [0.95, 1],
            duration: 800,
            elasticity: 400
        });

        // Use SweetAlert for a nice popup
        const textEn = element.querySelector('.reason-back p').innerText;
        const textTe = element.querySelector('.reason-back span.telugu-small').innerText;
        const emoji = element.querySelector('.reason-back span').innerText;

        Swal.fire({
            title: emoji,
            html: `<b>${textEn}</b><br><br><span style="color: #ff4d6d; font-family: 'Inter', sans-serif;">${textTe}</span>`,
            confirmButtonText: 'Aww 💕',
            confirmButtonColor: '#ff4d6d',
            background: 'rgba(20, 10, 15, 0.95)',
            color: '#fff',
            backdrop: `rgba(0,0,0,0.8)`
        });
    }
}

// Confetti & Fire Burn Logic
function launchConfetti() {
    const btn = document.getElementById('confetti-btn');
    btn.style.display = 'none';
    
    // 1. Trigger the dark fire burn effect
    document.body.classList.add('fire-burn-active');
    
    // 2. Wait for burn effect to finish
    setTimeout(() => {
        // Hide main content, show new wishes page
        document.querySelector('main').style.display = 'none';
        document.body.style.display = 'block';
        document.body.classList.remove('fire-burn-active');
        
        const newPage = document.getElementById('new-wishes-page');
        newPage.style.display = 'flex';
        
        // Force a reflow, then add visible class to fade it in beautifully
        void newPage.offsetWidth;
        newPage.classList.add('visible');
        
        window.scrollTo(0,0);
        
        // Re-initialize scratch card since it changed containers
        initScratchCard();
        
        // Launch subtle elegant confetti over the new page
        createConfettiParticles();
    }, 2000);
}

function createConfettiParticles() {
    const colors = ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffffff', '#ffd166'];
    const container = document.getElementById('new-wishes-page');
    for(let i = 0; i < 150; i++) {
        const confetto = document.createElement('div');
        confetto.style.position = 'absolute';
        confetto.style.width = Math.random() * 10 + 5 + 'px';
        confetto.style.height = Math.random() * 20 + 5 + 'px';
        confetto.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetto.style.left = Math.random() * 100 + 'vw';
        confetto.style.top = '-20px';
        confetto.style.zIndex = '9999';
        confetto.style.pointerEvents = 'none';
        
        if(Math.random() > 0.5) confetto.style.borderRadius = '50%';
        
        container.appendChild(confetto);
        
        anime({
            targets: confetto,
            top: window.innerHeight + 20,
            left: '+=' + (Math.random() * 200 - 100),
            rotateX: Math.random() * 720,
            rotateY: Math.random() * 720,
            rotateZ: Math.random() * 720,
            duration: Math.random() * 2000 + 3000,
            easing: 'easeOutCubic',
            complete: function(anim) {
                confetto.remove();
            }
        });
    }
}

// Three.js Background Setup (Subtle particles)
function initThreeJS() {
    const canvas = document.getElementById('bg-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 700;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10; // Spread
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Circle texture for particles
    const circleTexture = new THREE.TextureLoader().load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='); // tiny white dot

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        map: circleTexture,
        transparent: true,
        opacity: 0.5,
        color: 0xff758f,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 3;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });

    // Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        particlesMesh.rotation.y = -elapsedTime * 0.05;
        particlesMesh.rotation.x = elapsedTime * 0.02;

        // Subtle mouse interaction
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;

        renderer.render(scene, camera);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

initThreeJS();

// GSAP Animations for specific elements
gsap.registerPlugin(ScrollTrigger);

// Parallax for Hero
gsap.to('.hero-title', {
    y: 100,
    opacity: 0.2,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// Timeline line drawing
gsap.from('.timeline::after', {
    height: 0,
    ease: "none",
    scrollTrigger: {
        trigger: ".timeline",
        start: "top center",
        end: "bottom center",
        scrub: true
    }
});

// ==========================================
// ADVANCED FEATURES: Scratch Card
// ==========================================
function initScratchCard() {
    const canvas = document.getElementById('scratch-card');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match container
    canvas.width = 350;
    canvas.height = 250;

    // Fill with a nice cover
    ctx.fillStyle = '#ff4d6d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add some text on top
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch Here', canvas.width/2, canvas.height/2);

    let isDrawing = false;

    function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (e.clientX || e.touches[0].clientX) - rect.left,
            y: (e.clientY || e.touches[0].clientY) - rect.top
        };
    }

    function scratch(e) {
        if (!isDrawing) return;
        e.preventDefault();
        const pos = getMousePos(e);
        
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2);
        ctx.fill();
    }

    canvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(e); });
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseleave', () => isDrawing = false);

    // Touch support
    canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, {passive: false});
    canvas.addEventListener('touchmove', scratch, {passive: false});
    canvas.addEventListener('touchend', () => isDrawing = false);
}
initScratchCard();

// ==========================================
// ADVANCED FEATURES: Mouse Trail (Sparkles)
// ==========================================
function initMouseTrail() {
    const canvas = document.getElementById('mouse-trail');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    const colors = ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffffff'];

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    document.addEventListener('mousemove', (e) => {
        if(Math.random() > 0.5) { // don't spawn every single frame
            particles.push({
                x: e.clientX,
                y: e.clientY,
                r: Math.random() * 4 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: 1.0
            });
        }
    });

    function animateTrail() {
        ctx.clearRect(0, 0, width, height);
        for(let i = 0; i < particles.length; i++) {
            let p = particles[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            // Convert hex color to rgba for fading effect
            let hex = p.color;
            let r = parseInt(hex.slice(1,3), 16);
            let g = parseInt(hex.slice(3,5), 16);
            let b = parseInt(hex.slice(5,7), 16);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.life})`;
            ctx.fill();

            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.02; // fade out speed
            
            if(p.life <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(animateTrail);
    }
    animateTrail();
}
initMouseTrail();

// ==========================================
// ADVANCED FEATURES: 3D Tilt Effect on Gallery
// ==========================================
document.querySelectorAll('.gallery-img').forEach(img => {
    img.addEventListener('mousemove', (e) => {
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;

        img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    img.addEventListener('mouseleave', () => {
        img.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    });
});

// ==========================================
// ADVANCED FEATURES: Love Heart Click Ripple
// ==========================================
document.addEventListener('click', (e) => {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.left = (e.clientX - 10) + 'px';
    heart.style.top = (e.clientY - 10) + 'px';
    heart.style.fontSize = '20px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.textShadow = '0 0 10px #ff4d6d';
    document.body.appendChild(heart);

    anime({
        targets: heart,
        translateY: -100,
        scale: [1, 3],
        opacity: [1, 0],
        duration: 1500,
        easing: 'easeOutExpo',
        complete: () => heart.remove()
    });
});

