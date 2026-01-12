# 🚀 TechSwap Quick Start Guide

## Get Started in 3 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Initialize Database
```bash
npm run init-db
```

### Step 3: Start the Server
```bash
npm start
```

### Step 4: Open Your Browser
Visit: **http://localhost:3000**

---

## ✅ Stage 3 Deliverables Checklist

- ✅ **Website Link:** http://localhost:3000 (or deploy to cloud)
- ✅ **Functional Shopping Cart:** Add, update, remove items
- ✅ **Product Pages:** 8 tech products with detailed pages
- ✅ **User Account Setup:** Registration and login system
- ✅ **Guest Checkout:** Purchase without account
- ✅ **Payment Simulation:** Stripe test mode (use card: 4242 4242 4242 4242)
- ✅ **Homepage Design:** Complete with hero, categories, featured products
- ✅ **About Page:** Full company information

---

## 👤 Test Accounts

**Login with these demo accounts (password: demo123):**
- demo@student.edu
- buyer@student.edu
- seller@student.edu

---

## 💳 Test Payment Card

Use at checkout:
- **Card Number:** 4242 4242 4242 4242
- **Expiry:** Any future date (e.g., 12/26)
- **CVV:** Any 3 digits (e.g., 123)

---

## 🧪 Test the Features

### 1. Browse & Shop
- Visit homepage
- Click on a category
- View product details
- Add products to cart

### 2. Manage Cart
- View cart
- Update quantities
- Remove items
- See price breakdown with 8% commission

### 3. Checkout
- Choose shipping method (pickup or shipping)
- Enter contact info
- Use test card for payment
- View order confirmation

### 4. User Accounts
- Create new account
- Login with demo account
- View order history
- See account details

---

## 📂 Project Files

**Key Files:**
- `server.js` - Main server application
- `database.js` - Database helper functions
- `techswap-data.json` - JSON database
- `views/` - All EJS templates
- `public/css/style.css` - Styling
- `public/js/main.js` - Client-side JavaScript

---

## 🔧 Troubleshooting

**Port already in use?**
```bash
# Change port in .env file
PORT=3001
```

**Want to reset database?**
```bash
rm techswap-data.json
npm run init-db
```

**Dependencies not working?**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 🌐 Deployment

### Deploy to Render.com (Free)
1. Push code to GitHub
2. Sign up at https://render.com
3. Create new Web Service
4. Connect your repo
5. Build command: `npm install && npm run init-db`
6. Start command: `npm start`
7. Deploy!

### Deploy to Railway.app (Free)
1. Push code to GitHub
2. Sign up at https://railway.app
3. New Project → Deploy from GitHub
4. Select your repo
5. Automatically deploys!

---

## 📧 Support

Created by: Donovan McHenry
Course: IT 310 E-Commerce
Project: Stage 3 - Functional E-Commerce Site
Date: January 2026

---

**Made with ❤️ for IT 310**
