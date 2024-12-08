// Import Anime
// import anime from '../../node_modules/animejs/lib/anime.es.js';

// Check if the body element has the ID "index-body"
if (document.body && document.body.id === "index-body") {

//////////////// Homepage Hero Animations ////////////////
const heroTimeline = anime.timeline({
  duration: 3000
});
heroTimeline
// Name drawing
  .add({
    targets: ".line-drawing",
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 10000,
    loop: false
  })
  // Other text
  .add({
    targets: "#hero-title, #hero-positions, #hero-buttons, #hero-arrow",
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 1000,
  }, '-=8000')

//////////////// Homepage Filter ////////////////

// Get element and set event listener for when option is changed
  document.getElementById('inputGroupSelect').addEventListener('change', function () {
  // Save the user's selection in a variable
  let selectedValue = this.value;  
  // Create an array of each card
  let cardsList = [
    {
      id: "bubbly-card", 
      categories: ["4", "6", "5", "8"]
    }, 
    {
      id: "centible-card",
      categories: ["1", "6", "5", "8"]
    }, 
    {
      id: "cupboard-card",
      categories: ["1", "6", "5", "8"]
    }, 
    {
      id: "inquery-card",
      categories: ["2", "6", "5", "9"]
    }, 
    {
      id: "amazon-card",
      categories: ["3", "6", "5", "7"]
    }, 
    {
      id: "lumen-card",
      categories: ["2", "6", "5", "7"]
    }
  ]
    // Loop through the cards (reset before add)
    for(let i = 0; i < cardsList.length; i++){
      let cardId = cardsList[i].id;
      let cardCategories = cardsList[i].categories;
      let cardHTML = document.getElementById(cardId);

      // Reset Filter: Remove d-none
      if(cardHTML){
        cardHTML.classList.remove("d-none")

        // Apply Filter: Add d-none
        if(!cardCategories.includes(selectedValue)){
          cardHTML.classList.add("d-none")
        }
      }
    }
});
}

// Check if the body element has the ID "about-body"
if (document.body && document.body.id === "about-body") {

  //////////////// About Me Animations ////////////////
document.addEventListener("DOMContentLoaded", function () {

  // Animate the dots
  anime({
    targets: ".timeline-dot",
    opacity: [0, 1],
    translateX: [-50, 0],
    delay: anime.stagger(500), 
    duration: 1000,
    easing: "easeOutBounce"
});

  // Animate the Content
anime({
  targets: ".timeline-content",
  opacity: [0, 1],
  translateX: [-50, 0],
  delay: anime.stagger(500), 
  duration: 1000,
  easing: "easeOutBounce"
});
});
}
//////////////// Project Offcanvas ////////////////

// Check if the body element has the ID "project-body"
if (document.body && document.body.id === "project-body") {

// Projects Page OffCanvas component toggle
document.addEventListener("DOMContentLoaded", function () {
  const offcanvasTrigger = document.getElementById("offcanvas-trigger");

  if (offcanvasTrigger) {
    // Get the position for the button
    const offsetTop = offcanvasTrigger.offsetTop; 
    
    // Add aria-expanded
    const offcanvasElement = document.getElementById("offcanvasNav");

    offcanvasElement.addEventListener("show.bs.offcanvas", function () {
      offcanvasTrigger.setAttribute("aria-expanded", "true");
    });

    offcanvasElement.addEventListener("hide.bs.offcanvas", function () {
      offcanvasTrigger.setAttribute("aria-expanded", "false");
    });

    // Change visually
    window.addEventListener("scroll", function () {
      // If the user scrolls past the button, make it fixed position by adding classes
      if (window.scrollY >= offsetTop) {
        offcanvasTrigger.classList.add("position-fixed", "top-0", "start-0", "z-3");
      // If the user hasn't reached the button yet, keep it located where it is in the HTML
      } else {
        offcanvasTrigger.classList.remove("position-fixed", "top-0", "start-0", "z-3");
      }
    });
  }
});
}
