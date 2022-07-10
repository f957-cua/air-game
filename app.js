const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')

let time = 0
let score = 0
const colors = [
  "#adff2f",
  "#00ff00",
  "#32cd32",
  "#98fb98",
  "#3cb371",
  "#228b22",
  "#006400",
  "#a0522d",
  "#800000",
];

startBtn.addEventListener('click', (e) => {
  e.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', e => {
  if (e.target.classList.contains('time-btn')) {
    time = parseInt(
      e.target.getAttribute("data-time")
    );
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', (e) => {
  if (e.target.classList.contains('circle')) {
    score++
    e.target.remove()
    createRandomCircle()
  }
})

function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomCircle()
  setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Your score: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement('div')
  const size = getRandomNumber(10, 60)
  const {width, height} = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)
  
  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  setColor(circle)

  board.append(circle)
}

function getRandomNumber(max, min) {
  return Math.round(Math.random() * (max - min) +min)
}

function setColor(el) {
  const color = getRandomColor();
  el.style.background = color;
  el.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function getRandomColor() {
  const index = Math.floor(
    Math.random() * colors.length
  );
  return colors[index];
}