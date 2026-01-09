// ==================================================
// PRAKTIKUM 1
// Menggunakan core module fs (File System)
// ==================================================

// const fs = require('fs')

// Menulis file (akan menimpa isi file)
// fs.writeFileSync('catatan.txt', 'Nama Saya Agusmia Intan Sari')

// Menambahkan isi file
// (digunakan setelah writeFileSync dikomentari)
// fs.appendFileSync('catatan.txt', ' Saya tinggal di Payakumbuh\n')


// ==================================================
// PRAKTIKUM 2
// Menggunakan module lokal (catatan.js)
// ==================================================

// const ambilCatatan = require('./catatan.js')
// const pesan = ambilCatatan()
// console.log(pesan)


// ==================================================
// PRAKTIKUM 3
// Menggunakan package npm: validator
// ==================================================

// const validator = require('validator')

// console.log('URL valid?',
//   validator.isURL('https://proska.com')
// )


// ==================================================
// PRAKTIKUM 4
// Menggunakan package npm: chalk
// ==================================================

// const chalk = require('chalk')

// console.log(chalk.blue('print warna biru sukses'))
// console.log(chalk.green.bold('teks hijau tebal'))
// console.log(chalk.red.underline('teks merah garis bawah'))


// ==================================================
// PRAKTIKUM 5
// Menggunakan nodemon
// (tidak ada kode khusus, hanya cara menjalankan)
// nodemon app.js
// ==================================================


// ==================================================
// PRAKTIKUM 6
// Menggunakan process.argv (argument terminal)
// ==================================================

// const command = process.argv[2]
// console.log(process.argv)

// if (command === 'tambah') {
//   console.log('Tambah Catatan')
// } else if (command === 'hapus') {
//   console.log('Hapus Catatan')
// }


// ==================================================
// PRAKTIKUM 7
// Menggunakan package yargs (argument parsing)
// ==================================================

// const yargs = require('yargs')

// // Kustom versi yargs
// yargs.version('10.1.0')

// // Command: tambah
// yargs.command({
//   command: 'tambah',
//   describe: 'tambah sebuah catatan baru',
//   builder: {
//     judul: {
//       describe: 'Judul catatan',
//       demandOption: true,
//       type: 'string'
//     },
//     isi: {
//       describe: 'Isi catatan',
//       demandOption: true,
//       type: 'string'
//     }
//   },
//   handler: function (argv) {
//     console.log('Judul: ' + argv.judul)
//     console.log('Isi: ' + argv.isi)
//   }
// })

// // Command: hapus
// yargs.command({
//   command: 'hapus',
//   describe: 'hapus catatan',
//   handler: function () {
//     console.log('Catatan berhasil dihapus')
//   }
// })

// // Command: list
// yargs.command({
//   command: 'list',
//   describe: 'menampilkan semua catatan',
//   handler: function () {
//     console.log('Menampilkan semua catatan')
//   }
// })

// // Command: read
// yargs.command({
//   command: 'read',
//   describe: 'membaca satu catatan',
//   handler: function () {
//     console.log('Membaca satu catatan')
//   }
// })

// // Parsing yargs
// yargs.parse()

// ==================================================
const yargs = require('yargs')
const catatan = require('./catatan.js')

// Versi aplikasi
yargs.version('1.0.0')

// ====================
// TAMBAH
// ====================
yargs.command({
    command: 'tambah',
    describe: 'Menambahkan catatan baru',
    builder: {
        judul: {
            describe: 'Judul catatan',
            demandOption: true,
            type: 'string'
        },
        isi: {
            describe: 'Isi catatan',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        catatan.tambahCatatan(argv.judul, argv.isi)
    }
})

// ====================
// HAPUS
// ====================
yargs.command({
    command: 'hapus',
    describe: 'Menghapus catatan',
    builder: {
        judul: {
            describe: 'Judul catatan',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        catatan.hapusCatatan(argv.judul)
    }
})

// ====================
// LIST
// ====================
yargs.command({
    command: 'list',
    describe: 'Menampilkan semua catatan',
    handler() {
        catatan.listCatatan()
    }
})

// ====================
// BACA
// ====================
yargs.command({
    command: 'baca',
    describe: 'Membaca catatan',
    builder: {
        judul: {
            describe: 'Judul catatan',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        catatan.bacaCatatan(argv.judul)
    }
})

yargs.parse()
