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
    
    // Show notification
    showNotification(`${product} (Size: ${size}) added to cart!`);
}

function updateCartDisplay() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    // Update cart items in sidebar
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
            if (cartTotal) cartTotal.textContent = '$0.00';
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
                            <button class="remove-item" onclick="removeFromCart(${index})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        cartItems.innerHTML = cartHTML;
        if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

function updateQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
            showNotification('Item removed from cart');
        }
        
        localStorage.setItem('secondTriangleCart', JSON.stringify(cart));
        updateCartDisplay();
    }
}

function removeFromCart(index) {
    if (cart[index]) {
        const removedItem = cart[index];
        cart.splice(index, 1);
        localStorage.setItem('secondTriangleCart', JSON.stringify(cart));
        updateCartDisplay();
        showNotification(`${removedItem.product} removed from cart`);
    }
}

function clearCart() {
    cart = [];
    localStorage.setItem('secondTriangleCart', JSON.stringify(cart));
    updateCartDisplay();
    showNotification('Cart cleared');
}

// Global functions untuk digunakan dalam onclick
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.addToCart = addToCart;

// DOM Elements
const splashScreen = document.getElementById('splash-screen');
const mainWebsite = document.getElementById('main-website');
const header = document.getElementById('header');
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.querySelector('.close-cart');
const overlay = document.getElementById('overlay');
const notification = document.getElementById('notification');
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
const addToCartBtns = document.querySelectorAll('.add-to-cart');
const wishlistBtns = document.querySelectorAll('.wishlist-btn');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.querySelector('.cart-count');
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const sliderDots = document.querySelectorAll('.slider-dot');
const volumeBtns = document.querySelectorAll('.volume-btn');
const homeBtnVolume1 = document.getElementById('home-btn-volume1');
const homeBtnVolume2 = document.getElementById('home-btn-volume2');
const homeBtnVolume3 = document.getElementById('home-btn-volume3');
const homePage = document.getElementById('home-page');
const volume1Page = document.getElementById('volume1-page');
const volume2Page = document.getElementById('volume2-page');
const volume3Page = document.getElementById('volume3-page');
const navLinks = document.querySelectorAll('.nav-link');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const confirmCheckout = document.getElementById('confirm-checkout');
const cancelCheckout = document.getElementById('cancel-checkout');
const sizeOptions = document.querySelectorAll('.size-option');
const sizeGuideLinks = document.querySelectorAll('.size-guide-link');
const sizeGuideModal = document.getElementById('size-guide-modal');
const closeSizeGuide = document.getElementById('close-size-guide');
const floatingSizeGuide = document.getElementById('floating-size-guide');
const quickViewBtns = document.querySelectorAll('.quick-view');
const quickViewModal = document.getElementById('quick-view-modal');
const closeQuickView = document.getElementById('close-quick-view');
const quickViewImage = document.getElementById('quick-view-image');
const quickViewDetails = document.getElementById('quick-view-details');

// Global State
let currentSlide = 0;
let selectedSizes = {};
let isMobile = window.innerWidth <= 768;
let isTablet = window.innerWidth > 768 && window.innerWidth <= 992;
let slideInterval;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initResponsiveFeatures();
    
    // Splash screen transition
    setTimeout(function() {
        splashScreen.classList.add('hidden');
        mainWebsite.classList.add('visible');
        
        // Remove splash screen from DOM after transition
        setTimeout(function() {
            splashScreen.style.display = 'none';
        }, 1000);
    }, 3000);
    
    updateCartDisplay();
    initTestimonialSlider();
    initScrollAnimations();
    
    // Preload images untuk performa yang lebih baik
    preloadImages();
    
    // Inisialisasi pemilihan ukuran
    initSizeSelection();
    
    // Inisialisasi event listeners untuk responsivitas
    initResponsiveEventListeners();
});

// Inisialisasi fitur responsif
function initResponsiveFeatures() {
    // Deteksi perangkat mobile/tablet
    checkDeviceType();
    
    // Sesuaikan animasi berdasarkan preferensi pengguna
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }
    
    // Optimasi untuk layar sentuh
    if (isMobile) {
        document.body.classList.add('touch-device');
    }
}

// Inisialisasi event listeners responsif
function initResponsiveEventListeners() {
    // Handle resize events dengan debounce
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            checkDeviceType();
            updateResponsiveFeatures();
        }, 250);
    });
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            checkDeviceType();
            updateResponsiveFeatures();
        }, 500);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMobile && mainNav.classList.contains('active') && 
            !e.target.closest('nav') && !e.target.closest('.menu-toggle')) {
            mainNav.classList.remove('active');
        }
    });
    
    // Handle escape key untuk modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

// Deteksi tipe perangkat
function checkDeviceType() {
    const width = window.innerWidth;
    isMobile = width <= 768;
    isTablet = width > 768 && width <= 992;
    
    // Update body classes untuk styling CSS
    document.body.classList.toggle('mobile', isMobile);
    document.body.classList.toggle('tablet', isTablet);
    document.body.classList.toggle('desktop', !isMobile && !isTablet);
}

// Update fitur berdasarkan tipe perangkat
function updateResponsiveFeatures() {
    // Reset testimonial slider position jika perlu
    if (testimonialTrack) {
        testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Adjust cart sidebar width untuk mobile
    if (cartSidebar) {
        if (isMobile) {
            cartSidebar.style.width = '100%';
        } else {
            cartSidebar.style.width = '400px';
        }
    }
}

// Preload images untuk meningkatkan performa
function preloadImages() {
    const imageUrls = [
        'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1544966503-7cc5ac882d5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Inisialisasi pemilihan ukuran
function initSizeSelection() {
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const size = this.getAttribute('data-size');
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            
            // Hapus seleksi sebelumnya untuk produk ini
            const allOptions = productCard.querySelectorAll('.size-option');
            allOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Tandai ukuran yang dipilih
            this.classList.add('selected');
            
            // Simpan ukuran yang dipilih untuk produk ini
            selectedSizes[productTitle] = size;
        });
    });
}

// Header scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle dengan improved touch handling
menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    mainNav.classList.toggle('active');
    
    // Prevent body scroll when menu is open on mobile
    if (isMobile) {
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : 'auto';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function() {
        if (isMobile) {
            mainNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Cart functionality dengan improved mobile experience
cartIcon.addEventListener('click', function() {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeCart.addEventListener('click', function() {
    closeCartSidebar();
});

overlay.addEventListener('click', function() {
    closeAllModals();
});

// Fungsi untuk menutup semua modal
function closeAllModals() {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    checkoutModal.classList.remove('active');
    sizeGuideModal.classList.remove('active');
    quickViewModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Juga tutup mobile menu
    if (isMobile) {
        mainNav.classList.remove('active');
    }
}

// Fungsi khusus untuk menutup cart sidebar
function closeCartSidebar() {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Checkout functionality
checkoutBtn.addEventListener('click', function() {
    if (cart.length === 0) {
        showNotification('Your cart is empty');
        return;
    }
    
    checkoutModal.classList.add('active');
    overlay.classList.add('active');
});

confirmCheckout.addEventListener('click', function() {
    checkoutModal.classList.remove('active');
    overlay.classList.remove('active');
    clearCart();
    showNotification('Thank you for your purchase!');
});

cancelCheckout.addEventListener('click', function() {
    checkoutModal.classList.remove('active');
    overlay.classList.remove('active');
});

// Size Guide functionality dengan improved mobile layout
sizeGuideLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        sizeGuideModal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

floatingSizeGuide.addEventListener('click', function() {
    sizeGuideModal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeSizeGuide.addEventListener('click', function() {
    sizeGuideModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Quick View functionality dengan responsive layout
quickViewBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productImage = productCard.querySelector('.product-img').style.backgroundImage;
        const productTitle = productCard.querySelector('.product-title').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        const productRating = productCard.querySelector('.product-rating').innerHTML;
        
        // Set gambar produk
        quickViewImage.style.backgroundImage = productImage;
        
        // Set detail produk dengan layout responsif
        quickViewDetails.innerHTML = `
            <h3>${productTitle}</h3>
            <div class="product-price">${productPrice}</div>
            <div class="product-rating">${productRating}</div>
            <p>Experience the premium quality and comfort of our ${productTitle}. Crafted with attention to detail and made from high-quality materials.</p>
            
            <div class="size-selector">
                <p>Select Size:</p>
                <div class="size-options">
                    <div class="size-option" data-size="S">S</div>
                    <div class="size-option" data-size="M">M</div>
                    <div class="size-option" data-size="L">L</div>
                    <div class="size-option" data-size="XL">XL</div>
                </div>
                <div class="size-guide-link">Size Guide</div>
            </div>
            
            <button class="btn add-to-cart quick-view-add-to-cart" data-product="${productTitle}" data-price="${productPrice.replace('$', '')}" style="margin-top: 20px; width: 100%;">Add to Cart</button>
        `;
        
        // Inisialisasi ulang pemilihan ukuran untuk quick view
        const quickViewSizeOptions = quickViewDetails.querySelectorAll('.size-option');
        quickViewSizeOptions.forEach(option => {
            option.addEventListener('click', function() {
                const size = this.getAttribute('data-size');
                
                // Hapus seleksi sebelumnya
                quickViewSizeOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Tandai ukuran yang dipilih
                this.classList.add('selected');
                
                // Simpan ukuran yang dipilih untuk produk ini
                selectedSizes[productTitle] = size;
            });
        });
        
        // Inisialisasi ulang size guide link untuk quick view
        const quickViewSizeGuide = quickViewDetails.querySelector('.size-guide-link');
        quickViewSizeGuide.addEventListener('click', function(e) {
            e.preventDefault();
            sizeGuideModal.classList.add('active');
        });
        
        // Inisialisasi ulang tombol add to cart untuk quick view
        const quickViewAddToCart = quickViewDetails.querySelector('.quick-view-add-to-cart');
        quickViewAddToCart.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const price = parseFloat(this.getAttribute('data-price'));
            
            // Validasi ukuran untuk quick view
            if (!selectedSizes[product]) {
                showNotification('Please select a size before adding to cart');
                return;
            }
            
            addToCart(product, price, selectedSizes[product]);
            
            // Tutup quick view setelah menambahkan ke keranjang
            quickViewModal.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        quickViewModal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

closeQuickView.addEventListener('click', function() {
    quickViewModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Product filtering dengan improved mobile experience
filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        productCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                // Trigger animation
                card.classList.remove('fade-in');
                void card.offsetWidth; // Trigger reflow
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
            }
        });
        
        // Scroll ke produk section setelah filter (mobile)
        if (isMobile) {
            const productsSection = document.getElementById('products');
            if (productsSection) {
                window.scrollTo({
                    top: productsSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add to cart functionality dengan validasi ukuran
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const product = this.getAttribute('data-product');
        const price = parseFloat(this.getAttribute('data-price'));
        const productCard = this.closest('.product-card');
        const productTitle = productCard.querySelector('.product-title').textContent;
        
        // Periksa apakah ukuran telah dipilih
        if (!selectedSizes[productTitle]) {
            showNotification('Please select a size before adding to cart');
            return;
        }
        
        addToCart(product, price, selectedSizes[productTitle]);
    });
});

// Wishlist functionality dengan improved touch feedback
wishlistBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        this.classList.toggle('active');
        this.innerHTML = this.classList.contains('active') ? 
            '<i class="fas fa-heart"></i>' : 
            '<i class="far fa-heart"></i>';
        
        const product = this.closest('.product-card').querySelector('.product-title').textContent;
        
        if (this.classList.contains('active')) {
            showNotification(`${product} added to wishlist!`);
        } else {
            showNotification(`${product} removed from wishlist!`);
        }
        
        // Tambah animasi feedback untuk mobile
        if (isMobile) {
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
        }
    });
});

// Volume navigation dengan improved mobile experience
volumeBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const volume = this.getAttribute('data-volume');
        
        // Hide all pages
        homePage.classList.remove('active');
        volume1Page.classList.remove('active');
        volume2Page.classList.remove('active');
        volume3Page.classList.remove('active');
        
        // Show selected volume page
        if (volume === '1') {
            volume1Page.classList.add('active');
        } else if (volume === '2') {
            volume2Page.classList.add('active');
        } else if (volume === '3') {
            volume3Page.classList.add('active');
        }
        
        // Scroll to top dengan behavior yang berbeda berdasarkan perangkat
        window.scrollTo({
            top: 0,
            behavior: isMobile ? 'auto' : 'smooth'
        });
        
        // Tutup mobile menu jika terbuka
        if (isMobile) {
            mainNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Home button functionality untuk volume pages
[homeBtnVolume1, homeBtnVolume2, homeBtnVolume3].forEach(btn => {
    if (btn) {
        btn.addEventListener('click', function() {
            volume1Page.classList.remove('active');
            volume2Page.classList.remove('active');
            volume3Page.classList.remove('active');
            homePage.classList.add('active');
            
            window.scrollTo({
                top: 0,
                behavior: isMobile ? 'auto' : 'smooth'
            });
        });
    }
});

// Navigation links dengan improved mobile experience
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.getAttribute('data-page');
        
        // Hide all pages
        homePage.classList.remove('active');
        volume1Page.classList.remove('active');
        volume2Page.classList.remove('active');
        volume3Page.classList.remove('active');
        
        // Show home page
        homePage.classList.add('active');
        
        // Scroll to section jika itu adalah section home page
        if (page !== 'home') {
            const targetSection = document.getElementById(page);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Update active nav link
        navLinks.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        
        // Tutup mobile menu setelah klik (mobile)
        if (isMobile) {
            mainNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Testimonial slider dengan improved mobile controls
function initTestimonialSlider() {
    // Set initial position
    updateTestimonialSlider();
    
    // Auto slide hanya di desktop/tablet, bukan mobile
    if (!isMobile) {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            updateTestimonialSlider();
        }, 5000);
    }
    
    // Dot navigation dengan improved touch targets untuk mobile
    sliderDots.forEach((dot, index) => {
        // Buat touch target lebih besar di mobile
        if (isMobile) {
            dot.style.width = '16px';
            dot.style.height = '16px';
        }
        
        dot.addEventListener('click', function() {
            currentSlide = index;
            updateTestimonialSlider();
            
            // Reset interval
            if (slideInterval) {
                clearInterval(slideInterval);
                if (!isMobile) {
                    slideInterval = setInterval(() => {
                        currentSlide = (currentSlide + 1) % testimonialSlides.length;
                        updateTestimonialSlider();
                    }, 5000);
                }
            }
        });
    });
    
    // Tambah swipe functionality untuk mobile
    if (isMobile && testimonialTrack) {
        let startX = 0;
        let endX = 0;
        
        testimonialTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        testimonialTrack.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = startX - endX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe kiri - next
                    currentSlide = (currentSlide + 1) % testimonialSlides.length;
                } else {
                    // Swipe kanan - previous
                    currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
                }
                updateTestimonialSlider();
            }
        }
    }
}

function updateTestimonialSlider() {
    if (testimonialTrack) {
        testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Update active dot
    sliderDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Scroll animations dengan optimized performance
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        threshold: isMobile ? 0.05 : 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Notification system dengan improved mobile positioning
function showNotification(message) {
    if (!notification) return;
    
    notification.textContent = message;
    notification.classList.add('show');
    
    // Position berbeda untuk mobile
    if (isMobile) {
        notification.style.bottom = '80px'; // Above floating action button
    } else {
        notification.style.bottom = '30px';
    }
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Newsletter form submission dengan improved mobile experience
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('.newsletter-input');
        const email = emailInput.value;
        
        if (email && isValidEmail(email)) {
            showNotification(`Thank you for subscribing with ${email}!`);
            this.reset();
        } else {
            showNotification('Please enter a valid email address');
        }
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Optimasi performa untuk mobile - lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}