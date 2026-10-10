// Centralized Data
const products = [
    { id: 1, name: 'Premium Basmati Rice', code: 'SVM-B01', category: 'Basmati', price: '₹120', weight: '1kg', image: './images/hero-rice.jpg' },
    { id: 2, name: 'Sona Masuri Gold', code: 'SVM-S01', category: 'Sona Masuri', price: '₹65', weight: '1kg', image: './images/hero-rice.jpg' },
    { id: 3, name: 'Healthy Brown Rice', code: 'SVM-BR1', category: 'Brown Rice', price: '₹95', weight: '1kg', image: './images/hero-rice.jpg' },
    { id: 4, name: 'Daily Raw Rice', code: 'SVM-R01', category: 'Raw Rice', price: '₹55', weight: '1kg', image: './images/hero-rice.jpg' },
    { id: 5, name: 'Export Quality Basmati', code: 'SVM-B02', category: 'Basmati', price: '₹150', weight: '1kg', image: './images/hero-rice.jpg' },
    { id: 6, name: 'Idli Rice Special', code: 'SVM-I01', category: 'Raw Rice', price: '₹45', weight: '1kg', image: './images/hero-rice.jpg' },
];

const whatsappNumber = '919876543210';

function renderProducts(filterCategory = 'All') {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    
    const filtered = filterCategory === 'All' 
        ? products 
        : products.filter(p => p.category === filterCategory);

    grid.innerHTML = filtered.map(prod => `
        <div class="product-card animate-on-scroll">
            <img src="${prod.image}" alt="${prod.name}" class="product-img">
            <div class="product-category">${prod.category}</div>
            <h3 class="product-title">${prod.name}</h3>
            <div class="product-code">Code: ${prod.code}</div>
            <div class="product-price">${prod.price} <span style="font-size: 14px; color: var(--text-muted); font-weight: normal;">/ ${prod.weight}</span></div>
            <button class="btn btn-whatsapp" onclick="enquireWhatsApp('${prod.code}', '${prod.name}')">Enquire Now</button>
        </div>
    `).join('');
    
    // Re-initialize animations for new elements
    initScrollAnimations();
}

function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderProducts(e.target.dataset.filter);
        });
    });
}

function enquireWhatsApp(code, name) {
    const message = encodeURIComponent(`Hi, I would like to enquire about ${name} (Code: ${code}). Please provide details.`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
}

// Scroll Animations (Intersection Observer)
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll:not(.visible)').forEach(el => {
        observer.observe(el);
    });
}

// Number Counters
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                let count = 0;
                const updateCount = () => {
                    const increment = target / 40; // speed
                    if (count < target) {
                        count += increment;
                        entry.target.innerText = Math.ceil(count);
                        setTimeout(updateCount, 30);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Responsive Navigation Handling (Clean Dropdown)
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (!menuToggle || !navLinks) return;

    function toggleNav() {
        const isOpen = navLinks.classList.contains('is-open');
        if (isOpen) {
            navLinks.classList.remove('is-open');
            menuToggle.classList.remove('is-active');
            menuToggle.setAttribute('aria-expanded', 'false');
        } else {
            navLinks.classList.add('is-open');
            menuToggle.classList.add('is-active');
            menuToggle.setAttribute('aria-expanded', 'true');
        }
    }

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleNav();
    });

    // Close when navigating via links
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 860) {
                navLinks.classList.remove('is-open');
                menuToggle.classList.remove('is-active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navLinks.classList.contains('is-open')) {
            navLinks.classList.remove('is-open');
            menuToggle.classList.remove('is-active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
            navLinks.classList.remove('is-open');
            menuToggle.classList.remove('is-active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Auto-close on resize to desktop view
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 860 && navLinks.classList.contains('is-open')) {
            navLinks.classList.remove('is-open');
            menuToggle.classList.remove('is-active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Dynamic navbar elevation shadow on scroll
    if (navbar) {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }
}


// Navbar Active State
function setActiveNav() {
    const links = document.querySelectorAll('.nav-links a');
    let path = window.location.pathname.split('/').pop() || 'index.html';
    if (path === '') path = 'index.html';
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === path || (path === 'index.html' && (href === 'index.html' || href === './' || href === '/'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    renderProducts();
    initFilters();
    initScrollAnimations();
    initCounters();
    setActiveNav();
});
