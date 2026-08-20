# Banner Miles

A simple side-scrolling incremental game about a beach banner pilot.

## Current playable build

- One automatic plane flying left to right
- Flights start only from the Play screen
- Flights end when fuel runs out, with an option to end early
- Earnings come from people reached
- Crowd density changes as different beach zones pass below
- Contracts last at least three flights and have different banner weights/pay rates
- MIN / MED / MAX tow-weight system, with MED as the ideal fuel-efficiency range
- 30 money-only upgrades across Power, Fuel, Efficiency, and Advertising
- Eight beaches unlocked through Career Miles, ending at Golden Strand
- Local save using browser `localStorage`
- Fixed no-scroll Play screen with separate Contracts, Upgrades, Beaches, and Stats pages
- Simple animated water, moving beach scenery, people, umbrellas, hotels, and a visible banner tow
- Plane remains still while idle and only bobs slightly while flying

## Source layout

The live game is intentionally kept simple:

- `index.html` — page structure
- `styles.css` — layout, responsive styling, and scene animation
- `game.js` — gameplay, contracts, upgrades, progression, saves, and flight logic

There is no build step and no compressed runtime loader.

## Run locally

Serve the folder with any simple static web server and open `index.html` in a browser.

## Design direction

Gameplay is being built before final art. The current plane, hotels, water, people, umbrellas, and beach elements are lightweight CSS placeholders so progression and balance can be tested first.
