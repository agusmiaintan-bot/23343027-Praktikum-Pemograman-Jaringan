# 📘 JobSheet 2 - Node.js Module System

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![JSON](https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white)

**Sistem Modularisasi dan NPM Package Management**

</div>

---

## 📋 Deskripsi

JobSheet ini mempelajari sistem modularisasi di Node.js menggunakan CommonJS (`require` dan `module.exports`), serta pengenalan NPM (Node Package Manager) untuk mengelola dependencies. Praktikum ini membuat aplikasi buku catatan sederhana dengan file I/O.

---

## 🎯 Tujuan Pembelajaran

Setelah menyelesaikan jobsheet ini, mahasiswa diharapkan dapat:

- ✅ Memahami konsep modularisasi di Node.js
- ✅ Menggunakan `require()` dan `module.exports`
- ✅ Membuat custom module sendiri
- ✅ Menggunakan built-in modules (fs, path)
- ✅ Mengelola package dengan NPM
- ✅ Membaca dan menulis file JSON
- ✅ Memahami struktur `package.json`

---

## 📂 Struktur Folder

```
Jobsheet 2 - Node.js Module System/
├── buku-catatan/
│   ├── app.js                    # Entry point aplikasi
│   ├── catatan.js                # Custom module untuk CRUD catatan
│   ├── catatan-data.json         # File penyimpanan data
│   ├── catatan.txt               # Output text file
│   ├── package.json              # NPM configuration
│   └── testsite/
│       ├── 1-jsontest.js         # Testing JSON operations
│       └── 1-jsontest.json       # Sample JSON data
└── README.md
```

---

## 🚀 Cara Menjalankan

### 1. Install Dependencies

```bash
cd "Jobsheet 2 - Node.js Module System/buku-catatan"
npm install
```

### 2. Jalankan Aplikasi

```bash
node app.js
```

### 3. Test JSON Operations

```bash
cd testsite
node 1-jsontest.js
```

---

## 💻 Penjelasan Code

### `app.js` - Entry Point

```javascript
const catatan = require('./catatan.js');

// Tambah catatan baru
catatan.tambahCatatan('Belajar Node.js', 'Module System sangat penting');

// Ambil semua catatan
const semuaCatatan = catatan.ambilSemuaCatatan();
console.log('Semua Catatan:', semuaCatatan);
```

**Penjelasan:**
- `require('./catatan.js')` - Import custom module
- Module `catatan` berisi fungsi-fungsi untuk CRUD catatan
- Data disimpan dalam file JSON

### `catatan.js` - Custom Module

```javascript
const fs = require('fs');

// Fungsi untuk tambah catatan
const tambahCatatan = (judul, isi) => {
    const catatan = ambilSemuaCatatan();
    const catatanBaru = {
        judul: judul,
        isi: isi
    };
    catatan.push(catatanBaru);
    simpanCatatan(catatan);
};

// Fungsi helper
const simpanCatatan = (catatan) => {
    const dataJSON = JSON.stringify(catatan);
    fs.writeFileSync('catatan-data.json', dataJSON);
};

const ambilSemuaCatatan = () => {
    try {
        const dataBuffer = fs.readFileSync('catatan-data.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

// Export fungsi agar bisa digunakan module lain
module.exports = {
    tambahCatatan: tambahCatatan,
    ambilSemuaCatatan: ambilSemuaCatatan
};
```

**Fitur Module:**
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ File System operations dengan `fs`
- ✅ JSON parsing dan stringifying
- ✅ Error handling dengan try-catch

---

## 🔑 Konsep Penting

### 1. **CommonJS Module System**

```javascript
// Export (catatan.js)
module.exports = {
    fungsi1: fungsi1,
    fungsi2: fungsi2
};

// Import (app.js)
const catatan = require('./catatan.js');
```

### 2. **Built-in Modules**

Node.js menyediakan banyak built-in modules:

```javascript
const fs = require('fs');           // File System
const path = require('path');       // Path utilities
const http = require('http');       // HTTP server
const os = require('os');           // Operating System info
```

### 3. **File System Operations**

```javascript
// Synchronous (blocking)
fs.writeFileSync('file.txt', 'content');
const data = fs.readFileSync('file.txt', 'utf8');

// Asynchronous (non-blocking)
fs.writeFile('file.txt', 'content', (err) => {
    if (err) throw err;
});
```

### 4. **JSON Operations**

```javascript
// Object to JSON string
const jsonString = JSON.stringify(object);

// JSON string to Object
const object = JSON.parse(jsonString);
```

### 5. **package.json**

```json
{
  "name": "buku-catatan",
  "version": "1.0.0",
  "description": "Aplikasi catatan sederhana",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "validator": "^13.7.0"
  }
}
```

---

## 📝 Fitur Aplikasi Buku Catatan

### Operasi CRUD

| Operasi | Fungsi | Deskripsi |
|---------|--------|-----------|
| **Create** | `tambahCatatan(judul, isi)` | Menambah catatan baru |
| **Read** | `ambilSemuaCatatan()` | Mengambil semua catatan |
| **Read One** | `ambilCatatan(judul)` | Mengambil satu catatan |
| **Delete** | `hapusCatatan(judul)` | Menghapus catatan |

### Data Structure

```json
[
  {
    "judul": "Belajar Node.js",
    "isi": "Module System sangat penting untuk organizing code"
  },
  {
    "judul": "NPM",
    "isi": "Node Package Manager untuk install dependencies"
  }
]
```

---

## 🧪 Eksperimen & Latihan

### Latihan 1: Tambah Fungsi Edit Catatan

Tambahkan fungsi di `catatan.js`:

```javascript
const editCatatan = (judul, isiBaru) => {
    const catatan = ambilSemuaCatatan();
    const index = catatan.findIndex(c => c.judul === judul);
    
    if (index !== -1) {
        catatan[index].isi = isiBaru;
        simpanCatatan(catatan);
        console.log('Catatan berhasil diedit!');
    } else {
        console.log('Catatan tidak ditemukan');
    }
};

module.exports = {
    tambahCatatan,
    ambilSemuaCatatan,
    editCatatan  // Export fungsi baru
};
```

### Latihan 2: Tambah Timestamp

Modifikasi struktur data dengan timestamp:

```javascript
const tambahCatatan = (judul, isi) => {
    const catatan = ambilSemuaCatatan();
    const catatanBaru = {
        judul: judul,
        isi: isi,
        createdAt: new Date().toISOString()  // Tambah timestamp
    };
    catatan.push(catatanBaru);
    simpanCatatan(catatan);
};
```

### Latihan 3: Filter Catatan

```javascript
const cariCatatan = (keyword) => {
    const catatan = ambilSemuaCatatan();
    return catatan.filter(c => 
        c.judul.toLowerCase().includes(keyword.toLowerCase()) ||
        c.isi.toLowerCase().includes(keyword.toLowerCase())
    );
};
```

---

## 🔧 NPM Commands

### Basic Commands

```bash
# Initialize new project
npm init
npm init -y  # Skip questions

# Install package
npm install package-name
npm install package-name@version

# Install as dev dependency
npm install --save-dev package-name

# Install globally
npm install -g package-name

# Update packages
npm update

# Remove package
npm uninstall package-name
```

### Useful Scripts in package.json

```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "test": "node testsite/1-jsontest.js"
  }
}
```

Run with:
```bash
npm start
npm run dev
npm test
```

---

## 📦 Popular NPM Packages

| Package | Kegunaan |
|---------|----------|
| `validator` | Validasi string (email, URL, dll) |
| `chalk` | Colorize terminal output |
| `nodemon` | Auto-restart on file changes |
| `dotenv` | Load environment variables |
| `lodash` | Utility functions |

---

## 🐛 Troubleshooting

### Error: Cannot find module

```bash
# Pastikan module di-install
npm install

# Atau install package tertentu
npm install package-name
```

### Error: ENOENT (File not found)

```javascript
// Gunakan try-catch untuk handle file yang belum ada
try {
    const data = fs.readFileSync('file.json');
} catch (e) {
    // Return default value jika file belum ada
    return [];
}
```

### Module Exports tidak terdefinisi

```javascript
// Pastikan export benar
module.exports = {
    fungsi1,
    fungsi2
};

// Bukan:
exports = { fungsi1, fungsi2 };  // ❌ Salah
```

---

## ❓ FAQ

**Q: Apa perbedaan `require` vs `import`?**  
A: `require` adalah CommonJS (Node.js default), `import` adalah ES6 modules. Node.js sekarang support keduanya, tapi CommonJS masih lebih umum.

**Q: Kenapa pakai `module.exports` bukan `export`?**  
A: `module.exports` adalah CommonJS syntax. Untuk ES6 modules, gunakan `export`.

**Q: Apa bedanya `dependencies` vs `devDependencies`?**  
A: `dependencies` untuk production, `devDependencies` hanya untuk development (testing, build tools).

---

## 📚 Sumber Belajar

- [Node.js Modules Documentation](https://nodejs.org/api/modules.html)
- [NPM Official Docs](https://docs.npmjs.com/)
- [File System Module](https://nodejs.org/api/fs.html)
- [CommonJS vs ES Modules](https://nodejs.org/api/esm.html)

---

## ✅ Checklist Pembelajaran

- [ ] Membuat custom module dengan `module.exports`
- [ ] Menggunakan `require()` untuk import module
- [ ] Menggunakan File System (`fs`) untuk baca/tulis file
- [ ] Parsing dan stringify JSON
- [ ] Membuat `package.json`
- [ ] Install dan menggunakan NPM packages
- [ ] Implementasi CRUD operations
- [ ] Error handling dengan try-catch

---

<div align="center">

**🎓 Mahasiswa:** Agusmia Intan Sari  
**🆔 NIM:** 23343027  
**🏫 Universitas Negeri Padang**

---

⬅️ [JobSheet 1 - Pengantar](../Jobsheet%201%20-%20Pengantar%20NodeJs/README.md) | [Root README](../README.md) | ➡️ [JobSheet 3 - HTTP Request](../Jobsheet%203%20-%20HTTP%20Request%20and%20API/README.md)

</div>
