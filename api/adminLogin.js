const connectToMongoDB = require('./connectToMongoDB');
const { User} = require('./config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const handler = async(req, res) => {
    try {
        await connectToMongoDB();
        const checkingIfExist = await User.findOne({ email: req.body.email });
        if (!checkingIfExist || !checkingIfExist.isAdmin) return res.status(400).json({ success: false, message: "Account didn't exist!" })
        const comparison = await bcrypt.compare(req.body.password, checkingIfExist.password);
        if (!comparison) return res.status(400).json({ success: false, message: "Credentials not correct!" })
        const cookieData = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET);
        res.cookie('token', cookieData);
        return res.status(200).json({ success: true })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

module.exports = handler;