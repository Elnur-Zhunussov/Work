'use strict'

function Accumulator(startingValue) {
    this.value = startingValue;
    this.read = () => {
        return this.value += startingValue;
    }
}

let accumulator = new Accumulator(15);

console.log(accumulator.read());
console.log(accumulator.read());
console.log(accumulator.read());