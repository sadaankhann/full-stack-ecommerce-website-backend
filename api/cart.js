const connectToMongoDB = require('./connectToMongoDB');
const isLoggedIn = require('./isLoggedIn');
const { User} = require('./config/db');
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {

    await connectToMongoDB();

    if (!isLoggedIn(req)) {
        return res.json({
            isLoggedIn: false,
            data: []
        })
    }
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });
    return res.status(200).json({
        success: true,
        data: user.CartProducts
    })
}

module.exports = handler;