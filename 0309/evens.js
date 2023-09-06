'use strict'

let n = prompt("Введите чётное число");

for (let i = n; i <= 10; i++) {
    if (i % 2 === 0) {
        alert(i);
    }
}