// Pull cart from localStorage (saved in menu.js)
const cart = JSON.parse(localStorage.getItem('dineCart')) || [];
const summaryList = document.getElementById('summaryList');
const grandTotal  = document.getElementById('grandTotal');

// Render summary
function renderSummary() {
  if (!cart.length) {
    summaryList.innerHTML = '<p>Cart is empty.</p>';
    grandTotal.textContent = '₨ 0';
    return;
  }

  let total = 0;
  summaryList.innerHTML = '';
  cart.forEach(item => {
    const sub = item.price * item.qty;
    total += sub;
    const div = document.createElement('div');
    div.className = 'summary-item';
    div.innerHTML = `<span>${item.name} × ${item.qty}</span><span>₨ ${sub.toLocaleString('en-PK')}</span>`;
    summaryList.appendChild(div);
  });
  grandTotal.textContent = '₨ ' + total.toLocaleString('en-PK');
}
renderSummary();

// Show / hide address fields
const orderTypeRadios = document.querySelectorAll('input[name="orderType"]');
const addressFields   = document.getElementById('addressFields');
orderTypeRadios.forEach(r => r.addEventListener('change', () => {
  addressFields.style.display = r.value === 'delivery' ? 'block' : 'none';
}));

// Simple form handler
document.getElementById('checkoutForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('Order placed successfully! (Demo mode – no backend)');
  localStorage.removeItem('dineCart');
  window.location.href = 'menu.html';
});