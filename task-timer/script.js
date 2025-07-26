function listadeTarefas(tarefaTexto) {
    const tarefas = document.querySelector('#tarefas');
    const listadeTarefas = document.querySelector('#listadeTarefas');

    let texto = '';
    let prioridadeSalva = '';

    if (typeof tarefaTexto === 'object' && tarefaTexto !== null) {
        texto = tarefaTexto.descricao?.trim() || '';
        prioridadeSalva = tarefaTexto.prioridade || '';
    } else if (typeof tarefaTexto === 'string') {
        texto = tarefaTexto.trim();
    } else {
        const input = document.querySelector('#tarefas');
        texto = input.value.trim();
    }

    if (!texto) return;


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
        btn.innerHTML = 'Concluído';
        btn.classList.add('btnFeito');
        btn.addEventListener('click', () => {
            novoSpan.classList.toggle('feito');
            novoSpan.classList.contains('feito') ? novoSpan.style.color = 'grey' : novoSpan.style.color = 'inherit';       
        })
        return btn;
    }

    function criaSelectP() {
        const select = document.createElement('select');
        select.innerHTML = 'Prioridade';
        select.classList.add('btnPrioridade');

        const defaultOption = document.createElement('option');
        defaultOption.textContent = 'Prioridade';
        defaultOption.value = '';
        defaultOption.disabled = true;
        if (!prioridadeSalva) defaultOption.selected = true;
        select.appendChild(defaultOption);

        const opcoes = [
            { texto: 'Alta', valor: 'Alta' },
            { texto: 'Média', valor: 'Media' },
            { texto: 'Baixa', valor: 'Baixa' }
        ];

        opcoes.forEach(e => {
            const option = document.createElement('option');
            option.value = e.valor;
            option.textContent = e.texto;
            if (e.valor === prioridadeSalva) option.selected = true;
            select.appendChild(option);
        });

        select.addEventListener('change', (e) => {
            const li = e.target.closest('li');
            li.classList.remove('prioridade-alta', 'prioridade-media', 'prioridade-baixa');

            switch (e.target.value) {
                case 'Alta':
                    li.classList.add('prioridade-alta');
                    break
                case 'Media':
                    li.classList.add('prioridade-media');
                    break
                case 'Baixa':
                    li.classList.add('prioridade-baixa');
            }

            salvarTarefas();

        });
        return select;
    }



    const novoBtn = criaButton(texto);
    const novoSpan = criaSpan(texto)
    const select = criaSelectP(prioridadeSalva);
    const btnFeito = criaButtonFeito(texto)

    listadeTarefas.appendChild(li);
    li.appendChild(novoSpan);
    li.appendChild(novoBtn);
    li.appendChild(btnFeito)
    li.appendChild(select);


    tarefas.value = "";
    tarefas.focus();

    if (prioridadeSalva) {
        li.classList.add(`prioridade-${prioridadeSalva.toLowerCase()}`);
    }

    salvarTarefas();

}

function botoesSpan() {
    const spans = document.querySelectorAll('.spanTarefa');
    const backNight = document.querySelector('#backNight');

    spans.forEach(span => {
        span.style.color = backNight.classList.contains('backWhite') ? 'white' : 'black';
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
    listadeTarefas();
    clearVisibility();
});



function salvarTarefas() {
    const listadeTarefas = document.querySelector('#listadeTarefas')
    const liTarefas = listadeTarefas.querySelectorAll('li')
    const arrayTarefas = [];
    
    for (let tarefa of liTarefas) {
        const tarefaTexto = tarefa.querySelector('.spanTarefa')?.innerHTML || '';
        const prioridadeSelect = tarefa.querySelector('.btnPrioridade');
        const prioridade = prioridadeSelect?.value || '';
        
        arrayTarefas.push({
            descricao: tarefaTexto,
            prioridade: prioridade,
        });
    }
    
    const tarefasJSON = JSON.stringify(arrayTarefas);
    localStorage.setItem('tarefas', tarefasJSON)
}

// function backTema() {
//     const backNight = document.querySelector('#backNight');
//     const temaAtual = backNight.classList.contains('backWhite') ? 'backWhite' : 'default';
//     localStorage.setItem('tema', temaAtual);
// }

function recarregarTarefas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas)

    // const temaSalvo = localStorage.getItem('tema');
    // const backNight = document.querySelector('#backNight');

    if (!listaDeTarefas) return;

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