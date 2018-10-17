//need to get the box back
(function() {
    var box = $("#box");
    var links;

    var boxLeft = box.offset().left;
    var reqId;

    $.ajax({
        url: "./info.json",
        success: function(responseData) {
            var html = "";
            for (var i = 0; i < responseData.length; i++) {
                html +=
                    '<a target="_blank" href="' +
                    responseData[i].href +
                    '">' +
                    responseData[i].text +
                    "</a>";
            }

            $("div#box").append(html);
            links = $("a");
            if (html) {
                move();
            }
        }
    });

    function move() {
        boxLeft--; // decrements the number that had been passed to the function

        if (boxLeft < -links.eq(0).outerWidth()) {
            boxLeft += links.eq(0).outerWidth();
            links.eq(0).appendTo(box);
            links = $("a");
        }

        box.css({ left: boxLeft + "px" });
        // requestAnimationFrame(move); //function that you pass a function, runs it over and over without an infite loop
        reqId = requestAnimationFrame(move); // capture ID
    }

    box.on("mouseenter", function(e) {
        //maybe cancel on the anchor tag, can style e.target
        cancelAnimationFrame(reqId);
    });

    box.on("mouseleave", function(e) {
        requestAnimationFrame(move);
    });

    box.on("mouseover", "a", function(e) {
        // e.stopPropagation();
        $(e.target).css({ textDecoration: "underline", color: "salmon" });
    });

    box.on("mouseout", function(e) {
        e.stopPropagation();
        $(e.target).css({ textDecoration: "none", color: "white" });
    });
})();

//Starting and Stopping the animation

//Finding out which link the event happened on

//conditional statmemnt that works with the offsetLeft
// Getting the Text to move by manipulatinf the DOM

// right a function that decrements the left value by 1px each time the function runs
// offsetLeft provided distance of left side of box to body margin
// offsetWidth gives width of the box that is moving
