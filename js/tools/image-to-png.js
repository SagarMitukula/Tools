// DOM Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const previewArea = document.getElementById('previewArea');
const originalPreview = document.getElementById('originalPreview');
const pngPreview = document.getElementById('pngPreview');
const originalInfo = document.getElementById('originalInfo');
const pngInfo = document.getElementById('pngInfo');
const convertBtn = document.getElementById('convertBtn');
const downloadBtn = document.getElementById('downloadBtn');
const preserveTransparency = document.getElementById('preserveTransparency');
const optimizeSize = document.getElementById('optimizeSize');

// State
let originalFile = null;
let convertedBlob = null;

// Event Listeners
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('border-primary');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('border-primary');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('border-primary');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFile(e.target.files[0]);
    }
});

convertBtn.addEventListener('click', convertToPNG);
downloadBtn.addEventListener('click', downloadPNG);

// Functions
function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
    }

    originalFile = file;
    const reader = new FileReader();

    reader.onload = (e) => {
        originalPreview.src = e.target.result;
        originalInfo.textContent = `Size: ${formatFileSize(file.size)}`;
        previewArea.classList.remove('d-none');
        convertBtn.disabled = false;
        downloadBtn.disabled = true;
    };

    reader.readAsDataURL(file);
}

function convertToPNG() {
    if (!originalFile) return;

    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');

        // Clear canvas with transparency if needed
        if (preserveTransparency.checked) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        } else {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Draw image
        ctx.drawImage(img, 0, 0);

        // Convert to PNG
        canvas.toBlob((blob) => {
            convertedBlob = blob;
            pngPreview.src = URL.createObjectURL(blob);
            pngInfo.textContent = `Size: ${formatFileSize(blob.size)}`;
            downloadBtn.disabled = false;
        }, 'image/png', optimizeSize.checked ? 0.8 : 1.0);
    };

    img.src = URL.createObjectURL(originalFile);
}

function downloadPNG() {
    if (!convertedBlob) return;

    const url = URL.createObjectURL(convertedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = originalFile.name.replace(/\.[^/.]+$/, '') + '.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
} 