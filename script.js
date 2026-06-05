const SearchBox = document.querySelector('.SearchBox');
const btn = document.querySelector('.but');
const receipecont = document.querySelector('.receipe-cont');
const recipedetailscontent = document.querySelector('.recipe-details-content');
const closebtn = document.querySelector('.recipe-close');
const featuredSection = document.getElementById('featuredSection');
const backBtn = document.getElementById('backBtn');

// Add click listeners to poster cards
document.addEventListener('DOMContentLoaded', () => {
    const posterCards = document.querySelectorAll('.poster-card');
    posterCards.forEach(card => {
        card.addEventListener('click', () => {
            const query = card.getAttribute('data-search');
            SearchBox.value = query;
            fetchreceipe(query);
        });
    });

    // Back button event listener
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            SearchBox.value = "";
            receipecont.innerHTML = "<h2>Search your favourite recipes.....</h2>";
            backBtn.style.display = 'none';
            if (featuredSection) {
                featuredSection.style.display = 'block';
                setTimeout(() => {
                    featuredSection.style.opacity = '1';
                }, 50);
            }
        });
    }
});

const fetchreceipe=async (query)=>{
    if (featuredSection) {
        featuredSection.style.opacity = '0';
        setTimeout(() => {
            featuredSection.style.display = 'none';
        }, 300);
    }
    if (backBtn) {
        backBtn.style.display = 'flex';
    }
    receipecont.innerHTML="<h2>Loading Receipes...</h2>";
    try{
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response=await data.json();
    receipecont.innerHTML="";
    
    if (!response.meals) {
        receipecont.innerHTML = `<h2>No recipes found. Try searching for something else!</h2>`;
        return;
    }

    response.meals.forEach(meal=>{
        const receipediv=document.createElement('div');
        receipediv.classList.add('recipe');
        receipediv.innerHTML=`
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `
        const button = document.createElement('button');
        button.textContent="View Recipe";
        
        
        receipediv.appendChild(button);
        button.addEventListener('click',()=>{
            openRecipePopup(meal)
        }); 
        receipecont.appendChild(receipediv);
    });
}
   catch(error){
     receipecont.innerHTML=`<h2>Error in Seraching Recipes...</h2>`;
   }
    //console.log(response);
}    
const fetchIntgredients=(meal)=>{
    let Ingredientsl="";
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            Ingredientsl+=`<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return Ingredientsl;
}
const openRecipePopup = (meal)=>{
    recipedetailscontent.innerHTML=`
    <h2 class="rname">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="in">${fetchIntgredients(meal)}</ul>
    <div class="rinstruction">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    `
    recipedetailscontent.parentElement.style.display="block";
}
closebtn.addEventListener('click',()=>{
    recipedetailscontent.parentElement.style.display="none";
});
btn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput= SearchBox.value.trim();
    if(!searchInput){
        receipecont.innerHTML=`<h2>Type in Search Box.</h2>`;
        if (backBtn) {
            backBtn.style.display = 'none';
        }
        if (featuredSection) {
            featuredSection.style.display = 'block';
            setTimeout(() => {
                featuredSection.style.opacity = '1';
            }, 50);
        }
        return;
    }
    fetchreceipe(searchInput);
});

// Clear results and show posters if user clears search box
SearchBox.addEventListener('input', () => {
    if (SearchBox.value.trim() === "") {
        receipecont.innerHTML = `<h2>Search your favourite recipes.....</h2>`;
        if (backBtn) {
            backBtn.style.display = 'none';
        }
        if (featuredSection) {
            featuredSection.style.display = 'block';
            setTimeout(() => {
                featuredSection.style.opacity = '1';
            }, 50);
        }
    }
});
