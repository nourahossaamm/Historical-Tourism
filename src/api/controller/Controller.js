const responseCodes = require('../../config/responseCodes');

class Controller {
  constructor(service, model) {
    this.service = service;
    this.model = model;
  }
  async insert(req, res) {
    let response = {};
    try {
      logger.info('_____________INSERT METHOD CONTROLLER____________');
      response = await this.service.insert(req.body);
      return response;
    } catch (error) {
      response = responseCodes["07"];
      response.body.data = error;
      return response;
    }
  }

  async signin(req, res) {
    let response = {};
    try {
      logger.info('_____________SIGNIN METHOD CONTROLLER____________');
      response = await this.service.signin(req.body, req.cookies);
      return response;
    } catch (error) {
      response = responseCodes["07"];
      response.body.data = error;
      return response;
    }
  }

  async signup(req, res) {
    let response = {};
    try {
      logger.info('_____________SignUp METHOD CONTROLLER____________');
      response = await this.service.signup(req.body, req.headers.host);
      logger.info('response', response);
      return response;
    } catch (error) {
      logger.info('errr', error);
      response = responseCodes["07"];
      response.body.data = error;
      return response;
    }
  }

  async update(req, res){
    let response = {};
    try {
      logger.info('_____________UPDATE METHOD CONTROLLER____________');
      const query = {
        _id: req.params._id
      };
      response = await this.service.findOneAndUpdate(query, req.body);
      logger.info('response', response);
      return response;
    } catch (error) {
      logger.info('errr', error);
      response = responseCodes["07"];
      response.body.data = error;
      return response;
    }
  }

  async findOne(req, res){
    let response = {};
    try {
      logger.info('_____________FINDEONE METHOD CONTROLLER____________');
      const query = {
        _id: req.params._id
      };
      response = await this.service.findOne(query);
      logger.info('response', response);
      return response;
    } catch (error) {
      logger.info('errr', error);
      response = responseCodes["07"];
      response.body.data = error;
      return response;
    }
  }
}
module.exports = Controller;