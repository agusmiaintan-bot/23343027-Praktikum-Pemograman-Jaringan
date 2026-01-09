const request = require('postman-request')
const url = 'http://api.weatherstack.com/current?access_key=6cbbb56de466a7d9d954991d98f168ff&query=-0.8968868789118444,%20100.35023579407112'

request({ url: url }, (error, response) => {
    // console.log(response)
    const data = JSON.parse(response.body)
    // console.log(data)
    // console.log(data.current)
    console.log(data.current.temperature)
})