chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'scrapeImages') {
        const postUrl = message.url;
        let modifiedUrl = postUrl.includes('?') ? `${postUrl}&__a=1` : `${postUrl}?__a=1`;

        console.log('Fetching URL:', modifiedUrl);
        fetch(modifiedUrl, { credentials: 'include' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data);
            const media = extractImageUrls(data);
            sendResponse({ images: media });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            sendResponse({ images: [] });
        });
        return true; // Keeps the message channel open for sendResponse
    }
});
