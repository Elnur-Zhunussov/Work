'use strict'

let calculator = {
    read() {
        this.a = +prompt('1st number', 0);
        this.b = +prompt('2nd number', 0);
    },
    sum() {
        return this.a + this.b;
    },

    mul() {
        return this.a * this.b;
    }
}

calculator.read();
calculator.sum();
calculator.mul();

alert( calculator.sum() )
alert( calculator.mul() )