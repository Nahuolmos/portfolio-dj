/* ========================================
   DJ NAHUEL OLMOS - JAVASCRIPT PREMIUM
   ======================================== */

// ========================================
// CONFIGURACI\u00d3N
// ========================================
const CONFIG = {
    youtubeChannelId: 'https://www.youtube.com/@nahuelolmosdj', // ID del canal
    youtubeApiKey: 'https://serpapi.com/search?engine=youtube_video', // Dejar vacio para usar fallback
    whatsappNumber: '5492615535624',
    
    fallbackVideos: [
        {
            id: '6a4cb0923c99bada504b6e00',
            title: 'Motinha 2.0 Remix (Intro Tumbalatum) | Dj Olmos Nahuel',
            thumbnail: 'https://i.ytimg.com/vi/befA7uRhWdc/maxresdefault.jpg',
            publishedAt: '2025-06-12',
            url: 'https://www.youtube.com/watch?v=befA7uRhWdc'
        },
        {
            id: '6a4cb0be27c2b0d341f0f111',
            title: 'Reggaeton Old School | Olmos Nahuel',
            thumbnail: 'https://i.ytimg.com/vi/KsVuSTYmKok/maxresdefault.jpg',
            publishedAt: '2025-06-7',
            url: 'https://www.youtube.com/watch?v=KsVuSTYmKok'
        },
        {
            id: '6a4cb051b333eef5bdda78a1',
            title: 'Terraza Session #1 - Afro House',
            thumbnail: 'https://i.ytimg.com/vi/9HV17N0k3pE/maxresdefault.jpg',
            publishedAt: '2025-02-04',
            url: 'https://www.youtube.com/watch?v=9HV17N0k3pE&t=528shttps://www.youtube.com/@nahuelolmos2dj'
        }
    ],
    
    eventos: [
        {
            fecha: '2025-07-25',
            lugar: 'Chirolas Bar',
            ciudad: 'Mendoza',
            hora: '21:00',
            link: 'https://www.instagram.com/chirolas.bar/?hl=es'
        },
        {
            fecha: '2025-07-26',
            lugar: 'Chirolas Bar',
            ciudad: 'Mendoza',
            hora: '21:00',
            link: 'https://www.instagram.com/chirolas.bar/?hl=es'
        }
    ]
};

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
function initNavbar() {
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ========================================
// CERRAR MENU MOBILE AL HACER CLICK
// ========================================
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.checked = false;
        });
    });
}

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });
}

// ========================================
// CONTADORES ANIMADOS (ESTAD\u00cdSTICAS)
// ========================================
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const animateCounter = (element, target) => {
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.dataset.target);
                    animateCounter(stat, target);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.getElementById('estadisticas');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// ========================================
// GALER\u00cdA LIGHTBOX
// ========================================
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    const images = Array.from(galleryItems).map(item => {
        return {
            src: item.querySelector('img').src,
            alt: item.querySelector('img').alt
        };
    });
    
    const openLightbox = (index) => {
        currentImageIndex = index;
        lightboxImage.src = images[index].src;
        lightboxImage.alt = images[index].alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    const showPrevImage = () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImage.src = images[currentImageIndex].src;
        lightboxImage.alt = images[currentImageIndex].alt;
    };
    
    const showNextImage = () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImage.src = images[currentImageIndex].src;
        lightboxImage.alt = images[currentImageIndex].alt;
    };
    
    // Event listeners
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);
    
    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        }
    });
    
    // Cerrar al hacer click fuera de la imagen
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

// ========================================
// YOUTUBE VIDEOS
// ========================================
async function loadYouTubeVideos() {
    const container = document.getElementById('videos-container');
    
    // Intentar cargar desde API primero
    if (CONFIG.youtubeApiKey) {
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?key=${CONFIG.youtubeApiKey}&channelId=${CONFIG.youtubeChannelId}&part=snippet,id&order=date&maxResults=3&type=video`
            );
            
            if (response.ok) {
                const data = await response.json();
                renderVideos(data.items.map(item => ({
                    id: item.id.videoId,
                    title: item.snippet.title,
                    thumbnail: item.snippet.thumbnails.high.url,
                    publishedAt: item.snippet.publishedAt,
                    url: `https://www.youtube.com/watch?v=${item.id.videoId}`
                })));
                return;
            }
        } catch (error) {
            console.log('YouTube API no disponible, usando fallback manual');
        }
    }
    
    // Usar fallback manual
    renderVideos(CONFIG.fallbackVideos);
}

function renderVideos(videos) {
    const container = document.getElementById('videos-container');
    
    if (videos.length === 0) {
        container.innerHTML = '<p class=\"text-center\" style=\"color: var(--text-muted);\">Pr\u00f3ximamente nuevos videos</p>';
        return;
    }
    
    container.innerHTML = videos.map(video => `
        <a href=\"${video.url}\" target=\"_blank\" rel=\"noopener\" class=\"video-card\">
            <div class=\"video-thumbnail\">
                <img src=\"${video.thumbnail}\" alt=\"${video.title}\" loading=\"lazy\">
                <div class=\"play-icon\">\u25b6</div>
            </div>
            <div class=\"video-info\">
                <h3 class=\"video-title\">${video.title}</h3>
                <p class=\"video-date\">${formatDate(video.publishedAt)}</p>
            </div>
        </a>
    `).join('');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

// ========================================
// EVENTOS (CALENDARIO)
// ========================================
function loadEventos() {
    const container = document.getElementById('eventos-container');
    
    if (CONFIG.eventos.length === 0) {
        // Ya tiene el mensaje por defecto en el HTML
        return;
    }
    
    container.innerHTML = CONFIG.eventos.map(evento => `
        <div class=\"evento-card\">
            <div class=\"evento-fecha\">
                <div class=\"evento-dia\">${new Date(evento.fecha).getDate()}</div>
                <div class=\"evento-mes\">${new Date(evento.fecha).toLocaleDateString('es-ES', { month: 'short' })}</div>
            </div>
            <div class=\"evento-info\">
                <h3>${evento.lugar}</h3>
                <p>${evento.ciudad} - ${evento.hora}</p>
            </div>
            <a href=\"${evento.link}\" class=\"btn-primary\">Reservar</a>
        </div>
    `).join('');
}

// ========================================
// FORMULARIO DE CONTACTO
// ========================================
function initContactForm() {
    const form = document.querySelector('.contact-form');
    const whatsappBtn = document.getElementById('whatsapp-btn');
    
    // Enviar por Email (mailto)
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre-input').value.trim();
        const email = document.getElementById('email-input').value.trim();
        const mensaje = document.getElementById('mensaje-input').value.trim();
        
        if (!nombre || !email || !mensaje) {
            alert('Por favor completa todos los campos');
            return;
        }
        
        const recipientEmail = 'nahuolmosimpala@gmail.com';
        const identifier = Date.now().toString().slice(-6);
        const subject = `Consulta via web #${identifier}`;
        const body = `Nombre: ${nombre}\nEmail: ${email}\n\nMensaje:\n${mensaje}`;
        const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        window.location.href = mailtoUrl;
    });
    
    // WhatsApp
    whatsappBtn.addEventListener('click', () => {
        const nombre = document.getElementById('nombre-input').value;
        const mensaje = document.getElementById('mensaje-input').value;
        
        if (!nombre || !mensaje) {
            alert('Por favor completa al menos tu nombre y mensaje');
            return;
        }
        
        const text = `Hola Nahuel, soy ${nombre}. ${mensaje}`;
        const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    });
}

// ========================================
// PARALLAX EFFECT (HERO)
// ========================================
function initParallax() {
    const heroBackground = document.querySelector('.hero-background');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (heroBackground && scrolled < window.innerHeight) {
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// ========================================
// LAZY LOADING DE IM\u00c1GENES
// ========================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading=\"lazy\"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // El navegador soporta lazy loading nativo
        return;
    }
    
    // Fallback con Intersection Observer
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// SMOOTH SCROLL PARA LINKS INTERNOS
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Ignorar el toggle del men\u00fa
            if (href === '#' || href === '#menu-toggle') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// INICIALIZACI\u00d3N
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎧 Nahuel Olmos DJ - Web Premium cargada');
    
    // Inicializar todos los componentes
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initStatsCounter();
    initGalleryLightbox();
    loadYouTubeVideos();
    loadEventos();
    initContactForm();
    initParallax();
    initLazyLoading();
    initSmoothScroll();
});

// ========================================
// PERFORMANCE: Preload de fuentes cr\u00edticas
// ========================================
if ('fonts' in document) {
    Promise.all([
        document.fonts.load('1em FuturaLT-Bold'),
    ]).then(() => {
        document.body.classList.add('fonts-loaded');
    });
}
