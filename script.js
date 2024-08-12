const gameContainer = document.getElementById('game-container');
const duckSound = document.getElementById('duck-sound');
const duck = document.getElementById('ducky_img');

function change_duck_location() {
  const duckRect = duck.getBoundingClientRect();

  const curX = duckRect.left; // X position if left-top corner is (0,0)
  const curY = duckRect.top;  // Y position if left-top corner is (0,0)

  // Generate a random position for the invisible duck
  const duckX = Math.floor(Math.random() * gameContainer.offsetWidth);
  const duckY = Math.floor(Math.random() * gameContainer.offsetHeight);

  // Set the position of the duck
  duck.style.left = `${duckX}px`;
  duck.style.top = `${duckY}px`;

  // Make the image visible when clicked
  duck.addEventListener('click', () => {
    // Make the image visible
    duck.style.display = 'block';
  });
}

gameContainer.addEventListener('mousemove', (event) => {
    // Calculate the distance between the mouse cursor and the duck's position
    const distance = Math.sqrt(
      Math.pow(event.clientX - duckX, 2) + Math.pow(event.clientY - duckY, 2)
    );

    // Adjust the volume of the sound effect based on the distance
    const maxDistance = Math.sqrt(
      Math.pow(gameContainer.offsetWidth, 2) + Math.pow(gameContainer.offsetHeight, 2)
    );
    const volume = 1 - distance / maxDistance;
    duckSound.volume = volume;
    duckSound.play();
});