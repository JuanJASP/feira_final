document.getElementById('cadproduto').addEventListener('submit', function(event) {
    event.preventDefault();

    const produto = {
        id: document.getElementById('idProduto').value.trim(),
        nome: document.getElementById('nomeProduto').value.trim(),
        tipo: document.getElementById('tipoProduto').value.trim(),
        preco: document.getElementById('precoUnitario').value.trim(),
        cuidados: document.getElementById('cuidadosProduto').value.trim(),
        quantidade: document.getElementById('quantidadeProduto').value.trim()
    };
    if (!/^\d+$/.test(produto.id)) {
        alert("O ID deve conter apenas números.");
        return;
    }
    if (produto.nome === "") {
        alert("Preencha o nome do produto.");
        return;
    }
    if (produto.tipo === "") {
        alert("Preencha o tipo do produto.");
        return;
    }
    if (!/^\d+(\.\d{1,2})?$/.test(produto.preco)) {
        alert("Preço unitário inválido! Insira um valor numérico válido ex: 20");
        return;
    }
    if (produto.cuidados === "") {
        alert("Insira os cuidados com o produto.");
        return;
    }
    if (!/^\d+$/.test(produto.quantidade)) {
        alert("A quantidade deve conter apenas números.");
        return;
    }
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const index = produtos.findIndex(p => p.id == produto.id);

    if (index !== -1) {
        if (document.querySelector('.cadastrarbtn').value === "Cadastrar") {
            alert("ID já cadastrado. Por favor, use um ID diferente.");
            return;
        } else {
            produtos[index] = produto;
        }
    } else {
        produtos.push(produto);
    }

    localStorage.setItem('produtos', JSON.stringify(produtos));
    this.reset();
    document.getElementById('idProduto').removeAttribute('readonly');
    document.querySelector('.cadastrarbtn').value = "Cadastrar";

    atualizarTabela();
});

function atualizarTabela() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    (JSON.parse(localStorage.getItem('produtos')) || []).forEach(({ id, nome, tipo, preco, cuidados, quantidade }) => {
        tbody.innerHTML += `
            <tr>
                <td>${id}</td>
                <td>${nome}</td>
                <td>${tipo}</td>
                <td>${preco}</td>
                <td>${cuidados}</td>
                <td>${quantidade}</td>
                <td><button class="cadastrarbtn" onclick="editarProduto('${id}')">Editar</button></td>
                <td><button class="limparbtn" onclick="excluirProduto('${id}')">Excluir</button></td>
            </tr>
        `;
    });
}

function editarProduto(id) {
    const produtos = JSON.parse(localStorage.getItem('produtos'));
    const produto = produtos.find(p => p.id == id);

    if (produto) {
        document.getElementById('idProduto').value = produto.id;
        document.getElementById('nomeProduto').value = produto.nome;
        document.getElementById('tipoProduto').value = produto.tipo;
        document.getElementById('precoUnitario').value = produto.preco;
        document.getElementById('cuidadosProduto').value = produto.cuidados;
        document.getElementById('quantidadeProduto').value = produto.quantidade;

        document.getElementById('idProduto').setAttribute('readonly', true);
        document.querySelector('.cadastrarbtn').value = "Atualizar";
    }
}

function excluirProduto(id) {
    const produtos = JSON.parse(localStorage.getItem('produtos'));
    const produtosFiltrados = produtos.filter(produto => produto.id != id);
    localStorage.setItem('produtos', JSON.stringify(produtosFiltrados)); 
    atualizarTabela(); 
}

window.onload = atualizarTabela;
