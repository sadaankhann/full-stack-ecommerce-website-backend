const jwt = require('jsonwebtoken');
const { User} = require('./config/db');

const handler = async(req,res) =>{
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
    
}

export default handler;