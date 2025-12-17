const express = require('express');
const fs = require('fs'); // NEW: Tool to read/write files
const app = express();
const PORT = process.env.PORT || 3000;

// Enable the Frontend
app.use(express.static('public'));

// 1. Memory Variables
let sensorData = { temp: 0, hum: 0, time: "" };

// 2. The Database Function (Fixed for Cloud)
function saveToDatabase(data) {
    let history = [];
    
    // A. Try to read the file. If it fails, that's okay!
    try {
        const fileContent = fs.readFileSync('database.json');
        history = JSON.parse(fileContent);
    } catch (e) {
        // File doesn't exist yet? No problem. We start with an empty list.
        console.log("Database missing. Creating new one...");
    }

    // B. Add new data
    history.push(data);

    // C. Limit size (Keep last 50)
    if (history.length > 50) {
        history.shift();
    }

    // D. Write back to file (This actually creates the file if missing)
    fs.writeFileSync('database.json', JSON.stringify(history, null, 2));
}
// 3. The Clock (Run every 5 seconds)
setInterval(() => {
    // Generate Random Data
    sensorData.temp = Math.floor(Math.random() * (35 - 20) + 20);
    sensorData.hum = Math.floor(Math.random() * (90 - 40) + 40);
    sensorData.time = new Date().toLocaleTimeString();

    // NEW: Save to History
    saveToDatabase(sensorData);
    console.log("Saved entry:", sensorData.time); 

}, 5000); // 5 Seconds (Slower speed for database safety)

// 4. Routes
app.get('/data', (req, res) => {
    res.json(sensorData); // Send current reading
});

// NEW: Route to see the Memory
app.get('/history', (req, res) => {
    const history = fs.readFileSync('database.json');
    res.json(JSON.parse(history)); // Send the whole list
});

// 5. Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server Live @ http://localhost:${PORT}`);
    console.log(`History available @ http://localhost:${PORT}/history`);
});