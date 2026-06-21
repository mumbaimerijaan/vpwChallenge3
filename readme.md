# CarbonStory

## Challenge Overview
"Help individuals understand, track and reduce their carbon footprint through simple actions and personalized insights."

## Problem Statement
Climate change often feels like an overwhelming, abstract problem disconnected from daily life. Standard footprint calculators are clinical, generic, and fail to inspire behavioral change. 

## How CarbonStory Solves It
CarbonStory transforms footprint calculation into an engaging, empathetic, and highly visual narrative experience. It connects daily choices directly to global consequences and delivers actionable, tailored steps for improvement.

## Problem Statement Mapping

### UNDERSTAND
- **Timeline Experience**: A cinematic scrolling intro utilizing GSAP.
- **Educational Storytelling**: Micro-copy explicitly explaining why each category (Transport, Food, etc.) matters to global emissions.

### TRACK
- **Carbon Awareness Score**: A dynamically calculated metric based on user choices.
- **Progress Tracking**: An interactive SVG chart that visualizes assessment history.
- **History Dashboard**: A dedicated panel pulling from `localStorage` to review past performance and award streak badges.

### REDUCE
- **Personalized Recommendations**: Directly linked to user choices.
- **Carbon Action Plan**: The top 5 generated actions complete with Impact Level, Difficulty, and Estimated Carbon Benefit.

## User Journey
1. **The Hook (Intro)**: A cinematic scrolling experience visually demonstrating carbon concepts.
2. **The Assessment (Quiz)**: A smooth, accessible, 5-step quiz covering Transport, Home, Food, Shopping, and Lifestyle.
3. **The Results**: Dynamic score calculation mapping the user to an Impact Band ("Climate Champion", "Conscious Citizen", etc.).
4. **The Action Plan**: Personalized reduction strategies.
5. **The Progress Tracker**: Historical trend analysis and insight generation.

## Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6)
- **Animations**: GSAP (GreenSock Animation Platform)
- **State Management**: Zero-dependency Client-Side State + `localStorage`
- **Deployment**: Google Cloud Run (Nginx)

## Accessibility Features
- Full WCAG 2.1 AA Compliance
- Semantic HTML (`<main>`, `<nav>`, `<button>`)
- Comprehensive ARIA labels and roles (`role="img"`, `aria-pressed`)
- Full keyboard navigation and focus management
- High contrast color schemes and scalable typography

## Security Features
- **Zero-Trust Architecture**: No user accounts or authentication.
- **Strict Content Security Policy (CSP)**: Handled via Nginx headers (`default-src 'self'`).
- **XSS Mitigation**: Safe DOM injection (`createElement`).
- **Data Validation**: Strict input type parsing.

## Testing Strategy
- **Programmatic Testing**: `test/quiz.test.js` validates calculation logic.
- **Security Testing**: Documented matrix for storage corruption, asset failure, and CSP checks.
- **Accessibility Testing**: Audited via Lighthouse and AXE, documented in `/docs`.

## Cloud Run Deployment
CarbonStory is containerized via Docker and served by a highly tuned Nginx instance. 
Deployment uses standard `gcloud run deploy`.

## Future Improvements
- Native mobile application encapsulation
- Expanded product database for shopping category
- Integration with smart home APIs
