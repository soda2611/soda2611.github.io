let rainInterval;

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.textContent = '💧';

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

setInterval(createHeart, 200);