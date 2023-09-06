function findAverage(array) {
    if (array.length == 0) {
        return 0;
    } else {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += parseInt(array[i], 10);
        }

        let average = sum / array.length;
        return average
    }
}