document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href]:not([target="_blank"]):not([download])').forEach((link) => {
        link.addEventListener('click', function (e) {
            if (e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

            let targetUrl;
            try {
                targetUrl = new URL(this.getAttribute('href') || '', window.location.href);
            } catch {
                return;
            }

            const isSameOrigin = targetUrl.origin === window.location.origin;
            const isHashNavigation = targetUrl.pathname === window.location.pathname && targetUrl.hash !== '';
            const isJavaScriptLink = targetUrl.protocol === 'javascript:';

            if (!isSameOrigin || isHashNavigation || isJavaScriptLink) return;

            e.preventDefault();
            document.body.style.opacity = '0';
            window.location.href = targetUrl.href;
        });
    });
});