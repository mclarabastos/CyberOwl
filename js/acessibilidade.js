function acesse() {
    const ace = document.getElementById("ace")
    const cn = document.querySelector(".cn")
    const sections = document.getElementsByTagName("section")
    const sectionArray = Array.from(sections)
    const divs = document.getElementsByTagName("div")
    const divsArray = Array.from(divs);

    if (document.body.classList.contains("claro")){
        divsArray.forEach(div => {
            div.classList.remove("claro")
                      
        });

        sectionArray.forEach(section => {
            section.classList.remove("claro")
        })

        document.body.classList.remove("claro")
        cn.style.backgroundColor = "white"
        ace.src = "img/brilho-do-sol.png"  
    }else{
        divsArray.forEach(div => {
            div.classList.add("claro")    
        });

        sectionArray.forEach(section => {
            section.classList.add("claro")
        })

        document.body.classList.add("claro")
        cn.style.backgroundColor = "transparent"
        ace.src = "img/lua-crescente.png"        
    }
}