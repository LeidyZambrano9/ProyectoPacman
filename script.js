const game = document.getElementById('game');
const width = 28;
const cells = [];
let pacmanIndex = 490; // posición inicial de Pac-Man

// Mapa base (fragmento de ejemplo, podés ampliarlo a 28x28)
const layout = [
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,1,0,1,1,1,0,1,1,0,1,1,1,1,0,1,1,1,1,1,0,0,1,
  1,0,1,2,2,2,1,0,1,2,1,0,0,0,0,1,2,2,1,0,1,2,2,2,1,0,0,1,
  1,0,1,2,3,2,1,0,1,2,1,0,1,1,0,1,2,3,1,0,1,2,3,2,1,0,0,1,
  1,0,1,2,2,2,1,0,1,2,1,0,1,1,0,1,2,2,1,0,1,2,2,2,1,0,0,1,
  1,0,1,1,1,1,1,0,1,1,1,0,1,1,0,1,1,1,1,0,1,1,1,1,1,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];

function createBoard() {
  for (let i = 0; i < layout.length; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');

    switch (layout[i]) {
      case 0:
        cell.classList.add('pac-dot');
        break;
      case 1:
        cell.classList.add('wall');
        break;
      case 3:
        cell.classList.add('ghost');
        break;
      case 4:
        cell.classList.add('power-pellet');
        break;
    }

    game.appendChild(cell);
    cells.push(cell);
  }
}

function drawPacman() {
  cells[pacmanIndex].classList.add('pacman');
}

function removePacman() {
  cells[pacmanIndex].classList.remove('pacman');
}

// Movimiento del Pac-Man con flechas
function movePacman(e) {
  removePacman();

  switch (e.key) {
    case 'ArrowUp':
      if (pacmanIndex - width >= 0 && !cells[pacmanIndex - width].classList.contains('wall')) {
        pacmanIndex -= width;
      }
      break;
    case 'ArrowDown':
      if (pacmanIndex + width < cells.length && !cells[pacmanIndex + width].classList.contains('wall')) {
        pacmanIndex += width;
      }
      break;
    case 'ArrowLeft':
      if (pacmanIndex % width !== 0 && !cells[pacmanIndex - 1].classList.contains('wall')) {
        pacmanIndex -= 1;
      }
      break;
    case 'ArrowRight':
      if (pacmanIndex % width < width - 1 && !cells[pacmanIndex + 1].classList.contains('wall')) {
        pacmanIndex += 1;
      }
      break;
  }

  eatDot();
  drawPacman();
}

function eatDot() {
  if (cells[pacmanIndex].classList.contains('pac-dot')) {
    cells[pacmanIndex].classList.remove('pac-dot');
    // Podés sumar puntos acá si querés
  }
}

// Inicializar
createBoard();
drawPacman();
document.addEventListener('keydown', movePacman);
