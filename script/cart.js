let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

// ===== UPDATE CART COUNT =====
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// ===== DISPLAY CART =====
function displayCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <tr>
                <td>
                    <i class="fa-solid fa-trash" onclick="removeItem(${index})"></i>
                </td>
                <td><img src="${item.image}" width="70"></td>
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td>
                    <button onclick="changeQty(${index}, -1)">-</button>
                    ${item.quantity}
                    <button onclick="changeQty(${index}, 1)">+</button>
                </td>
                <td>$${itemTotal}</td>
            </tr>
        `;
    });

    cartTotal.textContent = `$${total}`;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// ===== CHANGE QUANTITY =====
function changeQty(index, change) {
    cart[index].quantity += change;

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

// INIT
displayCart();

// When updating total in cart page
const cartTotalElement = document.getElementById('cart-total');
localStorage.setItem('cartTotal', cartTotalElement.textContent.replace('$', ''));


// Get the button
const checkoutBtn = document.getElementById('checkout-btn');


checkoutBtn.addEventListener('click', () => {
    // Get the total value, remove $ sign and convert to number
    const total = parseFloat(cartTotalElement.textContent.replace('$', ''));

    if (total > 0) {
        // If cart has items, redirect to checkout page
        window.location.href = '/template/checkout.html';
    } else {
        // If cart is empty, alert user
        alert('Your cart is empty! Add items before proceeding.');
    }
});

