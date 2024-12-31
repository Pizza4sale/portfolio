// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Highlight active section in navigation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[index].classList.add('active');
        }
    });
});

// Hamburger menu for mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Dark/Light Mode Toggle
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Scroll-to-Top Button
const scrollToTopButton = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Loading Animation
window.addEventListener('load', () => {
    document.getElementById('loading').style.display = 'none';
});

// Toggle "View More" for Certifications
const viewMoreButton = document.getElementById('view-more');
const hiddenCertifications = document.querySelectorAll('.certification-card.hidden');

viewMoreButton.addEventListener('click', () => {
    hiddenCertifications.forEach(cert => {
        cert.classList.toggle('hidden');
    });

    // Change button text based on visibility
    if (viewMoreButton.textContent === 'View More') {
        viewMoreButton.textContent = 'View Less';
    } else {
        viewMoreButton.textContent = 'View More';
    }
});

document.getElementById('view-more-projects').addEventListener('click', function() {
    const hiddenProjects = document.querySelectorAll('.project-card.hidden');
    hiddenProjects.forEach(project => project.classList.remove('hidden'));

    // Hide the "View More" button after all projects are shown
    this.style.display = 'none';
});