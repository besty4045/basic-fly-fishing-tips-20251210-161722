// Modern Template JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
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

    // Add active state to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.style.color = 'var(--primary-color)';
            link.style.fontWeight = '600';
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all content sections
    document.querySelectorAll('.content-section, .section-h1, .section-paragraph, .section-faq, .section-links, .section-embed').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// FAQ toggle helper (used by generated HTML)
window.toggleFAQ = function(index) {
    const answer = document.getElementById(`faq-${index}`);
    if (!answer) return;
    const isOpen = answer.style.display === 'block';
    answer.style.display = isOpen ? 'none' : 'block';
    const icon = answer.previousElementSibling?.querySelector('.faq-icon');
    if (icon) {
        icon.textContent = isOpen ? '+' : '-';
    }
};
