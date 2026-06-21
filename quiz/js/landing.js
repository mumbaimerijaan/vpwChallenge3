// quiz/js/landing.js

document.addEventListener("DOMContentLoaded", () => {
    
    // Ensure elements are visible to GSAP but hidden initially via autoAlpha
    gsap.set(".gsap-element", { autoAlpha: 0, y: 20 });

    // Staggered entrance animation
    gsap.to(".gsap-element", {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.2
    });

    // Navigation logic
    const btnBegin = document.getElementById("btn-begin");
    const wrapper = document.querySelector(".landing-wrapper");

    btnBegin.addEventListener("click", () => {
        // Trigger fade out
        wrapper.style.opacity = '0';
        
        // Wait for CSS transition (400ms) then navigate
        setTimeout(() => {
            window.parent.postMessage({ type: "navigate", target: "quiz/quiz.html" }, "*");
        }, 400);
    });

});
