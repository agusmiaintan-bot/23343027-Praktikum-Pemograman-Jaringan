const request = require('postman-request')

// units=f untuk Fahrenheit (Fahrenheit, miles/hour, inches)
const urlCuaca = 'http://api.weatherstack.com/current?access_key=6cbbb56de466a7d9d954991d98f168ff&query=-0.8968868789118444,100.35023579407112&units=f'

request({ url: urlCuaca, json: true }, (error, response) => {
    console.log('=== Cuaca dalam Satuan Fahrenheit ===')
    console.log('Suhu: ' + response.body.current.temperature + '°F')
    console.log('Deskripsi: ' + response.body.current.weather_descriptions[0])
    console.log('Kecepatan Angin: ' + response.body.current.wind_speed + ' mph')
    console.log('Precip: ' + response.body.current.precip + ' inches')
    console.log('Feels Like: ' + response.body.current.feelslike + '°F')
})
