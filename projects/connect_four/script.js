// > keep track of curent players
var curPlayer = "player1";
var allSlots = $(".slot");
$(".circle11").show();
$(".circle22").hide();
var piston2 = $("#piston-2")[0];
var veil = $("#veil")[0];
var bubbles = $("#bubbles")[0];
var squiggle = $("#squiggle")[0];
$("#player1-won").hide();
$("#player2-won").hide();
$(document.body).removeClass("overlay-off");

// function to switch player

function switchPlayer() {
    if (curPlayer === "player1") {
        curPlayer = "player2";
        $(".circle2").removeClass("grey");
        $(".circle1").addClass("grey");
    } else {
        curPlayer = "player1";
        $(".circle1").removeClass("grey");
        $(".circle2").addClass("grey");
    }
}

function showVictoryMessage() {
    console.log(curPlayer);
    var html;
    bubbles.play();
    if (curPlayer == "player1") {
        $("#player1-won").show();
        $(".circle11")
            .hide()
            .empty();
    } else {
        $("#player2-won").show();
        $(".circle22")
            .hide()
            .empty();
    }
    $(".overlay-content").append(html);
    $(".win-blur").addClass("blur");
    $(document.body).addClass("overlay-on"); // attaching to the body and styling for this + overlayon in css
}

function checkForVictory(slots) {
    var victoryCounter = "";
    var adj;
    for (var i = 0; i < slots.length; i++) {
        if (slots.eq(i).hasClass(curPlayer)) {
            victoryCounter += "y";
        } else {
            victoryCounter += "n";
        }
    }
    if (victoryCounter.indexOf("yyyy") > -1) {
        showVictoryMessage();
    }
}
//Diagonal Win Functioin
function checkForDiagonalWin() {
    var diagonalWin = [
        [0, 7, 14, 21],
        [1, 8, 15, 22],
        [2, 9, 16, 23],
        [3, 8, 13, 18],
        [4, 9, 14, 19],
        [5, 10, 15, 20],
        [6, 13, 20, 27],
        [7, 14, 21, 28],
        [8, 15, 22, 29],
        [9, 14, 19, 24],
        [10, 15, 20, 25],
        [11, 16, 21, 26],
        [12, 19, 26, 33],
        [13, 20, 27, 34],
        [14, 21, 28, 35],
        [15, 20, 25, 30],
        [16, 21, 26, 31],
        [17, 22, 27, 32],
        [18, 25, 32, 39],
        [19, 26, 33, 40],
        [20, 27, 34, 41],
        [21, 26, 31, 36],
        [22, 27, 32, 37],
        [23, 28, 33, 38]
    ]; // array of posibilites

    for (var i = 0; i < diagonalWin.length; i++) {
        var playCounter = 0;
        for (var j = 0; j < 4; j++) {
            if (allSlots.eq(diagonalWin[i][j]).hasClass(curPlayer)) {
                playCounter++;
            }
        }
        if (playCounter == 4) {
            return true;
        }
    }
}

$(document.body).on("mousemove", function(e) {
    $(".circle11").css({ left: e.pageX + "px" });
    $(".circle11").css({ top: e.pageY + "px" });

    $(".circle22").css({ left: e.pageX + "px" });
    $(".circle22").css({ top: e.pageY + "px" });
});

// column selection, backwards loop
$(".column")
    .on("click", function(e) {
        var slotsInCol = $(e.currentTarget).find(".slot");

        if (
            slotsInCol.eq(0).hasClass("player1") ||
            slotsInCol.eq(0).hasClass("player2")
        ) {
            return;
        }
        //checking where to put the token
        for (var i = 5; i >= 0; i--) {
            if (!slotsInCol.eq(i).hasClass("player1")) {
                if (!slotsInCol.eq(i).hasClass("player2")) {
                    break;
                }
            }
        }
        // adding the color of the current player in the slot
        slotsInCol.eq(i).addClass(curPlayer);
        //checking if there is a column win

        if (checkForVictory(slotsInCol)) {
            return setTimeout(showVictoryMessage(), 5000);
        } else {
            // checking if there is a row win
            var slotsInRow = $(".row" + i);
            if (checkForVictory(slotsInRow)) {
                return setTimeout(showVictoryMessage(), 5000);
            } else {
                // checking for diagonal win
                if (checkForDiagonalWin()) {
                    return setTimeout(showVictoryMessage(), 5000);
                }
            }
        }
        switchPlayer();
    })
    .on("click", function(e) {
        if (curPlayer === "player1") {
            piston2.play();
            $(".circle11").show();
            $(".circle22").hide();
        }
        if (curPlayer === "player2") {
            veil.play();
            $(".circle22").show();
            $(".circle11").hide();
        }
    }); // End of click Handler

//Removing all the classes of player on and 2 after click play again button and removing the overlay-on class from the body
$("#play-again").on("click", function(e) {
    squiggle.play();

    $("div").removeClass("player1");
    $("div").removeClass("player2");
    curPlayer = "player1";
    $(".win-blur").removeClass("blur");
    $(document.body).removeClass("overlay-on");
    $(document.body).addClass("overlay-off");

    if ($(".circle1").hasClass("grey")) {
        $(".circle1").removeClass("grey");
    }
    $(".circle2").addClass("grey");
    $(".circle11").show();
    $(".circle22").hide();
    $("#player1-won").hide();
    $("#player2-won").hide();
});
