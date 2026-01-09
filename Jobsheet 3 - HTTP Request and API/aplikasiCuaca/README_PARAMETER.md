# Dokumentasi Parameter Weatherstack API

## Unit Parameter

### units=m (Metric) - Default
- Temperature: **Celsius (°C)**
- Wind Speed/Visibility: **Kilometers/Hour (km/h)**
- Pressure: **MB (Millibar)**
- Precip: **MM (Millimeters)**
- Total Snow: **CM (Centimeters)**

**Contoh:**
```javascript
const url = 'http://api.weatherstack.com/current?access_key=YOUR_KEY&query=Padang&units=m'
```

### units=f (Fahrenheit)
- Temperature: **Fahrenheit (°F)**
- Wind Speed/Visibility: **Miles/Hour (mph)**
- Pressure: **MB (Millibar)**
- Precip: **IN (Inches)**
- Total Snow: **IN (Inches)**

**Contoh:**
```javascript
const url = 'http://api.weatherstack.com/current?access_key=YOUR_KEY&query=Padang&units=f'
```

### units=s (Scientific)
- Temperature: **Kelvin (K)**
- Wind Speed/Visibility: **Kilometers/Hour (km/h)**
- Pressure: **MB (Millibar)**
- Precip: **MM (Millimeters)**
- Total Snow: **CM (Centimeters)**

**Contoh:**
```javascript
const url = 'http://api.weatherstack.com/current?access_key=YOUR_KEY&query=Padang&units=s'
```

---

## Language Parameter

Weatherstack mendukung **40 bahasa** dengan ISO code 2 huruf:

### Bahasa Populer:
- `en` = English (Default)
- `id` = **Bahasa Indonesia**
- `ar` = Arabic
- `zh` = Chinese Simplified
- `fr` = French
- `de` = German
- `hi` = Hindi
- `ja` = Japanese
- `ko` = Korean
- `es` = Spanish
- `pt` = Portuguese
- `ru` = Russian
- `tr` = Turkish
- `vi` = Vietnamese

**Contoh dengan Bahasa Indonesia:**
```javascript
const url = 'http://api.weatherstack.com/current?access_key=YOUR_KEY&query=Padang&language=id'
```

---

## Kombinasi Parameter

Anda dapat menggabungkan beberapa parameter:

```javascript
// Fahrenheit + Bahasa Indonesia
const url = 'http://api.weatherstack.com/current?access_key=YOUR_KEY&query=Padang&units=f&language=id'

// Scientific + Bahasa Inggris
const url = 'http://api.weatherstack.com/current?access_key=YOUR_KEY&query=Padang&units=s&language=en'
```

---

## Parameter Lainnya (Opsional)

### callback (JSONP)
Untuk wrapping response dalam JSONP callback function:
```javascript
const url = 'http://api.weatherstack.com/current?access_key=YOUR_KEY&query=Padang&callback=myFunction'
```

---

## Hasil Testing

### Metric (Celsius):
```
Saat ini suhu diluar mencapai 24 derajat celcius. Kemungkinan terjadinya hujan adalah 1.1%
```

### Fahrenheit:
```
Saat ini suhu diluar mencapai 75 derajat Fahrenheit. Kecepatan angin 4 mph. Kemungkinan terjadinya hujan adalah 0.04 inches
```

### Scientific (Kelvin):
```
Suhu: 297 Kelvin
Tekanan: 1014 MB
Kecepatan Angin: 6 km/h
```

### Bahasa Indonesia:
```
Lokasi: Padang, West Sumatra
Suhu: 24°C
Deskripsi: [Deskripsi dalam bahasa Indonesia jika didukung]
Kelembaban: 92%
```

---

## Tips

1. **HTTP vs HTTPS**: Free plan hanya support HTTP. HTTPS memerlukan subscription berbayar.
2. **Rate Limit**: Perhatikan quota bulanan API Anda (cek di dashboard).
3. **Error Handling**: Selalu tambahkan error handling untuk request yang gagal.
4. **Cache**: Pertimbangkan caching untuk mengurangi API calls.

---

## Referensi
- Dokumentasi lengkap: https://weatherstack.com/documentation
- Daftar language codes: https://weatherstack.com/documentation#language_parameter
- API Glossary: https://weatherstack.com/api-glossary
