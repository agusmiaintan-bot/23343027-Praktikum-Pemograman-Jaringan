<div align="center">

# 🌐 Praktikum Pemrograman Jaringan
### Repository Tugas Praktikum - Universitas Negeri Padang

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express)](https://expressjs.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Handlebars](https://img.shields.io/badge/Handlebars.js-f0772b?style=for-the-badge&logo=handlebarsdotjs&logoColor=black)](https://handlebarsjs.com/)

</div>

---

## 👩‍🎓 Biodata Mahasiswa

<table>
<tr>
<td width="200px" align="center">
<img src="https://avatars.githubusercontent.com/u/1?v=4" width="150px" style="border-radius: 50%;" alt="Profile Picture"/>
</td>
<td>

| 📋 Detail | 📝 Informasi |
|-----------|--------------|
| **👤 Nama** | Agusmia Intan Sari |
| **🎓 NIM** | 23343027 |
| **📚 Program Studi** | Informatika |
| **🏛️ Fakultas** | Fakultas Teknik |
| **🏫 Universitas** | Universitas Negeri Padang |
| **💡 Bidang Minat** | Pemrograman, Pengembangan Aplikasi, dan Teknologi Jaringan |
| **📧 Email** | agusmia.intan@student.unp.ac.id |

</td>
</tr>
</table>

---

## ✨ Tentang Saya

```javascript
const mahasiswa = {
    nama: "Agusmia Intan Sari",
    nim: "23343027",
    prodi: "Informatika",
    universitas: "Universitas Negeri Padang",
    minat: [
        "🚀 Pengembangan Aplikasi Web",
        "💻 Pemrograman JavaScript & Node.js",
        "🌐 Teknologi Jaringan Komputer",
        "📊 Pengelolaan Data dan API"
    ],
    sedangBelajar: [
        "Node.js Runtime Environment",
        "Express.js Framework",
        "RESTful API Development",
        "Template Engine (Handlebars)",
        "HTTP Request & Response Handling"
    ]
};
```

> *Mahasiswa Informatika Universitas Negeri Padang yang sedang mempelajari Pemrograman Berbasis Jaringan menggunakan Node.js. Memiliki ketertarikan pada pengembangan aplikasi berbasis JavaScript, pengelolaan data, serta pemanfaatan teknologi jaringan untuk membangun aplikasi yang efisien dan terstruktur.*

---

## 📚 Daftar JobSheet Praktikum

<details open>
<summary><b>📖 Klik untuk melihat semua JobSheet</b></summary>

### 🟢 JobSheet 1 - Pengantar Node.js
**Topik:** Pengenalan Node.js dan Dasar-dasar JavaScript Runtime

**Materi:**
- ✅ Instalasi Node.js
- ✅ Menjalankan JavaScript di luar browser
- ✅ Node.js REPL (Read-Eval-Print Loop)
- ✅ Membuat program "Hello World"
- ✅ Memahami konsep non-blocking I/O

**File Utama:**
```
Jobsheet 1 - Pengantar NodeJs/
├── testground/
│   ├── hello-world.js
│   └── hello.js
```

**💡 Highlight:**
- Eksperimen pertama dengan Node.js runtime
- Memahami perbedaan JavaScript di browser vs Node.js

---

### 🟢 JobSheet 2 - Node.js Module System
**Topik:** Sistem Modularisasi dan NPM Package Management

**Materi:**
- ✅ CommonJS Module System (`require` dan `module.exports`)
- ✅ Membuat custom module
- ✅ File System (`fs`) operations
- ✅ NPM (Node Package Manager)
- ✅ Package.json configuration
- ✅ Membaca dan menulis file JSON

**File Utama:**
```
Jobsheet 2 - Node.js Module System/
├── buku-catatan/
│   ├── app.js                  # Entry point aplikasi
│   ├── catatan.js              # Custom module untuk catatan
│   ├── catatan-data.json       # Data storage
│   ├── package.json
│   └── testsite/
│       ├── 1-jsontest.js
│       └── 1-jsontest.json
```

**💡 Highlight:**
- Aplikasi buku catatan sederhana dengan file I/O
- Praktik export/import module
- Manipulasi data JSON

---

### 🟢 JobSheet 3 - HTTP Request and API
**Topik:** Konsumsi Web API dan HTTP Request

**Materi:**
- ✅ HTTP Request menggunakan Node.js
- ✅ Bekerja dengan REST API eksternal
- ✅ Weatherstack API integration
- ✅ Async/await dan Promise handling
- ✅ Environment variables
- ✅ Error handling untuk network request

**File Utama:**
```
Jobsheet 3 - HTTP Request and API/
├── aplikasiCuaca/
│   ├── app.js                  # Main aplikasi cuaca
│   ├── package.json
│   └── node_modules/
```

**💡 Highlight:**
- Integrasi dengan Weatherstack API
- Fetch data cuaca real-time
- Handling API response dan error

**🔧 API yang Digunakan:**
- [Weatherstack API](https://weatherstack.com/) - Mendapatkan data cuaca

---

### 🟢 JobSheet 5 - Basic Web Server
**Topik:** Membangun Web Server dengan Express.js dan Template Engine

**Materi:**
- ✅ Express.js framework
- ✅ Routing (GET requests)
- ✅ Serving static files (CSS, JS, images)
- ✅ Template engine dengan Handlebars (hbs)
- ✅ Partials dan reusable components
- ✅ Dynamic content rendering
- ✅ 404 error handling
- ✅ Middleware configuration

**File Utama:**
```
Jobsheet 5 - Basic Web Server/
├── web-server/
│   ├── src/
│   │   └── app.js              # Server configuration & routes
│   ├── templates/
│   │   ├── views/              # Halaman utama
│   │   │   ├── index.hbs       # Homepage
│   │   │   ├── tentang.hbs     # About page
│   │   │   ├── bantuan.hbs     # Help page
│   │   │   └── 404.hbs         # Error page
│   │   └── partials/           # Reusable components
│   │       ├── head.hbs        # <head> section
│   │       ├── header.hbs      # Navigation header
│   │       └── footer.hbs      # Footer section
│   ├── public/
│   │   ├── css/
│   │   │   └── styles.css      # Styling
│   │   ├── js/
│   │   │   └── app.js          # Client-side JS
│   │   └── img/                # Images & icons
│   ├── package.json
│   └── node_modules/
```

**💡 Highlight:**
- Full-stack web application dengan Express.js
- Template engine Handlebars untuk dynamic rendering
- Modular code structure dengan partials
- Responsive design dengan CSS
- RESTful routing pattern
- Wildcard routes untuk custom 404 pages

**📊 Routes:**
| Route | Method | Deskripsi |
|-------|--------|-----------|
| `/` | GET | Homepage - Aplikasi Cek Cuaca |
| `/tentang` | GET | Halaman About dengan biodata |
| `/bantuan` | GET | Halaman bantuan |
| `/infoCuaca` | GET | JSON API endpoint |
| `/bantuan/*` | GET | Custom 404 untuk artikel tidak ditemukan |
| `/*` | GET | Global 404 handler |

**🎨 Fitur Template Engine:**
- **Partials:** Reusable header, footer, dan head section
- **Dynamic Title:** Setiap halaman memiliki title yang berbeda
- **Data Binding:** Menggunakan `{{variabel}}` untuk dynamic content
- **Modular Structure:** Separation of concerns untuk maintainability

---

</details>

---

## 🛠️ Teknologi yang Digunakan

<div align="center">

| Kategori | Tools & Framework |
|----------|-------------------|
| **Runtime** | ![Node.js](https://img.shields.io/badge/Node.js-v24.12.0-43853D?style=flat&logo=node.js) |
| **Web Framework** | ![Express.js](https://img.shields.io/badge/Express.js-4.18.2-000000?style=flat&logo=express) |
| **Template Engine** | ![Handlebars](https://img.shields.io/badge/Handlebars-latest-f0772b?style=flat&logo=handlebarsdotjs) |
| **Package Manager** | ![NPM](https://img.shields.io/badge/NPM-latest-CB3837?style=flat&logo=npm) |
| **Development** | ![Nodemon](https://img.shields.io/badge/Nodemon-auto--reload-76D04B?style=flat&logo=nodemon) |
| **Version Control** | ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github) |

</div>

---

## 🚀 Cara Menjalankan Project

### Prerequisites
```bash
# Pastikan Node.js sudah terinstall
node --version  # Minimum v14.x

# Pastikan NPM terinstall
npm --version
```

### Clone Repository
```bash
git clone https://github.com/username/23343027-Praktikum-Pemograman-Jaringan.git
cd 23343027-Praktikum-Pemograman-Jaringan
```

### Menjalankan JobSheet Tertentu

#### JobSheet 1 - Pengantar Node.js
```bash
cd "Jobsheet 1 - Pengantar NodeJs/testground"
node hello-world.js
```

#### JobSheet 2 - Module System
```bash
cd "Jobsheet 2 - Node.js Module System/buku-catatan"
npm install
node app.js
```

#### JobSheet 3 - HTTP Request
```bash
cd "Jobsheet 3 - HTTP Request and API/aplikasiCuaca"
npm install
node app.js
```

#### JobSheet 5 - Web Server
```bash
cd "Jobsheet 5 - Basic Web Server/web-server"
npm install

# Development mode dengan auto-reload
cd src
nodemon app.js -e js,hbs

# Production mode
node src/app.js
```

Akses aplikasi di browser: `http://localhost:4000`

---

## 📂 Struktur Repository

```
23343027-Praktikum-Pemograman-Jaringan/
│
├── 📁 Jobsheet 1 - Pengantar NodeJs/
│   └── testground/
│
├── 📁 Jobsheet 2 - Node.js Module System/
│   └── buku-catatan/
│
├── 📁 Jobsheet 3 - HTTP Request and API/
│   └── aplikasiCuaca/
│
├── 📁 Jobsheet 5 - Basic Web Server/
│   └── web-server/
│       ├── src/
│       ├── templates/
│       ├── public/
│       └── package.json
│
└── 📄 README.md
```

---

## 📈 Progress Pembelajaran

```
🟢 Completed  🟡 In Progress  🔴 Not Started
```

| JobSheet | Status | Keterangan |
|----------|--------|------------|
| JobSheet 1 | 🟢 | Pengantar Node.js |
| JobSheet 2 | 🟢 | Module System |
| JobSheet 3 | 🟢 | HTTP Request & API |
| JobSheet 4 | 🔴 | Coming Soon |
| JobSheet 5 | 🟢 | Basic Web Server |
| JobSheet 6 | 🟡 | In Progress |

---

## 🎯 Tujuan Pembelajaran

Melalui praktikum ini, saya mempelajari:

- [x] 🔧 Dasar-dasar Node.js runtime environment
- [x] 📦 Sistem modularisasi dan NPM package management
- [x] 🌐 Konsumsi REST API eksternal
- [x] 🖥️ Membangun web server dengan Express.js
- [x] 🎨 Template engine dan dynamic rendering
- [x] 📄 File system operations
- [x] ⚡ Asynchronous programming dengan async/await
- [x] 🛣️ Routing dan middleware
- [ ] 🔐 Authentication & Authorization (upcoming)
- [ ] 💾 Database integration (upcoming)

---

## 📝 Catatan Penting

> **Nodemon Configuration:**  
> Untuk development, gunakan flag `-e js,hbs` agar nodemon watch file `.js` dan `.hbs`:
> ```bash
> nodemon app.js -e js,hbs
> ```

> **Port Configuration:**  
> Semua aplikasi web server menggunakan port `4000` secara default.

> **API Keys:**  
> Beberapa JobSheet memerlukan API key (contoh: Weatherstack). Pastikan API key valid sebelum menjalankan aplikasi.

---

## 🌟 Highlight Project

<div align="center">

### 🏆 JobSheet 5 - Web Server Terbaik

Aplikasi web lengkap dengan:
- ✨ Modern UI/UX design
- 🎨 Handlebars template engine
- 📱 Responsive layout
- 🚀 Fast performance
- 🔍 SEO friendly structure

</div>

---

## 📞 Kontak

<div align="center">

[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:agusmia.intan@student.unp.ac.id)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/agusmia)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/agusmia-intan-sari)

</div>

---

<div align="center">

### 💙 Terima Kasih

*Dibuat dengan ❤️ untuk memenuhi tugas Praktikum Pemrograman Jaringan*

**Universitas Negeri Padang - 2026**

[![Made with Node.js](https://img.shields.io/badge/Made%20with-Node.js-43853D?style=flat&logo=node.js)](https://nodejs.org/)
[![Powered by Express](https://img.shields.io/badge/Powered%20by-Express-000000?style=flat&logo=express)](https://expressjs.com/)

---

⭐ **Star this repo if you find it helpful!** ⭐

</div>