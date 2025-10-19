const box = document.getElementById('escapeBox');
const text = document.getElementById('time');
const nah = document.getElementById('startRain');
const button = document.getElementById('escapeButton');

function accept() {
  text.textContent = "💝Chị Hà dỏi qa, thương chị Hà lắm á";
  text.style.color = `#ff008c`;
  document.body.style.backgroundImage = `url('images/bg.png')`;
  document.body.style.backgroundColor = `white`;
  nah.remove();
  box.remove();
}

box.addEventListener('mouseenter', (e) => {
  button.innerText = "💝ôke💝";
  /*const mouseX = e.clientX;
  const mouseY = e.clientY;

  const boxWidth = box.offsetWidth;
  const boxHeight = box.offsetHeight;

  const maxX = window.innerWidth - boxWidth;
  const maxY = window.innerHeight - boxHeight;

  const minDistance = 200;

  let randomX, randomY, distance;

  do {
    randomX = Math.floor(Math.random() * maxX);
    randomY = Math.floor(Math.random() * maxY);
    const dx = randomX - mouseX;
    const dy = randomY - mouseY;
    distance = Math.sqrt(dx * dx + dy * dy);
  } while (distance < minDistance);

  randomX = Math.min(Math.max(0, randomX), maxX);
  randomY = Math.min(Math.max(0, randomY), maxY);

  box.style.left = `${randomX}px`;
  box.style.top = `${randomY}px`;*/
});

box.addEventListener('mouseleave', (e) => {
  button.innerText = "💔hong💔";
});

let rainInterval;

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.textContent = '💝';

  const size = Math.random() * 20 + 20;
  heart.style.fontSize = `${size}px`;

  const left = Math.random() * window.innerWidth;
  heart.style.left = `${left}px`;

  const duration = Math.random() * 3 + 2;
  heart.style.animationDuration = `${duration}s`;

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

document.getElementById('startRain').addEventListener('click', () => {
  if (!rainInterval) {
    rainInterval = setInterval(createHeart, 200);
  }
});