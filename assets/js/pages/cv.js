document.addEventListener('DOMContentLoaded', () => {
    const cvViewer = document.querySelector('[data-cv-viewer]');
    const cvInner = document.querySelector('[data-cv-inner]');
    if (!cvViewer || !cvInner) {
        return;
    }

    const zoomIn = document.querySelector('[data-cv-zoom-in]');
    const zoomOut = document.querySelector('[data-cv-zoom-out]');
    const zoomReset = document.querySelector('[data-cv-zoom-reset]');
    let zoom = 1;

    const updateZoom = () => {
        zoom = Math.min(2, Math.max(0.7, zoom));
        cvInner.style.transform = `scale(${zoom})`;
        if (zoomReset) {
            zoomReset.textContent = `${Math.round(zoom * 100)}%`;
        }
    };

    if (zoomIn) {
        zoomIn.addEventListener('click', () => {
            zoom += 0.1;
            updateZoom();
        });
    }

    if (zoomOut) {
        zoomOut.addEventListener('click', () => {
            zoom -= 0.1;
            updateZoom();
        });
    }

    if (zoomReset) {
        zoomReset.addEventListener('click', () => {
            zoom = 1;
            updateZoom();
        });
    }

    updateZoom();
});