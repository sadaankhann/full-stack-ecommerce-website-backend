const connectToMongoDB = require('./connectToMongoDB');
const { Products} = require('./config/db');

const handler = async(req, res) => {
    try {
        await connectToMongoDB();
        const featuredProducts = await Products.find({ isFeatured: "true" });
        res.json(featuredProducts);
    }
    catch {
        res.status(500).json({ error: "Something went wrong!" });
    }
}

module.exports = handler;