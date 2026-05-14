// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu when link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scroll and Active Link
const sections = document.querySelectorAll('section');
const navs = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navs.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        border-bottom: 2px solid white;
        padding-bottom: 5px;
    }
`;
document.head.appendChild(style);

// Counter Animation
const counters = document.querySelectorAll('.counter');

const runCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const increment = target / 20;
    let current = 0;

    const updateCount = () => {
        current += increment;
        if (current < target) {
            counter.textContent = Math.ceil(current);
            setTimeout(updateCount, 50);
        } else {
            counter.textContent = target;
        }
    };

    updateCount();
};

// Intersection Observer for Counter Animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('.counter');
            if (counter && !counter.hasAttribute('data-animated')) {
                counter.setAttribute('data-animated', 'true');
                runCounter(counter);
            }
        }
    });
}, { threshold: 0.5 });

const statCards = document.querySelectorAll('.stat-card');
statCards.forEach(card => counterObserver.observe(card));

// Scroll Animations
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

const animatedElements = document.querySelectorAll('.project-card, .skill-category, .timeline-item');
animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
    scrollObserver.observe(element);
});

// Parallax Effect on Hero
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const floatingBox = document.querySelector('.floating-box');
    if (floatingBox) {
        floatingBox.style.transform = `translateY(calc(-50% + ${scrollY * 0.5}px)) translateX(30px)`;
    }
});

// Add smooth fade-in for page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Log initialization
console.log('Portfolio website loaded successfully!');
