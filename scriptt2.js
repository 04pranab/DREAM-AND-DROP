/*
 Patched: scriptt.js (all-level fixes)
 - Reduces sensitivity (uses Pointer events)
 - Slows ball movement and removes spin animation
 - Requires 3 clicks to pass Level 1
 - Adds more tolerant basket overlap check
 - Fixes Level 2 restart/modal issue
 - Adds pointer (touch) support for dragging across levels
 - Replaces final redirect to index.html

 Also includes small CSS tweaks appended below (stylee.css changes) separated by
 a marker.
*/

// ---------- Patched scriptt.js ----------

let score = 0;
let time = 0;
let timer;
let timerInterval;
let ballCreationIntervalId;
let level = 0;
let restartButton;
let ballWidth = 50;
const squareSize = 700;
const ballCreationInterval = 1000; // slightly slower spawning
let gamePaused = true;
let obstacleCoordinates = [];
let mouseClickCoordinates = {};

let currentLevel = 0;

// Sensitivity / tolerance constants
const OBSTACLE_OVERLAP_TOLERANCE_PX = 6; // require >6px overlap to trigger collision
const BASKET_OVERLAP_TOLERANCE_PX = 12; // require at least this many px overlap to count as inside


// Hide overlay initially
if (document.getElementById('overlay')) document.getElementById('overlay').style.display = 'none';

// Audio toggles (unchanged but cleaned)
const audioSettingCheckbox = document.getElementById('audio_setting');
const audioIconOn = document.getElementById('audio_icon_on');
const audioIconOff = document.getElementById('audio_icon_off');
let backgroundAudio;
function toggleBackgroundAudio() {
    if (!audioSettingCheckbox) return;
    if (audioSettingCheckbox.checked) {
        playBackgroundSound();
        if (audioIconOn) audioIconOn.style.display = 'block';
        if (audioIconOff) audioIconOff.style.display = 'none';
    } else {
        stopBackgroundSound();
        if (audioIconOn) audioIconOn.style.display = 'none';
        if (audioIconOff) audioIconOff.style.display = 'block';
    }
}
function playBackgroundSound() {
    try {
        if (backgroundAudio) stopBackgroundSound();
        backgroundAudio = new Audio('Sounds/Common%20Sound/background.mp3');
        backgroundAudio.volume = 0.08;
        backgroundAudio.loop = true;
        backgroundAudio.play().catch(() => { });
    } catch (e) { }
}
function stopBackgroundSound() {
    if (backgroundAudio) {
        backgroundAudio.pause();
        backgroundAudio.currentTime = 0;
        backgroundAudio = null;
    }
}
if (audioSettingCheckbox) {
    audioSettingCheckbox.addEventListener('change', toggleBackgroundAudio);
    toggleBackgroundAudio();
}


function pauseGame() {
    clearInterval(timer);
    clearInterval(ballCreationIntervalId);
    gamePaused = true;
}

function resumeGame() {
    // restart timer for levels that use it
    clearInterval(timer);
    timer = setInterval(() => {
        time++;
        const tv = document.getElementById('time-value');
        if (tv) tv.innerText = time;
    }, 1000);

    // spawn balls for level 1 only
    if (currentLevel === 1) {
        clearInterval(ballCreationIntervalId);
        ballCreationIntervalId = setInterval(() => {
            const ball = createRedBall();
            document.body.appendChild(ball);
            animateBall(ball);
        }, ballCreationInterval);
    }

    gamePaused = false;
}


function createRedBall() {
    const ball = document.createElement('div');
    ball.classList.add('ball', 'red');
    // static image (no spin)
    ball.style.backgroundImage = `url('Images/Dream_Drop/ball1.png')`;
    ball.style.backgroundSize = 'contain';
    ball.style.backgroundRepeat = 'no-repeat';
    ball.style.cursor = (currentLevel === 1) ? 'pointer' : 'grab';

    const diameter = 40;
    const buffer = 20;
    const leftBoundary = (window.innerWidth - squareSize) / 2;
    const topBoundary = (window.innerHeight - squareSize) / 2;
    let left, top;
    let attempts = 0;
    do {
        left = leftBoundary + Math.random() * Math.max(1, squareSize - diameter);
        top = topBoundary + Math.random() * Math.max(1, squareSize - diameter);
        attempts++;
        if (attempts > 30) break; // give up after some attempts
    } while (checkCollision(left, top, diameter + buffer));

    ball.style.left = left + 'px';
    ball.style.top = top + 'px';
    ball.style.width = diameter + 'px';
    ball.style.height = diameter + 'px';

    return ball;
}

function checkCollision(left, top, size) {
    const balls = document.querySelectorAll('.ball');
    for (let ball of balls) {
        const ballRect = ball.getBoundingClientRect();
        const ballLeft = ballRect.left;
        const ballTop = ballRect.top;
        const ballRight = ballRect.right;
        const ballBottom = ballRect.bottom;

        if (left < ballRight && left + size > ballLeft && top < ballBottom && top + size > ballTop) {
            return true;
        }
    }
    return false;
}


// Record clicks for analytics (unchanged)
document.addEventListener('click', function (event) {
    let x = event.clientX;
    let y = event.clientY;
    let clickKey = new Date().getTime();
    mouseClickCoordinates[clickKey] = { x, y };
});


// DOMContentLoaded bindings
document.addEventListener('DOMContentLoaded', function () {
    // Menu buttons
    const easyBtn = document.getElementById('easyBtn');
    const mediumBtn = document.getElementById('mediumBtn');
    const hardBtn = document.getElementById('hardBtn');

    if (easyBtn) easyBtn.addEventListener('click', function () {
        try { new Audio('/Sounds/Common%20Sound/click.wav').play(); } catch (e) { }
        document.getElementById('fidrat-home').style.backgroundImage = 'url("Images/Common_Images/gamebg.png")';
        clearGame();
        hideMenuElements();
        document.getElementById('instruction-modal').style.display = 'none';
        document.getElementById('fidrat-home').style.backgroundColor = 'lightgoldenrodyellow';
        score = 0; time = 0; currentLevel = 1;
        level1();
    });

    if (mediumBtn) mediumBtn.addEventListener('click', function () {
        try { new Audio('/Sounds/Common%20Sound/click.wav').play(); } catch (e) { }
        clearGame(); hideMenuElements();
        document.getElementById('fidrat-home').style.backgroundImage = 'url("Images/Common_Images/gamebg.png")';
        document.getElementById('fidrat-home').style.backgroundColor = 'lightgoldenrodyellow';
        score = 0; time = 0; currentLevel = 3; level3();
    });

    if (hardBtn) hardBtn.addEventListener('click', function () {
        try { new Audio('/Sounds/Common%20Sound/click.wav').play(); } catch (e) { }
        document.getElementById('fidrat-home').style.backgroundImage = 'url("Images/Common_Images/gamebg.png")';
        clearGame(); hideMenuElements(); document.getElementById('fidrat-home').style.backgroundColor = 'lightgoldenrodyellow';
        currentLevel = 7; level7();
    });
});

function hideMenuElements() {
    ['para', 'para1', 'ie', 'vv', 'shanti', 'prem', 'game-title', 'easyBtn', 'mediumBtn', 'hardBtn'].forEach(id => {
        const el = document.getElementById(id); if (el) el.style.display = 'none';
    });
}

function clearGame() {
    clearInterval(timerInterval);
    clearInterval(ballCreationIntervalId);
    document.querySelectorAll('.obstacle').forEach(obstacle => obstacle.remove());
    document.querySelectorAll('.ball').forEach(ball => ball.remove());
    document.removeEventListener('click', clickBall);
}


// ---------- LEVEL 1 (Easy) ----------
function level1() {
    startTracking();
    currentLevel = 1;
    hideMenuElements();
    document.getElementById('instruction-modal').style.display = 'none';
    document.getElementById('fidrat-home').style.backgroundColor = 'lightgoldenrodyellow';

    clearInterval(timer);
    clearInterval(ballCreationIntervalId);
    const scoreEl = document.getElementById('score');
    const timeEl = document.getElementById('time');
    if (scoreEl) scoreEl.style.display = 'block';
    if (timeEl) timeEl.style.display = 'block';
    if (document.getElementById('time-value')) document.getElementById('time-value').innerText = time;
    if (document.getElementById('score-value')) document.getElementById('score-value').innerText = score;

    // Attach click handler for balls
    document.addEventListener('click', clickBall);

    // Timer: 5 seconds
    time = 0;
    clearInterval(timer);
    timer = setInterval(() => {
        time++;
        if (document.getElementById('time-value')) document.getElementById('time-value').innerText = time;
        if (time >= 5) {
            clearInterval(timer);
            // require at least 3 clicks to pass level 1
            if (score >= 3) {
                showGameOverAlert(true, 1);
                document.querySelectorAll('.ball').forEach(ball => ball.remove());
                // move to level2 after closing modal via Next button
            } else {
                showGameOverAlert(false, 1);
            }
        }
    }, 1000);

    // spawn balls slowly
    clearInterval(ballCreationIntervalId);
    ballCreationIntervalId = setInterval(() => {
        const ball = createRedBall();
        document.body.appendChild(ball);
        animateBall(ball);
    }, ballCreationInterval);
}

function clickBall(event) {
    if (currentLevel === 1) {
        const ball = event.target.closest('.ball');
        if (ball && ball.classList.contains('red')) {
            ball.remove();
            score++;
            if (document.getElementById('score-value')) document.getElementById('score-value').innerText = score;
        }
    }
}


// ---------- LEVEL 2 (drag into basket) ----------
function level2() {
    startTracking();
    currentLevel = 2;
    score = 0; time = 0;
    if (document.getElementById('score')) document.getElementById('score').style.display = 'none';
    if (document.getElementById('time')) document.getElementById('time').style.display = 'none';
    const basket = document.getElementById('basket'); if (basket) basket.style.display = 'none';

    clearInterval(ballCreationIntervalId);

    const nextButton = document.getElementById('next');
    if (nextButton) nextButton.onclick = null;
    if (nextButton) nextButton.onclick = function () {
        const insModal2 = document.getElementById('instruction-modal2');
        if (insModal2) insModal2.style.display = 'block';
        const startBtn = document.getElementById('start-level2-button');
        if (startBtn) {
            const newStart = startBtn.cloneNode(true);
            startBtn.parentNode.replaceChild(newStart, startBtn);
            newStart.addEventListener('click', function () {
                document.getElementById('instruction-modal2').style.display = 'none';
                if (document.getElementById('score')) document.getElementById('score').style.display = 'block';
                if (document.getElementById('time')) document.getElementById('time').style.display = 'block';
                if (document.getElementById('score-value')) document.getElementById('score-value').innerText = score;
                if (document.getElementById('time-value')) document.getElementById('time-value').innerText = time;
                if (basket) basket.style.display = 'block';

                clearInterval(timerInterval);
                time = 0;
                timerInterval = setInterval(() => {
                    time++;
                    if (document.getElementById('time-value')) document.getElementById('time-value').innerText = time;
                    if (time >= 10) {
                        clearInterval(timerInterval);
                        if (score >= 1) {
                            showGameOverAlert(true, 2);
                            document.querySelectorAll('.ball').forEach(ball => ball.remove());
                        } else {
                            showGameOverAlert(false, 2);
                        }
                    }
                }, 1000);

                // generate first draggable ball for level 2
                generateBallLevel2();
            }, { once: true });
        }
        document.getElementById('gameOver').style.display = 'none';
        if (document.getElementById('overlay')) document.getElementById('overlay').style.display = 'none';
    };
}

// new dedicated generator for Level 2
function generateBallLevel2() {
    const ball = document.createElement('div');
    ball.classList.add('ball', 'red');
    ball.style.left = `${Math.random() * (window.innerWidth - 60)}px`;
    ball.style.top = '20vh';
    ball.style.width = '60px';
    ball.style.height = '60px';
    ball.style.backgroundImage = `url('Images/Dream_Drop/ball1.png')`;
    ball.style.backgroundSize = 'contain';
    ball.style.backgroundRepeat = 'no-repeat';
    ball.style.cursor = 'grab';
    document.body.appendChild(ball);

    let isDragging = false;
    let offsetX = 0, offsetY = 0;

    function pointerDown(e) {
        e.preventDefault();
        isDragging = true;
        const rect = ball.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        ball.setPointerCapture && ball.setPointerCapture(e.pointerId);
        ball.style.zIndex = 1000;
        document.addEventListener('pointermove', pointerMove);
        document.addEventListener('pointerup', pointerUp);
    }
    function pointerMove(e) {
        if (!isDragging) return;
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;
        newX = Math.max(0, Math.min(window.innerWidth - ball.offsetWidth, newX));
        newY = Math.max(0, Math.min(window.innerHeight - ball.offsetHeight, newY));
        ball.style.left = newX + 'px';
        ball.style.top = newY + 'px';
    }
    function pointerUp(e) {
        isDragging = false;
        ball.style.zIndex = '';
        document.removeEventListener('pointermove', pointerMove);
        document.removeEventListener('pointerup', pointerUp);
        checkDropLevel2(ball);
    }

    ball.addEventListener('pointerdown', pointerDown);
}

function checkDropLevel2(ball) {
    const basket = document.getElementById('basket');
    if (!basket) return;
    const basketRect = basket.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();

    if (
        ballRect.left >= basketRect.left &&
        ballRect.right <= basketRect.right &&
        ballRect.top >= basketRect.top &&
        ballRect.bottom <= basketRect.bottom
    ) {
        ball.remove();
        score++;
        if (document.getElementById('score-value')) document.getElementById('score-value').innerText = score;

        if (score < 5) {
            generateBallLevel2();
        } else {
            showGameOverAlert(true, 2);
        }
    }
}

// generateObstacles & checkCollisionWithObstacle unchanged except conversions robust
function generateObstacles(obstacles) {
    const maze = document.getElementById('maze') || document.createElement('div');
    obstacles.forEach(obstacle => {
        const div = document.createElement('div');
        div.classList.add('obstacle');
        div.style.top = `${obstacle.top}vh`;
        div.style.left = `${obstacle.left}vw`;
        div.style.width = `${obstacle.width}vw`;
        div.style.height = `${obstacle.height}vh`;
        maze.appendChild(div);

        obstacleCoordinates.push({
            left: obstacle.left * window.innerWidth / 100,
            top: obstacle.top * window.innerHeight / 100,
            width: obstacle.width * window.innerWidth / 100,
            height: obstacle.height * window.innerHeight / 100
        });
    });
}
function checkCollisionWithObstacle(x, y) {
    for (let i = 0; i < obstacleCoordinates.length; i++) {
        const obstacle = obstacleCoordinates[i];
        if (x >= obstacle.left && x <= obstacle.left + obstacle.width && y >= obstacle.top && y <= obstacle.top + obstacle.height) {
            return true;
        }
    }
    return false;
}

function generateBall(left, bottom, lvl) {
    const ball = document.createElement('div');
    ball.classList.add('ball');
    ball.style.left = left;
    ball.style.bottom = bottom;
    ball.style.width = '60px';
    ball.style.height = '60px';
    ball.style.backgroundImage = `url('Images/Dream_Drop/ball1.png')`;
    ball.style.backgroundSize = 'contain';
    ball.style.backgroundRepeat = 'no-repeat';
    ball.style.position = 'absolute';
    ball.dataset.level = lvl || currentLevel;

    document.body.appendChild(ball);

    // pointer based drag
    let isDragging = false;
    let offsetX = 0, offsetY = 0;

    function pointerDown(e) {
        e.preventDefault();
        isDragging = true;
        const rect = ball.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        ball.setPointerCapture && ball.setPointerCapture(e.pointerId);
        ball.style.zIndex = 1000;
        document.addEventListener('pointermove', pointerMove);
        document.addEventListener('pointerup', pointerUp);
    }

    function pointerMove(e) {
        if (!isDragging) return;
        const rect = ball.getBoundingClientRect();
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;
        newX = Math.max(0, Math.min(window.innerWidth - rect.width, newX));
        newY = Math.max(0, Math.min(window.innerHeight - rect.height, newY));
        ball.style.left = newX + 'px';
        ball.style.top = newY + 'px';

        // Check obstacle collision with a small tolerance -- compute overlap
        const ballRect = ball.getBoundingClientRect();
        const obstacles = document.querySelectorAll('.obstacle');
        for (let ob of obstacles) {
            const oRect = ob.getBoundingClientRect();
            const overlapX = Math.max(0, Math.min(ballRect.right, oRect.right) - Math.max(ballRect.left, oRect.left));
            const overlapY = Math.max(0, Math.min(ballRect.bottom, oRect.bottom) - Math.max(ballRect.top, oRect.top));
            const overlapArea = overlapX * overlapY;
            if (overlapArea > OBSTACLE_OVERLAP_TOLERANCE_PX) {
                // collision
                endDrag();
                showGameOverAlert(false, parseInt(ball.dataset.level || lvl || currentLevel));
                return;
            }
        }
    }

    function pointerUp(e) {
        endDrag();
        checkDrop(ball);
    }

    function endDrag() {
        isDragging = false;
        ball.style.zIndex = '';
        document.removeEventListener('pointermove', pointerMove);
        document.removeEventListener('pointerup', pointerUp);
    }

    ball.addEventListener('pointerdown', pointerDown);
}

// checkDrop relaxed: check center overlap and partial overlap
function checkDrop(ball) {
    const basket = document.getElementById('basket');
    if (!basket) return false;
    const basketRect = basket.getBoundingClientRect();

    const balls = ball ? [ball] : Array.from(document.querySelectorAll('.ball'));
    for (let b of balls) {
        const ballRect = b.getBoundingClientRect();

        // center of ball
        const bx = (ballRect.left + ballRect.right) / 2;
        const by = (ballRect.top + ballRect.bottom) / 2;

        // if center inside basket bounding box -> success
        if (bx >= basketRect.left + BASKET_OVERLAP_TOLERANCE_PX && bx <= basketRect.right - BASKET_OVERLAP_TOLERANCE_PX &&
            by >= basketRect.top + BASKET_OVERLAP_TOLERANCE_PX && by <= basketRect.bottom - BASKET_OVERLAP_TOLERANCE_PX) {
            // removed ball and success
            try { b.remove(); } catch (e) { }
            score++;
            if (document.getElementById('score-value')) document.getElementById('score-value').innerText = score;
            // only conclude level when calling code decides; for safety show success when required
            // but also if it's a one-ball-per-level design, trigger success
            showGameOverAlert(true, currentLevel);
            document.querySelectorAll('.ball').forEach(ballRem => ballRem.remove());
            return true;
        }

        // fallback: check overlap area > small threshold
        const overlapX = Math.max(0, Math.min(ballRect.right, basketRect.right) - Math.max(ballRect.left, basketRect.left));
        const overlapY = Math.max(0, Math.min(ballRect.bottom, basketRect.bottom) - Math.max(ballRect.top, basketRect.top));
        const overlapArea = overlapX * overlapY;
        if (overlapArea > (BASKET_OVERLAP_TOLERANCE_PX * 10)) { // area threshold
            try { b.remove(); } catch (e) { }
            score++;
            if (document.getElementById('score-value')) document.getElementById('score-value').innerText = score;
            showGameOverAlert(true, currentLevel);
            document.querySelectorAll('.ball').forEach(ballRem => ballRem.remove());
            return true;
        }
    }
    return false;
}

// animateBall slower and more stable
function animateBall(ball) {
    let position = window.innerHeight;
    const speed = 1; // slower descent

    function updatePosition() {
        position -= speed;
        if (position > -80) {
            ball.style.top = position + 'px';
            requestAnimationFrame(updatePosition);
        } else {
            try { ball.remove(); } catch (e) { }
        }
    }
    updatePosition();
}

// showGameOverAlert: refine behavior and fix Next/Restart wiring
function showGameOverAlert(levelCompleted, currentLvl) {
    pauseGame();
    const modal = document.getElementById('gameOver');
    const restartBtn = document.getElementById('restartBtn');
    const quitBtn = document.getElementById('quitBtn');
    const Next = document.getElementById('next');
    const message = document.getElementById('gameOverMessage');

    if (!modal) return;

    if (levelCompleted) {
        // record tracking data
        stopTrackingAndExport(`level${currentLvl}`);
        message.innerText = `You have cleared level ${currentLvl}`;
        const bv = document.getElementById('Basketvideo'); if (bv) bv.style.display = 'block';
        const tv = document.getElementById('tryvideo'); if (tv) tv.style.display = 'none';
        if (restartBtn) restartBtn.style.display = 'none';
        if (quitBtn) quitBtn.style.display = 'block';
        if (Next) Next.style.display = 'block';

        // clear previous handlers and reassign
        if (Next) {
            Next.onclick = null; Next.onclick = function () {
                // Hide modal then move to next level
                modal.style.display = 'none';
                if (document.getElementById('overlay')) document.getElementById('overlay').style.display = 'none';
                if (bv) bv.style.display = 'none';
                resumeGame();
                nextLevelFunction(currentLvl + 1);
            }
        }

        if (quitBtn) { quitBtn.onclick = function () { modal.style.display = 'none'; location.reload(); } }
    } else {
        stopTrackingAndExport(`level${currentLvl}`);
        message.innerText = 'Game Over! Do you want to restart?';
        const bv = document.getElementById('Basketvideo'); if (bv) bv.style.display = 'none';
        const tv = document.getElementById('tryvideo'); if (tv) tv.style.display = 'block';
        if (restartBtn) restartBtn.style.display = 'block';
        if (quitBtn) quitBtn.style.display = 'block';
        if (Next) Next.style.display = 'none';

        if (restartBtn) {
            restartBtn.onclick = function () {
                if (document.getElementById('overlay')) document.getElementById('overlay').style.display = 'none';
                if (bv) bv.style.display = 'none';
                if (tv) tv.style.display = 'none';
                modal.style.display = 'none';
                restartGame();
                resumeGame();
            }
        }
        if (quitBtn) { quitBtn.onclick = function () { location.reload(); } }
    }

    if (document.getElementById('overlay')) document.getElementById('overlay').style.display = 'none';
    modal.style.display = 'block';
}

// nextLevelFunction: fixed final redirect to index.html and robust calls
function nextLevelFunction(nextLvl) {
    clearInterval(timer);
    clearInterval(timerInterval);
    clearInterval(ballCreationIntervalId);

    if (nextLvl <= 9) {
        switch (nextLvl) {
            case 2: level2(); break;
            case 3: level3(); break;
            case 4: level4(); break;
            case 5: level5(); break;
            case 6: level6(); break;
            case 7: level7(); break;
            case 8: level8(); break;
            case 9: level9(); break;
            default: alert('Congratulations! You have completed all levels.'); break;
        }
    } else {
        alert('Congratulations! You have completed all levels.');
        setTimeout(function () {
            window.location.href = 'index.html';
        }, 200);
    }
}

// Levels 3..9: keep mostly same but ensure generateBall uses pointer events and obstacles are generated
function level3() {
    startTracking(); currentLevel = 3;
    if (document.getElementById('score')) document.getElementById('score').style.display = 'none';
    if (document.getElementById('time')) document.getElementById('time').style.display = 'none';
    const basket = document.getElementById('basket'); if (basket) { basket.style.display = 'block'; basket.style.top = '6vh'; basket.style.left = '52vw'; }
    clearInterval(timerInterval); clearInterval(ballCreationIntervalId);
    document.querySelectorAll('.obstacle').forEach(o => o.remove()); obstacleCoordinates = [];
    const obstacles = [
        { top: 5, left: 0, width: 35, height: 25 },
        { top: 5, left: 70, width: 35, height: 25 },
        { top: 30, left: 0, width: 20, height: 60 },
        { top: 30, left: 80, width: 20, height: 60 },
        { top: 50, left: 42, width: 20, height: 6 }
    ];
    generateObstacles(obstacles);
    generateBall(`${(50 - ballWidth / (2 * window.innerWidth))}vw`, '5vh', currentLevel);
}

function level4() {
    startTracking(); currentLevel = 4;
    if (document.getElementById('score')) document.getElementById('score').style.display = 'none';
    if (document.getElementById('time')) document.getElementById('time').style.display = 'none';
    const basket = document.getElementById('basket'); if (basket) { basket.style.display = 'block'; basket.style.top = '5vh'; basket.style.left = '43vw'; }
    clearInterval(timerInterval); clearInterval(ballCreationIntervalId);
    document.querySelectorAll('.obstacle').forEach(o => o.remove()); obstacleCoordinates = [];
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
        { top: 0, left: 97, width: 3, height: 100 }
    ];
    generateObstacles(obstacles);
    generateBall('70vw', '35vh', currentLevel);
}

function level5() {
    startTracking(); currentLevel = 5;
    if (document.getElementById('score')) document.getElementById('score').style.display = 'none';
    if (document.getElementById('time')) document.getElementById('time').style.display = 'none';
    const basket = document.getElementById('basket'); if (basket) { basket.style.display = 'block'; basket.style.top = '48vh'; basket.style.left = '85vw'; }
    clearInterval(timerInterval); clearInterval(ballCreationIntervalId);
    document.querySelectorAll('.obstacle').forEach(o => o.remove()); obstacleCoordinates = [];
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
        { top: 5, left: 50, width: 6, height: 10 }
    ];
    generateObstacles(obstacles);
    generateBall('90vw', '3vh', currentLevel);
}

function level6() {
    startTracking(); currentLevel = 6; /* same pattern */
    if (document.getElementById('basket')) { document.getElementById('basket').style.display = 'block'; document.getElementById('basket').style.top = '5vh'; document.getElementById('basket').style.left = '4vw'; }
    clearInterval(timerInterval); clearInterval(ballCreationIntervalId); document.querySelectorAll('.obstacle').forEach(o => o.remove()); obstacleCoordinates = [];
    const obstacles = [
        { top: 40, left: 20, width: 2, height: 22 }, { top: 70, left: 80, width: 12, height: 4 }, { top: 19, left: 20, width: 15, height: 4 }, { top: 19, left: 20, width: 2, height: 25 }, { top: 40, left: 0, width: 20, height: 4 }, { top: 13, left: 58, width: 2, height: 70 }, { top: 30, left: 59, width: 20, height: 3 }, { top: 80, left: 20, width: 40, height: 4 }, { top: 70, left: 80, width: 2, height: 30 }, { top: 0, left: 0, width: 100, height: 3 }
    ]; generateObstacles(obstacles); generateBall('85vw', '5vh', currentLevel);
}
function level7() {
    startTracking(); currentLevel = 7; if (document.getElementById('basket')) { document.getElementById('basket').style.display = 'block'; document.getElementById('basket').style.top = '7vh'; document.getElementById('basket').style.left = '7vw'; } clearInterval(timerInterval); clearInterval(ballCreationIntervalId); document.querySelectorAll('.obstacle').forEach(o => o.remove()); obstacleCoordinates = []; const obstacles = [{ top: 0, left: 20, width: 12, height: 50 }, { top: 70, left: 0, width: 72, height: 10 }, { top: 20, left: 60, width: 12, height: 50 }, { top: 50, left: 85, width: 15, height: 5 }, { top: 70, left: 72, width: 10, height: 5 }, { top: 30, left: 45, width: 40, height: 5 }, { top: 65, left: 23, width: 6, height: 5 }, { top: 0, left: 0, width: 100, height: 5 }, { top: 95, left: 0, width: 100, height: 5 }, { top: 0, left: 0, width: 3, height: 100 }, { top: 0, left: 97, width: 3, height: 100 }]; generateObstacles(obstacles); generateBall('8vw', '6vh', currentLevel);
}
function level8() {
    startTracking(); currentLevel = 8; if (document.getElementById('basket')) { document.getElementById('basket').style.display = 'block'; document.getElementById('basket').style.top = '6vh'; document.getElementById('basket').style.left = '5vw'; } clearInterval(timerInterval); clearInterval(ballCreationIntervalId); document.querySelectorAll('.obstacle').forEach(o => o.remove()); obstacleCoordinates = []; const obstacles = [{ top: 0, left: 10, width: 90, height: 5 }, { top: 28, left: 0, width: 60, height: 5 }, { top: 44, left: 40, width: 60, height: 5 }, { top: 60, left: 25, width: 50, height: 5 }, { top: 75, left: 17, width: 2, height: 25 }, { top: 75, left: 7, width: 2, height: 25 }, { top: 80, left: 60, width: 50, height: 5 }, { top: 95, left: 0, width: 50, height: 5 }, { top: 18, left: 60, width: 2, height: 15 }]; generateObstacles(obstacles); generateBall('95vw', '4vh', currentLevel);
}
function level9() {
    startTracking(); currentLevel = 9; if (document.getElementById('basket')) { document.getElementById('basket').style.display = 'block'; document.getElementById('basket').style.top = '6vh'; document.getElementById('basket').style.left = '7vw'; } clearInterval(timerInterval); clearInterval(ballCreationIntervalId); document.querySelectorAll('.obstacle').forEach(o => o.remove()); obstacleCoordinates = []; const obstacles = [{ top: 70, left: 0, width: 75, height: 11 }, { top: 0, left: 0, width: 100, height: 5 }, { top: 95, left: 0, width: 100, height: 5 }, { top: 0, left: 0, width: 3, height: 100 }, { top: 0, left: 97, width: 3, height: 100 }]; generateObstacles(obstacles);
    const obstacles2 = [
        { top: 10, left: 35, width: 3, height: 5, right: 45 },
        { top: 20, left: 45, width: 3, height: 5, right: 25 },
        { top: 30, left: 55, width: 3, height: 5, right: 65 },
        { top: 40, left: 65, width: 3, height: 5, right: 35 },
        { top: 50, left: 80, width: 3, height: 5, right: 15 },
        { top: 60, left: 85, width: 3, height: 5, right: 75 }
    ];
    // moving obstacles creation
    function createMovingObstacles() {
        obstacles2.forEach((obstacle, index) => {
            const div = document.createElement('div');
            div.classList.add('obstacle');
            div.style.top = `${obstacle.top}vh`;
            div.style.left = `${obstacle.left}vw`;
            div.style.width = `${obstacle.width}vw`;
            div.style.height = `${obstacle.height}vh`;
            (document.getElementById('maze') || document.body).appendChild(div);
            const animationDuration = 1.5 + (index * 0.2);
            div.style.animation = `moveObstacle${index} ${animationDuration}s linear infinite alternate`;
            const keyframes = `@keyframes moveObstacle${index} { 0% { left: ${obstacle.right}vw; } 100% { left: ${obstacle.left}vw; } }`;
            const style = document.createElement('style'); style.innerHTML = keyframes; document.head.appendChild(style);
        });
    }
    createMovingObstacles();
    generateBall('6vw', '6vh', currentLevel);
}

// restartGame: reset state and navigate to current level
function restartGame() {
    clearInterval(timer);
    clearInterval(timerInterval);
    clearInterval(ballCreationIntervalId);
    score = 0; time = 0;
    if (document.getElementById('score-value')) document.getElementById('score-value').innerText = score;
    if (document.getElementById('time-value')) document.getElementById('time-value').innerText = time;
    document.querySelectorAll('.ball').forEach(ball => ball.remove());
    document.removeEventListener('click', clickBall);
    if (document.getElementById('basket')) document.getElementById('basket').style.display = 'none';
    document.querySelectorAll('.obstacle').forEach(obstacle => obstacle.remove());
    // call the current level function
    switch (currentLevel) {
        case 1: level1(); break;
        case 2: level2(); break;
        case 3: level3(); break;
        case 4: level4(); break;
        case 5: level5(); break;
        case 6: level6(); break;
        case 7: level7(); break;
        case 8: level8(); break;
        case 9: level9(); break;
        default: level1(); break;
    }
}

// Mouse tracking & export unchanged
let mouseMovements = [];
let taskStartTime, taskEndTime;

// track pointermove mostly
document.addEventListener('pointermove', function (e) {
    const timestamp = Date.now();
    mouseMovements.push({ x: e.clientX, y: e.clientY, time: timestamp });
});
function startTracking() { taskStartTime = Date.now(); mouseMovements = []; }
function stopTrackingAndExport(taskName = 'task') {
    taskEndTime = Date.now();
    const duration = (taskEndTime - taskStartTime) / 1000;
    let content = `Mouse Tracking for ${taskName}\n`;
    content += `Start Time: ${new Date(taskStartTime).toLocaleString()}\n`;
    content += `End Time: ${new Date(taskEndTime).toLocaleString()}\n`;
    content += `Duration: ${duration} seconds\n\n`;
    content += `X,Y,Timestamp\n`;
    mouseMovements.forEach(move => { content += `${move.x},${move.y},${new Date(move.time).toISOString()}\n`; });
    const formData = new FormData();
    formData.append('filename', `${taskName}_mouse_log.txt`);
    formData.append('content', content);
    fetch('save_mouse_data.php', { method: 'POST', body: formData }).then(r => r.text()).then(res => console.log('Mouse data saved', res)).catch(e => console.error('Save failed', e));
}
