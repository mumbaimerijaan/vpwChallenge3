window.navigateApp = function(page) {
    const frame = document.getElementById('app-frame');
    const errorOverlay = document.getElementById('error-overlay');
    
    // Fade out
    frame.classList.add('fade-out');
    
    setTimeout(() => {
        // Change src after fade out
        frame.src = page;
        
        // Wait for load to fade back in
        frame.onload = function() {
            errorOverlay.classList.add('hidden');
            frame.classList.remove('fade-out');
        };
        
        // Handle error (note: iframe error handling is tricky with cross-origin, but fine for local relative paths)
        frame.onerror = function() {
            errorOverlay.classList.remove('hidden');
        };
    }, 300); // Wait for transition duration
};

window.addEventListener("message", function(e) {
    if (e.data && e.data.type === "navigate" && e.data.target) {
        window.navigateApp(e.data.target);
    } else if (e.data && e.data.type === "announce" && e.data.message) {
        const announcer = document.getElementById('global-announcer');
        if (announcer) {
            announcer.textContent = ''; // clear first
            setTimeout(() => { announcer.textContent = e.data.message; }, 50); // set after short delay to ensure announcement
        }
    }
});
