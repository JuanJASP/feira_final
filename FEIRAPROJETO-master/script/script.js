function login(){
    var usuario = document.getElementById('usuario').value;
    var senha = document.getElementById('senha').value;

    if(usuario == 'admin' && senha == 'admin'){
        location.href = "./admin/admin.html";
        localStorage.setItem('usuario', usuario);
    }else{
        alert('Usuário ou senha incorretos!');
    }
}

function sessao() {
   const sessao = localStorage.getItem('usuario');
    if (usuario) {
        window.location.href = "./admin/admin.html";
    }
}
//sessao();

function abrirModal(){
    const modal = document.getElementById('fundomodal');
    modal.classList.add('abrir')
}

function sair() {
    localStorage.removeItem('usuario');
    window.location.href = "../index.html";
}


