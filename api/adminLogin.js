const { User} = require('./config/db');
const {jwt} = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const handler = async(req, res) => {
    const checkingIfExist = await User.findOne({ email: req.body.email });
    if (!checkingIfExist || !checkingIfExist.isAdmin) return res.status(400).json({ success: false, message: "Account did'nt exist!" })
    const comparison = await bcrypt.compare(req.body.password, checkingIfExist.password);
    if (!comparison) return res.status(400).json({ success: false, message: "Credentials not correct!" })
    const cookieData = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET);
    res.cookie('token', cookieData);
    return res.status(200).json({ success: true })
}

export default handler;