# CarbonStory – Carbon Footprint Awareness Platform

## Overview

CarbonStory is an interactive carbon footprint awareness platform designed to help individuals understand how everyday choices impact the environment.

Instead of presenting users with a traditional calculator, CarbonStory takes them on a visual journey through history, showing how human activity has transformed the planet from the pre-industrial era to the present day.

Users then participate in interactive challenges, build their personal carbon story, receive insights about their lifestyle choices, and explore actions that can contribute to a more sustainable future.

---

## Challenge

**Challenge 3 – Carbon Footprint Awareness Platform**

Design a solution that helps individuals:

* Understand their carbon footprint
* Track their impact
* Reduce emissions through informed choices
* Receive personalized insights and recommendations

---

## Our Approach

CarbonStory focuses on awareness before assessment.

Most carbon calculators immediately ask users for data.

CarbonStory first creates context through a cinematic timeline experience that demonstrates how industrialization, globalization, and consumption have shaped today's environmental challenges.

The experience then transitions into interactive learning and self-assessment.

---

## User Journey

### 1. Interactive Timeline

Users travel through key moments in environmental history:

* 1850 – Living Planet
* 1900 – Steam & Coal
* 1950 – Machine Age
* 2000 – Connected World
* 2025 – Consumption Era
* The Choice

Each scene uses animated video storytelling to build awareness and context.

---

### 2. Carbon Awareness Challenge

Users participate in a short interactive quiz that helps reinforce carbon footprint concepts through engaging visual questions.

---

### 3. Your Carbon Story

Users answer lifestyle questions covering:

* Transportation
* Home Energy
* Food Choices
* Consumption Habits

Responses are used to generate a personalized carbon profile.

---

### 4. Results & Insights

Users receive:

* Carbon impact score
* Category breakdown
* Key impact contributors
* Awareness feedback

---

### 5. Better Future

Users explore simple actions that can reduce environmental impact and contribute to a more sustainable future.

---

## Features

### Interactive Storytelling

A cinematic introduction using historical environmental milestones to create awareness before assessment.

### Carbon Awareness Quiz

Engaging educational challenge focused on environmental decision-making.

### Personalized Carbon Story

Interactive lifestyle assessment covering multiple impact categories.

### Impact Visualization

Clear presentation of user results and environmental impact.

### Sustainable Action Guidance

Practical recommendations that encourage positive change.

### Progressive Web App (PWA)

Installable experience with responsive design.

### Mobile Friendly

Designed for desktop, tablet, and mobile devices.

---

## Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* jQuery
* GSAP Animations

### Cloud Services

* Google Cloud Storage (media asset delivery)

### Deployment

* Google Cloud Run

### Other

* JSON-driven content architecture
* Responsive layouts
* Modular application structure

---

## Project Structure

```text
intro/
    Timeline Experience

quiz/
    Awareness Challenge
    Quiz Landing

build/
    Carbon Story
    Results
    Better Future

config/
    Asset Configuration
```

---

## Google Cloud Usage

Large media assets are hosted on Google Cloud Storage to:

* Reduce repository size
* Improve loading performance
* Enable scalable media delivery
* Comply with repository size requirements

The application dynamically loads assets through a centralized configuration system.

---

## Assumptions

* Users are interested in understanding environmental impact.
* Carbon awareness improves through storytelling and education.
* Small behavioral changes can contribute to long-term sustainability.
* Simplicity encourages engagement and completion.

---

## Future Enhancements

* Carbon footprint history tracking
* User accounts and progress tracking
* Advanced personalized recommendations
* Community challenges
* Goal setting and achievement tracking
* AI-powered sustainability coach
* Real-world carbon offset integrations

---

## Security Considerations

* No personal data collection
* No user authentication required
* No sensitive information stored
* Static frontend architecture minimizes attack surface
* Media served through Google Cloud Storage

---

## Accessibility

* Responsive design
* Keyboard-friendly navigation
* High-contrast UI elements
* Clear visual hierarchy
* Mobile-first considerations

---

## Setup

### Clone Repository

```bash
git clone https://github.com/mumbaimerijaan/vpwChallenge3.git
```

### Run Locally

Open:

```text
index.html
```

or serve using any local web server.

---

## Author

mumbaimerijaan

Created for the Virtual PromptWars Challenge 3 – Carbon Footprint Awareness Platform.
### 2. Carbon Awareness Challenge

Users participate in a short interactive quiz that helps reinforce carbon footprint concepts through engaging visual questions.

---

### 3. Your Carbon Story

Users answer lifestyle questions covering:

* Transportation
* Home Energy
* Food Choices
* Consumption Habits

Responses are used to generate a personalized carbon profile.

---

### 4. Results & Insights

Users receive:

* Carbon impact score
* Category breakdown
* Key impact contributors
* Awareness feedback

---

### 5. Better Future

Users explore simple actions that can reduce environmental impact and contribute to a more sustainable future.

---

## Features

### Interactive Storytelling

A cinematic introduction using historical environmental milestones to create awareness before assessment.

### Carbon Awareness Quiz

Engaging educational challenge focused on environmental decision-making.

### Personalized Carbon Story

Interactive lifestyle assessment covering multiple impact categories.

### Impact Visualization

Clear presentation of user results and environmental impact.

### Sustainable Action Guidance

Practical recommendations that encourage positive change.

### Progressive Web App (PWA)

Installable experience with responsive design.

### Mobile Friendly

Designed for desktop, tablet, and mobile devices.

---

## Technology Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* jQuery
* GSAP Animations

### Cloud Services

* Google Cloud Storage (media asset delivery)

### Deployment

* Google Cloud Run

### Other

* JSON-driven content architecture
* Responsive layouts
* Modular application structure

---

## Project Structure

```text
intro/
    Timeline Experience

quiz/
    Awareness Challenge
    Quiz Landing

build/
    Carbon Story
    Results
    Better Future

config/
    Asset Configuration
```

---

## Google Cloud Usage

Large media assets are hosted on Google Cloud Storage to:

* Reduce repository size
* Improve loading performance
* Enable scalable media delivery
* Comply with repository size requirements

The application dynamically loads assets through a centralized configuration system.

---

## Assumptions

* Users are interested in understanding environmental impact.
* Carbon awareness improves through storytelling and education.
* Small behavioral changes can contribute to long-term sustainability.
* Simplicity encourages engagement and completion.

---

## Future Enhancements

* Carbon footprint history tracking
* User accounts and progress tracking
* Advanced personalized recommendations
* Community challenges
* Goal setting and achievement tracking
* AI-powered sustainability coach
* Real-world carbon offset integrations

---

## Security Considerations

* No personal data collection
* No user authentication required
* No sensitive information stored
* Static frontend architecture minimizes attack surface
* Media served through Google Cloud Storage

---

## Accessibility

* Responsive design
* Keyboard-friendly navigation
* High-contrast UI elements
* Clear visual hierarchy
* Mobile-first considerations

---

## Setup

### Clone Repository

```bash
git clone https://github.com/mumbaimerijaan/vpwChallenge3.git
```

### Run Locally

Open:

```text
index.html
```

or serve using any local web server.

---

## Author

mumbaimerijaan

Created for the Virtual PromptWars Challenge 3 – Carbon Footprint Awareness Platform.

Built using AI-assisted development, interactive storytelling, and modern web technologies to make environmental awareness engaging and accessible.

---

## Cloud Run Deployment

```bash
gcloud builds submit --tag gcr.io/PROJECT_ID/carbonstory

gcloud run deploy carbonstory \
  --image gcr.io/PROJECT_ID/carbonstory \
  --platform managed \
  --allow-unauthenticated \
  --region asia-south1
```

---

## Testing Strategy

CarbonStory employs a rigorous validation suite to ensure functional integrity, maximum accessibility, and robust performance. 

Review our comprehensive testing artifacts:
* [TESTING.md](TESTING.md) - Main testing framework and methodology
* [TEST_CASES.md](TEST_CASES.md) - Detailed step-by-step test cases
* [QA_CHECKLIST.md](QA_CHECKLIST.md) - 50+ item verification checklist
* [ACCESSIBILITY_TEST_REPORT.md](ACCESSIBILITY_TEST_REPORT.md) - WCAG 2.1 AA compliance results
* [PERFORMANCE_REPORT.md](PERFORMANCE_REPORT.md) - Asset and load optimization strategy
* [BROWSER_COMPATIBILITY.md](BROWSER_COMPATIBILITY.md) - Cross-browser and device matrix
* [ERROR_HANDLING.md](ERROR_HANDLING.md) - Runtime validation and error monitoring
