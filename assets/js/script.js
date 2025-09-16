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


// image gallery
const images = [
    { src: 'assets/imgs/1.jpg' },
    { src: 'assets/imgs/4.jpg' },
    { src: 'assets/imgs/12.jpg' },
    { src: 'assets/imgs/5.jpg' },
    { src: 'assets/imgs/8.jpg' },
    { src: 'assets/imgs/3.jpg' },
    { src: 'assets/imgs/9.jpg' },
    { src: 'assets/imgs/10.jpg' },
    { src: 'assets/imgs/13.jpg' },
    { src: 'assets/imgs/6.jpg' },
    { src: 'assets/imgs/14.jpg' },
    { src: 'assets/imgs/15.jpg' },
    { src: 'assets/imgs/19.jpg' },
    // { src: 'assets/imgs/17.jpg' },
];

let currentImageIndex = 0;

// Create gallery items
function createGallery() {
    const gallery = document.getElementById('gallery-grid');

    images.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
                    <img src="${image.src}" loading="lazy">
                    <div class="overlay">
                        <div class="expand-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M160 144C151.2 144 144 151.2 144 160L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 160C496 151.2 488.8 144 480 144L160 144zM96 160C96 124.7 124.7 96 160 96L480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 160zM224 192C241.7 192 256 206.3 256 224C256 241.7 241.7 256 224 256C206.3 256 192 241.7 192 224C192 206.3 206.3 192 224 192zM360 264C368.5 264 376.4 268.5 380.7 275.8L460.7 411.8C465.1 419.2 465.1 428.4 460.8 435.9C456.5 443.4 448.6 448 440 448L200 448C191.1 448 182.8 443 178.7 435.1C174.6 427.2 175.2 417.6 180.3 410.3L236.3 330.3C240.8 323.9 248.1 320.1 256 320.1C263.9 320.1 271.2 323.9 275.7 330.3L292.9 354.9L339.4 275.9C343.7 268.6 351.6 264.1 360.1 264.1z"/></svg>
                        </div>
                    </div>
                `;

        galleryItem.addEventListener('click', () => openLightbox(index));
        gallery.appendChild(galleryItem);
    });
}

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxCounter = document.getElementById('lightboxCounter');
const loading = document.getElementById('loading');

function openLightbox(index) {
    currentImageIndex = index;
    showImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showImage() {
    loading.style.display = 'block';
    lightboxImage.style.opacity = '0';

    // Create new image to preload
    const img = new Image();
    img.onload = function () {
        lightboxImage.src = images[currentImageIndex].src;
        lightboxImage.alt = images[currentImageIndex].alt;
        lightboxImage.style.opacity = '1';
        loading.style.display = 'none';
    };
    img.src = images[currentImageIndex].src;

    // Update counter
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;

    // Update navigation buttons
    lightboxPrev.disabled = currentImageIndex === 0;
    lightboxNext.disabled = currentImageIndex === images.length - 1;
}

function showPrevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        showImage();
    }
}

function showNextImage() {
    if (currentImageIndex < images.length - 1) {
        currentImageIndex++;
        showImage();
    }
}

// Event listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrevImage);
lightboxNext.addEventListener('click', showNextImage);

// Close lightbox when clicking outside image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    }
});

// Initialize gallery
createGallery();

// Add smooth transition for lightbox image
lightboxImage.style.transition = 'opacity 0.3s ease';


// // Initialize EmailJS
// emailjs.init("9vLLVYFSMFFrwEmPq");

// // Form validation class
// class FormValidator {
//     constructor() {
//         this.setupEventListeners();
//         this.isFormValid = false;
//     }
    
//     // Sanitize input to prevent XSS attacks
//     sanitizeInput(input) {
//         const div = document.createElement('div');
//         div.textContent = input;
//         return div.innerHTML
//             .replace(/</g, '&lt;')
//             .replace(/>/g, '&gt;')
//             .replace(/"/g, '&quot;')
//             .replace(/'/g, '&#x27;')
//             .replace(/\//g, '&#x2F;');
//     }
    
//     // Validate name field
//     validateName(name) {
//         const errors = [];
//         const sanitized = this.sanitizeInput(name.trim());
        
//         if (!sanitized) {
//             errors.push('Name is required');
//         } else if (sanitized.length < 2) {
//             errors.push('Name must be at least 2 characters');
//         } else if (sanitized.length > 50) {
//             errors.push('Name must be less than 50 characters');
//         } else if (!/^[a-zA-Z\s\-'\.]+$/.test(sanitized)) {
//             errors.push('Name can only contain letters, spaces, hyphens, apostrophes, and periods');
//         }
        
//         return { isValid: errors.length === 0, errors, sanitized };
//     }
    
//     // Validate email field
//     validateEmail(email) {
//         const errors = [];
//         const sanitized = this.sanitizeInput(email.trim().toLowerCase());
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
//         if (!sanitized) {
//             errors.push('Email is required');
//         } else if (!emailRegex.test(sanitized)) {
//             errors.push('Please enter a valid email address');
//         } else if (sanitized.length > 100) {
//             errors.push('Email must be less than 100 characters');
//         }
        
//         return { isValid: errors.length === 0, errors, sanitized };
//     }
    
//     // Validate subject field
//     validateSubject(subject) {
//         const errors = [];
//         const sanitized = this.sanitizeInput(subject.trim());
        
//         if (!sanitized) {
//             errors.push('Subject is required');
//         } else if (sanitized.length < 3) {
//             errors.push('Subject must be at least 3 characters');
//         } else if (sanitized.length > 100) {
//             errors.push('Subject must be less than 100 characters');
//         }
        
//         return { isValid: errors.length === 0, errors, sanitized };
//     }
    
//     // Validate message field
//     validateMessage(message) {
//         const errors = [];
//         const sanitized = this.sanitizeInput(message.trim());
        
//         if (!sanitized) {
//             errors.push('Message is required');
//         } else if (sanitized.length < 10) {
//             errors.push('Message must be at least 10 characters');
//         } else if (sanitized.length > 1000) {
//             errors.push('Message must be less than 1000 characters');
//         }
        
//         return { isValid: errors.length === 0, errors, sanitized };
//     }
    
//     // Display validation errors
//     displayError(fieldId, errors) {
//         const errorElement = document.getElementById(fieldId + 'Error');
//         const inputElement = document.getElementById(fieldId);
        
//         if (errors.length > 0) {
//             errorElement.textContent = errors[0];
//             errorElement.style.display = 'block';
//             inputElement.classList.add('input-error');
//             inputElement.classList.remove('input-valid');
//         } else {
//             errorElement.style.display = 'none';
//             inputElement.classList.remove('input-error');
//             inputElement.classList.add('input-valid');
//         }
//     }
    
//     // Update character count
//     updateCharCount(fieldId, currentLength, maxLength) {
//         const countElement = document.getElementById(fieldId + 'Count');
//         if (countElement) {
//             countElement.textContent = `${currentLength}/${maxLength}`;
//             if (currentLength > maxLength) {
//                 countElement.classList.add('over-limit');
//             } else {
//                 countElement.classList.remove('over-limit');
//             }
//         }
//     }
    
//     // Validate individual field
//     validateField(fieldId, value) {
//         let result;
        
//         switch (fieldId) {
//             case 'name':
//                 result = this.validateName(value);
//                 this.updateCharCount(fieldId, value.length, 50);
//                 break;
//             case 'email':
//                 result = this.validateEmail(value);
//                 break;
//             case 'subject':
//                 result = this.validateSubject(value);
//                 this.updateCharCount(fieldId, value.length, 100);
//                 break;
//             case 'message':
//                 result = this.validateMessage(value);
//                 this.updateCharCount(fieldId, value.length, 1000);
//                 break;
//             default:
//                 return false;
//         }
        
//         this.displayError(fieldId, result.errors);
//         return result.isValid;
//     }
    
//     // Validate entire form
//     validateForm() {
//         const name = document.getElementById('name').value;
//         const email = document.getElementById('email').value;
//         const subject = document.getElementById('subject').value;
        
//         const nameValid = this.validateField('name', name);
//         const emailValid = this.validateField('email', email);
//         const subjectValid = this.validateField('subject', subject);
//         const messageValid = this.validateField('message', message);
        
//         this.isFormValid = nameValid && emailValid && subjectValid && messageValid;
        
//         // Update submit button state
//         const submitBtn = document.getElementById('submitBtn');
//         if (this.isFormValid) {
//             submitBtn.style.opacity = '1';
//             submitBtn.style.cursor = 'pointer';
//         } else {
//             submitBtn.style.opacity = '0.7';
//             submitBtn.style.cursor = 'not-allowed';
//         }
        
//         return this.isFormValid;
//     }
    
//     // Get sanitized form data
//     getSanitizedFormData() {
//         return {
//             name: this.sanitizeInput(document.getElementById('name').value.trim()),
//             email: this.sanitizeInput(document.getElementById('email').value.trim().toLowerCase()),
//             subject: this.sanitizeInput(document.getElementById('subject').value.trim()),
//             message: this.sanitizeInput(document.getElementById('message').value.trim())
//         };
//     }
    
//     // Setup event listeners
//     setupEventListeners() {
//         const fields = ['name', 'email', 'subject', 'message'];
        
//         fields.forEach(fieldId => {
//             const field = document.getElementById(fieldId);
            
//             // Real-time validation on input
//             field.addEventListener('input', (e) => {
//                 this.validateField(fieldId, e.target.value);
//                 this.validateForm();
//             });
            
//             // Validation on blur (when user leaves field)
//             field.addEventListener('blur', (e) => {
//                 this.validateField(fieldId, e.target.value);
//                 this.validateForm();
//             });
//         });
//     }
// }

// // Initialize form validator
// const validator = new FormValidator();

// // Handle form submission
// document.getElementById('contactForm').addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     if (!validator.validateForm()) {
//         document.getElementById('messageDiv').innerHTML = 
//             '<div class="message error">Please fix the errors above before submitting.</div>';
//         return;
//     }
    
//     const submitBtn = document.getElementById('submitBtn');
//     const messageDiv = document.getElementById('messageDiv');
    
//     // Disable submit button and show loading
//     submitBtn.disabled = true;
//     submitBtn.textContent = 'Sending...';
//     messageDiv.innerHTML = '';
    
//     // Get sanitized form data
//     const formData = validator.getSanitizedFormData();
    
//     // Additional server-side validation simulation
//     if (formData.message.toLowerCase().includes('script') || 
//         formData.message.includes('<') || 
//         formData.message.includes('>')) {
//         messageDiv.innerHTML = '<div class="message error">Invalid content detected. Please remove any HTML or script tags.</div>';
//         submitBtn.disabled = false;
//         submitBtn.textContent = 'Send Message';
//         return;
//     }
    
//     // Send email using EmailJS
//     emailjs.send(
//         'service_uf021hp',   
//         'template_ehuccn3',
//         formData
//     ).then(function(response) {
//         console.log('SUCCESS!', response.status, response.text);
//         messageDiv.innerHTML = '<div class="message success">Message sent successfully! I\'ll get back to you soon.</div>';
//         document.getElementById('contactForm').reset();
        
//         // Reset validation states
//         const fields = ['name', 'email', 'subject', 'message'];
//         fields.forEach(fieldId => {
//             const field = document.getElementById(fieldId);
//             field.classList.remove('input-valid', 'input-error');
//             document.getElementById(fieldId + 'Error').style.display = 'none';
//         });
        
//         // Reset character counts
//         document.getElementById('nameCount').textContent = '0/50';
//         document.getElementById('subjectCount').textContent = '0/100';
//         document.getElementById('messageCount').textContent = '0/1000';
        
//         validator.isFormValid = false;
        
//     }, function(error) {
//         console.log('FAILED...', error);
//         messageDiv.innerHTML = '<div class="message error">Failed to send message. Please try again or contact me directly.</div>';
//     }).finally(function() {
//         // Re-enable submit button
//         submitBtn.disabled = false;
//         submitBtn.textContent = 'Send Message';
//     });
// });

// // Prevent form submission with Enter key if form is invalid
// document.getElementById('contactForm').addEventListener('keypress', function(e) {
//     if (e.key === 'Enter' && e.target.type !== 'textarea') {
//         e.preventDefault();
//         if (validator.isFormValid) {
//             document.getElementById('submitBtn').click();
//         }
//     }
// });