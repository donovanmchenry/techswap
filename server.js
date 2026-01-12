require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: process.env.NODE_ENV === 'production'
  }
}));

// Make user and cart available to all templates
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.cart = req.session.cart || [];
  res.locals.cartCount = req.session.cart ? req.session.cart.reduce((sum, item) => sum + item.quantity, 0) : 0;
  res.locals.stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
  next();
});

// ==================== ROUTES ====================

// Homepage
app.get('/', (req, res) => {
  const featuredProducts = db.getAllProducts().slice(0, 8);
  const categories = ['Laptops', 'Phones', 'Tablets', 'Audio', 'Gaming'];

  res.render('index', {
    products: featuredProducts,
    categories,
    pageTitle: 'TechSwap - Student Tech Marketplace'
  });
});

// About Page
app.get('/about', (req, res) => {
  res.render('about', { pageTitle: 'About TechSwap' });
});

// Shop/Products Page
app.get('/shop', (req, res) => {
  const { category, condition, search, sort = 'newest' } = req.query;

  let products = db.getProducts({ category, condition, search });

  // Sorting
  switch(sort) {
    case 'price-low':
      products.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      products.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
    default:
      products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  const categories = ['Laptops', 'Phones', 'Tablets', 'Audio', 'Gaming'];

  res.render('shop', {
    products,
    categories,
    selectedCategory: category,
    selectedCondition: condition,
    selectedSort: sort,
    searchQuery: search || '',
    pageTitle: 'Shop - TechSwap'
  });
});

// Product Detail Page
app.get('/product/:id', (req, res) => {
  const product = db.getProduct(req.params.id);

  if (!product) {
    return res.status(404).render('404', { pageTitle: 'Product Not Found' });
  }

  const reviews = db.getReviewsForProduct(req.params.id);
  const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  // Similar products
  const similarProducts = db.getProducts({ category: product.category })
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  res.render('product', {
    product,
    reviews,
    avgRating: avgRating.toFixed(1),
    reviewCount: reviews.length,
    similarProducts,
    pageTitle: product.title
  });
});

// Cart Page
app.get('/cart', (req, res) => {
  const cart = req.session.cart || [];
  let cartItems = [];

  if (cart.length > 0) {
    cartItems = cart.map(item => {
      const product = db.getProduct(item.productId);
      return {
        ...product,
        quantity: item.quantity,
        subtotal: product.price * item.quantity
      };
    }).filter(item => item.id); // Filter out any invalid products
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  const commission = subtotal * 0.08; // 8% TechSwap fee
  const total = subtotal + commission;

  res.render('cart', {
    cartItems,
    subtotal: subtotal.toFixed(2),
    commission: commission.toFixed(2),
    total: total.toFixed(2),
    pageTitle: 'Shopping Cart'
  });
});

// Add to Cart
app.post('/cart/add', (req, res) => {
  const { productId, quantity = 1 } = req.body;

  if (!req.session.cart) {
    req.session.cart = [];
  }

  const existingItem = req.session.cart.find(item => item.productId == productId);

  if (existingItem) {
    existingItem.quantity += parseInt(quantity);
  } else {
    req.session.cart.push({
      productId: parseInt(productId),
      quantity: parseInt(quantity)
    });
  }

  res.json({ success: true, cartCount: req.session.cart.reduce((sum, item) => sum + item.quantity, 0) });
});

// Update Cart
app.post('/cart/update', (req, res) => {
  const { productId, quantity } = req.body;

  if (!req.session.cart) {
    return res.json({ success: false });
  }

  const item = req.session.cart.find(item => item.productId == productId);

  if (item) {
    if (quantity > 0) {
      item.quantity = parseInt(quantity);
    } else {
      req.session.cart = req.session.cart.filter(item => item.productId != productId);
    }
  }

  res.json({ success: true, cartCount: req.session.cart.reduce((sum, item) => sum + item.quantity, 0) });
});

// Remove from Cart
app.post('/cart/remove', (req, res) => {
  const { productId } = req.body;

  if (req.session.cart) {
    req.session.cart = req.session.cart.filter(item => item.productId != productId);
  }

  res.json({ success: true, cartCount: req.session.cart ? req.session.cart.reduce((sum, item) => sum + item.quantity, 0) : 0 });
});

// Checkout Page
app.get('/checkout', (req, res) => {
  if (!req.session.cart || req.session.cart.length === 0) {
    return res.redirect('/cart');
  }

  const cart = req.session.cart;
  const cartItems = cart.map(item => {
    const product = db.getProduct(item.productId);
    return {
      ...product,
      quantity: item.quantity,
      subtotal: product.price * item.quantity
    };
  }).filter(item => item.id); // Filter out any invalid products

  const subtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  const commission = subtotal * 0.08;
  const shippingCost = 15.00; // Default shipping cost
  const total = subtotal + commission + shippingCost;

  res.render('checkout', {
    cartItems,
    subtotal: subtotal.toFixed(2),
    commission: commission.toFixed(2),
    shippingCost: shippingCost.toFixed(2),
    total: total.toFixed(2),
    pageTitle: 'Checkout'
  });
});

// Process Payment (Stripe Test Mode Simulation)
app.post('/checkout/process', async (req, res) => {
  const { email, name, shippingMethod } = req.body;

  if (!req.session.cart || req.session.cart.length === 0) {
    return res.json({ success: false, error: 'Cart is empty' });
  }

  const cart = req.session.cart;
  const cartItems = cart.map(item => {
    const product = db.getProduct(item.productId);
    return {
      ...product,
      quantity: item.quantity,
      subtotal: product.price * item.quantity
    };
  }).filter(item => item.id);

  const subtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  const commission = subtotal * 0.08;
  const shippingCost = shippingMethod === 'pickup' ? 0 : 15.00;
  const totalAmount = subtotal + commission + shippingCost;

  try {
    // Simulate Stripe payment (in test mode)
    const fakePaymentIntent = 'pi_test_' + Date.now();

    // Create order
    const order = db.createOrder({
      user_id: req.session.user ? req.session.user.id : null,
      user_email: email,
      total_amount: totalAmount,
      commission: commission,
      shipping_method: shippingMethod,
      shipping_cost: shippingCost,
      status: 'completed',
      stripe_payment_intent: fakePaymentIntent
    });

    // Insert order items and update stock
    cartItems.forEach(item => {
      db.createOrderItem({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      });

      // Update stock
      db.updateProductStock(item.id, item.quantity);
    });

    // Clear cart
    req.session.cart = [];

    res.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error('Order processing error:', error);
    res.json({ success: false, error: 'Payment processing failed' });
  }
});

// Order Confirmation
app.get('/order-confirmation/:orderId', (req, res) => {
  const order = db.getOrder(req.params.orderId);

  if (!order) {
    return res.status(404).render('404', { pageTitle: 'Order Not Found' });
  }

  res.render('order-confirmation', {
    order,
    items: order.items,
    pageTitle: 'Order Confirmation'
  });
});

// Login Page
app.get('/login', (req, res) => {
  res.render('login', {
    error: null,
    pageTitle: 'Login'
  });
});

// Login Process
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = db.findUser({ email });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.render('login', {
      error: 'Invalid email or password',
      pageTitle: 'Login'
    });
  }

  req.session.user = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  };

  res.redirect('/account');
});

// Register Page
app.get('/register', (req, res) => {
  res.render('register', {
    error: null,
    pageTitle: 'Register'
  });
});

// Register Process
app.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').notEmpty().trim()
], (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('register', {
      error: 'Please provide valid information',
      pageTitle: 'Register'
    });
  }

  const { email, password, name, campus } = req.body;

  // Check if user exists
  const existingUser = db.findUser({ email });

  if (existingUser) {
    return res.render('register', {
      error: 'Email already registered',
      pageTitle: 'Register'
    });
  }

  // Create user
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = db.createUser({
    email,
    password: hashedPassword,
    name,
    campus,
    role: 'buyer'
  });

  req.session.user = {
    id: user.id,
    email,
    name,
    role: 'buyer'
  };

  res.redirect('/account');
});

// Account Page
app.get('/account', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  const orders = db.getUserOrders(req.session.user.id);

  res.render('account', {
    orders,
    pageTitle: 'My Account'
  });
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// 404 Handler
app.use((req, res) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 TechSwap server running at http://localhost:${PORT}`);
  console.log(`📝 Demo accounts:`);
  console.log(`   - Email: demo@student.edu | Password: demo123`);
  console.log(`   - Email: buyer@student.edu | Password: demo123\n`);
});
