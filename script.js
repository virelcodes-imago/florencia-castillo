/**
 * FLORENCIA CASTILLO · MUJERES ALFA
 * Main JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollSpy();
});

// Mobile Navigation Toggle
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            menuToggle.classList.toggle('active');
        });

        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// FAQ Accordion Handler
function toggleFaq(element) {
    const currentItem = element.parentElement;
    const allItems = document.querySelectorAll('.accordion-item');

    allItems.forEach(item => {
        if (item !== currentItem) {
            item.classList.remove('active');
        }
    });

    currentItem.classList.toggle('active');
}

// Lead Magnet Form Submission Handler
function handleLeadSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('leadName').value.trim();
    const email = document.getElementById('leadEmail').value.trim();
    const phone = document.getElementById('leadPhone').value.trim();

    if (!name || !email) {
        alert('Por favor, completá tu nombre y correo electrónico.');
        return;
    }

    const form = document.getElementById('leadForm');
    const successBox = document.getElementById('formSuccess');

    // Simulate sending lead data
    form.style.display = 'none';
    successBox.style.display = 'block';

    // Optional: If phone provided, prepare WhatsApp greeting link
    if (phone) {
        console.log(`Lead captado: ${name} (${email}) - WhatsApp: ${phone}`);
    }
}

// ScrollSpy to highlight active link
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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
}
