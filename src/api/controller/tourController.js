const tourService = require('../../service/tourService');
const tourModel = require('../../model/tour');
const Controller = require('./Controller');

class tourController extends Controller {
    constructor(service, model) {
        super(service, model);
        this.model = model;
        this.service = service;
    }
}
module.exports = new tourController(tourService, tourModel);