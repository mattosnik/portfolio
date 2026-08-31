const nav = document.querySelector('.nav');
const menu = document.querySelector('.menu-toggle');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(item => observer.observe(item));

const track = document.querySelector('.project-track');
const cards = [...document.querySelectorAll('.project-card')];
let index = 0;
function slide(direction) {
  index = Math.max(0, Math.min(cards.length - 1, index + direction));
  const cardWidth = cards[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${index * (cardWidth + 19)}px)`;
}
document.querySelector('.next').addEventListener('click', () => slide(1));
document.querySelector('.prev').addEventListener('click', () => slide(-1));
let startX = 0;
track.addEventListener('pointerdown', e => { startX = e.clientX; track.setPointerCapture(e.pointerId); });
track.addEventListener('pointerup', e => { if (Math.abs(e.clientX - startX) > 45) slide(e.clientX < startX ? 1 : -1); });
window.addEventListener('resize', () => slide(0));

const heroGrid = document.querySelector('.hero-grid');
window.addEventListener('pointermove', event => {
  if (window.innerWidth < 700) return;
  const x = (event.clientX / window.innerWidth - .5) * 12;
  const y = (event.clientY / window.innerHeight - .5) * 12;
  heroGrid.style.transform = `translate(${x}px, ${y}px)`;
});
