const express = require('express');
const ProfileController = require('./controller/ProfileController');
const HotelController = require('./controller/hotelController');
const TourController = require('./controller/tourController');
const router = express.Router();

//  ------------------------------------------------------------------------------------//
// APIs For Profile

router.post('/profile/signup', async (req, res) => {
  console.log('req', req.body);
  const response = await ProfileController.signup(req, res);
  res.status(response.status ? response.status : 500).json(response.body);
});

router.post('/profile/signin', async (req, res) => {
  const response = await ProfileController.signin(req, res);
  res.status(response.status ? response.status : 500).json(response.body);
});

router.post('/hotel', async (req, res) => {
  const response = await HotelController.insert(req, res);
  res.status(response.status ? response.status : 500).json(response.body);
});
router.get('/hotel', async (req, res) => {
  const response = await HotelController.findAll(req, res);
  res.status(response.status ? response.status : 500).json(response);
});

router.post('/tour', async (req, res) => {
  const response = await TourController.insert(req, res);
  res.status(response.status ? response.status : 500).json(response.body);
});
router.get('/tour', async (req, res) => {
  const response = await TourController.findAll(req, res);
  res.status(response.status ? response.status : 500).json(response);
});

module.exports = router;