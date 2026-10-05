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

    // Send lead data to Flor's email
    fetch('https://formsubmit.co/ajax/florenciacastillo.oficial@gmail.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            _subject: `Nuevo Lead Lead Magnet Home - ${name}`,
            nombre: name,
            email: email,
            whatsapp: phone || 'No informado',
            origen: 'Formulario Home Lead Magnet'
        })
    }).catch(err => console.log('Error enviando lead:', err));

    form.style.display = 'none';
    successBox.style.display = 'block';
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
