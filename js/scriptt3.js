let score = 0;
let time = 0;
let timer;
let timerInterval;
let ballCreationIntervalId;
let level = 0;
let restartButton;
let ballWidth = 50;
const squareSize = 700;
const ballCreationInterval = 800;
let gamePaused = true;
let obstacleCoordinates = [];
let mouseClickCoordinates = {};




document.getElementById('overlay').style.display = 'none';

document.querySelector('#instruction-modal button').addEventListener('click', level1);


document.getElementById('easyBtn').addEventListener('click', function () {
  // Create an audio element
  var audio = new Audio('/Sounds/Common%20Sound/click.wav'); // Replace 'sound.wav' with the path to your sound file

  // Play the audio
  audio.play();
});


document.getElementById('mediumBtn').addEventListener('click', function () {
  // Create an audio element
  var audio = new Audio('/Sounds/Common%20Sound/click.wav'); // Replace 'sound.wav' with the path to your sound file
  // Play the audio
  audio.play();
});


document.getElementById('hardBtn').addEventListener('click', function () {
  // Create an audio element
  var audio = new Audio('/Sounds/Common%20Sound/click.wav'); // Replace 'sound.wav' with the path to your sound file

  // Play the audio
  audio.play();
});

//soud and all
const audioSettingCheckbox = document.getElementById('audio_setting');
const audioIconOn = document.getElementById('audio_icon_on');
const audioIconOff = document.getElementById('audio_icon_off');
let backgroundAudio;

function toggleBackgroundAudio() {
  if (audioSettingCheckbox.checked) {
    playBackgroundSound();
    audioIconOn.style.display = 'block';
    audioIconOff.style.display = 'none';
  } else {
    stopBackgroundSound();
    audioIconOn.style.display = 'none';
    audioIconOff.style.display = 'block';
  }
}
function playBackgroundSound() {
  if (backgroundAudio) {
    stopBackgroundSound(); // Stop any existing audio before starting a new one
  }
  backgroundAudio = new Audio('Sounds/Common%20Sound/background.mp3');
  backgroundAudio.volume = 0.1;
  backgroundAudio.loop = true;
  backgroundAudio.play();
}

function stopBackgroundSound() {
  if (backgroundAudio) {
    backgroundAudio.pause();
    backgroundAudio.currentTime = 0;
    backgroundAudio = null; // Ensure the old audio instance is cleared
  }
}

audioSettingCheckbox.addEventListener('change', toggleBackgroundAudio);
toggleBackgroundAudio()



function pauseGame() {
  clearInterval(timer);
  clearInterval(ballCreationIntervalId);
  gamePaused = true;
}

function resumeGame() {
  timer = setInterval(() => {
    time++;
    document.getElementById('time-value').innerText = time;
    // Add conditions for game over or level completion
  }, 1000);

  ballCreationIntervalId = setInterval(() => {
    const ball = createRedBall();
    document.body.appendChild(ball);
    animateBall(ball);
  }, ballCreationInterval);

  gamePaused = false;
}



function createRedBall() {
  const ball = document.createElement('div');
  ball.classList.add('ball', 'red');
  let currentFrame = 1;
  ball.style.backgroundImage = `url('Images/Dream_Drop/ball${currentFrame}.png')`; // Assuming the images are named ball1.png to ball9.png
  ball.style.backgroundSize = 'contain';
  ball.style.backgroundRepeat = 'no-repeat';

  const diameter = 40;
  const buffer = 20;
  const leftBoundary = (window.innerWidth - squareSize) / 2;
  const topBoundary = (window.innerHeight - squareSize) / 2;
  let left, top;
  do {
    left = leftBoundary + Math.random() * squareSize;
    top = topBoundary + Math.random() * squareSize;
  } while (checkCollision(left, top, diameter + buffer));

  ball.style.left = left + 'px';
  ball.style.top = top + 'px';

  function nextFrame() {
    currentFrame = (currentFrame % 9) + 1; // Assuming you have 9 frames of animation
    ball.style.backgroundImage = `url('Images/Dream_Drop/ball${currentFrame}.png')`;
  }

  // Interval to change frames and create animation effect
  const animationInterval = setInterval(nextFrame, 100);

  // Cleanup function to remove interval when the ball is removed
  ball.addEventListener('animationend', function () {
    clearInterval(animationInterval);
  });

  return ball;
}




function checkCollision(left, top, size) {
  const balls = document.querySelectorAll('.ball');
  balls.forEach(ball => {
    const ballRect = ball.getBoundingClientRect();
    const ballLeft = ballRect.left;
    const ballTop = ballRect.top;
    const ballRight = ballRect.right;
    const ballBottom = ballRect.bottom;

    if (left < ballRight && left + size > ballLeft && top < ballBottom && top + size > ballTop) {
      return true;
    }
  });
  return false;
}


document.addEventListener('click', function (event) {

  let x = event.clientX;
  let y = event.clientY;

  let clickKey = new Date().getTime();  // Use timestamp as the unique key for each click
  mouseClickCoordinates[clickKey] = { x, y };


  console.log(`Click recorded at: (${x}, ${y})`);
  console.log(mouseClickCoordinates);
});



document.addEventListener("DOMContentLoaded", function () {

  document.getElementById('easyBtn').addEventListener('click', function () {
    // Play click sound
    var audio = new Audio('/Sounds/Common%20Sound/click.wav');
    audio.play();

    // Set background and clear game
    document.getElementById('fidrat-home').style.backgroundImage = 'url("Images/Common_Images/gamebg.png")';
    clearGame();

    // Hide menu elements
    document.getElementById('para').style.display = 'none';
    document.getElementById('para1').style.display = 'none';
    document.getElementById('ie').style.display = 'none';
    document.getElementById('vv').style.display = 'none';
    document.getElementById('shanti').style.display = 'none';
    document.getElementById('prem').style.display = 'none';
    document.getElementById('game-title').style.display = 'none';
    document.getElementById('easyBtn').style.display = 'none';
    document.getElementById('mediumBtn').style.display = 'none';
    document.getElementById('hardBtn').style.display = 'none';

    // Skip the instruction modal and start level 1 directly
    document.getElementById('instruction-modal').style.display = 'none';
    document.getElementById('fidrat-home').style.backgroundColor = 'lightgoldenrodyellow';

    // Reset game state and start level 1
    score = 0;
    time = 0;
    currentLevel = 1;
    level1();
  });


  document.getElementById('mediumBtn').addEventListener('click', function () {
    // Play click sound
    var audio = new Audio('/Sounds/Common%20Sound/click.wav');
    audio.play();

    // Clear any existing game elements
    clearGame();

    // Hide all menu elements
    document.getElementById('para').style.display = 'none';
    document.getElementById('para1').style.display = 'none';
    document.getElementById('ie').style.display = 'none';
    document.getElementById('vv').style.display = 'none';
    document.getElementById('shanti').style.display = 'none';
    document.getElementById('prem').style.display = 'none';
    document.getElementById('game-title').style.display = 'none';
    document.getElementById('easyBtn').style.display = 'none';
    document.getElementById('mediumBtn').style.display = 'none';
    document.getElementById('hardBtn').style.display = 'none';
    document.getElementById('instruction-modal').style.display = 'none';

    // Set game background
    document.getElementById('fidrat-home').style.backgroundImage = 'url("Images/Common_Images/gamebg.png")';
    document.getElementById('fidrat-home').style.backgroundColor = 'lightgoldenrodyellow';

    // Reset game state
    score = 0;
    time = 0;
    currentLevel = 3; // Medium level starts at level 3

    // Start level 3 directly
    level3();
  });

  document.getElementById('hardBtn').addEventListener('click', function () {
    document.getElementById('fidrat-home').style.backgroundImage = 'url("Images/Common_Images/gamebg.png")';
    clearGame();
    level7();
    document.getElementById('para').style.display = 'none';
    document.getElementById('para1').style.display = 'none';
    document.getElementById('ie').style.display = 'none';
    document.getElementById('vv').style.display = 'none';
    document.getElementById('shanti').style.display = 'none';
    document.getElementById('prem').style.display = 'none';
    document.getElementById('game-title').style.display = 'none';
    document.getElementById('easyBtn').style.display = 'none';
    document.getElementById('mediumBtn').style.display = 'none';
    document.getElementById('hardBtn').style.display = 'none';
    document.getElementById('instruction-modal').style.display = 'none';
    document.getElementById('fidrat-home').style.backgroundColor = 'lightgoldenrodyellow';
  });
});


function clearGame() {
  clearInterval(timerInterval);
  clearInterval(ballCreationIntervalId);
  document.querySelectorAll('.obstacle').forEach(obstacle => obstacle.remove());
  document.querySelectorAll('.ball').forEach(ball => ball.remove());
}





function level1() {

  currentLevel = 1;
  document.getElementById('para').style.display = 'none';
  document.getElementById('para1').style.display = 'none';
  document.getElementById('ie').style.display = 'none';
  document.getElementById('vv').style.display = 'none';
  document.getElementById('shanti').style.display = 'none';
  document.getElementById('prem').style.display = 'none';
  document.getElementById('game-title').style.display = 'none';
  document.getElementById('easyBtn').style.display = 'none';
  document.getElementById('mediumBtn').style.display = 'none';
  document.getElementById('hardBtn').style.display = 'none';
  document.getElementById('instruction-modal').style.display = 'none';
  document.getElementById('fidrat-home').style.backgroundColor = 'lightgoldenrodyellow';

  clearInterval(timer);
  clearInterval(ballCreationIntervalId);
  document.getElementById('score').style.display = 'block';
  document.getElementById('time').style.display = 'block';
  document.getElementById('time-value').innerText = time;
  document.getElementById('score-value').innerText = score;

  // Add event listener for clicking the balls
  document.addEventListener('click', clickBall);

  timer = setInterval(() => {
    time++;
    document.getElementById('time-value').innerText = time;
    if (time >= 5) {
      clearInterval(timer);
      if (score >= 1) {
        levelCompleted = true;
        showGameOverAlert(true, 1);

        document.querySelectorAll('.ball').forEach(ball => ball.remove());
        level2();
      } else {
        showGameOverAlert(false, 1);

      }
    }
  }, 1000);

  ballCreationIntervalId = setInterval(() => {
    const ball = createRedBall();
    document.body.appendChild(ball);
    animateBall(ball);
  }, ballCreationInterval);




}



function showRestartButton() {
  if (!restartButton) {
    restartButton = document.createElement('button');
    restartButton.id = 'restart-button';
    restartButton.innerText = 'Restart';
    restartButton.style.position = 'absolute';
    restartButton.style.top = '50%';
    restartButton.style.left = '50%';
    restartButton.style.transform = 'translate(-50%, -50%)';
    restartButton.style.fontSize = '24px';
    document.body.appendChild(restartButton);
    restartButton.addEventListener('click', restartGame);
  }
  restartButton.style.display = 'block';
}



function restartGame() {
  // // Clear all intervals
  clearInterval(timer);
  clearInterval(timerInterval);
  clearInterval(ballCreationIntervalId);

  // Reset score and time to 0
  score = 0;
  time = 0;
  document.getElementById('score-value').innerText = score;
  document.getElementById('time-value').innerText = time;

  // Remove all balls
  const balls = document.querySelectorAll('.ball');
  balls.forEach(ball => ball.remove());

  // Remove the event listener for clicking the balls
  document.removeEventListener('click', clickBall);


  // Hide basket
  document.getElementById('basket').style.display = 'none';

  document.querySelectorAll('.obstacle').forEach(obstacle => obstacle.remove()); // Remove previous obstacles

  // Start the game again
  if (currentLevel >= 3) {
    level3(); // Start from level 3 or higher
  } else {
    level1(); // Start from level 1 if the current level is below 3
  }

}



function animateBall(ball) {
  let position = window.innerHeight;
  const speed = 2;
  const gameAreaHeight = window.innerHeight;


  function updatePosition() {
    position -= speed;
    if (position > -40) {
      ball.style.top = position + 'px';
      requestAnimationFrame(updatePosition);
    } else {
      ball.remove();
    }
  }

  updatePosition();
}


function startGame() {
  document.getElementById('instruction-modal').style.display = 'block';
}


function clickBall(event) {
  if (currentLevel === 1) {
    const ball = event.target.closest('.ball');
    if (ball && ball.classList.contains('red')) {
      ball.remove();
      score++;
      document.getElementById('score-value').innerText = score;
    }
  }
}

function level2() {
  document.getElementById('Basketvideo').style.display = 'none';

  currentLevel = 2;
  score = 0;
  time = 0;

  // Hide unnecessary elements and reset UI for level 2
  document.getElementById('score').style.display = 'none';
  document.getElementById('time').style.display = 'none';
  document.getElementById('basket').style.display = 'none';

  // Clear previous ball creation interval
  clearInterval(ballCreationIntervalId);

  // Set up event listener for the "Next" button
  const nextButton = document.getElementById('next');
  nextButton.onclick = function () {
    // Show instruction modal for Level 2
    document.getElementById('instruction-modal2').style.display = 'block';

    // Set up "Start Level 2" button inside the instruction modal
    document.getElementById('start-level2-button').addEventListener('click', function () {
      // Hide instruction modal after starting the level
      document.getElementById('instruction-modal2').style.display = 'none';

      // Show score and time
      document.getElementById('score').style.display = 'block';
      document.getElementById('time').style.display = 'block';
      document.getElementById('score-value').innerText = score;
      document.getElementById('time-value').innerText = time;
      document.getElementById('basket').style.display = 'block';  // Show basket for level 2

      // Clear any previous timers
      clearInterval(timerInterval);

      // Start the timer for level 2
      timerInterval = setInterval(() => {
        time++;
        document.getElementById('time-value').innerText = time;
        if (time >= 5) {  // End level after 5 seconds
          clearInterval(timerInterval);
          if (score >= 1) {
            showGameOverAlert(true, 2);  // Show success message
            document.querySelectorAll('.ball').forEach(ball => ball.remove());  // Remove all balls
          } else {
            showGameOverAlert(false, 2);  // Show failure message
          }
        }
      }, 1000);

      // Generate the first ball and continue the level
      generateBall();

      document.getElementById('gameOver').style.display = 'none';
      document.getElementById('overlay').style.display = 'none';
    }, { once: true });  // Event listener only runs once

    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  };

  // Ball generation for level 2
  function generateBall() {
    let ball = document.createElement("div");
    ball.classList.add("ball");
    ball.classList.add("red");
    ball.style.left = `${Math.random() * (window.innerWidth - 20)}px`;
    document.body.appendChild(ball);

    // Add event listener for dragging balls
    ball.addEventListener('mousedown', startDrag);

    // Ball drag functionality
    function startDrag(event) {
      const ball = event.target.closest('.ball');
      if (ball && ball.classList.contains('red')) {
        let isDragging = true;
        const ballRect = ball.getBoundingClientRect();
        const offsetX = event.clientX - ballRect.left;
        const offsetY = event.clientY - ballRect.top;

        ball.style.zIndex = "1000";
        document.addEventListener("mousemove", drag);

        document.addEventListener("mouseup", endDrag);

        function drag(e) {
          if (isDragging) {
            // Calculate the new position of the ball
            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;

            // Ensure that the ball stays within the bounds of the viewport
            newX = Math.max(0, Math.min(window.innerWidth - ballRect.width, newX));
            newY = Math.max(0, Math.min(window.innerHeight - ballRect.height, newY));

            ball.style.left = `${newX}px`;
            ball.style.top = `${newY}px`;
          }
        }

        function endDrag() {
          isDragging = false;
          ball.style.zIndex = "0";
          document.removeEventListener("mousemove", drag);
          document.removeEventListener("mouseup", endDrag);
          checkDrop(ball);  // Check if the ball is dropped inside the basket
        }
      }
    }

    // Check if the ball was dropped inside the basket
    function checkDrop(ball) {
      const basket = document.getElementById('basket');
      const basketRect = basket.getBoundingClientRect();
      const ballRect = ball.getBoundingClientRect();

      if (
        ballRect.left >= basketRect.left &&
        ballRect.right <= basketRect.right &&
        ballRect.top >= basketRect.top &&
        ballRect.bottom <= basketRect.bottom
      ) {
        ball.remove();  // Remove the ball from the screen
        score++;  // Increase score
        document.getElementById('score-value').innerText = score;

        // Generate next ball if score is less than 5
        if (score < 5) {
          generateBall();
        }
      }
    }
  }
}


// Function to generate obstacles
function generateObstacles(obstacles) {
  obstacles.forEach(obstacle => {
    const div = document.createElement('div');
    div.classList.add('obstacle');
    div.style.top = `${obstacle.top}vh`;
    div.style.left = `${obstacle.left}vw`;
    div.style.width = `${obstacle.width}vw`;
    div.style.height = `${obstacle.height}vh`;
    maze.appendChild(div);

    obstacleCoordinates.push({
      left: obstacle.left * window.innerWidth / 100, // Convert to pixel value
      top: obstacle.top * window.innerHeight / 100,  // Convert to pixel value
      width: obstacle.width * window.innerWidth / 100, // Convert to pixel value
      height: obstacle.height * window.innerHeight / 100 // Convert to pixel value
    });
  });
}
function checkCollisionWithObstacle(x, y) {
  for (let i = 0; i < obstacleCoordinates.length; i++) {
    const obstacle = obstacleCoordinates[i];

    if (
      x >= obstacle.left &&
      x <= obstacle.left + obstacle.width &&
      y >= obstacle.top &&
      y <= obstacle.top + obstacle.height
    ) {
      return true;
    }
  }
  return false;
}

document.addEventListener('click', function (event) {
  let x = event.clientX;
  let y = event.clientY;

  if (checkCollisionWithObstacle(x, y)) {
    let clickKey = new Date().getTime(); // Using timestamp for a unique key
    mouseClickCoordinates[clickKey] = { x, y };

    console.log(`Click recorded at: (${x}, ${y}) due to collision with an obstacle`);
    console.log(mouseClickCoordinates); // Print out the updated dictionary with collisions
  }
});

// Function to generate a draggable ball
function generateBall(left, bottom, currentLevel) {
  let ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.left = left;
  ball.style.bottom = bottom;

  document.body.appendChild(ball);


  let currentFrame = 1;

  // Set the initial frame
  ball.style.backgroundImage = `url('Images/Dream_Drop/ball${currentFrame}.png')`;
  ball.style.backgroundSize = "contain";
  ball.style.backgroundRepeat = "no-repeat";


  // Increment frame counter to cycle through the images
  function nextFrame() {
    currentFrame = (currentFrame % 9) + 1; // Cycling through frames from 1 to 9
    ball.style.backgroundImage = `url('Images/Dream_Drop/ball${currentFrame}.png')`;
  }


  const animationInterval = setInterval(nextFrame, 100);

  ball.addEventListener('mousedown', startDrag);

  let isDragging = false;
  let offsetX, offsetY;

  function startDrag(event) {


    const ballRect = ball.getBoundingClientRect();
    offsetX = (event.clientX - ballRect.left) / window.innerWidth * 100;
    offsetY = (event.clientY - ballRect.top) / window.innerHeight * 100;
    isDragging = true;

    ball.style.zIndex = "1000";
    document.addEventListener("mousemove", drag);

    document.addEventListener("mouseup", endDrag);

    // Prevent default behavior to avoid text selection
    event.preventDefault();
  }

  function drag(e) {
    if (isDragging) {

      const ballRect = ball.getBoundingClientRect();
      // Calculate the new position of the ball 
      let newX = (e.clientX - offsetX) / window.innerWidth * 100;
      let newY = (window.innerHeight - e.clientY - offsetY) / window.innerHeight * 100;

      // Ensure that the ball stays within the bounds of the viewport
      newX = Math.max(0, Math.min(100 - ballRect.width / window.innerWidth * 100, newX)); // Ensure it doesn't go beyond viewport width
      newY = Math.max(0, Math.min(100 - ballRect.height / window.innerHeight * 100, newY)); // Ensure it doesn't go beyond viewport height

      // Update the position of the ball
      ball.style.left = `${newX}vw`;
      ball.style.bottom = `${newY}vh`;

    }
    if (!e.buttons) {
      endDrag();
    }
    Collision();
  }

  function Collision() {
    const ballRect = ball.getBoundingClientRect();
    const obstacles = document.querySelectorAll('.obstacle');

    obstacles.forEach(obstacle => {
      const obstacleRect = obstacle.getBoundingClientRect();
      if (
        ballRect.right > obstacleRect.left &&
        ballRect.left < obstacleRect.right &&
        ballRect.bottom > obstacleRect.top &&
        ballRect.top < obstacleRect.bottom
      ) {
        endDrag();
        showGameOverAlert(false, currentLevel)

      }
    });
  }

  function endDrag() {
    isDragging = false;
    ball.style.zIndex = "0";
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", endDrag);
    checkDrop(ball);

  }
}

// Function to check if the dragged ball is dropped into the basket
function checkDrop(ball, basketId, currentLevel) {
  const basket = document.getElementById('basket');
  const basketRect = basket.getBoundingClientRect();

  const balls = document.querySelectorAll('.ball');

  balls.forEach(ball => {
    const ballRect = ball.getBoundingClientRect();
    const basketCenterX = (basketRect.left + basketRect.right) / 2;
    const basketCenterY = (basketRect.top + basketRect.bottom) / 2;

    // Check if the ball's position is within the basket
    if (
      ballRect.left >= basketRect.left &&
      ballRect.right <= basketRect.right &&
      ballRect.top >= basketRect.top &&
      ballRect.bottom <= basketRect.bottom &&
      ballRect.left <= basketCenterX &&
      ballRect.right >= basketCenterX &&
      ballRect.top <= basketCenterY &&
      ballRect.bottom >= basketCenterY
    ) {
      // Ball is dropped into the basket
      ball.remove();
      showGameOverAlert(true, currentLevel);

      document.querySelectorAll('.ball').forEach(ball => ball.remove());


    }
  });
}


function showGameOverAlert(levelCompleted, currentLevel) {
  pauseGame();
  document.querySelectorAll('obstacle').display = 'none';
  const modal = document.getElementById('gameOver');
  const restartBtn = document.getElementById('restartBtn');
  const quitBtn = document.getElementById('quitBtn');
  const Next = document.getElementById('next');
  const message = document.getElementById('gameOverMessage');

  if (levelCompleted) {

    message.innerText = "You have cleared the level" + currentLevel;
    // Hide the restart and quit buttons, display next button
    document.getElementById('Basketvideo').style.display = 'block';
    document.getElementById('tryvideo').style.display = 'none';
    restartBtn.style.display = 'none';
    quitBtn.style.display = 'block';
    Next.style.display = 'block';
    Next.onclick = function () {
      resumeGame();
      document.getElementById('Basketvideo').style.display = 'none';
      document.getElementById('tryvideo').style.display = 'none';
      modal.style.display = 'none';
      overlay.style.display = 'none';
      nextLevelFunction(currentLevel + 1)
    }
    quitBtn.onclick = function () {
      document.getElementById('Basketvideo').style.display = 'none';
      document.getElementById('tryvideo').style.display = 'none';
      modal.style.display = 'none';
      overlay.style.display = 'none';
      location.reload();
    }

  }


  else {
    message.innerText = "Game Over! Do you want to restart?";
    document.getElementById('Basketvideo').style.display = 'none';
    document.getElementById('tryvideo').style.display = 'block';
    // Show the restart and quit buttons, hide next button
    restartBtn.style.display = 'block';
    quitBtn.style.display = 'block';
    Next.style.display = 'none';
    restartBtn.onclick = function () {
      overlay.style.display = 'none';
      document.getElementById('Basketvideo').style.display = 'none';
      document.getElementById('tryvideo').style.display = 'none';
      resumeGame();
      modal.style.display = 'none';
      restartGame();
    }
    quitBtn.onclick = function () {
      overlay.style.display = 'none';
      document.getElementById('Basketvideo').style.display = 'none';
      document.getElementById('tryvideo').style.display = 'none';
      modal.style.display = 'none';
      location.reload();
    }
  }

  overlay.style.display = 'none';
  modal.style.display = 'block';

}


// Define nextLevelFunction
function nextLevelFunction(currentLevel) {


  clearInterval(timer);
  clearInterval(timerInterval);
  clearInterval(ballCreationIntervalId);

  console.log("Moving to level " + currentLevel + "...");
  // Check if all levels are completed
  if (currentLevel <= 9) {
    // Call the next level function based on the current level
    switch (currentLevel) {

      case 2:
        level2();
        break;
      case 3:
        level3();
        break;
      case 4:
        level4();
        break;
      case 5:
        level5();
        break;
      case 6:
        level6();
        break;
      case 7:
        level7();
        break;
      case 8:
        level8();
        break;
      case 9:
        level9();
        break;

      default:
        alert("Congratulations! You have completed all levels.");
        // Optionally, perform other actions when all levels are completed
        break;
    }
  } else {
    alert("Congratulations! You have completed all levels.");
    // If the user completed the last level
    setTimeout(function () {
      window.location.href = 'dreamdrop_homepage.html';  // Redirect to the home page
    }, 0);  // Delay for 2 seconds before redirecting


    // Optionally, perform other actions when all levels are completed
  }
}


const ball = document.querySelectorAll('.ball'); // Get the ball element
let currentLevel = 0;

function level3() {


  currentLevel = 3;
  document.getElementById('score').style.display = 'none';
  document.getElementById('time').style.display = 'none';


  document.getElementById('basket').style.display = 'block';
  document.getElementById('basket').style.top = '6vh';
  document.getElementById('basket').style.left = '52vw';
  const basket = document.getElementById('basket');

  clearInterval(timerInterval);
  clearInterval(ballCreationIntervalId);

  document.querySelectorAll('.obstacle').forEach(obstacle => obstacle.remove());

  const obstacles = [
    { top: 5, left: 0, width: 35, height: 25 },
    { top: 5, left: 70, width: 35, height: 25 },
    { top: 30, left: 0, width: 20, height: 60 },
    { top: 30, left: 80, width: 20, height: 60 },
    { top: 50, left: 42, width: 20, height: 6 }
  ];


  generateObstacles(obstacles);
  generateBall(`${(50 - ballWidth / (2 * window.innerWidth))}vw`, '5vh', currentLevel);


  // Event listener for checking drop
  document.addEventListener('mouseup', function () {
    checkDrop(ball, 'basket', currentLevel); // Assuming `ball` and `level4` are defined elsewhere
  });




}

function level4() {
  currentLevel = 4;
  clearGame();
  document.getElementById('basket').style.display = 'block';
  document.getElementById('basket').style.top = '10vh';
  document.getElementById('basket').style.left = '80vw';

  const obstacles = [
    { top: 20, left: 0, width: 50, height: 5 },   // horizontal wall
    { top: 20, left: 48, width: 2, height: 40 }   // vertical wall
  ];

  generateObstacles(obstacles);
  generateBall('5vw', '5vh', currentLevel);

  document.addEventListener('mouseup', function () {
    checkDrop(ball, 'basket', currentLevel);
  });
}


function level5() {
  currentLevel = 5;
  clearGame();
  document.getElementById('basket').style.display = 'block';
  document.getElementById('basket').style.top = '12vh';
  document.getElementById('basket').style.left = '45vw';

  const obstacles = [
    { top: 20, left: 40, width: 20, height: 2 }, // top wall (leaves a small gap)
    { top: 20, left: 40, width: 2, height: 20 }, // left wall
    { top: 20, left: 58, width: 2, height: 20 }  // right wall
    // bottom is open for now
  ];

  generateObstacles(obstacles);
  generateBall('20vw', '10vh', currentLevel);

  document.addEventListener('mouseup', function () {
    checkDrop(ball, 'basket', currentLevel);
  });
}

function level6() {
  currentLevel = 6;
  clearGame();
  document.getElementById('basket').style.display = 'block';
  document.getElementById('basket').style.top = '10vh';
  document.getElementById('basket').style.left = '10vw';

  const obstacles = [
    { top: 20, left: 20, width: 60, height: 2 },
    { top: 40, left: 20, width: 2, height: 20 },
    { top: 40, left: 20, width: 60, height: 2 },
    { top: 60, left: 78, width: 2, height: 20 },
    { top: 80, left: 20, width: 60, height: 2 }
  ];

  generateObstacles(obstacles);
  generateBall('85vw', '10vh', currentLevel);

  document.addEventListener('mouseup', function () {
    checkDrop(ball, 'basket', currentLevel);
  });
}

function level7() {
  currentLevel = 7;
  clearGame();
  document.getElementById('basket').style.display = 'block';
  document.getElementById('basket').style.top = '10vh';
  document.getElementById('basket').style.left = '80vw';

  const obstacles = [
    { top: 20, left: 20, width: 2, height: 60 },   // left vertical
    { top: 80, left: 20, width: 60, height: 2 },   // bottom horizontal
    { top: 20, left: 78, width: 2, height: 62 },   // right vertical
    { top: 0, left: 0, width: 100, height: 2 },    // top border
    { top: 98, left: 0, width: 100, height: 2 }    // bottom border
  ];

  generateObstacles(obstacles);
  generateBall('10vw', '80vh', currentLevel);

  document.addEventListener('mouseup', function () {
    checkDrop(ball, 'basket', currentLevel);
  });
}

function level8() {
  currentLevel = 8;
  clearGame();
  document.getElementById('basket').style.display = 'block';
  document.getElementById('basket').style.top = '10vh';
  document.getElementById('basket').style.left = '50vw';

  const obstacles = [
    { top: 12, left: 40, width: 2, height: 10 },
    { top: 12, left: 60, width: 2, height: 10 },
    { top: 20, left: 40, width: 22, height: 2 }
  ];

  generateObstacles(obstacles);
  generateBall('10vw', '80vh', currentLevel);

  document.addEventListener('mouseup', function () {
    checkDrop(ball, 'basket', currentLevel);
  });
}

function level9() {
  currentLevel = 9;
  clearGame();
  document.getElementById('basket').style.display = 'block';
  document.getElementById('basket').style.top = '10vh';
  document.getElementById('basket').style.left = '10vw';

  const obstacles = [
    { top: 10, left: 10, width: 80, height: 2 },
    { top: 10, left: 88, width: 2, height: 60 },
    { top: 68, left: 10, width: 80, height: 2 },
    { top: 30, left: 10, width: 2, height: 40 },
    { top: 30, left: 30, width: 40, height: 2 },
    { top: 30, left: 68, width: 2, height: 20 },
    { top: 48, left: 30, width: 40, height: 2 }
  ];

  generateObstacles(obstacles);
  generateBall('85vw', '80vh', currentLevel);

  document.addEventListener('mouseup', function () {
    checkDrop(ball, 'basket', currentLevel);
  });
}

function level10() {
  currentLevel = 10;
  clearGame();
  document.getElementById('basket').style.display = 'block';
  document.getElementById('basket').style.top = '8vh';
  document.getElementById('basket').style.left = '45vw';

  const obstacles = [
    { top: 10, left: 40, width: 2, height: 30 },
    { top: 10, left: 58, width: 2, height: 30 },
    { top: 40, left: 30, width: 40, height: 2 },
    { top: 40, left: 30, width: 2, height: 30 },
    { top: 40, left: 70, width: 2, height: 30 }
  ];

  generateObstacles(obstacles);
  generateBall('50vw', '90vh', currentLevel);

  document.addEventListener('mouseup', function () {
    checkDrop(ball, 'basket', currentLevel);
  });
}

function level11() {
  currentLevel = 11;
  clearGame();
  document.getElementById('basket').style.display = 'block';
  document.getElementById('basket').style.top = '15vh';
  document.getElementById('basket').style.left = '80vw';

  const obstacles = [
    { top: 10, left: 10, width: 2, height: 80 },
    { top: 10, left: 10, width: 60, height: 2 },
    { top: 88, left: 10, width: 60, height: 2 },
    { top: 10, left: 68, width: 2, height: 40 },
    { top: 50, left: 30, width: 40, height: 2 }
  ];

  generateObstacles(obstacles);
  generateBall('15vw', '85vh', currentLevel);

  document.addEventListener('mouseup', function () {
    checkDrop(ball, 'basket', currentLevel);
  });
}

function level12() {
  currentLevel = 12;
  clearGame();
  document.getElementById('basket').style.display = 'block';
  document.getElementById('basket').style.top = '12vh';
  document.getElementById('basket').style.left = '85vw';

  const obstacles = [
    { top: 30, left: 0, width: 70, height: 2 },
    { top: 30, left: 68, width: 2, height: 40 },
    { top: 68, left: 20, width: 50, height: 2 },
    { top: 20, left: 20, width: 2, height: 50 }
  ];

  generateObstacles(obstacles);
  generateBall('5vw', '5vh', currentLevel);

  document.addEventListener('mouseup', function () {
    checkDrop(ball, 'basket', currentLevel);
  });
}


function setupLevelWithMovingObstacles(levelNumber, basketPos, staticObstacles, movingObstacles, ballPos = '5vw') {
  currentLevel = levelNumber;
  clearGame();
  document.getElementById('basket').style.display = 'block';
  document.getElementById('basket').style.top = basketPos.top;
  document.getElementById('basket').style.left = basketPos.left;

  // Static obstacles
  if (staticObstacles && staticObstacles.length) {
    generateObstacles(staticObstacles);
  }

  // Moving obstacles
  if (movingObstacles && movingObstacles.length) {
    obstacles2 = movingObstacles;
    createMovingObstacles();
  }

  // Ball
  generateBall(ballPos, '85vh', currentLevel);

  document.addEventListener('mouseup', () => {
    checkDrop(ball, 'basket', currentLevel);
  });
}

function level13() {
  setupLevelWithMovingObstacles(13,
    { top: '10vh', left: '80vw' },
    [
      { top: 0, left: 0, width: 100, height: 5 },
      { top: 95, left: 0, width: 100, height: 5 }
    ],
    [
      { top: 30, left: 30, width: 5, height: 5, right: 60 },
      { top: 50, left: 60, width: 5, height: 5, right: 30 }
    ]
  );
}
function level14() {
  setupLevelWithMovingObstacles(14,
    { top: '10vh', left: '10vw' },
    [
      { top: 20, left: 0, width: 100, height: 2 },
      { top: 75, left: 0, width: 100, height: 2 }
    ],
    [
      { top: 30, left: 20, width: 5, height: 5, right: 60 },
      { top: 50, left: 60, width: 5, height: 5, right: 20 }
    ]
  );
}
