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

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Splash screen transition - waktu diperpendek
    setTimeout(function() {
        splashScreen.classList.add('hidden');
        mainWebsite.classList.add('visible');
        
        // Remove splash screen from DOM after transition
        setTimeout(function() {
            splashScreen.style.display = 'none';
        }, 1000);
    }, 3000); // Total splash screen duration: 3 seconds (dikurangi dari 5 detik)
    
    updateCartDisplay();
    initTestimonialSlider();
    initScrollAnimations();
    
    // Preload images untuk performa yang lebih baik
    preloadImages();
    
    // Inisialisasi pemilihan ukuran
    initSizeSelection();
});

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

// Mobile menu toggle
menuToggle.addEventListener('click', function() {
    mainNav.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function() {
        mainNav.classList.remove('active');
    });
});

// Cart functionality
cartIcon.addEventListener('click', function() {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeCart.addEventListener('click', function() {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

overlay.addEventListener('click', function() {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    checkoutModal.classList.remove('active');
    sizeGuideModal.classList.remove('active');
    quickViewModal.classList.remove('active');
});

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
    cart = [];
    localStorage.setItem('secondTriangleCart', JSON.stringify(cart));
    updateCartDisplay();
    showNotification('Thank you for your purchase!');
});

cancelCheckout.addEventListener('click', function() {
    checkoutModal.classList.remove('active');
    overlay.classList.remove('active');
});

// Size Guide functionality
sizeGuideLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        sizeGuideModal.classList.add('active');
        overlay.classList.add('active');
    });
});

floatingSizeGuide.addEventListener('click', function() {
    sizeGuideModal.classList.add('active');
    overlay.classList.add('active');
});

closeSizeGuide.addEventListener('click', function() {
    sizeGuideModal.classList.remove('active');
    overlay.classList.remove('active');
});

// Quick View functionality
quickViewBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productImage = productCard.querySelector('.product-img').style.backgroundImage;
        const productTitle = productCard.querySelector('.product-title').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        const productRating = productCard.querySelector('.product-rating').innerHTML;
        
        // Set gambar produk
        quickViewImage.style.backgroundImage = productImage;
        
        // Set detail produk
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
            
            <button class="btn add-to-cart" data-product="${productTitle}" data-price="${productPrice.replace('$', '')}" style="margin-top: 20px;">Add to Cart</button>
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
        const quickViewAddToCart = quickViewDetails.querySelector('.add-to-cart');
        quickViewAddToCart.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const price = parseFloat(this.getAttribute('data-price'));
            
            addToCart(product, price);
            showNotification(`${product} added to cart!`);
            
            // Tutup quick view setelah menambahkan ke keranjang
            quickViewModal.classList.remove('active');
            overlay.classList.remove('active');
        });
        
        quickViewModal.classList.add('active');
        overlay.classList.add('active');
    });
});

closeQuickView.addEventListener('click', function() {
    quickViewModal.classList.remove('active');
    overlay.classList.remove('active');
});

// Product filtering
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
            } else {
                card.style.display = 'none';
            }
        });
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
        showNotification(`${product} (Size: ${selectedSizes[productTitle]}) added to cart!`);
    });
});

// Wishlist functionality
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
    });
});

// Volume navigation
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
        
        // Scroll to top
        window.scrollTo(0, 0);
    });
});

// Home button functionality for volume pages
homeBtnVolume1.addEventListener('click', function() {
    volume1Page.classList.remove('active');
    homePage.classList.add('active');
    window.scrollTo(0, 0);
});

homeBtnVolume2.addEventListener('click', function() {
    volume2Page.classList.remove('active');
    homePage.classList.add('active');
    window.scrollTo(0, 0);
});

homeBtnVolume3.addEventListener('click', function() {
    volume3Page.classList.remove('active');
    homePage.classList.add('active');
    window.scrollTo(0, 0);
});

// Navigation links
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
        
        // Scroll to section if it's a home page section
        if (page !== 'home') {
            const targetSection = document.getElementById(page);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        } else {
            window.scrollTo(0, 0);
        }
        
        // Update active nav link
        navLinks.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});

// Testimonial slider
function initTestimonialSlider() {
    // Set initial position
    updateTestimonialSlider();
    
    // Auto slide every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        updateTestimonialSlider();
    }, 5000);
    
    // Dot navigation
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            updateTestimonialSlider();
        });
    });
}

function updateTestimonialSlider() {
    testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update active dot
    sliderDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Scroll animations
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Notification system
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Newsletter form submission
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('.newsletter-input').value;
    showNotification(`Thank you for subscribing with ${email}!`);
    this.reset();
});