const bcrypt = require('bcryptjs');
const responseCodes = require('../config/responseCodes');
const _ = require('lodash');

class Service {
    constructor(model) {
        this.model = model;
    }

    async signup(payload) {
        const item = await this.insert(payload);
        let response = {};
        if (item.body.success) {
            response = responseCodes["06"];
            response.body.data = item.body.data;
            return response;
        } else {
            response = responseCodes["10"];
            return response;
        }
    }

    async insert(data) {
        let response = {};
        try {
            console.log('_____________INSERT METHOD SERVICE____________');
            console.log('Data', data);
            let item = await this.model.create(data);
            console.log('Item Data', item);
            if (!_.isEmpty(item)) {
                response = responseCodes["06"];
                response.body.data = item;
                return response;
            }
            response = responseCodes["10"];
            return response;

        } catch (error) {
            console.log('error', error);
            response = responseCodes["07"];
            response.body.data = error;
            return response;
        }
    }

    async signin(body) {
        let response = {};
        try {
            console.log('_____________SIGNIN METHOD SERVICE____________');
            let hasProfile = await this.findOne({
                email: body.email
            });
            console.log('hasProfile', hasProfile);
            if (hasProfile) {
                let isMatch = await this.compareAsync(body.password, hasProfile.password);
                console.log('isMatch', isMatch);
                if (!isMatch) return responseCodes["02"];
                response = responseCodes["03"];
                response.body.data = hasProfile;
                return response;
            }
            return responseCodes["05"];
        } catch (error) {
            console.log('error', error);
            response = responseCodes["07"];
            response.body.data = error;
            return response;
        }
    }

    compareAsync(commingPassword, realPassword) {
        return new Promise(function (resolve, reject) {
            bcrypt.compare(commingPassword, realPassword, function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    async findOne(query) {
        try {
            let response = await this.model.findOne(query).exec();
            return response;
        } catch (error) {
            console.log('error', error);
            response = responseCodes["07"];
            response.body.data = error;
            return response;
        }
    }

    async find() {
        try {
            console.log('_____________FIND SERVICE____________');
            console.log('model', this.model.collection.name);
            let response = await this.model.find({}).exec();
            return response;
        } catch (error) {
            console.log('error', error);
            response = responseCodes["07"];
            response.body.data = error;
            return response;
        }
    }

    async findOneAndUpdate(query, payload) {
        try {
            console.log('_____________findOneAndUpdate SERVICE____________');
            let response = await this.model.findOneAndUpdate(query, payload, {
                new: true
            });
            return response;
        } catch (error) {
            console.log('error', error);
            response = responseCodes["07"];
            response.body.data = error;
            return response;
        }
    }

}
module.exports = Service;