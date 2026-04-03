/**
 * Organic Bubble Particle System - FIXED MOUSE TRACKING
 * Clean, aesthetic bubbles with smooth floating animation
 * Performance: 60fps strict, simplified rendering
 * 
 * @version 1.2.0 - Mouse tracking FIXED
 */

class OrganicBubbles {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container #${containerId} not found`);
            return;
        }

        // Configuration
        this.config = {
            maxParticles: options.maxParticles || 50,
            minSize: options.minSize || 15,
            maxSize: options.maxSize || 30,
            speed: options.speed || 0.2,
            mouseRepelRadius: options.mouseRepelRadius || 180,
            mouseRepelForce: options.mouseRepelForce || 4,
            ...options
        };

        // State
        this.particles = [];
        this.mouse = { x: -9999, y: -9999 };
        this.animationId = null;
        this.canvas = null;
        this.ctx = null;
        this.lastFrameTime = 0;
        this.containerRect = null;

        // Bind methods
        this.animate = this.animate.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleResize = this.handleResize.bind(this);

        // Initialize
        this.init();
    }

    init() {
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;

        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d', { alpha: true });

        // Set canvas size
        this.resize();

        // Create particles
        this.createParticles();

        // Event listeners - FIXED: listen on hero-section parent
        const heroSection = this.container.closest('.hero-section');
        if (heroSection) {
            heroSection.addEventListener('mousemove', this.handleMouseMove, { passive: true });
            heroSection.addEventListener('touchmove', (e) => {
                if (e.touches.length > 0) {
                    this.updateMouseFromEvent(e.touches[0]);
                }
            }, { passive: true });
            heroSection.addEventListener('mouseleave', () => {
                this.mouse.x = -9999;
                this.mouse.y = -9999;
                console.log('Mouse left hero section');
            });
            heroSection.addEventListener('touchend', () => {
                this.mouse.x = -9999;
                this.mouse.y = -9999;
            });
            console.log('Event listeners attached to hero-section');
        } else {
            console.warn('Hero section not found, attaching to container');
            this.container.addEventListener('mousemove', this.handleMouseMove, { passive: true });
        }
        
        window.addEventListener('resize', this.handleResize, { passive: true });

        // Start animation
        this.animate();
    }

    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.containerRect = rect;
        console.log('Canvas resized:', rect.width, 'x', rect.height);
    }

    handleResize() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.resize();
            this.createParticles();
        }, 200);
    }

    updateMouseFromEvent(e) {
        // Get fresh container position
        const rect = this.container.getBoundingClientRect();
        
        // Calculate relative position
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
        
        console.log('Mouse updated:', this.mouse.x.toFixed(0), this.mouse.y.toFixed(0));
    }

    handleMouseMove(e) {
        this.updateMouseFromEvent(e);
    }

    getParticleColor() {
        return getComputedStyle(document.documentElement)
            .getPropertyValue('--particle-color').trim();
    }

    createParticles() {
        this.particles = [];
        
        // Responsive particle count
        const width = this.canvas.width;
        let count = this.config.maxParticles;
        
        if (width < 576) {
            count = Math.floor(count * 0.4); // 20 on mobile
        } else if (width < 992) {
            count = Math.floor(count * 0.6); // 30 on tablet
        }

        for (let i = 0; i < count; i++) {
            this.particles.push(this.createParticle());
        }
        
        console.log('Created', this.particles.length, 'particles');
    }

    createParticle() {
        const size = this.config.minSize + Math.random() * (this.config.maxSize - this.config.minSize);
        
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            size: size,
            baseSize: size,
            vx: (Math.random() - 0.5) * this.config.speed,
            vy: (Math.random() - 0.5) * this.config.speed,
            angle: Math.random() * Math.PI * 2,
            angleSpeed: (Math.random() - 0.5) * 0.015,
            amplitude: 15 + Math.random() * 20,
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.015 + Math.random() * 0.02,
            opacity: 0.4 + Math.random() * 0.3
        };
    }

    updateParticles() {
        const mouseActive = this.mouse.x > -100 && this.mouse.y > -100;
        
        this.particles.forEach(p => {
            // Organic floating motion
            p.angle += p.angleSpeed;
            p.x += p.vx + Math.cos(p.angle) * 0.3;
            p.y += p.vy + Math.sin(p.angle) * 0.3;

            // Gentle pulsation
            p.pulsePhase += p.pulseSpeed;
            p.size = p.baseSize + Math.sin(p.pulsePhase) * (p.baseSize * 0.1);

            // Mouse repel effect (FIXED)
            if (mouseActive) {
                const dx = p.x - this.mouse.x;
                const dy = p.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.mouseRepelRadius && distance > 1) {
                    // Stronger repel force
                    const force = ((this.config.mouseRepelRadius - distance) / this.config.mouseRepelRadius) * this.config.mouseRepelForce;
                    const angle = Math.atan2(dy, dx);
                    
                    // Apply force with acceleration
                    const pushX = Math.cos(angle) * force * 2;
                    const pushY = Math.sin(angle) * force * 2;
                    
                    p.x += pushX;
                    p.y += pushY;
                    
                    // Add velocity for continued motion
                    p.vx += pushX * 0.1;
                    p.vy += pushY * 0.1;
                    
                    // Limit velocity
                    const maxVel = this.config.speed * 3;
                    p.vx = Math.max(-maxVel, Math.min(maxVel, p.vx));
                    p.vy = Math.max(-maxVel, Math.min(maxVel, p.vy));
                }
            }
            
            // Apply friction to velocity
            p.vx *= 0.95;
            p.vy *= 0.95;

            // Wrap around edges
            const padding = p.size * 2;
            if (p.x < -padding) p.x = this.canvas.width + padding;
            if (p.x > this.canvas.width + padding) p.x = -padding;
            if (p.y < -padding) p.y = this.canvas.height + padding;
            if (p.y > this.canvas.height + padding) p.y = -padding;
        });
    }

    drawParticles() {
        const color = this.getParticleColor();

        this.particles.forEach(p => {
            this.ctx.save();

            // Simple gradient for clean bubble look
            const gradient = this.ctx.createRadialGradient(
                p.x - p.size * 0.2, p.y - p.size * 0.2, 0,
                p.x, p.y, p.size
            );
            
            // Parse rgba to adjust opacity
            const colorWithOpacity = color.replace(/[\d.]+\)$/g, `${p.opacity})`);
            gradient.addColorStop(0, colorWithOpacity.replace(/[\d.]+\)$/, '0.6)'));
            gradient.addColorStop(0.7, colorWithOpacity);
            gradient.addColorStop(1, colorWithOpacity.replace(/[\d.]+\)$/, '0)'));

            // Draw bubble
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.restore();
        });
    }

    animate(currentTime = 0) {
        // FPS limiter (60fps)
        const elapsed = currentTime - this.lastFrameTime;
        const targetFrameTime = 1000 / 60;

        if (elapsed < targetFrameTime) {
            this.animationId = requestAnimationFrame(this.animate);
            return;
        }

        this.lastFrameTime = currentTime - (elapsed % targetFrameTime);

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw
        this.updateParticles();
        this.drawParticles();

        // Continue animation
        this.animationId = requestAnimationFrame(this.animate);
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        const heroSection = this.container.closest('.hero-section');
        if (heroSection) {
            heroSection.removeEventListener('mousemove', this.handleMouseMove);
        } else {
            this.container.removeEventListener('mousemove', this.handleMouseMove);
        }
        window.removeEventListener('resize', this.handleResize);
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Auto-initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
        console.log('Initializing particles system...');
        window.organicBubbles = new OrganicBubbles('particles-js', {
            maxParticles: 50,
            minSize: 15,
            maxSize: 30,
            speed: 0.2,
            mouseRepelRadius: 150,  // Increased from 120
            mouseRepelForce: 6      // Increased from 2 (medium strength)
        });
        console.log('Particles initialized successfully');
    } else {
        console.warn('particles-js container not found');
    }
});
