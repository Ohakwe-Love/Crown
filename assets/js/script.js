// Hamburger menu logic
const hamburger = document.querySelector('.hamburger');
const mobileOverlay = document.querySelector('.mobile-overlay');
const body = document.body;

hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    // Lock scroll when menu is open
    if (mobileOverlay.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
});

// Close overlay when clicking outside nav (optional for smooth feel)
mobileOverlay.addEventListener('click', function (e) {
    if (e.target === mobileOverlay) {
        hamburger.classList.remove('active');
        mobileOverlay.classList.remove('active');
        body.style.overflow = '';
    }
});

// hero slides
const slides = document.querySelectorAll(".background-slide");
let currentSlide = 0;
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}



setInterval(nextSlide, 5000);