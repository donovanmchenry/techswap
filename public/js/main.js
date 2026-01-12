// ==================== ADD TO CART ====================
async function addToCart(productId, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    try {
        const response = await fetch('/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId, quantity: 1 })
        });

        const result = await response.json();

        if (result.success) {
            // Update cart count in navbar
            updateCartBadge(result.cartCount);

            // Show success message
            showNotification('Product added to cart!', 'success');
        } else {
            showNotification('Failed to add product to cart', 'error');
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        showNotification('An error occurred', 'error');
    }
}

// ==================== UPDATE CART QUANTITY ====================
async function updateQuantity(productId, quantity) {
    quantity = parseInt(quantity);

    if (quantity < 1) {
        return removeFromCart(productId);
    }

    try {
        const response = await fetch('/cart/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId, quantity })
        });

        const result = await response.json();

        if (result.success) {
            // Reload page to update totals
            window.location.reload();
        }
    } catch (error) {
        console.error('Error updating cart:', error);
        showNotification('Failed to update quantity', 'error');
    }
}

// ==================== REMOVE FROM CART ====================
async function removeFromCart(productId) {
    if (!confirm('Remove this item from your cart?')) {
        return;
    }

    try {
        const response = await fetch('/cart/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId })
        });

        const result = await response.json();

        if (result.success) {
            // Reload page
            window.location.reload();
        }
    } catch (error) {
        console.error('Error removing from cart:', error);
        showNotification('Failed to remove item', 'error');
    }
}

// ==================== UPDATE CART BADGE ====================
function updateCartBadge(count) {
    const cartBadge = document.querySelector('.cart-badge');

    if (count > 0) {
        if (cartBadge) {
            cartBadge.textContent = count;
        } else {
            // Create badge if it doesn't exist
            const cartLink = document.querySelector('.cart-link');
            if (cartLink) {
                const badge = document.createElement('span');
                badge.className = 'cart-badge';
                badge.textContent = count;
                cartLink.appendChild(badge);
            }
        }
    } else {
        if (cartBadge) {
            cartBadge.remove();
        }
    }
}

// ==================== SHOW NOTIFICATION ====================
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
        color: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: '10000',
        animation: 'slideIn 0.3s ease-out'
    });

    // Add to page
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation styles
if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ==================== FORMAT CARD NUMBER ====================
document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.getElementById('cardNumber');

    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }

    // Format expiry date
    const expiryInput = document.getElementById('expiry');

    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }

            e.target.value = value;
        });
    }

    // Only allow numbers in CVV
    const cvvInput = document.getElementById('cvv');

    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== FORM VALIDATION ====================
function validateCheckoutForm(form) {
    const email = form.querySelector('#email').value;
    const name = form.querySelector('#name').value;
    const cardNumber = form.querySelector('#cardNumber').value.replace(/\s/g, '');
    const expiry = form.querySelector('#expiry').value;
    const cvv = form.querySelector('#cvv').value;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }

    // Name validation
    if (name.trim().length < 2) {
        showNotification('Please enter your full name', 'error');
        return false;
    }

    // Card number validation (should be 16 digits)
    if (cardNumber.length !== 16) {
        showNotification('Card number must be 16 digits', 'error');
        return false;
    }

    // Expiry validation
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(expiry)) {
        showNotification('Invalid expiry date format (MM/YY)', 'error');
        return false;
    }

    // CVV validation
    if (cvv.length !== 3) {
        showNotification('CVV must be 3 digits', 'error');
        return false;
    }

    return true;
}

console.log('TechSwap - JavaScript loaded successfully');
