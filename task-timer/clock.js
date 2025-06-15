let seconds = 0;
let seconds1 = 25 * 60;
let seconds2 = 5 * 60;
let interval = null;
const data = new Date();

function timer() {
    const timer = document.querySelector('#timer span')

    if (interval !== null) return;

    interval = setInterval(() => {
        const data = new Date(seconds * 1000);
        timer.innerHTML = data.toLocaleTimeString('pt-BR', {
            hour12: false,
            timeZone: 'GMT'
        })

        seconds++;

    }, 1000)

}

const btBegin = document.querySelector('#btBegin')
btBegin.addEventListener('click', () => {
    timer()

    if (backNight.classList.contains('backWhite')) {
        document.querySelector('#timer span').style.color = "white"
    } else {
        document.querySelector('#timer span').style.color = "black"

    }

});

const btBreak = document.querySelector('#btBreak')
btBreak.addEventListener('click', () => {
    clearInterval(interval);
    interval = null
    document.querySelector('#timer span').style.color = 'red'
});

const btZero = document.querySelector('#btZero')
btZero.addEventListener('click', () => {
    document.querySelector('#timer span').innerHTML = '00:00:00'
    clearInterval(interval)
    seconds = 0
    if (backNight.classList.contains('backWhite')) {
        document.querySelector('#timer span').style.color = "white"
    } else {
        document.querySelector('#timer span').style.color = "black"

    }

});

function tabPages() {
    const btnTimer = document.querySelector('[data-tab="timer"]')
    const btnDecrescente = document.querySelector('[data-tab="timerDecrescente"]')

    const divTimer = document.querySelector('#timer')
    const divTimerDesc = document.querySelector('#timerDesc')

    btnTimer.addEventListener('click', () => {
        btnTimer.classList.add('tabAtiva')
        btnDecrescente.classList.remove('tabAtiva')

        divTimer.classList.add('ativa')
        divTimerDesc.classList.remove('ativa')
    })

    btnDecrescente.addEventListener('click', () => {
        btnDecrescente.classList.add('tabAtiva')
        btnTimer.classList.remove('tabAtiva')

        divTimerDesc.classList.add('ativa')
        divTimer.classList.remove('ativa');
    })
}

tabPages();

const backNight = document.querySelector('#backNight');
const divBack = document.querySelector('.div');
const textWhite = document.querySelector('#timer span');
const focusWhite = document.querySelector('#timerDesc span');
const btnTimerWhite = document.querySelector('[data-tab="timer"]')
const btnDecrescenteWhite = document.querySelector('[data-tab="timerDecrescente"]')
backNight.addEventListener('click', () => {
    divBack.classList.toggle('backNight')
    backNight.classList.toggle('backWhite')

    if (backNight.classList.contains('backWhite')) {
        backNight.innerHTML = 'White Color'
        textWhite.style.color = "white"
        focusWhite.style.color = "white"
        btnTimerWhite.style.color = "white"
        btnDecrescenteWhite.style.color = "white"

    } else {
        backNight.innerHTML = 'Night Color'
        textWhite.style.color = "black"
        focusWhite.style.color = "black"
        btnTimerWhite.style.color = "black"
        btnDecrescenteWhite.style.color = "black"
    }
})

function getDay() {
    const dateDay = document.querySelector('#dateDay')
    const dataDay = new Date;

    const days = ['Domingo', 'Segunda-Feira', 'Terca-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']

    let day = days[dataDay.getDay()];

    dateDay.innerHTML = day;
}

getDay();

function timerDecrescente() {
    const timerDesc = document.querySelector('#timerDesc span')
    const alarm = new Audio('C:/Codes/logica/exerciciolistadetarefa/task-timer/task-timer/assetsgame-over-38511.mp3')
    const alarm2 = new Audio('C:/Codes/logica/exerciciolistadetarefa/task-timer/task-timer/assetsgame-bonus-2-294436.mp3')

    if (interval !== null) return;

    interval = setInterval(() => {
        seconds1--;
        updateDisplay(seconds1);

        if (seconds1 <= 0) {
            clearInterval(interval)
            interval = null;
            alarm.play();

            let interval2 = setInterval(() => {
                seconds2--;
                updateDisplay(seconds2);
                timerDesc.style.color = "green";

                if (seconds2 <= 0) {
                    clearInterval(interval2);
                    interval2 = null;
                    alarm2.play();
                    timerDesc.innerHTML = '25:00';
                    seconds1 = 25 * 60;
                    if (backNight.classList.contains('backWhite')) {
                        timerDesc.style.color = "white";
                    } else {
                        timerDesc.style.color = "black";
                    }
                }
            }, 1000)

        }


    }, 1000)

    function updateDisplay(seconds) {
        const dataTime = new Date(seconds * 1000);
        dataTime.setHours(0);
        timerDesc.innerHTML = `${dataTime.getMinutes().toString().padStart(2, '0')}:${dataTime.getSeconds().toString().padStart(2, '0')}`
    }

}

const btnBegin2 = document.querySelector('#btBegin2');
btnBegin2.addEventListener('click', () => {
    timerDecrescente();
    if (backNight.classList.contains('backWhite')) {
        document.querySelector('#timerDesc span').style.color = "white"
    } else {
        document.querySelector('#timerDesc span').style.color = "black"

    }
});

const btnBreak2 = document.querySelector('#btBreak2')
btnBreak2.addEventListener('click', () => {
    clearInterval(interval)
    interval = null;
    document.querySelector('#timerDesc span').style.color = "red";
})

const btnReset = document.querySelector('#btReset');
btnReset.addEventListener('click', () => {
    document.querySelector('#timerDesc span').innerHTML = '25:00';
    document.querySelector('#timerDesc span').style.color = "black"
    clearInterval(interval);
    interval = null;
    seconds1 = 25 * 60;

    if (backNight.classList.contains('backWhite')) {
        document.querySelector('#timerDesc span').style.color = "white"
    } else {
        document.querySelector('#timerDesc span').style.color = "black"

    }
})




