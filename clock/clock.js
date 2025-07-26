let now = new Date();
document.getElementById("horloge").innerHTML = now;


//variables
let semaine = now.getDay();
let jour = now.getDate();
let mois = now.getMonth();
let an = now.getFullYear();
let heure = now.getHours();
let min = now.getMinutes();
let sec = now.getSeconds();
let monthDays = daysInMonth(an,mois);
console.log(monthDays);

//digital clock
let heureUne = Math.trunc(heure/10);
let heureDeux = heure % 10;
let minUn = Math.trunc(min/10);
let minDeux = min % 10;
let secUn = Math.trunc(sec/10);
let secDeux = sec % 10;


const times = ["heureUne", "heureDeux", "minUn", "minDeux", "secUn", "secDeux"];
for (let time of times){
    document.getElementById(time).innerHTML = eval(time); //eval() discouraged due to security risks
}



//get weekday of first month date




console.log(now);