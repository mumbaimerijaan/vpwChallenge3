# Security Overview
CarbonStory adopts a secure-by-design, zero-trust architecture emphasizing strict data minimization and client-side isolation.

## Threat Model
- **Target Audience**: General public.
- **Data Scope**: Ephemeral local assessment metrics.
- **Risks Mitigated**: Cross-Site Scripting (XSS), Local Data Corruption, Man-in-the-Middle (MitM) via Cloud Run HTTPS, Malicious Iframes.

## Data Handling Policy
- **No user accounts** are created or required.
- **No authentication** mechanisms exist.
- **No personal information collected** (PII) at any stage.
- **No cookies** are utilized for session or tracking.
- **No tracking pixels** or third-party analytics are embedded.
- **No third-party user data sharing** occurs.
- Assessment data remains in the browser only.

## Privacy Protection
See [PRIVACY.md](PRIVACY.md) for full details on our strict local-only data policy.

## LocalStorage Security
All `localStorage` operations are strictly sanitized. `JSON.parse` operations are wrapped in `try/catch` blocks. Corrupted or invalid JSON structures trigger a graceful reset to default parameters, preventing runtime crashes.

## Input Validation Strategy
All application state updates originating from UI interactions are aggressively validated. 
- Input identifiers are validated against known structural IDs.
- Mathematical operations utilize strict parsing (`parseFloat`, `isNaN`) with safe fallbacks (defaulting to 0) to prevent NaN propagation.

## XSS Prevention
We actively mitigate Cross-Site Scripting (XSS) by eschewing dynamic `innerHTML` injections for user-provided or external data. Where text updates occur, strictly safe DOM methods (`.text()`, `textContent`) are used.

## Content Security Policy
A strict CSP is enforced via deployment headers, restricting execution and fetching to known origins:
- `default-src 'self'`
- `img-src 'self' https://storage.googleapis.com`
- `media-src 'self' https://storage.googleapis.com`

## Secure Asset Loading
All assets are loaded via relative paths or strictly configured HTTPS Google Cloud Storage URLs.

## Error Handling Strategy
The application employs global `window.onerror` and `unhandledrejection` handlers. Failed asset loads, missing state, or runtime exceptions are caught gracefully, displaying a user-friendly recovery UI rather than raw stack traces.

## Security Testing Process
See [SECURITY_TEST_REPORT.md](SECURITY_TEST_REPORT.md) for the validation matrix.
