const {userSchema} = require('../config/db.js')
const mongoose = require('mongoose');

const User = new mongoose.Schema({
    email : { type : String},
    password : {type : String},
    contactNo : {type : Number},
    CartProducts : {type : Array},
    LikedProducts : {type : Array}
})

module.exports = userSchema.model('User', User);