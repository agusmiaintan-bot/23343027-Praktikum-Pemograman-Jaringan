# 📘 JobSheet 1 - Pengantar Node.js

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**Pengenalan Node.js dan Dasar-dasar JavaScript Runtime**

</div>

---

## 📋 Deskripsi

JobSheet ini memperkenalkan Node.js sebagai JavaScript runtime environment yang memungkinkan JavaScript dijalankan di luar browser. Praktikum ini fokus pada pemahaman dasar tentang bagaimana Node.js bekerja dan perbedaannya dengan JavaScript di browser.

---

## 🎯 Tujuan Pembelajaran

Setelah menyelesaikan jobsheet ini, mahasiswa diharapkan dapat:

- ✅ Memahami konsep Node.js runtime environment
- ✅ Menginstall dan mengonfigurasi Node.js
- ✅ Menjalankan JavaScript file menggunakan Node.js
- ✅ Memahami perbedaan JavaScript di browser vs Node.js
- ✅ Menggunakan Node.js REPL (Read-Eval-Print Loop)
- ✅ Membuat program sederhana dengan Node.js

---

## 📂 Struktur Folder

```
Jobsheet 1 - Pengantar NodeJs/
├── testground/
│   ├── hello-world.js    # Program Hello World pertama
│   └── hello.js          # Eksperimen JavaScript di Node.js
└── README.md
```

---

## 🚀 Cara Menjalankan

### 1. Pastikan Node.js Terinstall

```bash
# Cek versi Node.js
node --version

# Harus menampilkan versi, contoh: v24.12.0
```

### 2. Masuk ke Folder testground

```bash
cd "Jobsheet 1 - Pengantar NodeJs/testground"
```

### 3. Jalankan Program

#### Hello World
```bash
node hello-world.js
```

**Output yang diharapkan:**
```
Hello World!
```

#### Hello (Eksperimen lainnya)
```bash
node hello.js
```

---

## 💻 Penjelasan Code

### `hello-world.js` - Program Dasar Node.js

```javascript
console.log('Hello World!');
```

**Penjelasan:**
- `console.log()` adalah fungsi built-in untuk menampilkan output ke terminal
- Tidak memerlukan DOM atau window object seperti di browser
- Node.js langsung mengeksekusi kode JavaScript tanpa HTML

### Perbedaan dengan Browser

| Aspek | Browser | Node.js |
|-------|---------|---------|
| **Environment** | Window object, DOM | Global object, no DOM |
| **Use Case** | Frontend web development | Backend, CLI tools, servers |
| **Modules** | ES6 modules (`import/export`) | CommonJS (`require/module.exports`) |
| **APIs** | Fetch, localStorage, DOM APIs | File System, HTTP, Process |

---

## 🔑 Konsep Penting

### 1. **Node.js Runtime**
Node.js adalah JavaScript runtime yang dibangun di atas V8 engine (engine JavaScript Chrome). Memungkinkan JavaScript berjalan di server.

### 2. **Non-blocking I/O**
Node.js menggunakan event-driven, non-blocking I/O model yang membuatnya ringan dan efisien.

### 3. **REPL (Read-Eval-Print Loop)**
Mode interaktif Node.js untuk menjalankan JavaScript langsung di terminal.

```bash
# Masuk ke REPL
node

# Coba ketik:
> console.log("Hello from REPL")
> 2 + 2
> const name = "Node.js"
> name
```

### 4. **Single-threaded Event Loop**
Node.js menggunakan single thread untuk menangani multiple requests secara concurrent menggunakan event loop.

---

## 📝 Latihan Tambahan

### Latihan 1: Variabel dan Tipe Data
Buat file `variables.js`:
```javascript
const nama = "Agusmia Intan Sari";
const nim = 23343027;
const hobi = ["coding", "reading", "learning"];

console.log("Nama:", nama);
console.log("NIM:", nim);
console.log("Hobi:", hobi);
```

### Latihan 2: Function
Buat file `functions.js`:
```javascript
function sapa(nama) {
    return `Halo, ${nama}! Selamat belajar Node.js`;
}

console.log(sapa("Agusmia"));
```

### Latihan 3: Arrow Function
Buat file `arrow.js`:
```javascript
const tambah = (a, b) => a + b;
const kali = (a, b) => a * b;

console.log("5 + 3 =", tambah(5, 3));
console.log("5 * 3 =", kali(5, 3));
```

Jalankan dengan:
```bash
node variables.js
node functions.js
node arrow.js
```

---

## 🧪 Eksperimen

### Coba Global Objects Node.js

Buat file `globals.js`:
```javascript
// Process info
console.log("Node Version:", process.version);
console.log("Platform:", process.platform);
console.log("Current Directory:", __dirname);
console.log("Current File:", __filename);

// Environment variables
console.log("Environment:", process.env.NODE_ENV || "development");
```

Jalankan:
```bash
node globals.js
```

---

## ❓ FAQ

**Q: Apa perbedaan Node.js dengan JavaScript di browser?**  
A: Node.js tidak memiliki DOM atau Window object, tapi memiliki akses ke file system, network, dan OS. JavaScript di browser fokus pada manipulasi halaman web.

**Q: Kenapa butuh Node.js?**  
A: Node.js memungkinkan developer menggunakan JavaScript untuk backend development, build tools, automation scripts, dan aplikasi command-line.

**Q: Apakah Node.js sama dengan NPM?**  
A: Tidak. Node.js adalah runtime environment, sedangkan NPM (Node Package Manager) adalah package manager yang terinstall bersama Node.js.

---

## 📚 Sumber Belajar

- [Node.js Official Documentation](https://nodejs.org/docs/)
- [Node.js Getting Started Guide](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)
- [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## ✅ Checklist Pembelajaran

- [ ] Berhasil install Node.js
- [ ] Menjalankan program hello-world.js
- [ ] Memahami perbedaan Node.js vs Browser JavaScript
- [ ] Mencoba REPL Node.js
- [ ] Mengeksplorasi global objects (`process`, `__dirname`, dll)
- [ ] Membuat program sederhana sendiri

---

<div align="center">

**🎓 Mahasiswa:** Agusmia Intan Sari  
**🆔 NIM:** 23343027  
**🏫 Universitas Negeri Padang**

---

⬅️ [Kembali ke Root README](../README.md) | ➡️ [JobSheet 2 - Module System](../Jobsheet%202%20-%20Node.js%20Module%20System/README.md)

</div>
