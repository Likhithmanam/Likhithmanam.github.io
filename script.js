/* ==========================================================================
   1. Dynamic 3D Particle & Wave Mesh Background (Three.js)
   ========================================================================== */
const initThreeBackground = () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle Wave Network Construction
    const count = 1800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const originalY = new Float32Array(count);

    let idx = 0;
    const xGrid = 60;
    const zGrid = 30;
    const spacing = 2.4;

    for (let i = 0; i < xGrid; i++) {
        for (let j = 0; j < zGrid; j++) {
            const x = (i - xGrid / 2) * spacing;
            const z = (j - zGrid / 2) * spacing;
            const y = Math.sin(i * 0.2) * 2 + Math.cos(j * 0.2) * 2;

            positions[idx * 3] = x;
            positions[idx * 3 + 1] = y;
            positions[idx * 3 + 2] = z;
            originalY[idx] = y;
            idx++;
        }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Generate circular particle texture
    const createParticleTexture = () => {
        const pCanvas = document.createElement('canvas');
        pCanvas.width = 64;
        pCanvas.height = 64;
        const ctx = pCanvas.getContext('2d');
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
        grad.addColorStop(0, 'rgba(52, 211, 153, 1)');
        grad.addColorStop(0.4, 'rgba(16, 185, 129, 0.6)');
        grad.addColorStop(1, 'rgba(11, 17, 30, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(32, 32, 30, 0, Math.PI * 2);
        ctx.fill();
        return new THREE.CanvasTexture(pCanvas);
    };

    const material = new THREE.PointsMaterial({
        size: 1.4,
        map: createParticleTexture(),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    particles.rotation.x = 0.55;
    scene.add(particles);

    // Mouse tracking for dynamic 3D camera parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Clock for wave oscillation
    const clock = new THREE.Clock();

    const animate = () => {
        const time = clock.getElapsedTime();
        const pos = geometry.attributes.position.array;

        for (let i = 0; i < count; i++) {
            const ix = pos[i * 3];
            const iz = pos[i * 3 + 2];
            pos[i * 3 + 1] = originalY[i] + Math.sin(time * 1.5 + ix * 0.15 + iz * 0.1) * 2.8;
        }
        geometry.attributes.position.needsUpdate = true;

        // Smooth camera dampening
        targetX += (mouseX * 8 - targetX) * 0.05;
        targetY += (-mouseY * 8 - targetY) * 0.05;
        camera.position.x = targetX;
        camera.position.y = targetY + 12;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

/* ==========================================================================
   2. Smooth Custom Cursor
   ========================================================================== */
const initCustomCursor = () => {
    const cursor = document.getElementById('custom-cursor');
    const dot = document.getElementById('custom-cursor-dot');
    if (!cursor || !dot) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    const render = () => {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
        requestAnimationFrame(render);
    };
    render();

    // Hover scale effects
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .tilt-card');
    interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
};

/* ==========================================================================
   3. 3D Card Hover Tilt Dynamics
   ========================================================================== */
const initCardTilt = () => {
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotateX = -(y / rect.height) * 10;
            const rotateY = (x / rect.width) * 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        });
    });
};

/* ==========================================================================
   4. GSAP Scroll & Entrance Animations
   ========================================================================== */
const initGSAPAnimations = () => {
    if (typeof gsap === 'undefined') return;
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    gsap.utils.toArray('.gs-reveal').forEach((elem) => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: 'top 88%',
                toggleActions: 'play none none none'
            },
            y: 35,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out'
        });
    });
};

/* ==========================================================================
   5. Interactive Lab 1: Markov Chain Rock-Paper-Scissors
   ========================================================================== */
const choices = ['Rock', 'Paper', 'Scissors'];
const winsAgainst = { Rock: 'Scissors', Paper: 'Rock', Scissors: 'Paper' };
const losesTo = { Rock: 'Paper', Paper: 'Scissors', Scissors: 'Rock' };

// Transition frequency matrix: [prevMove][nextMove]
const markovChain = {
    Rock: { Rock: 1, Paper: 1, Scissors: 1 },
    Paper: { Rock: 1, Paper: 1, Scissors: 1 },
    Scissors: { Rock: 1, Paper: 1, Scissors: 1 }
};

let lastUserMove = null;
let userScore = 0;
let aiScore = 0;

window.playGame = (userMove) => {
    let aiPredict = 'Rock';

    if (lastUserMove) {
        const trans = markovChain[lastUserMove];
        if (trans.Paper > trans.Rock && trans.Paper > trans.Scissors) {
            aiPredict = 'Paper';
        } else if (trans.Scissors > trans.Rock && trans.Scissors > trans.Paper) {
            aiPredict = 'Scissors';
        } else {
            aiPredict = 'Rock';
        }
        markovChain[lastUserMove][userMove]++;
    } else {
        aiPredict = choices[Math.floor(Math.random() * choices.length)];
    }

    const aiMove = losesTo[aiPredict];
    lastUserMove = userMove;

    const status = document.getElementById('game-status');
    const userScoreEl = document.getElementById('user-score');
    const aiScoreEl = document.getElementById('ai-score');

    if (userMove === aiMove) {
        status.innerHTML = `<span class="text-amber-400">Draw!</span> Both chose ${userMove}. AI predicted ${aiPredict}.`;
    } else if (winsAgainst[userMove] === aiMove) {
        userScore++;
        userScoreEl.textContent = userScore;
        status.innerHTML = `<span class="text-emerald-400 font-bold">You Won!</span> ${userMove} beats ${aiMove}.`;
    } else {
        aiScore++;
        aiScoreEl.textContent = aiScore;
        status.innerHTML = `<span class="text-rose-400 font-bold">AI Won!</span> Countered with ${aiMove} based on Markov model.`;
    }
};

/* ==========================================================================
   6. Interactive Lab 2: Data Sequence Anomaly Puzzle
   ========================================================================== */
let puzzleScore = 0;
const initAnomalyPuzzle = () => {
    const container = document.getElementById('sequence-container');
    const scoreEl = document.getElementById('puzzle-score');
    if (!container) return;

    container.innerHTML = '';
    const start = Math.floor(Math.random() * 10) + 2;
    const diff = Math.floor(Math.random() * 6) + 3;
    const length = 5;
    const anomalyIndex = Math.floor(Math.random() * length);

    const seq = [];
    for (let i = 0; i < length; i++) {
        if (i === anomalyIndex) {
            seq.push(start + i * diff + (Math.random() > 0.5 ? 4 : -3));
        } else {
            seq.push(start + i * diff);
        }
    }

    seq.forEach((val, idx) => {
        const btn = document.createElement('button');
        btn.className = 'px-4 py-2.5 bg-slate-800 border border-slate-700 hover:border-brand-400 text-white font-mono font-bold rounded-xl text-xs transition-all duration-200';
        btn.textContent = val;
        btn.onclick = () => {
            if (idx === anomalyIndex) {
                puzzleScore += 10;
                scoreEl.textContent = puzzleScore;
                btn.className = 'px-4 py-2.5 bg-emerald-600 text-white font-mono font-bold rounded-xl text-xs animate-bounce';
                setTimeout(initAnomalyPuzzle, 700);
            } else {
                btn.className = 'px-4 py-2.5 bg-rose-600 text-white font-mono font-bold rounded-xl text-xs';
            }
        };
        container.appendChild(btn);
    });
};

/* ==========================================================================
   7. Form Submission Handler
   ========================================================================== */
window.handleFormSubmit = (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const origText = btn.textContent;
    btn.textContent = 'TRANSMISSION RECEIVED ✓';
    btn.classList.add('bg-emerald-400');
    setTimeout(() => {
        btn.textContent = origText;
        btn.classList.remove('bg-emerald-400');
        e.target.reset();
    }, 3000);
};

/* ==========================================================================
   Bootstrap Lifecycle
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    initThreeBackground();
    initCustomCursor();
    initCardTilt();
    initGSAPAnimations();
    initAnomalyPuzzle();
});
