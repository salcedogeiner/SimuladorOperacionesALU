
var Pila = function () {
    this.pp = new Array();

    this.despachar = function () { // atiende una pila
        return ((this.pp).shift());
    };

    this.adicionar = function (p) { // adiciona a una pila
        (this.pp).unshift(p);
    };

    this.tam = function () {        // mostrar tamano de la pila
        return (this.pp).length;
    };

    this.getPila = function () {    // retorna la pila
        return this.pp;
    };
};

var Cola = function () {  // clase que representa una cola
    this.date = 0;
    this.cc = new Array();
    this.cp = new Array();

    this.despachar = function () { // atiende una cola
        return ((this.cc).shift());
    };

    this.despacharCp = function () { // atiende una cola
        return ((this.cp).shift());
    };

    this.adicionar = function (p) { // adiciona una cola
        (this.cc).push(p);
    };

    this.tam = function () {        // retorna el tamano del la cola
        return (this.cc).length;
    };

    this.getCola = function () {    // retorna la cola
        return this.cc;
    };

    this.backup = function () {
        this.cp = this.cc.slice(0);
        this.date++;
    };

    this.tamCp = function () {        // retorna el tamano del la cola
        return (this.cp).length;
    };
};

var ALU = function () {
    // cola de infijo y su respectiva copia 
    this.infija = new Cola();
    // cola de postfijo y su respectiva copia 
    this.postfija = new Cola();
    // pila de resolucion de operadores   
    this.operadores = new Pila();
    this.expresion = new Pila();

    this.resultados = new Pila();
    // arraylist de signos
    this.prioridad = new Array('=', '+', '*', '^');
    this.prioridad2 = new Array('', '-', '/', '');
    this.operadores_ejecutar = new Array('=', '-', '+', '/', '*', '^');
    this.letras = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    
    this.esLetra = function(l){
        if (this.letras.indexOf(l) !== -1){
            return 1;
        }else return 0;
    };

    this.crearInfija = function (p) {
        var arrayTemp = new Array();
        var max = p.length;
        for (var i = 0; i < max; i++) {
            if (!(isNaN(p.charAt(i))) && i !== 0) { // valida si es un numero o si no esta en la primera posicion
                var numeros = arrayTemp.pop();
                if (!(isNaN(numeros))) {            //valida si el ultimo elemento de la cola temporal es un numero
                    var numeros = numeros + (p.charAt(i)); // si es un numero lo concatena
                    arrayTemp.push(numeros);            // lo anade a la cola
                } else {
                    arrayTemp.push((numeros));
                    arrayTemp.push((p.charAt(i)));
                }
            } else {
                arrayTemp.push((p.charAt(i)));  // si no es un numero lo anade a la cola
            }
        }
        (this.infija).cc = arrayTemp;   // crea la cola infija
        (this.infija).backup();         // crea una copia en cp
    };

    this.crearInfija2 = function (p) {
        var arrayTemp = new Array();
        var max = p.length;
        for (var i = 0; i < max; i++) {
            if (this.esLetra(p.charAt(i)) && i !== 0) { // valida si es una letra o si no esta en la primera posicion
                var letra = arrayTemp.pop();
                if (this.esLetra(p.charAt(i))) {            //valida si el ultimo elemento de la cola temporal es una letra
                    var letra = letra + (p.charAt(i)); // si es un letra lo concatena
                    arrayTemp.push(letra);            // lo anade a la cola
                } else {
                    arrayTemp.push((letra));
                    arrayTemp.push((p.charAt(i)));
                }
            } else {
                arrayTemp.push((p.charAt(i)));  // si no es un letra lo anade a la cola
            }
        }
        (this.infija).cc = arrayTemp;   // crea la cola infija
        (this.infija).backup();         // crea una copia en cp
    };

    this.evaluarPrioridad = function (p) {
        if (this.operadores.tam() > 0) {
            var atender = (this.operadores).despachar();
            if ((this.operadores_ejecutar).indexOf(atender) === -1) {
                (this.operadores).adicionar(atender);
                (this.operadores).adicionar(p);
            } else {
                var pesoactual = 0;
                var pesop = 0;

                if (this.prioridad.indexOf(p) >= 0) {
                    pesop = this.prioridad.indexOf(p);
                } else {
                    pesop = this.prioridad2.indexOf(p);
                }
                if (this.prioridad.indexOf(atender) >= 0) {
                    pesoactual = this.prioridad.indexOf(atender);
                } else {
                    pesoactual = this.prioridad2.indexOf(atender);
                }
                if (pesop <= pesoactual) {
                    (this.postfija).adicionar(atender);
                    this.evaluarPrioridad(p);
                    //this.operadores).adicionar(p);					
                } else {
                    (this.operadores).adicionar(atender);
                    (this.operadores).adicionar(p);
                }
            }
        } else {
            (this.operadores).adicionar(p);
        }
    };
    
    this.crearPostfija2 = function () {
        if (this.infija.tam() > 0 || this.operadores.tam() > 0) {
            siguiente = (this.infija).despachar();
            if (this.esLetra(p.charAt(i))) {
                this.postfija.adicionar(siguiente);
            } else {
                if (((this.prioridad).indexOf(siguiente) > 0) ||
                        ((this.prioridad2).indexOf(siguiente) > 0)) {
                    this.evaluarPrioridad(siguiente);
                } else if (siguiente === "(") { // revisar si ingreso un parentesis abierto
                    (this.operadores).adicionar(siguiente);
                } else if (siguiente === ")") {// revisar si ingreso un parentesis cerrado
                    var cerrado = 1;
                    var operadorTemp;
                    while (cerrado) {
                        operadorTemp = (this.operadores).despachar();
                        if (operadorTemp === "(") {
                            cerrado = 0;
                        } else {
                            (this.postfija).adicionar(operadorTemp);
                        }
                    }
                } else {
                    if (this.operadores.tam() > 0) {
                        var temp = (this.operadores).despachar();
                        (this.postfija).adicionar(temp);

                    }
                }
            }
        }
    }
    ;

    this.crearPostfija = function () {
        if (this.infija.tam() > 0 || this.operadores.tam() > 0) {
            siguiente = (this.infija).despachar();
            if (!(isNaN(siguiente))) {
                this.postfija.adicionar(siguiente);
            } else {
                if (((this.prioridad).indexOf(siguiente) > 0) ||
                        ((this.prioridad2).indexOf(siguiente) > 0)) {
                    this.evaluarPrioridad(siguiente);
                } else if (siguiente === "(") { // revisar si ingreso un parentesis abierto
                    (this.operadores).adicionar(siguiente);
                } else if (siguiente === ")") {// revisar si ingreso un parentesis cerrado
                    var cerrado = 1;
                    var operadorTemp;
                    while (cerrado) {
                        operadorTemp = (this.operadores).despachar();
                        if (operadorTemp === "(") {
                            cerrado = 0;
                        } else {
                            (this.postfija).adicionar(operadorTemp);
                        }
                    }
                } else {
                    if (this.operadores.tam() > 0) {
                        var temp = (this.operadores).despachar();
                        (this.postfija).adicionar(temp);

                    }
                }
            }
        }
    }
    ;

    this.operar = function (a, b, c) {
        var resultado = 0;
        operando = (this.operadores_ejecutar).indexOf(c);
        switch (operando) {
            case 0:
                resultado = parseFloat(b);
                break;
            case 1:
                resultado = parseFloat(a) - parseFloat(b);
                break;
            case 2:
                resultado = parseFloat(a) + parseFloat(b);
                //alert (resultado);
                break;
            case 3:
                resultado = parseFloat(a) / parseFloat(b);
                break;
            case 4:
                resultado = parseFloat(a) * parseFloat(b);
                break;
            case 5:
                resultado = Math.pow(parseFloat(a), parseFloat(b));
                break;
        }

        return resultado;
    };

    this.hallarResultado = function () {
        if (this.postfija.tam() > 0) {
            var siguiente = (this.postfija).despachar();
            if (this.operadores_ejecutar.indexOf(siguiente) >= 0) {
                var b = this.expresion.despachar();
                var a = this.expresion.despachar();
                var resultado = this.operar(a, b, siguiente);
                this.expresion.adicionar(resultado);
            } else {
                this.expresion.adicionar(siguiente);
            }
        }
    };
};

//------------------------------------------------------------
//-----------------------  MAIN   ----------------------------
//------------------------------------------------------------

var calculadora = new ALU();
var canvas = document.getElementById("c");
var context = canvas.getContext("2d");
var automatico = 1;
var temporizador = 1;


function generarArbol() {
    var i,
            s,
            N = calculadora.postfija.tamCp(),
            E = calculadora.postfija.tamCp() - 1,
            g = {nodes: [], edges: []};
    // Generate a random graph:
    var x1 = 0, y1 = 300, ar = 0, i = 0, siz = 500;

    while ((calculadora.postfija).tamCp() > 0) {
        var siguiente = calculadora.postfija.despacharCp();
        if (!(isNaN(siguiente))) {
            x1 += 15;
        } else {
            x1 -= 7;
            y1 -= 10;
            g.edges.push({
                id: 'e' + ar,
                source: 'n' + i,
                target: 'n' + (i - 1),
                size: 10,
                color: '#ccc'
            });
            ar++;
            g.edges.push({
                id: 'e' + ar,
                source: 'n' + i,
                target: 'n' + (i - 2),
                size: 10,
                color: '#ccc'});
            ar++;
        }
        g.nodes.push({
            id: 'n' + i,
            label: siguiente,
            x: x1,
            y: y1,
            size: siz,
            color: '#b956af'
        });
        i++;
    }

    // Instantiate sigma:
    s = new sigma({
        graph: g,
        container: 'graph-container'
    });
}
;
function iniciar( ) {
    var operacion = document.getElementById('expresion');
    calculadora.crearInfija(operacion.value);
    start();
}
;