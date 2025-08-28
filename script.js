// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 229, 204, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 229, 204, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Add animation on scroll for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        } else {
            // Reset when scrolling away so animations re-trigger when coming back
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(24px) scale(0.98)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        [
            '.product-card',
            '.feature',
            '.condiment-item',
            '.contact-item',
            '.contact-target',
            '.products h2',
            '.about h2',
            '.contact h2'
        ].join(', ')
    );

    const getInitialTransform = (el) => {
        if (el.matches('.contact-target')) return 'translateX(24px) scale(0.98)';
        return 'translateY(24px) scale(0.98)';
    };

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = getInitialTransform(el);
        el.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
        // Slightly slower stagger (wrap every 6 items)
        el.style.transitionDelay = `${(index % 6) * 120}ms`;
        observer.observe(el);
    });

    // Header/Navigation entrance animation
    const brand = document.querySelector('.navbar-brand');
    const links = document.querySelectorAll('.nav-link');
    const socialImgs = document.querySelectorAll('.nav-social .social-img');

    if (brand) {
        brand.style.opacity = '0';
        brand.style.transform = 'translateY(-12px)';
        brand.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        requestAnimationFrame(() => {
            brand.style.opacity = '1';
            brand.style.transform = 'translateY(0)';
        });
    }

    [...links].forEach((link, i) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(-10px)';
        link.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        link.style.transitionDelay = `${150 + i * 100}ms`;
        requestAnimationFrame(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        });
    });

    [...socialImgs].forEach((img, i) => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        img.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        img.style.transitionDelay = `${300 + i * 100}ms`;
        requestAnimationFrame(() => {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        });
    });
});

// Add hover effect for product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Improved image loading with fallback
const loadImages = () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Set initial opacity to 0
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        // Function to show image
        const showImage = () => {
            img.style.opacity = '1';
        };
        
        // Check if image is already loaded
        if (img.complete && img.naturalHeight !== 0) {
            showImage();
        } else {
            // Listen for load event
            img.addEventListener('load', showImage);
            
            // Fallback: show image after a timeout if load event doesn't fire
            setTimeout(() => {
                if (img.style.opacity === '0') {
                    showImage();
                }
            }, 2000);
            
            // Handle error case
            img.addEventListener('error', () => {
                console.warn('Failed to load image:', img.src);
                showImage(); // Show anyway to prevent broken image icon
            });
        }
    });
};

// Initialize image loading when DOM is ready
document.addEventListener('DOMContentLoaded', loadImages);

// Add scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #f39c12, #e67e22);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// Initialize scroll progress bar
createScrollProgress();

// Add some fun interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add click effect to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .cta-button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

