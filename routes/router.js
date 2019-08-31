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
router.route('/sports').get(authController.isLoggedIn, sportsController.getSports);

router.use(authController.isLoggedIn);
// router for mlb
// router
//     .route('/mlb')
//     .get(mlbController.getAllTeams)
//     .post(mlbController.createNewTeam);

// router.use(sportsController.verifySport);

router.route('/:sport')
.get(sportsController.verifySport, sportsController.getAllTeams)
.post(authController.restricted('admin'),sportsController.createNewTeam);

router
    .route('/:sport/:id')
    .get(sportsController.getTeam)
    .delete(sportsController.deleteTeam);

module.exports = router;