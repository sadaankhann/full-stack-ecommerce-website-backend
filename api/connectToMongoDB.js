const mongoose = require('mongoose');

let productConnection;
let userConnection;

async function connectToMongoDB() {
  try {
    if (!productConnection) {
      productConnection = await mongoose.createConnection(process.env.MONGO_PRODUCT_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Product DB connected");
    }

    if (!userConnection) {
      userConnection = await mongoose.createConnection(process.env.MONGO_USERS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("User DB connected");
    }

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = handler;