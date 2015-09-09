
function steep() {
    automatico = 0;
    procesoManual();
}

function start() {
    w = canvas.width;
    h = canvas.height;
    if (automatico) {
        setInterval(paint, 1000);
    }
}

function paintQueue(titulo, x, y, queue, c) {
    var alto = 50;
    var anchoP = 50;
    for (var i = 0; i < queue.length; i++) {

        c.beginPath();
        c.fillStyle = '#2ecc71';
        c.rect(x, y + (i * alto), anchoP, alto);
        c.fill();
        c.strokeStyle = '#fff';

        c.beginPath();
        c.font = '20pt verdana';
        c.fillStyle = '#fff';
        c.fillText(queue[i], x + 2, (y + (2 * alto) / 3 + (i * alto)));

        c.beginPath();
        c.font = '20pt verdana';
        c.fillStyle = '#fff';
        c.fillText(titulo, x + 10, y - 12);

        c.beginPath();
        c.rect(x, y + (i * alto), anchoP, alto);
        c.stroke();

    }
    ;
}

function paint() {
    if (automatico) {
        calculadora.crearPostfija();
        temporizador++;

        if (calculadora.infija.tam() === 0 && calculadora.operadores.tam() === 0) {
            calculadora.hallarResultado();
        }
        //temporizador
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.font = '16pt verdana';
        context.fillStyle = '#fff';
        context.fillText("Tiempo: " + temporizador, 5, 20);

        context.font = '16pt verdana';
        context.fillStyle = '#fff';
        context.fillText("Automático", w - 150, 20);

        //dibujar cola INFIJA
        paintQueue("INFIJA", 50, 100, (calculadora.infija).getCola(), context);

        //dibujar cola POSTFIJA
        paintQueue("POSTFIJA", 200, 100, (calculadora.postfija).getCola(), context);

        //dibujar cola OPERADORES
        paintQueue("OPERADORES", 350, 100, (calculadora.operadores).getPila(), context);

        //dibujar cola EXPRESION
        paintQueue("EXPRESION", 500, 100, (calculadora.expresion).getPila(), context);

        paintQueue("EXPRESION", 650, 100, (calculadora.resultados).getPila(), context);
    }

} // fin de paint();

function procesoManual() {

    calculadora.crearPostfija();
    temporizador++;
    if (calculadora.infija.tam() === 0 && calculadora.operadores.tam() === 0) {
        calculadora.hallarResultado();
    }
    //temporizador
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.font = '16pt verdana';
    context.fillStyle = '#fff';
    context.fillText("Tiempo: " + temporizador, 5, 20);

    context.font = '16pt verdana';
    context.fillStyle = '#fff';
    context.fillText("Paso a paso", w - 150, 20);

    //dibujar cola INFIJA
    paintQueue("INFIJA", 50, 100, (calculadora.infija).getCola(), context);

    //dibujar cola POSTFIJA
    paintQueue("POSTFIJA", 200, 100, (calculadora.postfija).getCola(), context);

    //dibujar cola OPERADORES
    paintQueue("OPERADORES", 350, 100, (calculadora.operadores).getPila(), context);

    //dibujar cola EXPRESION
    paintQueue("EXPRESION", 500, 100, (calculadora.expresion).getPila(), context);

    paintQueue("EXPRESION", 650, 100, (calculadora.resultados).getPila(), context);

}
