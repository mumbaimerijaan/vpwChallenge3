// intro/js/main.js

$(document).ready(function() {
    
    // ----- State & Data ----- //
    let currentScene = 0;
    const totalScenes = 6;
    let isTransitioning = false;
    let isVideoPlaying = false;

    // Timeline years map
    const years = {
        0: 0,
        1: 1850,
        2: 1900,
        3: 1950,
        4: 2000,
        5: 2025
    };

    // ----- Elements ----- //
    const $scrollPrompt = $('#scroll-prompt');
    const $yearCounter = $('#year-counter');
    const $yearDisplay = $('#year-display');
    const $finalCta = $('#final-cta');

    // Hide scroll prompt initially to allow user to read opening text
    // Actually, prompt says: "Bottom center: Use: images/mouse.png... Mouse icon gently bounces."
    // So we show it on Scene 0.

    // ----- Scroll/Swipe Detection ----- //
    let touchStartY = 0;

    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchstart', (e) => { touchStartY = e.touches[0].clientY; }, { passive: false });
    window.addEventListener('touchmove', (e) => { e.preventDefault(); }, { passive: false }); // Prevent native scroll
    window.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        if (touchStartY - touchEndY > 50) {
            // Swiped up (scrolling down)
            triggerNextScene();
        }
    }, { passive: false });

    // Keyboard support (Space, Enter, Down Arrow)
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'Enter' || e.code === 'ArrowDown') {
            if (currentScene < totalScenes) {
                e.preventDefault();
                triggerNextScene();
            }
        }
    });

    function handleScroll(e) {
        e.preventDefault(); // Prevent native scroll
        if (e.deltaY > 0) {
            triggerNextScene();
        }
    }

    // ----- Core Logic ----- //
    /**
     * Triggers the advancement to the next scene in the timeline.
     * Prevents advancement if transitioning, video is playing, or at the end.
     */
    function triggerNextScene() {
        // Only allow advancement if not transitioning, video is not playing (or we are on scene 0), and not at end
        if (isTransitioning || isVideoPlaying || currentScene >= totalScenes) return;

        advanceToScene(currentScene + 1);
    }

    /**
     * Handles the complex crossfade and text animation between two scenes.
     * @param {number} nextScene - The index of the target scene.
     */
    function advanceToScene(nextScene) {
        isTransitioning = true;
        $scrollPrompt.css('opacity', '0'); // Hide scroll prompt during transition

        const sceneTitles = {
            1: "Living Planet",
            2: "Steam and Coal",
            3: "Machine Age",
            4: "Connected World",
            5: "The Consumption Era",
            6: "The Choice"
        };
        const announcement = nextScene === 6 ? "Current era: The Choice" : `Current era: ${years[nextScene]} ${sceneTitles[nextScene]}`;
        window.parent.postMessage({ type: "announce", message: announcement }, "*");

        const prevScene = currentScene; // Capture the current scene before it gets updated
        const $currentBg = $(`.video-container[data-scene="${prevScene}"]`);
        const $nextBg = $(`.video-container[data-scene="${nextScene}"]`);
        
        const $currentText = prevScene === 0 ? $('#scene-0') : $(`#text-scene-${prevScene}`);
        const $nextText = $(`#text-scene-${nextScene}`);

        // 1. Fade out current text
        gsap.to($currentText, {
            opacity: 0,
            y: -20,
            duration: 0.6,
            onComplete: () => {
                
                // 2. Crossfade Backgrounds
                gsap.to($currentBg, { opacity: 0, duration: 1.5 });
                gsap.to($nextBg, { opacity: 1, duration: 1.5 });

                // 3. Handle Year Counter
                if (prevScene === 0 && nextScene === 1) {
                    // Initial fade in of year counter
                    gsap.to($yearCounter, { opacity: 1, duration: 0.5 });
                    animateYear(0, years[1], 1.5);
                } else if (nextScene >= 1 && nextScene <= 5) {
                    // Roll from previous year to next year
                    animateYear(years[prevScene], years[nextScene], 1.5);
                } else if (nextScene === 6) {
                    // Fade out year counter for the final choice scene
                    gsap.to($yearCounter, { opacity: 0, duration: 1.0 });
                }

                // Wait for crossfade to almost finish before showing next text
                setTimeout(() => {
                    // Reset transform before animating in
                    gsap.set($nextText, { opacity: 0, y: 40 });
                    
                    // 4. Animate in next text
                    gsap.to($nextText, {
                        opacity: 1,
                        y: 0,
                        duration: 1.0,
                        onComplete: () => {
                            // 5. Play Video & Lock
                            playSceneVideo(nextScene);
                        }
                    });

                }, 1000); // 1s into the 1.5s crossfade
            }
        });

        currentScene = nextScene;
    }

    // ----- Year Animation Logic ----- //
    /**
     * Animates the year counter rapidly from a start year to an end year.
     * @param {number} startYear - Starting year.
     * @param {number} endYear - Target year.
     * @param {number} duration - Duration in seconds.
     */
    function animateYear(startYear, endYear, duration) {
        $({ val: startYear }).animate({ val: endYear }, {
            duration: duration * 1000,
            step: function(now) {
                $yearDisplay.text(Math.round(now).toString().padStart(4, '0'));
            },
            complete: function() {
                $yearDisplay.text(Math.round(endYear).toString().padStart(4, '0'));
            }
        });
    }

    // ----- Video Playback Logic ----- //
    /**
     * Manages video playback for a specific scene, including accessibility fallbacks.
     * @param {number} sceneIndex - Index of the scene video to play.
     */
    function playSceneVideo(sceneIndex) {
        const $container = $(`.video-container[data-scene="${sceneIndex}"]`);
        const video = $container.find('video')[0];

        if (video) {
            isVideoPlaying = true;
            isTransitioning = false; // Transition is over, now we wait for video

            // Ensure video plays from beginning
            video.currentTime = 0;
            
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            if (prefersReducedMotion) {
                // Pause video immediately to show just the first frame
                video.pause();
                isVideoPlaying = false;
                
                if (sceneIndex < totalScenes) {
                    gsap.to($scrollPrompt, { opacity: 1, duration: 0.5 });
                } else {
                    showFinalCTA();
                }
            } else {
                video.play().catch(err => console.error("Video play error:", err));

                // Listen for end
                video.onended = () => {
                    isVideoPlaying = false;
                    
                    if (sceneIndex < totalScenes) {
                        // Show scroll prompt to advance
                        gsap.to($scrollPrompt, { opacity: 1, duration: 0.5 });
                    } else {
                        // Final Scene (6) - Show CTA
                        showFinalCTA();
                    }
                };
            }
        } else {
            // Failsafe if no video exists
            isTransitioning = false;
            gsap.to($scrollPrompt, { opacity: 1, duration: 0.5 });
        }
    }

    /**
     * Fades out the final scene and reveals the call to action block.
     */
    function showFinalCTA() {
        // Fade out scene 6 text
        gsap.to($('#text-scene-6'), { opacity: 0, y: -20, duration: 0.8 });
        
        // Fade in CTA
        gsap.to($finalCta, { opacity: 1, duration: 1.5, pointerEvents: 'auto', delay: 0.5 });
        
        // Hide scroll prompt permanently
        $scrollPrompt.hide();
    }

    // ----- CTA Action ----- //
    $('#btn-begin').on('click', function() {
        window.parent.postMessage({ type: "navigate", target: "quiz/index.html" }, "*");
    });

});
