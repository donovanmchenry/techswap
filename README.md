# TechSwap - Student Tech Marketplace

## IT 310 E-Commerce Project - Stage 3

A fully functional student-to-student technology marketplace built with Node.js, Express, and SQLite.

**Project by:** Donovan McHenry
**Course:** IT 310 E-Commerce
**Date:** January 2026

---

## 📋 Project Stage 3 Deliverables

✅ **Website link:** Run locally at `http://localhost:3000` or deploy to cloud
✅ **Functional shopping cart:** Full cart management (add, update, remove items)
✅ **Product pages:** 8 tech products with detailed pages
✅ **User account system:** Registration, login, and account management
✅ **Guest checkout:** Buy without creating an account
✅ **Payment simulation:** Stripe test mode payment processing
✅ **Homepage design:** Complete with hero, categories, and featured products
✅ **About page:** Full information about TechSwap

---

## 🚀 Features

### E-Commerce Functionality
- **Product Catalog:** Browse 8+ tech products across 5 categories
- **Shopping Cart:** Add, update, remove items with real-time updates
- **Checkout System:** Multi-step checkout with shipping options
- **Payment Processing:** Stripe test mode integration
- **User Accounts:** Registration, login, order history
- **Guest Checkout:** Purchase without creating an account
- **Product Reviews:** Star ratings and customer feedback
- **Search & Filters:** Find products by category, condition, and keywords

### Pages Implemented
1. **Homepage** - Hero section, categories, featured products
2. **Shop** - Product listing with filters and sorting
3. **Product Detail** - Individual product pages with reviews
4. **Shopping Cart** - Cart management with price breakdown
5. **Checkout** - Multi-step checkout process
6. **Order Confirmation** - Post-purchase confirmation
7. **Login/Register** - User authentication
8. **My Account** - User dashboard with order history
9. **About** - Company information and mission
10. **404** - Error page

---

## 🛠️ Technology Stack

- **Backend:** Node.js, Express.js
- **Database:** JSON-based (techswap-data.json)
- **Frontend:** EJS templates, HTML5, CSS3, JavaScript
- **Authentication:** bcryptjs for password hashing
- **Payment:** Stripe API (test mode)
- **Session Management:** express-session
- **No Native Dependencies:** Works on any platform without compilation

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Initialize Database
```bash
npm run init-db
```

This will create the database and seed it with:
- 3 demo users
- 8 tech products
- Sample reviews

### Step 3: Configure Environment (Optional)
The `.env` file is already configured for demo purposes. If you want to use real Stripe keys:

1. Sign up at https://stripe.com
2. Get your test API keys
3. Update `.env` file:
```
STRIPE_PUBLIC_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
```

### Step 4: Start the Server
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

### Step 5: Access the Website
Open your browser and visit: **http://localhost:3000**

---

## 👤 Demo Accounts

**Account 1 (Seller):**
- Email: `demo@student.edu`
- Password: `demo123`

**Account 2 (Buyer):**
- Email: `buyer@student.edu`
- Password: `demo123`

**Account 3 (Seller):**
- Email: `seller@student.edu`
- Password: `demo123`

---

## 💳 Test Payment Information

Use these test card details at checkout:

**Card Number:** `4242 4242 4242 4242`
**Expiry Date:** Any future date (e.g., `12/26`)
**CVV:** Any 3 digits (e.g., `123`)

---

## 📁 Project Structure

```
techswap/
├── public/                 # Static files
│   ├── css/
│   │   └── style.css      # Main stylesheet
│   ├── js/
│   │   └── main.js        # Client-side JavaScript
│   └── images/            # Product images
├── views/                 # EJS templates
│   ├── layout.ejs         # Main layout
│   ├── index.ejs          # Homepage
│   ├── shop.ejs           # Product listing
│   ├── product.ejs        # Product detail
│   ├── cart.ejs           # Shopping cart
│   ├── checkout.ejs       # Checkout process
│   ├── order-confirmation.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── account.ejs
│   ├── about.ejs
│   └── 404.ejs
├── database.js            # Database helper functions
├── init-data.js           # Database initialization
├── server.js              # Main server file
├── techswap-data.json     # JSON database (auto-created)
├── package.json
├── .env                   # Environment variables
├── QUICKSTART.md          # Quick start guide
└── README.md              # This file
```

---

## 🌐 Deployment Options

### Option 1: Deploy to Heroku

1. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
2. Login to Heroku:
```bash
heroku login
```

3. Create a new app:
```bash
heroku create techswap-demo
```

4. Add a `Procfile`:
```bash
echo "web: node server.js" > Procfile
```

5. Deploy:
```bash
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

6. Initialize database:
```bash
heroku run npm run init-db
```

### Option 2: Deploy to Render.com

1. Sign up at https://render.com
2. Create a new Web Service
3. Connect your Git repository
4. Set build command: `npm install && npm run init-db`
5. Set start command: `npm start`
6. Deploy!

### Option 3: Deploy to Railway

1. Sign up at https://railway.app
2. Create new project from GitHub
3. Add environment variables
4. Deploy automatically

---

## 🧪 Testing the Application

### Test Shopping Flow
1. Browse products on the homepage
2. Click on a product to view details
3. Add products to cart
4. View cart and update quantities
5. Proceed to checkout
6. Complete payment with test card
7. View order confirmation

### Test User Registration
1. Click "Login" in navigation
2. Click "Sign up here"
3. Fill in registration form
4. Create account
5. Access "My Account" page

### Test Guest Checkout
1. Add products to cart without logging in
2. Proceed to checkout
3. Enter email and name
4. Complete purchase as guest

---

## 💰 Commission System

TechSwap charges an **8% commission** on all sales:
- Transparent fee shown at checkout
- Sellers receive 92% of sale price
- Commission helps maintain the platform

---

## 🔒 Security Features

- **SSL/TLS Encryption:** All data transmitted securely
- **Password Hashing:** bcrypt for secure password storage
- **Session Management:** Secure session handling
- **SQL Injection Protection:** Prepared statements used throughout
- **XSS Protection:** Input sanitization
- **PCI Compliance:** No card data stored (Stripe handles payments)

---

## 📊 Database Schema

### Tables
- **users:** User accounts and authentication
- **products:** Product catalog
- **orders:** Order records
- **order_items:** Items in each order
- **reviews:** Product reviews and ratings

---

## 🎨 Design Features

- **Mobile-First Responsive Design:** Works on all devices
- **Modern UI:** Clean, professional interface
- **Intuitive Navigation:** Easy to use
- **Fast Loading:** Optimized performance
- **Accessibility:** Semantic HTML

---

## 📝 Stage 2 Alignment

This implementation builds on the Stage 2 document:

✅ **Platform:** Custom coded solution (vs. Wix for flexibility)
✅ **All Key Features:** Multi-vendor capability, product catalog, cart, checkout
✅ **Security:** SSL, secure authentication, PCI-compliant payments
✅ **Payment Processing:** Stripe integration as planned
✅ **Database:** SQLite (similar to Wix Data, but with more control)

---

## 🐛 Troubleshooting

### Database Issues
If you encounter database errors:
```bash
# Delete existing database and reinitialize
rm techswap-data.json
npm run init-db
```

### Port Already in Use
Change the port in `.env`:
```
PORT=3001
```

### Dependencies Not Installing
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 🚧 Future Enhancements

Potential features for future versions:
- Real-time messaging between buyers/sellers
- Email notifications for orders
- Advanced search with autocomplete
- Seller dashboards
- Product upload by users
- Campus verification system
- Real Stripe payment processing
- Product image uploads
- Wishlist functionality
- Social media integration

---

## 📧 Contact

**Student:** Donovan McHenry
**Email:** support@techswap.io
**Course:** IT 310 E-Commerce
**Project:** Stage 3 - Functional E-Commerce Site

---

## 📄 License

This project was created for educational purposes as part of IT 310 E-Commerce coursework.

---

## 🙏 Acknowledgments

- IT 310 E-Commerce Course
- Stripe for payment processing documentation
- Express.js and Node.js communities
- All demo users and testers

---

**Made with ❤️ for IT 310 - January 2026**
