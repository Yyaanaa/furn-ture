const containerCard = document.querySelector(".container-card");
const cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;
cart.forEach(item => {
  const priceNum = parseFloat(item.price.replace(/[^0-9.-]+/g,"")) || 0;
  total += priceNum;

  const cardHTML = `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.title}" class="cart-img">
      <div class="cart-details">
        <h2>${item.title}</h2>
        <p>${item.desc}</p>
        <p class="price">${item.price}</p>
      </div>
      <button class="remove-btn" data-remove>Remove</button>
    </div>
  `;
  containerCard.insertAdjacentHTML("beforeend", cardHTML);
});

document.getElementById("cart-total").innerText = total.toFixed(2);

containerCard.addEventListener("click", e => {
  if (!e.target.hasAttribute("data-remove")) return;
  const btn = e.target;
  const cardEl = btn.closest(".cart-item");
  const title = cardEl.querySelector("h2").innerText;

  const newCart = cart.filter(item => item.title !== title);
  localStorage.setItem("cart", JSON.stringify(newCart));
  cardEl.remove();

  const newTotal = newCart.reduce((sum, it) =>
    sum + (parseFloat(it.price.replace(/[^0-9.-]+/g,""))||0), 0);
  document.getElementById("cart-total").innerText = newTotal.toFixed(2);
});