// Cart State
let cart = JSON.parse(localStorage.getItem('secondTriangleCart')) || [];

// Cart functions dengan ukuran
function addToCart(product, price, size) {
    // Check if product already in cart dengan ukuran yang sama
    const existingItem = cart.find(item => item.product === product && item.size === size);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            product: product,
            price: price,
            quantity: 1,
            size: size
        });
    }
    
    // Save to localStorage
    localStorage.setItem('secondTriangleCart', JSON.stringify(cart));
    
    // Update cart display
    updateCartDisplay();
}

function updateCartDisplay() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartTotal.textContent = '$0.00';
        return;
    }
    
    let cartHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-img" style="background-image: url('https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80');"></div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.product}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-size">Size: ${item.size}</div>
                    <div class="cart-item-actions">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <span class="cart-item-quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                        <span class="remove-item" onclick="removeFromCart(${index})"><i class="fas fa-trash"></i></span>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartItems.innerHTML = cartHTML;
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    localStorage.setItem('secondTriangleCart', JSON.stringify(cart));
    updateCartDisplay();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('secondTriangleCart', JSON.stringify(cart));
    updateCartDisplay();
    showNotification('Item removed from cart');
}

// Global functions untuk digunakan dalam onclick
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;