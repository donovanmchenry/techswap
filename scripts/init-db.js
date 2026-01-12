const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'techswap.db');
const db = new sqlite3.Database(dbPath);

console.log('Initializing TechSwap database...');

// Create tables
db.serialize(() => {
db.exec(`
  -- Users table
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    campus TEXT,
    role TEXT DEFAULT 'buyer',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Products table
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    condition TEXT NOT NULL,
    image_url TEXT,
    seller_id INTEGER,
    campus TEXT,
    stock INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id)
  );

  -- Orders table
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    user_email TEXT,
    total_amount REAL NOT NULL,
    commission REAL NOT NULL,
    shipping_method TEXT,
    shipping_cost REAL DEFAULT 0,
    status TEXT DEFAULT 'pending',
    stripe_payment_intent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  -- Order items table
  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  -- Reviews table
  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

console.log('Tables created successfully.');

// Create demo users
const hashedPassword = bcrypt.hashSync('demo123', 10);

const insertUser = db.prepare(`
  INSERT OR IGNORE INTO users (email, password, name, campus, role)
  VALUES (?, ?, ?, ?, ?)
`);

insertUser.run('demo@student.edu', hashedPassword, 'Demo Student', 'University of Example', 'seller');
insertUser.run('buyer@student.edu', hashedPassword, 'John Buyer', 'University of Example', 'buyer');
insertUser.run('seller@student.edu', hashedPassword, 'Sarah Seller', 'Tech University', 'seller');
insertUser.finalize();

console.log('Demo users created (password: demo123)');

// Seed products
const products = [
  {
    title: 'MacBook Pro 14" M2 2023',
    description: 'Excellent condition MacBook Pro with M2 chip, 16GB RAM, 512GB SSD. Barely used, includes original box and charger. Perfect for students needing a powerful laptop for coding and design work.',
    price: 1299.99,
    category: 'Laptops',
    condition: 'A',
    image_url: '/images/macbook-pro.jpg',
    seller_id: 1,
    campus: 'University of Example',
    stock: 1
  },
  {
    title: 'iPad Air 5th Gen 256GB',
    description: 'Like-new iPad Air with M1 chip, 256GB storage. Space Gray color. Comes with Magic Keyboard and Apple Pencil 2nd gen. Great for note-taking and studying.',
    price: 649.99,
    category: 'Tablets',
    condition: 'A',
    image_url: '/images/ipad-air.jpg',
    seller_id: 1,
    campus: 'University of Example',
    stock: 1
  },
  {
    title: 'Sony WH-1000XM5 Headphones',
    description: 'Premium noise-canceling headphones in excellent condition. Battery life still amazing. Includes carrying case and all original accessories. Perfect for studying in the library.',
    price: 279.99,
    category: 'Audio',
    condition: 'B',
    image_url: '/images/sony-headphones.jpg',
    seller_id: 3,
    campus: 'Tech University',
    stock: 1
  },
  {
    title: 'iPhone 14 Pro 128GB',
    description: 'Deep Purple iPhone 14 Pro in great condition. Always kept in a case with screen protector. Battery health at 94%. Unlocked for all carriers.',
    price: 799.99,
    category: 'Phones',
    condition: 'B',
    image_url: '/images/iphone-14-pro.jpg',
    seller_id: 3,
    campus: 'Tech University',
    stock: 1
  },
  {
    title: 'Dell XPS 15 (2022)',
    description: 'Powerful Windows laptop with Intel i7-12700H, 16GB RAM, 512GB SSD, RTX 3050 Ti. Perfect for gaming and heavy coursework. Minor cosmetic wear on corners.',
    price: 899.99,
    category: 'Laptops',
    condition: 'B',
    image_url: '/images/dell-xps.jpg',
    seller_id: 1,
    campus: 'University of Example',
    stock: 1
  },
  {
    title: 'AirPods Pro 2nd Gen',
    description: 'Barely used AirPods Pro with MagSafe charging case. Includes all ear tips (S, M, L). Excellent noise cancellation for studying. Purchased 3 months ago.',
    price: 189.99,
    category: 'Audio',
    condition: 'A',
    image_url: '/images/airpods-pro.jpg',
    seller_id: 3,
    campus: 'Tech University',
    stock: 2
  },
  {
    title: 'Nintendo Switch OLED',
    description: 'White OLED model Switch in perfect condition. Comes with Pro Controller, carrying case, and 3 games (Mario Kart, Zelda, Animal Crossing). Great for dorm gaming.',
    price: 329.99,
    category: 'Gaming',
    condition: 'A',
    image_url: '/images/switch-oled.jpg',
    seller_id: 1,
    campus: 'University of Example',
    stock: 1
  },
  {
    title: 'Samsung Galaxy Tab S8',
    description: 'Android tablet with S Pen included. 128GB storage, great for note-taking with Samsung Notes app. Book cover keyboard included.',
    price: 449.99,
    category: 'Tablets',
    condition: 'B',
    image_url: '/images/galaxy-tab.jpg',
    seller_id: 3,
    campus: 'Tech University',
    stock: 1
  }
];

const insertProduct = db.prepare(`
  INSERT INTO products (title, description, price, category, condition, image_url, seller_id, campus, stock)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

products.forEach(product => {
  insertProduct.run(
    product.title,
    product.description,
    product.price,
    product.category,
    product.condition,
    product.image_url,
    product.seller_id,
    product.campus,
    product.stock
  );
});
insertProduct.finalize();

console.log(`${products.length} products added successfully.`);

// Add some sample reviews
const insertReview = db.prepare(`
  INSERT INTO reviews (product_id, user_id, rating, comment)
  VALUES (?, ?, ?, ?)
`);

insertReview.run(1, 2, 5, 'Amazing laptop! Works perfectly and seller was very responsive.');
insertReview.run(3, 2, 5, 'Great headphones, noise cancellation is top-notch!');
insertReview.run(4, 2, 4, 'Phone is in great condition, exactly as described.');
insertReview.finalize();

console.log('Sample reviews added.');

}); // end db.serialize

db.close(() => {
  console.log('Database initialization complete!');
});
