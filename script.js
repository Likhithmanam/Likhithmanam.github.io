// ==========================================
// 1. THREE.JS: Continuous Particle Ecosystem
// ==========================================
const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Generate particle fields scattered randomly
const particlesCount = 1500;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 6;
}

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Styled interactive points
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.015,
    color: '#818cf8',
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);
camera.position.z = 2;

// Persistent frame request rotation loop
const clock = new THREE.Clock();
const animateBg = () => {
    const elapsedTime = clock.getElapsedTime();
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = elapsedTime * 0.02;
    
    renderer.render(scene, camera);
    window.requestAnimationFrame(animateBg);
};
animateBg();

// Handle responsive window adjustments
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


// ==========================================
// 2. GSAP: Elegant Page Entrance Transitions
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    gsap.to('.hero-reveal', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.2
    });
});


// ==========================================
// 3. CURSOR: Magnetic Tracking & Interactive Glow
// ==========================================
const cursorGlow = document.getElementById('custom-cursor');

window.addEventListener('mousemove', (e) => {
    gsap.to(cursorGlow, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out'
    });
});

// Expand cursor spotlight radius when hovering clickables
document.querySelectorAll('a, button, .project-card').forEach(elem => {
    elem.addEventListener('mouseenter', () => {
        cursorGlow.style.width = '550px';
        cursorGlow.style.height = '550px';
    });
    elem.addEventListener('mouseleave', () => {
        cursorGlow.style.width = '400px';
        cursorGlow.style.height = '400px';
    });
});


// ==========================================
// 4. INTERACTION: Smooth 3D Hover Tilt 
// ==========================================
const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - (rect.width / 2);
        const y = e.clientY - rect.top - (rect.height / 2);
        
        // Form mathematical boundaries mapping coordinate to degree angles
        const tiltX = (y / (rect.height / 2)) * -10;
        const tiltY = (x / (rect.width / 2)) * 10;

        gsap.to(card, {
            rotateX: tiltX,
            rotateY: tiltY,
            transformPerspective: 1000,
            scale: 1.02,
            duration: 0.2,
            ease: 'power1.out'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});
