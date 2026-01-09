const express = require('express')
const path = require('path')
const hbs = require('hbs')
const fs = require('fs')

const app = express()
const direktoriPublic = path.join(__dirname, '../public')
const direktoriViews = path.join(__dirname, '../templates/views')
const direktoriPartials = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', direktoriViews)
hbs.registerPartials(direktoriPartials)
// Register critical partials synchronously to avoid race on first request
try {
    const headerPartial = fs.readFileSync(path.join(direktoriPartials, 'header.hbs'), 'utf8')
    const footerPartial = fs.readFileSync(path.join(direktoriPartials, 'footer.hbs'), 'utf8')
    const headPartial = fs.readFileSync(path.join(direktoriPartials, 'head.hbs'), 'utf8')
    hbs.registerPartial('header', headerPartial)
    hbs.registerPartial('footer', footerPartial)
    hbs.registerPartial('head', headPartial)
} catch (e) {
    console.error('Gagal mendaftarkan partials:', e)
}
app.use(express.static(direktoriPublic, { index: false }))

// Ini halaman/page utama
app.get('', (req, res) => {
    res.render('index', {
        judul: 'Aplikasi Cek Cuaca',
        nama: 'Agusmia Intan Sari'
    })
})

// Ini halaman bantuan/FAQ (Frequently Asked Questions)
app.get('/bantuan', (req, res) => {
    res.render('bantuan', {
        judul: 'Bantuan',
        teksBantuan: 'Ini adalah teks bantuan',
        nama: 'Agusmia Intan Sari'
    })
})

// Halaman Info Cuaca
app.get('/infoCuaca', (req, res) => {
    res.send([{
        prediksiCuaca: 'Cuaca berpotensi hujan',
        lokasi: 'Padang'
    }])
})

// Halaman Tentang
app.get('/tentang', (req, res) => {
    res.render('tentang', {
        judul: 'Tentang Saya',
        nama: 'Agusmia Intan Sari'
    })
})

// 404 khusus untuk rute bantuan (artikel tidak ditemukan)
app.get('/bantuan/*', (req, res) => {
    res.render('404', {
        judul: '404',
        nama: 'Randi Proska Sandra',
        pesanKesalahan: 'Artikel yang dicari tidak ditemukan.'
    })
})

// 404 umum untuk semua rute yang tidak cocok
app.get('*', (req, res) => {
    res.render('404', {
        judul: '404',
        nama: 'Randi Proska Sandra',
        pesanKesalahan: 'Halaman tidak ditemukan.'
    })
})

app.listen(4000, () => {
    console.log('Server berjalan pada port 4000.')
})
