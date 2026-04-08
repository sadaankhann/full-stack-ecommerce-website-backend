import { connectToMongoDB } from './connectToMongoDB';

const jwt = require('jsonwebtoken');
const { User} = require('./config/db');

const handler = async(req,res) =>{
    await connectToMongoDB();
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    const updating = await User.findOneAndUpdate({email : decoded.email}, {$pull : {LikedProducts : req.body.id}}, { new: true });
    res.json({success : true, data : updating.LikedProducts})
}

export default handler;