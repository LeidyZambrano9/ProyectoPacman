document.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.grid');
  const cells = Array.from(grid.querySelectorAll('div'));
  const width = 10;
  let pacmanIndex = 28;
  let score = 0;
  let lives = 3;
  const livesDisplay = document.getElementById('lives');
  const scoreDisplay = document.getElementById('score');

  class Ghost {
    constructor(name, startIndex, className, speed = 500) {
      this.name = name;
      this.currentIndex = startIndex;
      this.className = className;
      this.speed = speed;
      this.timerId = null;
      this.directions = [-1, 1, -width, width]
      this.startIndex = startIndex;
      this.scared = false;
    }
    draw() {
      // Limpiar todas las clases de fantasma primero
      cells[this.currentIndex].classList.remove('ghost', 'red', 'pink', 'scared');

      cells[this.currentIndex].classList.add('ghost');
      // Agregar la clase correcta dependiendo del estado
      if (this.scared) {
        cells[this.currentIndex].classList.add('scared');
      } else {
        cells[this.currentIndex].classList.add(this.className);
      }
    }



    erase() {
      cells[this.currentIndex].classList.remove('ghost', this.className);
    }

    move() {
      this.timerId = setInterval(() => {
        let bestDirection = null;
        let bestDistance = this.scared ? -Infinity : Infinity;

        for (let direction of this.directions) {
          const nextIndex = this.currentIndex + direction;

          if (
            nextIndex < 0 ||
            nextIndex >= cells.length ||
            cells[nextIndex].classList.contains('wall')
          ) continue;

          const ghostRow = Math.floor(nextIndex / width);
          const ghostCol = nextIndex % width;
          const pacmanRow = Math.floor(pacmanIndex / width);
          const pacmanCol = pacmanIndex % width;

          const distance = Math.abs(ghostRow - pacmanRow) + Math.abs(ghostCol - pacmanCol);

          if (this.scared) {
            if (distance > bestDistance) {
              bestDistance = distance;
              bestDirection = direction;
            }
          } else {
            if (distance < bestDistance) {
              bestDistance = distance;
              bestDirection = direction;
            }
          }
        }

        if (bestDirection !== null) {
          this.erase();
          this.currentIndex += bestDirection;
          this.draw();
        }

        // Detectar colisión con Pacman
        if (this.currentIndex === pacmanIndex) {
          if (this.scared) {
            this.erase();
            this.currentIndex = this.startIndex;
            score += 200;
            scoreDisplay.textContent = score;
            this.draw();
          } else {
            loseLife();
          }
        }

      }, this.speed);
    }

    setScaredMode(isScared) {
      this.scared = isScared;
      // Redibujar inmediatamente para mostrar el cambio
      this.draw();
    }
  }




  const blinky = new Ghost('blinky', 41, 'red', 900);
  const pinky = new Ghost('pinky', 46, 'pink', 900);
  const ghosts = [blinky, pinky];

  ghosts.forEach(ghost => {
    ghost.draw();
    ghost.move();
  });

  // Función para dibujar Pacman
  function drawPacman() {
    const currentPacmanCell = document.querySelector('.pacman');
    if (currentPacmanCell) currentPacmanCell.classList.remove('pacman');

    cells[pacmanIndex].classList.add('pacman');
  }

  // Funcion para que los fantasmas tengan miedo
  function activateScaredMode() {
    ghosts.forEach(ghost => {
      ghost.setScaredMode(true);
    });

    setTimeout(() => {
      ghosts.forEach(ghost => {
        ghost.setScaredMode(false);
      });
    }, 10000); // 10 segundos de miedo
  }




  // Función para quitar un punto
  function eatPoint() {
    if (cells[pacmanIndex].classList.contains('dot')) {
      cells[pacmanIndex].classList.remove('dot');
      score += 5
      scoreDisplay.textContent = score;
    }
    if (cells[pacmanIndex].classList.contains('power-pellet')) {
      cells[pacmanIndex].classList.remove('power-pellet');
      score += 100;
      scoreDisplay.textContent = score;
      activateScaredMode();
    }
  }


  function loseLife() {
    lives--;
    livesDisplay.textContent = lives;

    if (lives <= 0) {
      endGame();
    } else {
      resetPacmanPosition();
    }
  }

  function resetPacmanPosition() {
    cells[pacmanIndex].classList.remove('pacman');
    pacmanIndex = 28; // o la posición inicial definida
    drawPacman();
  }

  function endGame() {
    ghosts.forEach(ghost => clearInterval(ghost.timerId));
    document.removeEventListener('keydown', handleKeyPress);
    alert('¡Game Over!');
  }


  // Movimiento del teclado
  function handleKeyPress(e) {
    cells[pacmanIndex].classList.remove('pacman');
    switch (e.key) {
      case 'ArrowLeft':
        if (pacmanIndex % width !== 0 && !cells[pacmanIndex - 1].classList.contains('wall')) {
          pacmanIndex -= 1;
        }
        break;
      case 'ArrowRight':
        if (pacmanIndex % width !== width - 1 && !cells[pacmanIndex + 1].classList.contains('wall')) {
          pacmanIndex += 1;
        }
        break;
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
    }
    eatPoint(); // Verificar si Pacman ha comido un punto

    drawPacman(); // Redibujar Pacman después de moverlo
  }
  drawPacman();

  // Movimiento del teclado
  document.addEventListener('keydown', handleKeyPress);


});
