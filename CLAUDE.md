# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Heevibe is an interactive beehive simulator built with vanilla JavaScript and HTML5 Canvas. The simulation models realistic bee behavior including foraging, nectar collection, waggle dance communication, and hive interactions.

## Development Commands

Since this is a vanilla JavaScript project with no build system, development is straightforward:

- **Run the application**: Open `index.html` in a web browser or use a local server
- **Local development server**: `python -m http.server 8000` or `npx serve .`
- **No build/test commands** are available as this is a simple static web application

## Architecture

The application follows a component-based architecture with ES6 modules:

### Core Components

- **BeeSimulator** (`src/components/BeeSimulator.js`): Main simulation engine that orchestrates all entities
- **Bee** (`src/components/Bee.js`): Individual bee entity with state machine (exploring, foraging, returning, dancing)
- **Flower** (`src/components/Flower.js`): Flower entities with nectar that regenerates over time
- **Hive** (`src/components/Hive.js`): Central hive structure where bees originate and return
- **Vector2** (`src/components/Vector2.js`): 2D vector math utility for position and movement calculations

### Simulation Flow

1. **Initialization**: BeeSimulator creates initial bees (15) and flowers (10)
2. **Animation Loop**: Uses `requestAnimationFrame` for smooth 60fps rendering
3. **State Management**: Bees follow a state machine pattern transitioning between states
4. **Bee Behaviors**:
   - **Exploring**: Random wandering to find flowers
   - **Foraging**: Moving to and collecting nectar from flowers
   - **Returning**: Flying back to hive with nectar
   - **Dancing**: Waggle dance to communicate flower locations to other bees

### Key Features

- **Realistic bee AI**: Bees use state machines and memory to behave naturally
- **Waggle dance communication**: Dancing bees draw lines to flower locations
- **Dynamic nectar system**: Flowers regenerate nectar over time
- **Interactive controls**: Play/pause, speed adjustment, manual flower/bee addition
- **Visual feedback**: Different bee colors represent different states, nectar indicators

## File Structure

```
src/
├── main.js              # Entry point and UI event handlers
└── components/
    ├── BeeSimulator.js   # Core simulation engine
    ├── Bee.js           # Individual bee behavior and rendering
    ├── Flower.js        # Flower entity with nectar mechanics
    ├── Hive.js          # Central hive structure
    └── Vector2.js       # 2D vector math utilities
```

## Development Notes

- Uses ES6 modules with `type="module"` in HTML
- Canvas rendering with 2D context
- No external dependencies or frameworks
- Event-driven architecture for UI controls
- Simulation runs at variable speed controlled by user input