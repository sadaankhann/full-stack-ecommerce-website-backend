const connectToMongoDB = require('./connectToMongoDB');
const {User} = require('./config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handler = async(req,res) =>{

    try {
        await connectToMongoDB();

        const checkingIfExist = await User.findOne({ email: req.body.formData.email });
        
            if (!checkingIfExist) {
                return res.json({
                    success: false,
                    message: "User Does not Exist!"
                })
            }
        
            const comparision = await bcrypt.compare(req.body.formData.password, checkingIfExist.password);
            if (comparision) {
                const cookie = jwt.sign({ email: req.body.formData.email }, process.env.JWT_SECRET);
                if (cookie) {
                    res.cookie('token', cookie);
                    return res.json({
                        success: true
                    })
                }
            }
            return res.status(500).json({
                success: false,
                message: "Incorrect Credentials"
            })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export default handler;