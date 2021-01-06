const bcrypt = require('bcryptjs');
const responseCodes = require('../config/responseCodes');
const _ = require('lodash');

class Service {
    constructor(model) {
        this.model = model;
    }

    async signup(payload, host) {
        const item = await this.insert(payload);
        let response = {};
        if (item.body.success) {
            // Send the email
            const isSent = await ProfileTokenSerivce.sendEmail(item.body.data, host, 'verify');
            if (isSent.body.success) {
                response = responseCodes["06"];
                response.body.data = item.body.data;
                return response;
            };
            return isSent;

        } else {
            response = responseCodes["10"];
            return response;
        }
    }

    async insert(data) {
        let response = {};
        try {
            logger.info('_____________INSERT METHOD SERVICE____________');
            logger.info('Data', data);
            let item = await this.model.create(data);
            logger.info('Item Data', item);
            if (!_.isEmpty(item)) {
                const result = dataMapping.mapper[this.model.collection.collectionName] ? dataMapping.mapper[this.model.collection.collectionName](item) : item;
                response = responseCodes["06"];
                response.body.data = result;
                return response;
            }
            response = responseCodes["10"];
            return response;

        } catch (error) {
            logger.info('error', error);
            response = responseCodes["07"];
            response.body.data = error;
            return response;
        }
    }

    async signin(body, cookies) {
        let response = {};
        try {
            logger.info('_____________SIGNIN METHOD SERVICE____________');
            let token = cookies.auth;
            logger.info('tokeen', token);
            let hasToken = await ProfileTokenSerivce.findOne({
                email: body.email,
                token: token
            });
            logger.info('hasToken', hasToken);
            if (hasToken) {
                response = responseCodes["01"];
                response.body.data = hasToken;
                return response;
            }
            let hasProfile = await this.findOne({
                email: body.email
            });
            logger.info('hasProfile', hasProfile);
            if (hasProfile) {
                let isMatch = await this.compareAsync(body.password, hasProfile.password);
                logger.info('isMatch', isMatch);
                if (!isMatch) return responseCodes["02"];
                let existToken = await ProfileTokenSerivce.generateToken(hasProfile);
                logger.info('existToken', existToken);
                if (existToken) {
                    response = responseCodes["03"];
                    response.body.data = existToken;
                    return response;
                }
                return responseCodes["04"];
            }
            return responseCodes["05"];
        } catch (error) {
            logger.info('error', error);
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
        logger.info('error', error);
        response = responseCodes["07"];
        response.body.data = error;
        return response;
    }
    }

    async find(query) {
        try {
            logger.info('_____________FIND SERVICE____________');
            let response = await this.model.find(query).exec();
            return response;
        } catch (error) {
            logger.info('error', error);
            response = responseCodes["07"];
            response.body.data = error;
            return response;
        }
    }

    async findOneAndUpdate(query, payload) {
        try {
            logger.info('_____________findOneAndUpdate SERVICE____________');
            let response = await this.model.findOneAndUpdate(query, payload, {
                new: true
            });
            return response;
        } catch (error) {
            logger.info('error', error);
            response = responseCodes["07"];
            response.body.data = error;
            return response;
        }
    }

}
module.exports = Service;