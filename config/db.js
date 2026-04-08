// const mongoose = require('mongoose');

// const productSchema = mongoose.createConnection('mongodb+srv://sadaankhan2346_db_user:6785000khanK12@cluster0.xxxxx.mongodb.net/products');
// const userSchema = mongoose.createConnection('mongodb+srv://sadaankhan2346_db_user:6785000khanK12@cluster0.xxxxx.mongodb.net/users');

// module.exports = { productSchema, userSchema};

const mongoose = require('mongoose');

// 1️⃣ Alag connections
const productConn = mongoose.createConnection(process.env.MONGO_PRODUCTS_URI);
const userConn = mongoose.createConnection(process.env.MONGO_USERS_URI);

// 2️⃣ Schemas import karo
const ProductSchema = require('../models/productSchema');
const UserSchema = require('../models/userSchema');

// 3️⃣ Models ko connections ke saath attach karo
const Product = productConn.model('Product', ProductSchema);
const User = userConn.model('User', UserSchema);

module.exports = { Products: Product, User };