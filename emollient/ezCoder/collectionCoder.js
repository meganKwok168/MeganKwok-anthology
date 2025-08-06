let defaultProducts = [
    {
        "name": "Lemon + Sage Body Butter ",
        "link": "https://myemollient.com/collections/lemon-sage",
        "imgUn": "https://myemollient.com/cdn/shop/files/Lemon_Sage_Body_Butter_for_Dry_Skin_and_Ec_1296x.jpg?v=1728704501",
        "imgDeux": "https://myemollient.com/cdn/shop/files/lemon_and_sage_body_butter_1296x.jpg?v=1728519251"
    },

    {
        "name": "Lavender Body Butter",
        "link": "https://myemollient.com/collections/lavender-body-butter",
        "imgUn": "https://myemollient.com/cdn/shop/files/handmade-lavender-body-butter_2700x.jpg?v=1747099010",
        "imgDeux": "https://myemollient.com/cdn/shop/products/my-emollient-dry-skin-solution_2700x.jpg?v=1747099010"
    },
    {
        "name": "Almond + Vanilla Body Butter",
        "link": "https://myemollient.com/collections/almond-vanilla-body-butter",
        "imgUn": "https://myemollient.com/cdn/shop/files/almond-vanilla-body-butter-orgnanic-moisturizer_1296x.jpg?v=1747415007",
        "imgDeux": "https://myemollient.com/cdn/shop/files/whipped-almond-vanilla-body-butter-texture-eczema_1296x.jpg?v=1747427110"
    },
    {
        "name": "Body Butter for Sensitive Skin",
        "link": "https://myemollient.com/collections/body-butter-for-sensitive-skin",
        "imgUn": "https://myemollient.com/cdn/shop/products/amber2_50_sensitive_1296x.jpg?v=1585272159",
        "imgDeux": "https://myemollient.com/cdn/shop/files/body_butter_for_sensitive_skin_and_eczema_1296x.jpg?v=1729980179"
    },
    {
        "name": "Unscented Body Butter",
        "link": "https://myemollient.com/collections/unscented",
        "imgUn": "https://myemollient.com/cdn/shop/files/Unscented_Body_Butter_for_Winter_Dry_Skin_1296x.jpg?v=1737604260",
        "imgDeux": "https://myemollient.com/cdn/shop/files/best-body-butter-dry-skin-jar-closed_1296x.jpg?v=1747158292"
    },
    {
        "name": "Peppermint Body Butter",
        "link": "https://myemollient.com/collections/peppermint-body-butter",
        "imgUn": "https://myemollient.com/cdn/shop/files/Peppermint_body_butter_for_eczema_dry_skin_menopause_and_hot_flashes_1296x.jpg?v=1750775986",
        "imgDeux": "https://myemollient.com/cdn/shop/files/Cooling_Body_Butter_1296x.png?v=1750776262"
    },
    {
        "name": "Gift Sets",
        "link": "https://myemollient.com/collections/body-butter-gift-set",
        "imgUn": "https://myemollient.com/cdn/shop/files/Body_Butter_Sample_Trio_1296x.jpg?v=1728516912",
        "imgDeux": "https://myemollient.com/cdn/shop/files/Body_Butter_Trio_Gift_Set_1296x.jpg?v=1728517041"
    },
    {
        "name": "Anti-Bacterial Body Butter",
        "link": "https://myemollient.com/collections/antibacterial-body-butter",
        "imgUn": "https://myemollient.com/cdn/shop/products/antibacterial-body-butter-small_1296x.webp?v=1681356427",
        "imgDeux": "https://myemollient.com/cdn/shop/products/emol75_anti_3000x_014b4421-0788-4dec-a2f2-9310192e7a0c_1296x.jpg?v=1681356427"
    }
]


let tempProducts = [
    {
        "name": "Lemon + Sage Body Butter ",
        "link": "https://myemollient.com/collections/lemon-sage",
        "imgUn": "https://myemollient.com/cdn/shop/files/Lemon_Sage_Body_Butter_for_Dry_Skin_and_Ec_1296x.jpg?v=1728704501",
        "imgDeux": "https://myemollient.com/cdn/shop/files/lemon_and_sage_body_butter_1296x.jpg?v=1728519251"
    },

    {
        "name": "Lavender Body Butter",
        "link": "https://myemollient.com/collections/lavender-body-butter",
        "imgUn": "https://myemollient.com/cdn/shop/files/handmade-lavender-body-butter_2700x.jpg?v=1747099010",
        "imgDeux": "https://myemollient.com/cdn/shop/products/my-emollient-dry-skin-solution_2700x.jpg?v=1747099010"
    },
    {
        "name": "Almond + Vanilla Body Butter",
        "link": "https://myemollient.com/collections/almond-vanilla-body-butter",
        "imgUn": "https://myemollient.com/cdn/shop/files/almond-vanilla-body-butter-orgnanic-moisturizer_1296x.jpg?v=1747415007",
        "imgDeux": "https://myemollient.com/cdn/shop/files/whipped-almond-vanilla-body-butter-texture-eczema_1296x.jpg?v=1747427110"
    },
    {
        "name": "Body Butter for Sensitive Skin",
        "link": "https://myemollient.com/collections/body-butter-for-sensitive-skin",
        "imgUn": "https://myemollient.com/cdn/shop/products/amber2_50_sensitive_1296x.jpg?v=1585272159",
        "imgDeux": "https://myemollient.com/cdn/shop/files/body_butter_for_sensitive_skin_and_eczema_1296x.jpg?v=1729980179"
    },
    {
        "name": "Unscented Body Butter",
        "link": "https://myemollient.com/collections/unscented",
        "imgUn": "https://myemollient.com/cdn/shop/files/Unscented_Body_Butter_for_Winter_Dry_Skin_1296x.jpg?v=1737604260",
        "imgDeux": "https://myemollient.com/cdn/shop/files/best-body-butter-dry-skin-jar-closed_1296x.jpg?v=1747158292"
    },
    {
        "name": "Peppermint Body Butter",
        "link": "https://myemollient.com/collections/peppermint-body-butter",
        "imgUn": "https://myemollient.com/cdn/shop/files/Peppermint_body_butter_for_eczema_dry_skin_menopause_and_hot_flashes_1296x.jpg?v=1750775986",
        "imgDeux": "https://myemollient.com/cdn/shop/files/Cooling_Body_Butter_1296x.png?v=1750776262"
    },
    {
        "name": "Gift Sets",
        "link": "https://myemollient.com/collections/body-butter-gift-set",
        "imgUn": "https://myemollient.com/cdn/shop/files/Body_Butter_Sample_Trio_1296x.jpg?v=1728516912",
        "imgDeux": "https://myemollient.com/cdn/shop/files/Body_Butter_Trio_Gift_Set_1296x.jpg?v=1728517041"
    },
    {
        "name": "Anti-Bacterial Body Butter",
        "link": "https://myemollient.com/collections/antibacterial-body-butter",
        "imgUn": "https://myemollient.com/cdn/shop/products/antibacterial-body-butter-small_1296x.webp?v=1681356427",
        "imgDeux": "https://myemollient.com/cdn/shop/products/emol75_anti_3000x_014b4421-0788-4dec-a2f2-9310192e7a0c_1296x.jpg?v=1681356427"
    }
]

let defaultHeading = "My Emollient Body Butter Collection";
let tempHeading = "My Emollient Body Butter Collection"

let mode = "default";
let products = defaultProducts;
let head = defaultHeading;


function makeHeading(){
    document.getElementById("heading").textContent = head;
}   
makeHeading()

function makeGrid() {
    let st = "";
    for (let i = 0; i < products.length; i++) {
        st += `
        <div class="cell">
            <div class="imgs" onclick="showInfo(${i})">
                <!--<a href="${products[i].link}">  -->                 
                    <img class="un" src="${products[i].imgUn}" alt="">
                    <img class="deux" src="${products[i].imgDeux}" alt="">
                <!--</a>-->
            </div>
            <br>
            <a class="name" href="${products[i].link}">${products[i].name}</a>
        </div>`;
    }
    document.getElementById("rest").innerHTML = st;
}
makeGrid();

let defaultButtons = [
    {
        "name": "Get Shopify Code",
        "function": "makeShopifyCode()"
    },
    {
        "name": "Get HTML Code",
        "function": "makeHTMLCode()"
    },
    {
        "name": "Edit Mode",
        "function": "switchMode()"
    }
]

let tempButtons = [
    {
        "name": "Get Shopify Code",
        "function": "makeShopifyCode()"
    },
    {
        "name": "Get HTML Code",
        "function": "makeHTMLCode()"
    },
    {
        "name": "Save as Default",
        "function": "saveAsDefault()" 
    },
    {
        "name": "Save as Temporary",
        "function": "saveAsTemporary()"
    },
    {
        "name": "Revert All",
        "function": "revert()"
    },
    {
        "name": "See Default",
        "function": "switchMode()"
    }
]

buttons = defaultButtons;
function makeButtons(){
    let st = ``;
    for (button of buttons){
        st+=`<button class="bouton" onclick=${button.function}>${button.name}</button>`
    }
    if (buttons == defaultButtons){
        st+=`<button class="bouton" onclick="window.location.href='ezCoder.html'">Home</button>`;
    }
    document.getElementById("buttons").innerHTML = st;
}
makeButtons();

function showInfo(index){
    if (mode == "default"){
        st=`
            Name: ${products[index].name}
            <br>
            Link: <a style="text-align: center;" href="${products[index].link}">${products[index].link}</a>
            <br>
            Image 1:
            <img style="width: 15vw; height: 15vw;" src="${products[index].imgUn}" alt="">
            <br>
            Image 2:
            <img style="width: 15vw; height: 15vw;" src="${products[index].imgDeux}" alt="">
            <br>
            Product Index: ${index}
            <p onclick="hideRight()" style="cursor: pointer; text-decoration: underline">Hide</p>

        `;
        document.getElementById("right").innerHTML=st;
    }
    else if (mode == "temp"){
        st=`
        <form id="editProducts">
            <label for="productName">Name: </label><input type="text" name="productName" id="productName" value="${products[index].name}"><br>
            <label for="productLink">Link: </label><input type="text" name="productLink" id="productLink" value="${products[index].link}"><br>
            <label for="productImgUn">Image 1 Link: </label><input type="text" name="productImgUn" id="productImgUn" value="${products[index].imgUn}"><br>
            <label for="productImgDeux">Image 2 Link: </label><input type="text" name="productImgDeux" id="productImgDeux" value="${products[index].imgDeux}"><br>
            <label for="productIndex">Product Index (0-7): </label><input type="number" name="productIndex" id="productIndex" min="0" max="7"value=${index}>
            <input type="submit" value="Submit">
        </form>
        <br>
        <p onclick="hideRight()" style="cursor: pointer; text-decoration: underline">Hide</p>
        `;
        document.getElementById("right").innerHTML=st;

        document.getElementById("editProducts").addEventListener("submit", function(e){
            e.preventDefault();
            let i = parseInt(document.getElementById("productIndex").value);
            
            if (index != i){
                let tempProd = products[index];
                products.splice(index,1);
                products.splice(i,0,tempProd);
            }

            index = i;
            let tempProduct = {
                name: document.getElementById("productName").value,
                link: document.getElementById("productLink").value,
                imgUn: document.getElementById("productImgUn").value,
                imgDeux: document.getElementById("productImgDeux").value
            }

            products[index] = tempProduct;

            makeGrid();
            hideRight();
        });

    }
}

function hideRight(){
    document.getElementById("right").innerHTML=``;
}

function makeShopifyCode(){
hideHTMLCode();
let st = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Collection</title>
    <style>
        #rest {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 20px;
            justify-items: center;
        }

        @media (min-width: 600px) {
            #rest {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (min-width: 992px) {
            #rest {
                grid-template-columns: repeat(4, 1fr);
            }
        }

        .cell {
            text-align: center;
            padding-bottom: 20px;
        }

        .imgs {
            position: relative;
            width: 300px;
            height: 300px;
        }

        .un,
        .deux {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .deux {
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .imgs:hover .deux {
            opacity: 1;
        }

        .heading {
            text-align: center;
            padding-top: 10px;
        }

        .name {
            text-decoration: none;
            color: black;
        }

        .name:visited {
            color: black;
        }
    </style>
</head>
<body>
    <div id="rest"></div>

    <script>
        const products = ${JSON.stringify(products)};
        let gridContent = "";
        for (let i = 0; i < products.length; i++) {
            gridContent += \`
            <div class="cell">
                <div class="imgs">
                    <a href="\${products[i].link}">                    
                        <img class="un" src="\${products[i].imgUn}" alt="">
                        <img class="deux" src="\${products[i].imgDeux}" alt="">
                    </a>
                </div>
                <br>
                <a class="name" href="\${products[i].link}">\${products[i].name}</a>
            </div>\`;
        }
        document.getElementById("rest").innerHTML = gridContent;
    </script>
</body>
</html>
`;

    document.getElementById("right").textContent = st;
    copier("right");
    buttons[0].name = "Hide Shopify Code";
    buttons[0].function = "hideShopifyCode()";
    makeButtons();
}

function makeHTMLCode(){
hideShopifyCode();
    let st = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Collection</title>
    <style>
        #rest {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 20px;
            justify-items: center;
        }

        @media (min-width: 600px) {
            #rest {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (min-width: 992px) {
            #rest {
                grid-template-columns: repeat(4, 1fr);
            }
        }

        .cell {
            text-align: center;
            padding-bottom: 20px;
        }

        .imgs {
            position: relative;
            width: 300px;
            height: 300px;
        }

        .un,
        .deux {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .deux {
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .imgs:hover .deux {
            opacity: 1;
        }

        .heading {
            text-align: center;
            padding-top: 10px;
        }

        .name {
            text-decoration: none;
            color: black;
        }

        .name:visited {
            color: black;
        }
    </style>
</head>
<body>
    <div id="rest"></div>

    <script>
        const products = ${JSON.stringify(products)};
        let gridContent = "";
        for (let i = 0; i < products.length; i++) {
            gridContent += \`
            <div class="cell">
                <div class="imgs">
                    <a href="\${products[i].link}">                    
                        <img class="un" src="\${products[i].imgUn}" alt="">
                        <img class="deux" src="\${products[i].imgDeux}" alt="">
                    </a>
                </div>
                <br>
                <a class="name" href="\${products[i].link}">\${products[i].name}</a>
            </div>\`;
        }
        document.getElementById("rest").innerHTML = gridContent;
    </script>
</body>
</html>
`;

    document.getElementById("right").textContent = st;
    copier("right");
    buttons[1].name = "Hide HTML Code";
    buttons[1].function = "hideHTMLCode()";
    makeButtons();
}


function hideHTMLCode(){
    hideRight();
    buttons[1].name = "Get HTML Code";
    buttons[1].function = "makeHTMLCode()";
    makeButtons();
}

function hideShopifyCode(){
    hideRight();
    buttons[0].name = 'Get Shopify Code';
    buttons[0].function = "makeShopifyCode()";
    makeButtons();
}

function copier(sect){
    let text = document.getElementById(sect).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert("code copied to clipboard");
    }).catch(err => {
        console.error("failed to copy: ", err);
    });
}

function saveAsDefault(){
    hideHTMLCode();
    hideShopifyCode();
    temporaryProducts = products;
    defaultProducts = temporaryProducts;
    products = temporaryProducts;
    makeGrid();
    alert("products saved as default");
}

function saveAsTemporary(){
    hideHTMLCode();
    hideShopifyCode();
    temporaryProducts = products;
    makeGrid();
    alert("products saved as temporary");
}

function revert(){
    hideRight();
    hideHTMLCode();
    hideShopifyCode();
    tempProducts = defaultProducts;
    products = tempProducts;
    makeGrid();
    alert("products reverted to default");

}

function switchMode(){
    hideRight();
    if (mode == "default"){
        mode = "temp";
        products = tempProducts;
        head = tempHeading;
        buttons = tempButtons;
    }
    else if(mode == "temp"){
        mode = "default";
        products = defaultProducts;
        head = defaultHeading;
        buttons = defaultButtons;
    }
    makeGrid();
    makeButtons();
}