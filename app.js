// Simple intersection observer for smooth fade-in animations on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in styles dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Apply fade-in class to elements
    const elementsToAnimate = [
        ...document.querySelectorAll('.section-title'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.stack-category'),
        document.querySelector('.code-block-wrapper')
    ];

    elementsToAnimate.forEach(el => {
        if(el) el.classList.add('fade-in');
    });

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elementsToAnimate.forEach(el => {
        if(el) observer.observe(el);
    });
});
