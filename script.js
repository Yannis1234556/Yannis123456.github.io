const gameContainer = document.getElementById('game-container');
const quackSound = document.getElementById('quack-sound');
const duckSound = document.getElementById('duck-sound');
const duck = document.getElementById('ducky_img');

var duckX, duckY;

var restartTimeout;

// Make the image visible when clicked
// duck.addEventListener('click', () => {
//     console.log("hello");
//     duck.style.display = 'block';
//     quackSound.play();
// });

gameContainer.addEventListener('mousemove', (event) => {
  // Calculate the distance between the mouse cursor and the duck's position
  const distance = Math.sqrt(
    Math.pow(event.clientX - duckX, 2) + Math.pow(event.clientY - duckY, 2)
  );

  // Adjust the volume of the sound effect based on the distance
  const maxDistance = Math.sqrt(
    Math.pow(gameContainer.offsetWidth, 2) + Math.pow(gameContainer.offsetHeight, 2)
  );
  const volume = Math.exp(-distance / maxDistance * 5);
  duckSound.volume = volume;
  duckSound.play();
});

function startGame(event) {
  document.getElementById('start-dialog').style.display = 'none';
  gameContainer.style.display = 'flex';

  init_duck_location(event);
}

function duckClicked() {
    console.log("hello");
    duck.style.opacity = '1.0';
    duck.style.transform = 'scale(3)'
    quackSound.play();
    restartTimeout = setTimeout(resetGame, 2000);
}

function init_duck_location(event) {
  // const duckRect = duck.getBoundingClientRect();

  // const curX = duckRect.left; // X position if left-top corner is (0,0)
  // const curY = duckRect.top;  // Y position if left-top corner is (0,0)

  // Generate a random position for the invisible duck
  duckX = Math.floor(Math.random() * gameContainer.offsetWidth);
  duckY = Math.floor(Math.random() * gameContainer.offsetHeight);

  // Set the position of the duck
  duck.style.left = `${duckX}px`;
  duck.style.top = `${duckY}px`;

  // Append the image to the container
  //    gameContainer.appendChild(duck);

  // soundPlaying = setTimeout(playSound(event), 500)
}

function playSound(event) {
  // Calculate the distance between the mouse cursor and the duck's position
  const distance = Math.sqrt(
    Math.pow(event.clientX - duckX, 2) + Math.pow(event.clientY - duckY, 2)
  );

  // Adjust the volume of the sound effect based on the distance
  const maxDistance = Math.sqrt(
    Math.pow(gameContainer.offsetWidth, 2) + Math.pow(gameContainer.offsetHeight, 2)
  );
  const volume = Math.exp(-distance / maxDistance * 5);
  duckSound.volume = volume;
}

function resetGame() {
  clearTimeout(restartTimeout);
  document.getElementById('start-dialog').style.display = 'flex';
  gameContainer.style.display = 'none';

  duck.style.opacity = '0';
  duck.style.transform = 'none'
}