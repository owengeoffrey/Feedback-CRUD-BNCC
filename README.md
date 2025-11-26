# BNCC Event Feedback System

Aplikasi web sederhana untuk mengumpulkan dan mengelola feedback peserta acara BNCC. Dibangun dengan **Express.js** dan **Vanilla HTML/CSS** dengan tampilan modern dan performa ringan.

## 🛠️ Tech Stack
* **Backend:** Node.js & Express.js
* **Frontend:** Vanilla HTML, CSS (Modern Clean UI), JavaScript
* **Database:** JSON File (`data.json`) - *No SQL/No Mongo required*
* **Features:** REST API, CORS enabled

## ✨ Fitur Utama
1.  **Public Feedback Form**
    * UI Modern dengan konsep *Floating Card* & *Header Gradient*.
    * Input validasi dan animasi loading.
2.  **Admin Dashboard**
    * Manajemen data (View, Update Status, Delete).
    * Fitur **Search** real-time.
    * Indikator status visual (Badge warna).
3.  **Data Persistence**
    * Data tersimpan otomatis di file `data.json`.
    * Log aktivitas tersimpan di Terminal server.

## 📦 Cara Install & Menjalankan

Pastikan kamu sudah menginstall **Node.js** di komputer.

1.  **Clone/Download** repository ini.
2.  Buka terminal di folder project, lalu install dependencies:
    ```bash
    npm install
    ```
    *(Ini akan menginstall express, cors, dan body-parser)*

3.  Jalankan server:
    ```bash
    node server.js
    ```

4.  Buka aplikasi di browser:
    * 📝 **Form Peserta:** [http://localhost:3000](http://localhost:3000)
    * 📊 **Admin Panel:** [http://localhost:3000/admin.html](http://localhost:3000/admin.html)

## 🔌 API Endpoints

| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/api/feedback` | Ambil semua data feedback |
| `POST` | `/api/feedback` | Tambah feedback baru |
| `PUT` | `/api/feedback/:id` | Update status feedback |
| `DELETE` | `/api/feedback/:id` | Hapus feedback |

## 📂 Struktur Folder
```text
/
├── public/
│   ├── index.html    # Halaman Utama (Form)
│   └── admin.html    # Halaman Admin
├── data.json         # Tempat penyimpanan data
├── server.js         # Main Backend Code
└── package.json      # Config Dependencies
