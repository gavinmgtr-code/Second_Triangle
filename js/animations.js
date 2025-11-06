// Animasi tambahan untuk website

// Animasi untuk logo berputar
function initLogoAnimation() {
    const logoIcon = document.querySelector('.logo-icon');
    
    // Hentikan animasi saat hover
    logoIcon.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    // Lanjutkan animasi saat mouse leave
    logoIcon.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
}

// Animasi untuk product cards
function initProductCardAnimations() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Animasi untuk tombol
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Efek ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Inisialisasi semua animasi
document.addEventListener('DOMContentLoaded', function() {
    initLogoAnimation();
    initProductCardAnimations();
    initButtonAnimations();
});