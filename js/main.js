(function () {
    var letterObj = $('.letter-wrap'),
        letters = [
            {
                key: '65',
                value: 'A'
            },
            {
                key: '66',
                value: 'B'
            },
            {
                key: '67',
                value: 'C'
            },
            {
                key: '68',
                value: 'D'
            },
            {
                key: '69',
                value: 'E'
            },
            {
                key: '70',
                value: 'F'
            },
            {
                key: '71',
                value: 'G'
            },
            {
                key: '72',
                value: 'H'
            },
            {
                key: '73',
                value: 'I'
            },
            {
                key: '74',
                value: 'J'
            },
            {
                key: '75',
                value: 'K'
            },
            {
                key: '76',
                value: 'L'
            },
            {
                key: '77',
                value: 'M'
            },
            {
                key: '78',
                value: 'N'
            },
            {
                key: '79',
                value: 'O'
            },
            {
                key: '80',
                value: 'P'
            },
            {
                key: '81',
                value: 'Q'
            },
            {
                key: '82',
                value: 'R'
            },
            {
                key: '83',
                value: 'S'
            },
            {
                key: '84',
                value: 'T'
            },
            {
                key: '85',
                value: 'U'
            },
            {
                key: '86',
                value: 'V'
            },
            {
                key: '87',
                value: 'W'
            },
            {
                key: '88',
                value: 'X'
            },
            {
                key: '89',
                value: 'Y'
            },
            {
                key: '90',
                value: 'Z'
            }
    ],
        llt = letters.length - 1,
        hole = $('.hole'),
        holeLength = hole.length,
        hlt = holeLength - 1,
        checkUp = [],
        collectLetter = [],
        curKey,
        mouseLeft,
        mouseTop,
        score = 0,
        time = 30,
        timeInterv = null,
        startInterv = null,
        grText = {
            'win': 'Well done!',
            'lose': 'Oops!!'
        };


    var game = {

        init: function () {
            score = 0;
            time = 30;
            checkUp = [];
            collectLetter = [];
            curKey = null;
            $('#score').html(score);
            $('#time').html(time);
            $('#game-result').fadeOut(300);
            $('#btn-start').show();
        },
        mouseUp: function (index) {
            if (!checkUp[index]) {
                var j = parseInt(Math.random() * (llt - 0 + 1) + 0);
                letterObj.eq(index).html(letters[j].value).removeClass('down clicked').addClass('up transition');
                checkUp[index] = true;
                collectLetter[index] = letters[j].value;
                game.mouseDown(index);
            }
        },
        mouseDown: function (index) {
            if (checkUp[index] === true) {
                setTimeout(function () {
                    letterObj.eq(index).removeClass('up clicked').addClass('down transition');
                    checkUp[index] = false;
                    collectLetter[index] = "";
                }, 3000);
            }
        },
        keyPress: function () {
            $(window).keydown(function (event) {
                var keyNum = event.keyCode;
                var getKey = String.fromCharCode(event.keyCode);

                if (keyNum >= 65 && keyNum <= 90) {
                    curKey = getKey;
                    if ($.inArray(curKey, collectLetter) != -1) {
                        letterObj.eq($.inArray(curKey, collectLetter)).removeClass('up transition').addClass('clicked down');
                        game.count();
                    }
                }
            });
        },
        count: function () {
            mouseLeft = letterObj.eq($.inArray(curKey, collectLetter)).offset().left;
            mouseTop = letterObj.eq($.inArray(curKey, collectLetter)).offset().top;
            $('#canvas1').append('<span class="count-item">+10</span>');
            $('.count-item').last().offset({
                top: mouseTop - 100,
                left: mouseLeft + 10
            }).animate({
                top: '-=15'
            }, 300, function () {
                $(this).remove();
            });
            score += 10;
            $('#score').html(score);
            collectLetter[$.inArray(curKey, collectLetter)] = "";
        },
        countdown: function () {
            timeInterv = setInterval(function () {
                time -= 1;
                if (time === 0) {
                    time = 0;
                    clearInterval(timeInterv); //clear time
                    game.gameEnd();
                }
                $('#time').html(time);
            }, 1000);
        },
        gameEnd: function () {
            letterObj.removeClass('up down clicked');
            clearInterval(startInterv); //stop
            if (score >= 300) {
                $('#gr-text').html(grText.win);
                $('#gr-score').html(score);
                $('#btn-replay').html('Play again');
            } else {
                $('#gr-text').html(grText.lose);
                $('#gr-score').html('only ' + score);
                $('#btn-replay').html('Try again');
            }
            $('#game-result').fadeIn(300);
        },
        start: function () {
            startInterv = setInterval(function () {
                for (var i = 0; i < holeLength; i++) {
                    if (i == parseInt(Math.random() * (hlt - 0 + 1) + 0)) {
                        game.mouseUp(i);
                    }
                }
            }, 500);
            game.countdown();
            $('#btn-start').hide();
        }
    };

    game.init();
    game.keyPress();
    $('#btn-start').click(function () {
        game.start();
    });
    $('#btn-replay').click(function () {
        game.init();
    });
})();