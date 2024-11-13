// implementação dos cookies.
function definirCookie(nome, valor, dias) {
    let data = new Date();
    data.setTime(data.getTime() + (dias * 24 * 60 * 60 * 1000));
    let expiracao = "expires=" + data.toUTCString();
    document.cookie = nome + "=" + valor + ";" + expiracao + ";path=/";
}
function obterCookie(nome) {
    let nomeIgual = nome + "=";
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.indexOf(nomeIgual) == 0) {
            return c.substring(nomeIgual.length, c.length);
        }
    }
    return "";
}

window.onload = function() {
    // vai preencher automaticamente os campos login e senha
    const emailCookie = obterCookie('email');
    const senhaCookie = obterCookie('senha');
    
    if (emailCookie && senhaCookie) {
        document.getElementById('email').value = emailCookie;
        document.getElementById('pass').value = senhaCookie;
    }

    console.log('Email recuperado do cookie:', emailCookie);
    console.log('Senha recuperada do cookie:', senhaCookie);
};

// Função de validação de login
function ValidarLogin(event) {
    event.preventDefault();

    let senha_input = document.getElementById('pass').value; 
    let email_input = document.getElementById('email').value; 
    let validar = true; 
    let SenhaRegex = /^(?=.*[A-Z])(?=.*\W).{8,}$/;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validação de email
    if (!emailRegex.test(email_input)) {
        document.getElementById('email-incorreto').textContent = 'Por favor, preencha o campo com um Email Válido';
        validar = false;
    } else {
        document.getElementById('email-incorreto').textContent = '';
    }

    // Validação de senha
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
            
            // vai armazenar o email e senha nos cookies para o preenchimento automático
            definirCookie("email", email_input, 7);
            definirCookie("senha", senha_input, 7);

            window.location.href = '../html/index.html';
        } else {
            alert('Email ou senha incorretos.');
        }
    }
}
// opção para remover cookies de login ao sair
function sair() {
    definirCookie("email", "", -1); 
    definirCookie("senha", "", -1); 
    alert("Você saiu com sucesso.");
    window.location.href = '../html/login.html';
}
