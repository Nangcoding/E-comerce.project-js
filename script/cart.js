// ===== LOAD CART =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

// ===== ADD TO CART (COMBINED LOGIC) =====
function addToCart(product) {
    const existingItem = cart.find(item => item.name === product.name);

    if (existingItem) {
        existingItem.quantity += 1; // ✅ increase quantity
    } else {
        cart.push({
            name: product.name,
            price: Number(product.price),
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// ===== UPDATE CART COUNT =====
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => {
        return sum + (Number(item.quantity) || 0);
    }, 0);

    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

// ===== DISPLAY CART =====
function displayCart() {
    if (!cartItems) return;

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const name = item.name || "Unknown Product";
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;
        const image = item.image || "https://via.placeholder.com/70";

        const itemTotal = price * quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <tr>
                <td>
                    <i class="fa-solid fa-trash" style="cursor:pointer"
                       onclick="removeItem(${index})"></i>
                </td>
                <td><img src="${image}" width="70"></td>
                <td>${name}</td>
                <td>$${price}</td>
                <td>
                    <button onclick="changeQty(${index}, -1)">-</button>
                    ${quantity}
                    <button onclick="changeQty(${index}, 1)">+</button>
                </td>
                <td>$${itemTotal}</td>
            </tr>
        `;
    });

    if (cartTotal) {
        cartTotal.textContent = `$${total}`;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartTotal", total);

    updateCartCount();
}

// ===== CHANGE QUANTITY =====
function changeQty(index, change) {
    if (!cart[index]) return;

    cart[index].quantity = (Number(cart[index].quantity) || 1) + change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    displayCart();
}

// ===== REMOVE ITEM =====
function removeItem(index) {
    cart.splice(index, 1);
    displayCart();
}

// ===== INIT =====
displayCart();

// ===== CHECKOUT BUTTON =====
const checkoutBtn = document.getElementById("checkout-btn");

if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
        const total = Number(localStorage.getItem("cartTotal")) || 0;

        if (total > 0) {
            window.location.href = "/template/checkout.html";
        } else {
            alert("Your cart is empty! Add items before proceeding.");
        }
    });
}
