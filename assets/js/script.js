let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};


updateScoreElement();



/* if (!score) {
score = {
  wins: 0,
  losses: 0,
  ties: 0
};
} */

let isAutoPlaying = false;
let intervalId ;
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickCompMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  }
  else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}


document.querySelector('.js-rock-btn')
  .addEventListener('click', () => {
    playGame('rock');
  })

  document.querySelector('.js-paper-btn')
    .addEventListener('click', () => {
      playGame('paper');
    })

  document.querySelector('.js-scissors-btn')
    .addEventListener('click', () => {
      playGame('scissors');
    })

  document.querySelector('.reset-btn')
    .addEventListener('click', () => {
      score.wins= 0;
      score.losses= 0;
      score.ties= 0;
      localStorage.removeItem('score');
      updateScoreElement();
    });

  document.querySelector('.auto-play-btn')
  .addEventListener('click', () => {
    autoPlay();
  });

  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
      playGame('rock');
    }
    else if (event.key === 'p') {
      playGame('paper');
    }
    else if (event.key === 's') {
      playGame('scissors');
    }
  });

function playGame(playerMove) {
const compMove = pickCompMove();
let result = '';
if (playerMove === 'rock') {
  if (compMove === 'rock') {
    result = 'Tie';
  }
  else if (compMove === 'paper') {
    result = 'You lose';
  }
  else if (compMove === 'scissors') {
    result = 'You win';
  }
}

else if (playerMove === 'paper') {
  if (compMove === 'rock') {
    result = 'You win';
  }
  else if (compMove === 'paper') {
    result = 'Tie';
  }
  else if (compMove === 'scissors') {
    result = 'You lose';
  }
}

else if (playerMove === 'scissors') {
  if (compMove === 'rock') {
    result = 'You lose';
  }
  else if (compMove === 'paper') {
    result = 'You win';
  }
  else if (compMove === 'scissors') {
    result = 'Tie';
  }
}

if (result === 'You win') {
  score.wins += 1;
}
else if (result === 'You lose') {
  score.losses += 1;
}
else if (result === 'Tie') {
  score.ties += 1;
}

localStorage.setItem('score', JSON.stringify(score));

updateScoreElement();

document.querySelector('.js-result')
  .innerHTML = result;

document.querySelector('.js-moves')
  .innerHTML = `You
  <img src="assets/images/${playerMove}-emoji.png" alt="" class="move-icon"> | Computer <img src="assets/images/${compMove}-emoji.png" alt="" class="move-icon">`;

}

function updateScoreElement (){
document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Tie: ${score.ties}`;
}

function pickCompMove() {
const randomMove = Math.random();
let compMove = '';
if (randomMove >= 0 && randomMove < 1/3) {
compMove = 'rock';
}
else if (randomMove >= 1/3 && randomMove < 2/3) {
compMove = 'paper';
}
else if (randomMove >= 2/3 && randomMove < 1) {
compMove = 'scissors';
}
return compMove;
}