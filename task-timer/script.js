function listadeTarefas(tarefaTexto = null) {
    const tarefas = document.querySelector('#tarefas');
    const listadeTarefas = document.querySelector('#listadeTarefas');
    const texto = tarefaTexto || tarefas.value.trim();

    if (texto === "") return;


    const li = document.createElement('li');

    function criaSpan() {
        const span = document.createElement('span')
        const backNight = document.querySelector('#backNight');
        span.innerText = texto;
        span.classList.add('spanTarefa')
        if (backNight.classList.contains('backWhite')) {
            span.style.color = 'white';
        } else {
            span.style.color = 'black';
        }
        return span;
    }

    function criaButton() {
        const btn = document.createElement('button');
        btn.innerHTML = 'Apagar';
        btn.classList.add('btnTarefa')
        btn.addEventListener('click', () => {
            li.remove();
            salvarTarefas();
            clearVisibility();
        })
        return btn;
    }

    function criaButtonFeito() {
        const btn = document.createElement('button')
        btn.innerHTML = 'Feito';
        btn.classList.add('btnFeito');
        btn.addEventListener('click', () => {
            novoSpan.classList.toggle('feito');
        })
        return btn;
    }

    const novoBtn = criaButton(texto);
    const novoSpan = criaSpan(texto)
    const btnFeito = criaButtonFeito(texto)

    listadeTarefas.appendChild(li);
    li.appendChild(novoSpan);
    li.appendChild(novoBtn);
    li.appendChild(btnFeito)


    tarefas.value = "";
    tarefas.focus();

    salvarTarefas();

}

function botoesSpan() {
    const spans = document.querySelectorAll('.spanTarefa');
    const backNight = document.querySelector('#backNight');

    spans.forEach(span => {
        span.style.color = backNight.classList.contains('backWhite') ? 'white' : 'black'
    });
}

function limparLista() {
    const listadeTarefas = document.querySelector('#listadeTarefas')
    const tarefas = document.querySelector('#tarefas')
    const btClear = document.querySelector('#btClear')
    btClear.addEventListener('click', () => {
        listadeTarefas.innerHTML = "";
        tarefas.focus();
        salvarTarefas();
        clearVisibility();
    })
}

limparLista();

function clearVisibility() {
    const listadeTarefas = document.querySelector('#listadeTarefas')
    const btClear = document.querySelector('#btClear');
    const ltTitle = document.querySelector('#ltTitle');
    const clockP = document.querySelector('.clock');

    if (listadeTarefas.children.length > 0) {
        btClear.style.display = 'inline-block';
        ltTitle.style.display = 'inline-block';
        clockP.style.display = 'inline-block';
    } else {
        btClear.style.display = 'none';
        ltTitle.style.display = 'none';
        clockP.style.display = 'none';
    }

}

clearVisibility();

const tarefas = document.querySelector('#tarefas')
tarefas.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        listadeTarefas();
        clearVisibility();
    }
})

const addTarefa = document.querySelector('#addTarefa');
addTarefa.addEventListener('click', () => {
    if (listadeTarefas() === null) return;
});

function salvarTarefas() {
    const listadeTarefas = document.querySelector('#listadeTarefas')
    const liTarefas = listadeTarefas.querySelectorAll('li')
    const arrayTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('APAGAR', '').trim();
        tarefaTexto = tarefaTexto.replace('FEITO', '').trim();
        arrayTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(arrayTarefas);
    localStorage.setItem('tarefas', tarefasJSON)
}

function recarregarTarefas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas)

    for (let tarefa of listaDeTarefas) {
        listadeTarefas(tarefa);
    }

    clearVisibility();
}

recarregarTarefas();

function clockHour() {
    const clock = document.querySelector('#clockTime')
    const dataClock = new Date();
    let hour = dataClock.getHours();
    let minutes = dataClock.getMinutes();
    let seconds = dataClock.getSeconds();

    clock.innerHTML = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

    if (hour >= 5 && hour < 15) {
        document.body.classList.add('backDay');
    } else if (hour >= 15 && hour < 18) {
        document.body.classList.add('backAfternoon');
        document.body.classList.remove('backDay');
    } else {
        document.body.classList.remove('backAfternoon');
        document.body.classList.remove('backDay');
    }
};

setInterval(clockHour, 1000)

clockHour();