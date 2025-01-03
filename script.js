// Smooth scrolling for navigation links
function smoothScroll() {
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Highlight active section in navigation
function highlightActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', debounce(() => {
        let currentSection = '';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }, 100)); // Adjust the wait time as needed
}

// Hamburger menu for mobile
function toggleHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close Navbar on Link Click (for Mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

// Dark/Light Mode Toggle
function toggleTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode'); // Use 'dark-mode' instead of 'dark-theme'
            const isDarkMode = body.classList.contains('dark-mode');
            themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });

        // Load Saved Theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
}

// Scroll-to-Top Button
function scrollToTop() {
    const scrollToTopButton = document.getElementById('scrollToTop');

    if (scrollToTopButton) {
        window.addEventListener('scroll', () => {
            scrollToTopButton.style.display = window.scrollY > 300 ? 'block' : 'none';
        });

        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Toggle "View More" for Certifications
function toggleViewMoreCertifications() {
    const viewMoreButton = document.getElementById('view-more');
    const hiddenCertifications = document.querySelectorAll('.certification-card.hidden');

    if (viewMoreButton && hiddenCertifications.length > 0) {
        viewMoreButton.addEventListener('click', () => {
            hiddenCertifications.forEach(cert => cert.classList.toggle('hidden'));
            viewMoreButton.textContent = viewMoreButton.textContent === 'View More' ? 'View Less' : 'View More';
        });
    }
}

// Toggle "View More" for Projects
function toggleViewMoreProjects() {
    const viewMoreButton = document.getElementById('view-more-projects');
    const hiddenProjects = document.querySelectorAll('.project-card.hidden');

    if (viewMoreButton && hiddenProjects.length > 0) {
        viewMoreButton.addEventListener('click', () => {
            hiddenProjects.forEach(project => project.classList.remove('hidden'));
            viewMoreButton.style.display = 'none'; // Hide the button after showing all projects
        });
    }
}

// Lightbox functionality
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            lightbox.classList.add('active');
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.alt;
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild);
            }
            lightbox.appendChild(img);
        });
    });

    lightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
}

// Initialize all functions
function init() {
    smoothScroll();
    highlightActiveSection();
    toggleHamburgerMenu();
    toggleTheme();
    initLightbox();
    scrollToTop();
    toggleViewMoreCertifications();
    toggleViewMoreProjects();
}

// Run initialization on DOM load
document.addEventListener('DOMContentLoaded', init);