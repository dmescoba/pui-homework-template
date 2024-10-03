////////////////////////////////
/// Create empty cart //////////
////////////////////////////////

const cart = [];

////////////////////////////////
/// Load correct img + header///
////////////////////////////////

// get query string from URL
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

// update DOM heading
const headerElement = document.querySelector('#roll-heading');
headerElement.innerText = rollType;

// update DOM image
const imgElement = document.querySelector('#roll-img');
if(rolls[rollType]) {
    imgElement.src = "../assets/products/" + rolls[rollType].imageFile;
}

////////////////////////////////
/// Drop down objects //////////
////////////////////////////////

let glazingOptions = {
    "keep-original": 0,
    "sugar-milk": 0,
    "vanilla-milk": 0.50,
    "double-chocolate": 1.50
}

let packSize = {
    "1": 1,
    "3": 3, 
    "6": 5, 
    "12": 10
}

////////////////////////////////
/// initialize values //////////
////////////////////////////////

// initialize glazing price, pack multiplier, and base price 
let selectedGlazingPrice = 0;
let selectedPackSizeMultiplier = 1;
let basePrice = rolls[rollType].basePrice;

// calculate base price for which roll has been selected
const priceElement = document.querySelector('#total-price');
if(rolls[rollType]) {
    let basePrice = rolls[rollType].basePrice
    // update DOM with price 
    priceElement.innerText = basePrice;
}

/////////////////////////////////////
/// Calc price based on drop down ///
/////////////////////////////////////

window.onload = function() {
///////////////// GET ELEMENTS ////////////////
// select drop down menu for glazing
let selectElementGlazing = document.querySelector("#glazing")
// select drop down menu for pack size 
let selectElementPackSize = document.querySelector("#pack-size")

///////////////// EVENT LISTENER //////////////
// event listener for glazing click
selectElementGlazing.addEventListener("change", updateSelectedGlazingPrice)
// event listener for pack size click
selectElementPackSize.addEventListener("change", updateSelectedPackSizePrice)
}; 

///////////////// UPDATE FUNCTIONS ////////////////
// retrieves glazing element and updates pricing based on user selection
function updateSelectedGlazingPrice(){
    // get element
    let selectElementGlazing = document.querySelector("#glazing")
    // identify HTML value (dictionary key)
    let selectedGlazing = selectElementGlazing.value
    // set glazing price to selected key's value
    for(key in glazingOptions){
        if(key == selectedGlazing)
        selectedGlazingPrice = glazingOptions[key];
    }
    calculateTotalPrice(selectedGlazingPrice);
}

// retrieves pack size element and updates pricing based on user selection
function updateSelectedPackSizePrice(){
    // get element
    let selectElementPackSize = document.querySelector("#pack-size")
    // identify HTML value (dictionary key)
    let selectedPackSize = selectElementPackSize.value;
    // set pack price to selected key's value
    for(key in packSize){
        if(key == selectedPackSize)
            selectedPackSizeMultiplier = packSize[key];
    }
    calculateTotalPrice(selectedPackSizeMultiplier);
} 

function calculateTotalPrice(number) {
    // price calculation
    let totalPrice = ((selectedGlazingPrice + basePrice) * selectedPackSizeMultiplier) ;
    // round
    totalPrice = Math.round(totalPrice * 100) / 100
    // get HTML element
    let totalPriceHTML = document.getElementById("total-price");
    // update HTML
    totalPriceHTML.innerHTML = "$" + totalPrice;
}

///////////////////////////////
/// Add to cart ///////////////
///////////////////////////////

// create roll class
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

// When the user clicks on “Add to Cart,” save all of the current product information in a class
let addToCart = document.getElementById("add-to-cart")
addToCart.addEventListener("click", getAddToCartElements)

function getAddToCartElements(){ 
        // get elements
        let selectElementGlazing = document.querySelector("#glazing")
        let selectElementPackSize = document.querySelector("#pack-size");
        // rollType and baseprice have already been defined as global values

        // identify value
        let rollGlazing = selectElementGlazing.value
        let packSize = selectElementPackSize.value;

        // create new roll with that information
        let newRoll = new Roll(rollType, rollGlazing, packSize, basePrice);
        
        // add new roll to cart 
        cart.push(newRoll);
        console.log(cart)
}

