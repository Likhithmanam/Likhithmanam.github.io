// ============================================================================
// 1. THREE.JS: Smash Hit Accurate Horizon Atmosphere & Glass Helix
// ============================================================================
const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
    }
`;

const fragmentShader = `
    varying vec2 vUv;
    void main() {
        vec3 topColor = vec3(0.021, 0.027, 0.055); 
        vec3 bottomColor = vec3(0.95, 0.75, 0.55); 
        vec3 finalGlow = mix(bottomColor, topColor, vUv.y);
        gl_FragColor = vec4(finalGlow, 1.0);
    }
`;

const bgGeometry = new THREE.PlaneGeometry(2, 2);
const bgMaterial = new THREE.ShaderMaterial({ vertexShader, fragmentShader, depthWrite: false });
const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
scene.add(bgMesh);

const tunnelGroup = new THREE.Group();
const segments = 60;
const rings = 6;
const radius = 3.0;
const tunnelGeometry = new THREE.BufferGeometry();
const pointsArray = [];

for (let i = 0; i < segments; i++) {
    const z = (i / segments) * 40 - 20;
    const twistAngle = (i / segments) * Math.PI * 4.5; 
    
    for (let j = 0; j < rings; j++) {
        const rad = (j / rings) * Math.PI * 2 + twistAngle;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        pointsArray.push(x, y, z);
    }
}

const indices = [];
for (let i = 0; i < segments - 1; i++) {
    for (let j = 0; j < rings; j++) {
        const curr = i * rings + j;
        const nextRing = (i + 1) * rings + j;
        const nextPoint = i * rings + ((j + 1) % rings);
        indices.push(curr, nextRing, curr, nextPoint);
    }
}

tunnelGeometry.setAttribute('position', new THREE.Float32BufferAttribute(pointsArray, 3));
tunnelGeometry.setIndex(indices);

const linesMaterial = new THREE.LineBasicMaterial({
    color: 0x22c55e,
    transparent: true,
    opacity: 0.12
});

const tunnelMesh = new THREE.LineSegments(tunnelGeometry, linesMaterial);
tunnelGroup.add(tunnelMesh);
scene.add(tunnelGroup);
camera.position.z = 8;

let speedTarget = 0.015;
let speedCurrent = 0.015;

window.addEventListener('scroll', () => {
    speedTarget = 0.06;
    setTimeout(() => { speedTarget = 0.015; }, 100);
});

const clock = new THREE.Clock();
const animate = () => {
    const elapsed = clock.getElapsedTime();
    speedCurrent += (speedTarget - speedCurrent) * 0.08;
    
    tunnelGroup.rotation.z = elapsed * 0.04;
    tunnelMesh.position.z += speedCurrent;
    
    if (tunnelMesh.position.z > 0.6) tunnelMesh.position.z = 0;

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
    // Sliding name and titles gracefully out from the left viewport boundary
    tl.fromTo('#hero-name', { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 1.3, ease: 'power4.out' });
    tl.to('.left-slide', { x: 0, opacity: 1, duration: 1.0, stagger: 0.12, ease: 'power3.out' }, '-=0.9');
    tl.to('.timeline-item', { opacity: 1, duration: 0.6 }, '-=0.4');
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

document.querySelectorAll('a, button, input, textarea, .p-5').forEach(elem => {
    elem.addEventListener('mouseenter', () => {
        gsap.to(cursorOuter, { width: 26, height: 26, borderColor: '#10b981', duration: 0.2 });
    });
    elem.addEventListener('mouseleave', () => {
        gsap.to(cursorOuter, { width: 16, height: 16, borderColor: 'rgba(16, 185, 129, 0.6)', duration: 0.2 });
    });
});

// ============================================================================
// 4. PREDICTIVE MARKOV CHAIN GAME MODEL RUNNER
// ============================================================================
let userWins = 0;
let aiWins = 0;
let history = [];

function playGame(userMove) {
    const choices = ['Rock', 'Paper', 'Scissors'];
    let prediction = choices[Math.floor(Math.random() * 3)];
    
    // Simplistic predictive lookback tracking array state patterns
    if (history.length > 2) {
        const lastMove = history[history.length - 1];
        if (lastMove === 'Rock') prediction = 'Paper';
        if (lastMove === 'Paper') prediction = 'Scissors';
        if (lastMove === 'Scissors') prediction = 'Rock';
    }
    
    history.push(userMove);
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
