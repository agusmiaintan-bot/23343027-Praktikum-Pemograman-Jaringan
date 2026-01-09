# Jobsheet 9 - Socket Programming: RuangNgobrol

Di bawah ini adalah jawaban atas pertanyaan yang diminta, mengacu pada kode di folder aplikasi ruangngobrol.

## 1) Perbedaan fungsi `socket.on` di `src/index.js` dan `public/js/chat.js`
- Server (`src/index.js`): `socket.on` mendaftarkan handler untuk event yang dikirim DARI klien KE server. Contoh:
  - `socket.on('join', ...)`: menerima data pengguna dan melakukan `socket.join(user.room)` agar socket bergabung ke ruangan tertentu, lalu broadcast status ke semua klien di ruangan tersebut.
  - `socket.on('kirimPesan', ...)`: menerima pesan teks dari klien, mem-filter kata kasar, kemudian memancarkan event `pesan` ke semua klien di ruangan.
  - `socket.on('kirimLokasi', ...)`: menerima koordinat dari klien, membentuk URL Google Maps, lalu memancarkan `locationMessage` ke ruangan.
  - `socket.on('disconnect', ...)`: merespons saat klien terputus, menghapus user dari state server, dan broadcast notifikasi keluar.
- Klien (`public/js/chat.js`): `socket.on` mendaftarkan listener untuk event yang dikirim DARI server KE klien. Contoh:
  - `socket.on('pesan', ...)`: menerima objek pesan (username, text, createdAt) dan merendernya via Mustache ke daftar pesan.
  - `socket.on('locationMessage', ...)`: menerima URL lokasi dan merender tautan lokasi.
  - `socket.on('roomData', ...)`: menerima info ruangan dan daftar pengguna, lalu merender sidebar.

Intinya: `socket.on` di server menangani event yang datang dari klien; `socket.on` di klien menangani event yang datang dari server.

## 2) Investigasi Console saat proses chat
Selama chat, buka DevTools → Console.
- Pada klien, setiap kali event diterima, kita mencetak ke console:
  - `socket.on('pesan', ...)`: `console.log('pesan diterima:', message)` menampilkan objek pesan dengan `username`, `text`, dan `createdAt`.
  - `socket.on('locationMessage', ...)`: `console.log('locationMessage diterima:', message)` menampilkan objek lokasi dengan `url` dan `createdAt`.
  - `socket.on('roomData', ...)`: `console.log('roomData diperbarui:', { room, users })` menampilkan ruangan aktif dan array pengguna.
Ketika kita mengirim pesan via form, server memprosesnya dan memancarkan kembali event `pesan` ke semua klien di ruangan. Itulah yang Anda lihat di Console karena handler di klien mencetak payload sebelum merender.

## 3) Fungsi library Mustache, Moment, dan QS
- Mustache (template HTML di `chat.html`): digunakan untuk merender konten dinamis. Contoh di klien, kita ambil template `#message-template` dan memanggil `Mustache.render` dengan data `{ username, message, createdAt }` untuk menghasilkan markup pesan.
- Moment: memformat timestamp `createdAt` menjadi format jam/menit yang ramah, misalnya `moment(message.createdAt).format('H:mm')`.
- QS: mem-parsing query string dari URL `chat.html` (hasil form di `index.html`) menjadi object `{ username, room }` melalui `Qs.parse(location.search, { ignoreQueryPrefix: true })`.

Ketiganya bersama-sama membuat UI mudah dirender (Mustache), waktu ditampilkan rapih (Moment), dan data form ruangan/nama terbaca di klien (QS).

## 4) Penjelasan bagian Elements, Templates, dan Options di `chat.js`
- Elements: referensi ke elemen DOM seperti form pesan, input, tombol share lokasi, dan container pesan. Ini menghubungkan JS dengan struktur HTML di `chat.html` (form `#form-pesan`, tombol `#kirim-lokasi`, container `#messages`).
- Templates: mengambil isi template `<script type="text/html">` di `chat.html` (message, locationMessage, sidebar) agar bisa dirender secara dinamis dengan Mustache.
- Options: `{ username, room }` dibaca dari query string di URL `chat.html`, yang berasal dari form di `index.html`. Nilai-nilai ini dipakai saat `socket.emit('join', { username, room })` agar server tahu ruangan mana dan siapa pengguna yang bergabung.

## 5) Fungsi `messages.js` dan `users.js` serta keterhubungannya
- `messages.js`: menyediakan `generateMessage(username, text)` dan `generateLocationMessage(username, url)`. Server memanggil fungsi ini untuk membuat payload pesan yang konsisten (berisi `username`, `text`/`url`, `createdAt`). Klien kemudian menerima payload ini melalui event `pesan` dan `locationMessage` dan merendernya.
- `users.js`: mengelola state pengguna dalam memori (array `users`).
  - `tambahPengguna({ id, username, room })`: validasi dan menambahkan user ke sebuah room.
  - `hapusPengguna(id)`: menghapus user saat disconnect.
  - `ambilPengguna(id)`: mendapatkan user berdasarkan socket id.
  - `ambilPenggunaDariRoom(room)`: mendapatkan semua user dalam satu room.
Server (`index.js`) menggunakan modul ini untuk logika ruangan. Hasilnya memengaruhi event yang dipancarkan ke klien (`roomData`, `pesan`). Klien (`chat.js`) merender berdasarkan payload tersebut. File HTML mendefinisikan struktur tempat data dirender.

## 6) Bagaimana aplikasi mengirimkan lokasi
- Klien: saat klik tombol "Share Lokasi", kode memanggil `navigator.geolocation.getCurrentPosition` untuk mendapatkan `latitude` dan `longitude`, lalu `socket.emit('kirimLokasi', { latitude, longitude })` ke server.
- Server: menangkap event `kirimLokasi`, membentuk URL Google Maps `https://www.google.com/maps?q=lat,lng`, lalu memancar `locationMessage` ke semua klien di room. Klien menerima event tersebut dan merender tautan lokasi di chat.

## 7) Perbedaan `npm run dev` dan `npm run start`
- `npm run dev`: menjalankan `nodemon src/index.js`. Nodemon memantau perubahan file dan otomatis me-restart server saat ada perubahan—ideal untuk pengembangan.
- `npm run start`: menjalankan `node src/index.js` satu kali, tanpa auto-restart—cocok untuk mode produksi atau eksekusi langsung.
Menjalankan dengan `node` manual (seperti jobsheet sebelumnya) tidak memberi auto-restart; di sini kita ingin workflow dev yang lebih cepat, sehingga `dev` dipakai.

## 8) Fungsi socket lain yang digunakan
- Di klien:
  - `socket.emit('kirimPesan', ...)`: mengirim event ke server saat user mengirim pesan.
  - `socket.emit('kirimLokasi', ...)`: mengirim koordinat lokasi ke server.
  - `socket.emit('join', ...)`: mengirim data awal untuk bergabung ke room.
- Di server:
  - `socket.join(room)`: memasukkan socket ke room tertentu.
  - `io.to(room).emit(...)`: memancarkan event ke semua socket yang berada di room tersebut.
  - `socket.broadcast.to(room).emit(...)`: memancarkan ke room, tapi tidak termasuk pengirim.
  - `io.emit(...)`: memancarkan ke semua koneksi (tidak dibatasi room) — di app ini kita lebih banyak menggunakan broadcast ke room.

## 9) Real-time bidirectional event-based communication
Aplikasi ini bekerja dua arah secara real-time menggunakan event:
- Arah klien → server: klien memanggil `socket.emit('kirimPesan', pesan)` dan `socket.emit('kirimLokasi', coords)`.
- Arah server → klien: server memanggil `io.to(room).emit('pesan', payload)` atau `io.to(room).emit('locationMessage', payload)`.
Keuntungan pendekatan berbasis event: kita mendaftarkan handler dengan `socket.on('namaEvent', handler)` di kedua sisi. Saat event dipancarkan, handler terkait dieksekusi segera, sehingga pesan/lokasi muncul seketika tanpa reload halaman.
