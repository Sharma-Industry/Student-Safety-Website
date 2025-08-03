document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeSwitch.checked = true;
    }
    
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Mobile menu toggle
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    
    menuIcon.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        document.querySelectorAll('.menu-icon span').forEach(span => {
            span.classList.toggle('active');
        });
    });
    
    // Close menu when clicking a link on mobile
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                navLinks.classList.remove('active');
                document.querySelectorAll('.menu-icon span').forEach(span => {
                    span.classList.remove('active');
                });
            }
        });
    });
    
    // Tabs functionality
    const tabs = document.querySelectorAll('.tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and add to current tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Hide all tab panes and show the current one
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId + '-tab').classList.add('active');
        });
    });
    
    // Campus map functionality
    const loadMapBtn = document.getElementById('loadMapBtn');
    const campusMap = document.getElementById('campusMap');
    
    if (loadMapBtn) {
        loadMapBtn.addEventListener('click', function() {
            // Replace the placeholder with actual map (simplified version for demo)
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            setTimeout(() => {
                campusMap.innerHTML = `
                    <div class="actual-map">
                        <div class="map-building" data-type="academic">Academic Building</div>
                        <div class="map-building" data-type="residence">Residence Hall</div>
                        <div class="map-building" data-type="library">Library</div>
                        <div class="map-point" data-type="emergency-phone"><i class="fas fa-phone"></i></div>
                        <div class="map-point" data-type="security-office"><i class="fas fa-shield-alt"></i></div>
                        <div class="map-point" data-type="health-center"><i class="fas fa-first-aid"></i></div>
                        <div class="map-route" data-type="safe-route"></div>
                    </div>
                `;
                
                // Add event listeners to map elements
                document.querySelectorAll('.map-building, .map-point').forEach(element => {
                    element.addEventListener('click', function() {
                        const type = this.getAttribute('data-type');
                        showNotification(`You clicked on a ${type.replace('-', ' ')}`, 'info');
                    });
                });
                
                showNotification('Campus safety map loaded successfully', 'success');
            }, 1500);
        });
    }
    
    // Form submissions
    const incidentReportForm = document.getElementById('incidentReportForm');
    const contactForm = document.getElementById('contactForm');
    
    if (incidentReportForm) {
        incidentReportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const reportType = document.getElementById('reportType').value;
            const location = document.getElementById('incidentLocation').value;
            const date = document.getElementById('incidentDate').value;
            const description = document.getElementById('incidentDescription').value;
            const anonymous = document.getElementById('anonymousReport').checked;
            
            // Simple validation
            if (!reportType || !location || !date || !description) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // In a real app, you would send this data to a server
            console.log('Incident report submitted:', {
                type: reportType,
                location,
                date,
                description,
                anonymous
            });
            
            // Show success message
            showNotification('Your incident report has been submitted', 'success');
            
            // Reset form
            this.reset();
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;
            const newsletter = document.getElementById('newsletter').checked;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // In a real app, you would send this data to a server
            console.log('Contact form submitted:', {
                name,
                email,
                subject,
                message,
                newsletter
            });
            
            // Show success message
            showNotification('Your message has been sent', 'success');
            
            // Reset form
            this.reset();
        });
    }
    
    // Emergency button and modal
    const emergencyButton = document.querySelector('.emergency-button');
    const emergencyModal = document.getElementById('emergencyModal');
    const closeModal = document.querySelector('.close-modal');
    const cancelEmergency = document.getElementById('cancelEmergency');
    const emergencyOptions = document.querySelectorAll('.emergency-option');
    
    if (emergencyButton) {
        emergencyButton.addEventListener('click', function() {
            emergencyModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            emergencyModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    if (cancelEmergency) {
        cancelEmergency.addEventListener('click', function() {
            emergencyModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal if clicking outside the content
    window.addEventListener('click', function(e) {
        if (e.target === emergencyModal) {
            emergencyModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Emergency call option clicks
    emergencyOptions.forEach(option => {
        option.addEventListener('click', function() {
            const number = this.getAttribute('data-number');
            const name = this.querySelector('h3').textContent;
            
            // In a real app, you would initiate the call
            // For demo, we'll show a notification
            showNotification(`Simulating call to ${name} (${number})`, 'info');
        });
    });
    
    // Quick call buttons
    const quickCallBtns = document.querySelectorAll('.quick-call-btn');
    
    quickCallBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const number = this.closest('.emergency-card').querySelector('.value').textContent;
            const service = this.closest('.emergency-card').querySelector('h3').textContent;
            
            // In a real app, you would initiate the call
            // For demo, we'll show a notification
            showNotification(`Simulating call to ${service} (${number})`, 'info');
        });
    });
    
    // Course registration
    const enrollBtns = document.querySelectorAll('.enroll-btn');
    
    enrollBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const course = this.closest('.course-card').querySelector('h3').textContent;
            
            // In a real app, you would redirect to a registration page
            // For demo, we'll show a notification
            showNotification(`You've registered for ${course}`, 'success');
        });
    });
    
    // Animate stats when visible
    animateStats();
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notificationContainer = document.getElementById('notificationContainer');
        const notificationId = 'notification-' + Date.now();
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.id = notificationId;
        
        let icon;
        switch (type) {
            case 'success':
                icon = 'check-circle';
                break;
            case 'error':
                icon = 'times-circle';
                break;
            case 'warning':
                icon = 'exclamation-triangle';
                break;
            case 'info':
            default:
                icon = 'info-circle';
                break;
        }
        
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="fas fa-${icon}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
                <div class="notification-message">${message}</div>
            </div>
            <div class="notification-close">&times;</div>
        `;
        
        notificationContainer.appendChild(notification);
        
        // Add event listener to close button
        notification.querySelector('.notification-close').addEventListener('click', function() {
            notification.remove();
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (document.getElementById(notificationId)) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                
                setTimeout(() => {
                    if (document.getElementById(notificationId)) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // Animate stats
    function animateStats() {
        const campusSafetyScore = document.getElementById('campusSafetyScore');
        const incidentsResolved = document.getElementById('incidentsResolved');
        const safetyWorkshops = document.getElementById('safetyWorkshops');
        
        if (campusSafetyScore && incidentsResolved && safetyWorkshops) {
            const stats = [
                { element: campusSafetyScore, target: 95, speed: 50, current: 0, increment: 1 },
                { element: incidentsResolved, target: 124, speed: 20, current: 0, increment: 1 },
                { element: safetyWorkshops, target: 36, speed: 70, current: 0, increment: 1 }
            ];
            
            stats.forEach(stat => {
                const updateStat = setInterval(() => {
                    stat.current += stat.increment;
                    stat.element.textContent = stat.current;
                    
                    if (stat.current >= stat.target) {
                        stat.element.textContent = stat.target;
                        clearInterval(updateStat);
                    }
                }, stat.speed);
            });
        }
    }
    
    // Handle intersection observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    document.querySelectorAll('.resource-card, .emergency-card, .course-card').forEach(element => {
        observer.observe(element);
    });
});
