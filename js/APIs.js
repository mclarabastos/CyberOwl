//API Email
// function EnviarParaTodos(event) {
//     // event.preventDefault();
//     (function () {
//         emailjs.init("sXvikJ0xI4ErxIC-d");
//     })();

//     setInterval(function () {
//         var emailList = JSON.parse(localStorage.getItem('emails')) || [];    //criando uma lista com os emais do localstorage                
//         emailList.forEach(function (email) { //pegando um por um 
//             var params = {
//                 sendername: "Sistema Automático CyberOwl",
//                 to: email, // Email recuperado do localStorage
//                 subject: "Nova Notícia Disponível",
//                 replyto: "contato.cyberowl@gmail.com",
//                 message: "Acabou de sair uma nova notícia! Confira no nosso site"
//             };

//             var serviceID = "service_har6r6s";
//             var templateID = "template_0ox5grd";

//             emailjs.send(serviceID, templateID, params) // enviando o email                       
//                 .then(res => {
//                     console.log(`Email automático enviado com sucesso para ${email}!`);
//                 })
//                 .catch(err => alert(`erro ao enviar o e-mail de verificação, verifique se esse e-mail existe ${email}: `, err));
//         });

//     }, 60000);
// }

function EnviarParaTodos() {
    //preventDefault();
    (function () {
        emailjs.init("sXvikJ0xI4ErxIC-d");
    })();

    setInterval(function () {
        const Emails_Usuarios = JSON.parse(localStorage.getItem('Usuarios'));
        var params = {}
        const ServiceID = "service_har6r6s"
        const TemplateID = "template_0ox5grd"
        Emails_Usuarios.forEach( function (usuario) {
            params = {
                sendername: "Sistema Automático CyberOwl",
                to: usuario.email, // Email recuperado do localStorage
                subject: "Nova Notícia Disponível",
                replyto: "no-replyto",
                message: `Senhor(a) ${usuario.nome}, confira as novas notícias em https://www.tecmundo.com.br/phishing/noticias`
            }
            emailjs.send(ServiceID, TemplateID, params) // enviando o email                       
            .then(res => {
                console.log(`Email automático enviado com sucesso para ${usuario.email}!`);
            })
                .catch(err => alert(`erro ao enviar o e-mail de verificação, verifique se esse e-mail existe ${usuario.email}: `, err));           
        });

    }, 60000);
}

//EnviarParaTodos(); //DEIXAR DESATIVADo ATE QUE SE TENHA UM EMAIL NO LOCALSTORAGE

//API URL  
async function scanUrl(url) {
    // Envia para verificar a URL
    const response = await fetch('http://localhost:3000/scan-url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url })
    });

    const data = await response.json();
    // console.log("Resposta da análise:", JSON.stringify(data, null, 2)); 

    // Verifica se a análise foi iniciada corretamente
    if (data.data && data.data.id) {
        const analysisId = data.data.id; // Pega o ID da análise
        console.log(`Análise iniciada com ID: ${analysisId}`);

        // Chama a API para obter o resultado da análise
        const analysisResponse = await fetch(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
            method: 'GET',
            headers: {
                'x-apikey': '32c3e5f54001382888f05dc04bf9abe5034e4caf80af6bfad3eed2cb66553dfd'
            }
        });

        const analysisData = await analysisResponse.json();
        // console.log("Resultados da análise:", JSON.stringify(analysisData, null, 2)); 

        // Acessa os resultados da análise

        if (analysisData.data && analysisData.data.attributes && analysisData.data.attributes.results) {
            const results = analysisData.data.attributes.results;

            var maliciousCount = false;
            var harmlessCount = false;

            // retorna o resultado 
            for (const engine in results) {
                const result = results[engine];
                if (result.category === 'malicious') {
                    maliciousCount = true;
                } else if (result.category === 'harmless') {
                    harmlessCount = true;
                }
            }


            // Mostra os resultados no site
            setTimeout(function () {
                var res;
                console.log(maliciousCount);
                console.log(harmlessCount);
                if (maliciousCount) {
                    res = `A URL é maliciosa.`;
                } else if (harmlessCount) {
                    res = `A URL é segura.`;
                } else {
                    res = `Não foi possível determinar a segurança da URL.`;
                }
                document.getElementById("res").innerHTML = res
            }, 500);
        } else {
            console.error("Resultados não encontrados na análise:", analysisData); // erro se a estrutura não for como esperado
        }
    } else {
        console.error("Erro ao iniciar análise:", data); // erro se a análise não foi iniciada
    }

}
function verificar() {
    var url = document.getElementById("url").value;
    scanUrl(url);
}