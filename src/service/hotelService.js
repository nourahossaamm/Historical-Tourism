const Service = require('./Service');
const hotelModel = require('../model/hotel');

class hotelService extends Service {
    constructor(model) {
        super(model);
        this.model = model;
    }
}
module.exports = new hotelService(hotelModel);