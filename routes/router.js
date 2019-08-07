const express = require('express');
const sportsController = require('./../controller/sportsController');
const mlbController = require('./../controller/mlbController');
const authController = require('./../controller/authController');

const router = express.Router();


// signup router... THIS SHOULD BE A POST
router.route('/signup').post(authController.signup);
// login router
router.route('/login').post(authController.login);
// users
router.route('/users').get(authController.getUsers);


// router for sports
router.route('/sports').get(sportsController.getSports);

// router for mlb
router
    .route('/mlb')
    .get(mlbController.getAllTeams)
    .post(mlbController.createNewTeam);

router
    .route('/mlb/:id')
    .get(mlbController.getTeam)
    .delete(mlbController.deleteTeam);

module.exports = router;