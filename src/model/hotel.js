const mongoose = require('mongoose');
const {
    Schema
} = require('mongoose');

class hotel {
    initSchema() {
        const hotelSchema = new Schema({
            name: {
                type: "string",
                required: true
            }
        });
        mongoose.model('hotel', hotelSchema);
    }

    getInstance() {
        this.initSchema();
        return mongoose.model('hotel');
    }

}

module.exports = new hotel().getInstance();