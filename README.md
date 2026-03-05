# SleekDash | Advanced Modern Product Dashboard

SleekDash is a premium, high-performance ecommerce-style dashboard. It provides a full shopping simulation from product discovery to virtual checkout, featuring modern UI/UX patterns like dark mode, real-time notifications, and persistent state management.

---

## 🛠️ Technology Stack & Languages

This project is built using **Pure Web Technologies** (Vanilla stack) without external frameworks, ensuring maximum performance and compatibility.

- **HTML5 (HyperText Markup Language)**: Used for the semantic structure of all pages (`index.html`, `product.html`, `cart.html`, `wallet.html`, `wishlist.html`).
- **CSS3 (Cascading Style Sheets)**: Used for all styling, including:
    - **CSS Variables**: For dynamic theme switching (Light/Dark mode).
    - **Flexbox & Grid**: For responsive layouts.
    - **Animations**: For smooth toast notifications and hover effects.
- **JavaScript (ES6+)**: The logic engine of the application. It handles:
    - **Fetch API**: For retrieving product data from external servers.
    - **LocalStorage**: To persist your cart, wallet balance, wishlist, and theme preference.
    - **DOM Manipulation**: To dynamically update the UI without page refreshes.
- **Fake Store API**: A RESTful API providing the JSON data for products, categories, and ratings.

---

## ✨ Advanced Features

### 1. 🌓 Dynamic Theme Switching (Dark Mode)
- **What it is**: A toggle that allows users to switch between a bright "Light Mode" and a sleek "Dark Mode".
- **Benefit**: Reduces eye strain and provides a premium aesthetic choice.
- **Persistence**: Your choice is saved automatically, so it stays the same even if you close the browser.

### 2. ❤️ Product Wishlist
- **What it is**: A dedicated space to save items you are interested in but not ready to buy.
- **Functionality**: Click the heart icon on any product to save it. View all saved items in the dedicated Wishlist view.

### 3. 🛒 Smart Shopping Cart
- **What it is**: A management system for your intended purchases.
- **Quantity Control**: Unlike basic carts, SleekDash allows you to increase or decrease the quantity of each item directly in the cart.
- **Real-time Totals**: Subtotals and grand totals update instantly as you adjust quantities.

### 4. ✨ Toast Notifications
- **What it is**: Small, non-intrusive pop-up messages at the bottom of the screen.
- **Purpose**: Provides immediate visual confirmation when you add an item to the cart or wishlist.

### 5. 💰 Virtual Wallet & Purchase History
- **What it is**: A simulation of a digital payment system.
- **Wallet Detail**: Start with a virtual $500.00. You can "top up" funds at any time.
- **History**: Every successful checkout is recorded with a unique Order ID, date, and item count.

### 6. ⭐ Social Proof (Ratings)
- **What it is**: Visual star ratings (e.g., ★★★★☆) displayed on every product.
- **Data**: Pulled directly from the API to show real-world feedback counts.

---

## 📂 Project Structure

- `index.html`: The main storefront and discovery dashboard.
- `product.html`: Detailed view for individual products.
- `cart.html`: Your shopping basket and checkout interface.
- `wallet.html`: Your personal finance dashboard and purchase history.
- `wishlist.html`: Your collection of saved products.
- `style.css`: The "Brain" of the design—contains all colors, fonts, and responsive rules.
- `script.js`: Handles the main page (Searching, Filtering by Category, Sorting).
- `cart.js`: Manages the complex logic of quantity math and checkout.
- `product.js`: Fetches and displays deep details for a single item.
- `wallet.js`: Manages the virtual balance and history rendering.
- `wishlist.js`: Manages your collection of saved items.

---

## 📖 Glossary of Terms

- **API (Application Programming Interface)**: A way for our app to "talk" to a server to get product information.
- **LocalStorage**: A small database inside your browser that remembers your data even after you turn off your computer.
- **Responsive Design**: The ability of the website to look good on phones, tablets, and desktops automatically.
- **DOM (Document Object Model)**: The structure of the webpage that JavaScript "talks" to in order to change what you see.
- **Vanilla JS**: Refers to using plain JavaScript without any heavy libraries like React or Vue.
- **Glassmorphism**: A design trend used in the dashboard that makes elements look like frosted glass.

---

## 🚀 How to Use

1. **Browse**: Scroll through the main dashboard or use the **Search Bar** to find specific items.
2. **Filter**: Use the **Category** dropdown to look specifically for Electronics, Jewelry, or Clothing.
3. **Sort**: Use the **Sort** menu to find the cheapest or most expensive items.
4. **Save**: Click the **Heart (❤️)** to save an item to your wishlist.
5. **Buy**: Click **Add to Cart**, then go to your cart to adjust quantities and click **Buy Now** to use your virtual wallet.

---
Built with absolute precision for a modern, fluid shopping experience.
