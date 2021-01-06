//Import the mongoose module
const mongoose = require('mongoose');

//Set up default mongoose connection
class Database {
    constructor() {

        this.url = process.env.MONGO_URL || 'mongodb+srv://noura:noura12@cluster0.sjq3a.mongodb.net/cloudproject?retryWrites=true&w=majority';
    }
    async connect() {
        mongoose.connection.on('connecting', function () {
            console.log("trying to establish a connection to mongo");
        });
        mongoose.connection.on('connected', function () {
            console.log("Mongo connection established successfully");
        });
        mongoose.connection.on('error', function (err) {
            console.log('connection to mongo failed ' + err);
        });
        mongoose.connection.on('disconnected', function () {
            console.log('mongo db connection closed');
        });
        await mongoose.connect(this.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    };
}

module.exports = new Database();