const fs = require('fs')
const chalk = require('chalk')

const tambahCatatan = (judul, isi) => {
    const catatan = daftarCatatan()
    
    const catatanDuplikat = catatan.find(c => c.judul === judul)
    
    if (!catatanDuplikat) {
        catatan.push({
            judul: judul,
            isi: isi
        })
        
        simpanCatatan(catatan)
        console.log(chalk.green.bold('Catatan berhasil ditambahkan!'))
    } else {
        console.log(chalk.red.bold('Judul catatan sudah ada!'))
    }
}

const hapusCatatan = (judul) => {
    const catatan = daftarCatatan()
    const catatanBaru = catatan.filter(c => c.judul !== judul)
    
    if (catatan.length > catatanBaru.length) {
        simpanCatatan(catatanBaru)
        console.log(chalk.green.bold('Catatan berhasil dihapus!'))
    } else {
        console.log(chalk.red.bold('Catatan tidak ditemukan!'))
    }
}

const listCatatan = () => {
    const catatan = daftarCatatan()
    
    console.log(chalk.bold.blue('\n=== DAFTAR CATATAN ===\n'))
    
    catatan.forEach((c, i) => {
        console.log(chalk.yellow(`${i + 1}. ${c.judul}`))
    })
    
    if (catatan.length === 0) {
        console.log(chalk.red('Belum ada catatan'))
    }
}

const bacaCatatan = (judul) => {
    const catatan = daftarCatatan()
    const catatanDicari = catatan.find(c => c.judul === judul)
    
    if (catatanDicari) {
        console.log(chalk.bold.blue(`\n=== ${catatanDicari.judul} ===\n`))
        console.log(catatanDicari.isi)
    } else {
        console.log(chalk.red.bold('Catatan tidak ditemukan!'))
    }
}

const daftarCatatan = () => {
    try {
        const data = fs.readFileSync('catatan-data.json', 'utf8')
        return JSON.parse(data)
    } catch (e) {
        return []
    }
}

const simpanCatatan = (catatan) => {
    fs.writeFileSync('catatan-data.json', JSON.stringify(catatan, null, 2))
}

module.exports = {
    tambahCatatan,
    hapusCatatan,
    listCatatan,
    bacaCatatan
}
