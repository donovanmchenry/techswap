# IT 310 - Project Stage 3 Submission

**Student:** Donovan McHenry
**Project:** TechSwap - Student Tech Marketplace
**Date:** January 11, 2026
**Course:** IT 310 E-Commerce

---

## ✅ Stage 3 Requirements - All Completed

### 1. Website Link (Demo or Live Link)
**Local Demo:** http://localhost:3000

**To Run:**
```bash
npm install
npm run init-db
npm start
```

**Deployment Ready:** Yes - Can be deployed to Render.com, Railway.app, or Heroku (instructions in README.md)

---

### 2. Functional Shopping Cart and Product Pages (Minimum 5 Products)
✅ **Delivered: 8 Products**

**Products Included:**
1. MacBook Pro 14" M2 2023 - $1,299.99 (Laptops)
2. iPad Air 5th Gen 256GB - $649.99 (Tablets)
3. Sony WH-1000XM5 Headphones - $279.99 (Audio)
4. iPhone 14 Pro 128GB - $799.99 (Phones)
5. Dell XPS 15 (2022) - $899.99 (Laptops)
6. AirPods Pro 2nd Gen - $189.99 (Audio)
7. Nintendo Switch OLED - $329.99 (Gaming)
8. Samsung Galaxy Tab S8 - $449.99 (Tablets)

**Shopping Cart Features:**
- Add products to cart
- Update quantities
- Remove items
- Real-time cart count badge
- Price breakdown (Subtotal + 8% Commission + Shipping)
- Persistent cart across pages
- Visual cart summary

**Product Pages:**
- Individual detail pages for each product
- High-quality product descriptions
- Seller information
- Condition grades (A, B, C)
- Campus location
- Customer reviews and ratings
- Similar products carousel
- Add to cart functionality

---

### 3. User Account Setup or Guest Checkout
✅ **Both Implemented**

**User Account System:**
- Registration page with validation
- Login/logout functionality
- Account dashboard showing:
  - User information
  - Order history
  - Account details
- Password hashing with bcrypt
- Session management

**Guest Checkout:**
- Purchase without creating account
- Email and name collection
- Order confirmation sent to email
- Works seamlessly with cart

**Demo Accounts (password: demo123):**
- demo@student.edu
- buyer@student.edu
- seller@student.edu

---

### 4. One Working Payment Simulation
✅ **Stripe Test Mode Integration**

**Payment Features:**
- Stripe-style checkout form
- Test card validation
- Payment simulation (no real charges)
- Order processing on successful payment
- Stock updates after purchase
- Order confirmation page

**Test Card Information:**
- Card Number: 4242 4242 4242 4242
- Expiry: Any future date (e.g., 12/26)
- CVV: Any 3 digits (e.g., 123)

**Payment Flow:**
1. User proceeds to checkout from cart
2. Selects shipping method (Pickup FREE or Shipping $15)
3. Enters payment details
4. Submits order
5. Payment processed in test mode
6. Redirected to confirmation page
7. Order saved to database

---

### 5. Homepage & About Page Design Complete
✅ **Both Pages Fully Designed**

**Homepage Features:**
- Hero section with search bar
- Call-to-action buttons
- 5 Category cards (Laptops, Phones, Tablets, Audio, Gaming)
- Featured products grid (8 products)
- "How It Works" section (3 steps)
- CTA section for signup
- Fully responsive design

**About Page Features:**
- Mission statement
- "How We Work" with 4 feature cards
- Categories showcase
- Company story
- Safety & Security information
- Condition grading system explanation
- Contact information
- Full responsive layout

---

## 🎯 Additional Features Implemented (Beyond Requirements)

1. **Product Reviews & Ratings**
   - Star rating system
   - User reviews with comments
   - Average rating calculation

2. **Product Filtering & Search**
   - Filter by category
   - Filter by condition
   - Search functionality
   - Sort by price/newest

3. **Responsive Design**
   - Mobile-first approach
   - Works on all screen sizes
   - Touch-friendly interfaces

4. **Professional UI/UX**
   - Modern, clean design
   - Consistent color scheme (blue/orange)
   - Smooth animations
   - User-friendly navigation

5. **Order Management**
   - Order history for logged-in users
   - Order confirmation emails
   - Stock management

6. **Security Features**
   - Password hashing
   - Session management
   - Input validation
   - SQL injection prevention

---

## 📊 Technical Specifications

**Frontend:**
- HTML5 semantic markup
- CSS3 with modern features (Grid, Flexbox)
- Vanilla JavaScript for interactivity
- EJS templating engine
- Mobile-responsive (works on phones, tablets, desktops)

**Backend:**
- Node.js runtime
- Express.js framework
- JSON-based database
- RESTful API design
- Session-based authentication

**Database:**
- JSON file storage (techswap-data.json)
- 5 tables: users, products, orders, orderItems, reviews
- Relationships maintained
- CRUD operations supported

---

## 🚀 How to Test

### 1. Installation
```bash
cd /home/donovan/Projects/techswap
npm install
npm run init-db
npm start
```

### 2. Access Website
Open browser to: http://localhost:3000

### 3. Test Shopping Flow
- Browse products on homepage
- Click "Shop" to see all products
- Click on a product to view details
- Add items to cart
- View cart and update quantities
- Proceed to checkout
- Enter test payment info
- Complete purchase
- View order confirmation

### 4. Test User Accounts
- Click "Login" → "Sign up here"
- Create a new account
- Login with demo account
- View "My Account" page
- Check order history

### 5. Test Guest Checkout
- Add products to cart (without logging in)
- Checkout as guest
- Enter email and name
- Complete payment

---

## 📂 Deliverable Files

All project files are located in: `/home/donovan/Projects/techswap/`

**Key Files:**
- `server.js` - Main application server
- `database.js` - Database helper functions
- `init-data.js` - Database initialization
- `package.json` - Dependencies and scripts
- `README.md` - Complete documentation
- `QUICKSTART.md` - Quick start guide
- `views/` - All 10 page templates
- `public/css/style.css` - Full styling
- `public/js/main.js` - Client-side JavaScript

---

## 🎓 Learning Outcomes Demonstrated

1. **E-Commerce Functionality**
   - Product catalog management
   - Shopping cart implementation
   - Checkout process
   - Payment integration

2. **Web Development**
   - Full-stack development
   - RESTful API design
   - Database design and management
   - Responsive web design

3. **Security**
   - User authentication
   - Password hashing
   - Session management
   - Secure payment handling

4. **User Experience**
   - Intuitive navigation
   - Clean, modern design
   - Mobile responsiveness
   - User feedback (notifications)

---

## 📈 Project Statistics

- **Pages:** 10 (Home, Shop, Product Detail, Cart, Checkout, Confirmation, Login, Register, Account, About)
- **Products:** 8 tech products
- **Demo Users:** 3 accounts
- **Categories:** 5 (Laptops, Phones, Tablets, Audio, Gaming)
- **Features:** 15+ major features
- **Lines of Code:** ~3,500+
- **Files Created:** 25+

---

## 🔗 Relationship to Stage 2

This implementation aligns with the Stage 2 document but uses a custom coded solution instead of Wix for:
- **Greater flexibility** and control over features
- **Demonstrable coding skills**
- **Complete source code** for grading
- **Easier deployment** options
- **Better learning outcomes**

All planned features from Stage 2 are implemented:
- ✅ Multi-vendor capability (seller ID tracking)
- ✅ Product catalog with filtering
- ✅ Shopping cart system
- ✅ Secure checkout
- ✅ Payment processing (Stripe test mode)
- ✅ User authentication
- ✅ Commission calculation (8%)
- ✅ Campus pickup option

---

## 🏆 Summary

TechSwap is a **fully functional e-commerce website** that meets and exceeds all Stage 3 requirements. The site demonstrates:

- Complete shopping cart functionality
- Multiple product pages with detailed information
- Both user accounts and guest checkout
- Working payment simulation with Stripe
- Professional homepage and about page designs
- Modern, responsive UI/UX
- Secure authentication and data handling

**The project is ready for demonstration and deployment.**

---

**Submitted by:** Donovan McHenry
**Date:** January 11, 2026
**Grade Level:** Undergraduate
**Course:** IT 310 E-Commerce
