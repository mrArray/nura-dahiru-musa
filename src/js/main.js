// Main JavaScript for Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or respect OS preference
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
        updateThemeToggleButton(true);
    } else {
        htmlElement.classList.remove('dark');
        updateThemeToggleButton(false);
    }
    
    // Toggle theme when button is clicked
    themeToggleBtn.addEventListener('click', function() {
        const isDark = htmlElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeToggleButton(isDark);
    });
    
    function updateThemeToggleButton(isDark) {
        if (isDark) {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggleBtn.setAttribute('title', 'Switch to light mode');
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggleBtn.setAttribute('title', 'Switch to dark mode');
        }
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            document.body.classList.toggle('overflow-hidden');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // Typing effect for hero section
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        const text = heroText.getAttribute('data-text');
        if (text) {
            heroText.textContent = '';
            let i = 0;
            
            function typeWriter() {
                if (i < text.length) {
                    heroText.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            }
            
            setTimeout(typeWriter, 1000);
        }
    }
    
    // Form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const formInputs = contactForm.querySelectorAll('input, textarea');
            
            formInputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('border-red-500');
                } else {
                    input.classList.remove('border-red-500');
                }
                
                // Email validation
                if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value.trim())) {
                        isValid = false;
                        input.classList.add('border-red-500');
                    }
                }
            });
            
            if (isValid) {
                // Show success message (in real app, would send data to server)
                const successMessage = document.createElement('div');
                successMessage.className = 'mt-4 p-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-lg';
                successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
                
                // Remove any existing messages
                const existingMessage = contactForm.querySelector('.mt-4');
                if (existingMessage) {
                    existingMessage.remove();
                }
                
                contactForm.appendChild(successMessage);
                contactForm.reset();
                
                // Remove message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 10) {
                navbar.classList.add('bg-white', 'dark:bg-gray-900', 'shadow-md');
                navbar.classList.remove('bg-transparent');
            } else {
                navbar.classList.remove('bg-white', 'dark:bg-gray-900', 'shadow-md');
                navbar.classList.add('bg-transparent');
            }
        });
    }
});
