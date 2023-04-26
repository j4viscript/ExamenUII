function setup() {
    createCanvas(windowWidth, windowHeight)

    input = createInput();
    input.position(500, 200);
    input.style('font-size', '18px');
    input.style('padding', '8px 12px');
    input.style('border', '2px solid #ccc');
    input.style('border-radius', '4px');

    button = createButton('Crear');
    button.position(580, 250);
    button.mousePressed(submit);
    button.style('font-size', '18px');
    button.style('background-color', '#4CAF50');
    button.style('color', 'white');
    button.style('padding', '8px 16px');
    button.style('border', 'none');
    button.style('cursor', 'pointer');
    button.style('border-radius', '4px');
    button.style('text-align', 'center');
    button.style('text-decoration', 'none');
    button.style('display', 'inline-block');

    background(50)
    circle(250, 500, 250)
    circle(650, 500, 250)
    circle(1050, 500, 250)
}




function submit() {
    const divs = input.value()
    if (divs > 1) {
        circle(250, 500, 250)
        circle(650, 500, 250)
        circle(1050, 500, 250)
        divide(250, 500, 125, divs, 'pp')
        divide(650, 500, 125, divs, 'dda')
        divide(1050, 500, 125, divs, 'ham')
    } else {
        circle(250, 500, 250)
        circle(650, 500, 250)
        circle(1050, 500, 250)
    }
}

function pp(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const m = (dy !== 0) ? dy / dx : 0;
    const b = y1 - m * x1;

    const xMin = min(x1, x2);
    const xMax = max(x1, x2);
    if (abs(m) == Infinity) {
        if (y2 > y1) {
            for (let y = y1; y <= y2; y++) {
                point(x1, y)
            }
        } else if (y1 > y2) {
            for (let y = y2; y <= y1; y++) {
                point(x1, y)
            }
        }
    } else {
        for (let x = xMin; x <= xMax; x++) {
            const y = m * x + b;
            point(x, y);
        }
    }
}

function dda(x1, y1, x2, y2) {
    const dx = x2 - x1
    const dy = y2 - y1

    let steps = Math.max(Math.abs(dx), Math.abs(dy))

    const xInc = dx / steps
    const yInc = dy / steps

    for (let i = 0; i <= steps; i++) {
        point(x1, y1)
        x1 += xInc
        y1 += yInc
    }
}

function ham(x1, y1, x2, y2) {
    const dx = abs(x2 - x1);
    const dy = abs(y2 - y1);

    let p = (dx - dy);
    while (x1 !== x2 || y1 !== y2) {
        point(x1, y1);
        const p2 = 2 * p;
        if (p2 > -dy) {
            p -= dy;
            if (x2 > x1) {
                x1 += 1
            } else {
                x1 -= 1;
            }
        }
        if (p2 < dx) {
            p += dx;
            if (y2 > y1) {
                y1 += 1
            } else {
                y1 -= 1;
            }
        }
    }
}

function divide(x, y, r, d, type) {
    print("------START------")
    for (let i = 0; i < d; i++) {
        const angulo = TWO_PI * i / d;
        const x2 = x + r * cos(angulo);
        const y2 = y + r * sin(angulo);
        print("x1: " + x)
        print("y1: " + x)
        print("x2: " + x2)
        print("y2: " + x2)
        if (type == 'pp')
            pp(x, y, x2, y2);
        if (type == 'dda')
            dda(x, y, x2, y2);
        if (type == 'ham')
            ham(x, y, round(x2), round(y2));
    }
    print("------END------")
}