/* Posh Typography Layout Configurations */
.font-heading, font-serif {
    font-family: 'Cinzel', Georgia, serif;
    letter-spacing: -0.01em;
}

body {
    font-family: 'Montserrat', Helvetica, sans-serif;
    letter-spacing: -0.01em;
}

/* Clearer High-Contrast Text Adjustments inside Cards */
.highlight-card p, .project-card p, .edu-card p, .motion-card p {
    font-weight: 500 !important;
    line-height: 1.6;
}

/* Bold Structural Typography Focus Elements */
.highlight-word {
    font-weight: 700 !important;
    color: #047857 !important;
    background-color: rgba(5, 150, 105, 0.05);
    padding: 0 6px;
    border-radius: 4px;
    box-shadow: 0px 2px 5px rgba(5, 150, 105, 0.04);
}

.motion-card {
    box-shadow: 0 4px 20px -2px rgba(148, 163, 184, 0.12);
    transform-style: preserve-3d;
    backface-visibility: hidden;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Continuous Elegant Waves for Headings & Text Elements */
.continuous-wave-title span {
    display: inline-block;
    animation: luxuriousWave 4s infinite ease-in-out;
}

.continuous-text-pulse {
    animation: luxuryPulse 3.5s infinite ease-in-out;
    display: inline-block;
}

@keyframes luxuriousWave {
    0%, 100% { transform: translateY(0) scale(1); filter: blur(0px); }
    50% { transform: translateY(-3px) scale(1.015); text-shadow: 0 10px 20px rgba(5, 150, 105, 0.12); }
}

@keyframes luxuryPulse {
    0%, 100% { transform: scale(1); opacity: 0.95; text-shadow: none; }
    50% { transform: scale(1.02); opacity: 1; color: #047857; text-shadow: 0 4px 12px rgba(5, 150, 105, 0.1); }
}

.sub-heading-glow {
    transition: color 0.3s ease, letter-spacing 0.3s ease;
}
.sub-heading-glow:hover, *:hover > .sub-heading-glow {
    color: #047857 !important;
    letter-spacing: 0.08em;
}

.tracking-pulse {
    animation: textPulse 3s infinite ease-in-out;
}

@keyframes textPulse {
    0%, 100% { letter-spacing: 0.1em; opacity: 0.8; }
    50% { letter-spacing: 0.15em; opacity: 1; }
}

/* Kinetic Grid Shifting Overlays */
.content-block {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease;
}
.content-block:hover {
    transform: translateY(-6px) scale(1.01) rotateX(1deg);
    box-shadow: 0 25px 45px -15px rgba(5, 150, 105, 0.18);
    border-color: rgba(5, 150, 105, 0.35) !important;
}

.tag-item {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.tag-item:hover {
    background-color: #ecfdf5 !important;
    color: #059669 !important;
    transform: scale(1.06) translateZ(12px);
    box-shadow: 0 5px 15px rgba(5, 150, 105, 0.1);
}

/* Tight performance animated cross-hair elements */
#custom-cursor {
    position: fixed;
    top: 0;
    left: 0;
    width: 14px;
    height: 14px;
    border: 1.5px solid #059669;
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 9999;
    will-change: transform;
    transition: width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

#custom-cursor-dot {
    position: fixed;
    top: 0;
    left: 0;
    width: 4px;
    height: 4px;
    background-color: #059669;
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 10000;
    will-change: transform;
}

.layout-container { perspective: 1200px; }    display: inline-block;
    animation: luxuriousWave 4s infinite ease-in-out;
}

.continuous-text-pulse {
    animation: luxuryPulse 3.5s infinite ease-in-out;
    display: inline-block;
}

@keyframes luxuriousWave {
    0%, 100% { transform: translateY(0) scale(1); filter: blur(0px); }
    50% { transform: translateY(-3px) scale(1.015); text-shadow: 0 10px 20px rgba(5, 150, 105, 0.12); }
}

@keyframes luxuryPulse {
    0%, 100% { transform: scale(1); opacity: 0.95; text-shadow: none; }
    50% { transform: scale(1.02); opacity: 1; color: #047857; text-shadow: 0 4px 12px rgba(5, 150, 105, 0.1); }
}

.sub-heading-glow {
    transition: color 0.3s ease, letter-spacing 0.3s ease;
}
.sub-heading-glow:hover, *:hover > .sub-heading-glow {
    color: #047857 !important;
    letter-spacing: 0.08em;
}

.tracking-pulse {
    animation: textPulse 3s infinite ease-in-out;
}

@keyframes textPulse {
    0%, 100% { letter-spacing: 0.1em; opacity: 0.8; }
    50% { letter-spacing: 0.15em; opacity: 1; }
}

/* Kinetic Grid Shifting Overlays */
.content-block {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease;
}
.content-block:hover {
    transform: translateY(-6px) scale(1.01) rotateX(1deg);
    box-shadow: 0 25px 45px -15px rgba(5, 150, 105, 0.18);
    border-color: rgba(5, 150, 105, 0.35) !important;
}

.tag-item {
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.tag-item:hover {
    background-color: #ecfdf5 !important;
    color: #059669 !important;
    transform: scale(1.06) translateZ(12px);
    box-shadow: 0 5px 15px rgba(5, 150, 105, 0.1);
}

/* Tight performance animated cross-hair elements */
#custom-cursor {
    position: fixed;
    top: 0;
    left: 0;
    width: 14px;
    height: 14px;
    border: 1.5px solid #059669;
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 9999;
    will-change: transform;
    transition: width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

#custom-cursor-dot {
    position: fixed;
    top: 0;
    left: 0;
    width: 4px;
    height: 4px;
    background-color: #059669;
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 10000;
    will-change: transform;
}

.layout-container { perspective: 1200px; }
