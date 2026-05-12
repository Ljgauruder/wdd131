const menuButton = document.getElementById('menu-button');
const navLinks = document.getElementById('nav-links');

menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navLinks.classList.remove('active');
    }
});

const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const closeBtn = document.getElementById('close-btn');
const gallery = document.getElementById('gallery');

gallery.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if (!img) return;

    modalImage.src = img.src;
    modalImage.alt = img.alt;
    modal.showModal();
});

closeBtn.addEventListener('click', () => {
    modal.close();
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.close();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.open) {
        modal.close();
    }
});