const Service = require('./Service');
const tourModel = require('../model/tour');

class tourService extends Service {
    constructor(model) {
        super(model);
        this.model = model;
    }
}
module.exports = new tourService(tourModel);