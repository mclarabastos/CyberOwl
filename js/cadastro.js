function ValidarCadastro(event) {
    event.preventDefault();

    let senha_input = document.getElementById('senha').value;
    let email_input = document.getElementById('email').value;
    let nome_input = document.getElementById("name").value

    let validar = true;

    let SenhaRegex = /^(?=.*[A-Z])(?=.*\W).{8,}$/;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validação para o campo de  Email (minímo de 2 digitos antes do @ e preencher com .com ou .org no final)
    if (!emailRegex.test(email_input)) {
        document.getElementById('email-incorreta').textContent = 'Por favor, preencha o campo com um Email Válido';
        validar = false;
    } else {
        document.getElementById('email-incorreta').textContent = '';
    }

    // Validação para o campo de Senha (minímo de 8 caracteres, uma letra e um símbolo)
    if (!SenhaRegex.test(senha_input)) {
        document.getElementById('senha-incorreta').textContent = 'A senha deve ter no mínimo 8 caracteres, uma letra maiúscula e um símbolo.';
        validar = false;
    } else {
        document.getElementById('senha-incorreta').textContent = '';
    }

    if (validar) {
        let usuarios = JSON.parse(localStorage.getItem('Usuarios')) || [];

        let emailExistente = usuarios.find(usuario => usuario.email === email_input);

        if (emailExistente) {
            alert('Email já cadastrado. Tente outro.');
        } else {
            let novoUsuario = {
                nome: nome_input,
                email: email_input,
                senha: senha_input
                
            };
            usuarios.push(novoUsuario);
            localStorage.setItem('Usuarios', JSON.stringify(usuarios));
            alert('Cadastro Realizado com Sucesso!');
            window.location.href = '../html/login.html';
        }
    }
}

const input_nome = document.getElementById("name");

input_nome.addEventListener("keypress",function(e) {

    if (!bloquearCarac(e)) {
        e.preventDefault();
    }
    
})

function bloquearCarac(e) {
    const Caracter = String.fromCharCode(e.keyCode)

    const Padrao = '[a-zA-Z\\s]'

    if (Caracter.match(Padrao)) {
        return true;
    }
}

const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('senha');

togglePassword.addEventListener('click', () => {
  const currentType = passwordInput.type;
  passwordInput.type = currentType === 'password' ? 'text' : 'password';

  togglePassword.classList.toggle('fa-eye');
  togglePassword.classList.toggle('fa-eye-slash');
});
