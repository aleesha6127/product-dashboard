const walletBalanceDisplay = document.getElementById('wallet-balance');
const walletBalanceLarge = document.getElementById('wallet-balance-large');
const cartCountDisplay = document.getElementById('cart-count');
const wishlistCountDisplay = document.getElementById('wishlist-count');
const topupBtn = document.getElementById('topup-btn');
const topupInput = document.getElementById('topup-amount');
const historyContainer = document.getElementById('purchase-history');
const themeToggle = document.getElementById('theme-toggle');

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let walletBalance = parseFloat(localStorage.getItem('walletBalance')) || 500.00;
let isDarkMode = localStorage.getItem('darkMode') === 'true';
let purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];

function init() {
    applyTheme();
    updateUI();
    renderHistory();
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
    if (walletBalanceLarge) walletBalanceLarge.textContent = `$${walletBalance.toFixed(2)}`;

    const totalQty = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    if (cartCountDisplay) cartCountDisplay.textContent = totalQty;
    if (wishlistCountDisplay) wishlistCountDisplay.textContent = wishlist.length;

    localStorage.setItem('walletBalance', walletBalance.toFixed(2));
}

function renderHistory() {
    if (!historyContainer) return;
    historyContainer.innerHTML = '';

    if (purchaseHistory.length === 0) {
        historyContainer.innerHTML = `
            <div style="text-align: center; padding: 4rem; color: var(--text-muted); opacity: 0.6; font-size: 0.9rem; letter-spacing: 0.1em; text-transform: uppercase;">
                No history to display
            </div>
        `;
        return;
    }

    purchaseHistory.forEach(order => {
        const item = document.createElement('div');
        item.className = 'history-item';
        item.style.cursor = 'pointer';
        item.onclick = () => showOrderDetails(order.id);

        item.innerHTML = `
            <div class="history-info">
                <h4>Order <span class="order-id">#${order.id}</span></h4>
                <p>${order.date} • ${order.itemCount} ${order.itemCount === 1 ? 'Piece' : 'Pieces'}</p>
            </div>
            <div class="history-amount">-$${order.total.toFixed(2)}</div>
        `;
        historyContainer.appendChild(item);
    });
}

function showOrderDetails(orderId) {
    const order = purchaseHistory.find(o => o.id === orderId);
    if (!order) return;

    const modal = document.getElementById('order-details-modal');
    const modalOrderId = document.getElementById('modal-order-id');
    const modalOrderDate = document.getElementById('modal-order-date');
    const modalItemsList = document.getElementById('modal-items-list');
    const modalTotalAmount = document.getElementById('modal-total-amount');

    modalOrderId.textContent = `Order #${order.id}`;
    modalOrderDate.textContent = order.date;
    modalTotalAmount.textContent = `$${order.total.toFixed(2)}`;

    modalItemsList.innerHTML = '';

    if (order.items && order.items.length > 0) {
        order.items.forEach(product => {
            const qty = product.quantity || 1;
            const itemRow = document.createElement('div');
            itemRow.className = 'order-item-row';
            itemRow.innerHTML = `
                <div class="order-item-info">
                    <h4>${product.title}</h4>
                    <p>Quantity: ${qty} • $${product.price.toFixed(2)} / piece</p>
                </div>
                <div class="order-item-total">$${(product.price * qty).toFixed(2)}</div>
            `;
            modalItemsList.appendChild(itemRow);
        });
    } else {
        modalItemsList.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-muted);">Detailed item view unavailable for legacy orders.</p>';
    }

    modal.classList.add('active');
}

function closeOrderModal() {
    const modal = document.getElementById('order-details-modal');
    modal.classList.remove('active');
}

function handleTopup() {
    const amount = parseFloat(topupInput.value);
    if (isNaN(amount) || amount <= 0) {
        showToast('Please enter a valid amount');
        return;
    }

    walletBalance += amount;
    topupInput.value = '';
    updateUI();
    showToast(`Wallet refilled: $${amount.toFixed(2)} ✨`);

    // Animation effect
    if (walletBalanceLarge) {
        walletBalanceLarge.style.color = 'var(--primary-color)';
        walletBalanceLarge.style.transform = 'scale(1.1)';
        setTimeout(() => {
            walletBalanceLarge.style.color = '';
            walletBalanceLarge.style.transform = '';
        }, 500);
    }
}

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

function setupEventListeners() {
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (topupBtn) topupBtn.addEventListener('click', handleTopup);

    const closeModalBtn = document.getElementById('close-modal');
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeOrderModal);

    // Close modal on background click
    const modal = document.getElementById('order-details-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeOrderModal();
        });
    }

    if (topupInput) {
        topupInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleTopup();
        });
    }
}

init();
