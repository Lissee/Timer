let start = document.getElementById('start_button');
let timer = document.getElementsByClassName('timer');

function clock(now, ms){
    fixTime(ms-(new Date() - now))
}

function startPosition() {
    clearInterval(document.timerId)
    clearTimeout(document.timerId2)

    start.className = ""
    start.innerText = "Start"
    timer.contentEditable = "true"

    start.addEventListener("click", startTimer, false)
}

function endTimer (timerId) {
    clearInterval(timerId)

    document.getElementById('msc').value = '000'
    document.getElementById('sec').value = '00'
    document.getElementById('min').value = '00'


    start.className = "";
    timer.contentEditable = "true";
    startPosition()
}


function startTime(ms){
    let now = new Date();

    document.timerId = setInterval(clock, 1, now,  ms);
    document.timerId2 = setTimeout(endTimer, ms, document.timerId);

    start.removeEventListener("click", startTimer, false);
    start.innerText = "Stop";
    start.addEventListener("click", startPosition, false)
}


function startTimer() {
    start.className = "active";
    timer.contentEditable = "false";
    let ms = read();
    console.log(ms)
    startTime(ms)

}

function read(){
    let msc = Number(document.getElementById('msc').value)
    let sec = Number(document.getElementById('sec').value)
    let min = Number(document.getElementById('min').value)

    if (msc > 999)  {
        msc = 999
        document.getElementById('msc').value = msc;
    } else if (msc === 0) {
        document.getElementById('msc').value = '000';
    }

    if (sec > 59) {
        sec = 59
        document.getElementById('sec').value = sec;
    } else if (msc === 0) {
        document.getElementById('sec').value = '00';
    }

    if (min > 59) {
        min = 59
        document.getElementById('min').value = min;
    } else if (msc === 0) {
        document.getElementById('min').value = '00';
    }

    console.log("ms " + msc)
    console.log("sec " + sec)
    console.log("min " + min)
    console.log("Сумма мс: " + Number(msc + (sec * 1000) + (min * 60000)))

    return Number(msc + (sec * 1000) + (min * 60000))

}

function fixTime (ms) {
    document.getElementById('msc').value  = ms % 1000
    document.getElementById('sec').value  = ((ms-ms%1000)/1000)%60
    document.getElementById('min').value = ((((ms-ms%1000)/1000)-(((ms-ms%1000)/1000)%60))/60)%60
}


start.addEventListener("click", startTimer, false)