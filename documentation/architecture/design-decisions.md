# Design Decisions

## Why a Cinematic Intro?
To satisfy the "Understand" criteria deeply. Forms are clinical. A scrolling cinematic intro using GSAP builds emotional context and empathy before asking users to input their data.

## Why an Interactive Quiz?
An interactive, card-based quiz with clear icons and instant feedback removes the friction typical of massive form-based carbon calculators, encouraging higher completion rates.

## Why Local Tracking?
To satisfy the "Track" requirement while maintaining absolute privacy. Storing data in `localStorage` means zero backend latency, zero server costs, and complete zero-trust data protection for the user.

## Why a Recommendation Engine?
To fulfill the "Reduce" criteria. Generic lists of "how to save carbon" are ineffective. By mapping the user's specific answers directly to a dynamic "Carbon Action Plan," the advice is highly targeted and practical.
