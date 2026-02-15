# Random Quote Generator (Full Stack)

A full-stack quote generator web app built with a custom frontend, a Node.js backend, and a MongoDB database.  
The project supports quote categories, dark/light mode, animations, and avoids repeated quotes.

---

## 🚀 Live Demo
Frontend (GitHub Pages):  
👉 [Click Me!](https://techgenius-karan.github.io/Random-quote-generator-upgraded/)

Backend API (Render):  
👉 [Click Me!](https://quote-generator-5qei.onrender.com/)

---

## 🧠 Features
- Random quote generation
- Quote categories with toggle selection
- No-repeat quote logic
- Dark / Light mode toggle
- Copy quote to clipboard
- Smooth UI animations
- Fully deployed backend & database

---

## 🛠 Tech Stack

### Frontend
- HTML
- CSS
- Vanilla JavaScript
- GitHub Pages (hosting)

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Render (deployment)

---

## 📂 Project Structure

/
├── index.html
├── style.css
├── script.js
├── backend/
│ ├── server.js
│ └── models/
│ └── Quote.js
└── README.md

---

## 🔌 API Endpoints

- `GET /quotes`  
  Returns all quotes

- `GET /quotes/category/:category`  
  Returns quotes filtered by category

- `POST /quotes`  
  Adds a new quote (for future admin use)

---

## ⚠️ Notes
- GitHub Pages hosts only the frontend (static files).
- The backend runs separately on Render.
- MongoDB Atlas is used for cloud database storage.

---

## 📌 Future Improvements
- AI-generated quotes by category
- Image-based quotes
- Search quotes by keyword
- Admin dashboard for managing quotes

---

## 👨‍💻 Author
Karan Mhetar  
