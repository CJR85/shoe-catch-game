const screens = document.querySelectorAll('.screen'),
  choose_shoe_btns = document.querySelectorAll('.choose-shoe-btn'),
  start_btn = document.getElementById('start-btn'),
  game_container = document.getElementById('game-container'),
  timeEl = document.getElementById('time'),
  scoreEl = document.getElementById('score'),
  message = document.getElementById('message');
let seconds = 0,
  score = 0,
  selected_shoe = {};

start_btn.addEventListener('click', () => screens[0].classList.add('up'));

choose_shoe_btns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img'),
      src = img.getAttribute('src'),
      alt = img.getAttribute('alt');
    selected_shoe = { src, alt };
    screens[1].classList.add('up');
    setTimeout(createShoe, 1000);
    startGame();
  });
});

function startGame() {
  setInterval(increaseTime, 1000);
}

function increaseTime() {
  let m = Math.floor(seconds / 60),
    s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeEl.innerHTML = `Time: ${m}:${s}`;
  seconds++;
}

function createShoe() {
  const shoe = document.createElement('div');
  shoe.classList.add('shoe');
  const { x, y } = getRandomLocation();
  shoe.style.top = `${y}px`;
  shoe.style.top = `${x}px`;
  shoe.innerHTML = `<img src="${selected_shoe.alt}" style="transform: rotate(${
    Math.random() * 360
  }deg)" />`;

  shoe.addEventListener('click', catchShoe);

  game_container.appendChild(shoe);
}

function getRandomLocation() {
  const width = window.innerWidth,
    height = window.innerHeight,
    x = Math.random() * (width - 200) + 100,
    y = Math.random() * (height - 200) + 100;
  return { x, y };
}

function catchShoe() {
  increaseScore();
  this.classList.add('caught');
  setTimeout(() => this.remove(), 2000);
  addShoes();
}

function addShoes() {
  setTimeout(createShoe, 1000);
  setTimeout(createShoe, 1500);
}

function increaseScore() {
  score++;
  if (score > 19) {
    message.classList.add('visible');
  }
  scoreEl.innerHTML = `Score: ${score}`;
}
