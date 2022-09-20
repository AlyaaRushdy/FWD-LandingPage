const startingTime = performance.now();

/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

let listItem = [], menuLinks, callingId, sectionTop = [], sectionBottom = [];
const sections = document.querySelectorAll("section");


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function ClickedItem(event) {
    // a function that gets the clicked target 
    // (called only when clicking on the navbar items) 
    // and then clips its href to get the id used to navigate to sections.

    let clickedLink = event.target;
    let hrefContents = clickedLink.getAttribute("href");
    callingId = hrefContents.slice(1);
}

function ScrollFunction(event){
    // a function that calls clickeditem function 
    // (to get the id of the desired section) 
    // and SmoothScroll (to scroll to that section)

    ClickedItem(event);
    SmoothScroll(event);
}

function ClearClasses(){
    // a function to clear all occurences of the class section--active

    for (const section of sections) {
        section.classList.remove("section--active");
    }
}

function SectionBounds(){
    // a function that gets the boundries of each section and store them
    
    for (let i = 0; i < sections.length; i++) {
        sectionTop[i] = sections.item(i).getBoundingClientRect().top 
                        + window.pageYOffset;
        sectionBottom[i] = sections.item(i).getBoundingClientRect().bottom 
                            + window.pageYOffset;
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function CreateNavbar() {
    
    //calling the navbar and storing it in a variable
    const navList = document.getElementById("navbar__list");

    for (let i = 0; i < sections.length; i++){
        // creating the list item and storing it
        listItem[i] = document.createElement("li");

        //creating the anchor tag and its components
        let listAnchor = document.createElement("a");
        listAnchor.classList = "menu__link";
        listAnchor.setAttribute("href", `#section${i+1}`);
        listAnchor.innerText = `section ${i+1} `;

        //appending the anchor to the li 
        listItem[i].append(listAnchor);
    }
    //appending the whole list to the nav bar
    navList.append(...listItem);
}


// Add class 'active' to section when near top of viewport
function AddActiveClass(){
    
    window.onscroll = () => {
        ClearClasses();
        let scrollingPosition = window.scrollY;
        for (let i = 0; i < sections.length; i++) {
            if( sectionTop[i] < scrollingPosition 
                && sectionBottom[i] >= scrollingPosition) {
                sections.item(i).classList.add("section--active");
            }
        }
    }
}


// Scroll to anchor ID using scrollTO event
function SmoothScroll(event){
    // scrolls to the section using the navbar

    event.preventDefault();
    for (const section of sections) {
       const sectionId = section.getAttribute("id");
       if (callingId === sectionId){
        let element = document.getElementById(callingId);
        element.scrollIntoView({
            behavior: "smooth"
        });
       }
    }
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu
CreateNavbar();


// Scroll to section on link click
menuLinks = document.querySelectorAll('.menu__link');
menuLinks.forEach(element => {
    element.addEventListener('click', ScrollFunction);
});


// Set sections as active
SectionBounds(); // stores the boundries of each section in a global variable
AddActiveClass();

const endingTime = performance.now();
console.log(`Running Time = ${endingTime - startingTime} milliseconds.`);