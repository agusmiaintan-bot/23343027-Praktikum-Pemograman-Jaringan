# 📘 JobSheet 3 - HTTP Request and API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![API](https://img.shields.io/badge/REST_API-02569B?style=for-the-badge&logo=rest&logoColor=white)
![HTTP](https://img.shields.io/badge/HTTP-005571?style=for-the-badge&logo=http&logoColor=white)

**Konsumsi Web API dan HTTP Request**

</div>

---

## 📋 Deskripsi

JobSheet ini mempelajari cara melakukan HTTP request ke external API menggunakan Node.js. Praktikum ini membuat aplikasi cuaca yang mengintegrasikan Weatherstack API untuk mendapatkan informasi cuaca real-time berdasarkan lokasi.

---

## 🎯 Tujuan Pembelajaran

Setelah menyelesaikan jobsheet ini, mahasiswa diharapkan dapat:

- ✅ Memahami konsep REST API dan HTTP request
- ✅ Melakukan HTTP GET request ke external API
- ✅ Menangani response dari API (JSON parsing)
- ✅ Menggunakan async/await untuk asynchronous operations
- ✅ Error handling untuk network requests
- ✅ Bekerja dengan API keys dan authentication
- ✅ Membaca dokumentasi API

---

## 📂 Struktur Folder

```
Jobsheet 3 - HTTP Request and API/
├── aplikasiCuaca/
│   ├── app.js              # Main aplikasi cuaca
│   ├── package.json        # NPM configuration
│   ├── package-lock.json   # Dependency lock file
│   └── node_modules/       # Installed packages
└── README.md
```

---

## 🚀 Cara Menjalankan

### 1. Dapatkan API Key

1. Daftar di [Weatherstack](https://weatherstack.com/)
2. Dapatkan **Free API Key** dari dashboard
3. Simpan API key untuk digunakan di aplikasi

### 2. Install Dependencies

```bash
cd "Jobsheet 3 - HTTP Request and API/aplikasiCuaca"
npm install
```

### 3. Konfigurasi API Key

Edit `app.js` dan ganti `YOUR_API_KEY` dengan API key Anda:

```javascript
const apiKey = 'YOUR_API_KEY_HERE';
```

### 4. Jalankan Aplikasi

```bash
node app.js
```

**Output yang diharapkan:**
```
Cuaca di Padang:
- Temperatur: 28°C
- Deskripsi: Partly cloudy
- Kelembaban: 80%
- Kecepatan Angin: 15 km/h
```

---

## 💻 Penjelasan Code

### `app.js` - Aplikasi Cuaca

```javascript
const axios = require('axios');

// API Configuration
const apiKey = 'YOUR_API_KEY';
const baseURL = 'http://api.weatherstack.com/current';

// Fungsi untuk mendapatkan cuaca
const getCuaca = async (lokasi) => {
    try {
        const url = `${baseURL}?access_key=${apiKey}&query=${lokasi}`;
        const response = await axios.get(url);
        
        const data = response.data;
        
        if (data.error) {
            console.log('Error:', data.error.info);
            return;
        }
        
        // Tampilkan data cuaca
        console.log(`\nCuaca di ${data.location.name}:`);
        console.log(`- Temperatur: ${data.current.temperature}°C`);
        console.log(`- Deskripsi: ${data.current.weather_descriptions[0]}`);
        console.log(`- Kelembaban: ${data.current.humidity}%`);
        console.log(`- Kecepatan Angin: ${data.current.wind_speed} km/h`);
        
    } catch (error) {
        console.log('Terjadi kesalahan:', error.message);
    }
};

// Jalankan fungsi
getCuaca('Padang');
getCuaca('Jakarta');
```

---

## 🔑 Konsep Penting

### 1. **HTTP Request Methods**

| Method | Kegunaan | Contoh |
|--------|----------|--------|
| **GET** | Ambil data | Get weather data |
| **POST** | Kirim data baru | Create user |
| **PUT** | Update data lengkap | Update profile |
| **PATCH** | Update sebagian data | Update email |
| **DELETE** | Hapus data | Delete account |

### 2. **REST API Structure**

```
Base URL: http://api.weatherstack.com/current

Query Parameters:
- access_key: YOUR_API_KEY
- query: Padang
- units: m (metric)

Full URL:
http://api.weatherstack.com/current?access_key=KEY&query=Padang
```

### 3. **Async/Await**

```javascript
// Tanpa async/await (callback hell)
axios.get(url).then(response => {
    console.log(response.data);
}).catch(error => {
    console.log(error);
});

// Dengan async/await (lebih clean)
const getData = async () => {
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
};
```

### 4. **Error Handling**

```javascript
try {
    const response = await axios.get(url);
    
    // Check API-specific errors
    if (response.data.error) {
        throw new Error(response.data.error.info);
    }
    
    // Process data
    console.log(response.data);
    
} catch (error) {
    if (error.response) {
        // Server responded with error status
        console.log('Status:', error.response.status);
    } else if (error.request) {
        // Request made but no response
        console.log('No response received');
    } else {
        // Other errors
        console.log('Error:', error.message);
    }
}
```

---

## 📊 Weatherstack API Response

### Success Response

```json
{
  "request": {
    "type": "City",
    "query": "Padang, Indonesia",
    "language": "en",
    "unit": "m"
  },
  "location": {
    "name": "Padang",
    "country": "Indonesia",
    "region": "Sumatera Barat",
    "lat": "-0.950",
    "lon": "100.350"
  },
  "current": {
    "temperature": 28,
    "weather_descriptions": ["Partly cloudy"],
    "wind_speed": 15,
    "humidity": 80,
    "pressure": 1010,
    "cloudcover": 50,
    "feelslike": 31
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": 101,
    "type": "invalid_access_key",
    "info": "You have not supplied a valid API Access Key."
  }
}
```

---

## 🧪 Eksperimen & Latihan

### Latihan 1: Multiple Locations

Cek cuaca untuk beberapa kota sekaligus:

```javascript
const cities = ['Padang', 'Jakarta', 'Bandung', 'Surabaya', 'Medan'];

const checkMultipleCities = async () => {
    for (const city of cities) {
        await getCuaca(city);
        console.log('-------------------');
    }
};

checkMultipleCities();
```

### Latihan 2: User Input

Terima input dari command line:

```javascript
const lokasi = process.argv[2];

if (!lokasi) {
    console.log('Gunakan: node app.js <nama-kota>');
    console.log('Contoh: node app.js Padang');
    process.exit(1);
}

getCuaca(lokasi);
```

Jalankan:
```bash
node app.js Padang
node app.js Jakarta
```

### Latihan 3: Format Output yang Lebih Baik

```javascript
const displayWeather = (data) => {
    console.log('\n' + '='.repeat(50));
    console.log(`📍 Lokasi: ${data.location.name}, ${data.location.country}`);
    console.log('='.repeat(50));
    console.log(`🌡️  Temperatur: ${data.current.temperature}°C (Terasa ${data.current.feelslike}°C)`);
    console.log(`☁️  Kondisi: ${data.current.weather_descriptions[0]}`);
    console.log(`💧 Kelembaban: ${data.current.humidity}%`);
    console.log(`💨 Angin: ${data.current.wind_speed} km/h`);
    console.log(`🌫️  Awan: ${data.current.cloudcover}%`);
    console.log(`🔽 Tekanan: ${data.current.pressure} mb`);
    console.log('='.repeat(50) + '\n');
};
```

### Latihan 4: Save to File

Simpan hasil ke file JSON:

```javascript
const fs = require('fs');

const saveWeatherData = (data) => {
    const weatherData = {
        location: data.location.name,
        temperature: data.current.temperature,
        description: data.current.weather_descriptions[0],
        timestamp: new Date().toISOString()
    };
    
    fs.writeFileSync('weather-data.json', JSON.stringify(weatherData, null, 2));
    console.log('✅ Data saved to weather-data.json');
};
```

---

## 📦 NPM Packages yang Digunakan

### 1. **Axios** - HTTP Client

```javascript
const axios = require('axios');

// GET request
const response = await axios.get(url);

// POST request
const response = await axios.post(url, data);

// With config
const response = await axios({
    method: 'get',
    url: url,
    headers: { 'Authorization': 'Bearer token' }
});
```

### 2. **Alternatif: node-fetch**

```bash
npm install node-fetch
```

```javascript
const fetch = require('node-fetch');

const response = await fetch(url);
const data = await response.json();
```

---

## 🔐 Best Practices

### 1. **Environment Variables**

Jangan hardcode API key di code:

```bash
npm install dotenv
```

Buat file `.env`:
```
WEATHERSTACK_API_KEY=your_api_key_here
```

Di `app.js`:
```javascript
require('dotenv').config();

const apiKey = process.env.WEATHERSTACK_API_KEY;
```

### 2. **Rate Limiting**

Free tier biasanya ada limit request:

```javascript
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

for (const city of cities) {
    await getCuaca(city);
    await delay(1000);  // Wait 1 second between requests
}
```

### 3. **Caching**

Cache response untuk mengurangi API calls:

```javascript
const cache = {};

const getCuacaWithCache = async (lokasi) => {
    if (cache[lokasi]) {
        console.log('📦 Menggunakan cache untuk', lokasi);
        return cache[lokasi];
    }
    
    const data = await getCuaca(lokasi);
    cache[lokasi] = data;
    return data;
};
```

---

## 🌐 API Gratis Lainnya untuk Dicoba

| API | Kegunaan | URL |
|-----|----------|-----|
| **OpenWeatherMap** | Weather data | https://openweathermap.org/api |
| **JSONPlaceholder** | Fake REST API (testing) | https://jsonplaceholder.typicode.com/ |
| **REST Countries** | Country information | https://restcountries.com/ |
| **The Cat API** | Random cat images | https://thecatapi.com/ |
| **CoinGecko** | Cryptocurrency prices | https://www.coingecko.com/api |

---

## 🐛 Troubleshooting

### Error: Invalid API Key

```
✗ Cek API key sudah benar
✗ Pastikan tidak ada spasi di awal/akhir
✗ Verify di Weatherstack dashboard
```

### Error: Network Error

```javascript
// Add timeout
const response = await axios.get(url, { timeout: 5000 });
```

### Error: 429 Too Many Requests

```
✗ Anda melebihi rate limit
✗ Tunggu beberapa menit
✗ Upgrade plan atau gunakan caching
```

---

## ❓ FAQ

**Q: Kenapa butuh API key?**  
A: API key untuk authentication dan tracking usage. Melindungi API dari abuse.

**Q: Apa perbedaan axios vs fetch?**  
A: Axios auto-parse JSON dan support older Node versions. Fetch adalah native web API.

**Q: Bagaimana handle offline/no internet?**  
A: Gunakan try-catch dan check `error.request` untuk network errors.

---

## 📚 Sumber Belajar

- [Weatherstack API Docs](https://weatherstack.com/documentation)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [REST API Tutorial](https://restfulapi.net/)

---

## ✅ Checklist Pembelajaran

- [ ] Membuat HTTP GET request dengan axios
- [ ] Parse JSON response dari API
- [ ] Handle error dengan try-catch
- [ ] Menggunakan async/await
- [ ] Membaca API documentation
- [ ] Menambahkan API key authentication
- [ ] Handle multiple requests
- [ ] Implement basic caching
- [ ] Format output dengan baik

---

<div align="center">

**🎓 Mahasiswa:** Agusmia Intan Sari  
**🆔 NIM:** 23343027  
**🏫 Universitas Negeri Padang**

---

⬅️ [JobSheet 2 - Module System](../Jobsheet%202%20-%20Node.js%20Module%20System/README.md) | [Root README](../README.md) | ➡️ [JobSheet 5 - Web Server](../Jobsheet%205%20-%20Basic%20Web%20Server/README.md)

</div>
