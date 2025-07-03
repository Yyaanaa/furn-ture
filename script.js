document.addEventListener('DOMContentLoaded', function() {
  const recommendedProducts = [
    { category: 'chair', number: 3, price: 125.03 },
    { category: 'table', number: 4, price: 239.45 },
    { category: 'set', number: 2, price: 110.79 },
    { category: 'bed', number: 2, price: 342.21 },
    { category: 'lamp', number: 3, price: 135.59 }
  ];

  const container = document.getElementById('recommendations-container');

  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  // Создаем карточки рекомендаций
  recommendedProducts.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    
    card.innerHTML = `
      <div class="card-img-container">
        <img src="images/${item.category}${item.number}.PNG" alt="${capitalize(item.category)} ${item.number}" class="card-img">
      </div>
      <div class="card-info">
        <p class="text-title">${capitalize(item.category)} ${item.number}</p>
        <p class="text-body">High-quality ${item.category} for your comfort.</p>
      </div>
      <div class="card-footer">
        <span class="text-title price">$${item.price.toFixed(2)}</span>
        <div class="card-button" data-cart>
          <i class="fa fa-shopping-cart"></i>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  
  container.addEventListener('click', function(event) {
    const cartBtn = event.target.closest('[data-cart]');
    if (!cartBtn) return;

    const card = cartBtn.closest('.card');
    const title = card.querySelector('.text-title').innerText;
    const desc = card.querySelector('.text-body').innerText;
    const price = card.querySelector('.price').innerText;
    const img = card.querySelector('.card-img').src;

    
    cartBtn.classList.add('added');
    setTimeout(() => cartBtn.classList.remove('added'), 800);

 
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ title, desc, price, img });
    localStorage.setItem('cart', JSON.stringify(cart));
  });
});