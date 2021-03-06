const responseCodes = require('../../config/responseCodes');

class Controller {
  constructor(service, model) {
    this.service = service;
    this.model = model;
  }
  async insert(req, res) {
    let response = {};
    try {
      console.log('_____________INSERT METHOD CONTROLLER____________');
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
      console.log('_____________SIGNIN METHOD CONTROLLER____________');
      response = await this.service.signin(req.body);
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
      console.log('_____________SignUp METHOD CONTROLLER____________');
      response = await this.service.signup(req.body);
      console.log('response', response);
      return response;
    } catch (error) {
      console.log('errr', error);
      response = responseCodes["07"];
      response.body.data = error;
      return response;
    }
  }

  async update(req, res){
    let response = {};
    try {
      console.log('_____________UPDATE METHOD CONTROLLER____________');
      const query = {
        _id: req.params._id
      };
      response = await this.service.findOneAndUpdate(query, req.body);
      console.log('response', response);
      return response;
    } catch (error) {
      console.log('errr', error);
      response = responseCodes["07"];
      response.body.data = error;
      return response;
    }
  }

  async findOne(req, res){
    let response = {};
    try {
      console.log('_____________FINDEONE METHOD CONTROLLER____________');
      const query = {
        _id: req.params._id
      };
      response = await this.service.findOne(query);
      console.log('response', response);
      return response;
    } catch (error) {
      console.log('errr', error);
      response = responseCodes["07"];
      response.body.data = error;
      return response;
    }
  }
  async findAll(){
    let response = {};
    try {
      console.log('_____________FINDEALL METHOD CONTROLLER____________');
      response = await this.service.find();
      console.log('response', response);
      return response;
    } catch (error) {
      console.log('errr', error);
      response = responseCodes["07"];
      response.body.data = error;
      return response;
    }
  }
}
module.exports = Controller;