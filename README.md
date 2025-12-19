# IoT Mission Control Dashboard

![Status](https://img.shields.io/badge/Status-Live-success)
![Tech](https://img.shields.io/badge/Stack-Node.js%20%7C%20Express-blue)
![Mobile](https://img.shields.io/badge/Mobile-Compatible-orange)

A Full-Stack IoT Dashboard that simulates sensor data (Temperature & Humidity), serves it via a REST API, and visualizes it on a real-time Dark Mode UI.

## 🔗 Live Demo
**[Click here to see the Dashboard Live](https://iot-dashboard-kunal.onrender.com)**
*(Note: It may take 30s to wake up since it's on a free cloud tier)*

---

## 🧠 How It Works
1.  **The Brain (Backend):** A `Node.js` server generates random sensor data every 2 seconds.
2.  **The Memory (Database):** Uses a file-based system (`database.json`) to remember history even after restarts.
3.  **The Face (Frontend):** A Dark Mode HTML/CSS dashboard fetches data via the `/data` API.
4.  **The Cloud:** Deployed on **Render** (Singapore Region).

---

## 🛠️ Tech Stack
* **Backend:** Node.js, Express.js, File System (fs)
* **Frontend:** HTML5, CSS3, Vanilla JavaScript (Fetch API)
* **Deployment:** Render Cloud, Git

---

## 📸 Features
* ✅ **Real-time Data:** Updates every 2 seconds without page refresh.
* ✅ **Persistence:** Saves history to a JSON database.
* ✅ **Mobile Responsive:** Works on Phone and Laptop.
* ✅ **API Endpoints:**
    * `GET /` -> The Dashboard
    * `GET /data` -> Raw JSON Data
    * `GET /history` -> Past Sensor Readings

---

### Author
Built by **Kunal Jadhav** as part of a 7-Day Sprint.