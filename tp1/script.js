let colors;
let grid = [];
let gridColors = [];
let gridDivsX = 15;
let gridDivsY = 15;
let pad, w;
let gridSpacingX, gridSpacingY;
let enlargedSquares = [];

function setup() {
    w = min(windowWidth, windowHeight);
    createCanvas(w, w);
    
    pad = w / 12;
    
    strokeWeight(4);
    
    gridSpacingX = (w - pad * 2) / gridDivsX;
    gridSpacingY = (w - pad * 2) / gridDivsY;

    // Definir una paleta de colores basada en las imágenes
    colors = [
      color(255, 204, 153), color(255, 102, 102), color(102, 153, 255),
      color(153, 255, 153), color(255, 255, 102), color(153, 102, 51),
      color(102, 51, 0), color(51, 0, 0), color(0, 51, 51),
      color(204, 204, 255), color(102, 0, 51), color(0, 102, 102),
      color(51, 255, 51), color(153, 0, 0), color(255, 153, 102)
    ];
    
    for (let i = 0; i <= gridDivsX; i++) {
      let col = [];
      let colColors = [];
      for (let j = 0; j <= gridDivsY; j++) {
        var x = map(i, 0, gridDivsX, pad, w - pad);
        var y = map(j, 0, gridDivsY, pad, w - pad);
        
        col.push([x + random(-3, 3), y + random(-3, 3)]); // Menor irregularidad
        
        // Elegir un color aleatorio de la paleta
        let colColor = random(colors);
        colColors.push(colColor);
      }
      grid.push(col);
      gridColors.push(colColors);
    }

    drawGrid();
}

function drawGrid() {
    background(0);
    
    // Dibujar los cuadrados normales primero
    for (let i = 0; i < gridDivsX; i++) {
      for (let j = 0; j < gridDivsY; j++) {
        let enlarged = false;
        for (let k = 0; k < enlargedSquares.length; k++) {
            if (enlargedSquares[k][0] === i && enlargedSquares[k][1] === j) {
                enlarged = true;
                break;
            }
        }
        
        if (!enlarged) {
            drawSquare(i, j);
        }
      }
    }

    // Dibujar los cuadrados agrandados después
    for (let k = 0; k < enlargedSquares.length; k++) {
        let i = enlargedSquares[k][0];
        let j = enlargedSquares[k][1];
        drawSquare(i, j, true);
    }
}

function drawSquare(x, y, enlarged = false) {
  var x0 = grid[x][y][0];
  var y0 = grid[x][y][1];
  var xn = grid[x + 1][y][0];
  var yn = grid[x + 1][y][1];
  var xm = grid[x][y + 1][0];
  var ym = grid[x][y + 1][1];
  var xp = grid[x + 1][y + 1][0];
  var yp = grid[x + 1][y + 1][1];
  
  // Usar el color almacenado y ajustar el brillo basado en la posición horizontal del mouse
  let col = gridColors[x][y];
  let brightnessFactor = map(mouseX, 0, width, 0.4, 1); // Ajuste del factor de brillo
  col = lerpColor(color(0), col, brightnessFactor);
  fill(col);
  noStroke();

  if (enlarged) {
      beginShape();
      vertex(x0, y0);
      vertex(xn + gridSpacingX, yn);
      vertex(xp + gridSpacingX, yp + gridSpacingY);
      vertex(xm, ym + gridSpacingY);
      endShape(CLOSE);
  } else {
      beginShape();
      vertex(x0, y0);
      vertex(xn, yn);
      vertex(xp, yp);
      vertex(xm, ym);
      endShape(CLOSE);
  }
}


function mousePressed() {
    let clickedX = floor((mouseX - pad) / gridSpacingX);
    let clickedY = floor((mouseY - pad) / gridSpacingY);

    if (clickedX >= 0 && clickedX < gridDivsX && clickedY >= 0 && clickedY < gridDivsY) {
        enlargeSquare(clickedX, clickedY);
    }
}

function enlargeSquare(i, j) {
    enlargedSquares.push([i, j]);
    redrawGrid();
}

function redrawGrid() {
    drawGrid();
}

function draw() {
    redrawGrid();
}
