// ============================================
// THEME MANAGEMENT (Dark/Light Mode)
// ============================================

/**
 * Initialize theme on page load
 * Priority: 1. localStorage, 2. system preference, 3. light (default)
 */
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    } else {
        document.body.classList.remove('dark-mode');
        updateThemeIcon(false);
    }
}

/**
 * Toggle between dark and light themes
 */
function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
}

/**
 * Update theme toggle button icon
 * @param {boolean} isDark - Whether dark mode is active
 */
function updateThemeIcon(isDark) {
    const icon = document.querySelector('#theme-toggle i');
    if (icon) {
        icon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars';
    }
}

/**
 * Listen for system theme changes
 */
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only auto-update if user hasn't manually set preference
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            document.body.classList.add('dark-mode');
            updateThemeIcon(true);
        } else {
            document.body.classList.remove('dark-mode');
            updateThemeIcon(false);
        }
    }
});

// Initialize theme BEFORE DOMContentLoaded to prevent flash
initTheme();

// ============================================
// CONTACT FORM HANDLING
// ============================================

/**
 * Handle contact form submission with validation
 */
function handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    
    // Bootstrap validation
    if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add('was-validated');
        return;
    }
    
    // Get form data
    const formData = {
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value
    };
    
    // Build mailto link
    const mailtoLink = `mailto:bearsremi@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    // Open mail client
    window.location.href = mailtoLink;
    
    // Reset form after short delay (allows mailto to trigger first)
    setTimeout(() => {
        form.reset();
        form.classList.remove('was-validated');
        
        // Show success feedback
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check-circle"></i> Message préparé !';
        btn.classList.add('btn-success');
        btn.classList.remove('btn-primary');
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('btn-success');
            btn.classList.add('btn-primary');
        }, 3000);
    }, 500);
}

// ============================================
// MAIN DOM CONTENT LOADED
// ============================================

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Attach theme toggle listener
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Attach contact form listener
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Get all nav links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Animate on load
    setTimeout(animateProgressBars, 1000);
    
    // Animate on scroll (but only once per bar)
    window.addEventListener('scroll', animateProgressBars);
    
    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(13, 110, 253, 0.95)';
        } else {
            navbar.style.backgroundColor = '#0d6efd';
        }
    });
    
    // Add loading animation to elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);
    
    // Observe all skill items, timeline items, and contact info
    const animatedElements = document.querySelectorAll('.skill-item, .timeline-item, .contact-info');
    animatedElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
    
    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
    
    // Particle system will be loaded from particles-modern.js
});

// Form validation (for future contact form)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

// Mobile menu close on link click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('nav-link')) {
        const navbar = document.querySelector('.navbar-collapse');
        if (navbar.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbar);
            bsCollapse.hide();
        }
    }
});

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
backToTopBtn.className = 'btn btn-primary position-fixed';
backToTopBtn.style.cssText = `
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
    display: none;
`;

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
        setTimeout(() => {
            backToTopBtn.style.opacity = '1';
        }, 10);
    } else {
        backToTopBtn.style.opacity = '0';
        setTimeout(() => {
            backToTopBtn.style.display = 'none';
        }, 300);
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Print styles
window.addEventListener('beforeprint', function() {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', function() {
    document.body.classList.remove('printing');
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/400x300/6c757d/ffffff?text=Image+Non+Disponible';
            this.alt = 'Image non disponible';
        });
    });
});

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Performance optimization
let ticking = false;

function updateScrollPosition() {
    // Your scroll-based animations here
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
    }
});

// Console welcome message
console.log(`
    ███████╗██╗   ██╗██╗      █████╗ ███╗   ██╗     ██████╗██╗  ██╗ █████╗ ██╗   ██╗
    ██╔════╝╚██╗ ██╔╝██║     ██╔══██╗████╗  ██║    ██╔════╝██║  ██║██╔══██╗██║   ██║
    ███████╗ ╚████╔╝ ██║     ███████║██╔██╗ ██║    ██║     ███████║███████║██║   ██║
    ╚════██║  ╚██╔╝  ██║     ██╔══██║██║╚██╗██║    ██║     ██╔══██║██╔══██║██║   ██║
    ███████║   ██║   ███████╗██║  ██║██║ ╚████║    ╚██████╗██║  ██║██║  ██║╚██████╔╝
    ╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ 
    
    🚀 Portfolio BTS SIO SISR - Dylan Chau
    💻 Version: 1.0.0
    📧 Contact: dylan.chau@example.com
    
    Merci de visiter mon portfolio !
`);