const detailContainer = document.getElementById('product-details-container');
const walletBalanceDisplay = document.getElementById('wallet-balance');
const cartCountDisplay = document.getElementById('cart-count');
const wishlistCountDisplay = document.getElementById('wishlist-count');
const themeToggle = document.getElementById('theme-toggle');

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let walletBalance = parseFloat(localStorage.getItem('walletBalance')) || 500.00;
let isDarkMode = localStorage.getItem('darkMode') === 'true';
let currentProduct = null;

/**
 * Initialize details page
 */
async function init() {
    applyTheme();
    updateUI();
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        showError('Selection required.');
        return;
    }

    try {
        await fetchProductDetails(productId);
        setupEventListeners();
    } catch (error) {
        showError('Boutique connection lost. Please refresh.');
    }
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

/**
 * Update global UI indicators
 */
function updateUI() {
    if (walletBalanceDisplay) walletBalanceDisplay.textContent = `$${walletBalance.toFixed(2)}`;

    const totalQty = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    if (cartCountDisplay) cartCountDisplay.textContent = totalQty;
    if (wishlistCountDisplay) wishlistCountDisplay.textContent = wishlist.length;

    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

/**
 * Fetch specific product details
 */
async function fetchProductDetails(id) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) throw new Error('API Error');

    currentProduct = await response.json();
    document.getElementById('loader').style.display = 'none';
    renderDetails(currentProduct);
}

/**
 * Render details with Boutique Styling
 */
function renderDetails(product) {
    const isWishlisted = wishlist.some(item => item.id === product.id);
    const stars = '★'.repeat(Math.round(product.rating.rate)) + '☆'.repeat(5 - Math.round(product.rating.rate));

    detailContainer.innerHTML = `
        <div class="product-details">
            <div class="details-image-container">
                <img src="${product.image}" alt="${product.title}">
                <button class="wishlist-btn details-wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(event, ${product.id})">
                    ${isWishlisted ? '❤️' : '🤍'}
                </button>
            </div>
            <div class="details-content">
                <span class="details-category">${product.category}</span>
                <h2 class="details-title">${product.title}</h2>
                <div class="details-rating">
                    <span class="stars">${stars}</span>
                    <span style="opacity: 0.6;">(${product.rating.count} reviews)</span>
                </div>
                <div class="details-price">$${product.price.toFixed(2)}</div>
                <p class="details-description">${product.description}</p>
                
                <div class="details-actions">
                    <button class="details-add-btn" id="add-to-cart-btn">
                        Add to Bag
                    </button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('add-to-cart-btn').addEventListener('click', () => {
        addToCart(product);
    });
}

window.toggleWishlist = function (event, id) {
    event.stopPropagation();
    const index = wishlist.findIndex(item => item.id === id);
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast('Selection removed');
    } else {
        wishlist.push(currentProduct);
        showToast('Selection saved ❤️');
    }
    updateUI();
    renderDetails(currentProduct);
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

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateUI();
    showToast('Added to bag 🛍️');

    const btn = document.getElementById('add-to-cart-btn');
    const originalText = btn.textContent;
    btn.textContent = 'Selected ✓';
    btn.style.backgroundColor = '#10b981';
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = '';
    }, 1500);
}

function setupEventListeners() {
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
}

function showError(msg) {
    detailContainer.innerHTML = `<div class="error-msg" style="background: transparent; border: none; font-weight: 300; letter-spacing: 0.1em;">${msg}</div>`;
}

init();
