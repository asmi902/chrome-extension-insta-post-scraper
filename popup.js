let scrapedImages = [];

document.getElementById('scrapeBtn').addEventListener('click', () => {
  const postUrl = document.getElementById('postUrl').value;
  if (postUrl) {
    chrome.runtime.sendMessage({ action: 'scrapeImages', url: postUrl }, (response) => {
      if (response && response.images) {
        displayResults(response.images);
        scrapedImages = response.images;
        document.getElementById('downloadBtn').style.display = 'block';
      } else {
        alert('Failed to scrape images. Please check the URL or try again.');
      }
    });
  } else {
    alert('Please enter a URL.');
  }
});

document.getElementById('downloadBtn').addEventListener('click', () => {
  if (scrapedImages.length > 0) {
    scrapedImages.forEach((url, index) => {
      downloadImage(url, `image${index + 1}.jpg`);
    });
  } else {
    alert('No images to download.');
  }
});

function displayResults(images) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';
  images.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    img.style.width = '200px';
    img.style.margin = '5px';
    resultsDiv.appendChild(img);
  });
}

function downloadImage(url, filename) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
