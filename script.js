/**
 * FLORENCIA CASTILLO · MUJERES ALFA
 * Main JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollSpy();
    initCookieBanner();
    initPlansCarousel();
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

// Google Sheets Webhook de Base de Datos Oficial
const FC_SHEETS_WEBHOOK = 'https://script.google.com/macros/s/AKfycbxX5uH6rm3F2rW0ElLnIx-XoNBjnfxX0ICvssi9XVN1hTL89-n761enBKZklurY9j7HhQ/exec';

// Función global para registrar leads en Google Sheets y en caché local
function recordLeadInSystem(leadData) {
    // 1. Guardar en caché local para el panel de Flor
    try {
        const stored = JSON.parse(localStorage.getItem('fc_system_leads') || '[]');
        stored.unshift({
            fecha: new Date().toLocaleString('es-AR'),
            nombre: leadData.nombre || '',
            email: leadData.email || '',
            whatsapp: leadData.whatsapp || 'No informado',
            recurso: leadData.recurso || 'General',
            detalles: leadData.detalles || ''
        });
        localStorage.setItem('fc_system_leads', JSON.stringify(stored.slice(0, 500)));
    } catch (e) {
        console.warn('Cache local error:', e);
    }

    // 2. Enviar a Google Apps Script / Google Sheets
    return fetch(FC_SHEETS_WEBHOOK, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify(leadData)
    }).catch(err => console.warn('Error en Google Sheets Webhook:', err));
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

    const leadPayload = {
        nombre: name,
        email: email,
        whatsapp: phone || 'No informado',
        recurso: 'Guía Radiografía Alfa (Lead Magnet Home)',
        origen: 'Formulario Home Lead Magnet'
    };

    // Registrar en Google Sheets oficial
    recordLeadInSystem(leadPayload);

    // Enviar copia a la casilla de Flor por FormSubmit como respaldo
    fetch('https://formsubmit.co/ajax/info@florenciacastillo.com', {
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
    }).catch(err => console.log('Error enviando respaldo FormSubmit:', err));

    const form = document.getElementById('leadForm');
    const successBox = document.getElementById('formSuccess');
    if (form) form.style.display = 'none';
    if (successBox) successBox.style.display = 'block';
}

// ScrollSpy to highlight active link
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    if (!sections.length || !navLinks.length) return;

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

        if (current) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
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

// ========================================================
// PLANS STACKED CAROUSEL (INDEX - TU RUTA DE CRECIMIENTO)
// ========================================================
let currentPlanIndex = 0;
const totalPlanCards = 3;

function initPlansCarousel() {
    const plansViewport = document.getElementById('plansViewport');
    if (!plansViewport) return;

    updatePlanCardPositions();

    // Check if initial hash matches one of the plan cards
    checkPlanHash();
    window.addEventListener('hashchange', checkPlanHash);

    // Gestos táctiles (Swipe) para dispositivos móviles
    let planTouchStartX = 0;
    let planTouchEndX = 0;

    plansViewport.addEventListener('touchstart', (e) => {
        planTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    plansViewport.addEventListener('touchend', (e) => {
        if (window.innerWidth >= 992) return;
        planTouchEndX = e.changedTouches[0].screenX;
        if (planTouchEndX < planTouchStartX - 40) {
            nextPlanCard(); // Swipe izquierda -> siguiente
        } else if (planTouchEndX > planTouchStartX + 40) {
            prevPlanCard(); // Swipe derecha -> anterior
        }
    }, { passive: true });
}

function checkPlanHash() {
    const hash = window.location.hash;
    if (hash === '#alfa-inicio') {
        setPlanIndex(1);
    } else if (hash === '#mujeres-alfa') {
        setPlanIndex(2);
    }
}

function updatePlanCardPositions() {
    const cards = document.querySelectorAll('.plan-stack-card');
    const dots = document.querySelectorAll('.plans-dot');
    if (!cards.length) return;

    cards.forEach((card) => {
        const idx = parseInt(card.getAttribute('data-index'), 10);
        card.classList.remove('pos-center', 'pos-left', 'pos-right');

        if (idx === currentPlanIndex) {
            card.classList.add('pos-center');
        } else if (idx === (currentPlanIndex + 1) % totalPlanCards) {
            card.classList.add('pos-right');
        } else {
            card.classList.add('pos-left');
        }
    });

    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentPlanIndex);
    });
}

function nextPlanCard() {
    currentPlanIndex = (currentPlanIndex + 1) % totalPlanCards;
    updatePlanCardPositions();
}

function prevPlanCard() {
    currentPlanIndex = (currentPlanIndex - 1 + totalPlanCards) % totalPlanCards;
    updatePlanCardPositions();
}

function setPlanIndex(idx) {
    currentPlanIndex = idx;
    updatePlanCardPositions();
}

function handlePlanCardClick(idx) {
    if (window.innerWidth < 992 && idx !== currentPlanIndex) {
        setPlanIndex(idx);
    }
}
