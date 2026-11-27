document.addEventListener('DOMContentLoaded', () => {
    const heroLinks = document.querySelectorAll('.hero__links a');

    heroLinks.forEach((link) => {
        link.addEventListener('click', () => {
            link.classList.add('is-pressed');
            setTimeout(() => {
                link.classList.remove('is-pressed');
            }, 80);
        });
    });
});