// Main JavaScript for SVKM Typing Test

// Page Load Animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate main content on page load
    gsap.from('main', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
    });

    // Animate navigation
    gsap.from('nav', {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: 'power2.out'
    });

    // Animate footer
    gsap.from('footer', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.3,
        ease: 'power2.out'
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Toggle mobile menu (implement as needed)
            console.log('Mobile menu clicked');
        });
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                scrollTo: target,
                duration: 0.8,
                ease: 'power2.inOut'
            });
        }
    });
});

// Button Ripple Effect
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            gsap.to(entry.target, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out'
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.card-hover, .bg-slate-800').forEach(card => {
    gsap.set(card, { opacity: 0, y: 20 });
    observer.observe(card);
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for quick search (can be implemented)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        console.log('Quick search activated');
    }

    // Escape to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('[id$="-modal"]');
        modals.forEach(modal => {
            if (!modal.classList.contains('hidden')) {
                modal.classList.add('hidden');
            }
        });
    }
});

// Utility function to show notifications
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white z-50 ${
        type === 'success' ? 'bg-green-500' :
        type === 'error' ? 'bg-red-500' :
        'bg-blue-500'
    }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    gsap.from(notification, {
        opacity: 0,
        x: 100,
        duration: 0.3,
        ease: 'power2.out'
    });

    setTimeout(() => {
        gsap.to(notification, {
            opacity: 0,
            x: 100,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => notification.remove()
        });
    }, duration);
}

// Utility function to debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Utility function to throttle
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for use in other scripts
window.showNotification = showNotification;
window.debounce = debounce;
window.throttle = throttle;

