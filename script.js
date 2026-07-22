// ============================================
// Navigation
// ============================================

const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Navbar scroll effect
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Add scrolled class for styling
    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// Smooth scrolling for anchor links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Scroll reveal animations
// ============================================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for scroll reveal
document.querySelectorAll('.project-card, .contact-content').forEach(el => {
    observer.observe(el);
});

// ============================================
// Active navigation highlight
// ============================================

const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ============================================
// Project video iteration toggle (Triton Pupper)
// ============================================

document.querySelectorAll('.project-video-toggle').forEach(toggle => {
    const video = toggle.querySelector('.project-video');
    const source = video.querySelector('source');
    const buttons = toggle.querySelectorAll('.video-toggle-btn');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const src = button.dataset.src;
            if (!src || source.getAttribute('src') === src) return;

            buttons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');

            source.setAttribute('src', src);
            video.load();
            video.play().catch(() => {}); // ignore autoplay rejection
        });
    });
});

// ============================================
// Console Easter Egg
// ============================================

console.log('%c Welcome to my portfolio! ',
    'background: linear-gradient(90deg, #6366f1, #22d3ee); color: white; padding: 10px 20px; border-radius: 5px; font-size: 14px; font-weight: bold;'
);
console.log('%c Feel free to explore the code! ',
    'color: #a1a1aa; font-size: 12px;'
);
