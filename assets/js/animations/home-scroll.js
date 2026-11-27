document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -56px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title, .about__content, .skills__item').forEach((el) => {
        observer.observe(el);
    });

    let pendingScrollFrame = false;
    const updateScrolledState = () => {
        pendingScrollFrame = false;
        if (window.scrollY > 96) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', () => {
        if (pendingScrollFrame) return;
        pendingScrollFrame = true;
        requestAnimationFrame(updateScrolledState);
    }, { passive: true });
});