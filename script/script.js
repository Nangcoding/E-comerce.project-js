// MOBILE MENU
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");

if (bar) {
    bar.addEventListener("click", () => nav.classList.add("active"));
}

// REGISTER MODAL
const modal = document.getElementById("registerModal");
const openBtn = document.getElementById("openRegister");
const closeBtn = modal ? modal.querySelector(".close") : null;

if (openBtn) openBtn.addEventListener("click", () => modal.style.display = "block");
if (closeBtn) closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});

// CART SYSTEM (LOCAL STORAGE)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Elements
const cartCount = document.getElementById("cart-count");
const addToCartButtons = document.querySelectorAll(".cart");

// UPDATE CART COUNT
function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.textContent = total;
}

// ADD TO CART
addToCartButtons.forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();

        const product = {
            id: Number(this.dataset.id), 
            name: this.dataset.name,
            price: Number(this.dataset.price),
            image: this.dataset.image,
            quantity: 1
        };

        const existing = cart.find(item => item.id === product.id);

        if (existing) {
            existing.quantity++;
        } else {
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        showNotification("Product added to cart 🛒");
    });
});

// SHOW NOTIFICATION
function showNotification(message) {
    const note = document.createElement("div");
    note.textContent = message;
    note.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #088178;
        color: white;
        padding: 12px 18px;
        border-radius: 6px;
        z-index: 9999;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        font-weight: bold;
    `;
    document.body.appendChild(note);

    setTimeout(() => note.remove(), 2000);
}

// INITIALIZE
updateCartCount();
