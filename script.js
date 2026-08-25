const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });
}

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

function setActiveSection(id) {
    navLinks.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`header nav a[href="#${id}"]`);
    if (activeLink) activeLink.classList.add('active');
}

function updateScrollState() {
    const top = window.scrollY;

    sections.forEach(sec => {
        const offset = sec.offsetTop - 120;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            setActiveSection(id);
        }
    });

    const header = document.querySelector('header');
    if (header) header.classList.toggle('sticky', top > 80);

    if (menuIcon) menuIcon.classList.remove('bx-x');
    if (navbar) navbar.classList.remove('active');
}

window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

// Reveal sections as they enter the viewport, matching the template's
// scroll-driven interaction rather than requiring hover to expose content.
const revealTargets = document.querySelectorAll(
    '.home, .skills, .projects, .education, .contact'
);

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-animate');
            } else {
                entry.target.classList.remove('show-animate');
            }
        });
    }, { threshold: 0.18 });

    revealTargets.forEach(section => revealObserver.observe(section));
} else {
    revealTargets.forEach(section => section.classList.add('show-animate'));
}

const contactForm = document.getElementById('Contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        const subject = encodeURIComponent(`Portfolio contact from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );

        window.location.href =
            `mailto:pramodhegde23@gmail.com?subject=${subject}&body=${body}`;
    });
}
