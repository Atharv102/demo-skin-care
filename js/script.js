// ===== Skin Care Clinic - Main JavaScript =====

document.addEventListener('DOMContentLoaded', () => {

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ===== MOBILE NAV TOGGLE =====
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const spans = navToggle.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile nav on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // ===== SCROLL ANIMATIONS =====
    const fadeEls = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    fadeEls.forEach(el => observer.observe(el));

    // ===== COUNTER ANIMATION =====
    const counters = document.querySelectorAll('.stat-item h3');
    let counterAnimated = false;
    const statsSection = document.querySelector('.stats-bar');

    const animateCounters = () => {
        if (counterAnimated) return;
        counterAnimated = true;
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const suffix = counter.getAttribute('data-suffix') || '';
            let current = 0;
            const increment = target / 60;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.ceil(current) + suffix;
                }
            }, 25);
        });
    };

    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) animateCounters();
    }, { threshold: 0.3 });

    if (statsSection) statsObserver.observe(statsSection);

    // ===== BOOKING FORM => WHATSAPP =====
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('bName').value.trim();
            const phone = document.getElementById('bPhone').value.trim();
            const service = document.getElementById('bService').value;
            const date = document.getElementById('bDate').value;
            const time = document.getElementById('bTime').value;
            const message = document.getElementById('bMessage').value.trim();

            // Validation
            if (!name || !phone || !service || !date || !time) {
                alert('Please fill in all required fields.');
                return;
            }

            // Build WhatsApp message
            const waMessage = `Hello! I'd like to book an appointment.\n\n` +
                `*Name:* ${name}\n` +
                `*Phone:* ${phone}\n` +
                `*Service:* ${service}\n` +
                `*Preferred Date:* ${date}\n` +
                `*Preferred Time:* ${time}\n` +
                (message ? `*Additional Note:* ${message}\n` : '') +
                `\nPlease confirm my appointment. Thank you!`;

            const encodedMsg = encodeURIComponent(waMessage);
            const waUrl = `https://api.whatsapp.com/send?phone=917796711431&text=${encodedMsg}`;

            // Show success modal
            const modal = document.getElementById('successModal');
            if (modal) {
                modal.classList.add('active');

                // Open WhatsApp after a brief delay
                setTimeout(() => {
                    window.open(waUrl, '_blank');
                }, 800);
            } else {
                window.open(waUrl, '_blank');
            }

            bookingForm.reset();
        });
    }

    // ===== MODAL CLOSE =====
    const modalClose = document.getElementById('modalClose');
    const modal = document.getElementById('successModal');
    if (modalClose && modal) {
        modalClose.addEventListener('click', () => modal.classList.remove('active'));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

    // ===== SET MIN DATE TO TODAY =====
    const dateInput = document.getElementById('bDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
