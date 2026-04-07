const mongoose = require('mongoose');

const productSchema = mongoose.createConnection('mongodb+srv://sadaankhan2346_db_user:6785000khanK12@cluster0.xxxxx.mongodb.net/products');
const userSchema = mongoose.createConnection('mongodb+srv://sadaankhan2346_db_user:6785000khanK12@cluster0.xxxxx.mongodb.net/users');

module.exports = { productSchema, userSchema};