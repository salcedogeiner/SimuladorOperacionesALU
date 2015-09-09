
function auto() {
    if (automatico === 0) {
        automatico = 1;
        start();
    } else
        automatico = 0;
        procesoManual();
}
;
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
    var alto = 25;
    var anchoP = 25;
    for (var i = 0; i < queue.length; i++) {
        c.beginPath();
        c.fillStyle = '#2ecc71';
        c.rect(x, y + (i * alto), anchoP, alto);
        c.fill();
        c.strokeStyle = '#fff';

        c.beginPath();
        c.font = '12pt verdana';
        c.fillStyle = '#fff';
        c.fillText(queue[i], x + 2, (y + (2 * alto) / 3 + (i * alto)));

        c.beginPath();
        c.font = '10pt verdana';
        c.fillStyle = '#fff';
        c.fillText(titulo, x - 25, y - 12);

        c.beginPath();
        c.rect(x, y + (i * alto), anchoP, alto);
        c.stroke();

    }
    ;
}
function dibujar(){
    calculadora.crearPostfija();
        temporizador++;

        if (calculadora.infija.tam() === 0 && calculadora.operadores.tam() === 0) {
            if(calculadora.postfija.date == 0){
                calculadora.postfija.backup();
            }
            
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
        paintQueue("POSTFIJA", 150, 100, (calculadora.postfija).getCola(), context);

        //dibujar cola OPERADORES
        paintQueue("OPERADORES", 250, 100, (calculadora.operadores).getPila(), context);

        //dibujar cola EXPRESION
        paintQueue("EXPRESION", 350, 100, (calculadora.expresion).getPila(), context);

        paintQueue("EXPRESION", 450, 100, (calculadora.resultados).getPila(), context);
};

function paint() {
    if (automatico) {
        dibujar();
    }

} // fin de paint();

function procesoManual() {
    dibujar();
};
