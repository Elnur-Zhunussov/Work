'use strict'

function Accumulator(startingValue) {
    this.startingValue = startingValue;
    this.read = () => {
        return this += startingValue;
    }
}
let accumulator = new Accumulator(1);