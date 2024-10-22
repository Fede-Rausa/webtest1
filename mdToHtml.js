function loadMarkdown(path) {
    fetch(path)
        .then(response => response.text())
        .then(markdown => {
            const converter = new showdown.Converter();   // Initialize Showdown converter
            const html = converter.makeHtml(markdown);    // Convert Markdown to HTML
            document.getElementById('target').innerHTML = html;    // Get a reference to the target element and add the HTML content
            console.log("conversion applied");
        })
        .catch(error => {
            document.getElementById('target').innerHTML = '<p>Error loading the content.</p>';
            console.error('Error fetching Markdown file:', error);
        });
}
