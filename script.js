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

function cardStep() {
  return cards[0].getBoundingClientRect().width + 20;
}

function positionFor(currentIndex) {
  return -currentIndex * cardStep();
}

function slide(direction) {
  index = Math.max(0, Math.min(cards.length - 1, index + direction));
  track.style.transform = `translateX(${positionFor(index)}px)`;
}
document.querySelector('.next').addEventListener('click', () => slide(1));
document.querySelector('.prev').addEventListener('click', () => slide(-1));

let dragStart = 0;
let dragOffset = 0;
let isDragging = false;

track.addEventListener('pointerdown', event => {
  dragStart = event.clientX;
  dragOffset = positionFor(index);
  isDragging = true;
  track.classList.add('dragging');
  track.setPointerCapture(event.pointerId);
});

track.addEventListener('pointermove', event => {
  if (!isDragging) return;
  const maxOffset = positionFor(cards.length - 1);
  const nextOffset = Math.max(maxOffset, Math.min(0, dragOffset + event.clientX - dragStart));
  track.style.transform = `translateX(${nextOffset}px)`;
});

function finishDrag(event) {
  if (!isDragging) return;
  isDragging = false;
  track.classList.remove('dragging');
  const distance = event.clientX - dragStart;
  if (Math.abs(distance) > 45) index += distance < 0 ? 1 : -1;
  index = Math.max(0, Math.min(cards.length - 1, index));
  track.style.transform = `translateX(${positionFor(index)}px)`;
}

track.addEventListener('pointerup', finishDrag);
track.addEventListener('pointercancel', finishDrag);
window.addEventListener('resize', () => slide(0));

const heroGrid = document.querySelector('.hero-grid');
window.addEventListener('pointermove', event => {
  if (window.innerWidth < 700) return;
  const x = (event.clientX / window.innerWidth - .5) * 12;
  const y = (event.clientY / window.innerHeight - .5) * 12;
  heroGrid.style.transform = `translate(${x}px, ${y}px)`;
});
