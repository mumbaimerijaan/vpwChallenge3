# Error Handling Strategy

This document outlines the frontend error monitoring and runtime validation strategy for CarbonStory.

## Global Error Catching
To ensure no silent failures degrade the user experience, CarbonStory implements global unhandled exception monitoring.

```javascript
window.onerror
```
Catches runtime synchronization issues, DOM manipulation errors, and generic JavaScript faults.

```javascript
window.addEventListener('unhandledrejection')
```
Captures failed asynchronous logic, such as rejected Promises (e.g., failed `fetch` calls for external JSON data or media loading delays).

## Runtime Validation
The application invokes `js/test-validation.js` upon initialization. This script performs lightweight assertions on the DOM:
- **Configuration Checks**: Verifies `window.ASSETS` object is successfully initialized.
- **Container Verification**: Asserts the existence of essential HTML mounts (e.g., `#app-frame`, `#cards-container`, `#results-container`) based on the active view mode.

### Logging Mechanism
- Successful validation logs `✅ Runtime Validation Passed`.
- Failing validations output highly visible console errors to immediately alert developers of critical DOM or State mismatches.
- **Performance Impact**: Zero. This is executed once asynchronously on `DOMContentLoaded` and does not poll or block the main thread.
