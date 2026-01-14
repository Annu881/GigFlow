# 🚀 GigFlow: The Ultimate Freelance Marketplace

![GigFlow Banner](https://raw.githubusercontent.com/Annu881/GigFlow/main/screenshots/dashboard.png)

GigFlow is a premium, full-stack freelance marketplace designed for speed, security, and a seamless user experience. Built with the **MERN Stack** (MongoDB, Express, React, Node.js) and powered by **Socket.io** for real-time interactions, it offers a modern alternative to traditional platforms.

---

## 📺 Live Demo & Walkthrough
Experience GigFlow in action: **[Watch the Demo Video](https://drive.google.com/file/d/1oEtK5ehhGbLvIwj4b6tKwk95sfg9NUak/view?usp=sharing)**

---

## ✨ Key Features

### 💎 Premium User Experience
- **Glassmorphism UI**: A stunning, modern interface with vibrant gradients and smooth transitions.
- **Real-time Notifications**: Instant alerts for new gigs, bids, and hiring status via Socket.io.
- **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile devices.

### 🛠️ For Clients (Project Owners)
- **Effortless Posting**: Create gigs with detailed descriptions, categories, and budgets.
- **Bid Management**: Review all freelancer proposals in one centralized dashboard.
- **Smart Hiring**: One-click hiring that automatically manages bid statuses and notifies the freelancer.
- **Gig Control**: Full CRUD capabilities to manage your project listings.

### 💼 For Freelancers
- **Advanced Search**: Find the perfect project using real-time search and category filters.
- **Professional Bidding**: Submit proposals with custom messages and competitive pricing.
- **Status Tracking**: Monitor all your active bids and their current status (Pending, Hired, Rejected).

---

## 📸 Visual Overview

| Dashboard View | Gig Details & Bidding |
| :---: | :---: |
| ![Dashboard](https://raw.githubusercontent.com/Annu881/GigFlow/main/screenshots/dashboard.png) | ![Gig Details](https://raw.githubusercontent.com/Annu881/GigFlow/main/screenshots/gig_details.png) |

---

## 🛠️ Technology Stack

### Frontend
- **React 18** (Vite) for blazing-fast performance.
- **Redux Toolkit** for robust state management.
- **Tailwind CSS** for a modern, utility-first design system.
- **Socket.io-client** for real-time bidirectional communication.

### Backend
- **Node.js & Express** for a scalable API architecture.
- **MongoDB & Mongoose** for flexible and efficient data storage.
- **Socket.io** for real-time event handling.
- **JWT (JSON Web Tokens)** with HttpOnly cookies for secure authentication.

---

## 🚀 Quick Start Guide

### 1. Clone the Repository
```bash
git clone https://github.com/Annu881/GigFlow.git
cd gigflow
```

### 2. Backend Configuration
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
PORT=5000
CLIENT_URL=http://localhost:5173
```
Start the backend:
```bash
npm run dev
```
> [!NOTE]
> **Smart Port Management**: The backend automatically detects and clears port 5000 if it's already in use, ensuring a smooth development experience.

### 3. Frontend Configuration
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```
Start the frontend:
```bash
npm run dev
```

---

## 🔒 Security & Architecture
- **HttpOnly Cookies**: Protects against XSS attacks by storing JWTs securely.
- **Atomic Operations**: MongoDB logic ensures that hiring processes are consistent and error-free.
- **Modular Codebase**: Clean separation of concerns between controllers, models, and routes.
- **Real-time Rooms**: Socket.io rooms ensure notifications are delivered only to the intended users.

---

## 🤝 Contributing
We welcome contributions! 
1. **Fork** the repo.
2. **Create** your feature branch.
3. **Commit** your changes.
4. **Push** to the branch.
5. **Open** a Pull Request.

---

## 📄 License
This project is licensed under the **MIT License**.

---

**Developed with passion by [Annu Rana](https://github.com/Annu881)**
