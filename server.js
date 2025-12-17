const express = require('express');
const fs = require('fs'); // NEW: Tool to read/write files
const app = express();
const PORT = 3000;

// Enable the Frontend
app.use(express.static('public'));

// 1. Memory Variables
let sensorData = { temp: 0, hum: 0, time: "" };

// 2. NEW: The Database Function
function saveToDatabase(data) {
    try {
        // A. Read the current list from the file
        const fileContent = fs.readFileSync('database.json');
        let history = JSON.parse(fileContent);

        // B. Add the new reading
        history.push(data);

        // C. Keep only the last 50 readings (so the file doesn't get huge)
        if (history.length > 50) {
            history.shift(); // Remove the oldest one
        }

        // D. Save it back to the file
        fs.writeFileSync('database.json', JSON.stringify(history, null, 2));
    } catch (error) {
        console.log("Database Error:", error);
    }
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