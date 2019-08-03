const express = require('express');
const sportsController = require('./../controller/sportsController');
const mlbController = require('./../controller/mlbController');

const router = express.Router();

// router for sports
router.route('/').get(sportsController.getSports);

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