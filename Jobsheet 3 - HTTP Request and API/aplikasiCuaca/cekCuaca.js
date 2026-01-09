const request = require('postman-request')

// Tambahkan parameter units=m (Metric: Celsius, km/h)
const urlCuaca = 'http://api.weatherstack.com/current?access_key=6cbbb56de466a7d9d954991d98f168ff&query=-0.8968868789118444,100.35023579407112&units=m'

request({ url: urlCuaca, json: true }, (error, response) => {
    // Tambah akses ke weather_descriptions (format array, gunakan [0])
    console.log('=== Informasi Cuaca Saat Ini ===')
    console.log('Lokasi: ' + response.body.location.name + ', ' + response.body.location.region)
    console.log('Suhu: ' + response.body.current.temperature + '°C')
    console.log('Deskripsi Cuaca: ' + response.body.current.weather_descriptions[0])
    console.log('Kelembaban: ' + response.body.current.humidity + '%')
    console.log('Kecepatan Angin: ' + response.body.current.wind_speed + ' km/h')
    console.log('Kemungkinan Hujan: ' + response.body.current.precip + ' mm')
    console.log('Tekanan: ' + response.body.current.pressure + ' MB')
    console.log('Tutupan Awan: ' + response.body.current.cloudcover + '%')
    console.log('Visibility: ' + response.body.current.visibility + ' km')
})
