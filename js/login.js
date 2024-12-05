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
    const emailCookie = obterCookie('email');
    const senhaCookie = obterCookie('senha');
    
    if (emailCookie && senhaCookie) {
        document.getElementById('email').value = emailCookie;
        document.getElementById('pass').value = senhaCookie;
    }

    console.log('Email recuperado do cookie:', emailCookie);
    console.log('Senha recuperada do cookie:', senhaCookie);
};

async function ValidarLogin(event) {
    event.preventDefault();

    let senha_input = document.getElementById('pass').value; 
    let email_input = document.getElementById('email').value; 
    let validar = true; 
    let SenhaRegex = /^(?=.*[A-Z])(?=.*\W).{8,}$/;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email_input)) {
        document.getElementById('email-incorreto').textContent = 'Por favor, preencha o campo com um Email Válido';
        validar = false;
    } else {
        document.getElementById('email-incorreto').textContent = '';
    }

    if (!SenhaRegex.test(senha_input)) {
        document.getElementById('senha-incorreta').textContent = 'A senha deve ter no mínimo 8 caracteres, uma letra maiúscula e um símbolo.';
        validar = false;
    } else {
        document.getElementById('senha-incorreta').textContent = '';
    }

    if (validar) {
        const Usuarios = JSON.parse(localStorage.getItem('Usuarios'));
        const UsuarioV = Usuarios.find(usuario =>
            usuario.email === email_input && usuario.senha === senha_input
        );
        var nomeusuarioativo = ""

        for (let i = 0; i < Usuarios.length; i++) {
            if (Usuarios[i].email === email_input) {
                nomeusuarioativo = Usuarios[i].nome;
                break; 
            }
        }
        
        if (!!UsuarioV){

            await customOk('Login realizado com sucesso!');
            
            definirCookie("email", email_input, 7);
            definirCookie("senha", senha_input, 7);
            sessionStorage.setItem("LoginAtivo",true)
            var UsuarioAtivo = {
                email : email_input,
                nome : nomeusuarioativo
            }
            var usuarioA = []
            usuarioA.push(UsuarioAtivo)
            sessionStorage.setItem("UsuarioAtivo", JSON.stringify(usuarioA))
            window.location.href = '../index.html';
        } else {
            await customOk('Email ou senha incorretos.');
        }
    }
}

function customOk(message) {
    return new Promise((resolve) => {
        const confirmBox = document.getElementById("custom-confirm");
        const confirmMessage = document.getElementById("confirm-message");
        const yesButton = document.getElementById("confirm-yes");

        confirmMessage.innerText = message;
        confirmBox.classList.remove("hidden");

        yesButton.onclick = () => {
            confirmBox.classList.add("hidden");
            resolve(true);
        };
    });
};

const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('pass');

togglePassword.addEventListener('click', () => {
  const currentType = passwordInput.type;
  passwordInput.type = currentType === 'password' ? 'text' : 'password';

  togglePassword.classList.toggle('fa-eye');
  togglePassword.classList.toggle('fa-eye-slash');
});

