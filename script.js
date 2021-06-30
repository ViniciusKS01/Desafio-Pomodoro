var start = document.getElementById('start');
var stop = document.getElementById('stop');
var reset = document.getElementById('reset');

var wm = document.getElementById('w_minutes');
var ws = document.getElementById('w_seconds');

var bm = document.getElementById('b_minutes');
var bs = document.getElementById('b_seconds');

var startTimer;

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
    wm.innerText = 25;
    ws.innerText = "00";
    bm.innerText = 5;
    bs.innerText = "00";

    stopInterval()
    startTimer = undefined;
})

stop.addEventListener('click', function () {
    stopInterval()
    startTimer = undefined;
})

function timer() {
    if (ws.innerText != 0) {
        ws.innerText--;
    } else if (wm.innerText != 0 && ws.innerText == 0) {
        ws.innerText = 59;
        wm.innerText--;
    }

    if (wm.innerText == 0 && ws.innerText == 0) {
        final.play()
        if (bs.innerText != 0) {
            bs.innerText--;
        } else if (bm.innerText != 0 && bs.innerText == 0) {
            bs.innerText = 59;
            bm.innerText--;
        }
    }

    if (wm.innerText == 0 && ws.innerText == 0 && bm.innerText == 0 && bs.innerText == 0) {
        volta.play()
        wm.innerText = 25;
        ws.innerText = "00";
        bm.innerText = 5;
        bs.innerText = "00";
    }
}

function stopInterval() {
    clearInterval(startTimer);
}