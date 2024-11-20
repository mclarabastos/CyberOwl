function redefinirSenha(event) {
    event.preventDefault();

    const email_input = document.getElementById('email').value;
    const novaSenha = document.getElementById('SenhaNova').value;
    const confirmarSenha = document.getElementById('confirmSenha').value;
    let validaSenha = true;

    if (novaSenha !== confirmarSenha) {
        document.getElementById('mensagem').textContent = 'As senhas não coincidem. Por favor, digite novamente.';
        validaSenha = false;
    } else {
        document.getElementById('mensagem').textContent = '';
    }

    let SenhaRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if (!SenhaRegex.test(novaSenha)) {
        document.getElementById('mensagem').textContent = 'A senha deve ter no mínimo 8 caracteres, uma letra maiúscula e um símbolo.';
        validaSenha = false;
    }

    if (validaSenha) {
        const Usuarios = JSON.parse(localStorage.getItem('Usuarios')) || [];
        const usuario = Usuarios.find(usuario => usuario.email === email_input);

        if (usuario) {
            usuario.senha = novaSenha;
            localStorage.setItem('Usuarios', JSON.stringify(Usuarios));
            
            document.getElementById('mensagem').textContent = 'Senha alterada com sucesso!';
            alert('Senha alterada com sucesso!');
            window.location.href = 'login.html'; 
        } else {
            document.getElementById('mensagem').textContent = 'Email não encontrado.';
        }
    }
}

document.getElementById('formRedefinirSenha').addEventListener('submit', redefinirSenha);
