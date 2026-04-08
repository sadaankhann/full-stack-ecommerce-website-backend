const connectToMongoDB = require('./connectToMongoDB');
const { Products} = require('./config/db');

const handler = async(req,res) =>{
    try {
        await connectToMongoDB();
        const products = await Products.find();
        res.json(products);
    }
    catch(err) {
        res.status(500).json({ error: err })
    }
}

export default handler;