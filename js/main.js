// Load header and footer components
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('/components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        });

    // Load footer
    fetch('/components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });

    // Initialize tool search functionality
    initializeSearch();
});

// Tool search functionality
function initializeSearch() {
    const searchInput = document.getElementById('toolSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const toolCards = document.querySelectorAll('.tool-card');

        toolCards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const description = card.querySelector('.card-text').textContent.toLowerCase();
            const category = card.closest('.category-section').querySelector('.category-title').textContent.toLowerCase();

            if (title.includes(searchTerm) || 
                description.includes(searchTerm) || 
                category.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Show/hide category sections based on visible tools
        document.querySelectorAll('.category-section').forEach(section => {
            const visibleTools = section.querySelectorAll('.tool-card[style="display: block"]').length;
            section.style.display = visibleTools > 0 ? 'block' : 'none';
        });
    });
}

// Smooth scroll to category sections
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('dropdown-item')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Newsletter subscription
document.addEventListener('submit', function(e) {
    if (e.target.closest('.newsletter-form')) {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        // Here you would typically send this to your backend
        alert('Thank you for subscribing to our newsletter!');
        e.target.reset();
    }
}); 