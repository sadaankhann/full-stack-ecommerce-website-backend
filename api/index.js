// const serverless = require('serverless-http');
// const express = require('express');
// const app = express();

// app.use(express.json());

// require('dotenv').config();

// const cors = require('cors');
// app.use(cors({
//     origin: true,
//     credentials: true
// }));

// const cookieParser = require('cookie-parser');
// app.use(cookieParser())

// // const checkingIfLoggedIn = (req,res) =>{
// //     if(req.cookies.token) req.user = req.cookies.token || null; return next();}

// // app.use(['/','/products', '/cart'], checkingIfLoggedIn);

// // const jwt = require('jsonwebtoken');

// // const bcrypt = require('bcrypt');

// // const { Products, User } = require('./config/db');

// // // Ab Product.find() aur User.find() properly kaam karega

// // function isLoggedIn(req,res,next){
// //     if (!req.cookies.token) {
// //         req.user = null;
// //     } else {
// //         req.user = req.cookies.token;
// //     }
// //     next();
// // }

// // Featured Products

// // app.get('/featuredproducts', async (req, res) => {
// //     try {
// //         const featuredProducts = await Products.find({ isFeatured: "true" });
// //         res.json(featuredProducts);
// //     }
// //     catch(err) {
// //         res.status(500).json({ error: "Something went wrong!" });
// //         console.log(err.message)
// //     }
// // })

// // All Products

// // app.get('/allproducts', async (req, res) => {
// //     try {
// //         const products = await Products.find();
// //         res.json(products);
// //     }
// //     catch(err) {
// //         res.status(500).json({ error: err })
// //     }
// // })

// // app.post('/signup', async (req, res) => {

// //     const checkingIfAlreadyExist = await User.findOne({ email: req.body.formData.email });

// //     if (checkingIfAlreadyExist) {
// //         return res.json({
// //             success: false,
// //             message: "User already Exist!"
// //         })
// //     }

// //     if (req.body.formData.password !== req.body.formData.confirmPassword) {
// //         return res.json({
// //             success: false,
// //             message: "Passwords did not match"
// //         })
// //     }

// //     const salt = await bcrypt.genSalt(10);
// //     const hashedPassword = await bcrypt.hash(req.body.formData.password, salt);

// //     const addingTheUser = await User.create({
// //         email: req.body.formData.email,
// //         password: hashedPassword,
// //         contactNo: Number(req.body.formData.contactNo)
// //     })

// //     if (addingTheUser) {
// //         const cookie = jwt.sign({ email: req.body.formData.email }, process.env.JWT_SECRET);
// //         if (cookie) {
// //             res.cookie('token', cookie);
// //             return res.json({
// //                 success: true
// //             })
// //         }
// //     }

// // })

// // app.post('/login', async (req, res) => {
// //     const checkingIfExist = await User.findOne({ email: req.body.formData.email });

// //     if (!checkingIfExist) {
// //         return res.json({
// //             success: false,
// //             message: "User Does not Exist!"
// //         })
// //     }

// //     const comparision = await bcrypt.compare(req.body.formData.password, checkingIfExist.password);
// //     if (comparision) {
// //         const cookie = jwt.sign({ email: req.body.formData.email }, process.env.JWT_SECRET);
// //         if (cookie) {
// //             res.cookie('token', cookie);
// //             return res.json({
// //                 success: true
// //             })
// //         }
// //     }
// //     return res.status(500).json({
// //         success: false,
// //         message: "Incorrect Credentials"
// //     })

// // })

// // app.post('/admin/login', async (req, res) => {
// //     const checkingIfExist = await User.findOne({ email: req.body.email });
// //     if (!checkingIfExist || !checkingIfExist.isAdmin) return res.status(400).json({ success: false, message: "Account did'nt exist!" })
// //     const comparison = await bcrypt.compare(req.body.password, checkingIfExist.password);
// //     if (!comparison) return res.status(400).json({ success: false, message: "Credentials not correct!" })
// //     const cookieData = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET);
// //     res.cookie('token', cookieData);
// //     return res.status(200).json({ success: true })
// // })

// // // Cart

// // app.get('/cart', isLoggedIn, async (req, res) => {
// //     if (!req.user) {
// //         return res.json({
// //             isLoggedIn : false,
// //             data : []
// //         })
// //     }
// //     const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
// //     const user = await User.findOne({ email: decoded.email });
// //     return res.status(200).json({
// //         success: true,
// //         data: user.CartProducts
// //     })
// // })

// // app.post('/removefromcart', async (req, res) => {
// //     try {
// //         const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

// //         const updating = await User.findOneAndUpdate(
// //             { email: decoded.email },
// //             { $pull: { CartProducts: { id: req.body.id } } },
// //             { new: true } // instead of returnDocument
// //         );
// //         res.json({ success: true, data: updating.CartProducts });

// //     } catch (err) {
// //         res.status(500).json({ success: false, message: err.message });
// //     }
// // });

// // app.post('/addingintocart', async (req, res) => {
// //     try {
// //         const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

// //         const updating = await User.findOneAndUpdate(
// //             { email: decoded.email },
// //             { $push: { CartProducts: { id: req.body.id, quantity: 1 } } },
// //             { new: true }
// //         );

// //         res.json({ success: true, data: updating.CartProducts });
// //     } catch (err) {
// //         res.status(500).json({ success: false, message: err.message });
// //     }
// // });

// // Changing quantity of a product

// // app.post('/changingquantity', async(req,res)=>{
// //     const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
// //     const {CartProducts} = await User.findOne({ email: decoded.email });
// //     const updating = await User.findOneAndUpdate({email : decoded.email}, {$set : {CartProducts : CartProducts.map((elem,idx)=>{return (elem.id == req.body.id) ? {...elem, id : elem.id, quantity:req.body.value} : elem})
// //     }}, { returnDocument: "after" });
// //     res.json({success : true, data : updating.CartProducts})
// // })

// // // Liked

// // app.post('/removefromliked', async(req,res)=>{
// //     const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
// //     const updating = await User.findOneAndUpdate({email : decoded.email}, {$set : {LikedProducts : LikedProducts.filter(item => item != req.body.id)}}, { returnDocument: "after" });
// //     res.json({success : true, data : updating.LikedProducts})
// // })


// // app.get('/likedproducts', async (req, res) => {
// //     if (!req.cookies.token) {
// //         return res.status(400).json({
// //             success: false,
// //             message: "User does not exist!"
// //         })
// //     }
// //     const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
// //     const {LikedProducts} = await User.findOne({ email: decoded.email });
// //     return res.status(200).json({
// //         success: true,
// //         data: LikedProducts
// //     })

// // })

// // app.post('/removefromliked', async(req,res)=>{
// //     const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
// //     const updating = await User.findOneAndUpdate({email : decoded.email}, {$pull : {LikedProducts : req.body.id}}, { new: true });
// //     res.json({success : true, data : updating.LikedProducts})
// // })

// // app.post('/addingintoliked', async(req,res)=>{
// //     const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
// //     const updating = await User.findOneAndUpdate({email : decoded.email}, {$push : { LikedProducts  : req.body.id }}, { new: true });
// //     res.json({success : true, data: updating.LikedProducts})
// //  })

// // app.listen(5000, () => console.log('Server running on http://localhost:5000'));

// const cart = require('./api/cart');
// const allProducts = require('./api/allProducts')
// const addingIntoCart = require('./api/addingIntoCart')
// const adminLogin = require('./api/adminLogin');
// const changingQuality = require('./api/changingQuality')
// const featuredProducts = require('./api/featuredProducts')
// const likedProducts = require('./api/likedProducts')
// const login = require('./api/login')
// const removeFromCart = require('./api/removeFromCart')
// const removeFromLiked = require('./api/removeFromLiked')
// const signup = require('./api/signup');
// const addingIntoLiked = require('./api/addingIntoLiked')

// app.use('/api/cart', cart);
// app.use('/api/addingIntoCart', addingIntoCart);
// app.use('/api/addingIntoLiked', addingIntoLiked);
// app.use('/api/adminLogin', adminLogin);
// app.use('/api/allProducts', allProducts);
// app.use('/api/changingQuality', changingQuality);
// app.use('/api/featuredProducts', featuredProducts);
// app.use('/api/likedProducts', likedProducts);
// app.use('/api/login', login);
// app.use('/api/removeFromCart', removeFromCart);
// app.use('/api/removeFromLiked', removeFromLiked);
// app.use('/api/signup', signup);

// module.exports = serverless(app);

// =================


const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(cookieParser());

// ✅ ROUTES IMPORT (FIXED)
const cart = require('./cart');
const allProducts = require('./allProducts');
const addingIntoCart = require('./addingIntoCart');
const addingIntoLiked = require('./addingIntoLiked'); // ⚠️ missing tha
const adminLogin = require('./adminLogin');
const changingQuality = require('./changingQuality');
const featuredProducts = require('./featuredProducts');
const likedProducts = require('./likedProducts');
const login = require('./login');
const removeFromCart = require('./removeFromCart');
const removeFromLiked = require('./removeFromLiked');
const signup = require('./signup');

// ✅ ROUTES USE
app.use('/api/cart', cart);
app.use('/api/addingIntoCart', addingIntoCart);
app.use('/api/addingIntoLiked', addingIntoLiked);
app.use('/api/adminLogin', adminLogin);
app.use('/api/allProducts', allProducts);
app.use('/api/changingQuality', changingQuality);
app.use('/api/featuredProducts', featuredProducts);
app.use('/api/likedProducts', likedProducts);
app.use('/api/login', login);
app.use('/api/removeFromCart', removeFromCart);
app.use('/api/removeFromLiked', removeFromLiked);
app.use('/api/signup', signup);


// ❌ REMOVE THIS (Vercel pe allowed nahi)
// app.listen(5000)

// ✅ EXPORT SERVERLESS
module.exports = serverless(app);