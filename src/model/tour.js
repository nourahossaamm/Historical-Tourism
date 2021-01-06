const mongoose = require('mongoose');
const {
    Schema
} = require('mongoose');

class tour {
    initSchema() {
        const tourSchema = new Schema({
            name: {
                type: "string",
                required: true
            }
        });
        mongoose.model('tour', tourSchema);
    }

    getInstance() {
        this.initSchema();
        return mongoose.model('tour');
    }

}

module.exports = new tour().getInstance();