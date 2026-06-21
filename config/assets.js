window.ASSETS = {
    imageBase: "https://storage.googleapis.com/carbonstory-assets/images/",
    videos: {
        intro1850: "https://storage.googleapis.com/carbonstory-assets/videos/1850_Living%20Planet.mp4",
        intro1900: "https://storage.googleapis.com/carbonstory-assets/videos/1900_Steam_Coal.mp4",
        intro1950: "https://storage.googleapis.com/carbonstory-assets/videos/1950_Machine_Age.mp4",
        intro2000: "https://storage.googleapis.com/carbonstory-assets/videos/2000_Connected_World.mp4",
        intro2025: "https://storage.googleapis.com/carbonstory-assets/videos/2025_Consumption_Era.mp4",
        choice: "https://storage.googleapis.com/carbonstory-assets/videos/The_Choice.mp4"
    },
    images: {
        landingBackground: "https://storage.googleapis.com/carbonstory-assets/images/landing-bg.png",
        footprintIcon: "https://storage.googleapis.com/carbonstory-assets/images/footprint.png",
        mouseIcon: "https://storage.googleapis.com/carbonstory-assets/images/mouse.png",
        initialBackground: "https://storage.googleapis.com/carbonstory-assets/images/initial-background.png",
        globeIcon: "https://storage.googleapis.com/carbonstory-assets/images/globe.png",
        earthHeartIcon: "https://storage.googleapis.com/carbonstory-assets/images/earth-heart.png",
        heroTransport: "https://storage.googleapis.com/carbonstory-assets/images/hero-transport.png",
        heroResult: "https://storage.googleapis.com/carbonstory-assets/images/hero-result.png",
        heroFinal: "https://storage.googleapis.com/carbonstory-assets/images/hero-final.png",
        iconBrain: "https://storage.googleapis.com/carbonstory-assets/images/icon-brain.png",
        iconFootprintSmall: "https://storage.googleapis.com/carbonstory-assets/images/icon-footprint-small.png",
        iconLeaf: "https://storage.googleapis.com/carbonstory-assets/images/icon-leaf.png"
    }
};

// Auto-hydrate static HTML elements
document.addEventListener('DOMContentLoaded', () => {
    if (!window.ASSETS) {
        console.warn("ASSETS config not found!");
        return;
    }

    // Hydrate <img> and <video> sources via data-asset
    document.querySelectorAll('[data-asset]').forEach(el => {
        const key = el.getAttribute('data-asset');
        if (el.tagName.toLowerCase() === 'img') {
            if (ASSETS.images[key]) el.src = ASSETS.images[key];
            else console.warn(`Asset key "${key}" not found in ASSETS.images`);
        } else if (el.tagName.toLowerCase() === 'video') {
            if (ASSETS.videos[key]) el.src = ASSETS.videos[key];
            else console.warn(`Asset key "${key}" not found in ASSETS.videos`);
        }
    });

    // Hydrate background images via data-bg-asset
    document.querySelectorAll('[data-bg-asset]').forEach(el => {
        const key = el.getAttribute('data-bg-asset');
        if (ASSETS.images[key]) {
            el.style.backgroundImage = `url('${ASSETS.images[key]}')`;
        } else {
            console.warn(`Asset background key "${key}" not found in ASSETS.images`);
        }
    });
});
