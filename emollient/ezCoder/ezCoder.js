//buttons =======================================

let sections = [
    {
        "name": "Collection",
        "link": "collectionCoder.html",
        "description": "collection description"
    },
    {
        "name": "Ingredients",
        "link": "ingredientsCoder.html",
        "description": "ingredients description"

    },
    {
        "name": "Quiz",
        "link": "quizCoder.html",
        "description": "quiz description"
    }
]

function makeButtons(){
    let st = "";

    for (let section of sections){
        st += `
            <a href=${section.link} class="sectionButton">
                <div class="sectionContent">
                    <h1 class="nom">${section.name}</h1>
                    <p>${section.description}<p>
                </div>
            </a>
        `;
    }


    document.getElementById("sections").innerHTML = st;
}

makeButtons();