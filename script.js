document.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.grid');
  const cells =Array.from(grid.querySelectorAll('div'));
  const width =10;
  let pacmanIndex = 28;
  let score = 0;

  const scoreDisplay = document.getElementById('score');

class Ghost {
  constructor(name, startIndex, className, speed=500){
    this.name = name;
    this.currentIndex = startIndex;
    this.className = className;
    this.speed =speed;
    this.timerId = null;
    this.directions = [-1, 1, -width, width]
  }
  draw() {
    cells[this.currentIndex].classList.add('ghost', this.className);
  }

  erase() {
    cells[this.currentIndex].classList.remove('ghost', this.className);
  }

  move() {
    this.timerId = setInterval(() => {
        const direction = this.directions[Math.floor(Math.random() * this.directions.length)];
        const nextIndex = this.currentIndex + direction;

        // no moverse si hay pared o fuera de límites
        if (
            nextIndex < 0 ||
            nextIndex >= cells.length ||
            cells[nextIndex].classList.contains('wall')
        ) return;

        this.erase();
        this.currentIndex = nextIndex;
        this.draw();
    }, this.speed);
}

}


const blinky = new Ghost('blinky', 41, 'red', 2000);
const pinky = new Ghost('pinky', 46, 'pink', 600);
const ghosts = [blinky, pinky];

  ghosts.forEach(ghost => {
      ghost.draw();
      ghost.move();
    // Asegúrate de tener la función `move()` implementada
  });

// Función para dibujar Pacman
    function drawPacman() {
        cells.forEach(cell => cell.classList.remove('pacman'));
        cells[pacmanIndex].classList.add('pacman');
    }

    
     // Función para quitar un punto
    function eatPoint() {
    if (cells[pacmanIndex].classList.contains('dot')) {
      cells[pacmanIndex].classList.remove('dot');
      score += 5
      scoreDisplay.textContent = score;
    }
  }
 
    drawPacman();
 
     // Movimiento del teclado
    document.addEventListener('keydown', (e) => {
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
    });
});
