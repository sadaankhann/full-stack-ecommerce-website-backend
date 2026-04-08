const connectToMongoDB = require('./connectToMongoDB');
const jwt = require('jsonwebtoken');
const { User} = require('./config/db');

const handler = async(req,res) =>{
    try {
        await connectToMongoDB();
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

        const updating = await User.findOneAndUpdate(
            { email: decoded.email },
            { $pull: { CartProducts: { id: req.body.id } } },
            { new: true } // instead of returnDocument
        );
        res.json({ success: true, data: updating.CartProducts });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export default handler;