const request = require('postman-request')

// units=s untuk Scientific (Kelvin, km/h)
const urlCuaca = 'http://api.weatherstack.com/current?access_key=6cbbb56de466a7d9d954991d98f168ff&query=-0.8968868789118444,100.35023579407112&units=s'

request({ url: urlCuaca, json: true }, (error, response) => {
    console.log('=== Data Cuaca (Scientific Units) ===')
    console.log('Suhu: ' + response.body.current.temperature + ' Kelvin')
    console.log('Deskripsi: ' + response.body.current.weather_descriptions[0])
    console.log('Tekanan: ' + response.body.current.pressure + ' MB')
    console.log('Kecepatan Angin: ' + response.body.current.wind_speed + ' km/h')
    console.log('Visibility: ' + response.body.current.visibility + ' km')
})
