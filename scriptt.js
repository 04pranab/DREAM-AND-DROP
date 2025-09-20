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
  ball.style.backgroundImage = `url('Images/Dream_Drop/ball1.png')`;
  ball.style.backgroundSize = 'contain';
  ball.style.backgroundRepeat = 'no-repeat';
  ball.style.cursor = "pointer";

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
    document.getElementById('instruction-modal').style.display = 'block';
    document.getElementById('fidrat-home').style.backgroundColor = 'lightgoldenrodyellow';

    document.getElementById('ok').addEventListener('click', function () {
      // Reset game state and start level 1
      score = 0;
      time = 0;
      currentLevel = 1;

      level1();
    });

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
    level13();
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
  startTracking();
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
      if (score >= 3) {   // was score >= 1
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
  clearInterval(timer);
  clearInterval(timerInterval);
  clearInterval(ballCreationIntervalId);

  score = 0;
  time = 0;

  document.getElementById('score-value').innerText = score;
  document.getElementById('time-value').innerText = time;

  document.querySelectorAll('.ball').forEach(ball => ball.remove());
  document.removeEventListener('click', clickBall);
  document.getElementById('basket').style.display = 'none';
  document.querySelectorAll('.obstacle').forEach(obstacle => obstacle.remove());
  document.getElementById('instruction-modal2').style.display = 'none';

  // Resume from currentLevel
  switch (currentLevel) {
    case 1:
      level1();
      break;
    case 2:
      level2(true);

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

    case 10:
      level10();
      break;

    case 11:
      level11();
      break;

    case 12:
      level12();
      break;

    case 13:
      level13();
      break;

    case 14:
      level14();
      break;

    case 15:
      level15();
      break;
    default:
      level1(); // fallback
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
      ball.style.cursor = "pointer";
      ball.remove();
      score++;
      document.getElementById('score-value').innerText = score;
    }
  }
}

function level2(isRestart = false) {
  startTracking()
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

  if (isRestart) {
    // Show basket, score, time immediately
    document.getElementById('basket').style.display = 'block';
    document.getElementById('score').style.display = 'block';
    document.getElementById('time').style.display = 'block';
    document.getElementById('score-value').innerText = score;
    document.getElementById('time-value').innerText = time;

    // Hide Level 2 instruction modal
    document.getElementById('instruction-modal2').style.display = 'none';

    // Clear old timers and balls
    clearInterval(timerInterval);
    clearInterval(ballCreationIntervalId);
    document.querySelectorAll('.ball').forEach(ball => ball.remove());

    // Start timer
    timerInterval = setInterval(() => {
      time++;
      document.getElementById('time-value').innerText = time;

      if (time >= 5) {
        clearInterval(timerInterval);
        if (score >= 5) {
          showGameOverAlert(true, currentLevel);
        } else {
          showGameOverAlert(false, currentLevel);
        }
      }
    }, 1000);

    // Generate first ball
    generateBall();
  }

  // Set up event listener for the "Next" button
  const nextButton = document.getElementById('next');
  nextButton.onclick = function () {
    // Show instruction modal for Level 2
    document.getElementById('instruction-modal2').style.display = 'block';

    // Set up "Start Level 2" button inside thse instruction modal
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
    });  // Event listener only runs once

    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  };

  // Ball generation for level 2
  function generateBall() {
    let ball = document.createElement("div");
    ball.classList.add("ball", "red");
    ball.style.left = `${Math.random() * (window.innerWidth - 20)}px`;
    document.body.appendChild(ball);

    ball.addEventListener('mousedown', startDrag);
    ball.addEventListener('touchstart', startDrag, { passive: false });

    // Ball drag functionality
    function startDrag(event) {
      event.preventDefault(); // prevent scrolling on touch

      const ball = event.target.closest('.ball');
      if (!ball || !ball.classList.contains('red')) return;

      let isDragging = true;

      // Use clientX/Y at the start for offset
      let offsetX, offsetY;
      if (event.type === "touchstart") {
        offsetX = event.touches[0].clientX - ball.offsetLeft;
        offsetY = event.touches[0].clientY - ball.offsetTop;
      } else {
        offsetX = event.clientX - ball.offsetLeft;
        offsetY = event.clientY - ball.offsetTop;
      }

      ball.style.position = "absolute";
      ball.style.zIndex = "1000";

      let startX = ball.offsetLeft; // initial position
      let startY = ball.offsetTop;
      let hasMovedEnough = false; // track if user has dragged sufficiently
      const dragThreshold = 5;

      let animationFrameId = null;

      function drag(e) {
        if (!isDragging) return;

        let clientX, clientY;
        if (e.type === "touchmove") {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else {
          clientX = e.clientX;
          clientY = e.clientY;
        }

        let newX = clientX - offsetX;
        let newY = clientY - offsetY;

        // Clamp within viewport
        newX = Math.max(0, Math.min(window.innerWidth - ball.offsetWidth, newX));
        newY = Math.max(0, Math.min(window.innerHeight - ball.offsetHeight, newY));

        // Cancel previous frame if any
        if (animationFrameId) cancelAnimationFrame(animationFrameId);

        // Use requestAnimationFrame for smooth movement
        animationFrameId = requestAnimationFrame(() => {
          ball.style.left = `${newX}px`;
          ball.style.top = `${newY}px`;
          if (hasMovedEnough) Collision();
        });

        // Check if moved enough before starting collision detection
        if (!hasMovedEnough) {
          const dx = newX - startX;
          const dy = newY - startY;
          if (Math.sqrt(dx * dx + dy * dy) >= dragThreshold) {
            hasMovedEnough = true;
          }
        }
      }

      function endDrag() {
        isDragging = false;
        ball.style.zIndex = "0";
        document.removeEventListener("mousemove", drag);
        document.removeEventListener("mouseup", endDrag);
        document.removeEventListener("touchmove", drag);
        document.removeEventListener("touchend", endDrag);

        checkDrop(ball); // final drop check
      }

      // Attach listeners
      document.addEventListener("mousemove", drag);
      document.addEventListener("mouseup", endDrag);
      document.addEventListener("touchmove", drag, { passive: false });
      document.addEventListener("touchend", endDrag);
    }


    // Check if the ball was dropped inside the basket
    function checkDrop(ball) {
      const basket = document.getElementById('basket');
      const basketRect = basket.getBoundingClientRect();
      const ballRect = ball.getBoundingClientRect();
      const tolerance = 10;


      if (
        ballRect.left >= basketRect.left - tolerance &&
        ballRect.right <= basketRect.right + tolerance &&
        ballRect.top >= basketRect.top - tolerance &&
        ballRect.bottom <= basketRect.bottom + tolerance
      ) {
        ball.remove();  // Remove the ball from the screen
        score++;  // Increase score
        document.getElementById('score-value').innerText = score;
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
  ball.style.backgroundImage = `url('Images/Dream_Drop/ball1.png')`;
  ball.style.backgroundSize = "contain";
  ball.style.backgroundRepeat = "no-repeat";


  // Increment frame counter to cycle through the images
  function nextFrame() {
    currentFrame = (currentFrame % 9) + 1; // Cycling through frames from 1 to 9
    ball.style.backgroundImage = `url('Images/Dream_Drop/ball1.png')`;
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
    const buffer = Math.min(ballRect.width, ballRect.height) * 0.1088;

    obstacles.forEach(obstacle => {
      const obstacleRect = obstacle.getBoundingClientRect();
      if (
        ballRect.right - buffer > obstacleRect.left &&
        ballRect.left + buffer < obstacleRect.right &&
        ballRect.bottom - buffer > obstacleRect.top &&
        ballRect.top + buffer < obstacleRect.bottom
      ) {
        endDrag();
        showGameOverAlert(false, currentLevel);
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
  clearGame();
  const message = document.getElementById('gameOverMessage');

  if (levelCompleted) {
    stopTrackingAndExport(`level ${currentLevel}`);
    message.innerText = "You have cleared the level" + currentLevel;
    // Hide the restart and quit buttons, display next button
    document.getElementById('Basketvideo').style.display = 'block';
    const basketVid = document.getElementById('Basketvideo');
    basketVid.currentTime = 0;   // restart from beginning
    basketVid.play().catch(err => console.log("Autoplay blocked:", err));
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
    stopTrackingAndExport(`level${currentLevel}`);
    message.innerText = "Game Over! Do you want to restart?";
    document.getElementById('Basketvideo').style.display = 'none';
    document.getElementById('tryvideo').style.display = 'block';
    const tryVid = document.getElementById('tryvideo');
    tryVid.currentTime = 0;   // restart from beginning
    tryVid.play().catch(err => console.log("Autoplay blocked:", err));
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
  if (currentLevel <= 15) {
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

      case 10:
        level10();
        break;

      case 11:
        level11();
        break;

      case 12:
        level12();
        break;

      case 13:
        level13();
        break;

      case 14:
        level14();
        break;

      case 15:
        level15();
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
      window.location.href = './index.html';  // Redirect to the home page
    }, 500);  // Delay for .5 seconds before redirecting


    // Optionally, perform other actions when all levels are completed
  }
}


const ball = document.querySelectorAll('.ball'); // Get the ball element
let currentLevel = 0;

function level3() {
  startTracking();


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
  startTracking();
  currentLevel = 4;
  document.getElementById('score').style.display = 'none';
  document.getElementById('time').style.display = 'none';

  document.getElementById('basket').style.display = 'block';
  document.getElementById('basket').style.top = '8vh';
  document.getElementById('basket').style.left = '80vw';

  clearInterval(timerInterval);
  clearInterval(ballCreationIntervalId);
  document.querySelectorAll('.obstacle').forEach(o => o.remove());

  const obstacles = [
    { top: 0, left: 0, width: 100, height: 5 },
    { top: 20, left: 10, width: 60, height: 5 },
    { top: 45, left: 30, width: 40, height: 5 },
    { top: 70, left: 50, width: 45, height: 5 },
    { top: 95, left: 0, width: 100, height: 5 },
    { top: 0, left: 0, width: 3, height: 100 },
    { top: 0, left: 97, width: 3, height: 100 }
  ];

  generateObstacles(obstacles);
  generateBall('5vw', '8vh', currentLevel);

  document.addEventListener('mouseup', function () {
    checkDrop(ball, 'basket', currentLevel);
  });
}


//########################

function level5() {
  startTracking();
  currentLevel = 5;
  document.getElementById('score').style.display = 'none';
  document.getElementById('time').style.display = 'none';

  document.getElementById('basket').style.display = 'block';
  document.getElementById('basket').style.top = '20vh';
  document.getElementById('basket').style.left = '5vw';

  clearInterval(timerInterval);
  clearInterval(ballCreationIntervalId);
  document.querySelectorAll('.obstacle').forEach(o => o.remove());

  const obstacles = [
    { top: 10, left: 30, width: 40, height: 5 },
    { top: 30, left: 60, width: 40, height: 5 },
    { top: 55, left: 0, width: 40, height: 5 },
    { top: 80, left: 20, width: 60, height: 5 },
    { top: 0, left: 0, width: 100, height: 5 },
    { top: 95, left: 0, width: 100, height: 5 },
    { top: 0, left: 0, width: 3, height: 100 },
    { top: 0, left: 97, width: 3, height: 100 }
  ];

  generateObstacles(obstacles);
  generateBall('90vw', '5vh', currentLevel);

  document.addEventListener('mouseup', function () {
    checkDrop(ball, 'basket', currentLevel);
  });
}

function level6() {
  startTracking();

  currentLevel = 6;
  document.getElementById('score').style.display = 'none';
  document.getElementById('time').style.display = 'none';

  document.getElementById('basket').style.display = 'block';
  document.getElementById('basket').style.top = '5vh';
  document.getElementById('basket').style.left = '43vw';

  const basket = document.getElementById('basket');

  clearInterval(timerInterval);
  clearInterval(ballCreationIntervalId);

  document.querySelectorAll('.obstacle').forEach(obstacle => obstacle.remove());


  const obstacles = [
    { top: 0, left: 50, width: 21, height: 26 },
    { top: 21, left: 20, width: 35, height: 5 },
    { top: 24, left: 20, width: 3, height: 50 },
    { top: 74, left: 20, width: 15, height: 5 },
    { top: 45, left: 50, width: 25, height: 5 },
    { top: 50, left: 60, width: 3, height: 50 },
    { top: 45, left: 75, width: 3, height: 30 },
    { top: 0, left: 0, width: 3, height: 100 },
    { top: 95, left: 0, width: 100, height: 5 },
    { top: 0, left: 97, width: 3, height: 100 },
  ];



  generateObstacles(obstacles);
  generateBall('70vw', '35vh', currentLevel);


  // Event listener for checking drop
  document.addEventListener('mouseup', function () {
    checkDrop(ball, 'basket', currentLevel); // Assuming `ball` and `level5` are defined elsewhere
  });

}



function level7() {
  startTracking();
  currentLevel = 7;
  document.getElementById('score').style.display = 'none';
  document.getElementById('time').style.display = 'none';


  document.getElementById('basket').style.display = 'block';
  document.getElementById('basket').style.top = '48vh';
  document.getElementById('basket').style.left = '85vw';


  const basket = document.getElementById('basket');

  clearInterval(timerInterval);
  clearInterval(ballCreationIntervalId);

  document.querySelectorAll('.obstacle').forEach(obstacle => obstacle.remove());



  const obstacles = [
    { top: 0, left: 0, width: 100, height: 5 },
    { top: 27, left: 60, width: 3, height: 18 },
    { top: 0, left: 0, width: 3, height: 100 },
    { top: 25, left: 0, width: 50, height: 5 },
    { top: 27, left: 60, width: 28, height: 5 },
    { top: 0, left: 97, width: 3, height: 100 },
    { top: 44, left: 50, width: 27, height: 6 },
    { top: 44, left: 75, width: 5, height: 32 },
    { top: 45, left: 50, width: 5, height: 40 },
    { top: 70, left: 15, width: 35, height: 15 },
    { top: 66, left: 80, width: 20, height: 10 },
    { top: 5, left: 50, width: 6, height: 10 },
  ];




  generateObstacles(obstacles);
  generateBall('90vw', '3vh', currentLevel);

  // Event listener for checking drop
  document.addEventListener('mouseup', function () {
    checkDrop(ball, 'basket', currentLevel); // Assuming `ball` and `level5` are defined elsewhere
  });



}






function level8() {
  startTracking();

  currentLevel = 8;
  document.getElementById('score').style.display = 'none';
  document.getElementById('time').style.display = 'none';


  document.getElementById('basket').style.display = 'block';
  document.getElementById('basket').style.top = '5vh';
  document.getElementById('basket').style.left = '4vw';

  const basket = document.getElementById('basket');

  clearInterval(timerInterval);
  clearInterval(ballCreationIntervalId);

  document.querySelectorAll('.obstacle').forEach(obstacle => obstacle.remove());






  const obstacles = [
    { top: 40, left: 20, width: 2, height: 22 },
    { top: 70, left: 80, width: 12, height: 4 },
    { top: 19, left: 20, width: 15, height: 4 },
    { top: 19, left: 20, width: 2, height: 25 },
    { top: 40, left: 0, width: 20, height: 4 },
    { top: 13, left: 58, width: 2, height: 70 },
    { top: 30, left: 59, width: 20, height: 3 },
    { top: 0, left: 0, width: 0, height: 0 },
    { top: 80, left: 20, width: 40, height: 4 },
    { top: 70, left: 80, width: 2, height: 30 },
    { top: 0, left: 0, width: 0, height: 0 },
    { top: 0, left: 0, width: 100, height: 3 },
    { top: 0, left: 0, width: 0, height: 0 },
    { top: 96, left: 0, width: 100, height: 300 },
    { top: 0, left: 98, width: 2, height: 100 },
    { top: 0, left: 0, width: 0, height: 0 },
  ];

  generateObstacles(obstacles);
  generateBall('85vw', '5vh', currentLevel);

  // Event listener for checking drop
  document.addEventListener('mouseup', function () {
    checkDrop(ball, 'basket', currentLevel); // Assuming `ball` and `level5` are defined elsewhere
  });




}






function level9() {
  startTracking();
  currentLevel = 9;
  document.getElementById('score').style.display = 'none';
  document.getElementById('time').style.display = 'none';

  document.getElementById('basket').style.display = 'block';
  document.getElementById('basket').style.top = '8vh';
  document.getElementById('basket').style.left = '10vw';

  clearInterval(timerInterval);
  clearInterval(ballCreationIntervalId);
  document.querySelectorAll('.obstacle').forEach(o => o.remove());

  // Redesigned obstacles - maze-like but passable
  const obstacles = [
    { top: 0, left: 0, width: 100, height: 3 },
    { top: 95, left: 0, width: 100, height: 3 },
    { top: 0, left: 0, width: 3, height: 100 },
    { top: 0, left: 97, width: 3, height: 100 },

    { top: 20, left: 20, width: 60, height: 3 },
    { top: 40, left: 0, width: 40, height: 3 },
    { top: 60, left: 60, width: 40, height: 3 },
    { top: 75, left: 30, width: 40, height: 3 },

    { top: 20, left: 20, width: 3, height: 55 },
  ];

  generateObstacles(obstacles);

  // Ball spawns at bottom center
  generateBall('50vw', '5vh', currentLevel);

  document.addEventListener('mouseup', function () {
    checkDrop(ball, 'basket', currentLevel);
  });
}







function level10() {
  startTracking();
  currentLevel = 10;
  document.getElementById('score').style.display = 'none';
  document.getElementById('time').style.display = 'none';


  document.getElementById('basket').style.display = 'block';
  document.getElementById('basket').style.top = '7vh';
  document.getElementById('basket').style.left = '7vw';

  const basket = document.getElementById('basket');

  clearInterval(timerInterval);
  clearInterval(ballCreationIntervalId);
  document.querySelectorAll('.obstacle').forEach(obstacle => obstacle.remove());




  const obstacles = [
    { top: 0, left: 20, width: 12, height: 50 },
    { top: 70, left: 0, width: 72, height: 10 },
    { top: 20, left: 60, width: 12, height: 50 },
    { top: 50, left: 85, width: 15, height: 5 },
    { top: 70, left: 72, width: 10, height: 5 },
    { top: 30, left: 45, width: 40, height: 5 },
    { top: 65, left: 23, width: 6, height: 5 },
    { top: 0, left: 0, width: 100, height: 5 },
    { top: 95, left: 0, width: 100, height: 5 },
    { top: 0, left: 0, width: 3, height: 100 },
    { top: 0, left: 97, width: 3, height: 100 },
    { top: 0, left: 0, width: 0, height: 0 },

  ];

  generateObstacles(obstacles);
  generateBall('8vw', '6vh', currentLevel);

  // Event listener for checking drop
  document.addEventListener('mouseup', function () {
    checkDrop(ball, 'basket', currentLevel); // Assuming `ball` and `level5` are defined elsewhere
  });





}


function level11() {
  startTracking();

  currentLevel = 11;
  document.getElementById('score').style.display = 'none';
  document.getElementById('time').style.display = 'none';


  document.getElementById('basket').style.display = 'block';
  document.getElementById('basket').style.top = '6vh';
  document.getElementById('basket').style.left = '5vw';

  const basket = document.getElementById('basket');

  clearInterval(timerInterval);
  clearInterval(ballCreationIntervalId);


  document.querySelectorAll('.obstacle').forEach(obstacle => obstacle.remove());



  const obstacles = [
    { top: 0, left: 10, width: 90, height: 5 },
    { top: 28, left: 0, width: 60, height: 5 },
    { top: 44, left: 40, width: 60, height: 5 },
    { top: 60, left: 25, width: 50, height: 5 },
    { top: 75, left: 17, width: 2, height: 25 },
    { top: 75, left: 7, width: 2, height: 25 },
    { top: 80, left: 60, width: 50, height: 5 },
    { top: 95, left: 0, width: 50, height: 5 },
    { top: 18, left: 60, width: 2, height: 15 },

  ];

  generateObstacles(obstacles);
  generateBall('95vw', '4vh', currentLevel);

  // Event listener for checking drop
  document.addEventListener('mouseup', function () {
    checkDrop(ball, 'basket', currentLevel); // Assuming `ball` and `level5` are defined elsewhere
  });




}


function level12() {
  startTracking();

  currentLevel = 12;
  document.getElementById('score').style.display = 'none';
  document.getElementById('time').style.display = 'none';


  document.getElementById('basket').style.display = 'block';
  document.getElementById('basket').style.top = '6vh';
  document.getElementById('basket').style.left = '7vw';
  const basket = document.getElementById('basket');

  clearInterval(timerInterval);
  clearInterval(ballCreationIntervalId);

  document.querySelectorAll('.obstacle').forEach(obstacle => obstacle.remove());







  const obstacles = [
    { top: 70, left: 0, width: 75, height: 11 },
    { top: 0, left: 0, width: 0, height: 0 },
    { top: 0, left: 0, width: 0, height: 0 },
    { top: 0, left: 0, width: 0, height: 0 },
    { top: 0, left: 0, width: 100, height: 5 },
    { top: 95, left: 0, width: 100, height: 5 },
    { top: 0, left: 0, width: 3, height: 100 },
    { top: 0, left: 97, width: 3, height: 100 },
    { top: 0, left: 0, width: 0, height: 0 },
  ];

  const obstacles2 = [
    { top: 10, left: 35, width: 3, height: 5, right: 45 }, // Moving towards right
    { top: 20, left: 45, width: 3, height: 5, right: 25 }, // Moving towards left
    { top: 30, left: 55, width: 3, height: 5, right: 65 }, // Moving towards right
    { top: 40, left: 65, width: 3, height: 5, right: 35 }, // Moving towards left
    { top: 50, left: 80, width: 3, height: 5, right: 15 }, // Moving towards right
    { top: 60, left: 85, width: 3, height: 5, right: 75 } // Moving towards left
  ]

  generateObstacles(obstacles);


  function createMovingObstacles() {
    obstacles2.forEach((obstacle, index) => {
      const div = document.createElement('div');
      div.classList.add('obstacle');
      div.style.top = `${obstacle.top}vh`;
      div.style.left = `${obstacle.left}vw`;
      div.style.width = `${obstacle.width}vw`;
      div.style.height = `${obstacle.height}vh`;
      maze.appendChild(div);


      const animationDuration = 1; // Duration of the animation in seconds

      // Calculate the relative distance from the starting point to the end point
      const relativeDistance = obstacle.left - obstacle.right;

      // Apply animation to move the obstacle
      div.style.animation = `moveObstacle${index} ${animationDuration}s linear infinite alternate`;

      // Define keyframes for the obstacle animation
      const keyframes = `
          @keyframes moveObstacle${index} {
              0% { left: ${obstacle.right}vw; }
              100% { left: ${obstacle.left}vw; } // Change 50 to adjust the horizontal distance
          }
      `;

      // Add the keyframes to the style element
      const style = document.createElement('style');
      style.innerHTML = keyframes;
      document.head.appendChild(style);
    });
  }

  createMovingObstacles();
  generateBall('6vw', '6vh', currentLevel);

  // Event listener for checking drop
  document.addEventListener('mouseup', function () {
    checkDrop(ball, 'basket', currentLevel); // Assuming `ball` and `level5` are defined elsewhere
  });




}


function level13() {
  startTracking();
  currentLevel = 13;
  document.getElementById('basket').style.display = 'block';
  document.getElementById('basket').style.top = '8vh';
  document.getElementById('basket').style.left = '85vw';


  // Static maze walls
  const obstacles = [
    {top: 0, left: 0, width: 100, height: 3},
    {top: 95, left: 0, width: 100, height: 3},
    {top: 0, left: 0, width: 3, height: 100},
    {top: 0, left: 97, width: 3, height: 100},
    {top: 25, left: 15, width: 70, height: 3},
    {top: 55, left: 15, width: 70, height: 3},
    {top: 75, left: 35, width: 40, height: 3}
  ];
  generateObstacles(obstacles);

  // Two fast horizontal moving bars
  addMovingObstacle('move13a', 40, 10, 30, 3, 10, 60, 'horizontal', 2);
  addMovingObstacle('move13b', 65, 50, 30, 3, 20, 70, 'horizontal', 2.2);

  generateBall('5vw', '6vh', currentLevel);

  document.addEventListener('mouseup', function () {
    checkDrop(ball, 'basket', currentLevel); // Assuming `ball` and `level5` are defined elsewhere
  });
}

function level14() {
  startTracking();
  currentLevel = 14;
  document.getElementById('basket').style.display = 'block';
  document.getElementById('basket').style.top = '10vh';
  document.getElementById('basket').style.left = '10vw';


  // Static zigzag
  const obstacles = [
    {top: 0, left: 0, width: 100, height: 3},
    {top: 95, left: 0, width: 100, height: 3},
    {top: 0, left: 0, width: 3, height: 100},
    {top: 0, left: 97, width: 3, height: 100},
    {top: 30, left: 20, width: 60, height: 3},
    {top: 60, left: 20, width: 60, height: 3}
  ];
  generateObstacles(obstacles);

  // Two vertical moving pillars
  addMovingObstacle('move14a', 30, 40, 3, 20, 30, 70, 'vertical', 2.5);
  addMovingObstacle('move14b', 60, 55, 3, 25, 25, 75, 'vertical', 2.8);

  generateBall('90vw', '5vh', currentLevel);
}

function level15() {
  startTracking();
  currentLevel = 15;
  document.getElementById('basket').style.display = 'block';
  document.getElementById('basket').style.top = '8vh';
  document.getElementById('basket').style.left = '45vw';


  // Frame + narrow path
  const obstacles = [
    {top: 0, left: 0, width: 100, height: 3},
    {top: 95, left: 0, width: 100, height: 3},
    {top: 0, left: 0, width: 3, height: 100},
    {top: 0, left: 97, width: 3, height: 100},
    {top: 40, left: 20, width: 60, height: 3}
  ];
  generateObstacles(obstacles);

  // Four alternating moving walls
  addMovingObstacle('move15a', 20, 20, 30, 3, 10, 60, 'horizontal', 1.8);
  addMovingObstacle('move15b', 30, 60, 30, 3, 20, 70, 'horizontal', 2.2);
  addMovingObstacle('move15c', 55, 30, 3, 20, 30, 70, 'vertical', 2);
  addMovingObstacle('move15d', 70, 50, 3, 20, 20, 75, 'vertical', 2.5);

  generateBall('10vw', '6vh', currentLevel);
}

function addMovingObstacle(name, top, left, width, height, min, max, direction, speed) {
  const div = document.createElement('div');
  div.classList.add('obstacle');
  div.style.top = `${top}vh`;
  div.style.left = `${left}vw`;
  div.style.width = `${width}vw`;
  div.style.height = `${height}vh`;
  maze.appendChild(div);

  let anim;
  if (direction === 'horizontal') {
    anim = `
      @keyframes ${name} {
        0% { left: ${min}vw; }
        100% { left: ${max}vw; }
      }`;
    div.style.animation = `${name} ${speed}s linear infinite alternate`;
  } else {
    anim = `
      @keyframes ${name} {
        0% { top: ${min}vh; }
        100% { top: ${max}vh; }
      }`;
    div.style.animation = `${name} ${speed}s linear infinite alternate`;
  }

  const style = document.createElement('style');
  style.innerHTML = anim;
  document.head.appendChild(style);
}





// MOUSE TRACKING AND EXPORT SETUP
let mouseMovements = [];
let taskStartTime, taskEndTime;

document.addEventListener('mousemove', function (e) {
  const timestamp = Date.now();
  mouseMovements.push({ x: e.clientX, y: e.clientY, time: timestamp });
});

// Start tracking when a task begins
function startTracking() {
  taskStartTime = Date.now();
  mouseMovements = []; // reset
}
function stopTrackingAndExport(taskName = 'task') {
  taskEndTime = Date.now();
  const duration = (taskEndTime - taskStartTime) / 1000;

  let content = `Mouse Tracking for ${taskName}\n`;
  content += `Start Time: ${new Date(taskStartTime).toLocaleString()}\n`;
  content += `End Time: ${new Date(taskEndTime).toLocaleString()}\n`;
  content += `Duration: ${duration} seconds\n\n`;
  content += `X,Y,Timestamp\n`;

  mouseMovements.forEach(move => {
    content += `${move.x},${move.y},${new Date(move.time).toISOString()}\n`;
  });

  const formData = new FormData();
  formData.append('filename', `${taskName}_mouse_log.txt`);
  formData.append('content', content);

  fetch('save_mouse_data.php', {
    method: 'POST',
    body: formData
  })
    .then(response => response.text())
    .then(result => console.log('Mouse data saved:', result))
    .catch(error => console.error('Save failed:', error));
}

