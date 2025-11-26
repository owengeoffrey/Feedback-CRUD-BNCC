const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// --- MIDDLEWARE ---
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); 

// --- DATABASE LOGIC ---
const readData = () => {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([]));
        return [];
    }
    const data = fs.readFileSync(DATA_FILE);
    try { return JSON.parse(data); } catch (err) { return []; }
};

const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// --- ROUTES ---

// 1. GET ALL
app.get('/api/feedback', (req, res) => {
    const feedbackList = readData();
    res.json(feedbackList);
});

// 2. CREATE NEW
app.post('/api/feedback', (req, res) => {
    const { name, email, eventName, division, rating, comment, suggestion } = req.body;

    if (!name || !email || !eventName || !division || !rating) {
        return res.status(400).json({ message: "Data tidak lengkap!" });
    }

    const feedbackList = readData();
    
    const newFeedback = {
        id: Date.now().toString(),
        name,
        email,
        eventName,
        division,
        rating: Number(rating),
        comment: comment || "-",
        suggestion: suggestion || "-",
        createdAt: new Date().toISOString(),
        status: "open"
    };

    feedbackList.push(newFeedback);
    writeData(feedbackList);

    // --- LOG KE TERMINAL (SUDAH DIPERBAIKI) ---
    console.log('\n================================');
    console.log('✅ DATA FEEDBACK BARU MASUK!');
    console.log(`👤 Nama   : ${name}`);
    console.log(`📧 Email  : ${email}`);
    console.log(`🎉 Event  : ${eventName}`);
    console.log(`⭐ Rating : ${rating}/5`);
    console.log(`💬 Komen  : ${comment || "-"}`);
    console.log(`💡 Saran  : ${suggestion || "-"}`); // <-- INI YANG BARU
    console.log('================================\n');
    // ------------------------------------------

    res.status(201).json({ message: "Feedback tersimpan", data: newFeedback });
});

// 3. UPDATE
app.put('/api/feedback/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    let feedbackList = readData();
    const index = feedbackList.findIndex(item => item.id === id);

    if (index !== -1) {
        feedbackList[index] = { ...feedbackList[index], ...updates };
        writeData(feedbackList);
        console.log(`🔄 Status update untuk ID ${id}: ${updates.status || 'Updated'}`);
        res.json({ message: "Update berhasil", data: feedbackList[index] });
    } else {
        res.status(404).json({ message: "ID tidak ditemukan" });
    }
});

// 4. DELETE
app.delete('/api/feedback/:id', (req, res) => {
    const { id } = req.params;
    let feedbackList = readData();
    const newList = feedbackList.filter(item => item.id !== id);
    
    writeData(newList);
    console.log(`🗑️ Data feedback ID ${id} berhasil dihapus.`);
    res.json({ message: "Data berhasil dihapus" });
});

app.listen(PORT, () => {
    console.log(`Server Backend nyala di http://localhost:${PORT}`);
    console.log('Menunggu data masuk...');
});