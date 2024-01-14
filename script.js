const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let firstClickedCard, secondClickedCard;

function flipCard() {
  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstClickedCard = this;

    return;
  } else {
    hasFlippedCard = false;
    secondClickedCard = this;
    checkForMatch();
  }
}

function checkForMatch() {
  let isMatch =
    firstClickedCard.dataset.frame === secondClickedCard.dataset.frame;

  isMatch ? disableCards() : upFlipCards();
}

function disableCards() {
  firstClickedCard.removeEventListener("click", flipCard);
  secondClickedCard.removeEventListener("click", flipCard);
}

function upFlipCards() {
  setTimeout(() => {
    firstClickedCard.classList.remove("flip");
    secondClickedCard.classList.remove("flip");
  }, 800);
}

(function shuffle() {
  cards.forEach((card) => {
    let random = Math.floor(Math.random() * 12);
    card.style.order = random;
  });
})();

let countDownActive = false;
let startButton = document.getElementById("start");
startButton.addEventListener("click", function go() {
  if (startButton) {
    countDownActive = true;
  }
});
let stopButton = document.getElementById("stop");
let card = document.querySelectorAll(".memory-card");
stopButton.addEventListener("click", function stopCountdown() {
  if (countDownActive) {
    countDownActive = false;
  }
  for (i = 0; i < card.length; i++) {
    cards[i].style.pointerEvents = "none";
  }
});
// let cardss = document.querySelectorAll(".memory-card");
let resumeButton = document.getElementById("resume");
resumeButton.addEventListener("click", function startCountdown() {
  if (!countDownActive) {
    countDownActive = true;
  }
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function () {
      if (!flipCard) {
        flipCard = true;
      }
    });
  }
});

let timeLeft = 30;
let countDown = setInterval(function () {
  if (!countDownActive) return;
  let minutes = Math.floor(timeLeft / 60);
  let seconds = Math.floor(timeLeft % 60);

  document.getElementById("countDown").innerHTML =
    minutes + "min " + seconds + "sec";
  timeLeft--;

  if (timeLeft <= 0) {
    disableCards();
    clearInterval(countDown);
    document.getElementById("countDown").innerHTML = "Time's Up!";
    let cards = document.querySelectorAll(".memory-card");
    for (i = 0; i < cards.length; i++) {
      cards[i].style.pointerEvents = "none";
    }
  }
}, 1000);

cards.forEach((card) => card.addEventListener("click", flipCard));
