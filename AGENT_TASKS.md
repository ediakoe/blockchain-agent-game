# Autonomous Agent Backlog

## Mission: make BLOCKTRACE CITY feel like a real game

### P0 — Movement reliability
- Reproduce the reported "one step forward, one step back" behavior.
- Use a single authoritative player velocity/input state.
- Use delta-time based movement with collision checks that cannot push the player backward.
- On iPhone, movement must work through pointer/touch controls without keyboard-event simulation.
- Add a simple debug mode or internal movement assertions if useful.

### P0 — Actual city environment
- Turn the current world into a visible city scene with streets, buildings, district landmarks, lighting/depth cues, NPCs and mission markers.
- The city must occupy the main gameplay viewport; `city-map.js` remains an optional overview/minimap.
- The player should visibly travel from one district to another.
- Keep rendering lightweight enough for mobile Safari.

### P1 — Living city
- NPCs move between sensible walkable positions.
- Districts have recognizable visual identity.
- Mission markers and interactions are easy to understand.
- Add ambient activity without overwhelming the player.

### P1 — Agent gameplay
- Agent observes movement/exploration choices.
- Agent adapts hints, mission order and difficulty.
- Agent can introduce fictional incidents and rival encounters.
- Agent state remains deterministic enough to debug and never requires a wallet.

### P2 — Base layer
- Keep blockchain integration optional.
- Add safe achievement/profile hooks only after core gameplay is stable.
- Use Base Sepolia first for any on-chain prototype.

## Acceptance test
A fresh visitor on iPhone can open the site, choose Hacker or Defender, immediately see a city, move continuously in multiple directions, look around, reach a district landmark, interact with a mission/NPC, and receive an Agent-generated next objective. No keyboard is required.
