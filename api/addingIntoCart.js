const { User } = require('./config/db');
const jwt = require('jsonwebtoken');
const connectToMongoDB = require('./connectToMongoDB');

const handler = async(req, res) => {
    try {

        await connectToMongoDB();
        
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

        const updating = await User.findOneAndUpdate(
            { email: decoded.email },
            { $push: { CartProducts: { id: req.body.id, quantity: 1 } } },
            { new: true }
        );

        res.json({ success: true, data: updating.CartProducts });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

module.exports = handler;