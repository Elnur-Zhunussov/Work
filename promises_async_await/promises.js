const axiosRequest = require('axios');

axiosRequest
    .get('https://boredapi.com/api/activity')
    .then(response => {
        console.log(`You could ${response.data.activity}`)
    })
    .catch(error => {
        console.error(`ERROR! ${error}`)
    })

console.log('Why am I here?')