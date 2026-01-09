// ==================================================
// PRAKTIKUM 8
// JSON: Write & Read file JSON
// ==================================================

const fs = require('fs')

// ----- MENULIS FILE JSON -----
const buku = {
judul: 'Pemrograman Jaringan',
penulis: 'Randi Proska Sandra'
}

const bookJSON = JSON.stringify(buku)
fs.writeFileSync('1-jsontest.json', bookJSON)


// ----- MEMBACA FILE JSON -----

const dataBuffer = fs.readFileSync('1-jsontest.json')
const dataJSON = dataBuffer.toString()
const data = JSON.parse(dataJSON)

// Menampilkan seluruh object
console.log(data)

// Menampilkan salah satu properti
console.log(data.judul)
