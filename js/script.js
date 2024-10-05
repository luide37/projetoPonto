// Função para registrar um novo usuário
document.getElementById('registerBtn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        // Verificar se o usuário já existe
        if (!localStorage.getItem(username)) {
            localStorage.setItem(username, password);
            alert('Usuário registrado com sucesso!');
        } else {
            alert('Usuário já existe. Faça login.');
        }
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

// Função para verificar login
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();  // Evita o recarregamento da página

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verificar se o usuário existe e se a senha está correta
    const storedPassword = localStorage.getItem(username);

    if (storedPassword && storedPassword === password) {
        alert('Login bem-sucedido!');
        // Aqui você pode redirecionar o usuário para outra página ou realizar outras ações
        window.location.href = 'dashboard.html';
    } else {
        alert('Usuário ou senha incorretos.');
    }
});
