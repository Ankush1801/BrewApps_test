const mongoose = require("mongoose");
global.ObjectId = mongoose.Types.ObjectId;

// Mongo Db connection
module.exports.mongodb = async () => {
    try {
        await mongoose.connect(
            process.env.MONGODB_URL,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true
            }
        );
        console.log("Mongo Connected");
    } catch (error) {
        console.error("Mongo", error);
    }
};
