const ingredients = [
    {
        name: "Organic Shea",
        short:"Shea",
        descript: "Deeply moisturizes dry skin and boosts collagen production with rich vitamins A and E",
        img: "shea.jpg"
    },
    {
        name: "Aloe Vera",
        short:"Aloe",
        descript: "Soothes irritation and calms inflammation while hydrating sensitive or eczema prone skin",
        img: "aloe.png"
    },
    {
        name: "Kokum Butter",
        short: "Kokum",
        descript: "Restores skin elasticity and supports healing without clogging pores, perfect for stretch marks",
        img: "kokum.jpg"
    },
    {
        name: "Safflower Oil",
        short: "Safflower",
        descript:  "Reduce signs of aging, repair the skin barrier, brighten hyperpigmentation, and protect against UV damage",
        img: "safflower.jpg"
    },
    {
        name: "Grapeseed Oil",
        short: "Grapeseed",
        descript: "Lightweight and antioxidant-rich, it helps fade scars and tightens skin naturally",
        img: "grape.jpg"
    },
    {
        name: "Beeswax",
        short: "Beeswax",
        descript: "Seals in moisture and creates a protective barrier to shield skin from environmental damage",
        img: "beeswax.jpg"
    },
    {
        name: "Mango Butter",
        short: "Mango",
        descript: "Softens rough skin and boosts hydration with essential fatty acids and vitamins A & C",
        img: "mango.jpg"
    }
]

function makeIngredients(){
    st=`
    <br>
    <table>
                <tr>
                        <div class="list-wrapper">
                            <ul class="list">

    `;

    for (let i of ingredients){
        st += `
        <!-- ${i.name} -->
        <li class="item">
            <div class="content" data-ingredient ="${i.short}">
                <img src="${i.img}" alt="" >
                <div class="overlay" id="overlay${i.short}">
                    <h1>
                    ${i.name}
                    <br><br>
                    <span>Learn More</span>
                    </h1>
                                            
                </div>
                <div class="learnMore" id="learnMore${i.short}"> ${i.descript}</div>
            </div>
        </li>
        `
    }

    st+= `
                            </ul>
                        </div>                                    
                    
                </tr>
            </table>`

    document.getElementById("ingredients").innerHTML = st;
}

makeIngredients();


document.addEventListener("DOMContentLoaded", function () {
  makeIngredients(); // Generate HTML first

  function descript(ingredient) {
    const learnMore = document.getElementById(`learnMore${ingredient}`);
    const overlay = document.getElementById(`overlay${ingredient}`);

    if (learnMore && overlay) {
      const isHidden = getComputedStyle(learnMore).display === "none";
      overlay.style.display = isHidden ? "none" : "flex";
      learnMore.style.display = isHidden ? "flex" : "none";
    }
  }

  // Now attach listeners to the elements we just rendered
  const contentItems = document.querySelectorAll(".content[data-ingredient]");
  contentItems.forEach(item => {
    item.addEventListener("click", () => {
      const ingredient = item.getAttribute("data-ingredient");
      descript(ingredient);
    });
  });
});
