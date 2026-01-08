// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(
        '.about-card, .skill-item, .portfolio-item, .contact-card'
    );
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Navbar background on scroll
let lastScroll = 0;
const navbar = document.querySelector('.glass-nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.15)';
        navbar.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.5)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.1)';
        navbar.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)';
    }
    
    lastScroll = currentScroll;
});

// Initialize EmailJS
// Replace 'YOUR_PUBLIC_KEY' with your EmailJS public key
// Get it from: https://dashboard.emailjs.com/admin/integration
if (typeof emailjs !== 'undefined') {
    emailjs.init('7NhVuB5A2LoE5hsvi'); // Replace with your EmailJS public key
}

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Get submit button for feedback
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        const originalBackground = submitButton.style.background;
        
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';
        
        try {
            // Check if EmailJS is configured
            if (typeof emailjs === 'undefined' || emailjs.init.toString().includes('YOUR_PUBLIC_KEY')) {
                // Fallback: Show demo message if EmailJS not configured
                throw new Error('EmailJS not configured. Please set up your EmailJS credentials.');
            }
            
            // Send email using EmailJS
            // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID' with your actual IDs
            const response = await emailjs.send(
                'web-design',    // Replace with your EmailJS Service ID
                'template_d3iqmz4',   // Replace with your EmailJS Template ID
                {
                    from_name: name,
                    from_email: email,
                    message: message,
                    to_email: 'nikitahill099@gmail.com' // Your email address
                }
            );
            
            // Success feedback
            submitButton.textContent = 'Message Sent! ✓';
            submitButton.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            submitButton.style.opacity = '1';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.background = originalBackground;
            }, 3000);
            
        } catch (error) {
            console.error('Error sending email:', error);
            
            // Error feedback
            submitButton.textContent = 'Error - Try Again';
            submitButton.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            submitButton.style.opacity = '1';
            submitButton.disabled = false;
            
            // Show error message to user
            let errorMsg = document.querySelector('.form-error');
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'form-error';
                errorMsg.style.cssText = 'color: #ef4444; text-align: center; margin-top: 15px; padding: 10px; background: rgba(239, 68, 68, 0.1); border-radius: 10px;';
                contactForm.appendChild(errorMsg);
            }
            
            if (error.message.includes('not configured')) {
                errorMsg.textContent = '⚠️ Email service not configured. Please contact me directly or set up EmailJS.';
            } else {
                errorMsg.textContent = '⚠️ Failed to send message. Please try again or contact me directly.';
            }
            
            // Remove error message after 5 seconds
            setTimeout(() => {
                if (errorMsg) {
                    errorMsg.remove();
                }
                submitButton.textContent = originalText;
                submitButton.style.background = originalBackground;
            }, 5000);
        }
    });
}

// Parallax effect for background orbs
window.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 50;
        const y = (mouseY - 0.5) * speed * 50;
        
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Add hover effect to portfolio items
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Smooth reveal animation for hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const titleLines = heroTitle.querySelectorAll('.title-line');
    titleLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            line.style.transition = 'all 0.8s ease-out';
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Add active state to navigation links on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

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

// Add active link styling
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--text-primary);
    }
    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Add cursor trail effect (optional enhancement)
let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) { // Only on desktop
        cursorTrail.push({
            x: e.clientX,
            y: e.clientY,
            time: Date.now()
        });
        
        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    // Scroll-based animations can be added here
}, 100);

window.addEventListener('scroll', throttledScroll);
