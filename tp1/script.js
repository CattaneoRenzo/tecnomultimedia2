let colors;
let grid = [];
let gridColors = [];
let gridDivsX = 15;
let gridDivsY = 15;
let pad, w, h;
let gridSpacingX, gridSpacingY;
let enlargedSquares = [];
let brightnessMode;
let focusX, focusY;

function setup() {
    // Determinar la cantidad de filas y columnas adicionales
    let gridAdjustment = random();
    if (gridAdjustment < 0.25) {
        gridDivsX += 2; // 25% - Una columna más a cada lado
    } else if (gridAdjustment < 0.5) {
        gridDivsY += 2; // 25% - Una fila más arriba y abajo
    }

    // Calcular dimensiones del lienzo
    w = (min(windowWidth, windowHeight) / 15) * gridDivsX;
    h = (min(windowWidth, windowHeight) / 15) * gridDivsY;
    createCanvas(w, h);

    pad = min(w, h) / 12;
    strokeWeight(4);

    gridSpacingX = (w - pad * 2) / gridDivsX;
    gridSpacingY = (h - pad * 2) / gridDivsY;

    // Definir las paletas de colores
    let palettes = [
        [
            color('#7a6d42'), color('#625e3c'), color('#ad2d2b'), color('#8c8445'), color('#a89c4b'),
            color('#cebd8d'), color('#47463d'), color('#3c4a5c'), color('#5a4e3b'), color('#30445c'),
            color('#2e3a48'), color('#b5a576'), color('#773930'), color('#2f2f34'), color('#9a863c'),
            color('#542421'), color('#6f4535'), color('#af9c71'), color('#3c352e'), color('#742829'),
            color('#a0343c'), color('#562f28'), color('#483028'), color('#34443a'), color('#342726'),
            color('#a43c31'), color('#2b2c28'), color('#8c8c54'), color('#303428'), color('#75482c'),
            color('#c42a2d'), color('#c4b484'), color('#5c4435'), color('#2c2020'), color('#463c2e'),
            color('#241f20'), color('#4a241c'), color('#333c34'), color('#947c44'), color('#583c30'),
            color('#5a4445'), color('#64382e'), color('#beac84'), color('#291e14'), color('#29232c'),
            color('#492424'), color('#a4a45c'), color('#463b3c'), color('#1c1c1e'), color('#3c3b3c'),
            color('#94322f'), color('#573434'), color('#473434'), color('#48442c'), color('#4c4424'),
            color('#3c4654'), color('#5c2c1c'), color('#3c2422'), color('#573c3c'), color('#2c1414'),
            color('#4c1c1c'), color('#3c2e1c'), color('#3c1c1c')
        ],
        [
            color('#637359'), color('#81a3a2'), color('#808491'), color('#b3afae'), color('#612a20'),
            color('#7a7e72'), color('#45353b'), color('#d6dcd2'), color('#b4ae4a'), color('#beb960'),
            color('#86a051'), color('#a44a55'), color('#8c4a51'), color('#4f4e30'), color('#4f291c'),
            color('#812d32'), color('#585762'), color('#566634'), color('#444755'), color('#b57786'),
            color('#806f2a'), color('#88773c'), color('#3d3626'), color('#545048'), color('#302619'),
            color('#85b6c5'), color('#8ca044'), color('#7b6172'), color('#858550'), color('#d9c2b2'),
            color('#6c9c94'), color('#647c94'), color('#3e2019'), color('#524456'), color('#bc8692'),
            color('#aca885'), color('#657579'), color('#3c442c'), color('#121408'), color('#7c648c'),
            color('#291b1d'), color('#2c0c08'), color('#635214'), color('#664e30'), color('#34130d'),
            color('#988274'), color('#1f0604'), color('#c4cccc'), color('#4c647c'), color('#090404'),
            color('#402c1f'), color('#200b0c'), color('#9cbcb4'), color('#400906'), color('#120a0c'),
            color('#21140d'), color('#281c10'), color('#3d252c'), color('#140404'), color('#40140e'),
            color('#494a1c'), color('#3f200c'), color('#3c2c04')
        ],
        [
            color('#6a7495'), color('#f1e2a5'), color('#dd8d80'), color('#b96549'), color('#a4accf'),
            color('#8e9797'), color('#d89465'), color('#d47061'), color('#c34b3c'), color('#494667'),
            color('#e93f34'), color('#ad9986'), color('#7c554a'), color('#f1e1d9'), color('#f8e46c'),
            color('#c3deba'), color('#947561'), color('#a4b4cf'), color('#d7b8a7'), color('#c8c8b9'),
            color('#caa97d'), color('#adcba0'), color('#a4dca8'), color('#f6b19e'), color('#95c898'),
            color('#60644d'), color('#aaadb8'), color('#ad6d64'), color('#d7cf99'), color('#f2cc60'),
            color('#b2b9d1'), color('#a55868'), color('#cdd5e2'), color('#e8af8a'), color('#a98f6a'),
            color('#8f7c83'), color('#748cac'), color('#9f493e'), color('#f67468'), color('#d3be8e'),
            color('#8c9cb9'), color('#f6c7ba'), color('#acb89b'), color('#d0aa99'), color('#e8c6bb'),
            color('#905043'), color('#8c7c4c'), color('#b47a84'), color('#382f44'), color('#f4d18d'),
            color('#6e6864'), color('#91897b'), color('#745c7c'), color('#565984'), color('#f2e680'),
            color('#b9585a'), color('#cdbad1'), color('#dbacb7'), color('#dcaa85'), color('#f59c8c'),
            color('#f4a976'), color('#f4c4a4'), color('#f4bc84')
        ],
        [
            color('#aaa796'), color('#aa8342'), color('#5b4a29'), color('#a9642d'), color('#859350'),
            color('#596a3f'), color('#424f33'), color('#736238'), color('#140b09'), color('#d7b35b'),
            color('#dcc76a'), color('#bcb15c'), color('#445544'), color('#7d7c7a'), color('#c07720'),
            color('#373e28'), color('#0b0a05'), color('#94948d'), color('#a04c1c'), color('#7b7e44'),
            color('#463b25'), color('#2e200b'), color('#291c15'), color('#0c140a'), color('#6c8c3c'),
            color('#6f4a1c'), color('#384034'), color('#747474'), color('#5a573e'), color('#c78b47'),
            color('#704b27'), color('#906838'), color('#808e3c'), color('#3c2f1e'), color('#24271b'),
            color('#6c3c24'), color('#747354'), color('#3c6c3c'), color('#58574d'), color('#737442'),
            color('#14140b'), color('#2c4d30'), color('#454336'), color('#303421'), color('#34291a'),
            color('#191a14'), color('#a49c64'), color('#2c2718'), color('#542c1c'), color('#5e7454'),
            color('#785724'), color('#452c1c'), color('#32332c'), color('#1c170a'), color('#2c2c24'),
            color('#1b211c'), color('#646424'), color('#1c2c1c'), color('#462414'), color('#1b2414'),
            color('#1c2c24'), color('#473714'), color('#54340c')
        ]
    ];


    colors = random(palettes);

    // Determinar el modo de brillo
    brightnessMode = random() < 0.33 ? "uniform" : "focus";

    if (brightnessMode === "focus") {
        focusX = random(w * 0.4, w * 0.6);
        focusY = random(h * 0.4, h * 0.6);
    }

    // Configurar la cuadrícula y los colores
    for (let i = 0; i <= gridDivsX; i++) {
        let col = [];
        let colColors = [];
        for (let j = 0; j <= gridDivsY; j++) {
            var x = map(i, 0, gridDivsX, pad, w - pad);
            var y = map(j, 0, gridDivsY, pad, h - pad);

            col.push([x + random(-3, 3), y + random(-3, 3)]);

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

    let col = gridColors[x][y];
    let brightnessFactor;

    if (brightnessMode === "uniform") {
        brightnessFactor = map(mouseX, 0, width, 0.4, 1);
    } else {
        let d = dist((x0 + xn + xm + xp) / 4, (y0 + yn + ym + yp) / 4, focusX, focusY);
        let centerBrightnessFactor = map(mouseX, 0, width, 0.4, 1);
        brightnessFactor = lerp(centerBrightnessFactor, 0.4, d / (max(w, h) / 2));
    }

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

    if (clickedX > 0 && clickedX < gridDivsX - 1 && clickedY > 0 && clickedY < gridDivsY - 1) {
        enlargeSquare(clickedX, clickedY);
    }
}

function enlargeSquare(i, j) {
    if (enlargedSquares.length >= 6) {
        enlargedSquares.shift();
    }

    for (let k = 0; k < enlargedSquares.length; k++) {
        let xi = enlargedSquares[k][0];
        let yj = enlargedSquares[k][1];
        if (Math.abs(xi - i) <= 1 && Math.abs(yj - j) <= 1) {
            return; // No permitir superposición de cuadrados agrandados
        }
    }

    enlargedSquares.push([i, j]);
    redrawGrid();
}

function redrawGrid() {
    drawGrid();
}

function draw() {
    redrawGrid();
}
