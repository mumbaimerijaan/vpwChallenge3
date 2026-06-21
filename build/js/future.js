// future.js
$(document).ready(function() {
    // Navigate to the beginning of the experience
    $('#btn-explore-again').on('click', function(e) {
        e.preventDefault();
        window.parent.postMessage({ type: 'navigate', target: 'intro/index.html' }, '*');
    });

    // Share button
    $('.btn-share').on('click', function(e) {
        e.preventDefault();
        if (navigator.share) {
            navigator.share({
                title: 'My Carbon Story',
                text: 'I just discovered my carbon footprint impact and how I can make a difference. Check out Your Carbon Story!',
                url: window.location.href
            }).catch(console.error);
        } else {
            alert("Share feature is not supported on this browser.");
        }
    });
});
