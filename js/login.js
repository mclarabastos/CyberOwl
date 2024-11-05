
window.onload = function() {
    const email = localStorage.getItem('email');
    const senha = localStorage.getItem('senha');

    console.log('Email armazenado:', email);
    console.log('Senha armazenada:', senha); 
};

function ValidarLogin(event) {
    event.preventDefault();

    let senha_input = document.getElementById('pass').value; 
    let email_input = document.getElementById('email').value; 
    let validar = true; 
    let SenhaRegex = /^(?=.*[A-Z])(?=.*\W).{8,}$/;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validação para o campo de Email (necessário ao menos 2 caracteres antes do @)
    if (!emailRegex.test(email_input)) {
        document.getElementById('email-incorreto').textContent = 'Por favor, preencha o campo com um Email Válido';
        validar = false;
    } else {
        document.getElementById('email-incorreto').textContent = '';
    }

    // Validação para o campo de Senha ( minímo de 8 caracteres, uma letra maiúscula e um símbolo)
    if (!SenhaRegex.test(senha_input)) {
        document.getElementById('senha-incorreta').textContent = 'A senha deve ter no mínimo 8 caracteres, uma letra maiúscula e um símbolo.';
        validar = false;
    } else {
        document.getElementById('senha-incorreta').textContent = '';
    }

    const emailArmazenado = localStorage.getItem('email');
    const senhaArmazenada = localStorage.getItem('senha');

    if (validar) {
        if (email_input === emailArmazenado && senha_input === senhaArmazenada) {
            alert('Login realizado com sucesso!');
            window.location.href = '../html/index.html'
        } else {
            alert('Email ou senha incorretos.');
        }
    }
}
