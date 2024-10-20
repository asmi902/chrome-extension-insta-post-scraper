function extractImages() {
    const images = document.querySelectorAll('article img[srcset]');
    const imageUrls = [];

    if (images.length === 0) {
        console.log('No images found in the current post.');
    } else {
        images.forEach(img => {
            const srcset = img.getAttribute('srcset');
            if (srcset) {
                const urls = srcset.split(',').map(src => src.trim().split(' ')[0]);
                const highResUrl = urls[urls.length - 1];
                imageUrls.push(highResUrl);
            }
        });
    }

    console.log('Extracted image URLs:', imageUrls);
    chrome.runtime.sendMessage({ action: 'imagesExtracted', imageUrls });
}
