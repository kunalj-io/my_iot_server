const express = require('express');
const fs = require('fs'); 
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

let sensorData = { temp: 0, hum: 0, time: "" };

function saveToDatabase(data) {
    let history = [];
    
    try {
        const fileContent = fs.readFileSync('database.json');
        history = JSON.parse(fileContent);
    } catch (e) {

        console.log("Database missing. Creating new one...");
    }

    history.push(data);

    if (history.length > 50) {
        history.shift();
    }

    fs.writeFileSync('database.json', JSON.stringify(history, null, 2));
}
setInterval(() => {
    sensorData.temp = Math.floor(Math.random() * (35 - 20) + 20);
    sensorData.hum = Math.floor(Math.random() * (90 - 40) + 40);
    sensorData.time = new Date().toLocaleTimeString();

    saveToDatabase(sensorData);
    console.log("Saved entry:", sensorData.time); 

}, 5000);


app.get('/data', (req, res) => {
    res.json(sensorData); 
});

app.get('/history', (req, res) => {
    const history = fs.readFileSync('database.json');
    res.json(JSON.parse(history));
});


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server Live @ http://localhost:${PORT}`);
    console.log(`History available @ http://localhost:${PORT}/history`);
});