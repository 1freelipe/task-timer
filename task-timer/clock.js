let seconds = 0;
let seconds1 = 5;
let seconds2 = 5;
let seconds3 = 5;
let seconds4 = 5;
let interval = null;
let isPaused = false;
let interval2 = null;
let currentState = null;
const data = new Date();
const sound = new Audio('assets/relaxsound.wav')
const sound2 = new Audio('assets/nextrelaxsound.wav')

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
    const btnLongBreak = document.querySelector('[data-tab="timerDecrescenteLong"]')

    const divTimer = document.querySelector('#timer')
    const divTimerDesc = document.querySelector('#timerDesc')
    const divTimerLong = document.querySelector('#timerLong')

    btnTimer.addEventListener('click', () => {
        btnTimer.classList.add('tabAtiva');
        btnDecrescente.classList.remove('tabAtiva');
        btnLongBreak.classList.remove('tabAtiva');

        divTimer.classList.add('ativa');
        divTimerDesc.classList.remove('ativa');
        divTimerLong.classList.remove('ativa');
    })

    btnDecrescente.addEventListener('click', () => {
        btnDecrescente.classList.add('tabAtiva');
        btnTimer.classList.remove('tabAtiva');
        btnLongBreak.classList.remove('tabAtiva');

        divTimerDesc.classList.add('ativa');
        divTimer.classList.remove('ativa');
        divTimerLong.classList.remove('ativa')
    })

    btnLongBreak.addEventListener('click', () => {
        btnLongBreak.classList.add('tabAtiva');
        btnTimer.classList.remove('tabAtiva');
        btnDecrescente.classList.remove('tabAtiva');

        divTimerLong.classList.add('ativa');
        divTimerDesc.classList.remove('ativa');
        divTimer.classList.remove('ativa');
    })
}

tabPages();

const backNight = document.querySelector('#backNight');
const divBack = document.querySelector('.div');
const divBack1 = document.querySelector('.container')
const textWhite = document.querySelector('#timer span');
const focusWhite = document.querySelector('#timerDesc span');
const btnTimerWhite = document.querySelector('[data-tab="timer"]')
const btnDecrescenteWhite = document.querySelector('[data-tab="timerDecrescente"]')
const btnTimerLong = document.querySelector('[data-tab="timerDecrescenteLong"]')
const timerLongWhite = document.querySelector('#timerLong span')
const clockP = document.querySelector('.clock')
const tituloLista = document.querySelector('#ltTitle')
const dateDay = document.querySelector('#dateDay')
const inputColor = document.querySelector('[data-tab="tarefa"]')

backNight.addEventListener('click', () => {
    divBack.classList.toggle('backNight')
    divBack1.classList.toggle('backNight')
    backNight.classList.toggle('backWhite')

    if (backNight.classList.contains('backWhite')) {
        backNight.innerHTML = 'White Color'
        textWhite.style.color = "white"
        focusWhite.style.color = "white"
        btnTimerWhite.style.color = "white"
        btnDecrescenteWhite.style.color = "white"
        btnTimerLong.style.color = "white"
        timerLongWhite.style.color = "white"
        clockP.style.color = 'white'
        tituloLista.style.color = 'white'
        dateDay.style.color = 'white'
        inputColor.style.color = 'white'

    } else {
        backNight.innerHTML = 'Night Color'
        textWhite.style.color = "black"
        focusWhite.style.color = "black"
        btnTimerWhite.style.color = "black"
        btnDecrescenteWhite.style.color = "black"
        btnTimerLong.style.color = "black"
        timerLongWhite.style.color = "black"
        clockP.style.color = 'black'
        tituloLista.style.color = 'black'
        dateDay.style.color = 'black'
        inputColor.style.color = 'black'

    }

    botoesSpan();
})

function getDay() {
    const dateDay = document.querySelector('#dateDay')
    const dataDay = new Date;

    const days = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']

    let day = days[dataDay.getDay()];

    dateDay.innerHTML = day;
}

getDay();

function timerDecrescente() {
    const timerDesc = document.querySelector('#timerDesc span');
    const alarm = new Audio('assets/game-over-38511.mp3');
    const alarm2 = new Audio('assets/game-bonus-2-294436.mp3');
    const btBegin2 = document.querySelector('#btBegin2');
    const btReset = document.querySelector('#btReset');

    if (interval !== null) return;

    interval = setInterval(() => {
        seconds1--;
        updateDisplay(seconds1);

        if (seconds1 <= 0) {
            notif('Tempo concluído!!', 'Hora de fazer uma pausa!');
            clearInterval(interval)
            interval = null;
            alarm.play();
            currentState = 'break';
            console.log('CurrentState', currentState)

            interval2 = setInterval(() => {
                seconds2--;
                updateDisplay(seconds2);
                timerDesc.style.color = "green";


                if (seconds2 <= 0) {
                    notif('Volte ao foco!!', 'Hora de continuar suas tarefas');
                    clearInterval(interval2);
                    interval2 = null;
                    alarm2.play();
                    timerDesc.innerHTML = '25:00';
                    seconds1 = 25 * 60;
                    btBegin2.style.display = 'inline-block';
                    btReset.style.display = 'inline-block'

                    if (backNight.classList.contains('backWhite')) {
                        timerDesc.style.color = "white";
                    } else {
                        timerDesc.style.color = "black";
                    }
                };

            }, 1000)

            btBegin2.style.display = 'none';
            btReset.style.display = 'none';
        }

    }, 1000)

    function updateDisplay(seconds) {
        const dataTime = new Date(seconds * 1000);
        dataTime.setHours(0);
        timerDesc.innerHTML = `${dataTime.getMinutes().toString().padStart(2, '0')}:${dataTime.getSeconds().toString().padStart(2, '0')}`
    };

}

function pauseBreak() {
    const btnBreak2 = document.querySelector('#btBreak2');
    const btBegin2 = document.querySelector('#btBegin2');
    const btReset = document.querySelector('#btReset');
    const timerDesc = document.querySelector('#timerDesc span');
    const backNight = document.querySelector('#backNight');

    btnBreak2.addEventListener('click', () => {

        if (seconds2 <= 0) {
            btBegin2.style.display = 'inline-block';
            return
        };

        if (currentState === 'break') {
            if (!isPaused) {
                clearInterval(interval2)
                document.querySelector('#timerDesc span').style.color = "red";
                sound.pause();
                btnBreak2.textContent = 'Retomar';
                isPaused = true;
            } else {
                interval2 = setInterval(() => {
                    if (seconds2 > 0) {
                        seconds2--;
                        updateDisplay(seconds2);
                        if (seconds2 <= 0) {
                            btBegin2.style.display = 'inline-block';
                            btReset.style.display = 'inline-block';
                            timerDesc.textContent = '25:00';
                            backNight.classList.contains('backWhite') ? timerDesc.style.color = 'white' : timerDesc.style.color = 'black';
                            seconds1 = 25 * 60;
                        }
                    } else {
                        clearInterval(interval2);
                        interval2 = null;
                    }
                }, 1000)

                btnBreak2.textContent = 'Pausar'
                timerDesc.style.color = 'green';
                isPaused = false;
                sound.play();
            };
        }
    });

    function updateDisplay(seconds) {
        const dataTime = new Date(seconds * 1000);
        dataTime.setHours(0);
        timerDesc.innerHTML = `${dataTime.getMinutes().toString().padStart(2, '0')}:${dataTime.getSeconds().toString().padStart(2, '0')}`
    };
};

pauseBreak();

function longBreak() {
    const timerLong = document.querySelector('#timerLong span')
    const alarm = new Audio('assets/game-over-38511.mp3')
    const alarm2 = new Audio('assets/game-bonus-2-294436.mp3')
    const btBegin3 = document.querySelector('#btBegin3');
    const btReset1 = document.querySelector('#btReset1');
    const backNight = document.querySelector('#backNight');

    if (interval !== null) return;

    interval = setInterval(() => {
        seconds3--;
        updateDisplay(seconds3)

        // Ínicio do Long Timer
        if (seconds3 <= 0) {
            currentState = 'break';
            clearInterval(interval);
            interval = null;
            alarm.play();
            notif('Tempo concluído!!', 'Hora de fazer uma pausa!')
            timerLong.style.color = "green";
            interval2 = setInterval(longBreakTick, 1000);

            btBegin3.style.display = 'none';
            btReset1.style.display = 'none';
        }


    }, 1000)

    function longBreakTick() {
        if (seconds4 > 0) {
            seconds4--;
            updateDisplay(seconds4);
        } else {
            clearInterval(interval2);
            interval2 = null;
            notif('Volte ao foco!', 'Hora de continuar suas tarefas!');
            timerLong.innerHTML = '40:00';
            seconds3 = 40 * 60;
            alarm2.play();
            btBegin3.style.display = 'inline-block';
            btReset1.style.display = 'inline-block';

            if (backNight.classList.contains('backWhite')) {
                timerLong.style.color = 'white';
            } else {
                timerLong.style.color = 'black';
            }
        }
    }

    const btnBreak3 = document.querySelector('#btBreak3')
    btnBreak3.addEventListener('click', () => {

        if (currentState === 'break') {
            if (!isPaused) {
                isPaused = true;
                clearInterval(interval2);
                timerLong.style.color = 'red';
                btnBreak3.textContent = 'Retomar';
                sound.pause();
                if (seconds4 <= 0) {
                    btBegin3.style.display = 'inline-block';
                    btReset1.style.display = 'inline-block';
                    timerDesc.textContent = '25:00';
                    backNight.classList.contains('backWhite') ? timerDesc.style.color = 'white' : timerDesc.style.color = 'black';
                    seconds3 = 40 * 60;
                }
            } else {
                isPaused = false;
                interval2 = setInterval(longBreakTick, 1000);
                btnBreak3.textContent = 'Pausar';
                timerLong.style.color = 'green';
                sound.play();
            }
        };
    });

    function updateDisplay(seconds) {
        const dataTime = new Date(seconds * 1000);
        dataTime.setHours(0);
        timerLong.innerHTML = `${dataTime.getMinutes().toString().padStart(2, '0')}:${dataTime.getSeconds().toString().padStart(2, '0')}`
    }
};

// Focus Timer
const btnBegin2 = document.querySelector('#btBegin2');
btnBegin2.addEventListener('click', () => {
    timerDecrescente();
    sound.play();
    currentState = 'focus';

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
    sound.pause();
});

const btnReset = document.querySelector('#btReset');
btnReset.addEventListener('click', () => {
    document.querySelector('#timerDesc span').innerHTML = '25:00';
    document.querySelector('#timerDesc span').style.color = "black"
    clearInterval(interval);
    interval = null;
    seconds1 = 25 * 60;
    sound.load();

    if (backNight.classList.contains('backWhite')) {
        document.querySelector('#timerDesc span').style.color = "white"
    } else {
        document.querySelector('#timerDesc span').style.color = "black"
    }
})

// Long Timer
const btnBegin3 = document.querySelector('#btBegin3')
btnBegin3.addEventListener('click', () => {
    longBreak();
    sound2.play();
    currentState = 'focus'
    if (backNight.classList.contains('backWhite')) {
        document.querySelector('#timerLong span').style.color = "white"
    } else {
        document.querySelector('#timerLong span').style.color = "black"
    }
})

const btnBreak3 = document.querySelector('#btBreak3')
btnBreak3.addEventListener('click', () => {
    sound2.pause();
    clearInterval(interval);
    interval = null;
    document.querySelector('#timerLong span').style.color = 'red';
})

const btnReset1 = document.querySelector('#btReset1')
btnReset1.addEventListener('click', () => {
    document.querySelector('#timerLong span').innerHTML = '40:00';
    document.querySelector('#timerLong span').style.color = "black";
    clearInterval(interval);
    seconds4 = 40 * 60;
    sound2.load();

    if (backNight.classList.contains('backWhite')) {
        document.querySelector('#timerLong span').style.color = "white"
    } else {
        document.querySelector('#timerLong span').style.color = "black";
    }
})

const btMuted = document.querySelector('#btMuted')
btMuted.addEventListener('click', () => {
    if (sound.volume === 0) {
        sound.volume = 1;
        sound2.volume = 1;
    } else {
        sound.volume = 0;
        sound2.volume = 0;
    }
})

function ativarNotif() {
    if (Notification.permission === 'default' || Notification.permission === 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log("Permissão concedida");
                notif('Notificações', 'Permissão concedida')
            } else {
                console.log("Permissão negada");
                notif('Notificações', 'Permissão negada')
            }
        });
    } else if (Notification.permission === 'granted');
    notif('Notificações', 'Permissão já concedida')

};

function notif(titulo, mensagem) {
    if (Notification.permission === 'granted') {
        new Notification(titulo, {
            body: mensagem
        })
    }
}

const btNotif = document.querySelector('.ativarnotificacao');
btNotif.addEventListener('click', () => {
    ativarNotif();

})




