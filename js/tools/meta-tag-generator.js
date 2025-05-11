// DOM Elements
const metaTagForm = document.getElementById('metaTagForm');
const generatedTags = document.getElementById('generatedTags');
const metaTagsOutput = document.getElementById('metaTagsOutput');
const copyBtn = document.getElementById('copyBtn');

// Event Listeners
metaTagForm.addEventListener('submit', generateMetaTags);
copyBtn.addEventListener('click', copyMetaTags);

// Functions
function generateMetaTags(e) {
    e.preventDefault();

    // Get form values
    const pageTitle = document.getElementById('pageTitle').value;
    const metaDescription = document.getElementById('metaDescription').value;
    const keywords = document.getElementById('keywords').value;
    const ogTitle = document.getElementById('ogTitle').value;
    const ogDescription = document.getElementById('ogDescription').value;
    const ogImage = document.getElementById('ogImage').value;
    const twitterCard = document.getElementById('twitterCard').value;
    const twitterTitle = document.getElementById('twitterTitle').value;
    const twitterDescription = document.getElementById('twitterDescription').value;
    const author = document.getElementById('author').value;
    const robots = document.getElementById('robots').value;
    const canonical = document.getElementById('canonical').value;

    // Generate meta tags
    let metaTags = [];

    // Basic meta tags
    if (pageTitle) {
        metaTags.push(`<title>${escapeHtml(pageTitle)}</title>`);
    }
    if (metaDescription) {
        metaTags.push(`<meta name="description" content="${escapeHtml(metaDescription)}">`);
    }
    if (keywords) {
        metaTags.push(`<meta name="keywords" content="${escapeHtml(keywords)}">`);
    }
    if (author) {
        metaTags.push(`<meta name="author" content="${escapeHtml(author)}">`);
    }
    if (robots) {
        metaTags.push(`<meta name="robots" content="${escapeHtml(robots)}">`);
    }
    if (canonical) {
        metaTags.push(`<link rel="canonical" href="${escapeHtml(canonical)}">`);
    }

    // Open Graph meta tags
    if (ogTitle || ogDescription || ogImage) {
        metaTags.push('\n<!-- Open Graph Meta Tags -->');
        if (ogTitle) {
            metaTags.push(`<meta property="og:title" content="${escapeHtml(ogTitle)}">`);
        }
        if (ogDescription) {
            metaTags.push(`<meta property="og:description" content="${escapeHtml(ogDescription)}">`);
        }
        if (ogImage) {
            metaTags.push(`<meta property="og:image" content="${escapeHtml(ogImage)}">`);
        }
        metaTags.push(`<meta property="og:type" content="website">`);
    }

    // Twitter Card meta tags
    if (twitterCard || twitterTitle || twitterDescription) {
        metaTags.push('\n<!-- Twitter Card Meta Tags -->');
        metaTags.push(`<meta name="twitter:card" content="${escapeHtml(twitterCard)}">`);
        if (twitterTitle) {
            metaTags.push(`<meta name="twitter:title" content="${escapeHtml(twitterTitle)}">`);
        }
        if (twitterDescription) {
            metaTags.push(`<meta name="twitter:description" content="${escapeHtml(twitterDescription)}">`);
        }
        if (ogImage) {
            metaTags.push(`<meta name="twitter:image" content="${escapeHtml(ogImage)}">`);
        }
    }

    // Display generated meta tags
    metaTagsOutput.textContent = metaTags.join('\n');
    generatedTags.classList.remove('d-none');
    copyBtn.disabled = false;
}

function copyMetaTags() {
    const text = metaTagsOutput.textContent;
    navigator.clipboard.writeText(text).then(() => {
        // Visual feedback
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Auto-fill Open Graph and Twitter fields if basic meta tags are filled
document.getElementById('pageTitle').addEventListener('input', function(e) {
    const ogTitle = document.getElementById('ogTitle');
    const twitterTitle = document.getElementById('twitterTitle');
    if (!ogTitle.value) ogTitle.value = e.target.value;
    if (!twitterTitle.value) twitterTitle.value = e.target.value;
});

document.getElementById('metaDescription').addEventListener('input', function(e) {
    const ogDescription = document.getElementById('ogDescription');
    const twitterDescription = document.getElementById('twitterDescription');
    if (!ogDescription.value) ogDescription.value = e.target.value;
    if (!twitterDescription.value) twitterDescription.value = e.target.value;
}); 