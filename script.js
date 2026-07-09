// ============================================================================
// 1. THREE.JS: Hypnotic Infinite Loop DNA Ribbon Mesh (Mint Green Accents)
// ============================================================================
const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x02040a, 1);

const dnaGroup = new THREE.Group();
const particleCount = 450;
const geom1 = new THREE.BufferGeometry();
const geom2 = new THREE.BufferGeometry();

const positions1 = new Float32Array(particleCount * 3);
const positions2 = new Float32Array(particleCount * 3);

const mat1 = new THREE.PointsMaterial({ size: 0.04, color: 0x34d399, transparent: true, opacity: 0.25 });
const mat2 = new THREE.PointsMaterial({ size: 0.04, color: 0x0d9488, transparent: true, opacity: 0.2 });

const p1 = new THREE.Points(geom1, mat1);
const p2 = new THREE.Points(geom2, mat2);
dnaGroup.add(p1, p2);
scene.add(dnaGroup);

camera.position.z = 7;

const clock = new THREE.Clock();
const animate = () => {
    const time = clock.getElapsedTime();

    let ptr1 = 0;
    let ptr2 = 0;
    for (let i = 0; i < particleCount; i++) {
        const factor = (i / particleCount) * 16 - 8;
        
        const sinWave1 = Math.sin(factor + time * 1.2) * 1.3;
        const cosWave1 = Math.cos(factor + time * 1.2) * 1.3;

        positions1[ptr1++] = factor;
        positions1[ptr1++] = sinWave1;
        positions1[ptr1++] = cosWave1;

        positions2[ptr2++] = factor;
        positions2[ptr2++] = -sinWave1;
        positions2[ptr2++] = -cosWave1;
    }

    geom1.setAttribute('position', new THREE.BufferAttribute(positions1, 3));
    geom2.setAttribute('position', new THREE.BufferAttribute(positions2, 3));
    geom1.computeBoundingSphere();
    geom2.computeBoundingSphere();

    dnaGroup.rotation.y = time * 0.08;

    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
};
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ============================================================================
// 2. GSAP: Elegant Posh Left-Side Sliding Reveals
// ============================================================================
window.addEventListener('DOMContentLoaded', () => {
    const tl = gsap.timeline();
    tl.fromTo('#hero-name', { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 1.3, ease: 'power4.out' });
    tl.to('.left-slide', { x: 0, opacity: 1, duration: 1.0, stagger: 0.12, ease: 'power3.out' }, '-=0.9');
});

// ============================================================================
// 3. ADAPTIVE ACTIVE INTERACTION CROSSHAIR
// ============================================================================
const cursorOuter = document.getElementById('custom-cursor');
const cursorInner = document.getElementById('custom-cursor-dot');

window.addEventListener('mousemove', (e) => {
    gsap.to(cursorInner, { x: e.clientX, y: e.clientY, duration: 0.01 });
    gsap.to(cursorOuter, { x: e.clientX, y: e.clientY, duration: 0.2, ease: 'power2.out' });
});

document.querySelectorAll('a, button, input, textarea, .p-5, .p-6').forEach(elem => {
    elem.addEventListener('mouseenter', () => {
        gsap.to(cursorOuter, { width: 24, height: 24, borderColor: '#34d399', duration: 0.2 });
        gsap.to(elem, { borderColor: 'rgba(52, 211, 153, 0.4)', scale: 1.01, duration: 0.3 });
    });
    elem.addEventListener('mouseleave', () => {
        gsap.to(cursorOuter, { width: 14, height: 14, borderColor: 'rgba(52, 211, 153, 0.7)', duration: 0.2 });
        gsap.to(elem, { borderColor: '', scale: 1, duration: 0.3 });
    });
});

// ============================================================================
// 4. PREDICTIVE MARKOV CHAIN GAME MODEL RUNNER
// ============================================================================
let userWins = 0;
let aiWins = 0;
let matchHistory = [];

function playGame(userMove) {
    const choices = ['Rock', 'Paper', 'Scissors'];
    let prediction = choices[Math.floor(Math.random() * 3)];
    
    if (matchHistory.length > 2) {
        const lastMove = matchHistory[matchHistory.length - 1];
        if (lastMove === 'Rock') prediction = 'Paper';
        if (lastMove === 'Paper') prediction = 'Scissors';
        if (lastMove === 'Scissors') prediction = 'Rock';
    }
    
    matchHistory.push(userMove);
    let aiMove = prediction;
    let result = "";
    
    if (userMove === aiMove) {
        result = `Tie game! Both selected ${userMove}.`;
    } else if (
        (userMove === 'Rock' && aiMove === 'Scissors') ||
        (userMove === 'Paper' && aiMove === 'Rock') ||
        (userMove === 'Scissors' && aiMove === 'Paper')
    ) {
        userWins++;
        result = `You Win! Engine predicted ${aiMove}.`;
    } else {
        aiWins++;
        result = `AI Wins! Engine successfully predicted ${aiMove}.`;
    }
    
    document.getElementById('user-score').textContent = userWins;
    document.getElementById('ai-score').textContent = aiWins;
    document.getElementById('game-status').innerHTML = `<strong>${result}</strong>`;
}
