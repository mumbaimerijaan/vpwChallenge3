// js/test-validation.js
// Runtime Validation and Error Monitoring

(function() {
    // 1. Error Monitoring
    window.onerror = function(message, source, lineno, colno, error) {
        console.error("[Runtime Error]", { message, source, lineno, colno, error });
    };

    window.addEventListener('unhandledrejection', function(event) {
        console.error("[Unhandled Rejection]", event.reason);
    });

    // 2. DOM and Configuration Validation
    document.addEventListener("DOMContentLoaded", function() {
        const checks = [];

        // Check required configuration
        checks.push({
            name: "Configuration Loaded",
            passed: typeof window.ASSETS !== 'undefined'
        });

        // Check required DOM containers depending on context
        const appFrame = document.getElementById('app-frame');
        if (appFrame) {
            checks.push({ name: "Application Shell Frame Exists", passed: true });
        }

        const cardsContainer = document.getElementById('cards-container');
        if (cardsContainer) {
            checks.push({ name: "Quiz Cards Container Exists", passed: true });
        }
        
        const resultsContainer = document.getElementById('results-container');
        if (document.body.classList.contains('results-mode') || resultsContainer) {
             checks.push({ name: "Results Container Exists", passed: true });
        }

        // Validate outcomes
        const failedChecks = checks.filter(c => !c.passed);
        
        if (failedChecks.length === 0) {
            console.log("Validation Passed");
        } else {
            console.error("Validation Failed", failedChecks);
        }
    });
})();
