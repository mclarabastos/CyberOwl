function toggleText(button) {
  const card = button.closest('.card');  // Seleciona o card que contém o botão
  const moreText = card.querySelector('.more-text');  // Seleciona o texto adicional dentro do card
  
  // Verifica se o texto está visível e alterna o estado
  if (moreText.style.display === 'none' || !moreText.style.display) {
      moreText.style.display = 'inline';  // Mostra o texto
      button.textContent = 'Mostrar menos';  // Muda o texto do botão
  } else {
      moreText.style.display = 'none';  // Oculta o texto
      button.textContent = 'Mostrar mais';  // Restaura o texto do botão
  }
}

// Inicializa os elementos com o texto oculto
document.querySelectorAll('.more-text').forEach(function(moreText) {
  moreText.style.display = 'none';
});