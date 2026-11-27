document.addEventListener('DOMContentLoaded', () => {
    const loginPage = document.querySelector('.login-page');
    if (!loginPage) {
        return;
    }

    const passwordInput = document.querySelector('#password');
    const togglePassword = document.querySelector('[data-password-toggle]');
    const capsHint = document.querySelector('[data-caps-lock]');

    if (!passwordInput || !togglePassword) {
        return;
    }

    togglePassword.addEventListener('click', () => {
        const isPassword = passwordInput.getAttribute('type') === 'password';
        passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
        togglePassword.textContent = isPassword ? 'Masquer' : 'Afficher';
    });

    passwordInput.addEventListener('keyup', (event) => {
        if (!capsHint) return;
        const capsOn = event.getModifierState && event.getModifierState('CapsLock');
        capsHint.hidden = !capsOn;
    });
});