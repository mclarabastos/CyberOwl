function EMmenu() {
   var img = document.getElementById("img")
   var menu = document.getElementById("menu")
   if (img.src.includes("menu_white_36dp.svg")) {
      img.src = "/img/close_white_36dp.svg"
      menu.classList.remove("esconder")
   } else {
      img.src = "/img/menu_white_36dp.svg"
      menu.classList.add("esconder")
   }
}