$(document).ready(function() {

    var strict = false;
    var on = false;
    var win;
    var order ;
    var playerOrder ;
    let flash ;
    var turn;
    var order = [];
    var playerOrder = [];
    var computerTurn;
    var good;
    var intervalId;

// strict button
    $("#strict[type='checkbox']").click(function(){
        if ($(this).prop("checked")) {
            strict = true;
        } else  {
            strict = false;
        } console.log(strict)
    })

// on button
    $("#on[type='checkbox']").click(function(){
        if ($(this).prop("checked")) {
            on = true;
            $("#turn").html("--")
            $("#strict").attr("disabled",false).prop("checked",false);
            $("#start").attr("disabled",false);
        } else{
            on = false;
            $("#turn").html("")
            $("#strict").attr("disabled",true);
            clearInterval(intervalId);
            clearColor();
        }
    })

// start button
    $("#start").click(function(){
        if (on || win) {
            play();
            console.log("start")
        }
    })

    function play(){
        win = false;
        order = [];
        playerOrder = [];
        flash = 0;
        intervalId = 0;
        turn = 1;
        good = true;
        $("#turn").html(turn);

        for (var i = 0; i < 20; i++) {
            order.push(Math.floor(Math.random()*4)+1);
        }
        computerTurn = true;
        intervalId = setInterval(gameTurn, 800);
    }


    function gameTurn() {
        on = false;

        if (flash == turn) {
            clearInterval(intervalId);
            computerTurn = false;
            clearColor();
            on = true;
        }

        if (computerTurn) {
            clearColor();
            setTimeout(function() {
                if (order[flash] == 1){
                    one();
                }
                if (order[flash] == 2) {
                    two();
                }
                if (order[flash] == 3) {
                    three();
                }
                if (order[flash] == 4) {
                    four();
                }
                flash++;
            }, 200);
        }
    }

    function one(){
        $("#topLeft").css("background-color","lightgreen");
    }
    function two(){
        $("#topRight").css("background-color","tomato");
    }
    function three(){
        $("#bottonleft").css("background-color","yellow");
    }
    function four(){
        $("#bottonright").css("background-color","lightskyblue");
    }

    function clearColor(){
        $("#topLeft").css("background-color","darkgreen");
        $("#topRight").css("background-color","darkred");
        $("#bottonleft").css("background-color","goldenrod");
        $("#bottonright").css("background-color","darkblue");
    }

    $("#topLeft").click(function(){
        if (on) {
            playerOrder.push(1);
            check();
            one();
            if (!win) {
                setTimeout(function(){
                    clearColor();
                },300);
            }
        }
    })

    $("#topRight").click(function(){
        if (on) {
            playerOrder.push(2);
            check();
            two();
            if (!win) {
                setTimeout(function(){
                    clearColor();
                },300);
            }
        }
    })

    $("#bottonleft").click(function(){
        if (on) {
            playerOrder.push(3);
            check();
            three();
            if (!win) {
                setTimeout(function(){
                    clearColor();
                },300);
            }
        }
    })

    $("#bottonright").click(function(){
        if (on) {
            playerOrder.push(4);
            check();
            four();
            if (!win) {
                setTimeout(function(){
                    clearColor();
                },300);
            }
        }
    })

    function check(){
        if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
            good = false;
        if (playerOrder.length == 20 && good ) {
            winGame();
        }
        if (good == false) {
            flashColor();
            $("#turn").html("NO!")
            setTimeout(function(){
                $("#turn").html(turn)
                clearColor();
                if (strict) {
                    play();
                }
                else{
                    computerTurn = true;
                    flash = 0;
                    playerOrder = [];
                    good = true;
                    intervalId = setInterval(gameTurn,800);
                }
            },800);
        }
        if (turn == playerOrder.length && good && !win) {
            turn++
            playerOrder = [];
            computerTurn = true;
            flash = 0;
            $("#turn").html(turn);
            intervalId = setInterval(gameTurn,800);
        }
    }

    function flashColor(){
        $("#topLeft").css("background-color","lightgreen");
        $("#topRight").css("background-color","tomato");
        $("#bottonleft").css("background-color","yellow");
        $("#bottonright").css("background-color","lightskyblue");
    }

    function winGame(){
        flashColor();
        $("#turn").html("WIN!");
        on = false;
        win = true;
    }


});