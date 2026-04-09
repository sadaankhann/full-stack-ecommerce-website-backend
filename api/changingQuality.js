const connectToMongoDB = require('./connectToMongoDB');
const jwt = require('jsonwebtoken');
const { User} = require('./config/db');

const handler = async (req, res) => {
    try {
        await connectToMongoDB();
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        const { CartProducts } = await User.findOne({ email: decoded.email });
        const updating = await User.findOneAndUpdate({ email: decoded.email }, {
            $set: {
                CartProducts: CartProducts.map((elem, idx) => { return (elem.id == req.body.id) ? { ...elem, id: elem.id, quantity: req.body.value } : elem })
            }
        }, { returnDocument: "after" });
        res.json({ success: true, data: updating.CartProducts })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

module.exports = handler;