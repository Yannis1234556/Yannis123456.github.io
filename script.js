const gameContainer = document.getElementById('game-container');
const quackSound = document.getElementById('quack-sound');
const duckSound = document.getElementById('duck-sound');
const duck = document.getElementById('ducky_img');
const ronnie = document.getElementById('ronnie_btn');
const ronnieResultSound = document.getElementById('ronnie-result');
const samson = document.getElementById('samson_btn');
const samsonResultSound = document.getElementById('samson-result');

var X, Y;
var isRonnieMode;       // A boolean to indicate if the selected is ronnie or not
var gameEnded;

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
    Math.pow(event.clientX - X, 2) + Math.pow(event.clientY - Y, 2)
  );

  // Adjust the volume of the sound effect based on the distance
  const maxDistance = Math.sqrt(
    Math.pow(gameContainer.offsetWidth, 2) + Math.pow(gameContainer.offsetHeight, 2)
  );
  const volume = Math.exp(-distance / maxDistance * 9);
  if (isRonnieMode && !gameEnded) {
    document.getElementById('ronnie-sound').volume = volume;
    document.getElementById('ronnie-sound').play();
  } else if (!gameEnded) {
    document.getElementById('samson-sound').volume = volume;
    document.getElementById('samson-sound').play();
  } else {
    return;
  }
  // duckSound.volume = volume;
  // duckSound.play();
});

function startGame(event) {
  let selectedPerson = document.getElementById('hiddenPerson_options').value;
  if (selectedPerson == 'ronnie') {
    isRonnieMode = true;
  } else if (selectedPerson == 'samson') {
    isRonnieMode = false;
  } else {
    alert("Please select a person to start the game!");
    return;
  }
  gameEnded = false;
  
  console.log("the current mode is ronnie: ", isRonnieMode);
  document.getElementById('start-dialog').style.display = 'none';
  gameContainer.style.display = 'flex';

  init_duck_location(event);

}

function duckClicked(isRonnie) {
  gameEnded = true;
  if ((isRonnie == 1) && isRonnieMode){
    document.getElementById('ronnie-sound').pause();
    document.getElementById('ronnie_btn').style.opacity = '1.0';
    ronnie.style.transform = 'scale(10)';
    // ronnie.style.animation = 'sway 5s ease-in-out';
    setTimeout(() => {
      ronnieResultSound.play();
    }, 1000);
    restartTimeout = setTimeout(resetGame, 2500);
  } else if ((isRonnie == 0) && !isRonnieMode) {
    document.getElementById('samson-sound').pause();
    document.getElementById('samson_btn').style.opacity = '1.0';
    samson.style.transform = 'scale(10)';
    // samson.style.animation = 'sway 0.5s';
    setTimeout(() => {
      samsonResultSound.play();
    }, 1000);
    restartTimeout = setTimeout(resetGame, 2500);
  } else {
    return;
  }
    // duck.style.opacity = '1.0';
    // duck.style.transform = 'scale(3)'
    // quackSound.play();
    // restartTimeout = setTimeout(resetGame, 2000);
}

function init_duck_location(event) {
  // const duckRect = duck.getBoundingClientRect();

  // const curX = duckRect.left; // X position if left-top corner is (0,0)
  // const curY = duckRect.top;  // Y position if left-top corner is (0,0)

  // Generate a random position for the invisible person
  X = Math.floor(Math.random() * gameContainer.offsetWidth);
  Y = Math.floor(Math.random() * gameContainer.offsetHeight);

  // Set the position of the person
  if (isRonnieMode) {
    document.getElementById('ronnie_btn').disabled = false;
    document.getElementById('ronnie_btn').style.left = `${X}px`;
    document.getElementById('ronnie_btn').style.right = `${Y}px`;
    document.getElementById('ronnie_btn').style.cursor = 'grab';
    document.getElementById('samson_btn').disabled = true;
    document.getElementById('samson_btn').style.cursor = 'default';
  } else {
    document.getElementById('samson_btn').disabled = false;
    document.getElementById('samson_btn').style.left = `${X}px`;
    document.getElementById('samson_btn').style.right = `${Y}px`;
    document.getElementById('samson_btn').style.cursor = 'grab';
    document.getElementById('ronnie_btn').disabled = true;
    document.getElementById('ronnie_btn').style.cursor = 'default';
  }
  // duck.style.left = `${X}px`;
  // duck.style.top = `${Y}px`;

  // Append the image to the container
  //    gameContainer.appendChild(duck);

  // soundPlaying = setTimeout(playSound(event), 500)
}


// Not used rn
// function playSound(event) {
//   // Calculate the distance between the mouse cursor and the duck's position
//   const distance = Math.sqrt(
//     Math.pow(event.clientX - X, 2) + Math.pow(event.clientY - Y, 2)
//   );

//   // Adjust the volume of the sound effect based on the distance
//   const maxDistance = Math.sqrt(
//     Math.pow(gameContainer.offsetWidth, 2) + Math.pow(gameContainer.offsetHeight, 2)
//   );
//   const volume = Math.exp(-distance / maxDistance * 5);

//   if (isRonnieMode) {
//     document.getElementById('ronnie-sound').volume = volume;
//   } else {
//     document.getElementById('samson-sound').volume = volume;
//   }
//   duckSound.volume = volume;
// }

function resetGame() {
  clearTimeout(restartTimeout);
  document.getElementById('start-dialog').style.display = 'flex';
  gameContainer.style.display = 'none';

  X = 0;
  Y = 0;
  isRonnieMode = false;  
  gameEnded = false;

  document.getElementById('ronnie_btn').style.opacity = '0';
  ronnie.style.transform = 'none'
  document.getElementById('ronnie_btn').disabled = false;
  document.getElementById('ronnie_btn').style.cursor = 'grab';
  document.getElementById('samson_btn').style.opacity = '0';
  samson.style.transform = 'none'
  document.getElementById('samson_btn').disabled = false;
  document.getElementById('samson_btn').style.cursor = 'grab';

  // duck.style.opacity = '0';
  // duck.style.transform = 'none'
}