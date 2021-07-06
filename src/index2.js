// LOGIN PAGE
get_login = function() {
    $('#login').fadeIn();
    $('#create').hide();
};
get_create = function() {
    $('#login').hide();
    $('#create').fadeIn();
};

// POSITION TOP FOR FORM PAGE
let form_top;
let menu_top;
setInterval(() => {
    form_top = $('#login-form').innerHeight() / 2;
    menu_top = $('#menu').innerHeight() / 2;
    browser_top = $('#unsupported-browsers').innerHeight() / 2;
    $('#login-form').css({ 'margin-top': '' - form_top + 'px' });
    $('#menu').css({ 'margin-top': '' - menu_top + 'px' });
    $('#unsupported-browsers').css({ 'margin-top': '' - browser_top + 'px' });
});

// Get gameplay area
function playButton() {
    // $("#play-btn").click(()=>{
    $('#menu').hide();
    $('#gameplay-start').show();
    $('#gameplay').fadeIn();
    // })
}

// Leave gameplay area
function goBack() {
    // $("#gameplay-back").click(()=>{
    $('#score').html('00000');
    $('#obstacles')
        .children()
        .remove();
    $('#character').css({ top: '0px' });
    $('#game-over').hide();
    window.location.reload(false);
    //   ReactDOM.render(<BITcarde />, document.getElementById("root"));
    //   setTimeout(() => {
    //     location.href = "play.php";
    //   }, 50);
    // })
}

function leaderboard_btn() {
    // Get leaderboard
    // $("#leaderboard-btn").click(() => {
    $('#menu').hide();
    $('#leaderboard').fadeIn();
    // });
    // Hide leaderboard
    $('#leaderboard-close').click(() => {
        $('#leaderboard').hide();
        $('#menu').fadeIn();
    });
}

// SHOP
// OPEN SHOP
function shop_btn(params) {
    // $("#shop-btn").click(() => {
    $('#menu').hide();
    $('#shop').fadeIn();
    // });
}

function shop_close(params) {
    // CLOSE SHOP
    // $("#shop-close").click(() => {
    $('#shop').hide();
    $('#menu').fadeIn();
    // });
}

function heart_btn() {
    // BUY HEART
    // $("#heart-btn").click(() => {
    if (db_diam >= 20) {
        db_heart++;
        db_diam -= 20;
        let newData3 = {
            email: db_email,
            diamonds: db_diam,
            hearts: db_heart,
            // score: best_score,
        };
        $.ajax({
            type: 'POST',
            url: 'http://localhost:5000/api/users/diamondAndHeartUpdate',

            data: newData3,
            success: function(data) {
                $('#shop-heart p').html(db_heart);
                $('#shop-diam p').html(db_diam);
                $('#shop-text').html('You bought 1 Heart!');
                $('#shop-text').fadeIn();
                setTimeout(() => {
                    $('#shop-text').hide();
                }, 2000);
            },
        });

        // $.ajax({
        //   type: "POST",
        //   url: "secondryFiles/heart.php",
        //   data: {
        //     heart: db_heart,
        //   },
        //   success: function(data) {
        //     db_diam -= 20;
        //     $("#shop-heart p").html(db_heart);
        //     $("#shop-diam p").html(db_diam);
        //     $("#shop-text").html("You bought 1 Heart!");
        //     $("#shop-text").fadeIn();
        //     setTimeout(() => {
        //       $("#shop-text").hide();
        //     }, 2000);
        //   },
        // });
    } else {
        $('#shop-text').html('Sorry! Not enough diamond');
        $('#shop-text').fadeIn();
        setTimeout(() => {
            $('#shop-text').hide();
        }, 2000);
    }
    // });
}

function gameplay_chance_no() {
    // NEW CHANCE
    //   $("#gameplay-chance-no").click(() => {
    heart_availability = false;
    yes_button_availibility = false;
    over();
    //   });
}

function gameplay_chance_yes() {
    //alert(db_heart);
    // $("#gameplay-chance-yes").click(() => {
    yes_button_availibility = false;
    // heart_availability = false;
    new_chance = true;
    setTimeout(() => {
        stop_settimeout = false;
    }, 3001);
    if (db_heart > 0) {
        db_heart--;
    }
    //$("#shop-heart p").html(db_heart);
    $('#gameplay-chance').hide();
    run_loop = setInterval(() => {
        run();
        bird_dead();
    }, 50);
    jump_loop = setInterval(() => {
        jump();
        bird_dead();
    }, 22);
    score_loop = setInterval(() => {
        score_add();
        bird_dead();
    }, 70);
    dead_loop = setInterval(() => {
        bird_dead();
    }, 0);
    bullets_move_loop = setInterval(() => {
        bullets_move();
        bird_dead();
    }, 20);
    bird_move_loop = setInterval(() => {
        bird_move();
        bird_dead();
    }, bird_move_key); //
    obstacle_add_loop = setInterval(() => {
        obstacle_add();
        bird_dead();
    }, obstacle_time);
    obstacle_move_loop = setInterval(() => {
        obstacle_move();
        bird_dead();
    }, obstacle_move_key); //
    // $.ajax({
    //   type: "POST",
    //   url: "secondryFiles/newChance.php",
    //   data: {
    //     heart: db_heart,
    //   },
    //   success: function(data) {
    //     console.log("New chance!");
    //   },
    // });
    let heartMinus = {
        email: db_email,
        diamonds: db_diam,
        hearts: db_heart,
        // score: best_score,
    };
    $.ajax({
        type: 'POST',
        url: 'http://localhost:5000/api/users/diamondAndHeartUpdate',

        data: heartMinus,
        success: function(data) {
            //alert("add diamond success");
            $('#shop-diam p').html(data.diamonds);
            $('#shop-heart p').html(data.hearts);
        },
    });
    setTimeout(() => {
        new_chance = false;
    }, 1500);
    // });
}

// AUDIOS
function jump_audio() {
    $('#jump-audio')[0].play();
}
function death_audio() {
    $('#death-audio')[0].play();
}
function diam_audio() {
    $('#diam-audio')[0].play();
}
function fire_audio() {
    $('#roar-audio')[0].pause();
    $('#fire-audio')[0].pause();
    $('#fire-audio')[0].currentTime = 0;
    $('#fire-audio')[0].play();
}
function roar_audio() {
    $('#roar-audio')[0].pause();
    $('#roar-audio')[0].currentTime = 0;
    $('#roar-audio')[0].play();
}

// Audio volume
$('#diam-audio').prop('volume', 0.1);
$('#fire-audio').prop('volume', 0.2);
$('#roar-audio').prop('volume', 0.2);

let bullets_availibility = true;
document.addEventListener('keydown', logKey);
function logKey(e) {
    if (e.which == 32 || e.which == 38) {
        if (game == false) {
            $('#gameplay-chance').hide();
            start();
        }
        if (character_etat == 'jumping' && game == true && jump_etat == 2) {
            jump_more = true;
        }
        if (jump_etat == 0 && game == true) {
            jump_audio();
            jump_etat = 1;
            character_etat = 'jumping';
        }
    } else if (e.which == 39 || e.which == 83) {
        if (bullets_availibility == true && game == true && boss == false) {
            bullet_add();
            bullets_availibility = false;
            setTimeout(() => {
                bullets_availibility = true;
            }, 500);
        }
    } else if (e.which == 49) {
        // YES
        if (yes_button_availibility == true) {
            yes_button_availibility = false;
            heart_availability = false;
            new_chance = true;
            setTimeout(() => {
                stop_settimeout = false;
            }, 3001);
            if (db_heart > 0) {
                db_heart--;
            }
            $('#shop-heart p').html(db_heart);
            $('#gameplay-chance').hide();
            run_loop = setInterval(() => {
                run();
                bird_dead();
            }, 50);
            jump_loop = setInterval(() => {
                jump();
                bird_dead();
            }, 22);
            score_loop = setInterval(() => {
                score_add();
                bird_dead();
            }, 70);
            dead_loop = setInterval(() => {
                bird_dead();
            }, 0);
            bullets_move_loop = setInterval(() => {
                bullets_move();
                bird_dead();
            }, 20);
            bird_move_loop = setInterval(() => {
                bird_move();
                bird_dead();
            }, bird_move_key); //
            obstacle_add_loop = setInterval(() => {
                obstacle_add();
                bird_dead();
            }, obstacle_time);
            obstacle_move_loop = setInterval(() => {
                obstacle_move();
                bird_dead();
            }, obstacle_move_key); //
            // $.ajax({
            //   type: "POST",
            //   url: "secondryFiles/newChance.php",
            //   data: {
            //     heart: db_heart,
            //   },
            //   success: function(data) {
            //     console.log("New chance!");
            //   },
            // });
            setTimeout(() => {
                new_chance = false;
            }, 1500);
        }
    } else if (e.which == 50) {
        // NO
        yes_button_availibility = false;
        heart_availability = false;
        over();
    }
}

// HOW TO PLAY
$('#play-btn span').mouseover(() => {
    $('#play-btn p').show();
    $('#play-btn #triangle-up').show();
});
$('#play-btn span').mouseout(() => {
    $('#play-btn p').hide();
    $('#play-btn #triangle-up').hide();
});
