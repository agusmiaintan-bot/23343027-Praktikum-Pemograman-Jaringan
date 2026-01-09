# 💬 RuangNgobrol - Aplikasi Chat Real-time

> **Jobsheet 9: Socket Programming**  
> Memahami komunikasi bidirektional real-time menggunakan Socket.io dalam aplikasi web modern

---

## 📖 Tentang Jobsheet Ini

Pada jobsheet ini, kita mempelajari konsep **Socket Programming** untuk membangun aplikasi chat real-time yang memungkinkan komunikasi instan antar pengguna dalam ruang chat terpisah. Berbeda dengan HTTP tradisional yang bersifat request-response, Socket.io memungkinkan komunikasi dua arah (*bidirectional*) secara *event-based*, sehingga data bisa mengalir dari server ke klien maupun sebaliknya tanpa perlu reload halaman.

### 🎯 Fitur Aplikasi RuangNgobrol

- ✅ Chat berbasis ruangan (room-based messaging)
- ✅ Notifikasi real-time ketika user join/leave
- ✅ Filter kata-kata kasar otomatis
- ✅ Berbagi lokasi melalui Google Maps
- ✅ Daftar anggota ruangan yang update secara live
- ✅ Timestamp pesan dengan format yang rapi

---

## 🔍 Pembahasan Materi

### **Konsep Socket.on di Server vs Client**

Salah satu hal menarik dari Socket.io adalah bagaimana event listener bekerja di dua sisi yang berbeda. Di file `src/index.js` (sisi server), fungsi `socket.on` digunakan untuk **mendengarkan event yang dikirim dari browser pengguna**. Misalnya:

```javascript
socket.on('join', (options, callback) => {
  const { error, user } = tambahPengguna({ id: socket.id, ...options })
  // ... logika bergabung ke room
})
```

Ketika user mengisi form join dan menekan tombol, browser akan mengirim event `join` yang ditangkap oleh handler ini. Server kemudian memproses data tersebut, memasukkan socket ke dalam room tertentu dengan `socket.join(user.room)`, dan mem-broadcast notifikasi bahwa ada member baru.

Sebaliknya, di `public/js/chat.js` (sisi client), `socket.on` berfungsi untuk **mendengarkan event yang dipancarkan server**:

```javascript
socket.on('pesan', (message) => {
  console.log('pesan diterima:', message)
  const html = Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format('H:mm')
  })
  $messages.insertAdjacentHTML('beforeend', html)
})
```

Jadi pada dasarnya, `socket.on` di server = listener untuk client, sedangkan `socket.on` di client = listener untuk server. Konsep ini yang memungkinkan komunikasi dua arah terjadi dengan lancar.

---

### **Mengamati Aktivitas di Browser Console**

Saat kita membuka DevTools dan masuk ke tab **Console**, beberapa log akan muncul setiap kali ada aktivitas chat. Ini karena kita menambahkan `console.log` di beberapa event handler:

```javascript
socket.on('pesan', (message) => {
  console.log('pesan diterima:', message)
  // render message
})

socket.on('roomData', ({ room, users }) => {
  console.log('roomData diperbarui:', { room, users })
  // update sidebar
})
```

Log tersebut membantu kita memahami alur data: ketika seseorang mengetik pesan dan klik kirim, browser pertama memanggil `socket.emit('kirimPesan', pesan)`, lalu server memproses dan mem-broadcast event `pesan` ke semua member di room tersebut. Setiap browser yang menerima event ini akan mencetak payload di console sebelum merender pesan ke UI.

Ini sangat berguna untuk debugging, karena kita bisa melihat struktur data yang dikirim/diterima, termasuk timestamp yang di-generate server.

---

### **Peran Tiga Library Utama**

Di bagian bawah `chat.html`, kita meng-include tiga library penting:

#### 1️⃣ **Mustache.js** — Templating Engine
Mustache membantu kita membuat HTML secara dinamis tanpa harus menulis kode DOM manipulation yang panjang. Di `chat.html`, kita mendefinisikan template seperti ini:

```html
<script id="message-template" type="text/html">
  <div class="message">
    <p>
      <span class="message__name">{{username}}</span>
      <span class="message__meta">{{createdAt}}</span>
    </p>
    <p>{{message}}</p>
  </div>
</script>
```

Lalu di `chat.js`, kita render template tersebut dengan data dari server:

```javascript
const html = Mustache.render(messageTemplate, {
  username: message.username,
  message: message.text,
  createdAt: moment(message.createdAt).format('H:mm')
})
```

Hasilnya, markup HTML di-generate otomatis dengan data yang sesuai, dan kita tinggal insert ke DOM.

#### 2️⃣ **Moment.js** — Date Formatting
Timestamp dari server berupa angka Unix (milliseconds), contoh: `1704720000000`. Agar lebih *user-friendly*, kita format menggunakan Moment:

```javascript
moment(message.createdAt).format('H:mm')  // Output: "14:30"
```

Jadi pesan yang dikirim jam 2 siang akan tampil sebagai "14:00" di chat, bukan angka panjang yang membingungkan.

#### 3️⃣ **QS (Query String)** — Parsing URL Parameters
Ketika user mengisi form di `index.html` dan klik "Bergabung ke Chat", browser akan redirect ke `/chat.html?username=Agus&room=javascript`. Library QS mem-parse URL tersebut menjadi object JavaScript:

```javascript
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })
// Result: { username: "Agus", room: "javascript" }
```

Data ini kemudian dikirim ke server melalui `socket.emit('join', { username, room })` agar server tahu siapa yang join dan ke ruangan mana.

---

### **Memahami Bagian Elements, Templates, dan Options**

Di awal file `chat.js`, kita mengelompokkan kode menjadi tiga bagian:

#### 📌 **Elements** — Referensi DOM
Kita menyimpan referensi ke elemen-elemen HTML yang akan sering digunakan:

```javascript
const $messageForm = document.querySelector('#form-pesan')
const $messageFormInput = document.querySelector('input')
const $sendLocationButton = document.querySelector('#kirim-lokasi')
const $messages = document.querySelector('#messages')
```

Ini menghubungkan JavaScript dengan struktur HTML di `chat.html`. Misalnya, `$messageForm` merujuk ke form pengiriman pesan, sedangkan `$messages` adalah container tempat semua pesan ditampilkan.

#### 📌 **Templates** — Markup Dinamis
Kita mengambil isi dari tag `<script type="text/html">` untuk digunakan sebagai template Mustache:

```javascript
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#locationMessage-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML
```

Setiap kali ada pesan baru atau lokasi dibagikan, template ini di-render dengan data yang sesuai.

#### 📌 **Options** — Parameter Join
Data username dan room di-parse dari URL:

```javascript
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })
```

Nilai ini digunakan saat koneksi pertama kali dibuat untuk memberi tahu server: "Halo, saya si Agus dan mau masuk ke room JavaScript".

---

### **Peran File Utils: messages.js dan users.js**

#### 🗂️ **messages.js** — Pembuat Struktur Pesan
File ini berisi dua fungsi sederhana yang membuat objek pesan dengan format konsisten:

```javascript
const generateMessage = (username, text) => {
  return {
    username,
    text,
    createdAt: new Date().getTime()
  }
}
```

Server memanggil fungsi ini setiap kali ada pesan baru atau notifikasi. Hasilnya dikirim ke client dalam bentuk objek yang sudah terstruktur rapi, sehingga client tinggal render tanpa perlu format ulang.

#### 👥 **users.js** — Manajemen Pengguna
File ini mengelola state pengguna menggunakan array sederhana:

```javascript
const users = []

const tambahPengguna = ({ id, username, room }) => {
  username = username.trim().toLowerCase()
  room = room.trim().toLowerCase()
  
  // Cek username duplicate
  const existingUser = users.find((user) => 
    user.room === room && user.username === username
  )
  
  if (existingUser) {
    return { error: 'Username sudah digunakan!' }
  }
  
  const user = { id, username, room }
  users.push(user)
  return { user }
}
```

Fungsi-fungsi di sini dipanggil oleh server untuk:
- Menambahkan user saat join (validasi nama duplikat)
- Menghapus user saat disconnect
- Mengambil info user berdasarkan socket ID
- Mendapatkan semua member di satu room (untuk sidebar)

Hasilnya memengaruhi event yang dipancarkan server, seperti `roomData` yang berisi daftar member aktif di room tersebut.

---

### **Cara Kerja Fitur Share Lokasi**

Fitur ini memanfaatkan **Geolocation API** bawaan browser:

1️⃣ **Di Client** (`chat.js`):  
Ketika tombol "Share Lokasi" diklik, kita meminta izin akses lokasi dari browser:

```javascript
$sendLocationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Browser anda tidak mendukung Geolocation')
  }
  
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('kirimLokasi', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  })
})
```

Browser akan menampilkan popup permission. Jika user mengizinkan, koordinat lat/lng dikirim ke server.

2️⃣ **Di Server** (`index.js`):  
Server menerima koordinat dan membuat URL Google Maps:

```javascript
socket.on('kirimLokasi', (coords, callback) => {
  const user = ambilPengguna(socket.id)
  io.to(user.room).emit('locationMessage', 
    generateLocationMessage(
      user.username, 
      `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`
    )
  )
  callback()
})
```

Event `locationMessage` dipancarkan ke semua member di room, dan client merender link yang bisa diklik untuk membuka peta.

---

### **Mengapa npm run dev, Bukan node index.js?**

Di `package.json`, kita mendefinisikan dua script:

```json
"scripts": {
  "start": "node src/index.js",
  "dev": "nodemon src/index.js"
}
```

**`npm run dev`** menggunakan **nodemon**, sebuah tool yang memantau perubahan file. Setiap kali kita edit dan save kode, nodemon otomatis restart server tanpa perlu menekan Ctrl+C dan menjalankan ulang. Ini sangat membantu saat development karena kita bisa langsung lihat efek perubahan kode.

**`npm run start`** menjalankan server dengan `node` biasa. Server hanya jalan sekali, dan jika ada perubahan kode, kita harus manual restart. Biasanya digunakan untuk production.

Bandingkan dengan jobsheet sebelumnya yang pakai `node namafile.js`, di mana kita harus restart manual setiap ada perubahan. Dengan nodemon, workflow jadi lebih efisien.

---

### **Fungsi Socket Lain yang Digunakan**

Selain `socket.on`, ada beberapa method Socket.io penting dalam aplikasi ini:

#### 🔹 **socket.emit** (Client → Server)
Mengirim event dari browser ke server:

```javascript
socket.emit('kirimPesan', pesan, (error) => {
  if (error) return console.log(error)
})
```

#### 🔹 **socket.join(room)** (Server)
Menambahkan socket ke dalam room tertentu:

```javascript
socket.join(user.room)  // Socket ini sekarang bagian dari room "javascript"
```

#### 🔹 **io.to(room).emit** (Server → Multiple Clients)
Memancarkan event ke semua socket dalam satu room:

```javascript
io.to(user.room).emit('pesan', generateMessage(user.username, pesan))
```

Hanya member yang ada di room tersebut yang akan menerima event ini.

#### 🔹 **socket.broadcast.to(room).emit** (Server → Others Only)
Sama seperti `io.to`, tapi **tidak** mengirim ke socket pengirim:

```javascript
socket.broadcast.to(user.room).emit('pesan', 
  generateMessage('Admin', `${user.username} telah bergabung`)
)
```

User yang baru join tidak akan menerima notifikasi join miliknya sendiri, tapi member lain akan menerima.

---

### **Komunikasi Real-time Bidirectional Event-based**

Ini adalah inti dari Socket.io. Berbeda dengan HTTP biasa yang hanya bisa request-response (client → server → client), Socket.io memungkinkan **komunikasi dua arah** yang **event-driven**:

#### 🔄 **Bidirectional (Dua Arah)**
- Client bisa kirim data ke server kapan saja dengan `socket.emit`
- Server bisa push data ke client kapan saja dengan `io.emit` atau `socket.emit`

Tidak ada batasan "harus ada request dulu baru ada response". Misalnya, saat user A mengirim pesan, server langsung push pesan tersebut ke user B, C, D tanpa mereka perlu refresh atau polling.

#### ⚡ **Real-time**
Event terjadi seketika. Begitu server menerima event `kirimPesan`, dalam hitungan milidetik semua client di room tersebut sudah menerima event `pesan` dan merender pesan baru.

#### 📡 **Event-based**
Komunikasi tidak berdasarkan URL/endpoint, tapi berdasarkan **nama event**. Kita bebas mendefinisikan event seperti `join`, `kirimPesan`, `kirimLokasi`, dll. Setiap event punya handler masing-masing di kedua sisi:

```javascript
// Server mendengarkan event dari client
socket.on('kirimPesan', (pesan, callback) => { /* ... */ })

// Client mendengarkan event dari server
socket.on('pesan', (message) => { /* ... */ })
```

Pendekatan ini membuat kode lebih terstruktur dan mudah dikembangkan, karena setiap fitur punya event channel sendiri.

---

## 🚀 Cara Menjalankan Aplikasi

1. Install dependencies:
   ```bash
   npm install
   ```

2. Jalankan development server:
   ```bash
   npm run dev
   ```

3. Buka browser dan akses `http://localhost:3000`

4. Untuk testing multi-user, buka tab baru atau gunakan browser berbeda, lalu join ke room yang sama.

---

## 📦 Teknologi yang Digunakan

| Library | Fungsi |
|---------|--------|
| **Express.js** | Web server framework |
| **Socket.io** | Real-time communication |
| **bad-words** | Filter kata kasar |
| **Mustache.js** | HTML templating |
| **Moment.js** | Format waktu |
| **QS** | Parse query string |
| **Nodemon** | Auto-restart saat development |

---

## 📝 Catatan Pembelajaran

Jobsheet ini memberikan pemahaman mendalam tentang bagaimana aplikasi chat modern bekerja. Konsep Socket.io yang dipelajari di sini bisa diterapkan untuk berbagai use case lain seperti:

- 📊 Real-time dashboard/monitoring
- 🎮 Multiplayer games
- 📡 Live notifications
- 🤝 Collaborative editing tools
- 📹 Video call signaling

Socket programming adalah fondasi penting dalam pengembangan aplikasi web interaktif yang responsif dan modern.
