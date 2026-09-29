// Mobile Navigation Toggle
const menuBtn = document.querySelector('.menu');
const nav = document.querySelector('#nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('open', !isOpen);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuBtn.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    });
  });
}

// Lightbox Photo Gallery
const photos = [
  ['hero.webp', 'Vista panorâmica da piscina e telhados coloniais da Pousada Pouso do Rio'],
  ['rio-das-almas.webp', 'As corredeiras límpidas e pedras do Rio das Almas ao lado da pousada'],
  ['fachada-colonial.webp', 'Entrada colonial com portas azuis e arco de bougainvilleas em flor'],
  ['piscina.webp', 'Piscina de água azul cristalina e espreguiçadeira ao sol'],
  ['cafe-da-manha.webp', 'Mesa de café da manhã goiano com pamonha, queijo minas e quitandas'],
  ['varanda-noite.webp', 'Varanda colonial com iluminação aconchegante ao anoitecer'],
  ['varanda-aconchego.webp', 'Varanda rústica sombreada com bancos de madeira maciça e plantas'],
  ['piscina-pergolado.webp', 'Piscina com borda de pedra quartzito e pergolado florido'],
  ['natureza-rio.webp', 'Margem preservada do Rio das Almas sob a copa das árvores']
];

const box = document.querySelector('#lightbox');
let selected = 0;

function renderPhoto() {
  if (!box) return;
  const img = box.querySelector('img');
  const counter = box.querySelector('.counter');
  
  img.src = photos[selected][0];
  img.alt = photos[selected][1];
  counter.textContent = `${selected + 1} de ${photos.length} — ${photos[selected][1]}`;
}

function advance(step) {
  selected = (selected + step + photos.length) % photos.length;
  renderPhoto();
}

if (box) {
  document.querySelectorAll('[data-photo]').forEach((btn) => {
    btn.addEventListener('click', () => {
      selected = Number(btn.dataset.photo) || 0;
      renderPhoto();
      box.showModal();
      document.body.style.overflow = 'hidden';
    });
  });

  const closeBtn = box.querySelector('.close');
  const prevBtn = box.querySelector('.previous');
  const nextBtn = box.querySelector('.next');

  if (closeBtn) closeBtn.addEventListener('click', () => box.close());
  if (prevBtn) prevBtn.addEventListener('click', () => advance(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => advance(1));

  box.addEventListener('close', () => {
    document.body.style.overflow = '';
  });

  box.addEventListener('click', (e) => {
    if (e.target === box) box.close();
  });

  box.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      advance(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      advance(-1);
    }
  });
}
