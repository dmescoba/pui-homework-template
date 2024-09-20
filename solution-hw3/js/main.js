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

// initialize glazing price, pack multiplier, and base price 
let selectedGlazingPrice = 0;
let selectedPackSizeMultiplier = 1;
let basePrice =  2.49;

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

    console.log("glazing")
    // get element
    let selectElementGlazing = document.querySelector("#glazing")
    // identify HTML value (dictionary key)
    let selectedGlazing = selectElementGlazing.value
    // set glazing price to selected key's value
    for(key in glazingOptions){
        if(key == selectedGlazing)
        selectedGlazingPrice = glazingOptions[key];
    }
    console.log(selectedGlazingPrice)
    calculateTotalPrice(selectedGlazingPrice);
}

// retrieves pack size element and updates pricing based on user selection
function updateSelectedPackSizePrice(){
    console.log("pack size")
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
    console.log(selectedPackSizeMultiplier)
} 

function calculateTotalPrice(number) {
    console.log("total price");
    // price calculation
    let totalPrice = ((selectedGlazingPrice + basePrice) * selectedPackSizeMultiplier) ;
    // round
    totalPrice = Math.round(totalPrice * 100) / 100
    // get HTML element
    let totalPriceHTML = document.getElementById("total-price");
    // update HTML
    totalPriceHTML.innerHTML = "$" + totalPrice;
}