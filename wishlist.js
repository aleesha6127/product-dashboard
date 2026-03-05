const productGrid = document.getElementById('product-grid');
const walletBalanceDisplay = document.getElementById('wallet-balance');
const cartCountDisplay = document.getElementById('cart-count');
const wishlistCountDisplay = document.getElementById('wishlist-count');
const themeToggle = document.getElementById('theme-toggle');

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let walletBalance = parseFloat(localStorage.getItem('walletBalance')) || 500.00;
let isDarkMode = localStorage.getItem('darkMode') === 'true';

function init() {
    applyTheme();
    updateUI();
    renderWishlist();
    setupEventListeners();
}

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

function updateUI() {
    if (walletBalanceDisplay) walletBalanceDisplay.textContent = `$${walletBalance.toFixed(2)}`;

    const totalQty = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    if (cartCountDisplay) cartCountDisplay.textContent = totalQty;
    if (wishlistCountDisplay) wishlistCountDisplay.textContent = wishlist.length;

    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function renderWishlist() {
    productGrid.innerHTML = '';

    if (wishlist.length === 0) {
        productGrid.innerHTML = `
            <div class="error-msg" style="grid-column: 1/-1; background: transparent; border: none; text-align: left; padding: 4rem 0;">
                <h3 style="font-size: 2rem; font-weight: 300; letter-spacing: 0.1em; color: var(--text-main);">YOUR WISHLIST IS EMPTY</h3>
                <p style="margin-top: 1rem; opacity: 0.6; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em;">Save your favorite pieces here.</p>
                <a href="shop.html" class="buy-now-btn" style="display: inline-block; margin-top: 2rem; text-decoration: none; width: auto; padding: 1.2rem 3rem;">Start Exploring</a>
            </div>
        `;
        return;
    }

    wishlist.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const stars = '★'.repeat(Math.round(product.rating.rate)) + '☆'.repeat(5 - Math.round(product.rating.rate));

        card.innerHTML = `
            <div class="card-header-actions" style="opacity: 1; transform: translateX(0);">
                <button class="wishlist-btn active" onclick="removeFromWishlist(event, ${product.id})" title="Remove Selection">
                    ❤️
                </button>
            </div>
            <div class="image-container" onclick="navigateToProduct(${product.id})">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
            </div>
            <div class="product-info" onclick="navigateToProduct(${product.id})">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-rating">
                    <span class="stars">${stars}</span>
                    <span>(${product.rating.count})</span>
                </div>
                <span class="product-price">$${product.price.toFixed(2)}</span>
            </div>
            <button class="add-to-cart-btn" onclick="addToCart(event, ${product.id})">
                Add to Bag
            </button>
        `;
        productGrid.appendChild(card);
    });
}

function navigateToProduct(id) {
    window.location.href = `product.html?id=${id}`;
}

window.removeFromWishlist = function (event, id) {
    event.stopPropagation();
    wishlist = wishlist.filter(item => item.id !== id);
    updateUI();
    renderWishlist();
    showToast('Selection removed');
};

function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>✨</span> ${message}`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

window.addToCart = function (event, id) {
    event.stopPropagation();
    const product = wishlist.find(p => p.id === id);
    if (!product) return;

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateUI();
    showToast('Added to bag 🛍️');
};

function setupEventListeners() {
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
}

init();
