(function() {
  const initGalleryOverlay = () => {
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    if (!galleryImages.length) return;

    const overlay = document.createElement('div');
    overlay.className = 'gallery-overlay';
    overlay.innerHTML = `
      <div class="gallery-overlay__content" role="dialog" aria-modal="true" aria-label="Expanded gallery photo">
        <button class="gallery-overlay__close" type="button" aria-label="Close photo preview">&times;</button>
        <img class="gallery-overlay__image" alt="" />
        <p class="gallery-overlay__caption"></p>
      </div>
    `;

    const overlayImage = overlay.querySelector('.gallery-overlay__image');
    const overlayCaption = overlay.querySelector('.gallery-overlay__caption');
    const closeButton = overlay.querySelector('.gallery-overlay__close');

    const closeOverlay = () => {
      overlay.classList.remove('is-active');
      document.body.classList.remove('modal-open');
      overlayImage.removeAttribute('src');
      overlayImage.alt = '';
    };

    const openOverlay = (img) => {
      overlayImage.src = img.src;
      overlayImage.alt = img.alt || 'Gallery photo';
      overlayCaption.textContent = img.alt || 'Gallery photo';
      overlay.classList.add('is-active');
      document.body.classList.add('modal-open');
      closeButton.focus();
    };

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) {
        closeOverlay();
      }
    });

    closeButton.addEventListener('click', closeOverlay);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && overlay.classList.contains('is-active')) {
        closeOverlay();
      }
    });

    galleryImages.forEach((img) => {
      img.setAttribute('role', 'button');
      img.setAttribute('tabindex', '0');
      img.addEventListener('click', () => openOverlay(img));
      img.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openOverlay(img);
        }
      });
    });

    document.body.appendChild(overlay);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGalleryOverlay);
  } else {
    initGalleryOverlay();
  }
})();
