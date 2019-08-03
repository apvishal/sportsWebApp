const mongoose = require('mongoose');

// this will have a model for all of the league info...

const leagueSchema = new mongoose.Schema({
    league: {
        type: String,
        required: [true, 'a league type is required!']
    },
    numFans: {
        type: Number,
        default: 0
    },
    numTeams: {
        type: Number,
    },
    numGames: {
        type: Number,
        required: [true, 'a number of games is required']
    }
});

const leagueModel = mongoose.model('League', leagueSchema, 'leagues');

module.exports = leagueModel;