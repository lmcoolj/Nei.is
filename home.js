function Overlay() {
    // Check if overlay already exists
    if (document.getElementById('overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.className = 'overlay';

    const content = document.createElement('div');
    content.className = 'overlay-content';
    content.innerHTML = `
        <p>This is an overlay</p>
        <button onclick="document.body.removeChild(document.getElementById('overlay'))">Close</button>
    `;

    overlay.appendChild(content);
    document.body.appendChild(overlay);
}