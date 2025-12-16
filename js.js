function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    if (phone === '') return true; // Phone is optional
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone);
}

function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const phone = document.getElementById('phone').value;
    const formStatus = document.getElementById('form-status');

    // Clear previous status
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    // Validate name
    if (name.trim() === '') {
        showFormStatus('Please enter your name', 'error');
        return false;
    }

    // Validate email
    if (!validateEmail(email)) {
        showFormStatus('Please enter a valid email address', 'error');
        return false;
    }

    // Validate subject
    if (subject.trim() === '') {
        showFormStatus('Please enter a subject', 'error');
        return false;
    }

    // Validate message
    if (message.trim() === '') {
        showFormStatus('Please enter your message', 'error');
        return false;
    }

    // Validate phone (if provided)
    if (phone && !validatePhone(phone)) {
        showFormStatus('Please enter a valid phone number', 'error');
        return false;
    }

    return true;
}

function showFormStatus(message, type) {
    const formStatus = document.getElementById('form-status');
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
}

function handleFormSubmission(event) {
    event.preventDefault();

    if (validateForm()) {
        // Simulate form submission
        showFormStatus('Message sent successfully! I will get back to you soon.', 'success');

        // In a real application, you would send the form data to a server here
        // For example:
        // const formData = {
        //     name: document.getElementById('name').value,
        //     email: document.getElementById('email').value,
        //     subject: document.getElementById('subject').value,
        //     message: document.getElementById('message').value,
        //     phone: document.getElementById('phone').value
        // };
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formData)
        // });

        // Reset form after successful submission
        document.getElementById('contact-form').reset();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
    }

    // Theme toggle functionality - moved outside the form check
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else if (prefersDark) {
        body.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }

    // Theme toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    // Update theme icon based on current theme
    function updateThemeIcon(theme) {
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }
});