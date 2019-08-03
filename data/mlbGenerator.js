var fs = require('fs');

const IMG_URL_TEMPLATE = 'https://cdn.bleacherreport.net/images/team_logos/328x328/';

var array = fs.readFileSync('./mlbData.txt').toString().split("\n");
// let mlbTeams = {Leagues: ['American', 'National'], fans: 0, teams: []};
let mlbTeams = [];
for(i in array) {
    let tempObj = {};
    console.log(`processing ${array[i]}`);
    let teamArr = array[i].split(',');
    tempObj.teamName = teamArr[0].trim();
    tempObj.league = teamArr[1].trim();
    tempObj.division = teamArr[2].trim();
    tempObj.logoImgUrl = `${IMG_URL_TEMPLATE}${array[i].toLowerCase().replace(/ /g,'_')}.png`;
    tempObj.numFavorited = 0;
    tempObj.wl = '-';
    mlbTeams.push(tempObj);
}

console.log(mlbTeams);

console.log("writing to a file syncronously...");
fs.writeFileSync('./mlbData.json', JSON.stringify(mlbTeams));
