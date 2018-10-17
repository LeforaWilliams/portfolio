// adding menu functionality

var hamburgerIcon = document.getElementById("menu");
console.log(hamburgerIcon);
hamburgerIcon.addEventListener("click", function(e) {
    e.stopPropagation();
    document.body.classList.add("menu-on");
});

var transOut = document.querySelector(".hamburgermenu");
console.log(transOut);
transOut.addEventListener("click", function(e) {
    e.stopPropagation();
    document.body.classList.remove("menu-on");
});

var exit = document.getElementById("exit");
exit.addEventListener("click", function() {
    document.body.classList.remove("menu-on");
});

var white = document.querySelector(".white-menu-part");
white.addEventListener("click", function(e) {
    e.stopPropagation();
});

//JQuery
setTimeout(function() {
    $(document.body).addClass("modal-on");
}, 1000);

var close = $(".close");
close.on("click", function(e) {
    e.stopPropagation();
    $(document.body).removeClass("modal-on");
});
