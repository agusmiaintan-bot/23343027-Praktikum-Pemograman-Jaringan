# 📘 JobSheet 5 - Web Server and ExpressJs

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express)
![Handlebars](https://img.shields.io/badge/Handlebars.js-f0772b?style=for-the-badge&logo=handlebarsdotjs&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

**Membangun Web Server dengan Express.js dan Template Engine**

</div>

---

## 📋 Deskripsi

JobSheet ini mempelajari cara membangun web server menggunakan Express.js framework dan Handlebars template engine. Praktikum ini mencakup routing, serving static files, dynamic content rendering, partials, dan error handling untuk membuat aplikasi web yang terstruktur dan maintainable.

---

## 🎯 Tujuan Pembelajaran

Setelah menyelesaikan jobsheet ini, mahasiswa diharapkan dapat:

- ✅ Membangun web server dengan Express.js
- ✅ Implementasi routing (GET requests)
- ✅ Serving static files (CSS, JS, images)
- ✅ Menggunakan template engine (Handlebars)
- ✅ Membuat reusable components dengan partials
- ✅ Dynamic content rendering
- ✅ Implementasi custom 404 error pages
- ✅ Memahami konsep MVC (Model-View-Controller)

---

## 📂 Struktur Folder

```
Jobsheet 5 - Web Server and ExpressJs/
├── web-server/
│   ├── src/
│   │   └── app.js              # Server configuration & routes
│   ├── templates/
│   │   ├── views/              # Main pages
│   │   │   ├── index.hbs       # Homepage
│   │   │   ├── tentang.hbs     # About page with biodata
│   │   │   ├── bantuan.hbs     # Help page
│   │   │   └── 404.hbs         # Custom 404 error page
│   │   └── partials/           # Reusable components
│   │       ├── head.hbs        # <head> section
│   │       ├── header.hbs      # Navigation header
│   │       └── footer.hbs      # Footer section
│   ├── public/
│   │   ├── css/
│   │   │   └── styles.css      # Main stylesheet
│   │   ├── js/
│   │   │   └── app.js          # Client-side JavaScript
│   │   └── img/                # Images & icons
│   │       ├── cuaca.png       # Favicon
│   │       └── image.png       # Profile photo
│   ├── package.json            # NPM configuration
│   ├── package-lock.json       # Dependency lock
│   └── node_modules/           # Installed packages
└── README.md
```

---

## 🚀 Cara Menjalankan

### 1. Install Dependencies

```bash
cd "Jobsheet 5 - Web Server and ExpressJs/web-server"
npm install
```

**Dependencies yang diinstall:**
- `express@4.18.2` - Web framework
- `hbs` - Handlebars template engine
- `nodemon` - Auto-reload development tool (devDependency)

### 2. Development Mode (dengan auto-reload)

```bash
cd src
nodemon app.js -e js,hbs
```

**Penjelasan flags:**
- `-e js,hbs` - Watch untuk perubahan file `.js` dan `.hbs`
- Auto-restart server saat ada perubahan

### 3. Production Mode

```bash
node src/app.js
```

### 4. Akses Aplikasi

Buka browser dan akses:
- **Homepage:** http://localhost:4000/
- **Tentang:** http://localhost:4000/tentang
- **Bantuan:** http://localhost:4000/bantuan
- **Info Cuaca (JSON):** http://localhost:4000/infoCuaca
- **404 Test:** http://localhost:4000/halaman-tidak-ada

---

## 💻 Penjelasan Code

### `src/app.js` - Server Configuration

```javascript
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

// Path configuration
const direktoriPublic = path.join(__dirname, '../public');
const direktoriViews = path.join(__dirname, '../templates/views');
const direktoriPartials = path.join(__dirname, '../templates/partials');

// Template engine setup
app.set('view engine', 'hbs');
app.set('views', direktoriViews);

// Register partials
hbs.registerPartials(direktoriPartials);

// Synchronous partial registration (untuk stability)
try {
    const headerPartial = fs.readFileSync(path.join(direktoriPartials, 'header.hbs'), 'utf8');
    const footerPartial = fs.readFileSync(path.join(direktoriPartials, 'footer.hbs'), 'utf8');
    const headPartial = fs.readFileSync(path.join(direktoriPartials, 'head.hbs'), 'utf8');
    hbs.registerPartial('header', headerPartial);
    hbs.registerPartial('footer', footerPartial);
    hbs.registerPartial('head', headPartial);
} catch (e) {
    console.error('Gagal mendaftarkan partials:', e);
}

// Static files (dengan custom config)
app.use(express.static(direktoriPublic, { index: false }));

// Routes
app.get('', (req, res) => {
    res.render('index', {
        judul: 'Aplikasi Cek Cuaca',
        nama: 'Agusmia Intan Sari'
    });
});

app.get('/bantuan', (req, res) => {
    res.render('bantuan', {
        judul: 'Bantuan',
        teksBantuan: 'Ini adalah teks bantuan',
        nama: 'Agusmia Intan Sari'
    });
});

app.get('/infoCuaca', (req, res) => {
    res.send([{
        prediksiCuaca: 'Cuaca berpotensi hujan',
        lokasi: 'Padang'
    }]);
});

app.get('/tentang', (req, res) => {
    res.render('tentang', {
        judul: 'Tentang Saya',
        nama: 'Agusmia Intan Sari'
    });
});

// 404 Routes (wildcard)
app.get('/bantuan/*', (req, res) => {
    res.render('404', {
        judul: '404',
        nama: 'Agusmia Intan Sari',
        pesanKesalahan: 'Artikel yang dicari tidak ditemukan.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        judul: '404',
        nama: 'Agusmia Intan Sari',
        pesanKesalahan: 'Halaman tidak ditemukan.'
    });
});

// Start server
app.listen(4000, () => {
    console.log('Server berjalan pada port 4000.');
});
```

---

## 🎨 Template Engine (Handlebars)

### Struktur Template

#### `templates/views/index.hbs` - Homepage

```handlebars
<!DOCTYPE html>
<html lang="id">
{{>head}}
<body>
    {{>header}}
    
    <main class="main-content">
        <h1>{{judul}}</h1>
        <p>Aplikasi ini digunakan untuk mengecek Cuaca!</p>
    </main>
    
    {{>footer}}
</body>
</html>
```

#### `templates/partials/head.hbs` - Reusable Head

```handlebars
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{judul}}</title>
    <link rel="icon" href="/img/cuaca.png">
    <link rel="stylesheet" href="/css/styles.css">
    <script src="/js/app.js"></script>
</head>
```

#### `templates/partials/header.hbs` - Navigation

```handlebars
<header>
    <nav>
        <a href="/">Home</a>
        <a href="/tentang">Tentang</a>
        <a href="/bantuan">Bantuan</a>
    </nav>
</header>
```

#### `templates/partials/footer.hbs` - Footer

```handlebars
<footer>
    <p>Dikembangkan oleh {{nama}}</p>
</footer>
```

### Handlebars Syntax

```handlebars
{{!-- Variables --}}
<h1>{{judul}}</h1>
<p>{{nama}}</p>

{{!-- Partials --}}
{{>header}}
{{>footer}}

{{!-- Conditionals --}}
{{#if user}}
    <p>Welcome, {{user.name}}</p>
{{else}}
    <p>Please login</p>
{{/if}}

{{!-- Loops --}}
{{#each items}}
    <li>{{this.name}}</li>
{{/each}}
```

---

## 🔑 Konsep Penting

### 1. **Express.js Routing**

```javascript
// Basic route
app.get('/path', (req, res) => {
    res.send('Response');
});

// Render template
app.get('/path', (req, res) => {
    res.render('template', { data });
});

// JSON response
app.get('/api/data', (req, res) => {
    res.json({ key: 'value' });
});

// Route parameters
app.get('/user/:id', (req, res) => {
    const id = req.params.id;
});

// Query parameters
app.get('/search', (req, res) => {
    const query = req.query.q;
});
```

### 2. **Static Files**

```javascript
// Serve all files in public folder
app.use(express.static('public'));

// Custom configuration
app.use(express.static('public', { 
    index: false,  // Disable index.html auto-serve
    maxAge: '1d'   // Cache for 1 day
}));

// Multiple static directories
app.use(express.static('public'));
app.use(express.static('files'));
```

### 3. **Middleware**

```javascript
// Global middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();  // Pass to next middleware
});

// Route-specific middleware
const auth = (req, res, next) => {
    if (req.headers.authorization) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

app.get('/admin', auth, (req, res) => {
    res.send('Admin page');
});
```

### 4. **Template Engine Configuration**

```javascript
// Set view engine
app.set('view engine', 'hbs');

// Set views directory
app.set('views', './templates/views');

// Register partials
hbs.registerPartials('./templates/partials');

// Register helpers
hbs.registerHelper('uppercase', (str) => {
    return str.toUpperCase();
});
```

---

## 📊 Route Table

| Route | Method | View Template | Deskripsi |
|-------|--------|---------------|-----------|
| `/` | GET | `index.hbs` | Homepage aplikasi cuaca |
| `/tentang` | GET | `tentang.hbs` | Halaman biodata lengkap |
| `/bantuan` | GET | `bantuan.hbs` | Halaman bantuan FAQ |
| `/infoCuaca` | GET | - (JSON) | API endpoint data cuaca |
| `/bantuan/*` | GET | `404.hbs` | 404 untuk artikel bantuan |
| `*` | GET | `404.hbs` | Global 404 handler |

---

## 🎨 CSS Styling

### `public/css/styles.css`

```css
body {
    color: #333333;
    font-family: arial;
    max-width: 650px;
    margin: 0 auto;
    padding: 0 16px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.main-content {
    flex-grow: 1;
}

footer {
    color: #888888;
    border-top: 1px solid #eeeeee;
    margin-top: 16px;
    padding: 16px 0;
}

header {
    margin-top: 16px;
    margin-bottom: 48px;
}

h1 {
    font-size: 64px;
    margin-bottom: 16px;
}

header a {
    color: #888888;
    margin-right: 16px;
    text-decoration: none;
}

.portrait {
    width: 250px;
}
```

**Key Features:**
- ✅ Flexbox layout untuk sticky footer
- ✅ Responsive max-width
- ✅ Minimalist design
- ✅ Mobile-friendly

---

## 🧪 Eksperimen & Latihan

### Latihan 1: Tambah Route Baru

Buat halaman "Kontak":

```javascript
app.get('/kontak', (req, res) => {
    res.render('kontak', {
        judul: 'Kontak',
        nama: 'Agusmia Intan Sari',
        email: 'agusmia.intan@student.unp.ac.id'
    });
});
```

Buat `templates/views/kontak.hbs`:
```handlebars
<!DOCTYPE html>
<html lang="id">
{{>head}}
<body>
    {{>header}}
    <main class="main-content">
        <h1>{{judul}}</h1>
        <p>Email: {{email}}</p>
    </main>
    {{>footer}}
</body>
</html>
```

### Latihan 2: Query Parameters

```javascript
app.get('/search', (req, res) => {
    const query = req.query.q || 'nothing';
    res.render('search', {
        judul: 'Pencarian',
        searchQuery: query,
        nama: 'Agusmia Intan Sari'
    });
});
```

Akses: `http://localhost:4000/search?q=cuaca`

### Latihan 3: Custom Helper

```javascript
hbs.registerHelper('formatDate', (date) => {
    return new Date(date).toLocaleDateString('id-ID');
});
```

Di template:
```handlebars
<p>Tanggal: {{formatDate currentDate}}</p>
```

### Latihan 4: Logging Middleware

```javascript
app.use((req, res, next) => {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.url}`);
    next();
});
```

---

## 🔧 NPM Scripts

Tambahkan di `package.json`:

```json
{
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js -e js,hbs",
    "test": "echo \"No tests yet\""
  }
}
```

Gunakan:
```bash
npm start      # Production
npm run dev    # Development
```

---

## 🐛 Troubleshooting

### Error: Cannot find module 'hbs'

```bash
npm install hbs
```

### Error: The partial XXX could not be found

```javascript
// Pastikan partials directory sudah registered
hbs.registerPartials(direktoriPartials);

// Dan file partial ada di folder yang benar
templates/partials/header.hbs
```

### Error: EADDRINUSE (Port already in use)

```bash
# Windows - Kill process on port 4000
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:4000 | xargs kill -9
```

### Nodemon tidak auto-reload file .hbs

```bash
# Gunakan flag -e
nodemon app.js -e js,hbs
```

---

## 🎯 Best Practices

### 1. **Folder Structure**

```
✅ Pisahkan concerns: views, partials, static files
✅ Gunakan path.join() untuk cross-platform compatibility
✅ Buat folder terpisah untuk routes, models, controllers
```

### 2. **Security**

```javascript
// Helmet untuk security headers
const helmet = require('helmet');
app.use(helmet());

// CORS untuk API
const cors = require('cors');
app.use(cors());

// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);
```

### 3. **Environment Variables**

```javascript
require('dotenv').config();

const PORT = process.env.PORT || 4000;
app.listen(PORT);
```

### 4. **Error Handling**

```javascript
// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        judul: 'Error',
        message: 'Something went wrong!'
    });
});
```

---

## 📚 Sumber Belajar

- [Express.js Documentation](https://expressjs.com/)
- [Handlebars Documentation](https://handlebarsjs.com/)
- [MDN - Express Tutorial](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

## ✅ Checklist Pembelajaran

- [ ] Install dan setup Express.js
- [ ] Membuat routing untuk multiple pages
- [ ] Serving static files (CSS, JS, images)
- [ ] Setup Handlebars template engine
- [ ] Membuat reusable partials (head, header, footer)
- [ ] Passing data ke templates
- [ ] Implementasi 404 error handling
- [ ] Dynamic content rendering
- [ ] Menggunakan nodemon untuk development
- [ ] Deploy aplikasi (bonus)

---

## 🚀 Next Steps

- [ ] Tambah form input untuk cuaca
- [ ] Integrasikan dengan Weatherstack API (JobSheet 3)
- [ ] Tambah database (MongoDB/PostgreSQL)
- [ ] Implementasi authentication
- [ ] Deploy ke Heroku/Vercel

---

<div align="center">

**🎓 Mahasiswa:** Agusmia Intan Sari  
**🆔 NIM:** 23343027  
**🏫 Universitas Negeri Padang**

---

⬅️ [JobSheet 3 - HTTP Request](../Jobsheet%203%20-%20HTTP%20Request%20and%20API/README.md) | [Root README](../README.md)

**⭐ Star this repo if helpful!**

</div>
