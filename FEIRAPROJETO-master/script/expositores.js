document.getElementById('cadexpositor').addEventListener('submit', function(event) {
    event.preventDefault();

    const expositor = {
        id: document.getElementById('idExpositor').value.trim(),
        nome: document.getElementById('nomeExpositor').value.trim(),
        idade: document.getElementById('idadeExpositor').value.trim(),
        telefone: document.getElementById('telExpositor').value.trim(),
        email: document.getElementById('emailExpositor').value.trim(),
        descricao: document.getElementById('sobreExpositor').value.trim()
    };
    if (!/^\d+$/.test(expositor.id)) {
        alert("O ID deve conter apenas números.");
        return;
    }

    if (expositor.nome === "") {
        alert("Preencha o nome do expositor!");
        return;
    }

    if (!/^\d+$/.test(expositor.idade)) {
        alert("A idade deve conter apenas números.");
        return;
    }
    if (!/^\d{11}$/.test(expositor.telefone)) {
        alert("Telefone inválido! digite o número com o DDD - (99)999999999");
        return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(expositor.email)) {
        alert("Por favor, insira um e-mail válido.");
        return;
    }

    if (expositor.descricao === "") {
        alert("Por favor, preencha a descrição do expositor.");
        return;
    }

    const expositores = JSON.parse(localStorage.getItem('expositores')) || [];
    const index = expositores.findIndex(e => e.id == expositor.id);

    if (index !== -1) {
        if (document.querySelector('.cadastrarbtn').value === "Cadastrar") {
            alert("ID já cadastrado. Por favor, use um ID diferente.");
            return;
        } else {
            expositores[index] = expositor;
        }
    } else {
        expositores.push(expositor);
    }

    localStorage.setItem('expositores', JSON.stringify(expositores));
    this.reset();
    document.getElementById('idExpositor').removeAttribute('readonly');
    document.querySelector('.cadastrarbtn').value = "Cadastrar";

    atualizarTabela();
});

function atualizarTabela() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    (JSON.parse(localStorage.getItem('expositores')) || []).forEach(({ id, nome, idade, telefone, email, descricao }) => {
        tbody.innerHTML += `
            <tr>
                <td>${id}</td>
                <td>${nome}</td>
                <td>${idade}</td>
                <td>${telefone}</td>
                <td>${email}</td>
                <td>${descricao}</td>
                <td><button class="cadastrarbtn" onclick="editarExpositor('${id}')">Editar</button></td>
                <td><button class="limparbtn" onclick="excluirExpositor('${id}')">Excluir</button></td>
            </tr>
        `;
    });
}

function editarExpositor(id) {
    const expositores = JSON.parse(localStorage.getItem('expositores'));
    const expositor = expositores.find(e => e.id == id);

    if (expositor) {
        document.getElementById('idExpositor').value = expositor.id;
        document.getElementById('nomeExpositor').value = expositor.nome;
        document.getElementById('idadeExpositor').value = expositor.idade;
        document.getElementById('telExpositor').value = expositor.telefone;
        document.getElementById('emailExpositor').value = expositor.email;
        document.getElementById('sobreExpositor').value = expositor.descricao;

        document.getElementById('idExpositor').setAttribute('readonly', true);
        document.querySelector('.cadastrarbtn').value = "Atualizar";
    }
}

function excluirExpositor(id) {
    const expositores = JSON.parse(localStorage.getItem('expositores'));
    const expositoresFiltrados = expositores.filter(expositor => expositor.id != id);
    localStorage.setItem('expositores', JSON.stringify(expositoresFiltrados)); 
    atualizarTabela(); 
}

window.onload = atualizarTabela;
