
const calcularSuma = (numero) => {
    let suma = 0;
    for (let i = 1; i < numero; i++) {
        if (i % 3 === 0 || i % 5 === 0) {
            suma += i;
        }
    }
    return suma;
}
const Operacion = () => {
    const numero = document.getElementById('num_input').value
    console.log('numero ingresado por el usuario', numero)
    const resultado = calcularSuma(numero)
    document.getElementById('result').innerHTML = "La suma de los múltiplos de 3 o 5 menores que " + numero + " es: " + resultado;
}

var numero1 = 10;
var numero2 = 20;

var suma = numero1 + numero2;
var resta = numero1 - numero2
var multiplicacion = numero1 * numero2
var division = numero1 / numero2

console.log("La suma de los numeros es: " + suma);
console.log("La resta de los numeros es: " + resta);
console.log("La multiplicacion de los numeros es: " + multiplicacion);
console.log("La division de los numeros es: " + division);

let title = "Hola Mundo";
let name = "Soy Adan";

console.log(title + " " + name);

const valor1 = 10;
const valor2 = '10'
console.log('constante 1', typeof (valor1))
console.log('constante 2', typeof (valor2))

const autos = {
    1: {
        marca: 'Toyota',
        vendido: false,
        colores: {}
    },
    2: {
        marca: 'Nissan',
        vendido: true,
        colores: {}
    },
    3: {
        marca: 'Mazda',
        vendido: false,
        colores: {}
    },
    4: {
        marca: 'maserati',
        vendido: false,
        colores: {}
    }
};


console.log(autos)