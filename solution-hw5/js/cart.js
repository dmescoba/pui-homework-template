let glazingOptions = {
    "Keep original": 0,
    "Sugar milk": 0,
    "Vanilla milk": 0.50,
    "Double-chocolate": 1.50
}

let packSize = {
    "1": 1,
    "3": 3, 
    "6": 5, 
    "12": 10
}

// create roll class
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
        this.element = null;
    }

    calculateTotalPrice(){
        let totalPrice = (this.basePrice + glazingOptions[this.glazing]) * packSize[this.size];
        totalPrice = totalPrice.toFixed(2)
        return totalPrice
    }
}

// Create an empty Set, which will hold all of our roll objects
let cartItemSet = new Set();

// information for each roll
let roll1 = addNewRoll("Original", "Sugar milk", 1, rolls["Original"].basePrice);
let roll2 = addNewRoll("Walnut", "Vanilla milk", 12, rolls["Walnut"].basePrice);
let roll3 = addNewRoll("Raisin", "Sugar milk", 3, rolls["Raisin"].basePrice);
let roll4 = addNewRoll("Apple", "Keep original", 3, rolls["Apple"].basePrice);

// This function creates a new roll, and adds it to cartItemSet.
function addNewRoll(rollType, rollGlazing, packSize, basePrice){
    let roll = new Roll(rollType, rollGlazing, packSize, basePrice);
    cartItemSet.add(roll);
    return roll;
}

// update DOM
function createElement(roll){
    // make a clone of the cart template
    let template = document.getElementById("cart-template");
    let clone = template.content.cloneNode(true);
    // let clone = document.importNode(template.content, true);
    
    // get the correct ids
    let imgElement = clone.querySelector('#cart-img');
    let nameElement = clone.querySelector('#cart-item-name');
    let glazingElement = clone.querySelector('#cart-glazing');
    let packSizeElement = clone.querySelector('#cart-pack-size');
    let priceElement = clone.querySelector('#cart-item-price');

    // add the correct info for each roll
    imgElement.src = `../assets/products/${roll.type.toLowerCase()}-cinnamon-roll.jpg`
    imgElement.alt = `${roll.type} cinnamon roll`
    nameElement.textContent = roll.type;
    glazingElement.textContent = roll.glazing;
    packSizeElement.textContent = `Pack Size:  ${roll.size}`;
    priceElement.textContent = `$${roll.calculateTotalPrice()}`;

    // add clone to cart-container div 
    let cartContainer = document.getElementById("cart-container");
    cartContainer.appendChild(clone);

    // connect this clone to our roll.element
    // I just appended the clone to cart-container, making it the last element child
    roll.element = cartContainer.lastElementChild; 

    // Get the delete button and set up its click event listener
    let btnDelete = roll.element.querySelector('#cart-remove-button');
    btnDelete.addEventListener("click", () => removeElement(roll));

}

function removeElement(roll) {
    // Remove the element from the DOM
    roll.element.remove();
    // Remove the roll from the set
    cartItemSet.delete(roll);
    // call update total price function
    updateTotalPrice()
  
}

for(let roll of cartItemSet){
    createElement(roll);
}

function updateTotalPrice(){
    let totalCartPrice = 0;
    for (let roll of cartItemSet){
        totalCartPrice += parseFloat(roll.calculateTotalPrice());
    }
    let totalCartPriceHTML = document.getElementById("total-cart-price");
    totalCartPriceHTML.innerHTML = "$" + totalCartPrice.toFixed(2);

    // check if cart is empty
    if(cartItemSet.length === 0){
        totalCartPrice = 0
        totalCartPriceHTML.innerHTML = "$" + totalCartPrice.toFixed(2);
    }

}

updateTotalPrice()