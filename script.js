/**
 * FLORENCIA CASTILLO · MUJERES ALFA
 * Main JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollSpy();
    initCookieBanner();
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
            _captcha: "false",
            _template: "table",
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

// Cookie Consent Controller
function initCookieBanner() {
    if (localStorage.getItem('fc_cookies_accepted') === 'true') {
        return;
    }

    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.id = 'cookieBanner';
    banner.innerHTML = `
        <div class="cookie-banner-content">
            <i class="fa-solid fa-cookie-bite cookie-banner-icon"></i>
            <p class="cookie-banner-text">
                Utilizamos cookies técnicas para garantizar el funcionamiento del sitio y la confidencialidad de tus diagnósticos. Podés conocer más en nuestra <a href="legales.html#cookies">Política de Cookies & Privacidad</a>.
            </p>
        </div>
        <div class="cookie-banner-actions">
            <button class="btn-cookie-accept" onclick="acceptCookies()">Aceptar</button>
        </div>
    `;
    document.body.appendChild(banner);
}

function acceptCookies() {
    localStorage.setItem('fc_cookies_accepted', 'true');
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(20px)';
        banner.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        setTimeout(() => banner.remove(), 300);
    }
}
