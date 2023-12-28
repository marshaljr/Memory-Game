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

let timeLeft = 60;
let countDown = setInterval(function () {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = Math.floor(timeLeft % 60);

  document.getElementById("time").innerHTML =
    minutes + "min " + seconds + "sec";
  timeLeft--;

  if (timeLeft <= 0) {
    disableCards();
    clearInterval(countDown);
    document.getElementById("time").innerHTML = "Time's Up!";
    const cards = document.querySelectorAll(".memory-card");
    for (i = 0; i < cards.length; i++) {
      cards[i].style.pointerEvents = "none";
    }
  }
}, 1000);

cards.forEach((card) => card.addEventListener("click", flipCard));
