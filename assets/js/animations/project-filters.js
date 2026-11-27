document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length === 0 || projectCards.length === 0) {
        return;
    }

    const announceFilterChange = (category) => {
        if (category === 'all') return;

        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.classList.add('sr-only');
        announcement.textContent = `Filtre par categorie ${category}`;
        document.body.appendChild(announcement);

        setTimeout(() => {
            announcement.remove();
        }, 1000);
    };

    const animateProjectCards = (categoryId) => {
        const cards = Array.from(projectCards);

        cards.forEach((card) => {
            const cardCategory = card.getAttribute('data-category');
            const shouldShow = categoryId === 'all' || cardCategory === categoryId;

            if (shouldShow) {
                card.hidden = false;
                card.classList.remove('hidden');
                card.classList.add('visible');
            } else {
                card.classList.add('hidden');
                card.classList.remove('visible');
                card.hidden = true;
            }
        });
    };

    filterButtons.forEach((button) => {
        button.addEventListener('click', function(e) {
            const categoryId = this.getAttribute('data-category');

            filterButtons.forEach((btn) => btn.classList.remove('active'));
            this.classList.add('active');

            animateProjectCards(categoryId);
            announceFilterChange(categoryId);
        });
    });
});