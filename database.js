const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'techswap-data.json');

// Initialize empty database structure
const emptyDB = {
  users: [],
  products: [],
  orders: [],
  orderItems: [],
  reviews: []
};

// Load database
function loadDB() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading database:', error);
  }
  return { ...emptyDB };
}

// Save database
function saveDB(db) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving database:', error);
  }
}

// Simple query helpers
class Database {
  constructor() {
    this.data = loadDB();
  }

  // Users
  findUser(filter) {
    return this.data.users.find(u => {
      if (filter.email) return u.email === filter.email;
      if (filter.id) return u.id === filter.id;
      return false;
    });
  }

  createUser(userData) {
    const id = this.data.users.length > 0 ? Math.max(...this.data.users.map(u => u.id)) + 1 : 1;
    const user = {
      id,
      ...userData,
      created_at: new Date().toISOString()
    };
    this.data.users.push(user);
    saveDB(this.data);
    return user;
  }

  // Products
  getAllProducts() {
    return this.data.products.filter(p => p.stock > 0);
  }

  getProducts(filter = {}) {
    let products = this.data.products.filter(p => p.stock > 0);

    if (filter.category) {
      products = products.filter(p => p.category === filter.category);
    }
    if (filter.condition) {
      products = products.filter(p => p.condition === filter.condition);
    }
    if (filter.search) {
      const search = filter.search.toLowerCase();
      products = products.filter(p =>
        p.title.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
      );
    }

    return products;
  }

  getProduct(id) {
    const product = this.data.products.find(p => p.id === parseInt(id));
    if (product) {
      // Add seller name
      const seller = this.findUser({ id: product.seller_id });
      return {
        ...product,
        seller_name: seller ? seller.name : 'Unknown'
      };
    }
    return null;
  }

  // Reviews
  getReviewsForProduct(productId) {
    return this.data.reviews
      .filter(r => r.product_id === parseInt(productId))
      .map(r => {
        const user = this.findUser({ id: r.user_id });
        return {
          ...r,
          user_name: user ? user.name : 'Anonymous'
        };
      });
  }

  // Orders
  createOrder(orderData) {
    const id = this.data.orders.length > 0 ? Math.max(...this.data.orders.map(o => o.id)) + 1 : 1;
    const order = {
      id,
      ...orderData,
      created_at: new Date().toISOString()
    };
    this.data.orders.push(order);
    saveDB(this.data);
    return order;
  }

  createOrderItem(itemData) {
    const id = this.data.orderItems.length > 0 ? Math.max(...this.data.orderItems.map(o => o.id)) + 1 : 1;
    const item = {
      id,
      ...itemData
    };
    this.data.orderItems.push(item);
    saveDB(this.data);
    return item;
  }

  getOrder(id) {
    const order = this.data.orders.find(o => o.id === parseInt(id));
    if (!order) return null;

    const items = this.data.orderItems.filter(i => i.order_id === order.id);
    const productDetails = items.map(item => {
      const product = this.data.products.find(p => p.id === item.product_id);
      return {
        ...item,
        title: product ? product.title : 'Unknown Product'
      };
    });

    return {
      ...order,
      items: productDetails
    };
  }

  getUserOrders(userId) {
    return this.data.orders
      .filter(o => o.user_id === userId)
      .map(o => {
        const itemCount = this.data.orderItems.filter(i => i.order_id === o.id).length;
        return {
          ...o,
          item_count: itemCount
        };
      })
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  updateProductStock(productId, quantity) {
    const product = this.data.products.find(p => p.id === parseInt(productId));
    if (product) {
      product.stock = Math.max(0, product.stock - quantity);
      saveDB(this.data);
    }
  }
}

module.exports = new Database();
