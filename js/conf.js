window.onload = function () {
    const Login_Conf = document.getElementById("Login_Conf");
    var LoginAtivo = sessionStorage.getItem("LoginAtivo")
    if (LoginAtivo == "true") {
        Login_Conf.href = "/html/Configuracao.html"
        Login_Conf.innerHTML = "Configuração"

        var UsuarioAtivo = JSON.parse(sessionStorage.getItem("UsuarioAtivo"))
        if (document.getElementById("nomeConf")) {
            document.getElementById("nomeConf").innerHTML = UsuarioAtivo[0].nome
            document.getElementById("emailConf").innerHTML = UsuarioAtivo[0].email
        }
    } else {
        Login_Conf.href = "/html/Cadastro.html"
        Login_Conf.innerHTML = "Cadastro/Login"
    }
    //   alert(UsuarioAtivo[0].nome + "-" + UsuarioAtivo[0].email)
}

async function Sair() {
    const resposta = await customConfirm("Você tem certeza?");
    if (resposta) {
        sessionStorage.setItem("UsuarioAtivo", "")
        sessionStorage.setItem("LoginAtivo", false)
        window.location.href = 'login.html';
    } else {
        alert("Você cancelou a ação!");
    }
}

function definirCookie(nome, valor, dias) {
    let data = new Date();
    data.setTime(data.getTime() + (dias * 24 * 60 * 60 * 1000));
    let expiracao = "expires=" + data.toUTCString();
    document.cookie = nome + "=" + valor + ";" + expiracao + ";path=/";
}

async function Excluir() {
    const resposta = await customConfirm("Você tem certeza? ATENÇÃO: AÇÃO IRREVERSÍVEL!!");
    if (resposta) {
        const Usuarios = JSON.parse(localStorage.getItem('Usuarios'));
        const EmailUsuario = document.getElementById("emailConf").innerHTML;
        for (let i = 0; i < Usuarios.length; i++) {
            if (Usuarios[i].email === EmailUsuario) {
                Usuarios.splice(i, 1);
                break; // Interrompe o loop
            }
        }
        localStorage.setItem('Usuarios', JSON.stringify(Usuarios));
        definirCookie("email", "", -1);
        definirCookie("senha", "", -1);
        sessionStorage.setItem("UsuarioAtivo", "")
        sessionStorage.setItem("LoginAtivo", false)
        window.location.href = 'cadastro.html';
    } else {
        alert("Você cancelou a ação!");
    }
}

function customConfirm(message) {
    return new Promise((resolve) => {
        const confirmBox = document.getElementById("custom-confirm");
        const confirmMessage = document.getElementById("confirm-message");
        const yesButton = document.getElementById("confirm-yes");
        const noButton = document.getElementById("confirm-no");

        confirmMessage.innerText = message;
        confirmBox.classList.remove("hidden");

        yesButton.onclick = () => {
            confirmBox.classList.add("hidden");
            resolve(true); // Resolve a promise com true
        };

        noButton.onclick = () => {
            confirmBox.classList.add("hidden");
            resolve(false); // Resolve a promise com false
        };
    });
}


