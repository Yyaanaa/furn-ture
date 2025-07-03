const categories = ['chair', 'sofa', 'bed', 'table', 'lamp', 'set'];
const itemsPerCategory = 5;
const container = document.getElementById('cards-container');

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

categories.forEach(cat => {
  for (let i = 1; i <= itemsPerCategory; i++) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.category = cat;

    card.innerHTML = `
      <div class="card-img-container">
        <img src="images/${cat}${i}.PNG" alt="${capitalize(cat)} ${i}" class="card-img">
      </div>
      <div class="card-info">
        <p class="text-title">${capitalize(cat)} ${i}</p>
        <p class="text-body">High-quality ${cat} for your comfort.</p>
      </div>
      <div class="card-footer">
        <span class="text-title price">$${(Math.random()*400 + 100).toFixed(2)}</span>
        <div class="card-button" data-cart>
          <i class="fa fa-shopping-cart"></i>
        </div>
      </div>
    `;
    container.appendChild(card);
  }
});

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.card').forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
    });
  });
});

container.addEventListener('click', event => {
  const cartBtn = event.target.closest('[data-cart]');
  if (!cartBtn) return;

  const card = cartBtn.closest('.card');
  const title = card.querySelector('.text-title').innerText;
  const desc  = card.querySelector('.text-body').innerText;
  const price = card.querySelector('.price').innerText;
  const img   = card.querySelector('.card-img').src;

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ title, desc, price, img });
  localStorage.setItem('cart', JSON.stringify(cart));

  cartBtn.classList.add('added');
  setTimeout(() => cartBtn.classList.remove('added'), 800);
});