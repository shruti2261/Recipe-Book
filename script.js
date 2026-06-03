const SearchBox = document.querySelector('.SearchBox');
const btn = document.querySelector('.but');
const receipecont = document.querySelector('.receipe-cont');
const recipedetailscontent = document.querySelector('.recipe-details-content');
const closebtn = document.querySelector('.recipe-close');

const fetchreceipe=async (query)=>{
    receipecont.innerHTML="<h2>Loading Receipes...</h2>";
    try{
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response=await data.json();
    receipecont.innerHTML="";
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
        return;
    }
    fetchreceipe(searchInput);
    //console.log("Button Clicked");
});
