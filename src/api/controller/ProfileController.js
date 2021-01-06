const ProfileService = require('../../service/ProfileService');
const profileModel = require('../../model/profile');
const Controller = require('./Controller');

class ProfileController extends Controller {
    constructor(service, model) {
        super(service, model);
        this.model = model;
        this.service = service;
    }
}
module.exports = new ProfileController(ProfileService, profileModel);