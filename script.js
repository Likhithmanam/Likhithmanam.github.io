// ===================================================
// 1. THREE.JS: Slow-Motion Particle Double Helix (DNA)
// ===================================================
const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Group to house all individual strand structures
const dnaGroup = new THREE.Group();

const numPoints = 180; 
const radius = 1.8;
const helixLength = 9.0;
const strandsGeometry1 = new THREE.BufferGeometry();
const strandsGeometry2 = new THREE.BufferGeometry();
const linksGeometry = new THREE.BufferGeometry();

const posArray1 = [];
const posArray2 = [];
const linksPositions = [];

for (let i = 0; i < numPoints; i++) {
    // Generate mathematical parametric coordinates along vertical projection
    const t = (i / numPoints) * Math.PI * 7; 
    const y = (i / numPoints) * helixLength - (helixLength / 2);
    
    const x1 = Math.cos(t) * radius;
    const z1 = Math.sin(t) * radius;
    
    // Invert phase vectors by exactly 180 degrees to craft the reciprocal strand
    const x2 = Math.cos(t + Math.PI) * radius;
    const z2 = Math.sin(t + Math.PI) * radius;

    posArray1.push(x1, y, z1);
    posArray2.push(x2, y, z2);

    // Build bridging baseline rungs intermittently
    if (i % 3 === 0) {
        linksPositions.push(x1, y, z1);
        linksPositions.push(x2, y, z2);
    }
}

strandsGeometry1.setAttribute('position', new THREE.Float32BufferAttribute(posArray1, 3));
strandsGeometry2.setAttribute('position', new THREE.Float32BufferAttribute(posArray2, 3));
linksGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linksPositions, 3));

// Styled node textures
const materialStrand1 = new THREE.PointsMaterial({ size: 0.04, color: '#818cf8', transparent: true, opacity: 0.8 });
const materialStrand2 = new THREE.PointsMaterial({ size: 0.04, color: '#f472b6', transparent: true, opacity: 0.8 });
const materialLinks = new THREE.LineBasicMaterial({ color: '#4b5563', transparent: true, opacity: 0.25 });

const points1 = new THREE.Points(strandsGeometry1, materialStrand1);
const points2 = new THREE.Points(strandsGeometry2, materialStrand2);
const lines = new THREE.LineSegments(linksGeometry, materialLinks);

dnaGroup.add(points1, points2, lines);
scene.add(dnaGroup);

// Position model out towards right view bounds on wide monitors
if(window.innerWidth > 768) {
    dnaGroup.position.x = 2.0;
}
camera.position.z = 6;

// Animation Loop: Hyper-smooth, slow-motion rotation and float vectors
const clock = new THREE.Clock();
const animate = () => {
    const elapsedTime = clock.getElapsedTime();
    
    // Slow rotational velocity metrics
    dnaGroup.rotation.y = elapsedTime * 0.12;
    dnaGroup.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1;
    
    // Subtle float oscillation variance
    dnaGroup.position.y = Math.sin(elapsedTime * 0.3) * 0.15;

    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
};
animate();

// Handle cross-device resizing configurations 
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    dnaGroup.position.x = window.innerWidth > 768 ? 2.0 : 0.0;
});

// ===================================================
// 2. GSAP: Entrance Presentation Layout Tweaks
// ===================================================
window.addEventListener('DOMContentLoaded', () => {
    gsap.to('.hero-reveal', {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power4.out',
        delay: 0.1
    });
});

// ===================================================
// 3. CURSOR: Spotlight Tracking Adjustments
// ===================================================
const cursorGlow = document.getElementById('custom-cursor');
window.addEventListener('mousemove', (e) => {
    gsap.to(cursorGlow, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: 'power3.out'
    });
});

// Expand cursor spotlight footprint over critical links/cards
document.querySelectorAll('a, .project-card, .grid > div').forEach(target => {
    target.addEventListener('mouseenter', () => {
        cursorGlow.style.width = '600px';
        cursorGlow.style.height = '600px';
    });
    target.addEventListener('mouseleave', () => {
        cursorGlow.style.width = '450px';
        cursorGlow.style.height = '450px';
    });
});

// ===================================================
// 4. PARALLAX: 3D Inertial Tilting Card Triggers
// ===================================================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const bounds = card.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left - (bounds.width / 2);
        const mouseY = e.clientY - bounds.top - (bounds.height / 2);
        
        const degreesX = (mouseY / (bounds.height / 2)) * -8;
        const degreesY = (mouseX / (bounds.width / 2)) * 8;

        gsap.to(card, {
            rotateX: degreesX,
            rotateY: degreesY,
            scale: 1.01,
            duration: 0.2,
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power3.out'
        });
    });
});
