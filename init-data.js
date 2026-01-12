const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_FILE = path.join(__dirname, 'techswap-data.json');

console.log('Initializing TechSwap database...');

// Create demo users
const hashedPassword = bcrypt.hashSync('demo123', 10);

const users = [
  {
    id: 1,
    email: 'demo@student.edu',
    password: hashedPassword,
    name: 'Demo Student',
    campus: 'University of Example',
    role: 'seller',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    email: 'buyer@student.edu',
    password: hashedPassword,
    name: 'John Buyer',
    campus: 'University of Example',
    role: 'buyer',
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    email: 'seller@student.edu',
    password: hashedPassword,
    name: 'Sarah Seller',
    campus: 'Tech University',
    role: 'seller',
    created_at: new Date().toISOString()
  }
];

// Seed products
const products = [
  {
    id: 1,
    title: 'MacBook Pro 14" M2 2023',
    description: 'Excellent condition MacBook Pro with M2 chip, 16GB RAM, 512GB SSD. Barely used, includes original box and charger. Perfect for students needing a powerful laptop for coding and design work.',
    price: 1299.99,
    category: 'Laptops',
    condition: 'A',
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    seller_id: 1,
    campus: 'University of Example',
    stock: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: 'iPad Air 5th Gen 256GB',
    description: 'Like-new iPad Air with M1 chip, 256GB storage. Space Gray color. Comes with Magic Keyboard and Apple Pencil 2nd gen. Great for note-taking and studying.',
    price: 649.99,
    category: 'Tablets',
    condition: 'A',
    image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
    seller_id: 1,
    campus: 'University of Example',
    stock: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    title: 'Sony WH-1000XM5 Headphones',
    description: 'Premium noise-canceling headphones in excellent condition. Battery life still amazing. Includes carrying case and all original accessories. Perfect for studying in the library.',
    price: 279.99,
    category: 'Audio',
    condition: 'B',
    image_url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80',
    seller_id: 3,
    campus: 'Tech University',
    stock: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    title: 'iPhone 14 Pro 128GB',
    description: 'Deep Purple iPhone 14 Pro in great condition. Always kept in a case with screen protector. Battery health at 94%. Unlocked for all carriers.',
    price: 799.99,
    category: 'Phones',
    condition: 'B',
    image_url: 'https://images.unsplash.com/photo-1678652197950-1cee56e7ab1a?w=800&q=80',
    seller_id: 3,
    campus: 'Tech University',
    stock: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 5,
    title: 'Dell XPS 15 (2022)',
    description: 'Powerful Windows laptop with Intel i7-12700H, 16GB RAM, 512GB SSD, RTX 3050 Ti. Perfect for gaming and heavy coursework. Minor cosmetic wear on corners.',
    price: 899.99,
    category: 'Laptops',
    condition: 'B',
    image_url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80',
    seller_id: 1,
    campus: 'University of Example',
    stock: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 6,
    title: 'AirPods Pro 2nd Gen',
    description: 'Barely used AirPods Pro with MagSafe charging case. Includes all ear tips (S, M, L). Excellent noise cancellation for studying. Purchased 3 months ago.',
    price: 189.99,
    category: 'Audio',
    condition: 'A',
    image_url: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&q=80',
    seller_id: 3,
    campus: 'Tech University',
    stock: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 7,
    title: 'Nintendo Switch OLED',
    description: 'White OLED model Switch in perfect condition. Comes with Pro Controller, carrying case, and 3 games (Mario Kart, Zelda, Animal Crossing). Great for dorm gaming.',
    price: 329.99,
    category: 'Gaming',
    condition: 'A',
    image_url: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800&q=80',
    seller_id: 1,
    campus: 'University of Example',
    stock: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 8,
    title: 'Samsung Galaxy Tab S8',
    description: 'Android tablet with S Pen included. 128GB storage, great for note-taking with Samsung Notes app. Book cover keyboard included.',
    price: 449.99,
    category: 'Tablets',
    condition: 'B',
    image_url: 'https://images.unsplash.com/photo-1585790050230-5dd28404f869?w=800&q=80',
    seller_id: 3,
    campus: 'Tech University',
    stock: 1,
    created_at: new Date().toISOString()
  }
];

// Sample reviews
const reviews = [
  {
    id: 1,
    product_id: 1,
    user_id: 2,
    rating: 5,
    comment: 'Amazing laptop! Works perfectly and seller was very responsive.',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    product_id: 3,
    user_id: 2,
    rating: 5,
    comment: 'Great headphones, noise cancellation is top-notch!',
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    product_id: 4,
    user_id: 2,
    rating: 4,
    comment: 'Phone is in great condition, exactly as described.',
    created_at: new Date().toISOString()
  }
];

// Create database
const database = {
  users,
  products,
  orders: [],
  orderItems: [],
  reviews
};

// Save to file
fs.writeFileSync(DB_FILE, JSON.stringify(database, null, 2), 'utf8');

console.log('Database initialized successfully!');
console.log(`- ${users.length} users created`);
console.log(`- ${products.length} products added`);
console.log(`- ${reviews.length} reviews added`);
console.log('\nDemo accounts (password: demo123):');
console.log('- demo@student.edu');
console.log('- buyer@student.edu');
console.log('- seller@student.edu');
