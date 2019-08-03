const mongoose = require('mongoose');


const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: [true, 'a team name is required'],
        unique: true
    },
    league: {
        type: String,
        required: [true, 'a league or conference is required...']
    },
    division: {
        type: String
    },
    logoImgUrl: {
        type: String,
    },
    numFavorited: {
        type: Number,
        default: 0
    },
    wl: String
})

module.exports = mongoose.model('MLB', teamSchema, 'mlbData');
// exports.NBA = mongoose.model('NBA', teamSchema, 'nbaData');