// HEAD - Declaring variables
var body = $(document.body);
var fullstack = $("span#full");
var stack = $("div.stack");
var myPic = $("img.me");
var picTxt = $("span.me");
var places = $("div.places-lived");
var placesTxt = $("span.places-lived");
var close = $("p.close");
var contactElem = $("section.contact-details");
var contactHead = $("p#contact");

//navigation links and divs to listen on
var carouselDiv = $("div.carousel");
var carouselImg = $("img.carousel");
var connectDiv = $("div.connect");
var connectImg = $("img.connect");
var sprintDiv = $("div.sprint");
var sprintImg = $("img.sprint");
var tickerDiv = $("div.ticker");
var tickerImg = $("img.ticker");
var petitionDiv = $("div.petition");
var petitionImg = $("img.petition");
var imageboardDiv = $("div.imageboard");
var imageboardImg = $("img.imageboard");

// Adding 'custom backgrounds for projects on homepage'
// picTxt.on("mouseenter", function() {
//     body.addClass("blue-back");
// });

function hoverToggle(element, target) {
    element
        .on("mouseenter", function(e) {
            e.preventDefault();
            target.removeClass("hidden");
        })
        .on("mouseleave", function(e) {
            e.preventDefault();
            target.addClass("hidden");
        });
}

hoverToggle(fullstack, stack);
hoverToggle(picTxt, myPic);
hoverToggle(placesTxt, places);
hoverToggle(carouselDiv, carouselImg);
hoverToggle(connectDiv, connectImg);
hoverToggle(sprintDiv, sprintImg);
hoverToggle(tickerDiv, tickerImg);
hoverToggle(petitionDiv, petitionImg);
hoverToggle(imageboardDiv, imageboardImg);

close.on("click", function(e) {
    contactElem.addClass("hidden");
});

contactHead.on("click", function(e) {
    contactElem.removeClass("hidden");
});
