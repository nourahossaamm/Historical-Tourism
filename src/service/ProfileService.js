const Service = require('./Service');
const profileModel = require('../model/profile');

class ProfileService extends Service {
    constructor(model) {
        super(model);
        this.model = model;
    }
}
module.exports = new ProfileService(profileModel);