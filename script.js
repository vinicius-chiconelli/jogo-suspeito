document.addEventListener('DOMContentLoaded', function() {
  // Contador de cliques
  const clickCounts = {
    suspeitos: {},
    armas: {},
    locais: {}
  };

  // Inicializa contadores para todos os itens
  document.querySelectorAll('.item').forEach(item => {
    const category = item.dataset.category;
    const itemName = item.dataset.item;
    clickCounts[category][itemName] = 0;
  });

  // Atualiza status do item
  function updateItemStatus(category, item) {
    const element = document.querySelector(`li[data-category="${category}"][data-item="${item}"]`);
    const count = clickCounts[category][item] % 4; // Ciclo de 0 a 3

    // Reset classes (exceto verde automático)
    element.classList.remove('blue', 'red');
    
    // Adiciona classe baseada no contador
    if (count === 1) {
      element.classList.add('red');
    } else if (count === 2) {
      element.classList.add('blue');
    }

    checkRemainingItems(category);
  }

  // Verifica itens restantes e destaca o último não marcado
  function checkRemainingItems(category) {
    const items = document.querySelectorAll(`li[data-category="${category}"]`);
    
    // Remove destaque verde de todos (só os automáticos)
    items.forEach(item => {
      if (!item.classList.contains('user-green')) {
        item.classList.remove('green');
      }
    });
    
    // Filtra itens não marcados (sem vermelho/azul)
    const unmarkedItems = Array.from(items).filter(item => 
      !item.classList.contains('red') && 
      !item.classList.contains('blue')
    );

    // Se só restar um não marcado, destaca em verde
    if (unmarkedItems.length === 1) {
      unmarkedItems[0].classList.add('green');
    }
  }

  // Limpa todas as seleções e anotações
  function limparRodada() {
    // Limpa seleções visuais
    document.querySelectorAll('.item').forEach(item => {
      item.classList.remove('red', 'blue', 'green');
    });
    
    // Reseta contadores
    Object.keys(clickCounts).forEach(category => {
      Object.keys(clickCounts[category]).forEach(item => {
        clickCounts[category][item] = 0;
      });
    });
    
    // Limpa anotações
    document.getElementById('anotacoes').value = '';
    
    // Reaplica verdes automáticos se necessário
    ['suspeitos', 'armas', 'locais'].forEach(checkRemainingItems);
  }

  // Event listeners para itens
  document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', function() {
      const category = this.dataset.category;
      const itemName = this.dataset.item;
      
      clickCounts[category][itemName]++;
      updateItemStatus(category, itemName);
    });
  });

  // Inicia o jogo
  document.getElementById('startButton').addEventListener('click', function() {
    document.getElementById('tabuleiro').classList.remove('hidden');
    document.getElementById('nextRoundButton').classList.remove('hidden');
    this.classList.add('hidden');
    ['suspeitos', 'armas', 'locais'].forEach(checkRemainingItems);
  });

  // Próxima rodada - limpa tudo
  document.getElementById('nextRoundButton').addEventListener('click', function() {
    limparRodada();
    alert('Próxima rodada iniciada! Todas as seleções foram resetadas.');
  });
});