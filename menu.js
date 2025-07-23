/* ---------- Dummy Menu Data ---------- */
const menu = [
  { id: 1, name: 'Grilled Shrimp Skewers', desc: 'Succulent shrimp with lemon butter.', price: 2700, category: 'starters', img: 'images/Shrimp.jpg' },
  { id: 2, name: 'Caesar Salad', desc: 'Crisp romaine, parmesan, croutons.', price: 1990, category: 'starters', img: 'images/Caesar.jpg' },
  { id: 3, name: 'Grilled Seafood Pasta', desc: 'A delightful mix of grilled seafood and pasta in a savory sauce.', price: 5100, category: 'main', img: 'images/Pasta.jpg' },
  { id: 4, name: 'Beef Steak', desc: '250g rib-eye with herb butter.', price: 6300, category: 'main', img: 'images/Steak.jpg' },
  { id: 5, name: 'Chocolate Lava Cake', desc: 'Warm cake with molten center.', price: 1850, category: 'desserts', img: 'images/Lava.jpg' },
  { id: 6, name: 'Tiramisu', desc: 'Classic Italian dessert.', price: 1550, category: 'desserts', img: 'images/Tiramisu.jpg' },
  { id: 7, name: 'Fresh Orange Juice', desc: 'Freshly squeezed.', price: 1000, category: 'beverages', img: 'images/Juice.jpg' },
  { id: 8, name: 'Iced Latte', desc: 'Espresso with cold milk.', price: 1100, category: 'beverages', img: 'images/Latte.jpg' }
];

/* ---------- Render Menu ---------- */
const menuGrid = document.getElementById('menuGrid');

function renderMenu(list) {
  menuGrid.innerHTML = '';
  list.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="card-body">
        <h4 class="card-title">${item.name}</h4>
        <p class="card-desc">${item.desc}</p>
        <div class="card-footer">
          <span class="price">RS${item.price.toFixed(2)}</span>
          <button class="add-btn" data-id="${item.id}">Add +</button>
        </div>
      </div>`;
    menuGrid.appendChild(card);
  });
}

renderMenu(menu);

/* ---------- Filtering ---------- */
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filtered = filter === 'all' ? menu : menu.filter(m => m.category === filter);
    renderMenu(filtered);
  });
});

  const hamburger = document.querySelector('.hamburger');
  const sideNav   = document.querySelector('.side-nav-mobile');
  const closeBtn  = document.querySelector('#closeNavbar');
  const overlay   = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);

  function toggleMenu() {
    sideNav.classList.toggle('open');
    overlay.classList.toggle('open');
  }
  hamburger.addEventListener('click', toggleMenu);
  closeBtn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

/* ---------- Cart Logic ---------- */
let cart = [];

const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');

function openCart() {
  cartModal.classList.add('open');
  renderCart();
}
function closeCartModal() {
  cartModal.classList.remove('open');
}

cartBtn.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartModal);

// Add to cart
document.addEventListener('click', e => {
  if (e.target.classList.contains('add-btn')) {
    const id = +e.target.dataset.id;
    const item = menu.find(m => m.id === id);
    const inCart = cart.find(c => c.id === id);
    if (inCart) inCart.qty++;
    else cart.push({ ...item, qty: 1 });
    updateCartCount();
  }
});

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = count;
}

function renderCart() {
  if (!cart.length) {
    cartItems.innerHTML = 'Your cart is empty.';
    cartTotal.textContent = '0.00';
    return;
  }
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-info">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.qty}</div>
        <div class="cart-controls">
          <button data-id="${item.id}" class="decrease">-</button>
          <span>${item.qty}</span>
          <button data-id="${item.id}" class="increase">+</button>
          <button data-id="${item.id}" class="remove">🗑️</button>
        </div>
      </div>`;
    cartItems.appendChild(row);
  });
  cartTotal.textContent = total.toFixed(2);

  // Quantity controls
  document.querySelectorAll('.decrease').forEach(btn => btn.onclick = changeQty(-1));
  document.querySelectorAll('.increase').forEach(btn => btn.onclick = changeQty(1));
  document.querySelectorAll('.remove').forEach(btn => btn.onclick = removeItem);

  // CheckoutBtn Listener
  document.getElementById('checkoutBtn').addEventListener('click', () => {
  localStorage.setItem('dineCart', JSON.stringify(cart));
  window.location.href = 'checkout.html';
  });
}

function changeQty(delta) {
  return function () {
    const id = +this.dataset.id;
    const item = cart.find(c => c.id === id);
    item.qty += delta;
    if (item.qty <= 0) removeItem.call(this);
    updateCartCount();
    renderCart();
  };
}
function removeItem() {
  const id = +this.dataset.id;
  cart = cart.filter(c => c.id !== id);
  updateCartCount();
  renderCart();
}

/* Close modal if backdrop clicked */
cartModal.addEventListener('click', e => {
  if (e.target === cartModal) closeCartModal();
});


  // Toggle the side navigation
  function toggleMenu() {
    const sideNav = document.querySelector('.side-nav-mobile');
    const overlay = document.getElementById('overlay');
    sideNav.classList.add('open');
    overlay.classList.add('open');
  }

  // Close side nav
  function closeMenu() {
    const sideNav = document.querySelector('.side-nav-mobile');
    const overlay = document.getElementById('overlay');
    sideNav.classList.remove('open');
    overlay.classList.remove('open');
  }

  // Attach event after DOM is loaded
  document.addEventListener("DOMContentLoaded", function() {
    const closeBtn = document.getElementById('closeNavbar');
    const overlay = document.getElementById('overlay');

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
    }

    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }
  });