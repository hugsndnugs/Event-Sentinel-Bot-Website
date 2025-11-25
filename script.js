/**
 * Show toast notification message
 * @param {string} message - Message to display
 * @param {string} type - Type of notification ('success', 'error', 'info')
 */
function showToast(message, type = 'success') {
    // Remove existing toast if present
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    try {
        const anchors = document.querySelectorAll('a[href^="#"]');
        if (!anchors.length) return;

        anchors.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#' || !href) return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    } catch (error) {
        console.warn('Smooth scrolling initialization failed:', error);
    }
}

/**
 * Add scroll effect to navbar
 */
function initNavbarScroll() {
    try {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.boxShadow = 'none';
            }
            
            lastScroll = currentScroll;
        });
    } catch (error) {
        console.warn('Navbar scroll effect initialization failed:', error);
    }
}

/**
 * Initialize fade-in animations using Intersection Observer
 */
function initFadeAnimations() {
    try {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.feature-card, .step, .command-item, .download-btn, .pricing-card, .faq-item, .detail-item');
        
        if (animatedElements.length) {
            animatedElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        }
    } catch (error) {
        console.warn('Fade animation initialization failed:', error);
    }
}

/**
 * Add active state to navigation links based on scroll position
 */
function initActiveNavLinks() {
    try {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        
        if (!sections.length || !navLinks.length) return;

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
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
    } catch (error) {
        console.warn('Active nav links initialization failed:', error);
    }
}

/**
 * Add copy functionality for code blocks with visual feedback
 */
function initCodeCopy() {
    try {
        const codeBlocks = document.querySelectorAll('code');
        if (!codeBlocks.length) return;

        codeBlocks.forEach(code => {
            // Add cursor pointer and title for better UX
            code.style.cursor = 'pointer';
            code.setAttribute('title', 'Click to copy');
            code.setAttribute('aria-label', 'Click to copy code to clipboard');
            
            code.addEventListener('click', async function() {
                const text = this.textContent.trim();
                if (!text) return;

                try {
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        await navigator.clipboard.writeText(text);
                        showToast('Copied to clipboard!', 'success');
                    } else {
                        // Fallback for older browsers
                        const textArea = document.createElement('textarea');
                        textArea.value = text;
                        textArea.style.position = 'fixed';
                        textArea.style.opacity = '0';
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);
                        showToast('Copied to clipboard!', 'success');
                    }
                } catch (error) {
                    console.error('Failed to copy text:', error);
                    showToast('Failed to copy. Please try again.', 'error');
                }
            });
        });
    } catch (error) {
        console.warn('Code copy functionality initialization failed:', error);
    }
}

/**
 * Initialize mobile navigation menu
 */
function initMobileMenu() {
    try {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!menuToggle || !navMenu) return;

        menuToggle.addEventListener('click', function() {
            const isOpen = navMenu.classList.toggle('active');
            this.setAttribute('aria-expanded', isOpen);
            this.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    } catch (error) {
        console.warn('Mobile menu initialization failed:', error);
    }
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScrolling();
    initNavbarScroll();
    initFadeAnimations();
    initActiveNavLinks();
    initCodeCopy();
    initMobileMenu();
});

// Initialize functions that don't require DOMContentLoaded
initNavbarScroll();
