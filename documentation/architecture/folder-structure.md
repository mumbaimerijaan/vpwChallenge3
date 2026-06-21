# Folder Structure

```text
/
├── build/                 # Main quiz and results engine output
│   ├── css/               # Styling for quiz and results
│   ├── data/              # JSON definitions for quiz options
│   ├── js/                # Core logic (story.js, future.js)
│   └── story.html         # Main assessment shell
├── config/                # Centralized configurations (appConfig.js, assets.js)
├── docs/                  # Previous documentation folder (migrated)
├── documentation/         # Core documentation suite
│   ├── architecture/      # Architecture overview and design decisions
│   └── testing/           # Detailed test plans, cases, and reports
├── intro/                 # Cinematic GSAP intro module
├── js/                    # Shell and testing validation scripts
├── quiz/                  # Quiz PWA shell (deprecated/standby)
├── test/                  # Programmatic test suites
├── index.html             # Application entry point
├── Dockerfile             # Containerization config
└── nginx.conf             # Production web server config
```
