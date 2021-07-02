var start = document.getElementById('start');
var stop = document.getElementById('stop');
var reset = document.getElementById('reset');
var plus = document.getElementById('plus');
var less = document.getElementById('less');

var wm = document.getElementById('w_minutes');
var ws = document.getElementById('w_seconds');

var bm = document.getElementById('b_minutes');
var bs = document.getElementById('b_seconds');

var counter = document.getElementById('counter');

var startTimer;
var ref = 25;
var count_bonus = 4;
var aux = true;

var final = new Audio("./audios/audio_final.mp3");
var volta = new Audio("./audios/audio_volta.mp3");

start.addEventListener('click', function () {
    if (startTimer === undefined) {
        startTimer = setInterval(timer, 1000)
    } else {
        alert("O cronômetro já está funcionando");
    }
})

reset.addEventListener('click', function () {
    wm.innerText = ref;
    ws.innerText = "00";
    bm.innerText = 5;
    bs.innerText = "00";

    aux = true;

    stopInterval()
    startTimer = undefined;
})

stop.addEventListener('click', function () {
    stopInterval()
    startTimer = undefined;
})

plus.addEventListener('click', function () {
    if (startTimer === undefined && wm.innerText == ref) {
        wm.innerText++;
        ref = wm.innerText;
    } else {
        alert("O cronômetro já está funcionando");
    }
})

less.addEventListener('click', function () {
    if (startTimer === undefined && wm.innerText == ref) {
        if (wm.innerText == 1) {
            alert("Valor mínimo atingido");
            wm.innerText++;
        }
        wm.innerText--;
        ref = wm.innerText;
    } else {
        alert("O cronômetro já está funcionando");
    }
})

bonus.addEventListener('click', function () {
    if (startTimer === undefined) {
        if (counter.innerText != count_bonus || wm.innerText == 0 && ws.innerText == 0) {
            alert("A cada 4 ciclos você poderá receber um bônus"); 
        } else {
            bm.innerText = 10;
            count_bonus = count_bonus + 4;           
        }
    } else {
        alert("O cronômetro já está funcionando");
    }
})

function timer() {
    if (ws.innerText != 0) {
        ws.innerText--;
    } else if (wm.innerText != 0 && ws.innerText == 0) {
        ws.innerText = 59;
        wm.innerText--;
    }

    if (wm.innerText == 0 && ws.innerText == 0) {
        if (aux) {
            final.play()
            Push.create('ATENÇÃO', {
                body: "Momento de descansar",
                icon: './icon/relogio.png'
            });
            aux = false;
        }
        if (bs.innerText != 0) {
            bs.innerText--;
        } else if (bm.innerText != 0 && bs.innerText == 0) {
            bs.innerText = 59;
            bm.innerText--;
        }
    }

    if (wm.innerText == 0 && ws.innerText == 0 && bm.innerText == 0 && bs.innerText == 0) {
        volta.play()
        Push.create('ATENÇÃO', {
            body: "Momento de trabalhar",
            icon: './icon/relogio.png'
        });
        wm.innerText = ref;
        ws.innerText = "00";
        bm.innerText = 5;
        bs.innerText = "00";

        aux = true;

        counter.innerText++;
        if (counter.innerText == count_bonus) {
            alert("Parabéns pelo esforço. \nPause e aperte aperta o botão bônus para ganhar 10 minutos de descanso.");
        }

        if (counter.innerText > count_bonus) {
            count_bonus = count_bonus + 4;
        }
    }
}

function stopInterval() {
    clearInterval(startTimer);
}