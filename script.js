document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Gestion du Header au défilement (Effet Glassmorphism) ---
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Menu Mobile (Hamburger) ---
    const burger = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');

    if(burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            navLinks.classList.toggle('nav-active');
            
            // Animation du bouton Burger
            burger.classList.toggle('toggle');

            // Animation des liens (Fade in en cascade)
            navLinksItems.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }

    // --- 3. Animation d'apparition au scroll (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1, // L'élément doit être visible à 10% pour déclencher
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // On arrête d'observer une fois animé
            }
        });
    }, observerOptions);

    // Sélectionner les éléments à animer
    const animatedElements = document.querySelectorAll('.product-card, .category-card, .about-content, h2');
    animatedElements.forEach(el => {
        el.classList.add('hidden-element'); // On cache initialement
        observer.observe(el);
    });

    // --- 4. Simulation d'ajout au panier (Petit détail UX) ---
    const cartIcons = document.querySelectorAll('.btn-secondary, .product-card a');
    const cartCount = document.querySelector('.nav-icons img[alt="Panier"]');
    
    // Création d'un badge de notification
    let count = 0;
    const badge = document.createElement('span');
    badge.className = 'cart-badge';
    badge.style.display = 'none';
    if(cartCount && cartCount.parentElement) {
        cartCount.parentElement.style.position = 'relative';
        cartCount.parentElement.appendChild(badge);
    }

    cartIcons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            count++;
            badge.textContent = count;
            badge.style.display = 'flex';
            
            // Petit effet de rebond sur le bouton
            btn.textContent = "Ajouté !";
            setTimeout(() => {
                btn.textContent = "Voir le produit"; // Ou texte original
            }, 1000);
        });
    });
});