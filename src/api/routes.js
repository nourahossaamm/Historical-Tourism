const express = require('express');
const ProfileController = require('./controller/ProfileController');
const router = express.Router();
const multer = require('multer');

const upload = multer();

//  ------------------------------------------------------------------------------------//
// Common APIs

router.post('/rest/api/v1/uploadImage', upload.none(), async (req, res) => {
  const response = await imageController.insert(req, res);
  res.status(response.status ? response.status : 500).json(response.body);
});

router.post('/rest/api/v1/retrieveImage',async (req, res) => {
  logger.info('req', req.body);
  const response = await imageController.getImage(req.body);
  res.status(response.status ? response.status : 500).json(response.body);
});
//  ------------------------------------------------------------------------------------//
// APIs For Profile (Client and Partner)

router.post('/profile/signup', async (req, res) => {
  logger.info('req', req.body);
  const response = await ProfileController.signup(req, res);
  res.status(response.status ? response.status : 500).json(response.body);
});

router.post('/profile/signin', async (req, res) => {
  const response = await ProfileController.signin(req, res);
  if (response.body.success) {
    res.cookie('auth', response.body.data.token).status(response.status ? response.status : 500).json(response.body);
  } else {
    res.status(response.status ? response.status : 500).json(response.body);
  }
});

router.put('/profile/:_id', async (req, res) => {
  const response = await ProfileController.update(req, res);
  res.status(response.status ? response.status : 500).json(response.body);
});

router.get('/profile/:_id', async (req, res) => {
  const response = await ProfileController.findOne(req, res);
  res.status(response.status ? response.status : 500).json(response.body);
});

module.exports = router;