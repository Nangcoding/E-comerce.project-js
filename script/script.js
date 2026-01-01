// MOBILE MENU
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");

if (bar) bar.onclick = () => nav.classList.add("active");
if (close) close.onclick = () => nav.classList.remove("active");

// REGISTER MODAL
const modal = document.getElementById("registerModal");
const openBtn = document.getElementById("openRegister");
const closeBtn = modal?.querySelector(".close");

if (openBtn) openBtn.onclick = () => modal.style.display = "block";
if (closeBtn) closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };

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
            id: this.dataset.id,
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
    `;
    document.body.appendChild(note);

    setTimeout(() => note.remove(), 2000);
}

updateCartCount();

