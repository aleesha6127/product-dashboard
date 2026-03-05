const cartItemsContainer = document.getElementById('cart-items');
const itemsTotalDisplay = document.getElementById('items-total');
const orderTotalDisplay = document.getElementById('order-total');
const walletBalanceDisplay = document.getElementById('wallet-balance');
const buyNowBtn = document.getElementById('buy-now-btn');
const walletWarning = document.getElementById('wallet-warning');
const wishlistCountDisplay = document.getElementById('wishlist-count');
const themeToggle = document.getElementById('theme-toggle');

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let walletBalance = parseFloat(localStorage.getItem('walletBalance')) || 500.00;
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let isDarkMode = localStorage.getItem('darkMode') === 'true';

/**
 * Initialize cart page
 */
function init() {
    applyTheme();
    renderCart();
    updateWalletDisplay();
    setupEventListeners();
}

/**
 * Theme Management
 */
function applyTheme() {
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        if (themeToggle) themeToggle.textContent = '☀️';
    } else {
        document.body.classList.remove('dark-mode');
        if (themeToggle) themeToggle.textContent = '🌙';
    }
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    applyTheme();
}

function updateWalletDisplay() {
    if (walletBalanceDisplay) walletBalanceDisplay.textContent = `$${walletBalance.toFixed(2)}`;
    if (wishlistCountDisplay) wishlistCountDisplay.textContent = wishlist.length;
}

/**
 * Render cart items with boutique styling
 */
function renderCart() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-msg" style="text-align: left; padding: 4rem 0;">
                <h3 style="font-size: 2rem; font-weight: 300; letter-spacing: 0.1em;">YOUR BAG IS EMPTY</h3>
                <p style="color: var(--text-muted); margin-top: 1rem; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em;">Select pieces from our collection to begin.</p>
                <a href="shop.html" class="buy-now-btn" style="display: inline-block; width: auto; margin-top: 2rem; text-decoration: none; padding: 1.2rem 3rem;">Browse Collection</a>
            </div>
        `;
        updateSummary(0);
        buyNowBtn.disabled = true;
        buyNowBtn.style.opacity = '0.3';
        return;
    }

    let subtotal = 0;
    cart.forEach((product, index) => {
        const qty = product.quantity || 1;
        const itemTotal = product.price * qty;
        subtotal += itemTotal;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div class="cart-item-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-title">${product.title}</div>
                <div class="cart-item-price">$${product.price.toFixed(2)}</div>
                
                <div class="qty-controls">
                    <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
                    <span class="qty-number">${qty}</span>
                    <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
                </div>
                <div>
                    <button class="remove-btn" onclick="removeItem(${index})">Remove Selection</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    updateSummary(subtotal);
}

window.updateQty = function (index, change) {
    const item = cart[index];
    const newQty = (item.quantity || 1) + change;

    if (newQty > 0) {
        item.quantity = newQty;
    } else {
        cart.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
};

function updateSummary(subtotal) {
    itemsTotalDisplay.textContent = `$${subtotal.toFixed(2)}`;
    orderTotalDisplay.textContent = `$${subtotal.toFixed(2)}`;

    if (subtotal > walletBalance) {
        walletWarning.style.display = 'block';
        buyNowBtn.style.backgroundColor = 'var(--text-muted)';
        buyNowBtn.style.cursor = 'not-allowed';
        buyNowBtn.disabled = true;
    } else {
        walletWarning.style.display = 'none';
        buyNowBtn.style.backgroundColor = '';
        buyNowBtn.style.cursor = '';
        buyNowBtn.disabled = subtotal === 0;
        buyNowBtn.style.opacity = subtotal === 0 ? '0.3' : '1';
    }
}

window.removeItem = function (index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
};

buyNowBtn.addEventListener('click', () => {
    const total = parseFloat(orderTotalDisplay.textContent.replace('$', ''));

    if (total > walletBalance || total === 0) return;

    // Execute purchase
    const orderDetails = {
        id: Math.floor(Math.random() * 1000000),
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        total: total,
        itemCount: cart.reduce((sum, item) => sum + (item.quantity || 1), 0),
        items: [...cart] // Save current cart items
    };

    let purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
    purchaseHistory.unshift(orderDetails); // Recent first
    localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

    walletBalance -= total;
    cart = [];

    localStorage.setItem('walletBalance', walletBalance.toFixed(2));
    localStorage.setItem('cart', JSON.stringify(cart));

    showSuccess();
});

function showSuccess() {
    cartItemsContainer.innerHTML = `
        <div class="empty-cart-msg" style="text-align: left; padding: 4rem 0;">
            <p style="color: var(--primary-color); letter-spacing: 0.3em; font-weight: 700; margin-bottom: 1rem; text-transform: uppercase;">Thank you</p>
            <h2 style="font-size: 3rem; font-weight: 800; letter-spacing: -0.02em;">ORDER CONFIRMED</h2>
            <p style="margin-top: 1.5rem; color: var(--text-muted); max-width: 400px; font-size: 1.1rem;">Your pieces have been reserved. You may view your purchase details in your boutique profile.</p>
            <div style="display: flex; gap: 1.5rem; margin-top: 3rem;">
                <a href="shop.html" class="buy-now-btn" style="text-decoration: none; width: auto; padding: 1.2rem 3rem;">Continue Shopping</a>
                <a href="wallet.html" class="buy-now-btn" style="text-decoration: none; width: auto; padding: 1.2rem 3rem; background: var(--bg-color); color: var(--text-main); border: 1px solid var(--border-color);">View History</a>
            </div>
        </div>
    `;
    updateSummary(0);
    updateWalletDisplay();
    buyNowBtn.style.display = 'none';
}

function setupEventListeners() {
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
}

init();
