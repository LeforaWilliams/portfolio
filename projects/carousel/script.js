(function() {
    var kit = document.getElementsByClassName("kitty");
    var dot = document.getElementsByClassName("dot");
    var nowVis = 0; //pic that is currently targeted
    var reStart = kit.length;
    var timer;
    var trans; //to check if in transtion or not
    var dotIndex;

    //Function to slide images in and out of view, by adding and removing classes with corresponding actions
    function mk(next) {
        trans = true;
        kit[nowVis].classList.remove("onscreen");
        kit[nowVis].classList.add("exit");
        dot[nowVis].classList.remove("active");

        nowVis += 1;
        if (typeof next !== "undefined") {
            //next will be undifined most times becuase the functtion is called by setTimeout if the dots are not clicked
            nowVis = next;
        }
        if (nowVis >= reStart) {
            nowVis = 0;
        }

        dot[nowVis].classList.add("active");
        kit[nowVis].classList.add("onscreen");
    }

    // Event listener that removes the exit class once the tranistion is over
    document.addEventListener("transitionend", function(e) {
        if (e.target.classList.contains("exit")) {
            e.target.classList.remove("exit");
            trans = false;
            timer = setTimeout(mk, 5000);
        }
    });

    timer = setTimeout(mk, 5000);

    // Click Handler - Function that
    document
        .getElementById("dot-container")
        .addEventListener("click", function(e) {
            console.log(e.target);
            console.log(e.target);
            if (!e.target.classList.contains("dot")) {
                return;
            }
            if (e.target == dot[nowVis]) {
                //do nothing when the active dot is clicked
                return;
            }
            if (trans) {
                // do nothing if transition is true
                return;
            }

            dotIndex = +e.target.id.replace("d", ""); //if the dot is clicked
            console.log(dotIndex);
            clearTimeout(timer); //stop the timer
            mk(dotIndex); // call move function with the dotIndex, which will be next
        });

    //Event Listener for swiping -- Doesn't quite work
    var car = document.getElementById("carousel");
    var xStart;
    var xEnd = [];

    car.addEventListener("touchstart", function(e) {
        e.preventDefault();
        xStart = e.touches[0].pageX;
    });

    car.addEventListener("touchmove", function(e) {
        e.preventDefault();
        console.log(e.touches);
        e.preventDefault();
        xEnd.push(e.touches[0].pageX);
        console.log(xEnd);
        dotIndex = +e.target.id.replace("d", "");
        clearTimeout(timer);
        if (xEnd[xEnd.length - 1] > xStart) {
            if (dotIndex === 0) {
                mk(reStart - 1);
            } else {
                mk(dotIndex - 1);
            }
        }
        if (xEnd[xEnd.length - 1] < xStart) {
            if (dotIndex === reStart - 1) {
                mk(0);
            } else {
                mk(dotIndex + 1);
            }
        }
    });
})();
