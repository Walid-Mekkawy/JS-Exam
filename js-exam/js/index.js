//------------  API fetching ----------------------//
async function apiFetch() {
    $(".loading").fadeIn(300).removeClass('hideBox')
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`

    let response = await fetch(url)
    let result = await response.json()

    $(".loading").addClass('hideBox');
    document.documentElement.style.overflow = 'auto'
    document.body.style.overflow = 'auto'

    displayMeal(result.meals)

}

async function mealDetailsAPI(id) {
    $(".loading").fadeIn(300).removeClass('hideBox')
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    // console.log(url);

    let response = await fetch(url)
    let result = await response.json()
    console.log(result.meals[0]);

    $(".loading").addClass('hideBox');
    document.documentElement.style.overflow = 'auto'
    document.body.style.overflow = 'auto'

    displayMealDetails(result.meals[0])
}

async function savingMealsAPI(id) {
    let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    // console.log(url);

    let response = await fetch(url)
    let result = await response.json()
    console.log(result.meals[0]);

    return result.meals[0]
}

async function mealDetailsAPI(id) {
    $(".loading").fadeIn(300).removeClass('hideBox')
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    console.log(url);

    let response = await fetch(url)
    let result = await response.json()
    console.log(result.meals[0]);

    $(".loading").addClass('hideBox');
    document.documentElement.style.overflow = 'auto'
    document.body.style.overflow = 'auto'

    displayMealDetails(result.meals[0])
}

async function categoriesAPI(category) {
    $(".loading").fadeIn(300).removeClass('hideBox')
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    console.log(url);

    let response = await fetch(url)
    let result = await response.json()
    console.log(result.meals);

    $('#categoriesSection').addClass('d-none')
    $('#mainRecipes').removeClass('d-none')

    $(".loading").addClass('hideBox');
    document.documentElement.style.overflow = 'auto'
    document.body.style.overflow = 'auto'

    displayMeal(result.meals)
}

async function countriesAPI(country) {
    $(".loading").fadeIn(300).removeClass('hideBox')
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`
    console.log(url);

    let response = await fetch(url)
    let result = await response.json()
    console.log(result.meals);

    $('#countriesSection').addClass('d-none')
    $('#mainRecipes').removeClass('d-none')

    $(".loading").addClass('hideBox');
    document.documentElement.style.overflow = 'auto'
    document.body.style.overflow = 'auto'

    displayMeal(result.meals)
}

async function getMealByIngredient(ingredient) {
    $(".loading").fadeIn(300).removeClass('hideBox')
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    let url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    console.log(url);

    let response = await fetch(url)
    let result = await response.json()
    console.log(result.meals);

    $('#ingredientsSection').addClass('d-none')
    $('#mainRecipes').removeClass('d-none')

    $(".loading").addClass('hideBox');
    document.documentElement.style.overflow = 'auto'
    document.body.style.overflow = 'auto'

    displayMeal(result.meals)
}

async function getIngredientsMeals() {
    $(".loading").fadeIn(300).removeClass('hideBox')
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let result = await response.json()
    console.log(result.meeals);

    $(".loading").addClass('hideBox');
    document.documentElement.style.overflow = 'auto'
    document.body.style.overflow = 'auto'
    
    displayIngredients(result.meals)
}

apiFetch()




//------------------ display functions ---------------//
let mealContainer = document.getElementById('mealContainer')

function displayMeal(list) {
    let mealText = ''
    for (let i = 0; i < list.length; i++) {
        mealText += `
        <div class="col-md-3">
            <div class="recipe-card position-relative">
                <figure class="position-relative overflow-hidden">
                    <img src="${list[i].strMealThumb}" data-index="${list[i].idMeal}" class="w-100 " alt="">
                

                    <figcaption
                    class="position-absolute h-100 w-100 d-flex justify-content-center align-items-center">
                        <h2 class=""> ${list[i].strMeal}</h2>
                    </figcaption>    
                </figure>                
            </div>
        </div>
        `
    }
    mealContainer.innerHTML = mealText
    showItems();

    let recipeCard = document.querySelectorAll('.recipe-card');
    getMealID(recipeCard);
}

let recipeDetailsContainer = document.getElementById('recipeDetailsContainer')

function displayMealDetails(meal) {
    let recipeDetailsText = ''
    let ingredients = '';
    let instructions = displaySentences(meal.strInstructions)
    let instructionText = ''

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`] != '') {
            ingredients += `<h2 class="section-header ms-2">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</h2>`
        }
    }

    for (let i = 0; i < instructions.length; i++) {
        instructionText += `<p>step ${i+1}: ${instructions[i]}</p>`
    }


    recipeDetailsText += `
    <div class="col-md-4">
        <figure class=" d-flex flex-column my-4">
        <img src="${meal.strMealThumb}" class="w-100" alt="">
        <div class="d-flex justify-content-between my-4 my-md-0">
            <h2>${meal.strMeal}</h2>
            <i class="fa-regular fa-bookmark fa-2xl" data-index ="${meal.idMeal}"></i>
        </div>
        </figure>
    </div>

    <div class="col-md-8">
        <h2>instructions:</h2>
        <p>${instructionText}</p>
        <div class="ingredients row">
            ${ingredients}
        </div>
        <div class="info d-flex py-4">
        <a class="source  href="${meal.strSource}"><i class="fa-solid fa-link"></i> blog</a>
        <a class="youtube ms-4" href="${meal.strYoutube}"><i class="fa fa-youtube-play me-4" style="color:red"></i>youtube</a>
        </div>
        <div class="info d-flex py-4">
        <div>
            <h5>cuisine:</h5>
            <a href="#">${meal.strArea}</a>
        </div>
        <div class="ms-4">
            <h5>category:</h5>
            <a href="#">${meal.strCategory}</a>
        </div>
        </div>
    </div>
    `
    recipeDetailsContainer.innerHTML = recipeDetailsText
    saveRecipe(recipeDetailsContainer)
}

ingredientContainer = document.getElementById('ingredientContainer')

function displayIngredients(ingredients) {
    console.log(ingredients);
    let ingredientsText = ''

    for (let i = 0; i < 100; i++) {
        ingredientsText += `
            <div class="col-md-2 ingredient-card" data-index="${ingredients[i].idIngredient}">
                <h2 class="section-header">${ingredients[i].strIngredient}</h2>
            </div>
        `
    }
    ingredientContainer.innerHTML = ingredientsText

    let ingredientCard = $('.ingredient-card')
    getIngredient(ingredientCard)
}


//------------------ search section ------------------//
async function searchByName(term) {
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`

    let response = await fetch(url)
    let result = await response.json()
    displayMeal(result.meals);
}
async function searchByfLetter(term) {
    term == "" ? term = "a" : "";
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`

    let response = await fetch(url)
    let result = await response.json()
    displayMeal(result.meals);
}

$('#searchByName').on('input propertychange', function () {
    if (this.value === '') {
        $('#mealContainer').html('');
    } else {
        searchByName(this.value);
    }
});
$('#searchByfLetter').on('input propertychange', function () {
    if (this.value === '') {
        $('#mealContainer').html('');
    } else {
        searchByfLetter(this.value);
    }
});






//----------------- Helper functions------------------//
function getMealID(recipe) {
    for (let i = 0; i < recipe.length; i++) {
        recipe[i].addEventListener('click', function () {
            let mealID = recipe[i].children[0].children[0].attributes[1].value;
            togglePopup(mealID);
        })
    }
}

function getIngredient(ingredients) {
    console.log(ingredients);
    for (let i = 0; i < ingredients.length; i++) {
        ingredients[i].addEventListener('click', function () {
            let ingredientID = replaceSpacesWithUnderscores(ingredients[i].children[0].innerHTML);
            getMealByIngredient(ingredientID);
        })
    }
}

let categoryCard = $('.categories-card')

function getCategory() {
    for (let i = 0; i < categoryCard.length; i++) {
        categoryCard[i].addEventListener('click', function () {
            let categroy = categoryCard.children('figcaption').children(0)[i].innerHTML;
            console.log(categroy);
            categoriesAPI(categroy)
        })
    }
}

let countryCard = $('.country-card')

function getcountry() {
    for (let i = 0; i < countryCard.length; i++) {
        countryCard[i].addEventListener('click', function () {
            let categroy = countryCard.children('figcaption').children(0)[i].innerHTML;
            console.log(categroy);
            countriesAPI(categroy)
        })
    }
}


getcountry()
getCategory()
$('a[href="#ingredientsSection"]').click(getIngredientsMeals)


//--------------------- saving recipes -------------------//
let savedRecipes = []

function saveRecipe(recipe) {
    let saveBtn = recipe.children[0].children[0].children[1].children[1]
    let recipeID = recipe.children[0].children[0].children[1].children[1].getAttribute('data-index')

    saveBtn.addEventListener('click', function () {
        if (!savedRecipes.includes(recipeID)) {
            saveBtn.classList.replace('fa-regular', 'fa-solid')
            savedRecipes.push(recipeID);
        }
    })
}

var mealPage = $('#savedGames');



/* ---------------------- UI and Togglers ----------------- */
//close popup
$('.fa-multiply').click(togglePopup)

//toggle popup
var mealPage = $('#recipeDetails');

function togglePopup(id) {
    if (mealPage.hasClass('hideBox')) {
        mealDetailsAPI(id);
        mealPage.removeClass('hideBox');
        mealPage.addClass('showBox');
        document.documentElement.style.overflow = 'hidden'
        document.body.style.overflow = 'hidden'
    } else {
        mealPage.removeClass('showBox');
        mealPage.addClass('hideBox');
        document.documentElement.style.overflow = 'auto'
        document.body.style.overflow = 'auto'
    }
}

//arrange instruction into sentences
function displaySentences(paragraph) {
    let instructions = []
    var sentences = paragraph.split('. ');

    for (var i = 0; i < sentences.length; i++) {
        var sentence = sentences[i];
        instructions.push(sentence);
    }
    return instructions
}

//refactor ingredient
function replaceSpacesWithUnderscores(inputString) {
    return inputString.toLowerCase().replace(/ /g, '_');
}

// sidebar toggle 
function openSidebar() {
    $('.offcanvas').animate({
        'width': '300px'
    }, 300);
    $('.nav-item').css({
        'visibility': 'visible'
    }).each(function (index) {
        $(this).delay(index * 170).animate({
            'top': '0'
        }, 200);
    });
}

function closeSidebar() {
    $('.offcanvas').animate({
        'width': '0'
    }, 300);
    $('.nav-item').animate({
        'top': '500px'
    }, 300);
}

$('.sidebarBtn, .btn-close').on('click', function () {
    if ($('.offcanvas').width() !== 0) {
        closeSidebar();
    } else {
        openSidebar();
    }
});

$(document).on('click', function (event) {
    var sidebar = $('.offcanvas');
    var sidebarBtn = $('.sidebarBtn');
    var target = $(event.target);

    if (!sidebar.is(target) && sidebar.has(target).length === 0 && !sidebarBtn.is(target)) {
        closeSidebar();
    }
});

let savedMeals = []
async function updateSectionOnClick(link) {
    var targetSectionId = $(link).attr('href').substring(1);

    lastClickedSectionId = '#' + targetSectionId;
    console.log(lastClickedSectionId);

    // Close the sidebar
    closeSidebar();
    if (mealPage.hasClass('showBox')) {
        mealPage.removeClass('showBox');
        mealPage.addClass('hideBox');
    } 

    $('.section').addClass('d-none');
    $('.nav-link').removeClass('active');

    if (targetSectionId === 'mainRecipes') {
        apiFetch()
    }

    if (targetSectionId === 'searchContainer') {
        $('#searchContainer, #mainRecipes').removeClass('d-none');
        $('#mealContainer').html('');
    } else if (targetSectionId === 'savedGames') {
        $('#mainRecipes').removeClass('d-none');
        $('#mealContainer').html('');

        for (let i = 0; i < savedRecipes.length; i++) {
            let newMeal = await savingMealsAPI(savedRecipes[i]);
            savedMeals.push(newMeal);
            displayMeal(savedMeals);
        }
    } else {
        $(lastClickedSectionId).removeClass('d-none');
    }

    $(lastClickedSectionId).removeClass('d-none');
    $('.fa-arrow-left').attr('href', lastClickedSectionId);
    $(link).addClass('active');
}


// form age input
$(function () {
    var $select = $(".1-100");
    for (i = 10; i <= 70; i++) {
        $select.append($('<option></option>').val(i).html(i))
    }
});

$('.nav-link').click(function (e) {
    e.preventDefault();
    updateSectionOnClick(this);
});

$('.fa-arrow-left').click(function (e) {
    e.preventDefault();
    updateSectionOnClick(this);
});




//----------------------- pagination properties------------------//
let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

const maxItems = 12
let index = 1

const paginationItems = document.querySelectorAll('.page-link:not(.prev):not(.next)');
let allGames = mealContainer.children;
console.log(allGames);

prev.addEventListener('click', function () {
    index = Math.max(index - 1, 1); // ensures index doesn't go below 1
    showItems()
    updatePagination()
})

next.addEventListener('click', function () {
    index = Math.min(index + 1, Math.ceil(allGames.length / maxItems)); // Ensure index doesn't go above the max possible page number
    showItems()
    updatePagination()
})

paginationItems.forEach((item, i) => {
    item.addEventListener('click', function () {
        index = Math.max(index, 1); // ensure index doesnt go below 1
        index = Math.min(index, Math.ceil(allGames.length / maxItems)); // ensuree index doesnt go above the max possible page number
        showItems();
        updatePagination();
    });
});

function showItems() {
    for (let i = 0; i < allGames.length; i++) {
        allGames[i].classList.remove('d-block');
        allGames[i].classList.add('d-none')

        if (i >= (index * maxItems) - maxItems && i < index * maxItems) {
            allGames[i].classList.remove('d-none');
            allGames[i].classList.add('d-block')
        }
    }
}

function updatePagination() {
    paginationItems.forEach((item, i) => {
        // update the page numbers based on the index
        const pageNumber = index + i - 1;
        item.textContent = pageNumber;
        item.parentNode.classList.toggle('active', pageNumber === index);
    });
}

window.onload = function () {
    showItems();
};



//------------------- validation functions ---------------//
var Name = document.getElementById('name');
var Email = document.getElementById('email');
var Password = document.getElementById('password');
var rePassword = document.getElementById('rePassword');
var phoneNumber = document.getElementById('phoneNumber');
var age = document.getElementById('age')

var submitBtn = document.querySelector('.submitBtn')

submitBtn.addEventListener('click', function () {
    var nameValue = Name.value;
    var emailValue = Email.value;
    var passwordValue = Password.value;
    var rePasswordValue = rePassword.value;
    var phoneValue = phoneNumber.value;
    var ageValue = age.value;

    if (validateAll(nameValue, emailValue, passwordValue, rePasswordValue, phoneValue, ageValue)) {
        console.log('Form submitted successfully!');
        clearInput()
    } else {
        console.log('Form validation failed.');
    }
});

Name.addEventListener('input', function () {
    validateName(this.value);
});

Email.addEventListener('input', function () {
    validateEmail(this.value);
});

phoneNumber.addEventListener('input', function () {
    validatePhoneNumber(this.value)
})

Password.addEventListener('input', function () {
    validatePassword(this.value);
});

rePassword.addEventListener('input', function () {
    validateRePassword(this.value);
});



// Input Validation Regex
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;

function validateEmail(email) {
    if (emailRegex.test(email)) {
        Email.classList.add('is-valid');
        Email.classList.remove('is-invalid');
        return true;
    } else {
        Email.classList.add('is-invalid');
        Email.classList.remove('is-valid');
        return false;
    }
}

function validatePassword() {
    var password = Password.value;

    if (passwordRegex.test(password)) {
        Password.classList.add('is-valid');
        Password.classList.remove('is-invalid');
        return true
    } else {
        Password.classList.add('is-invalid');
        Password.classList.remove('is-valid');
        return false
    }
}

function validateRePassword() {
    if (Password.value === rePassword.value) {
        rePassword.classList.add('is-valid');
        rePassword.classList.remove('is-invalid');
        return true;
    } else {
        rePassword.classList.add('is-invalid');
        rePassword.classList.remove('is-valid');
        return false;
    }
}

function validatePhoneNumber(phone) {
    if (/^\d{11}$/.test(phone)) {
        phoneNumber.classList.add('is-valid');
        phoneNumber.classList.remove('is-invalid');
        return true;
    } else {
        phoneNumber.classList.add('is-invalid');
        phoneNumber.classList.remove('is-valid');
        return false;
    }
}


function validateAll( email, password, rePassword, phone, age) {
    var isEmailValid = validateEmail(email);
    var isPasswordValid = validatePassword(password);
    var isRePasswordValid = validateRePassword();
    var isPhoneValid = validatePhoneNumber(phone);

    return isNameValid && isEmailValid && isPasswordValid && isRePasswordValid && isPhoneValid && age;
}

function clearInput() {
    // Clear input fields and remove validation classes
    Name.value = ''
    Email.value = ''
    Password.value = ''
    rePassword.value = ''
    phoneNumber.value = ''

    Name.classList.remove('is-valid', 'is-invalid');
    Email.classList.remove('is-valid', 'is-invalid');
    Password.classList.remove('is-valid', 'is-invalid');
    rePassword.classList.remove('is-valid', 'is-invalid');
    age.classList.remove('is-valid', 'is-invalid');
    phoneNumber.classList.remove('is-valid', 'is-invalid');

}
