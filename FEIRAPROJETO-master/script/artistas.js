document.getElementById('cadartista').addEventListener('submit', function(event) {
    event.preventDefault();

    const artista = {
        id: document.getElementById('idArtista').value.trim(),
        nome: document.getElementById('nomeArtista').value.trim(),
        cpfCnpj: document.getElementById('cpfCnpjArtista').value.trim(),
        telefone: document.getElementById('telArtista').value.trim(),
        email: document.getElementById('emailArtista').value.trim(),
        contrato: document.getElementById('contratoArtista').value.trim()
    };
    if (!/^\d+$/.test(artista.id)) {
        alert("O ID deve conter apenas números.");
        return;
    }
    if (artista.nome === "") {
        alert("Preencha o nome do artista.");
        return;
    }
    if (!/^\d{11}$/.test(artista.cpfCnpj)) {
        alert("CPF inválido! Deve ter 11 dígitos.");
        return;
    }
    if (!/^\d{11}$/.test(artista.telefone)) {
        alert("Telefone inválido! Digite o número com o DDD (11 números)");
        return;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(artista.email)) {
        alert("E-mail inválido");
        return;
    }
    if (!/^\d+$/.test(artista.contrato)) {
        alert("Apenas números são permitidos em contrato.");
        return;
    }

    const artistas = JSON.parse(localStorage.getItem('artistas')) || [];
    const index = artistas.findIndex(a => a.id == artista.id);

    if (index !== -1) {
        if (document.querySelector('.cadastrarbtn').value === "Cadastrar") {
            alert("ID já cadastrado. Por favor, use um ID diferente.");
            return;
        } else {
            artistas[index] = artista;
        }
    } else {
        artistas.push(artista);
    }

    localStorage.setItem('artistas', JSON.stringify(artistas));
    this.reset();
    document.getElementById('idArtista').removeAttribute('readonly');
    document.querySelector('.cadastrarbtn').value = "Cadastrar";

    atualizarTabela();
});

function atualizarTabela() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    (JSON.parse(localStorage.getItem('artistas')) || []).forEach(({ id, nome, cpfCnpj, telefone, email, contrato }) => {
        tbody.innerHTML += `
            <tr>
                <td>${id}</td>
                <td>${nome}</td>
                <td>${cpfCnpj}</td>
                <td>${telefone}</td>
                <td>${email}</td>
                <td>${contrato}</td>
                <td><button class="cadastrarbtn" onclick="editarArtista('${id}')">Editar</button></td>
                <td><button class="limparbtn" onclick="excluirArtista('${id}')">Excluir</button></td>
            </tr>
        `;
    });
}

function editarArtista(id) {
    const artistas = JSON.parse(localStorage.getItem('artistas'));
    const artista = artistas.find(a => a.id == id);

    if (artista) {
        document.getElementById('idArtista').value = artista.id;
        document.getElementById('nomeArtista').value = artista.nome;
        document.getElementById('cpfCnpjArtista').value = artista.cpfCnpj;
        document.getElementById('telArtista').value = artista.telefone;
        document.getElementById('emailArtista').value = artista.email;
        document.getElementById('contratoArtista').value = artista.contrato;

        document.getElementById('idArtista').setAttribute('readonly', true);
        document.querySelector('.cadastrarbtn').value = "Atualizar";
    }
}

function excluirArtista(id) {
    const artistas = JSON.parse(localStorage.getItem('artistas'));
    const artistasFiltrados = artistas.filter(artista => artista.id != id);
    localStorage.setItem('artistas', JSON.stringify(artistasFiltrados)); 
    atualizarTabela(); 
}

window.onload = atualizarTabela;
