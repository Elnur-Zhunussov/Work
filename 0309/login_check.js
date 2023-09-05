'use strict';
let username = prompt('Введите свой логин');

if (username === "Админ") {
    let password = prompt("Введите свой пароль");
    if (password === "Я главный") {
        alert("Здравствуйте!");
    } else if (password === "" || password === null) {
        alert("Отменено");
    } else {
        alert("Неверный пароль")
    }
} else if (username === "" || username === null) {
    alert("Отменено")
} else {
    alert("Я вас не знаю")
}