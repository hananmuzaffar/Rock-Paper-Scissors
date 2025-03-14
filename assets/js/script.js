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
autoPlayElement = document.querySelector('.auto-play-btn');
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickCompMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    autoPlayElement.innerHTML = 'Stop Playing';
  }
  else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoPlayElement.innerHTML = 'Auto Play';
  }
}


document.querySelector('.rock-btn')
  .addEventListener('click', () => {
    playGame('rock');
  })

  document.querySelector('.paper-btn')
    .addEventListener('click', () => {
      playGame('paper');
    })

  document.querySelector('.scissors-btn')
    .addEventListener('click', () => {
      playGame('scissors');
    })

  document.querySelector('.reset-btn')
    .addEventListener('click', () => {
      showResetConfirmation();
    });

  document.querySelector('.auto-play-btn')
  .addEventListener('click', () => {
    autoPlay();
  });

  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r' || event.key === 'R') {
      playGame('rock');
    }
    else if (event.key === 'p' || event.key === 'P') {
      playGame('paper');
    }
    else if (event.key === 's' || event.key === 'S') {
      playGame('scissors');
    }
    else if (event.key === 'a' || event.key === 'A') {
      autoPlay();
    }
    else if (event.key === 'Backspace') {
      showResetConfirmation();
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


function resetScore() {
  score.wins= 0;
  score.losses= 0;
  score.ties= 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

function showResetConfirmation() {
  document.querySelector('.reset-confirmation-msg')
    .innerHTML = `
    Are you sure you want to reset the score?
    <button class="reset-confirm-btn reset-yes">
      Yes</button>
    <button class="reset-confirm-btn reset-no">
      No</button>
    `;

  document.querySelector('.reset-yes')
    .addEventListener('click', () => {
      resetScore();
      hideResetConfirmation();
    });

    document.querySelector('.reset-no')
      .addEventListener('click', () => {
        hideResetConfirmation();
      });
}

function hideResetConfirmation() {
  document.querySelector('.reset-confirmation-msg').innerHTML = '';
}