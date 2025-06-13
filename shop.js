
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
      <div class="card-img"></div>
      <div class="card-info">
        <p class="text-title">${capitalize(cat)} ${i}</p>
        <p class="text-body">High-quality ${cat} for your comfort.</p>
      </div>
      <div class="card-footer">
        <span class="text-title">$${(Math.random()*400 + 100).toFixed(2)}</span>
        <div class="card-button">
          <i class="fa fa-shopping-cart"></i>
        </div>
      </div>
    `;
    container.appendChild(card);
  }
});

const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {

    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.card').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});