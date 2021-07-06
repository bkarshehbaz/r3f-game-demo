// Generate random
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
let db_heart = 0;
let db_diam = 0;
let db_email = '';
let best_score = 0;
let heart_availability = false;

function getDiamonds(email) {
    // alert('called getdiamonds');
    // $.ajax({
    //     type: 'POST',
    //     url: 'http://localhost:3000/api/users/diamondAndHeartGet',
    //     data: {
    //         email: email,
    //     },
    //     success: function(data) {
    //         db_heart = data.hearts;
    //         db_diam = data.diamonds;
    //         db_email = email;
    //         db_email = data.best_score;
    //         // best_score = data.score;
    //     },
    // });
}

$.ajax({
    type: 'POST',
    url: 'http://localhost:5000/api/users/diamondAndHeartGet',
    data: {
        email: db_email,
    },
    success: function(data) {
        db_heart = data.hearts;
        db_diam = data.diamonds;
        db_email = db_email;
        // best_score = data.score;
        if (db_heart > 0) {
            heart_availability = true;
        } else {
            heart_availability = false;
        }
    },
});

// Variables
let yes_button_availibility = false;
let speed_time = 2200;
let game = false;
let boss = false;
let jump_more = false;
let new_chance = false;
let boss_mouvement = false;
let boss_level = 1;
let boss_health = 100;
let birds = [];
let obstacle = [];
let bullets = [];
let run_cycle = 0;
let pos_top = 0;
let jump_etat = 0;
let score = 0;
let character_etat = 'running';
let run_loop;
let jump_loop;
let score_loop;
let obstacle_add_loop;
let stop_settimeout = false;
let boss_add_out;
let obstacle_move_loop;
let bullets_move_loop;
let bird_move_loop;
let bird_move_key = 9; //#
let obstacle_move_key = 11; //#
let dead_loop;
let obstacle_time;
let diam = 0;
let obstacle_add_loop2;
let bullets_pos;
let obstacle_pos;
// RUN FUCNTION
let run = function() {
    if (character_etat == 'running') {
        clearInterval(jump);
        if (run_cycle != 6) {
            $('#character').css({ background: 'black', 'background-size': 'cover' });
            run_cycle++;
        } else {
            run_cycle = 0;
        }
    }
};
// JUMP FUNCTION
let jump = function() {
    if (character_etat == 'jumping') {
        if (jump_more == true) {
            jump_audio();
        }
        if (jump_etat == 1) {
            $('#character').css({ background: 'black', 'background-size': 'cover' });
            if (pos_top <= -85 && pos_top > -120) {
                pos_top -= 5;
                $('#character').css({ top: '' + pos_top + 'px' });
            } else if (pos_top <= -45 && pos_top > -85) {
                pos_top -= 10;
                $('#character').css({ top: '' + pos_top + 'px' });
            } else if (pos_top == -120) {
                jump_etat = 2;
            } else {
                pos_top -= 15;
                $('#character').css({ top: '' + pos_top + 'px' });
            }
        } else if (jump_etat == 2) {
            $('#character').css({ background: 'black', 'background-size': 'cover' });
            if (pos_top >= -120 && pos_top < -85) {
                pos_top += 5;
                $('#character').css({ top: '' + pos_top + 'px' });
            } else if (pos_top < -45 && pos_top >= -85) {
                pos_top += 10;
                $('#character').css({ top: '' + pos_top + 'px' });
                if (
                    boss_mouvement == true &&
                    $('.boss').length &&
                    pos_top < -45 &&
                    pos_top >= -65
                ) {
                    if ($('.boss').position().left < 100) {
                        jump_etat = 1;
                    }
                }
            } else if (pos_top >= 0) {
                if (jump_more == false) {
                    jump_etat = 0;
                    character_etat = 'running';
                } else {
                    jump_more = false;
                    jump_etat = 1;
                }
            } else {
                pos_top += 15;
                $('#character').css({ top: '' + pos_top + 'px' });
            }
        }
    }
};
// OBSTACLE.ADD FUNCTION
let type_obstacle;
let bird_top_values;
let bird_top_values_random;
let obstacle_add = function() {
    obstacle_time_values = [
        150,
        600,
        700,
        700,
        650,
        750,
        700,
        750,
        825,
        850,
        850,
        875,
        900,
        925,
        850,
        900,
        1000,
    ];
    clearInterval(obstacle_add_loop);
    do {
        random_obstacle_time = getRandomInt(16);
    } while (
        obstacle_time == obstacle_time_values[random_obstacle_time] &&
        obstacle_time == 150
    );
    obstacle_time = obstacle_time_values[random_obstacle_time];

    type_obstacle = getRandomInt(16);
    if (type_obstacle >= 0 && type_obstacle < 8) {
        $('#obstacles').append("<div class='little1' ></div>");
    } else if (type_obstacle >= 8 && type_obstacle < 10) {
        bird_top_values = [-100, -90, -80, -70, -60, -50, -40, -30, -20, -10, 0];
        bird_top_values_random = getRandomInt(10);
        $('#obstacles').append(
            "<div class='bird' style='top:" +
                bird_top_values[bird_top_values_random] +
                "px'></div>"
        );
        $('#obstacles').append("<div class='little1'></div>");
        birds[birds.length] = {
            position: 0,
        };
        obstacle[obstacle.length] = {
            position: 0,
        };
    } else if (type_obstacle >= 10 && type_obstacle < 15) {
        $('#obstacles').append("<div class='big'></div>");
    } else if (type_obstacle == 15) {
        $('#obstacles').append("<div class='diam'></div>");
    }
    obstacle[obstacle.length] = {
        position: 0,
    };

    obstacle_add_loop2 = setTimeout(() => {
        obstacle_add();
    }, obstacle_time);
};
// OBSTACLE.MOVE FUNCTION
let fire_top;
function obstacle_move() {
    for (i = 0; i < obstacle.length; i++) {
        if (
            $('#obstacles')
                .children()
                .eq(i)
                .hasClass('bird') == false
        ) {
            if (
                $('#obstacles')
                    .children()
                    .eq(i).length
            ) {
                obstacle_pos = $('#obstacles')
                    .children()
                    .eq(i)
                    .position().left;
                fire_top = $('#obstacles')
                    .children()
                    .eq(i)
                    .position().top;
            }
            if (obstacle_pos > -165) {
                if (
                    $('#obstacles')
                        .children()
                        .eq(i)
                        .hasClass('boss') &&
                    boss_mouvement == true
                ) {
                    obstacle_pos = obstacle_pos - 20;
                    $('#obstacles')
                        .children()
                        .eq(i)
                        .css({ left: '' + obstacle_pos + 'px' });
                } else if (
                    $('#obstacles')
                        .children()
                        .eq(i)
                        .hasClass('boss') == false
                ) {
                    //obstacle_pos=obstacle_pos-5
                    if (
                        $('#obstacles')
                            .children()
                            .eq(i)
                            .hasClass('fire') &&
                        $('#obstacles')
                            .children()
                            .eq(i).length
                    ) {
                        // FIRE
                        fire_top = fire_top + 15.95;
                        $('#obstacles')
                            .children()
                            .eq(i)
                            .css({
                                left: '' + obstacle_pos + 'px',
                                top: '' + fire_top + 'px',
                            });
                    } else {
                        // NOT FIRE
                        if (
                            $('#obstacles')
                                .children()
                                .eq(i)
                                .hasClass('translated') == false &&
                            ($('#obstacles')
                                .children()
                                .eq(i)
                                .hasClass('little1') ||
                                $('#obstacles')
                                    .children()
                                    .eq(i)
                                    .hasClass('diam') ||
                                $('#obstacles')
                                    .children()
                                    .eq(i)
                                    .hasClass('big'))
                        ) {
                            get_obs_pos = $('#obstacles')
                                .children()
                                .eq(i)
                                .css('left')
                                .split('px')
                                .slice(0, -1);
                            $('#obstacles')
                                .children()
                                .eq(i)
                                .css({
                                    left: '' + (get_obs_pos - 1000) + 'px',
                                    transition: '' + speed_time + 'ms',
                                    'transition-timing-function': 'linear',
                                })
                                .addClass('translated');
                        }
                    }
                }
            } else {
                if (
                    $('#obstacles')
                        .children()
                        .eq(i)
                        .hasClass('boss')
                ) {
                    boss_health = boss_health - 20;
                    boss_level++;
                    $('#boss-bar div').css({
                        width: '' + boss_health + '%',
                        transition: '0.3s',
                        'transition-timing-function': 'linear',
                    });
                    if (boss_level < 6) {
                        boss_attack();
                    } else {
                        clearInterval(obstacle_move_loop);
                        $('#boss-bar').hide();
                        boss_health = 100;
                        boss = false;
                        boss_level = 1;
                        run_loop = setInterval(() => {
                            run();
                            bird_dead();
                        }, 50);
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
                        }, bird_move_key);
                        $('#obstacles')
                            .children()
                            .hide()
                            .remove();
                        $('#bullets')
                            .children()
                            .hide();
                        obstacle = [];
                        birds = [];
                        bullets = [];
                        setTimeout(() => {
                            obstacle_add();
                            obstacle_add_loop = setInterval(() => {
                                obstacle_add();
                                bird_dead();
                            }, obstacle_time);
                            obstacle_move_loop = setInterval(() => {
                                obstacle_move();
                                bird_dead();
                            }, obstacle_move_key);
                        }, 500);
                    }
                }
                /*if($("#obstacles").children().eq(i).hasClass('bird')){
                    birds.splice(i, 1)
                }*/
                $('#obstacles')
                    .children()
                    .eq(i)
                    .css({ visibility: 'hidden' });
                if (
                    $('#obstacles')
                        .children()
                        .eq(i)
                        .hasClass('boss')
                ) {
                    $('#obstacles')
                        .children()
                        .eq(i)
                        .removeClass()
                        .css({ position: 'absolute' });
                }
                /*$("#obstacles").children().eq(i).remove()
                $("#obstacles").children().eq(i).css({"margin-left":"-6px"})
                obstacle.splice(i, 1)*/
            }
            // loose condition
            if (
                obstacle_pos > -5 &&
                obstacle_pos < 45 &&
                pos_top > -50 &&
                $('#obstacles').children().length &&
                ($('#obstacles')
                    .children()
                    .eq(i)
                    .hasClass('little1') ||
                    $('#obstacles')
                        .children()
                        .eq(i)
                        .hasClass('little2'))
            ) {
                death_audio();
                over();
            } else if (
                obstacle_pos > -30 &&
                obstacle_pos < 45 &&
                pos_top > -50 &&
                $('#obstacles').children().length &&
                $('#obstacles')
                    .children()
                    .eq(i)
                    .hasClass('big')
            ) {
                death_audio();
                over();
            } else if (
                obstacle_pos > -5 &&
                obstacle_pos < 40 &&
                pos_top < -50 &&
                pos_top > -110 &&
                $('#obstacles').children().length &&
                $('#obstacles')
                    .children()
                    .eq(i)
                    .hasClass('bird')
            ) {
                death_audio();
                over();
            }
            // GET DIAM
            else if (
                obstacle_pos > -20 &&
                obstacle_pos < 45 &&
                pos_top > -50 &&
                $('#obstacles').children().length &&
                $('#obstacles')
                    .children()
                    .eq(i)
                    .hasClass('diam')
            ) {
                diam_audio();
                diam++;
                db_diam = parseInt(db_diam) + 1;
                // $("#shop-diam p").html(db_diam);
                // $.ajax({
                //   type: "POST",
                //   url: "secondryFiles/diam.php",
                //   data: {
                //     diam: db_diam,
                //   },
                //   success: function(data) {
                //     $("#shop-diam p").html(db_diam);
                //     console.log(diam);
                //   },
                // });

                let newData = {
                    email: db_email,
                    diamonds: db_diam,
                    hearts: db_heart,
                    // score = best_score,
                };
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:5000/api/users/diamondAndHeartUpdate',

                    data: newData,
                    success: function(data) {
                        //alert("add diamond success");
                        $('#shop-diam p').html(data.diamonds);
                    },
                });

                $('#obstacles')
                    .children()
                    .eq(i)
                    .css({ visibility: 'hidden' });
                if (
                    $('#obstacles')
                        .children()
                        .eq(i)
                        .hasClass('boss') ||
                    $('#obstacles')
                        .children()
                        .eq(i)
                        .hasClass('diam')
                ) {
                    $('#obstacles')
                        .children()
                        .eq(i)
                        .removeClass()
                        .css({ position: 'absolute' });
                }
                /*$("#obstacles").children().eq(i).remove()
                    obstacle.splice(i, 1)
                    $("#obstacles").children().eq(i).css({"margin-left":"-6px"})*/
            }
            // FIRE
            else if (
                obstacle_pos > -30 &&
                obstacle_pos < 15 &&
                pos_top > -30 &&
                $('#obstacles').children().length &&
                $('#obstacles')
                    .children()
                    .eq(i)
                    .hasClass('fire')
            ) {
                death_audio();
                over();
            }
            // BOSS MOVE
            else if (
                obstacle_pos > -5 &&
                obstacle_pos < 15 &&
                pos_top > -30 &&
                $('#obstacles').children().length &&
                $('#obstacles')
                    .children()
                    .eq(i)
                    .hasClass('boss')
            ) {
                death_audio();
                over();
            }
        }
    }
    if (obstacle.length >= 8) {
        remove_zeyed();
    }
}
// BIRDS MOVE
let bird_pos;
let bird_move = function() {
    for (i = 0; i <= obstacle.length; i++) {
        if (
            $('#obstacles')
                .children()
                .eq(i)
                .hasClass('bird') == true
        ) {
            if (
                $('#obstacles')
                    .children()
                    .eq(i).length
            ) {
                obstacle_pos = $('#obstacles')
                    .children()
                    .eq(i)
                    .position().left;
            }
            if (obstacle_pos > -65) {
                // ADD BIRD
                if (
                    $('#obstacles')
                        .children()
                        .eq(i)
                        .hasClass('translated') == false &&
                    $('#obstacles')
                        .children()
                        .eq(i)
                        .hasClass('bird')
                ) {
                    get_obs_pos = $('#obstacles')
                        .children()
                        .eq(i)
                        .css('left')
                        .split('px')
                        .slice(0, -1);
                    $('#obstacles')
                        .children()
                        .eq(i)
                        .css({
                            left: '' + (get_obs_pos - 1000) + 'px',
                            transition: '' + (speed_time - 400) + 'ms',
                            'transition-timing-function': 'linear',
                        })
                        .addClass('translated');
                }
            } else {
                /*if($("#obstacles").children().eq(i).hasClass('bird')){
                    birds.splice(i, 1)
                }*/
                $('#obstacles')
                    .children()
                    .eq(i)
                    .css({ visibility: 'hidden' })
                    .addClass('bird-died');
                if (
                    $('#obstacles')
                        .children()
                        .eq(i)
                        .hasClass('boss')
                ) {
                    $('#obstacles')
                        .children()
                        .eq(i)
                        .removeClass()
                        .css({ position: 'absolute' });
                }
                /*$("#obstacles").children().eq(i).remove()
                $("#obstacles").children().eq(i).css({"margin-left":"-6px"})
                obstacle.splice(i, 1)*/
            }
            // loose condition
            if (
                obstacle_pos > -5 &&
                obstacle_pos < 45 &&
                pos_top > -50 &&
                $('#obstacles').children().length &&
                ($('#obstacles')
                    .children()
                    .eq(i)
                    .hasClass('little1') ||
                    $('#obstacles')
                        .children()
                        .eq(i)
                        .hasClass('little2'))
            ) {
                death_audio();
                over();
            } else if (
                obstacle_pos > -30 &&
                obstacle_pos < 45 &&
                pos_top > -50 &&
                $('#obstacles').children().length &&
                $('#obstacles')
                    .children()
                    .eq(i)
                    .hasClass('big')
            ) {
                death_audio();
                over();
            }
            // DEAD FROM BIRD
            else if (
                obstacle_pos > -10 &&
                obstacle_pos < 40 &&
                $('#obstacles').children().length &&
                $('#obstacles')
                    .children()
                    .eq(i)
                    .hasClass('bird')
            ) {
                if (
                    pos_top <
                        $('#obstacles')
                            .children()
                            .eq(i)
                            .position().top +
                            20 &&
                    pos_top >
                        $('#obstacles')
                            .children()
                            .eq(i)
                            .position().top -
                            55
                ) {
                    death_audio();
                    over();
                }
            }
            // GET DIAM
            else if (
                obstacle_pos > -20 &&
                obstacle_pos < 45 &&
                pos_top > -50 &&
                $('#obstacles').children().length &&
                $('#obstacles')
                    .children()
                    .eq(i)
                    .hasClass('diam')
            ) {
                diam_audio();
                $('#obstacles')
                    .children()
                    .eq(i)
                    .css({ visibility: 'hidden' });
                if (
                    $('#obstacles')
                        .children()
                        .eq(i)
                        .hasClass('boss')
                ) {
                    $('#obstacles')
                        .children()
                        .eq(i)
                        .removeClass()
                        .css({ position: 'absolute' });
                }
                /*$("#obstacles").children().eq(i).remove()
                    $("#obstacles").children().eq(i).css({"margin-left":"-6px"})
                    obstacle.splice(i, 1)*/
            }
        }
    }
    if (obstacle.length >= 8) {
        remove_zeyed();
    }
};

// Remove obstacles zeydin every 20obstacle
let obstacle_pos_zeyed;
function remove_zeyed() {
    for (i = 0; i < obstacle.length; i++) {
        if (
            $('#obstacles')
                .children()
                .eq(i).length
        ) {
            obstacle_pos_zeyed = $('#obstacles')
                .children()
                .eq(i)
                .position().left;
        }
        if (obstacle_pos_zeyed < -65) {
            $('#obstacles')
                .children()
                .eq(i)
                .remove();
            obstacle.splice(i, 1);
            if (
                $('#obstacles')
                    .children()
                    .eq(i)
                    .hasClass('bird')
            ) {
                birds.splice(i, 1);
            }
        }
    }
}

// ADD BULLET
function bullet_add() {
    $('#bullets').append("<div style='top:" + pos_top + "px'></div>");
    bullets[bullets.length] = {
        position: 0,
    };
}
// BULLET MOVE
let get_bullet_pos;
let obstacle_pos_compa;
function bullets_move() {
    for (i = 0; i < bullets.length; i++) {
        if (
            $('#bullets')
                .children()
                .eq(i).length
        ) {
            get_bullet_pos = $('#bullets')
                .children()
                .eq(i)
                .position().left;
            if (get_bullet_pos < 900) {
                if (
                    $('#bullets')
                        .children()
                        .eq(i)
                        .hasClass('translated') == false &&
                    $('#bullets')
                        .children()
                        .eq(i).length
                ) {
                    $('#bullets')
                        .children()
                        .eq(i)
                        .css({
                            left: '' + (get_bullet_pos + 1000) + 'px',
                            transition: '3000ms',
                            'transition-timing-function': 'linear',
                        })
                        .addClass('translated');
                }
            } else {
                $('#bullets')
                    .children()
                    .eq(i)
                    .remove();
                //$("#bullets").children().eq(i).css({"margin-left":"1px"})
                bullets.splice(i, 1);
            }
        }
    }
}
function bird_dead() {
    //$("#test").html("Bullets : "+bullets.length+" <br>Birds : "+birds.length+"")
    for (j = 0; j < bullets.length; j++) {
        for (i = 0; i < birds.length; i++) {
            if (
                $('#bullets')
                    .children()
                    .eq(j).length &&
                $('.bird').eq(i).length
            ) {
                if (
                    $('#bullets')
                        .children()
                        .eq(j)
                        .position().left +
                        40 >=
                        $('.bird')
                            .eq(i)
                            .position().left &&
                    $('#bullets')
                        .children()
                        .eq(j)
                        .position().top <=
                        $('.bird')
                            .eq(i)
                            .position().top +
                            20 &&
                    $('#bullets')
                        .children()
                        .eq(j)
                        .position().top >=
                        $('.bird')
                            .eq(i)
                            .position().top -
                            45 &&
                    $('.bird')
                        .eq(i)
                        .hasClass('bird-died') == false
                ) {
                    $('.bird')
                        .eq(i)
                        .css({ visibility: 'hidden' })
                        .removeClass()
                        .css({ position: 'absolute' });
                    $('#bullets')
                        .children()
                        .eq(j)
                        .remove();
                    bullets_pos = 0;
                    bullets.splice(j, 1);
                    //birds.splice(i, 1)
                }
            }
        }
    }
}

let boss_add = function() {
    clearInterval(obstacle_add_loop);
    clearInterval(obstacle_add_loop2);
    boss_add_out = setTimeout(() => {
        if (game == true) {
            boss = true;
            clearInterval(obstacle_move_loop);
            clearInterval(run_loop);
            clearInterval(score_loop);
            clearInterval(dead_loop);
            clearInterval(bullets_move_loop);
            clearInterval(bird_move_loop);
            $('#obstacles')
                .children()
                .remove();
            $('#bullets')
                .children()
                .remove();
            $('#boss-bar').fadeIn();
            boss_attack();
        }
    }, 2100);
};

function boss_attack() {
    // fire ball
    $('#obstacles').append("<div class='boss' style='display:none'></div>");
    $('.boss').fadeIn();
    roar_audio();
    $('.boss').css({
        left: '650px',
        transition: '1s',
        'transition-timing-function': 'linear',
    });
    boss_mouvement = false;
    clearInterval(obstacle_move_loop);
    setTimeout(() => {
        if (game == true) {
            boss_attack_fire();
            // Obstacles loop working
            obstacle_move_loop = setInterval(() => {
                obstacle_move();
            }, 32);
            // First dragon move to character
            // LEVEL 1
            if (boss_level == 1) {
                setTimeout(() => {
                    if (game == true) {
                        $('.boss').css({
                            'margin-top': '120px',
                            transition: '0.2s',
                            'transition-timing-function': 'linear',
                        });
                        setTimeout(() => {
                            boss_mouvement = true;
                            $('.boss').css({
                                background: "url('./media/boss_move.png')",
                                transition: '0s',
                                'transition-timing-function': 'linear',
                            });
                        }, 101);
                    }
                }, 1500);
            }
            // LEVEL 2
            else if (boss_level == 2) {
                setTimeout(() => {
                    boss_attack_fire();
                }, 1000);
                setTimeout(() => {
                    if (game == true) {
                        $('.boss').css({
                            'margin-top': '120px',
                            transition: '0.2s',
                            'transition-timing-function': 'linear',
                        });
                        setTimeout(() => {
                            boss_mouvement = true;
                            $('.boss').css({
                                background: "url('./media/boss_move.png')",
                                transition: '0s',
                                'transition-timing-function': 'linear',
                            });
                        }, 201);
                    }
                }, 2000);
            }
            // LEVEL 3
            else if (boss_level == 3) {
                setTimeout(() => {
                    boss_attack_fire();
                }, 800);
                setTimeout(() => {
                    boss_attack_fire();
                }, 1600);
                setTimeout(() => {
                    if (game == true) {
                        $('.boss').css({
                            'margin-top': '120px',
                            transition: '0.2s',
                            'transition-timing-function': 'linear',
                        });
                        setTimeout(() => {
                            boss_mouvement = true;
                            $('.boss').css({
                                background: "url('./media/boss_move.png')",
                                transition: '0s',
                                'transition-timing-function': 'linear',
                            });
                        }, 301);
                    }
                }, 2800);
            }
            // LEVEL 4
            else if (boss_level == 4) {
                setTimeout(() => {
                    boss_attack_fire();
                }, 600);
                setTimeout(() => {
                    boss_attack_fire();
                }, 1200);
                setTimeout(() => {
                    boss_attack_fire();
                }, 1800);
                setTimeout(() => {
                    if (game == true) {
                        $('.boss').css({
                            'margin-top': '120px',
                            transition: '0.2s',
                            'transition-timing-function': 'linear',
                        });
                        setTimeout(() => {
                            boss_mouvement = true;
                            $('.boss').css({
                                background: "url('./media/boss_move.png')",
                                transition: '0s',
                                'transition-timing-function': 'linear',
                            });
                        }, 401);
                    }
                }, 3200);
            }
            // LEVEL 5
            else if (boss_level == 5) {
                setTimeout(() => {
                    boss_attack_fire();
                }, 500);
                setTimeout(() => {
                    boss_attack_fire();
                }, 1000);
                setTimeout(() => {
                    boss_attack_fire();
                }, 1800);
                setTimeout(() => {
                    boss_attack_fire();
                }, 2400);
                setTimeout(() => {
                    if (game == true) {
                        $('.boss').css({
                            'margin-top': '120px',
                            transition: '0.2s',
                            'transition-timing-function': 'linear',
                        });
                        setTimeout(() => {
                            boss_mouvement = true;
                            $('.boss').css({
                                background: "url('./media/boss_move.png')",
                                transition: '0s',
                                'transition-timing-function': 'linear',
                            });
                        }, 501);
                    }
                }, 3400);
            }
        }
    }, 2000);
}

let boss_attack_fire = function() {
    $('.boss').css({
        background: 'url("./media/boss_spit.png")',
        transition: '0s',
        'transition-timing-function': 'linear',
    });
    setTimeout(() => {
        $('#obstacles').append("<div class='fire'></div>");
        fire_audio();
        obstacle[obstacle.length] = {
            position: 0,
        };
        setTimeout(() => {
            $('.boss').css({
                background: 'url("./media/boss_idle.gif")',
                transition: '0s',
                'transition-timing-function': 'linear',
            });
        }, 200);
    }, 100);
};
let boss_attack_move = function() {
    boss_mouvement = true;
};
let score_add = function() {
    score++;
    if (score < 10) {
        $('#score').html('0000' + score);
    } else if (score < 100) {
        $('#score').html('000' + score);
    } else if (score < 1000) {
        $('#score').html('00' + score);
    } else if (score < 10000) {
        $('#score').html('0' + score);
    } else {
        $('#score').html(score);
    }

    if (score == 500) {
        clearInterval(obstacle_move_loop);
        obstacle_move_loop = setInterval(() => {
            obstacle_move();
        }, 10.75);
        clearInterval(bird_move_loop);
        bird_move_loop = setInterval(() => {
            bird_move();
            bird_dead();
        }, 8.75);
        obstacle_move_key = 10.75;
        bird_move_key = 8.75;
        $('#speeding-msg').show();
        setTimeout(() => {
            if (stop_settimeout == false) {
                clearInterval(obstacle_move_loop);
                clearInterval(bird_move_loop);
                obstacle_move_loop = setInterval(() => {
                    obstacle_move();
                }, 10.5);
                bird_move_loop = setInterval(() => {
                    bird_move();
                    bird_dead();
                }, 8.5);
                obstacle_move_key = 10.5;
                bird_move_key = 8.5;
                speed_up_bug();
                speed_time = 2000;
            }
        }, 1000);
        setTimeout(() => {
            if (stop_settimeout == false) {
                clearInterval(obstacle_move_loop);
                clearInterval(bird_move_loop);
                obstacle_move_loop = setInterval(() => {
                    obstacle_move();
                }, 10.25);
                bird_move_loop = setInterval(() => {
                    bird_move();
                    bird_dead();
                }, 8.25);
                obstacle_move_key = 10.25;
                bird_move_key = 8.25;
            }
        }, 2000);
        setTimeout(() => {
            if (stop_settimeout == false) {
                clearInterval(obstacle_move_loop);
                clearInterval(bird_move_loop);
                obstacle_move_loop = setInterval(() => {
                    obstacle_move();
                }, 10);
                bird_move_loop = setInterval(() => {
                    bird_move();
                    bird_dead();
                }, 8);
                obstacle_move_key = 10;
                bird_move_key = 8;
            }
            $('#speeding-msg').hide();
        }, 3000);
    } else if (score == 750) {
        $('#speeding-msg').show();
        clearInterval(obstacle_move_loop);
        obstacle_move_loop = setInterval(() => {
            obstacle_move();
        }, 9.75);
        clearInterval(bird_move_loop);
        bird_move_loop = setInterval(() => {
            bird_move();
            bird_dead();
        }, 7.75);
        obstacle_move_key = 9.75;
        bird_move_key = 7.75;
        setTimeout(() => {
            if (stop_settimeout == false) {
                clearInterval(obstacle_move_loop);
                clearInterval(bird_move_loop);
                obstacle_move_loop = setInterval(() => {
                    obstacle_move();
                }, 9.5);
                bird_move_loop = setInterval(() => {
                    bird_move();
                    bird_dead();
                }, 7.5);
                obstacle_move_key = 9.5;
                bird_move_key = 7.5;
                speed_up_bug();
                speed_time = 1800;
            }
        }, 1000);
        setTimeout(() => {
            if (stop_settimeout == false) {
                clearInterval(obstacle_move_loop);
                clearInterval(bird_move_loop);
                obstacle_move_loop = setInterval(() => {
                    obstacle_move();
                }, 9.25);
                bird_move_loop = setInterval(() => {
                    bird_move();
                    bird_dead();
                }, 7.25);
                obstacle_move_key = 9.25;
                bird_move_key = 7.25;
            }
        }, 2000);
        setTimeout(() => {
            if (stop_settimeout == false) {
                clearInterval(obstacle_move_loop);
                clearInterval(bird_move_loop);
                obstacle_move_loop = setInterval(() => {
                    obstacle_move();
                }, 9);
                bird_move_loop = setInterval(() => {
                    bird_move();
                    bird_dead();
                }, 7);
                obstacle_move_key = 9;
                bird_move_key = 7;
            }
            $('#speeding-msg').hide();
        }, 3000);
    } else if (score == 1000) {
        $('#speeding-msg').show();
        clearInterval(obstacle_move_loop);
        obstacle_move_loop = setInterval(() => {
            obstacle_move();
        }, 8.75);
        clearInterval(bird_move_loop);
        bird_move_loop = setInterval(() => {
            bird_move();
            bird_dead();
        }, 6.75);
        obstacle_move_key = 8.75;
        bird_move_key = 6.75;
        setTimeout(() => {
            if (stop_settimeout == false) {
                clearInterval(obstacle_move_loop);
                clearInterval(bird_move_loop);
                obstacle_move_loop = setInterval(() => {
                    obstacle_move();
                }, 8.5);
                bird_move_loop = setInterval(() => {
                    bird_move();
                    bird_dead();
                }, 6.5);
                obstacle_move_key = 8.5;
                bird_move_key = 6.5;
                speed_up_bug();
                speed_time = 1600;
            }
        }, 1000);
        setTimeout(() => {
            if (stop_settimeout == false) {
                clearInterval(obstacle_move_loop);
                clearInterval(bird_move_loop);
                obstacle_move_loop = setInterval(() => {
                    obstacle_move();
                }, 8.25);
                bird_move_loop = setInterval(() => {
                    bird_move();
                    bird_dead();
                }, 6.25);
                obstacle_move_key = 8.25;
                bird_move_key = 6.25;
            }
        }, 2000);
        setTimeout(() => {
            if (stop_settimeout == false) {
                clearInterval(obstacle_move_loop);
                clearInterval(bird_move_loop);
                obstacle_move_loop = setInterval(() => {
                    obstacle_move();
                }, 8);
                bird_move_loop = setInterval(() => {
                    bird_move();
                    bird_dead();
                }, 6);
                obstacle_move_key = 8;
                bird_move_key = 6;
            }
            $('#speeding-msg').hide();
        }, 3000);
    } else if (score == 2000) {
        $('#speeding-msg').show();
        clearInterval(obstacle_move_loop);
        obstacle_move_loop = setInterval(() => {
            obstacle_move();
        }, 7.75);
        clearInterval(bird_move_loop);
        bird_move_loop = setInterval(() => {
            bird_move();
            bird_dead();
        }, 5.75);
        obstacle_move_key = 7.75;
        bird_move_key = 5.75;
        setTimeout(() => {
            if (stop_settimeout == false) {
                clearInterval(obstacle_move_loop);
                clearInterval(bird_move_loop);
                obstacle_move_loop = setInterval(() => {
                    obstacle_move();
                }, 7.5);
                bird_move_loop = setInterval(() => {
                    bird_move();
                    bird_dead();
                }, 5.5);
                obstacle_move_key = 7.5;
                bird_move_key = 5.5;
                speed_up_bug();
                speed_time = 1400;
            }
        }, 1000);
        setTimeout(() => {
            if (stop_settimeout == false) {
                clearInterval(obstacle_move_loop);
                clearInterval(bird_move_loop);
                obstacle_move_loop = setInterval(() => {
                    obstacle_move();
                }, 7.25);
                bird_move_loop = setInterval(() => {
                    bird_move();
                    bird_dead();
                }, 5.25);
                obstacle_move_key = 7.25;
                bird_move_key = 5.25;
            }
        }, 2000);
        setTimeout(() => {
            if (stop_settimeout == false) {
                clearInterval(obstacle_move_loop);
                clearInterval(bird_move_loop);
                obstacle_move_loop = setInterval(() => {
                    obstacle_move();
                }, 7);
                bird_move_loop = setInterval(() => {
                    bird_move();
                    bird_dead();
                }, 5);
                obstacle_move_key = 7;
                bird_move_key = 5;
            }
            $('#speeding-msg').hide();
        }, 3000);
    } else if (score == 3000) {
        $('#speeding-msg').show();
        clearInterval(obstacle_move_loop);
        obstacle_move_loop = setInterval(() => {
            obstacle_move();
        }, 6.75);
        clearInterval(bird_move_loop);
        bird_move_loop = setInterval(() => {
            bird_move();
            bird_dead();
        }, 4.75);
        obstacle_move_key = 6.75;
        bird_move_key = 4.75;
        setTimeout(() => {
            if (stop_settimeout == false) {
                clearInterval(obstacle_move_loop);
                clearInterval(bird_move_loop);
                obstacle_move_loop = setInterval(() => {
                    obstacle_move();
                }, 6.5);
                bird_move_loop = setInterval(() => {
                    bird_move();
                    bird_dead();
                }, 4.5);
                obstacle_move_key = 6.5;
                bird_move_key = 4.5;
                speed_up_bug();
                speed_time = 1200;
            }
        }, 1000);
        setTimeout(() => {
            if (stop_settimeout == false) {
                clearInterval(obstacle_move_loop);
                clearInterval(bird_move_loop);
                obstacle_move_loop = setInterval(() => {
                    obstacle_move();
                }, 6.25);
                bird_move_loop = setInterval(() => {
                    bird_move();
                    bird_dead();
                }, 4.25);
                obstacle_move_key = 6.25;
                bird_move_key = 4.25;
            }
        }, 2000);
        setTimeout(() => {
            if (stop_settimeout == false) {
                clearInterval(obstacle_move_loop);
                clearInterval(bird_move_loop);
                obstacle_move_loop = setInterval(() => {
                    obstacle_move();
                }, 6);
                bird_move_loop = setInterval(() => {
                    bird_move();
                    bird_dead();
                }, 4);
                obstacle_move_key = 6;
                bird_move_key = 4;
            }
            $('#speeding-msg').hide();
        }, 3000);
    } else if (score == 10) {
        boss_add();
    }
};
function start() {
    // alert("Db_heart =" + db_heart);
    game = true;

    if (db_heart > 0) {
        heart_availability = true;
    } else {
        heart_availability = false;
    }
    // console.log("its here");
    character_etat = 'running';
    yes_button_availibility = false;
    speed_time = 2200;
    score = 0;
    diam = 0;
    pos_top = 0;
    jump_etat = 0;
    bullets = [];
    obstacle = [];
    birds = [];
    boss_mouvement = false;
    boss_level = 1;
    boss_health = 100;
    jump_more = false;
    setTimeout(() => {
        stop_settimeout = false;
    }, 3001);
    bird_move_key = 9;
    obstacle_move_key = 11;
    $('#boss-bar div').css({ width: '101%' });
    // Opera + Chrome + Edge
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
    }, 9);
    setTimeout(() => {
        obstacle_add();
        obstacle_add_loop = setInterval(() => {
            obstacle_add();
            bird_dead();
        }, obstacle_time);
        obstacle_move_loop = setInterval(() => {
            obstacle_move();
            bird_dead();
        }, 11);
    }, 500);
    $('#score').html('00000');
    $('#obstacles')
        .children()
        .remove();
    $('#character').css({ background: 'black', 'background-size': 'cover' });
    $('#character').css({ top: '0px' });
    $('#game-over').hide();
    $('#gameplay-start').hide();
    $('#bullets')
        .children()
        .remove();
    $('#boss-bar').hide();
    $('#speeding-msg').hide();
}

// GAME OVER
function over() {
    // alert("heart_availability = " + heart_availability);
    if (new_chance == false) {
        get_obstacle_position();
        stop_settimeout = true;
        $('#character').css({ background: 'black', 'background-size': 'cover' });
        $('#boss-bar').hide();
        clearInterval(obstacle_add_loop);
        clearInterval(obstacle_move_loop);
        clearInterval(obstacle_add_loop2);
        clearInterval(run_loop);
        clearInterval(jump_loop);
        clearInterval(score_loop);
        clearInterval(dead_loop);
        clearInterval(bullets_move_loop);
        clearInterval(bird_move_loop);
        clearTimeout(boss_add_out);

        if (heart_availability == true && boss == false && db_heart > 0) {
            $('#gameplay-chance').show();
            yes_button_availibility = true;
        } else {
            game = false;
            $('#game-over').fadeIn();
            $('#gameplay-chance').hide();
        }
        boss = false;
    }
    if (score > best_score) {
        // $.ajax({
        //   type: "POST",
        //   url: "secondryFiles/score.php",
        //   data: {
        //     score: score,
        //   },
        //   success: function(data) {
        //     best_score = score;
        //   },
        // });
        let scoreUpdate = {
            email: db_email,
            diamonds: db_diam,
            hearts: db_heart,
            score: score,
        };
        $.ajax({
            type: 'POST',
            url: 'http://localhost:5000/api/users/diamondAndHeartUpdate',

            data: scoreUpdate,
            success: function(data) {
                //alert("add diamond success");
                // $("#shop-diam p").html(data.diamonds);
                best_score = score;
            },
        });
    }
}

let get_obs_pos;
function get_obstacle_position() {
    for (i = 0; i < obstacle.length; i++) {
        if (
            $('#obstacles')
                .children()
                .eq(i)
                .hasClass('little1') ||
            $('#obstacles')
                .children()
                .eq(i)
                .hasClass('diam') ||
            $('#obstacles')
                .children()
                .eq(i)
                .hasClass('big') |
                $('#obstacles')
                    .children()
                    .eq(i)
                    .hasClass('bird')
        ) {
            get_obs_pos = $('#obstacles')
                .children()
                .eq(i)
                .css('left')
                .split('px')
                .slice(0, -1);
            $('#obstacles')
                .children()
                .eq(i)
                .css({
                    left: '' + get_obs_pos + 'px',
                    transition: '0ms',
                    'transition-timing-function': 'linear',
                })
                .removeClass('translated');
        }
    }

    for (j = 0; j < bullets.length; j++) {
        if (
            $('#bullets')
                .children()
                .eq(j).length
        ) {
            get_bullet_pos = $('#bullets')
                .children()
                .eq(j)
                .css('left')
                .split('px')
                .slice(0, -1);
            $('#bullets')
                .children()
                .eq(j)
                .css({
                    left: '' + get_bullet_pos + 'px',
                    transition: '0s',
                    'transition-timing-function': 'linear',
                })
                .removeClass('translated');
        }
    }
}

let speed_up_bug = function() {
    for (i = 0; i < obstacle.length; i++) {
        $('#obstacles')
            .children()
            .eq(i)
            .removeClass('translated');
    }
};
