function listadeTarefas(tarefaTexto = null) {
    const tarefas = document.querySelector('#tarefas');
    const listadeTarefas = document.querySelector('#listadeTarefas');
    const texto = tarefaTexto || tarefas.value.trim();

    if (texto === "") return;


    const li = document.createElement('li');

    function criaSpan() {
        const span = document.createElement('span')
        span.innerText = texto;
        return span;
    }

    function criaButton() {
        const btn = document.createElement('button');
        btn.innerHTML = 'Apagar';
        btn.classList.add('btnTarefa')
        btn.addEventListener('click', () => {
            li.remove();
            salvarTarefas();
        })
        return btn;
    }

    function criaButtonFeito() {
        const btn = document.createElement('button')
        btn.innerHTML = 'Feito';
        btn.classList.add('btnFeito');
        btn.addEventListener('click', () => {
            li.classList.toggle('feito')
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

function limparLista() {
    const listadeTarefas = document.querySelector('#listadeTarefas')
    const tarefas = document.querySelector('#tarefas')
    const btClear = document.querySelector('#btClear')
    btClear.addEventListener('click', () => {
        listadeTarefas.innerHTML = "";
        tarefas.focus();
        salvarTarefas();
    })
}

limparLista();

const tarefas = document.querySelector('#tarefas')
tarefas.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        listadeTarefas();
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
}

recarregarTarefas();

function clockHour() {
    const clock = document.querySelector('#clockTime')
    const dataClock = new Date();
    let hour = dataClock.getHours();
    let minutes = dataClock.getMinutes();
    let seconds = dataClock.getSeconds();

    clock.innerHTML = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

    if(hour >= 5 && hour < 15){
        document.body.classList.add('backDay');
    }else if(hour > 15 && hour < 18){
        document.body.classList.remove('backDay');
        document.body.classList.add('backAfternoon');
    }else {
        document.body.classList.remove('backAfternoon');
    }
};

setInterval(clockHour, 1000)

clockHour();