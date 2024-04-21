function toggleInputs(card) {
    var allCards = document.querySelectorAll('.card');
    allCards.forEach(function (card) {
        card.querySelector('.inputs').classList.add('hidden');
    });
    card.querySelector('.inputs').classList.toggle('hidden');
}

function stopPropagation(event) {
    event.stopPropagation();
}

function isDoubleBasePalindrome(t) {
    function isPalindrome(num) {
        var reversed = num.toString().split('').reverse().join('');
        return num.toString() === reversed;
    }

    return isPalindrome(t) && isPalindrome(parseInt(t, 2));
}

function countCharactersInString(t) {
    var charCount = {};
    for (var i = 0; i < t.length; i++) {
        var char = t[i];
        charCount[char] = (charCount[char] || 0) + 1;
    }
    return charCount;
}

function isLeapYear(a) {
    if ((a % 4 === 0 && a % 100 !== 0) || a % 400 === 0) {
        return { success: ' es año bisiesto ', year: a }
    } else {
        return { error: ' no es año bisiesto ', year: a }
    }
}

function sumPrimes(n) {
    function isPrime(num) {
        if (num <= 1) return false;
        if (num <= 3) return true;

        if (num % 2 === 0 || num % 3 === 0) return false;

        var i = 5;
        while (i * i <= num) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
            i += 6;
        }

        return true;
    }

    var sum = 0;
    for (var i = 2; i < n; i++) {
        if (isPrime(i)) {
            sum += i;
        }
    }
    return { success: 'La suma de los numeros primos por debajo de el es ' + sum, error: 'No se encontraron números primos' };
}

function checkPalindrome() {
    var inputPalindrome = document.getElementById("inputPalindrome").value;
    var result = isDoubleBasePalindrome(parseInt(inputPalindrome));
    document.getElementById("resultado").innerHTML = "Es palíndromo de doble base: " + result;
}

function countCharacters() {
    var inputString = document.getElementById("inputString").value;
    var result = countCharactersInString(inputString);
    document.getElementById("resultado").innerHTML = "Cantidad de caracteres: " + JSON.stringify(result);
}

function checkLeapYear() {
    var inputYear = document.getElementById("inputYear").value;
    var result = isLeapYear(parseInt(inputYear));
    document.getElementById("resultado").innerHTML = "El año introducido es " + result.year + (result.success || result.error);
}

function calculateSumPrimes() {
    var inputNumber = document.getElementById("inputNumber").value;
    var result = sumPrimes(parseInt(inputNumber));
    document.getElementById("resultado").innerHTML = result.success || result.error;
}
