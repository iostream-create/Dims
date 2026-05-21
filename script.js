document.addEventListener('DOMContentLoaded', () => {
    // === SCROLL ANIMATION OBSERVER ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // === NAVBAR MENU FUNCTIONALITY ===
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            navLinks.classList.toggle('active');
            e.stopPropagation();
        });
    }

    // Close menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && !navLinks.contains(e.target) && e.target !== menuToggle) {
            navLinks.classList.remove('active');
        }
    });

    // === SKILL BAR ANIMATION ===
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // === PROJECT SLIDER FUNCTIONALITY ===
    const pUtama = document.getElementById('pUtama');
    const pKiri = document.querySelector('.side-left');
    const pKanan = document.querySelector('.side-right');
    let isOpen = false;

    function goToLink(element) {
        const url = element.getAttribute('data-url');
        if (url && url !== "#") {
            window.open(url, '_blank');
        }
    }

    if (pUtama) {
        pUtama.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (!isOpen) {
                // Open slider
                pUtama.style.transform = 'scale(0.85)';
                pUtama.style.zIndex = '5';

                if (pKiri) {
                    pKiri.style.opacity = '1';
                    pKiri.style.pointerEvents = 'auto';
                    pKiri.style.transform = 'translateX(-140px) scale(0.75)';
                    pKiri.style.zIndex = '4';
                }

                if (pKanan) {
                    pKanan.style.opacity = '1';
                    pKanan.style.pointerEvents = 'auto';
                    pKanan.style.transform = 'translateX(140px) scale(0.75)';
                    pKanan.style.zIndex = '4';
                }

                isOpen = true;
            } else {
                // If open, redirect to link
                goToLink(pUtama);
            }
        });
    }

    // Side project click handlers
    [pKiri, pKanan].forEach(card => {
        if (card) {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isOpen) {
                    goToLink(card);
                }
            });
        }
    });

    // Close slider when clicking outside
    document.addEventListener('click', () => {
        if (isOpen && pUtama) {
            pUtama.style.transform = 'scale(1.1)';
            pUtama.style.zIndex = '10';

            if (pKiri) {
                pKiri.style.opacity = '0';
                pKiri.style.pointerEvents = 'none';
                pKiri.style.transform = 'translateX(0) scale(1)';
                pKiri.style.zIndex = '5';
            }

            if (pKanan) {
                pKanan.style.opacity = '0';
                pKanan.style.pointerEvents = 'none';
                pKanan.style.transform = 'translateX(0) scale(1)';
                pKanan.style.zIndex = '5';
            }

            isOpen = false;
        }
    });

    // === SMOOTH SCROLL ENHANCEMENT ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // === PARALLAX EFFECT ===
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            parallaxElements.forEach(element => {
                const scrollValue = window.scrollY;
                element.style.transform = `translateY(${scrollValue * 0.5}px)`;
            });
        });
    }

    // === CARD HOVER EFFECTS ===
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // === MOUSE FOLLOW EFFECT (Optional) ===
    const galaxyBg = document.querySelector('.galaxy-bg');
    if (galaxyBg) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;

            // Subtle background movement
            galaxyBg.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
        });
    }

    // === COUNTER ANIMATION ===
    const countElements = document.querySelectorAll('[data-count]');
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-count'));
                let current = 0;
                const increment = target / 30;

                const counter = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        element.textContent = target;
                        clearInterval(counter);
                    } else {
                        element.textContent = Math.floor(current);
                    }
                }, 30);

                countObserver.unobserve(element);
            }
        });
    }, { threshold: 0.5 });

    countElements.forEach(el => countObserver.observe(el));

    // === ACTIVE NAV LINK HIGHLIGHT ===
    const updateActiveNav = () => {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').slice(1) === current) {
                    item.classList.add('active');
                }
            });
        });
    };

    updateActiveNav();

    // === LOADING ANIMATION ===
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    // === KEYBOARD NAVIGATION ===
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });

    // === PERFORMANCE: Debounce scroll events ===
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Perform scroll-related calculations here
        }, 100);
    }, { passive: true });

    // === MOBILE GESTURE SUPPORT ===
    let touchStartX = 0;
    let touchEndX = 0;

    function handleGesture() {
        if (touchEndX < touchStartX - 50 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    }

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    }, false);

    console.log('✨ Portfolio loaded with enhanced interactivity!');
});
