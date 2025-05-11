// DOM Elements
const textInput = document.getElementById('textInput');
const wordCount = document.getElementById('wordCount');
const charCount = document.getElementById('charCount');
const charNoSpaceCount = document.getElementById('charNoSpaceCount');
const paragraphCount = document.getElementById('paragraphCount');
const readingTime = document.getElementById('readingTime');
const speakingTime = document.getElementById('speakingTime');
const sentenceCount = document.getElementById('sentenceCount');
const lineCount = document.getElementById('lineCount');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');

// Constants
const WORDS_PER_MINUTE = 200;
const WORDS_PER_MINUTE_SPEAKING = 130;

// Event Listeners
textInput.addEventListener('input', updateStats);
clearBtn.addEventListener('click', clearText);
copyBtn.addEventListener('click', copyText);

// Functions
function updateStats() {
    const text = textInput.value;
    
    // Basic counts
    const words = text.trim() ? text.trim().split(/\s+/) : [];
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, '').length;
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
    const lines = text.trim() ? text.split('\n').length : 0;

    // Reading and speaking time
    const readingTimeMinutes = Math.ceil(words.length / WORDS_PER_MINUTE);
    const speakingTimeMinutes = Math.ceil(words.length / WORDS_PER_MINUTE_SPEAKING);

    // Update DOM
    wordCount.textContent = words.length;
    charCount.textContent = chars;
    charNoSpaceCount.textContent = charsNoSpace;
    paragraphCount.textContent = paragraphs;
    sentenceCount.textContent = sentences;
    lineCount.textContent = lines;
    readingTime.textContent = `${readingTimeMinutes} min`;
    speakingTime.textContent = `${speakingTimeMinutes} min`;

    // Update copy button state
    copyBtn.disabled = !text.trim();
}

function clearText() {
    textInput.value = '';
    updateStats();
}

function copyText() {
    textInput.select();
    document.execCommand('copy');
    
    // Visual feedback
    const originalText = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => {
        copyBtn.innerHTML = originalText;
    }, 2000);
}

// Initialize stats
updateStats(); 