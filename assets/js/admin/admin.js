document.addEventListener('DOMContentLoaded', () => {
    const adminLayout = document.querySelector('.admin-layout');
    if (!adminLayout) {
        return;
    }

    document.body.classList.add('admin-page');

    const normalizePath = (value) => {
        if (!value) return '/';
        const trimmed = value.replace(/\/+$/, '');
        return trimmed.length ? trimmed : '/';
    };

    const setupAdminNav = () => {
        const adminNav = adminLayout.querySelector('.admin-nav nav');
        if (!adminNav) return null;

        const nodesToRemove = adminLayout.querySelectorAll('.admin-nav__home');
        nodesToRemove.forEach((node) => node.remove());

        adminNav.querySelectorAll('a').forEach((link) => {
            if ((link.textContent || '').trim().toLowerCase() === 'retour au portfolio') {
                link.remove();
            }
        });

        const profileLink = adminNav.querySelector('a[href*="/admin/utilisateur"]');
        const hasActivitiesLink = !!adminNav.querySelector('a[href*="/admin/activites"]');
        if (profileLink && !adminNav.querySelector('a[data-admin-activities="main"]') && !hasActivitiesLink) {
            const baseProfileHref = profileLink.getAttribute('href') || '';
            const activitiesHref = baseProfileHref.replace('/admin/utilisateur', '/admin/activites');

            const activitiesLink = document.createElement('a');
            activitiesLink.href = activitiesHref;
            activitiesLink.textContent = 'Activites externes';
            activitiesLink.setAttribute('data-admin-activities', 'main');
            profileLink.insertAdjacentElement('beforebegin', activitiesLink);
        }

        const currentPath = normalizePath(window.location.pathname);
        const allLinks = adminNav.querySelectorAll('a');
        allLinks.forEach((link) => {
            link.classList.remove('active');
            try {
                const linkPath = normalizePath(new URL(link.href, window.location.origin).pathname);
                const isAdminRootLink = /\/admin$/.test(linkPath);
                const isExactMatch = currentPath === linkPath;
                const isSectionMatch = !isAdminRootLink && currentPath.startsWith(`${linkPath}/`);
                if (isExactMatch || isSectionMatch) {
                    link.classList.add('active');
                }
            } catch {}
        });

        return adminNav;
    };

    const setupMobileNavToggle = (adminNav) => {
        if (!adminNav || window.innerWidth > 1024) return;

        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'admin-nav__toggle';
        toggle.textContent = 'Menu admin';
        adminNav.parentNode?.insertBefore(toggle, adminNav);

        toggle.addEventListener('click', () => {
            adminNav.classList.toggle('is-open');
            toggle.classList.toggle('is-open');
        });
    };

    const setupDeleteConfirmations = () => {
        document.querySelectorAll('.admin-content form[action*="/supprimer/"] button[type="submit"]').forEach((btn) => {
            if (btn.hasAttribute('onclick')) {
                btn.removeAttribute('onclick');
            }

            btn.addEventListener('click', (e) => {
                const action = (btn.closest('form')?.getAttribute('action') || '').toLowerCase();
                let item = 'cet element';
                if (action.includes('/projets/')) item = 'ce projet';
                if (action.includes('/categories/')) item = 'cette categorie';
                if (action.includes('/competences/')) item = 'cette competence';
                if (action.includes('/labels/')) item = 'ce label';
                if (action.includes('/images/')) item = 'cette image';

                if (!window.confirm(`Confirmer la suppression de ${item} ?`)) {
                    e.preventDefault();
                }
            });
        });
    };

    const setupImagePreviews = () => {
        document.querySelectorAll('.admin-form input[type="file"]').forEach((input) => {
            if (!(input instanceof HTMLInputElement)) return;

            const preview = document.createElement('div');
            preview.className = 'admin-upload-preview';
            input.insertAdjacentElement('afterend', preview);

            input.addEventListener('change', () => {
                preview.innerHTML = '';
                const file = input.files && input.files[0];
                if (!file || !file.type.startsWith('image/')) return;

                const img = document.createElement('img');
                img.alt = 'Apercu';
                img.src = URL.createObjectURL(file);
                preview.appendChild(img);
            });
        });
    };

    const setupRevealAnimations = () => {
        const revealTargets = adminLayout.querySelectorAll(
            '.admin-content > h1, .admin-dashboard__hero, .flash, .admin-stat, .dashboard-links, .admin-form, .admin-table, .images-grid, .dashboard-card'
        );

        let index = 0;
        revealTargets.forEach((el) => {
            el.classList.add('admin-reveal');
            const delay = Math.min(index * 30, 180);
            if (delay > 0) {
                el.style.setProperty('--admin-delay', `${delay}ms`);
            }
            index++;
        });

        document.body.classList.add('admin-ready');
    };

    const adminNav = setupAdminNav();
    setupMobileNavToggle(adminNav);
    setupDeleteConfirmations();
    setupImagePreviews();
    setupRevealAnimations();
});