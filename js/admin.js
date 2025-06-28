// Utiliza Local Storage para armazenar usuários
const STORAGE_KEY = 'ecornelio_usuarios';

function getUsuarios() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function setUsuarios(usuarios) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
}

function renderUsuarios(filtro = '') {
    const lista = document.getElementById('userList');
    lista.innerHTML = '';
    let usuarios = getUsuarios();
    if (filtro) {
        usuarios = usuarios.filter(u =>
            u.nome.toLowerCase().includes(filtro.toLowerCase()) ||
            u.email.toLowerCase().includes(filtro.toLowerCase())
        );
    }
    usuarios.forEach((u, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="info">${u.data} - <strong>${u.nome}</strong> (${u.email})</span>
            <button onclick="excluirUsuario(${u.id})"><i class="fas fa-trash"></i></button>
        `;
        lista.appendChild(li);
    });
}

function cadastrarUsuario(nome, email) {
    const usuarios = getUsuarios();
    const data = new Date().toLocaleString('pt-BR');
    const id = Date.now();
    usuarios.push({ id, nome, email, data });
    setUsuarios(usuarios);
    renderUsuarios(document.getElementById('pesquisa').value);
}

function excluirUsuario(id) {
    let usuarios = getUsuarios();
    usuarios = usuarios.filter(u => u.id !== id);
    setUsuarios(usuarios);
    renderUsuarios(document.getElementById('pesquisa').value);
}

function excluirTodosUsuarios() {
    if (confirm('Tem certeza que deseja excluir todos os usuários?')) {
        setUsuarios([]);
        renderUsuarios();
    }
}

// Eventos
document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    if (nome && email) {
        cadastrarUsuario(nome, email);
        this.reset();
    }
});

document.getElementById('limparBtn').addEventListener('click', function() {
    document.getElementById('userForm').reset();
});

document.getElementById('excluirTodosBtn').addEventListener('click', excluirTodosUsuarios);

document.getElementById('pesquisa').addEventListener('input', function() {
    renderUsuarios(this.value);
});

// Expor função global para onclick
window.excluirUsuario = excluirUsuario;

// Inicializar lista ao carregar
renderUsuarios();
