const mongoose = require('mongoose');

const productSchema = mongoose.createConnection('mongodb://127.0.0.1:27017/products');
const userSchema = mongoose.createConnection('mongodb://127.0.0.1:27017/user');

module.exports = { productSchema, userSchema};