const request = require('postman-request')

// CATATAN: Parameter language memerlukan subscription berbayar
// Free plan tidak support language parameter
// Gunakan hanya units=m (Metric)
const urlCuaca = 'http://api.weatherstack.com/current?access_key=6cbbb56de466a7d9d954991d98f168ff&query=-0.8968868789118444,100.35023579407112&units=m'

request({ url: urlCuaca, json: true }, (error, response) => {
    // Error handling untuk request yang gagal
    if (error) {
        console.log('Error Request: ' + error.message)
        return
    }
    
    // Cek apakah response.body ada
    if (!response.body) {
        console.log('Error: No response body')
        console.log('Status Code: ' + response.statusCode)
        return
    }
    
    // Cek apakah ada error dari API
    if (response.body.error) {
        console.log('API Error: ' + response.body.error.type)
        console.log('Info: ' + response.body.error.info)
        return
    }
    
    // Cek apakah location dan current ada
    if (!response.body.location || !response.body.current) {
        console.log('Error: Invalid response structure')
        console.log('Response: ' + JSON.stringify(response.body, null, 2))
        return
    }
    
    console.log('=== INFORMASI CUACA PADANG ===')
    console.log('')
    console.log('LOKASI:')
    console.log('  • Kota: ' + response.body.location.name)
    console.log('  • Provinsi: ' + response.body.location.region)
    console.log('  • Negara: ' + response.body.location.country)
    console.log('  • Koordinat: Lat ' + response.body.location.lat + ', Lon ' + response.body.location.lon)
    console.log('')
    console.log('KONDISI CUACA SAAT INI:')
    console.log('  • Suhu: ' + response.body.current.temperature + '°C (Terasa seperti ' + response.body.current.feelslike + '°C)')
    console.log('  • Deskripsi: ' + response.body.current.weather_descriptions[0])
    console.log('  • Kelembaban: ' + response.body.current.humidity + '%')
    console.log('')
    console.log('DATA ANGIN:')
    console.log('  • Kecepatan: ' + response.body.current.wind_speed + ' km/h')
    console.log('  • Arah: ' + response.body.current.wind_dir + ' (Derajat: ' + response.body.current.wind_degree + '°)')
    console.log('')
    console.log('DATA CURAH HUJAN:')
    console.log('  • Presipitasi: ' + response.body.current.precip + ' mm')
    console.log('')
    console.log('DATA TEKANAN & VISIBILITY:')
    console.log('  • Tekanan Udara: ' + response.body.current.pressure + ' MB')
    console.log('  • Jarak Pandang: ' + response.body.current.visibility + ' km')
    console.log('  • Tutupan Awan: ' + response.body.current.cloudcover + '%')
    console.log('')
})
