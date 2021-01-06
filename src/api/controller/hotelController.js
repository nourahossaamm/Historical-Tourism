const hotelService = require('../../service/hotelService');
const hotelModel = require('../../model/hotel');
const Controller = require('./Controller');

class hotelController extends Controller {
    constructor(service, model) {
        super(service, model);
        this.model = model;
        this.service = service;
    }
}
module.exports = new hotelController(hotelService, hotelModel);