const questions = [
    {
        question:"Where do you feel the most dryness?",
        answers:["Hands","Feet","Elbows","Legs","Knees","Stomach","Back"]
    },
    {
        question:"How often do you moisturize?",
        answers:[
            "Every day, religiously",
            "A few times a week",
            "Only when I remember",
            "Rarely"
        ]
    },
    {
        question:"What's your skin goal?",
        answers:[
            "Deep hydration",
            "Soothing irritation",
            "Preventing stretch marks",
            "Softening rough patches"
        ]
    },
    {
        question:"Pick a vibe:", //maybe take out the scents
        answers:[
            "Refreshing",
            "Calming",
            "Clean & simple",
            "Herbal & grounding"
        ]
    },
    {
        question: "Do you have any skin concerns?",
        answers:[
            "Eczema or sensitivity",
            "Ashiness",
            "Flakiness",
            "No concerns, just want to glow"
        ]
    }
]

const products = [
    {
        "name": "Lemon + Sage Body Butter ",
        "link": "https://myemollient.com/collections/lemon-sage",
        "imgUn": "https://myemollient.com/cdn/shop/files/Lemon_Sage_Body_Butter_for_Dry_Skin_and_Ec_1296x.jpg?v=1728704501",
        "imgDeux": "https://myemollient.com/cdn/shop/files/lemon_and_sage_body_butter_1296x.jpg?v=1728519251",
        "description": "description",
        "answers": ["Elbows", "Knees","Legs", "Herbal & grounding"]
    },

    {
        "name": "Lavender Body Butter",
        "link": "https://myemollient.com/collections/lavender-body-butter",
        "imgUn": "https://myemollient.com/cdn/shop/files/handmade-lavender-body-butter_2700x.jpg?v=1747099010",
        "imgDeux": "https://myemollient.com/cdn/shop/products/my-emollient-dry-skin-solution_2700x.jpg?v=1747099010",
        "description": "description",
        "answers": ["Preventing stretch marks", "Calming"]
    },
    {
        "name": "Body Butter for Sensitive Skin",
        "link": "https://myemollient.com/collections/body-butter-for-sensitive-skin",
        "imgUn": "https://myemollient.com/cdn/shop/products/amber2_50_sensitive_1296x.jpg?v=1585272159",
        "imgDeux": "https://myemollient.com/cdn/shop/files/body_butter_for_sensitive_skin_and_eczema_1296x.jpg?v=1729980179",
        "description": "description",
        "answers": [""]
    },
    {
        "name": "Unscented Body Butter",
        "link": "https://myemollient.com/collections/unscented",
        "imgUn": "https://myemollient.com/cdn/shop/files/Unscented_Body_Butter_for_Winter_Dry_Skin_1296x.jpg?v=1737604260",
        "imgDeux": "https://myemollient.com/cdn/shop/files/best-body-butter-dry-skin-jar-closed_1296x.jpg?v=1747158292",
        "description": "description",
        "answers": ["Stomach", "Back", "Eczema or sensitivity", "Clean & simple"]
    },
    {
        "name": "Peppermint Body Butter",
        "link": "https://myemollient.com/collections/peppermint-body-butter",
        "imgUn": "https://myemollient.com/cdn/shop/files/Peppermint_body_butter_for_eczema_dry_skin_menopause_and_hot_flashes_1296x.jpg?v=1750775986",
        "imgDeux": "https://myemollient.com/cdn/shop/files/Cooling_Body_Butter_1296x.png?v=1750776262",
        "description": "description",
        "answers:": ["Hands", "Feet", "Refreshing"]
    }
]

function makeQuiz(){
    let st=`<form>`; //initialize
    for (let q = 0; q < questions.length; q++){ //iterate through questions
        st += `<p>${questions[q].question}</p>`; //quesiton
        for (let a = 0; a < questions[q].answers.length; a++){
            st+=`<input type = "radio"
                id="q${q}a${a}" value="${questions[q].answers[a]}" name="q${q}">
                <label for="q${q}a${a}">${questions[q].answers[a]}</label>    <br>`;
        }
    }
    st += `<br><button type="submit" onclick="quizResp()">Submit</button></form>`; //end form
    document.getElementById("quiz").innerHTML=st;


}


makeQuiz();

function quizResp(){

    alert("button clicked");
    
    let butter = null;

        let resp = []; //responses
        for (let q = 0; q < questions.length; q++){ //create list of responses
            let selected=document.querySelector(`input[name="q${q}"]:checked`);
            if (selected){
                resp.push(selected.value);
            }
        }
        
        let highestScore=0;

        //answer comparisons
        for (let product of products){ //iterate through each outcome
            let score = 0;
            for (let r of resp){ //iterate through responses
                if (product.answers.includes(r)){
                    score++;
                }
            }

            if (score > highestScore){ //score comparison
                highestScore = score;
                butter = product.name;
            }
        }
    
    
    if (butter != null){
        makeResp(butter);
    }
}



function makeResp(butter){
    let index = products.indexOf(butter);
    let st=``; //initlialize string

    st+=
    `<div class="cell-container">
        <div class="cell">
            <div class="imgs">
                <a href=${products[index].link}>
                    <img class="un" src=${products[index].imgUn} alt="">
                    <img class="deux" src=${products[index].imgDeux} alt="">
                    <a href=${products[index].link} class="overlay-btn">SHOP CLEAN</a>
                </a>
            </div>
        </div>
        <div class="descriptCell">
            <a class="name" href=${products[index].link}>${products[index].name}</a>
            <br>
            <p class="descript">${products[index].description}</p>
        </div>
    </div>`;

    document.getElementById("results").innerHTML = st;
    

}

makeResp("Lavender Body Butter");