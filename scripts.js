/* DEVELOPER: Fernanda Somohano, IS117-001, Fall 2025
   scripts.js - Form handling and interactive elements
   This is a simplified version without API calls - all data is manually managed
*/

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Women\'s Football Scores - Site loaded successfully');

    // Initialize form handlers
    initializeFormHandlers();

    // Add any additional interactive features
    initializeInteractiveElements();
});

/**
 * Initialize all form handlers
 */
function initializeFormHandlers() {
    // Subscribe form handler
    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', handleSubscribe);
    }

    // Contact form handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContact);
    }
}

/**
 * Handle subscribe form submission
 * @param {Event} event - Form submit event
 */
function handleSubscribe(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('sname')?.value;
    const email = document.getElementById('semail')?.value;
    const leagues = document.getElementById('sleagues');
    const selectedLeagues = leagues ? Array.from(leagues.selectedOptions).map(opt => opt.value) : [];

    // Validate form
    if (!name || !email) {
        alert('Please fill in all required fields.');
        return false;
    }

    // Show success message
    const messageEl = document.getElementById('subscribeMsg');
    if (messageEl) {
        messageEl.textContent = `Thank you, ${name}! You've subscribed to updates (demo mode - no email sent).`;
        messageEl.classList.remove('d-none');

        // Hide message after 5 seconds
        setTimeout(() => {
            messageEl.classList.add('d-none');
        }, 5000);
    }

    // Log to console (for demonstration)
    console.log('Subscription submitted:', {
        name: name,
        email: email,
        leagues: selectedLeagues
    });

    // Reset form
    event.target.reset();

    return false;
}

/**
 * Handle contact form submission
 * @param {Event} event - Form submit event
 */
function handleContact(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('cname')?.value;
    const email = document.getElementById('cemail')?.value;
    const message = document.getElementById('cmsg')?.value;

    // Validate form
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return false;
    }

    // Show success message
    const messageEl = document.getElementById('contactMsg');
    if (messageEl) {
        messageEl.textContent = `Thank you for your message, ${name}! We'll get back to you soon (demo mode - no actual email sent).`;
        messageEl.classList.remove('d-none');

        // Hide message after 5 seconds
        setTimeout(() => {
            messageEl.classList.add('d-none');
        }, 5000);
    }

    // Log to console (for demonstration)
    console.log('Contact form submitted:', {
        name: name,
        email: email,
        message: message
    });

    // Reset form
    event.target.reset();

    return false;
}

/**
 * Initialize interactive elements like tooltips, smooth scrolling, etc.
 */
function initializeInteractiveElements() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add active class to current nav item
    highlightCurrentPage();

    // Initialize Bootstrap tooltips if any exist
    initializeTooltips();
}

/**
 * Highlight the current page in navigation
 */
function highlightCurrentPage() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
}

/**
 * Initialize Bootstrap tooltips
 */
function initializeTooltips() {
    // Check if Bootstrap tooltip is available
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(
            document.querySelectorAll('[data-bs-toggle="tooltip"]')
        );
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
}

/**
 * Format date to readable string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Utility function to show/hide loading indicators
 * @param {string} elementId - ID of element to toggle
 * @param {boolean} show - Whether to show or hide
 */
function toggleLoading(elementId, show) {
    const element = document.getElementById(elementId);
    if (element) {
        if (show) {
            element.innerHTML = '<div class="text-center text-muted"><div class="spinner-border spinner-border-sm me-2" role="status"></div>Loading...</div>';
        } else {
            element.innerHTML = '';
        }
    }
}

/**
 * Utility function to display error messages
 * @param {string} elementId - ID of element to display error in
 * @param {string} message - Error message to display
 */
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
    }
}

/**
 * Prevent form submission on Enter key (except in textareas)
 */
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
        const form = event.target.closest('form');
        if (form && !event.target.matches('button[type="submit"]')) {
            event.preventDefault();
        }
    }
});

/**
 * Add animation class when elements come into view
 */
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });
}

// Initialize animations if supported
if ('IntersectionObserver' in window) {
    animateOnScroll();
}

// Export functions for use in HTML onclick handlers
window.handleSubscribe = handleSubscribe;
window.handleContact = handleContact;