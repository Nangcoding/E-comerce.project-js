const notyf = new Notyf({ duration: 3000, position: { x: 'right', y: 'top' } });

        const products = [
            { id: 1, name: "Wireless Headphones", price: 79.99, category: "tech", stock: 50, description: "High-quality noise-cancelling headphones with 30-hour battery life. Bluetooth 5.0, comfortable fit.", image: "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", reviews: [{ user: "John", rating: 5, comment: "Amazing sound!" }, { user: "Alice", rating: 4, comment: "Good value." }] },
            { id: 2, name: "Smartwatch Pro", price: 249.99, category: "tech", stock: 30, description: "Track fitness, heart rate, and notifications. Water-resistant, GPS built-in, compatible with iOS/Android.", image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", reviews: [{ user: "Bob", rating: 5, comment: "Love the features!" }] },
            { id: 3, name: "Laptop Stand", price: 39.99, category: "accessories", stock: 100, description: "Adjustable aluminum stand for better ergonomics. Supports up to 17-inch laptops, foldable design.", image: "https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", reviews: [{ user: "Eve", rating: 4, comment: "Sturdy and useful." }] },
            { id: 4, name: "Stylish T-Shirt", price: 24.99, category: "fashion", stock: 200, description: "100% cotton, soft and breathable. Available in multiple sizes and colors. Modern graphic print.", image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", reviews: [{ user: "Charlie", rating: 5, comment: "Comfortable fit." }] },
            { id: 5, name: "Running Shoes", price: 89.99, category: "fashion", stock: 80, description: "Lightweight with cushioning for long runs. Breathable mesh, durable sole. Sizes 6-12.", image: "https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", reviews: [{ user: "Dana", rating: 4, comment: "Great for jogging." }] },
            { id: 6, name: "Bluetooth Speaker", price: 59.99, category: "tech", stock: 60, description: "Portable with 360-degree sound. Waterproof, 12-hour battery, built-in mic for calls.", image: "https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", reviews: [{ user: "Frank", rating: 5, comment: "Loud and clear." }] },
            { id: 7, name: "Minimalist Watch", price: 129.99, category: "accessories", stock: 40, description: "Swiss movement, leather strap, water-resistant to 50m. Elegant design for everyday wear.", image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", reviews: [{ user: "Grace", rating: 5, comment: "Classy look." }] },
            { id: 8, name: "Phone Case", price: 19.99, category: "accessories", stock: 150, description: "Shockproof with raised edges. Compatible with iPhone/Samsung models. Multiple colors.", image: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", reviews: [{ user: "Henry", rating: 4, comment: "Protects well." }] },
            { id: 9, name: "Gaming Mouse", price: 49.99, category: "tech", stock: 70, description: "RGB lighting, 16000 DPI, programmable buttons. Ergonomic for long gaming sessions.", image: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", reviews: [{ user: "Ivy", rating: 5, comment: "Precise and customizable." }] },
            { id: 10, name: "Backpack", price: 69.99, category: "fashion", stock: 90, description: "Water-resistant, multiple compartments, padded straps. Ideal for travel or daily use.", image: "https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", reviews: [{ user: "Jack", rating: 4, comment: "Spacious." }] }
        ];
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        let currentUser = JSON.parse(localStorage.getItem('user')) || null;
        const coupons = { 'SAVE10': 0.1, 'NEWYEAR': 0.2 }; // 10% and 20% off

        function saveData() {
            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            localStorage.setItem('orders', JSON.stringify(orders));
            localStorage.setItem('user', JSON.stringify(currentUser));
        }

        function updateBadges() {
            document.getElementById('cart-badge').textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
            document.getElementById('wishlist-badge').textContent = wishlist.length;
        }

        function updateAuthUI() {
            const loggedIn = !!currentUser;
            document.getElementById('auth-nav').style.display = loggedIn ? 'none' : 'block';
            document.getElementById('user-nav').style.display = loggedIn ? 'block' : 'none';
            document.getElementById('logout-nav').style.display = loggedIn ? 'block' : 'none';
            if (loggedIn) document.getElementById('user-email').textContent = currentUser.email;
            ['cart', 'wishlist', 'orders'].forEach(id => document.getElementById(id).style.display = loggedIn ? 'block' : 'none');
            renderCart();
            renderWishlist();
            renderOrders();
        }

        function renderProducts(filter = 'all', search = '') {
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';
            products
                .filter(p => (filter === 'all' || p.category === filter) && p.name.toLowerCase().includes(search.toLowerCase()))
                .forEach(product => {
                    const col = document.createElement('div');
                    col.className = 'col-md-4 mb-4';
                    col.innerHTML = `
                        <div class="card product-card h-100">
                            <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 250px; object-fit: cover;">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text text-muted mb-2">${product.description.substring(0, 60)}...</p>
                                <p class="mb-1"><strong>$${product.price.toFixed(2)}</strong> <small class="text-success">${product.stock > 0 ? 'In Stock' : 'Out of Stock'}</small></p>
                                <div class="star-rating mb-2">${getStars(getAverageRating(product.reviews))}</div>
                                <div class="d-grid gap-2 mt-auto">
                                    <button class="btn btn-outline-primary view-product" data-id="${product.id}">View Details</button>
                                    <button class="btn btn-primary add-to-cart ${product.stock === 0 ? 'disabled' : ''}" data-id="${product.id}">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    `;
                    productList.appendChild(col);
                });
        }

        function getAverageRating(reviews) {
            return reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
        }

        function getStars(rating) {
            let stars = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= Math.floor(rating)) stars += '<i class="fas fa-star"></i>';
                else if (i === Math.ceil(rating) && rating % 1 !== 0) stars += '<i class="fas fa-star-half-alt"></i>';
                else stars += '<i class="far fa-star"></i>';
            }
            return stars;
        }

        function renderCart(discount = 0) {
        const cartItems = document.getElementById('cart-items');
        const totalEl = document.getElementById('cart-total');
        if (!cartItems || !totalEl) return;

        cartItems.innerHTML = '';
        if (!cart.length) {
            cartItems.innerHTML = '<p class="text-center">Your cart is empty.</p>';
            totalEl.textContent = 'Total: $0.00';
            return;
        }

        let total = 0;

        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (!product) return;

            const subtotal = product.price * item.quantity;
            total += subtotal;

            const div = document.createElement('div');
            div.className = 'cart-item d-flex justify-content-between align-items-center mb-3';
            div.innerHTML = `
                <div class="d-flex align-items-center">
                    <img src="${product.image}" alt="${product.name}" style="width:60px; height:60px; object-fit:cover; border-radius:5px; margin-right:10px;">
                    <div>
                        <h6 class="mb-1">${product.name}</h6>
                        <small>$${product.price.toFixed(2)} each</small><br>
                        <small>Subtotal: $<span class="item-subtotal">${subtotal.toFixed(2)}</span></small>
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <input type="number" class="quantity-input form-control form-control-sm me-2" data-id="${item.id}" value="${item.quantity}" min="1" style="width:60px;">
                    <button class="btn btn-sm btn-danger remove-from-cart" data-id="${item.id}">Remove</button>
                </div>
            `;
            cartItems.appendChild(div);
        });

        total *= (1 - discount);
        totalEl.textContent = `Total: $${total.toFixed(2)}`;

        // Listen for quantity changes
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', e => {
                const id = parseInt(e.target.dataset.id);
                const newQty = parseInt(e.target.value);
                const cartItem = cart.find(i => i.id === id);
                const product = products.find(p => p.id === id);

                if (!cartItem || !product) return;

                if (newQty < 1) {
                    e.target.value = cartItem.quantity;
                    return;
                }

                // Adjust stock
                const diff = newQty - cartItem.quantity;
                if (diff > product.stock) {
                    e.target.value = cartItem.quantity;
                    alert('Not enough stock!');
                    return;
                }

                product.stock -= diff;
                cartItem.quantity = newQty;

                // Update subtotal for this item
                const subtotalEl = e.target.closest('.cart-item').querySelector('.item-subtotal');
                subtotalEl.textContent = (product.price * newQty).toFixed(2);

                // Update total
                let newTotal = cart.reduce((sum, i) => {
                    const p = products.find(prod => prod.id === i.id);
                    return sum + p.price * i.quantity;
                }, 0);
                newTotal *= (1 - discount);
                totalEl.textContent = `Total: $${newTotal.toFixed(2)}`;

                // Save changes
                localStorage.setItem('cart', JSON.stringify(cart));
            });
        });
        }



        function renderWishlist() {
            const wishlistItems = document.getElementById('wishlist-items');
            wishlistItems.innerHTML = '';
            if (!wishlist.length) {
                wishlistItems.innerHTML = '<p class="text-center">Your wishlist is empty.</p>';
                return;
            }
            wishlist.forEach(id => {
                const product = products.find(p => p.id === id);
                const col = document.createElement('div');
                col.className = 'col-md-4 mb-4';
                col.innerHTML = `
                    <div class="card product-card h-100">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
                        <div class="card-body">
                            <h5>${product.name}</h5>
                            <p>$${product.price.toFixed(2)}</p>
                            <button class="btn btn-outline-danger remove-from-wishlist" data-id="${id}">Remove</button>
                            <button class="btn btn-primary add-to-cart-from-wish" data-id="${id}">Add to Cart</button>
                        </div>
                    </div>
                `;
                wishlistItems.appendChild(col);
            });
        }

        function renderOrders() {
            const orderList = document.getElementById('order-list');
            orderList.innerHTML = '';
            if (!orders.length) {
                orderList.innerHTML = '<p class="text-center">No orders placed yet.</p>';
                return;
            }

            // Show latest orders first
            orders.slice().reverse().forEach(order => {
                const div = document.createElement('div');
                div.className = 'order-card mb-3 p-3 border rounded';

                // Format date
                const date = new Date(order.date);
                const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' };
                const formattedDate = date.toLocaleString('en-US', options);

                // List items with name, quantity, and price
                const itemsText = order.items.map(i => {
                    const product = products.find(p => p.id === i.id);
                    return `${product.name} x${i.quantity} - $${(product.price * i.quantity).toFixed(2)}`;
                }).join('<br>');

                div.innerHTML = `
                    <h5>Order #${order.id} - ${formattedDate}</h5>
                    <p><strong>Status:</strong> ${order.status}</p>
                    <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
                    <p><strong>Items:</strong><br>${itemsText}</p>
                `;

                orderList.appendChild(div);
            });

            // Make sure the orders section is visible
            document.getElementById('orders').style.display = 'block';
        }



        function showProductDetail(product) {
            document.getElementById('productModalLabel').textContent = product.name;
            let reviewsHtml = product.reviews.map(r => `
                <div class="review">
                    <strong>${r.user}</strong> - ${getStars(r.rating)}
                    <p>${r.comment}</p>
                </div>
            `).join('');
            document.getElementById('product-detail').innerHTML = `
                <div class="row">
                    <div class="col-md-5">
                        <img src="${product.image}" class="img-fluid rounded" alt="${product.name}">
                    </div>
                    <div class="col-md-7">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <h4>$${product.price.toFixed(2)}</h4>
                        <p><strong>Stock:</strong> ${product.stock > 0 ? product.stock + ' available' : 'Out of stock'}</p>
                        <div class="star-rating mb-3">${getStars(getAverageRating(product.reviews))} (${product.reviews.length} reviews)</div>
                        <h5>Customer Reviews</h5>
                        ${reviewsHtml || '<p>No reviews yet.</p>'}
                    </div>
                </div>
            `;
            document.querySelector('.add-to-wishlist-modal').dataset.id = product.id;
            document.getElementById('add-to-cart-modal').dataset.id = product.id;
            document.getElementById('add-to-cart-modal').disabled = product.stock === 0;
            new bootstrap.Modal(document.getElementById('productModal')).show();
        }

        // Event Listeners
        document.addEventListener('click', e => {
            const target = e.target;
            if (target.classList.contains('add-to-cart') || target.id === 'add-to-cart-modal') {
                if (!currentUser) return Swal.fire('Login Required', 'Please login first.', 'warning');
                const id = parseInt(target.dataset.id);
                const product = products.find(p => p.id === id);
                if (product.stock === 0) return notyf.error('Out of stock!');
                const item = cart.find(i => i.id === id);
                if (item) item.quantity++; else cart.push({ id, quantity: 1 });
                product.stock--;
                saveData();
                updateBadges();
                renderCart();
                notyf.success(`${product.name} added to cart!`);
            }
            if (target.classList.contains('remove-from-cart')) {
                const id = parseInt(target.dataset.id);
                const item = cart.find(i => i.id === id);
                const product = products.find(p => p.id === id);
                product.stock += item.quantity;
                cart = cart.filter(i => i.id !== id);
                saveData();
                updateBadges();
                renderCart();
            }
            if (target.classList.contains('view-product')) {
                const id = parseInt(target.dataset.id);
                showProductDetail(products.find(p => p.id === id));
            }
            if (target.classList.contains('add-to-wishlist-modal')) {
                const id = parseInt(target.dataset.id);
                if (!wishlist.includes(id)) {
                    wishlist.push(id);
                    saveData();
                    updateBadges();
                    renderWishlist();
                    notyf.success('Added to wishlist!');
                } else notyf.error('Already in wishlist.');
            }
            if (target.classList.contains('remove-from-wishlist')) {
                const id = parseInt(target.dataset.id);
                wishlist = wishlist.filter(w => w !== id);
                saveData();
                updateBadges();
                renderWishlist();
            }
            if (target.classList.contains('add-to-cart-from-wish')) {
                const id = parseInt(target.dataset.id);
                const product = products.find(p => p.id === id);
                if (product.stock === 0) return notyf.error('Out of stock!');
                const item = cart.find(i => i.id === id);
                if (item) item.quantity++; else cart.push({ id, quantity: 1 });
                product.stock--;
                wishlist = wishlist.filter(w => w !== id);
                saveData();
                updateBadges();
                renderCart();
                renderWishlist();
                notyf.success('Moved to cart!');
            }
            if (target.id === 'apply-coupon') {
                const code = document.getElementById('coupon-input').value.toUpperCase();
                const discount = coupons[code] || 0;
                if (discount) {
                    notyf.success(`Coupon applied! ${discount * 100}% off`);
                    renderCart(discount);
                } else notyf.error('Invalid coupon.');
            }
            if (target.id === 'checkout-btn') {
                if (!currentUser) return Swal.fire('Login Required', 'Please login first.', 'warning');
                if (!cart.length) return Swal.fire('Cart Empty', 'Your cart is empty!', 'warning');

                const code = document.getElementById('coupon-input').value.toUpperCase();
                const discount = coupons[code] || 0;

                let total = cart.reduce((sum, i) => {
                    const product = products.find(p => p.id === i.id);
                    return sum + product.price * i.quantity;
                }, 0);
                total *= (1 - discount);

                const order = {
                    id: orders.length + 1,
                    date: new Date(),
                    items: cart.map(i => ({ id: i.id, quantity: i.quantity })),
                    total,
                    status: 'Processing'
                };

                orders.push(order);

                cart = [];
                document.getElementById('coupon-input').value = '';
                saveData();
                updateBadges();
                renderCart();

                // Show success alert and render order history after clicking OK
                Swal.fire('Success!', 'Order placed. Thank you for shopping!', 'success').then(() => {
                    renderOrders(); // now the new order shows exactly like you want
                });
            }





            if (target.id === 'logout') {
                currentUser = null;
                saveData();
                updateAuthUI();
                notyf.success('Logged out.');
            }
        });

        document.addEventListener('change', e => {
            if (e.target.classList.contains('quantity-input')) {
                const id = parseInt(e.target.dataset.id);
                const quantity = parseInt(e.target.value);
                const item = cart.find(i => i.id === id);
                const product = products.find(p => p.id === id);
                const diff = quantity - item.quantity;
                if (diff > 0 && diff > product.stock) {
                    e.target.value = item.quantity;
                    return notyf.error('Not enough stock.');
                }
                product.stock -= diff;
                item.quantity = quantity;
                saveData();
                renderCart();
            }
        });

        document.getElementById('search-input').addEventListener('input', e => {
            const activeCategory = document.querySelector('[data-category].active').dataset.category;
            renderProducts(activeCategory, e.target.value);
        });

        document.querySelectorAll('[data-category]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('[data-category].active')?.classList.remove('active');
                btn.classList.add('active');
                renderProducts(btn.dataset.category, document.getElementById('search-input').value);
            });
        });

        document.getElementById('login-btn').addEventListener('click', () => {
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            if (email && password) {
                currentUser = { email };
                saveData();
                updateAuthUI();
                updateBadges();
                bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
                Swal.fire('Logged in!', `Welcome, ${email}!`, 'success');
            } else Swal.fire('Error', 'Please fill in all fields.', 'error');
        });

        document.getElementById('register-btn').addEventListener('click', () => {
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            if (email && password) {
                currentUser = { email };
                saveData();
                updateAuthUI();
                updateBadges();
                bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
                Swal.fire('Registered!', `Welcome, ${email}!`, 'success');
            } else Swal.fire('Error', 'Please fill in all fields.', 'error');
        });

        // Initialization
        renderProducts();
        updateAuthUI();
        updateBadges();