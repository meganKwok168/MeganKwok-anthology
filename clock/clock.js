//variables storing parts of dates
let now = new Date();
let semaine = now.getDay();
let jour = now.getDate();
let mois = now.getMonth();
let an = now.getFullYear();
let heure = now.getHours();
let min = now.getMinutes();
let sec = now.getSeconds();

//digital clock
let heureUne = Math.trunc(heure/10);
let heureDeux = heure % 10;
let minUn = Math.trunc(min/10);
let minDeux = min % 10;
let secUn = Math.trunc(sec/10);
let secDeux = sec % 10;



//get full timestamp
function fullTime(){
    now = new Date();
    semaine = now.getDay();
    jour = now.getDate();
    mois = now.getMonth();
    an = now.getFullYear();
    heure = now.getHours();
    min = now.getMinutes();
    sec = now.getSeconds();

    document.getElementById("horloge").innerHTML = now;
} //fullTime()

fullTime();

//make a digital clock
function makeDigital(){
    //parts of a digital clock
    let heureUne = Math.trunc(heure / 10);
    let heureDeux = heure % 10;
    let minUn = Math.trunc(min / 10);
    let minDeux = min % 10;
    let secUn = Math.trunc(sec / 10);
    let secDeux = sec % 10;
    let times = [heureUne, heureDeux, ":", minUn, minDeux, ":", secUn, secDeux];

    let digital = ""; //initialize html string
    digital += `<table class="tableau"> <tr>`; //start table

    //iterate through times[] and add code
    for(let time of times){
        digital += `<td class="timeCell"> <h1>${time}</h1> </td>`;
    };

    digital += `</tr> </table>` //finish table
    document.getElementById("tableau").innerHTML = digital; //insert html string
} //makeDigital()

makeDigital();

//make calender
function makeCalendar(){
    

    //Jan = 0;
    const months = [31, febDays(), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let cal = []; //list containing html strings;

    for (let i = 1; i <= months[mois]; i++){
        cal.push(`<td class=calCell>${i}</td>`);
    }

    //to fill out front
    //Sun = 0
    let startDay = jour-semaine;
    startDay -= 1; //adjust

    let counter = 0; //counter for times `<tr>` is added

    while (startDay > 0){
        cal.splice(startDay,0,`<tr>`);
        startDay -= 7;
        counter ++;
    }

    if(cal.indexOf(`<tr>`)!= 0){    //fill out front
        let fillOut = 7-cal.indexOf(`<tr>`);
        for (let i = 0; i<fillOut; i++){
            cal.splice(0,0,`<td class=calOther>${months[mois-1] - i}</td>`);
        }
        cal.splice(0,0,`<tr>`);
        counter++;
    }

    startDay = jour-semaine; //reset
    startDay += 7; //adjust to next week
    let indexStart = jour + counter;

    while(startDay <= months[mois]){ //splice in <tr> for days after current day
        cal.splice(indexStart,0,`<tr>`);
        startDay += 7;
        indexStart += 7;
        counter++
    }

    if(cal[cal.length] != `<tr>`){ //filling in next month
        let filled = ((cal.length - counter) % 7); //remember to subtract counter
        let fillOut = 7-filled;
        console.log(fillOut);
        for(let i = 0; i<fillOut; i++){
            cal.push(`<td class=calOther>${i+1}</td>`); 
        }
        cal.push(`</tr>`); //last thing in call should be </tr>
    }
    else if(cal[cal.length] == `<tr>`){ //last thing in cal should be </tr>
        cal[cal.length] = `</tr>`;
    }

    let endCounter = 1; //adjust bc counter is +1
    while(endCounter < counter){ //add in </tr>
        cal.splice((endCounter * 8)+(endCounter-1),0,`</tr>`);
        endCounter++;
    }

    console.log(cal);


    //writing html string
    st = `<table = class="calTableau">   
        <tr>    <th colspan="7" class="calHead">${now.toLocaleString('default',{month: 'long'})} </th></tr>`; //started html string


    //weekday heading
    st += `<tr>`; //initalize row
    const weekDays = ["S","M","T","W","T","F","S"];
    for (let day of weekDays){
        st +=`<td class="calWk">${day}</td>`;
    }

    for (let c of cal){ //iterate throughout cal and add to string
        if (c == `<td class=calCell>${jour}</td>`){
            c = `<td class=calCurrent>${jour}</td>`;
        }
        st += c;
    }

    st += `</table>`;  //finish string

    // console.log(st);
    document.getElementById("calendrier").innerHTML = st; //insert HTML string
    
}  //makeCalendar()
makeCalendar();

//helper function for Feb
function febDays(){
    if (an % 400 == 0){
        return 29;
    }
    else if ((an % 4 == 0) && (an % 100 != 0)){
        return 29;
    }
    return 28;
} //febDays


//helper function for updates
function functTracker(){
    fullTime();
    makeDigital();
    // makeCalendar();
}
setInterval(functTracker, 1000); //update every function per 1000 ms (1 sec)
            //remember pass w/o "()"

