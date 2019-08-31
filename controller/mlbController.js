
const MLB = require('./../model/teamModel');
const leagues = require('./../model/leaguesModel');

// const fs = require('fs');
// console.log(__dirname);
// const mlbData = JSON.parse(fs.readFileSync(`${__dirname}/../data/mlbData.json`, 'utf-8'));

exports.getAllTeams = async (req,res,next) => {
    // get the mlb data from database...
    const mlb = await MLB.find();
    res.status(200).json({status:'success', data: { mlb }});
};

exports.createNewTeam = async (req,res,next) => {
    console.log(req.body);

    try {
        const result = await MLB.create(req.body);
        res.status(200).json({status:'success', message: result});
    } catch(err) {
        res.status(400).json({status:'failure', message: err});
    }
};

// exports.deleteTeam = async (req,res,next) => {
//     try {
//         // req.params will have the parameters provided, in this case, id...
//         const team = await MLB.findByIdAndDelete(req.params.id);
//         if (!team) {
//             // return res.status(404).json({status: 'fail', message: 'no team found with the specified id...'});
//            return next(new Error("cant delete a non existent id..."));
//         }
//         res.status(204).json({status: 'success', message: team});
//     } catch( err) {
//         res.status(404).json({status: 'failure', message: err});
//     }
// };

// exports.getTeam = async (req,res,next) => {
//     try {
//         console.log(req.params.id);
//         const obj = await MLB.findById(req.params.id);

//         if (!obj) {
//         return res.status(404).json({status: 'fail', message: 'no team found with the specified id...'});
//         }

//         res.status(200).json({status: 'success', data: {obj}});
//     } catch(err) {
//         res.status(404).json({status: 'failure', message: err});
//     }
// };
