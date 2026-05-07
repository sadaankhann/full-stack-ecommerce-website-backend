const jwt = require('jsonwebtoken');
const { User} = require('../config/db');

const handler = async(req,res) =>{
    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        const updating = await User.findOneAndUpdate({email : decoded.email}, {$push : { LikedProducts  : req.body.id }}, { new: true });
        res.json({success : true, data: updating.LikedProducts})
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

module.exports = handler;