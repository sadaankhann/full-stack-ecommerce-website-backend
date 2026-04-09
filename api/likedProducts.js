const connectToMongoDB = require('./connectToMongoDB');

const jwt = require('jsonwebtoken');
const { User} = require('./config/db');

const handler = async(req,res) =>{
    try {
        await connectToMongoDB();
        if (!req.cookies.token) {
                return res.status(400).json({
                    success: false,
                    message: "User does not exist!"
                })
            }
            const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
            const {LikedProducts} = await User.findOne({ email: decoded.email });
            return res.status(200).json({
                success: true,
                data: LikedProducts
            })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

module.exports = handler;