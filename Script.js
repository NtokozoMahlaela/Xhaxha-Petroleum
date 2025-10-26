 // Navigation and UI functionality
        const navbar = document.getElementById('navbar');
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        const backToTop = document.getElementById('backToTop');

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Back to top button visibility
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        // Mobile menu toggle
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });

        // Contact form submission
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            e.target.reset();
        });

        // Smooth scrolling for anchor links
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

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.feature-card, .product-card, .stat-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });

        // Initialize map
        function initMap() {
            // Coordinates for Fourways, Sandton
            const location = [-25.9969, 28.0078];
            
            // Create map
            const map = L.map('map').setView(location, 13);
            
            // Add tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            
            // Add marker
            L.marker(location).addTo(map)
                .bindPopup('<b>Xhaxha Petroleum</b><br>9 Cedar Avenue West, Fourways<br>Sandton, 2191')
                .openPopup();
        }

        // Initialize map when page loads
        document.addEventListener('DOMContentLoaded', initMap);

        // Fuel Request Form Functionality
        const steps = document.querySelectorAll('.step');
        const formSteps = document.querySelectorAll('.form-step');
        let currentStep = 1;

        // Step Navigation
        document.getElementById('nextToStep2').addEventListener('click', () => {
            if (validateStep1()) {
                navigateToStep(2);
            }
        });

        document.getElementById('backToStep1').addEventListener('click', () => {
            navigateToStep(1);
        });

        document.getElementById('nextToStep3').addEventListener('click', () => {
            if (validateStep2()) {
                updateReview();
                navigateToStep(3);
            }
        });

        document.getElementById('backToStep2').addEventListener('click', () => {
            navigateToStep(2);
        });

        document.getElementById('submitRequest').addEventListener('click', () => {
            if (validateStep3()) {
                submitRequest();
            }
        });

        document.getElementById('newRequest').addEventListener('click', () => {
            resetForm();
            navigateToStep(1);
        });

        // Quantity controls
        document.getElementById('increaseQuantity').addEventListener('click', () => {
            const quantityInput = document.getElementById('quantity');
            let value = parseInt(quantityInput.value);
            if (value < 50000) {
                quantityInput.value = value + 100;
            }
        });

        document.getElementById('decreaseQuantity').addEventListener('click', () => {
            const quantityInput = document.getElementById('quantity');
            let value = parseInt(quantityInput.value);
            if (value > 100) {
                quantityInput.value = value - 100;
            }
        });

        // Set minimum delivery date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('deliveryDate').min = today;

        // Navigation function
        function navigateToStep(step) {
            // Update steps
            steps.forEach(s => s.classList.remove('active', 'completed'));
            for (let i = 1; i <= step; i++) {
                const stepElement = document.getElementById(`step${i}`);
                if (i < step) {
                    stepElement.classList.add('completed');
                } else {
                    stepElement.classList.add('active');
                }
            }

            // Update form steps
            formSteps.forEach(fs => fs.classList.remove('active'));
            document.getElementById(`formStep${step}`).classList.add('active');

            currentStep = step;
        }

        // Validation functions
        function validateStep1() {
            const fuelType = document.getElementById('fuelType').value;
            const quantity = document.getElementById('quantity').value;
            
            if (!fuelType) {
                alert('Please select a fuel type');
                return false;
            }
            
            if (!quantity || quantity < 100) {
                alert('Please enter a valid quantity (minimum 100 litres)');
                return false;
            }
            
            return true;
        }

        function validateStep2() {
            const address = document.getElementById('deliveryAddress').value;
            const city = document.getElementById('deliveryCity').value;
            const postalCode = document.getElementById('deliveryPostalCode').value;
            const deliveryDate = document.getElementById('deliveryDate').value;
            
            if (!address) {
                alert('Please enter a delivery address');
                return false;
            }
            
            if (!city) {
                alert('Please enter a city or suburb');
                return false;
            }
            
            if (!postalCode) {
                alert('Please enter a postal code');
                return false;
            }
            
            if (!deliveryDate) {
                alert('Please select a delivery date');
                return false;
            }
            
            return true;
        }

        function validateStep3() {
            // All validation should have been done in previous steps
            return true;
        }

        // Update review section
        function updateReview() {
            document.getElementById('reviewFuelType').textContent = document.getElementById('fuelType').options[document.getElementById('fuelType').selectedIndex].text;
            document.getElementById('reviewQuantity').textContent = document.getElementById('quantity').value + ' litres';
            document.getElementById('reviewUrgency').textContent = document.getElementById('urgency').options[document.getElementById('urgency').selectedIndex].text;
            
            document.getElementById('reviewAddress').textContent = document.getElementById('deliveryAddress').value;
            document.getElementById('reviewCity').textContent = document.getElementById('deliveryCity').value;
            document.getElementById('reviewPostalCode').textContent = document.getElementById('deliveryPostalCode').value;
            document.getElementById('reviewDeliveryDate').textContent = document.getElementById('deliveryDate').value;
            document.getElementById('reviewDeliveryTime').textContent = document.getElementById('deliveryTime').options[document.getElementById('deliveryTime').selectedIndex].text;
            
            const instructions = document.getElementById('specialInstructions').value;
            document.getElementById('reviewInstructions').textContent = instructions || 'None';
        }

        // Submit request
        function submitRequest() {
            // In a real application, you would send this data to a server
            // For this demo, we'll just show the confirmation
            
            // Generate a random reference number
            const refNumber = 'XP-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
            document.getElementById('referenceNumber').textContent = refNumber;
            
            navigateToStep(4);
        }

        // Reset form
        function resetForm() {
            document.getElementById('fuelType').selectedIndex = 0;
            document.getElementById('quantity').value = 1000;
            document.getElementById('urgency').selectedIndex = 0;
            document.getElementById('deliveryAddress').value = '';
            document.getElementById('deliveryCity').value = '';
            document.getElementById('deliveryPostalCode').value = '';
            document.getElementById('deliveryDate').value = '';
            document.getElementById('deliveryTime').selectedIndex = 0;
            document.getElementById('specialInstructions').value = '';
        }