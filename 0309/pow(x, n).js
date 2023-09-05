
'use strict'

let x = prompt("Введите число");
let n = prompt("Введите степень");
function pow(x, n) {
    return x ** n;
}
if (n >= 1 && n % 1 == 0) {
    alert(pow(x, n));
} else {
    alert("Степень не поддерживается")
}