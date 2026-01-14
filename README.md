# 🚀 GigFlow - Premium Freelance Marketplace

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue.svg)](https://mongodb.com)
[![Socket.io](https://img.shields.io/badge/Real--time-Socket.io-black.svg)](https://socket.io)
[![License-MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

GigFlow is a modern, high-performance freelance marketplace platform built with the MERN stack. It features a sleek glassmorphism UI, real-time notifications, and a robust bidding system.

---

## 📺 Project Demo
**[Watch the Full Walkthrough Video](https://drive.google.com/file/d/1oEtK5ehhGbLvIwj4b6tKwk95sfg9NUak/view?usp=sharing)**

---

## ✨ Key Features

### 🛠️ For Clients (Gig Owners)
- **Post Gigs**: Create detailed project listings with categories and budgets.
- **Manage Bids**: Review applications from freelancers in real-time.
- **One-Click Hiring**: Seamlessly hire the best candidate (automatically rejects other bids).
- **Gig Management**: Delete or update your posted gigs easily.
- **Real-time Alerts**: Get notified instantly when someone bids on your gig.

### 💼 For Freelancers
- **Browse Opportunities**: Search and filter through open gigs.
- **Smart Bidding**: Submit professional proposals with custom pricing.
- **Instant Notifications**: Get a "🎉 Hired" alert the moment a client chooses you.
- **My Bids Dashboard**: Track the status of all your applications.

---

## 📸 Screenshots

### 🖥️ Dashboard - My Posted Gigs
![My Posted Gigs](https://raw.githubusercontent.com/Annu881/GigFlow/main/screenshots/dashboard.png)

### 📄 Gig Details & Bidding
![Gig Details](https://raw.githubusercontent.com/Annu881/GigFlow/main/screenshots/gig_details.png)

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Redux Toolkit, Tailwind CSS, Socket.io-client
- **Backend**: Node.js, Express.js, Socket.io, JWT (HttpOnly Cookies)
- **Database**: MongoDB + Mongoose
- **Styling**: Modern Glassmorphism & Gradient UI

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/Annu881/GigFlow.git
cd gigflow
```

### 2. Backend Setup
```bash
cd backend
npm install
# Create .env with MONGO_URI, JWT_SECRET, and CLIENT_URL
npm run dev
```
> [!TIP]
> The backend now includes **automated port clearing**. If port 5000 is in use, it will automatically clear it before starting!

### 3. Frontend Setup
```bash
cd ../frontend
npm install
# Create .env with VITE_API_URL and VITE_SOCKET_URL
npm run dev
```

---

## 🔒 Security & Performance
- **JWT Authentication**: Secure sessions using HttpOnly cookies to prevent XSS.
- **Atomic Transactions**: MongoDB logic ensures hiring is a safe, all-or-nothing operation.
- **Real-time Engine**: Optimized Socket.io rooms for minimal latency.
- **Clean Code**: Modular architecture for easy scalability.

---

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---

**Built with ❤️ by [Annu Rana](https://github.com/Annu881)**
